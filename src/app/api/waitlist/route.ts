import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { waitlistRateLimiter } from "@/lib/waitlist/rate-limit";
import { MAX_WAITLIST_BODY_BYTES } from "@/lib/waitlist/validation";
import { getWaitlistDb } from "@/server/db";
import { registerSubscriber } from "@/server/waitlist";
import { isWaitlistAttributionEnabled, isWaitlistEnabled } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const candidate = forwarded || headers.get("x-real-ip")?.trim() || "unknown";
  return candidate.slice(0, 100);
}

function hashClientIp(ip: string): string {
  const salt = process.env.RATE_LIMIT_SALT ?? "debro-waitlist";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_WAITLIST_BODY_BYTES) {
    return NextResponse.json(
      { ok: false, error: "invalid_request" },
      { status: 413, headers: { "Cache-Control": "no-store" } },
    );
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_request" },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  const result = await registerSubscriber({
    rawBody,
    ipHash: hashClientIp(getClientIp(request.headers)),
    enabled: isWaitlistEnabled(),
    db: getWaitlistDb(),
    limiter: waitlistRateLimiter,
    attributionEnabled: isWaitlistAttributionEnabled(),
  });

  const headers: Record<string, string> = { "Cache-Control": "no-store" };
  if (result.retryAfterSeconds) {
    headers["Retry-After"] = String(result.retryAfterSeconds);
  }

  return NextResponse.json(result.body, {
    status: result.status,
    headers,
  });
}
