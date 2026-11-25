import { z } from "zod";

import {
  parseAttribution,
  type Attribution,
  type AttributionParseOptions,
} from "@/lib/waitlist/attribution";

export const MAX_WAITLIST_BODY_BYTES = 4 * 1024;

/**
 * Conservative normalization: trim surrounding whitespace and lowercase the
 * whole address. Local-part case is theoretically significant under RFC 5321,
 * but mainstream mailbox providers treat it case-insensitively, and lowering
 * the whole address is the safer duplicate-prevention policy for this list.
 */
export const waitlistEmailSchema = z
  .string()
  .trim()
  .max(254, "Email is too long.")
  .toLowerCase()
  .pipe(z.email("Enter a valid email address."));

export type WaitlistPayload = {
  email: string;
  consent: true;
  attribution: Attribution | null;
};

export type ParseWaitlistOptions = {
  attributionEnabled?: boolean;
};

export type ParseResult =
  | { ok: true; honeypot: true }
  | { ok: true; honeypot: false; payload: WaitlistPayload }
  | {
      ok: false;
      error:
        | "invalid_request"
        | "invalid_email"
        | "consent_required"
        | "invalid_attribution";
    };

export function parseWaitlistPayload(
  rawBody: string,
  options: ParseWaitlistOptions = {},
): ParseResult {
  let data: unknown;

  try {
    data = JSON.parse(rawBody);
  } catch {
    return { ok: false, error: "invalid_request" };
  }

  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    return { ok: false, error: "invalid_request" };
  }

  const record = data as Record<string, unknown>;

  if (isHoneypotFilled(record.company)) {
    return { ok: true, honeypot: true };
  }

  const emailResult = waitlistEmailSchema.safeParse(record.email);
  if (!emailResult.success) {
    return { ok: false, error: "invalid_email" };
  }

  if (record.consent !== true) {
    return { ok: false, error: "consent_required" };
  }

  const attributionResult = parseAttribution(record, {
    enabled: options.attributionEnabled === true,
  } satisfies AttributionParseOptions);
  if (!attributionResult.ok) {
    return { ok: false, error: attributionResult.error };
  }

  return {
    ok: true,
    honeypot: false,
    payload: {
      email: emailResult.data,
      consent: true,
      attribution: attributionResult.attribution,
    },
  };
}

export function isHoneypotFilled(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0;
}
