import { readFile } from "node:fs/promises";
import path from "node:path";
import { Client } from "pg";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { createRateLimiter } from "@/lib/waitlist/rate-limit";
import {
  FIND_SUBSCRIBER_SQL,
  INSERT_SUBSCRIBER_SQL,
} from "@/lib/waitlist/sql";
import { registerSubscriber, type WaitlistDb } from "@/server/waitlist";
import { getWaitlistReport } from "@/server/waitlist-report";

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

describeWithDatabase("waitlist persistence", () => {
  let client: Client;
  let db: WaitlistDb;

  beforeAll(async () => {
    client = new Client({ connectionString });
    await client.connect();

    await client.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        name text PRIMARY KEY,
        applied_at timestamptz NOT NULL DEFAULT now()
      )
    `);

    const { readdir } = await import("node:fs/promises");
    const migrationsDir = path.join(process.cwd(), "db", "migrations");
    const files = (await readdir(migrationsDir))
      .filter((name) => name.endsWith(".sql"))
      .sort();

    for (const file of files) {
      const alreadyApplied = await client.query(
        "SELECT 1 FROM schema_migrations WHERE name = $1",
        [file],
      );
      if (alreadyApplied.rowCount) {
        continue;
      }

      if (file === "0001_waitlist.sql") {
        const exists = await client.query(
          "SELECT to_regclass('public.waitlist_subscribers') AS table_name",
        );
        if (exists.rows[0]?.table_name) {
          await client.query(
            "INSERT INTO schema_migrations (name) VALUES ($1) ON CONFLICT (name) DO NOTHING",
            [file],
          );
          continue;
        }
      }

      const sql = await readFile(path.join(migrationsDir, file), "utf8");
      await client.query("BEGIN");
      try {
        await client.query(sql);
        await client.query("INSERT INTO schema_migrations (name) VALUES ($1)", [
          file,
        ]);
        await client.query("COMMIT");
      } catch (error) {
        await client.query("ROLLBACK");
        throw error;
      }
    }

    db = {
      async insertSubscriber(
        email: string,
        attribution?: Record<string, string | null> | null,
      ) {
        const hasAttribution =
          attribution != null &&
          Object.values(attribution).some((value) => value !== null);
        const result = hasAttribution
          ? await client.query(
              `INSERT INTO public.waitlist_subscribers (email, consent_at, utm_source, utm_medium, utm_campaign, utm_content)
               VALUES ($1, now(), $2, $3, $4, $5)
               ON CONFLICT (email) DO NOTHING
               RETURNING id`,
              [
                email,
                attribution.utm_source,
                attribution.utm_medium,
                attribution.utm_campaign,
                attribution.utm_content,
              ],
            )
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
  });

  beforeEach(async () => {
    await client.query("TRUNCATE TABLE public.waitlist_subscribers");
  });

  afterAll(async () => {
    await client.end();
  });

  async function countRows() {
    const result = await client.query(
      "SELECT count(*)::int AS count FROM public.waitlist_subscribers",
    );
    return result.rows[0]?.count as number;
  }

  it("inserts a subscriber with consent and status timestamps", async () => {
    const result = await db.insertSubscriber("subscriber@example.com");
    expect(result).toBe("inserted");

    const row = await client.query(
      "SELECT email, status, consent_at, created_at FROM public.waitlist_subscribers",
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
    expect(await countRows()).toBe(1);
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
    expect(await countRows()).toBe(1);

    const row = await client.query("SELECT email FROM public.waitlist_subscribers");
    expect(row.rows[0].email).toBe("endtoend@example.com");
  });

  it("keeps existing registrations compatible when attribution columns exist", async () => {
    await client.query(
      `INSERT INTO public.waitlist_subscribers (email, consent_at)
       VALUES ($1, now())`,
      ["legacy@example.com"],
    );

    const row = await client.query(
      `SELECT email, status, utm_source, utm_medium, utm_campaign, utm_content
       FROM public.waitlist_subscribers WHERE email = $1`,
      ["legacy@example.com"],
    );

    expect(row.rows[0]).toMatchObject({
      email: "legacy@example.com",
      status: "subscribed",
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
      utm_content: null,
    });
  });

  it("preserves original attribution for duplicate registrations", async () => {
    const original = {
      utm_source: "partner",
      utm_medium: "referral",
      utm_campaign: "launch",
      utm_content: "hero",
    };

    expect(await db.insertSubscriber("attr@example.com", original)).toBe("inserted");
    expect(
      await db.insertSubscriber("attr@example.com", {
        utm_source: "other",
        utm_medium: "other",
        utm_campaign: "other",
        utm_content: "other",
      }),
    ).toBe("duplicate");

    const row = await client.query(
      `SELECT utm_source, utm_medium, utm_campaign, utm_content
       FROM public.waitlist_subscribers WHERE email = $1`,
      ["attr@example.com"],
    );
    expect(row.rows[0]).toMatchObject(original);
    expect(await countRows()).toBe(1);
  });

  it("returns aggregate reporting counts without exposing PII", async () => {
    await client.query(
      `INSERT INTO public.waitlist_subscribers (email, consent_at, status, created_at, utm_source)
       VALUES
         ('a@example.com', now(), 'subscribed', '2026-01-01T10:00:00Z', 'newsletter'),
         ('b@example.com', now(), 'subscribed', '2026-01-02T10:00:00Z', 'newsletter'),
         ('c@example.com', now(), 'unsubscribed', '2026-01-08T10:00:00Z', null)`,
    );

    const report = await getWaitlistReport(
      {
        query: async (text, params = []) =>
          (await client.query(text as string, params as unknown[])).rows,
      },
      { from: "2026-01-01T00:00:00Z", to: "2026-01-07T23:59:59Z" },
      { includeAcquisitionBreakdown: true },
    );

    expect(report.subscribedCount).toBe(2);
    expect(report.unsubscribedCount).toBe(1);
    expect(report.newRegistrationsCount).toBe(2);
    expect(report.dailyCounts).toEqual([
      { day: "2026-01-01", count: 1 },
      { day: "2026-01-02", count: 1 },
    ]);
    expect(report.weeklyCounts.length).toBeGreaterThan(0);
    expect(report.acquisitionBreakdown).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          utmSource: "newsletter",
          utmMedium: null,
          utmCampaign: null,
          utmContent: null,
          count: 2,
        }),
      ]),
    );

    expect(JSON.stringify(report)).not.toContain("@example.com");
  });
});
