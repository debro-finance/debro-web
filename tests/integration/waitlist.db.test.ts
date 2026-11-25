import { execFile } from "node:child_process";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { Client } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { hasAttributionValues } from "@/lib/waitlist/attribution";
import { createRateLimiter } from "@/lib/waitlist/rate-limit";
import {
  FIND_SUBSCRIBER_SQL,
  INSERT_SUBSCRIBER_SQL,
  INSERT_SUBSCRIBER_WITH_ATTRIBUTION_SQL,
} from "@/lib/waitlist/sql";
import { registerSubscriber, type WaitlistDb } from "@/server/waitlist";
import { getWaitlistReport, type WaitlistReportDb } from "@/server/waitlist-report";

const execFileAsync = promisify(execFile);
const connectionString = process.env.TEST_DATABASE_URL;
const describeWithDatabase = connectionString ? describe : describe.skip;

if (connectionString) {
  let url: URL;
  try {
    url = new URL(connectionString);
  } catch {
    throw new Error(
      "TEST_DATABASE_URL must target the local disposable debro_test database.",
    );
  }

  const loopbackHosts = new Set(["localhost", "127.0.0.1", "[::1]"]);
  const database = decodeURIComponent(url.pathname.slice(1));
  if (
    !["postgres:", "postgresql:"].includes(url.protocol) ||
    !loopbackHosts.has(url.hostname) ||
    url.username !== "postgres" ||
    database !== "debro_test" ||
    url.searchParams.has("sslmode")
  ) {
    throw new Error(
      "TEST_DATABASE_URL must target the local disposable debro_test database.",
    );
  }
}

