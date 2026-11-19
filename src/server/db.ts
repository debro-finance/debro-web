import { neon } from "@neondatabase/serverless";
import {
  FIND_SUBSCRIBER_SQL,
  INSERT_SUBSCRIBER_SQL,
} from "@/lib/waitlist/sql";
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
      if (rows.length > 0) {
        return "inserted";
      }

      const existing = await sql.query(FIND_SUBSCRIBER_SQL, [email]);
      if (existing.length > 0) {
        return "duplicate";
      }

      throw Object.assign(new Error("Waitlist insert was not persisted"), {
        code: "WAITLIST_INSERT_NOT_PERSISTED",
      });
    },
  };

  return cached;
}
