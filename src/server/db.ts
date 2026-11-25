import { neon } from "@neondatabase/serverless";
import {
  FIND_SUBSCRIBER_SQL,
  INSERT_SUBSCRIBER_SQL,
  INSERT_SUBSCRIBER_WITH_ATTRIBUTION_SQL,
} from "@/lib/waitlist/sql";
import type { Attribution } from "@/lib/waitlist/attribution";
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
    async insertSubscriber(email: string, attribution?: Attribution | null) {
      const hasAttribution =
        attribution != null &&
        Object.values(attribution).some((value) => value !== null);
      const rows = hasAttribution
        ? await sql.query(INSERT_SUBSCRIBER_WITH_ATTRIBUTION_SQL, [
            email,
            attribution.utm_source,
            attribution.utm_medium,
            attribution.utm_campaign,
            attribution.utm_content,
          ])
        : await sql.query(INSERT_SUBSCRIBER_SQL, [email]);

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
