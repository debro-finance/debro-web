import type { RateLimiter } from "@/lib/waitlist/rate-limit";
import {
  MAX_WAITLIST_BODY_BYTES,
  parseWaitlistPayload,
} from "@/lib/waitlist/validation";

export type WaitlistDb = {
  insertSubscriber(email: string): Promise<{ inserted: boolean }>;
};

export type WaitlistBody =
  | { ok: true }
  | { ok: false; error: string };

export type WaitlistResult = {
  status: number;
  body: WaitlistBody;
  retryAfterSeconds?: number;
};

export type RegisterSubscriberInput = {
  rawBody: string;
  ipHash: string;
  enabled: boolean;
  db: WaitlistDb | null;
  limiter: RateLimiter;
};

function failure(
  status: number,
  error: string,
  retryAfterSeconds?: number,
): WaitlistResult {
  return { status, body: { ok: false, error }, retryAfterSeconds };
}

export async function registerSubscriber({
  rawBody,
  ipHash,
  enabled,
  db,
  limiter,
}: RegisterSubscriberInput): Promise<WaitlistResult> {
  if (!enabled) {
    return failure(503, "disabled");
  }

  if (Buffer.byteLength(rawBody, "utf8") > MAX_WAITLIST_BODY_BYTES) {
    return failure(413, "invalid_request");
  }

  const parsed = parseWaitlistPayload(rawBody);
  if (!parsed.ok) {
    return failure(400, parsed.error);
  }

  // Honeypot hits receive the same external success response as a real signup,
  // but never reach the database.
  if (parsed.honeypot) {
    return { status: 200, body: { ok: true } };
  }

  const decision = limiter.consume(ipHash);
  if (!decision.allowed) {
    return failure(429, "rate_limited", decision.retryAfterSeconds);
  }

  if (!db) {
    return failure(503, "unavailable");
  }

  try {
    await db.insertSubscriber(parsed.payload.email);
    return { status: 200, body: { ok: true } };
  } catch (error) {
    // Deliberately log only a generic identifier: never the email, SQL params
    // or connection details.
    console.error(
      "[waitlist] insert failed",
      error instanceof Error ? error.name : "unknown_error",
    );
    return failure(503, "unavailable");
  }
}
