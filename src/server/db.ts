import { neon } from "@neondatabase/serverless";
import { INSERT_SUBSCRIBER_SQL } from "@/lib/waitlist/sql";
import type { WaitlistDb } from "@/server/waitlist";

let cached: WaitlistDb | null | undefined;

export function getWaitlistDb(): WaitlistDb | null {
  if (cached !== undefined) {
    return cached;
  }

  const connectionString = process.env.DATABASE_URL?.trim();
  if (!connectionString) {
    cached = null;
    return null;
  }

  const sql = neon(connectionString);

  cached = {
    async insertSubscriber(email: string) {
      const rows = await sql.query(INSERT_SUBSCRIBER_SQL, [email]);
      return { inserted: rows.length > 0 };
    },
  };

  return cached;
}
