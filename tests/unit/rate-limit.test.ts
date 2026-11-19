import { describe, expect, it } from "vitest";
import { createRateLimiter } from "@/lib/waitlist/rate-limit";

describe("createRateLimiter", () => {
  it("allows requests up to the limit and then rejects", () => {
    const now = 1_000;
    const limiter = createRateLimiter({
      limit: 2,
      windowMs: 10_000,
      now: () => now,
    });

    expect(limiter.consume("a").allowed).toBe(true);
    expect(limiter.consume("a").allowed).toBe(true);

    const blocked = limiter.consume("a");
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSeconds).toBe(10);
  });

  it("resets after the window expires", () => {
    let now = 0;
    const limiter = createRateLimiter({
      limit: 1,
      windowMs: 1_000,
      now: () => now,
    });

    expect(limiter.consume("a").allowed).toBe(true);
    expect(limiter.consume("a").allowed).toBe(false);

    now = 1_000;
    expect(limiter.consume("a").allowed).toBe(true);
  });

  it("tracks keys independently", () => {
    const limiter = createRateLimiter({ limit: 1, now: () => 0 });

    expect(limiter.consume("visitor-a").allowed).toBe(true);
    expect(limiter.consume("visitor-b").allowed).toBe(true);
    expect(limiter.consume("visitor-a").allowed).toBe(false);
  });

  it("bounds the number of retained keys", () => {
    const limiter = createRateLimiter({
      limit: 1,
      maxKeys: 2,
      now: () => 0,
    });

    expect(limiter.consume("a").allowed).toBe(true);
    expect(limiter.consume("b").allowed).toBe(true);
    expect(limiter.consume("c").allowed).toBe(true);
    expect(limiter.consume("c").allowed).toBe(false);
  });
});
