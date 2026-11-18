import { readFile } from "node:fs/promises";
import path from "node:path";
import { Client } from "pg";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { createRateLimiter } from "@/lib/waitlist/rate-limit";
import { INSERT_SUBSCRIBER_SQL } from "@/lib/waitlist/sql";
import { registerSubscriber, type WaitlistDb } from "@/server/waitlist";

const connectionString = process.env.TEST_DATABASE_URL;
const describeWithDatabase = connectionString ? describe : describe.skip;

describeWithDatabase("waitlist persistence", () => {
  let client: Client;
  let db: WaitlistDb;

  beforeAll(async () => {
    client = new Client({ connectionString });
    await client.connect();

    const exists = await client.query(
      "SELECT to_regclass('public.waitlist_subscribers') AS table_name",
    );

    if (!exists.rows[0]?.table_name) {
      const migration = await readFile(
        path.join(process.cwd(), "db", "migrations", "0001_waitlist.sql"),
        "utf8",
      );
      await client.query(migration);
    }

    db = {
      async insertSubscriber(email: string) {
        const result = await client.query(INSERT_SUBSCRIBER_SQL, [email]);
        return { inserted: (result.rowCount ?? 0) > 0 };
      },
    };
  });

  beforeEach(async () => {
    await client.query("TRUNCATE TABLE waitlist_subscribers");
  });

  afterAll(async () => {
    await client.end();
  });

  async function countRows() {
    const result = await client.query(
      "SELECT count(*)::int AS count FROM waitlist_subscribers",
    );
    return result.rows[0]?.count as number;
  }

  it("inserts a subscriber with consent and status timestamps", async () => {
    const result = await db.insertSubscriber("subscriber@example.com");
    expect(result.inserted).toBe(true);

    const row = await client.query(
      "SELECT email, status, consent_at, created_at FROM waitlist_subscribers",
    );

    expect(row.rows).toHaveLength(1);
    expect(row.rows[0].email).toBe("subscriber@example.com");
    expect(row.rows[0].status).toBe("subscribed");
    expect(row.rows[0].consent_at).toBeInstanceOf(Date);
    expect(row.rows[0].created_at).toBeInstanceOf(Date);
  });

  it("handles duplicate inserts without creating a second row", async () => {
    expect((await db.insertSubscriber("dup@example.com")).inserted).toBe(true);
    expect((await db.insertSubscriber("dup@example.com")).inserted).toBe(false);
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
        "UPDATE waitlist_subscribers SET status = 'pending' WHERE email = $1",
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

    const row = await client.query("SELECT email FROM waitlist_subscribers");
    expect(row.rows[0].email).toBe("endtoend@example.com");
  });
});
