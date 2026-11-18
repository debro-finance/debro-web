import { afterEach, describe, expect, it, vi } from "vitest";
import { createRateLimiter } from "@/lib/waitlist/rate-limit";
import { MAX_WAITLIST_BODY_BYTES } from "@/lib/waitlist/validation";
import {
  registerSubscriber,
  type RegisterSubscriberInput,
  type WaitlistDb,
} from "@/server/waitlist";

function makeDb(
  implementation: WaitlistDb["insertSubscriber"] = async () => ({
    inserted: true,
  }),
): WaitlistDb & { insertSubscriber: ReturnType<typeof vi.fn> } {
  return { insertSubscriber: vi.fn(implementation) };
}

function submit(
  overrides: Partial<RegisterSubscriberInput> = {},
  payload: Record<string, unknown> = {
    email: "User@Example.com ",
    consent: true,
  },
) {
  return registerSubscriber({
    rawBody: JSON.stringify(payload),
    ipHash: "hashed-ip",
    enabled: true,
    db: makeDb(),
    limiter: createRateLimiter({ now: () => 0 }),
    ...overrides,
  });
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("registerSubscriber", () => {
  it("stores a valid, normalized registration", async () => {
    const db = makeDb();
    const result = await submit({ db });

    expect(result).toEqual({ status: 200, body: { ok: true } });
    expect(db.insertSubscriber).toHaveBeenCalledWith("user@example.com");
  });

  it("returns 503 and does not touch the database when disabled", async () => {
    const db = makeDb();
    const result = await submit({ db, enabled: false });

    expect(result.status).toBe(503);
    expect(result.body).toEqual({ ok: false, error: "disabled" });
    expect(db.insertSubscriber).not.toHaveBeenCalled();
  });

  it("rejects an invalid email", async () => {
    const db = makeDb();
    const result = await submit({ db }, { email: "not-an-email", consent: true });

    expect(result.status).toBe(400);
    expect(result.body).toEqual({ ok: false, error: "invalid_email" });
    expect(db.insertSubscriber).not.toHaveBeenCalled();
  });

  it("rejects a missing or false consent", async () => {
    const db = makeDb();
    const result = await submit({ db }, { email: "a@example.com", consent: false });

    expect(result.status).toBe(400);
    expect(result.body).toEqual({ ok: false, error: "consent_required" });
    expect(db.insertSubscriber).not.toHaveBeenCalled();
  });

  it("returns a generic success for duplicate registrations", async () => {
    const db = makeDb(async () => ({ inserted: false }));
    const result = await submit({ db });

    expect(result).toEqual({ status: 200, body: { ok: true } });
    expect(db.insertSubscriber).toHaveBeenCalledTimes(1);
  });

  it("rejects malformed JSON and non-object bodies", async () => {
    const db = makeDb();

    const malformed = await submit({ db, rawBody: "{" });
    expect(malformed.status).toBe(400);
    expect(malformed.body).toEqual({ ok: false, error: "invalid_request" });

    const arrayBody = await submit({ db, rawBody: "[]" });
    expect(arrayBody.status).toBe(400);
    expect(arrayBody.body).toEqual({ ok: false, error: "invalid_request" });

    expect(db.insertSubscriber).not.toHaveBeenCalled();
  });

  it("rejects oversized input before parsing", async () => {
    const db = makeDb();
    const result = await submit({
      db,
      rawBody: "x".repeat(MAX_WAITLIST_BODY_BYTES + 1),
    });

    expect(result.status).toBe(413);
    expect(result.body).toEqual({ ok: false, error: "invalid_request" });
    expect(db.insertSubscriber).not.toHaveBeenCalled();
  });

  it("silently absorbs honeypot submissions", async () => {
    const db = makeDb();
    const result = await submit({ db }, {
      email: "bot@example.com",
      consent: true,
      company: "spam",
    });

    expect(result).toEqual({ status: 200, body: { ok: true } });
    expect(db.insertSubscriber).not.toHaveBeenCalled();
  });

  it("rejects automated submissions after the rate limit", async () => {
    const db = makeDb();
    const limiter = createRateLimiter({ limit: 1, now: () => 0 });

    expect((await submit({ db, limiter })).status).toBe(200);

    const limited = await submit({ db, limiter });
    expect(limited.status).toBe(429);
    expect(limited.body).toEqual({ ok: false, error: "rate_limited" });
    expect(limited.retryAfterSeconds).toBeGreaterThan(0);
    expect(db.insertSubscriber).toHaveBeenCalledTimes(1);
  });

  it("returns a safe error when the database is unavailable", async () => {
    const result = await submit({ db: null });

    expect(result.status).toBe(503);
    expect(result.body).toEqual({ ok: false, error: "unavailable" });
  });

  it("does not leak email or database details when an insert fails", async () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    const db = makeDb(async () => {
      throw new Error("connection refused for user@example.com");
    });

    const result = await submit({ db }, {
      email: "user@example.com",
      consent: true,
    });

    expect(result.status).toBe(503);
    expect(result.body).toEqual({ ok: false, error: "unavailable" });
    expect(JSON.stringify(result)).not.toContain("user@example.com");
    expect(JSON.stringify(consoleError.mock.calls)).not.toContain(
      "user@example.com",
    );
    expect(JSON.stringify(consoleError.mock.calls)).not.toContain(
      "connection refused",
    );
  });
});
