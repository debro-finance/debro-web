export type RateLimitDecision = {
  allowed: boolean;
  retryAfterSeconds: number;
};

export type RateLimiter = {
  consume(key: string): RateLimitDecision;
};

type Bucket = {
  count: number;
  resetAt: number;
};

/**
 * Small in-memory fixed-window limiter. It intentionally keeps only a hashed
 * visitor key and resets when the serverless instance is recycled. It raises
 * the cost of casual abuse but is not a distributed guarantee; a persistent
 * limiter can replace it later without changing callers.
 */
export function createRateLimiter({
  limit = 5,
  windowMs = 10 * 60 * 1000,
  maxKeys = 5_000,
  now = Date.now,
}: {
  limit?: number;
  windowMs?: number;
  maxKeys?: number;
  now?: () => number;
} = {}): RateLimiter {
  const buckets = new Map<string, Bucket>();

  function prune(currentTime: number) {
    for (const [key, bucket] of buckets) {
      if (bucket.resetAt <= currentTime) {
        buckets.delete(key);
      }
    }

    if (buckets.size > maxKeys) {
      const oldestKey = buckets.keys().next().value;
      if (oldestKey !== undefined) {
        buckets.delete(oldestKey);
      }
    }
  }

  return {
    consume(key: string): RateLimitDecision {
      const currentTime = now();
      const bucket = buckets.get(key);

      if (!bucket || bucket.resetAt <= currentTime) {
        if (buckets.size >= maxKeys) {
          prune(currentTime);
        }
        buckets.set(key, { count: 1, resetAt: currentTime + windowMs });
        return { allowed: true, retryAfterSeconds: 0 };
      }

      if (bucket.count >= limit) {
        return {
          allowed: false,
          retryAfterSeconds: Math.max(
            1,
            Math.ceil((bucket.resetAt - currentTime) / 1000),
          ),
        };
      }

      bucket.count += 1;
      return { allowed: true, retryAfterSeconds: 0 };
    },
  };
}

export const waitlistRateLimiter = createRateLimiter();