describeWithDatabase("waitlist persistence, migration and reporting", () => {
  let client: Client;
  let db: WaitlistDb;
  let reportDb: WaitlistReportDb;

  beforeAll(async () => {
    client = new Client({ connectionString });
    await client.connect();

    // This suite owns the disposable local database and deliberately starts
    // from the pre-migration schema so the 0001 -> 0002 sequence is exercised.
    await client.query("DROP TABLE IF EXISTS public.waitlist_subscribers");
    await client.query("DROP TABLE IF EXISTS schema_migrations");
    await applyMigration("0001_waitlist.sql");

    db = {
      async insertSubscriber(email, attribution) {
        const result = hasAttributionValues(attribution)
          ? await client.query(INSERT_SUBSCRIBER_WITH_ATTRIBUTION_SQL, [
              email,
              attribution?.utm_source ?? null,
              attribution?.utm_medium ?? null,
              attribution?.utm_campaign ?? null,
              attribution?.utm_content ?? null,
            ])
          : await client.query(INSERT_SUBSCRIBER_SQL, [email]);

        if ((result.rowCount ?? 0) > 0) {
          return "inserted";
        }

        const existing = await client.query(FIND_SUBSCRIBER_SQL, [email]);
        if ((existing.rowCount ?? 0) > 0) {
          return "duplicate";
        }

        throw new Error("Waitlist insert was not persisted");
      },
    };

    reportDb = {
      async query(text, params = []) {
        const result = await client.query(text, params as unknown[]);
        return result.rows;
      },
    };
  });

  afterAll(async () => {
    await client.end();
  });

  async function applyMigration(file: string) {
    const sql = await readFile(
      path.join(process.cwd(), "db", "migrations", file),
      "utf8",
    );
    await client.query(sql);
  }

  async function runCli(args: string[] = []) {
    return execFileAsync(process.execPath, ["scripts/waitlist-report.ts", ...args], {
      cwd: process.cwd(),
      env: {
        ...process.env,
        DATABASE_URL: "",
        TEST_DATABASE_URL: connectionString,
      },
    });
  }

  const snapshotQuery = `
    SELECT id::text, email, status, consent_at::text, created_at::text
    FROM public.waitlist_subscribers
    WHERE email IN ($1, $2)
    ORDER BY email
  `;

  it("migrates 0001 -> 0002 without changing existing records and keeps attribution optional", async () => {
    const columnsBefore = await client.query(
      `SELECT column_name FROM information_schema.columns
       WHERE table_schema = 'public' AND table_name = 'waitlist_subscribers'`,
    );
    const namesBefore = columnsBefore.rows.map((row) => row.column_name);
    expect(namesBefore).not.toContain("utm_source");

    const originalEmails = ["original-a@example.com", "original-b@example.com"];
    await client.query(
      `INSERT INTO public.waitlist_subscribers (id, email, status, consent_at, created_at)
       VALUES
         ($1, $2, 'subscribed', '2026-01-01T09:00:00Z', '2026-01-01T10:00:00Z'),
         ($3, $4, 'unsubscribed', '2026-01-02T09:00:00Z', '2026-01-02T10:00:00Z')`,
      [
        "11111111-1111-4111-8111-111111111111",
        originalEmails[0],
        "22222222-2222-4222-8222-222222222222",
        originalEmails[1],
      ],
    );

    const before = await client.query(snapshotQuery, originalEmails);

    // The current app must keep working against the pre-migration schema with
    // attribution disabled, even when a client sends UTM fields.
    const legacyResult = await registerSubscriber({
      rawBody: JSON.stringify({
        email: "pre-migration@example.com",
        consent: true,
        utm_source: "newsletter",
      }),
      ipHash: "legacy-ip",
      enabled: true,
      db,
      limiter: createRateLimiter({ now: () => 0 }),
      attributionEnabled: false,
    });
    expect(legacyResult.status).toBe(200);

    // Default CLI reporting must work before attribution columns exist.
    const defaultCli = await runCli();
    expect(JSON.parse(defaultCli.stdout)).toMatchObject({
      subscribedCount: 2,
      unsubscribedCount: 1,
      attributionAvailable: false,
    });
    expect(defaultCli.stdout).not.toContain("@example.com");

    // Requesting attribution on the old schema degrades gracefully.
    const unavailableCli = await runCli(["--include-attribution"]);
    expect(JSON.parse(unavailableCli.stdout)).toMatchObject({
      acquisitionBreakdown: null,
      attributionAvailable: false,
    });

    await applyMigration("0002_waitlist_attribution.sql");

    const after = await client.query(snapshotQuery, originalEmails);
    expect(after.rows).toEqual(before.rows);

    const columnsAfter = await client.query(
      `SELECT column_name, is_nullable FROM information_schema.columns
       WHERE table_schema = 'public'
         AND table_name = 'waitlist_subscribers'
         AND column_name LIKE 'utm_%'`,
    );
    expect(columnsAfter.rows.map((row) => row.column_name).sort()).toEqual([
      "utm_campaign",
      "utm_content",
      "utm_medium",
      "utm_source",
    ]);
    expect(columnsAfter.rows.every((row) => row.is_nullable === "YES")).toBe(true);

    const nullCheck = await client.query(
      `SELECT utm_source, utm_medium, utm_campaign, utm_content
       FROM public.waitlist_subscribers WHERE email = ANY($1)`,
      [originalEmails],
    );
    expect(nullCheck.rows).toEqual([
      { utm_source: null, utm_medium: null, utm_campaign: null, utm_content: null },
      { utm_source: null, utm_medium: null, utm_campaign: null, utm_content: null },
    ]);

    // Constraint checks must be scoped to the intended table.
    const constraints = await client.query(
      `SELECT conname FROM pg_constraint
       WHERE conrelid = 'public.waitlist_subscribers'::regclass
         AND conname LIKE 'waitlist_subscribers_utm_%_length'
       ORDER BY conname`,
    );
    expect(constraints.rows).toHaveLength(4);

    const approved = await registerSubscriber({
      rawBody: JSON.stringify({
        email: "approved@example.com",
        consent: true,
        utm_source: "Newsletter",
        utm_medium: " EMAIL ",
        utm_campaign: "prelaunch",
        utm_content: "hero",
      }),
      ipHash: "approved-ip",
      enabled: true,
      db,
      limiter: createRateLimiter({ now: () => 0 }),
      attributionEnabled: true,
    });
    expect(approved.status).toBe(200);

    const stored = await client.query(
      `SELECT utm_source, utm_medium, utm_campaign, utm_content
       FROM public.waitlist_subscribers WHERE email = 'approved@example.com'`,
    );
    expect(stored.rows[0]).toEqual({
      utm_source: "newsletter",
      utm_medium: "email",
      utm_campaign: "prelaunch",
      utm_content: "hero",
    });

    const duplicate = await registerSubscriber({
      rawBody: JSON.stringify({
        email: "approved@example.com",
        consent: true,
        utm_source: "x",
        utm_medium: "social",
        utm_campaign: "launch",
        utm_content: "footer",
      }),
      ipHash: "duplicate-ip",
      enabled: true,
      db,
      limiter: createRateLimiter({ now: () => 0 }),
      attributionEnabled: true,
    });
    expect(duplicate.status).toBe(200);
    const afterDuplicate = await client.query(
      `SELECT utm_source, utm_medium, utm_campaign, utm_content
       FROM public.waitlist_subscribers WHERE email = 'approved@example.com'`,
    );
    expect(afterDuplicate.rows[0]).toEqual(stored.rows[0]);

    const invalid = await registerSubscriber({
      rawBody: JSON.stringify({
        email: "invalid-attribution@example.com",
        consent: true,
        utm_source: "not-approved",
        utm_campaign: "x".repeat(65),
      }),
      ipHash: "invalid-ip",
      enabled: true,
      db,
      limiter: createRateLimiter({ now: () => 0 }),
      attributionEnabled: true,
    });
    expect(invalid).toEqual({ status: 200, body: { ok: true } });
    const invalidRow = await client.query(
      `SELECT utm_source, utm_campaign FROM public.waitlist_subscribers
       WHERE email = 'invalid-attribution@example.com'`,
    );
    expect(invalidRow.rows[0]).toEqual({ utm_source: null, utm_campaign: null });
  });

  it("inserts a subscriber with consent and status timestamps", async () => {
    const result = await db.insertSubscriber("subscriber@example.com");
    expect(result).toBe("inserted");

    const row = await client.query(
      "SELECT email, status, consent_at, created_at FROM public.waitlist_subscribers WHERE email = $1",
      ["subscriber@example.com"],
    );

    expect(row.rows).toHaveLength(1);
    expect(row.rows[0].email).toBe("subscriber@example.com");
    expect(row.rows[0].status).toBe("subscribed");
    expect(row.rows[0].consent_at).toBeInstanceOf(Date);
    expect(row.rows[0].created_at).toBeInstanceOf(Date);
  });

  it("handles duplicate inserts without creating a second row", async () => {
    expect(await db.insertSubscriber("dup@example.com")).toBe("inserted");
    expect(await db.insertSubscriber("dup@example.com")).toBe("duplicate");

    const rows = await client.query(
      "SELECT email FROM public.waitlist_subscribers WHERE email = $1",
      ["dup@example.com"],
    );
    expect(rows.rows).toHaveLength(1);
  });

  it("enforces normalized emails at the database level", async () => {
    await expect(
      client.query(INSERT_SUBSCRIBER_SQL, ["UpperCase@Example.com"]),
    ).rejects.toThrow();
  });

  it("rejects invalid subscription statuses", async () => {
    await db.insertSubscriber("status@example.com");
    await expect(
      client.query(
        "UPDATE public.waitlist_subscribers SET status = 'pending' WHERE email = $1",
        ["status@example.com"],
      ),
    ).rejects.toThrow();
  });

  it("persists an end-to-end service registration once", async () => {
    const limiter = createRateLimiter({ now: () => 0 });
    const input = JSON.stringify({
      email: "  EndToEnd@Example.com ",
      consent: true,
      company: "",
    });

    const first = await registerSubscriber({
      rawBody: input,
      ipHash: "integration-ip",
      enabled: true,
      db,
      limiter,
    });

    const second = await registerSubscriber({
      rawBody: input,
      ipHash: "integration-ip",
      enabled: true,
      db,
      limiter,
    });

    expect(first.status).toBe(200);
    expect(second.status).toBe(200);

    const rows = await client.query(
      "SELECT email FROM public.waitlist_subscribers WHERE email = $1",
      ["endtoend@example.com"],
    );
    expect(rows.rows).toHaveLength(1);
  });

  it("reports UTC windows and acquisition breakdown inside the requested range", async () => {
    await client.query(
      `INSERT INTO public.waitlist_subscribers (id, email, consent_at, status, created_at, utm_source)
       VALUES
         ($1, 'range-a@example.com', now(), 'subscribed', '2026-01-01T00:00:00Z', 'newsletter'),
         ($2, 'range-b@example.com', now(), 'subscribed', '2026-01-01T10:00:00Z', 'newsletter'),
         ($3, 'range-c@example.com', now(), 'unsubscribed', '2026-01-31T23:59:59Z', null),
         ($4, 'range-d@example.com', now(), 'subscribed', '2026-02-01T00:00:00Z', 'x')`,
      [
        "33333333-3333-4333-8333-333333333333",
        "44444444-4444-4444-8444-444444444444",
        "55555555-5555-4555-8555-555555555555",
        "66666666-6666-4666-8666-666666666666",
      ],
    );

    const report = await getWaitlistReport(
      reportDb,
      { from: "2026-01-01", to: "2026-01-31" },
      { includeAcquisitionBreakdown: true },
    );

    expect(report.range).toEqual({
      from: "2026-01-01T00:00:00.000Z",
      to: "2026-02-01T00:00:00.000Z",
    });
    // Two synthetic records from the migration test also fall inside January.
    expect(report.newRegistrationsCount).toBe(5);
    expect(report.dailyCounts).toHaveLength(3);
    expect(report.acquisitionBreakdown).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ utmSource: "newsletter", count: 2 }),
      ]),
    );
    expect(
      report.acquisitionBreakdown?.some((entry) => entry.utmSource === "x"),
    ).toBe(false);

    const offsetReport = await getWaitlistReport(reportDb, {
      from: "2026-01-01T02:00:00+02:00",
      to: "2026-01-01T12:00:00+02:00",
    });
    expect(offsetReport.newRegistrationsCount).toBe(1);
    expect(offsetReport.range).toEqual({
      from: "2026-01-01T00:00:00.000Z",
      to: "2026-01-01T10:00:00.000Z",
    });
  });

  it("exposes CLI behavior with aggregate-only output", async () => {
    const { stdout } = await runCli([
      "--from",
      "2026-01-01",
      "--to",
      "2026-01-31",
      "--include-attribution",
    ]);
    const report = JSON.parse(stdout);

    expect(report).toMatchObject({
      range: {
        from: "2026-01-01T00:00:00.000Z",
        to: "2026-02-01T00:00:00.000Z",
      },
      newRegistrationsCount: 5,
      attributionAvailable: true,
    });
    expect(stdout).not.toContain("@example.com");

    const before = await client.query(
      "SELECT count(*)::int AS count FROM public.waitlist_subscribers",
    );
    await runCli();
    const after = await client.query(
      "SELECT count(*)::int AS count FROM public.waitlist_subscribers",
    );
    expect(after.rows[0].count).toBe(before.rows[0].count);

    await expect(runCli(["--from"])).rejects.toMatchObject({
      stderr: expect.stringContaining("missing_argument_value"),
    });
    await expect(
      runCli(["--from", "2026-02-01", "--to", "2026-01-01"]),
    ).rejects.toMatchObject({
      stderr: expect.stringContaining("invalid_range"),
    });
  });
});
