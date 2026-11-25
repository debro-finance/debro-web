/**
 * Minimal, optional UTM attribution support for waitlist registrations.
 *
 * Collection is disabled by default and must be explicitly enabled by the owner.
 * Values are normalized against small approved allowlists. Invalid, unapproved,
 * or oversized values are discarded rather than rejected, so marketing metadata
 * can never block an otherwise valid waitlist registration.
 */

export const ATTRIBUTION_FIELDS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
] as const;

export type AttributionField = (typeof ATTRIBUTION_FIELDS)[number];

export const MAX_ATTRIBUTION_VALUE_LENGTH = 64;

export type Attribution = Record<AttributionField, string | null>;

/** Initial approved marketing vocabulary. Owner controls all entries. */
export const APPROVED_ATTRIBUTION_VALUES: Record<
  AttributionField,
  Set<string>
> = {
  utm_source: new Set([
    "x",
    "instagram",
    "linkedin",
    "reddit",
    "partner",
    "newsletter",
  ]),
  utm_medium: new Set(["social", "referral", "email"]),
  utm_campaign: new Set(["prelaunch", "hackathon", "launch"]),
  // Explicitly controlled, non-personal publication identifiers only.
  utm_content: new Set(["hero", "footer", "waitlist"]),
};

export function isApprovedAttributionValue(
  field: AttributionField,
  value: string,
): boolean {
  return APPROVED_ATTRIBUTION_VALUES[field]?.has(value) ?? false;
}

function sanitizeValue(field: AttributionField, rawValue: unknown): string | null {
  if (typeof rawValue !== "string") {
    return null;
  }

  const normalized = rawValue.trim().toLowerCase();
  if (
    normalized.length === 0 ||
    normalized.length > MAX_ATTRIBUTION_VALUE_LENGTH ||
    !isApprovedAttributionValue(field, normalized)
  ) {
    return null;
  }

  return normalized;
}

export type AttributionParseOptions = {
  enabled?: boolean;
};

/**
 * Returns null when collection is disabled or no approved values are present.
 * A non-null result contains only approved, normalized values; every other
 * field is null. This function intentionally never fails registration.
 */
export function parseAttribution(
  input: unknown,
  options: AttributionParseOptions = {},
): Attribution | null {
  if (options.enabled !== true) {
    return null;
  }

  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    return null;
  }

  const record = input as Record<string, unknown>;
  const attribution: Attribution = {
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
    utm_content: null,
  };
  let hasApprovedValue = false;

  for (const field of ATTRIBUTION_FIELDS) {
    if (!Object.prototype.hasOwnProperty.call(record, field)) {
      continue;
    }

    const value = sanitizeValue(field, record[field]);
    if (value !== null) {
      attribution[field] = value;
      hasApprovedValue = true;
    }
  }

  return hasApprovedValue ? attribution : null;
}

export function hasAttributionValues(attribution: Attribution | null | undefined): boolean {
  if (!attribution) {
    return false;
  }

  return ATTRIBUTION_FIELDS.some((field) => attribution[field] !== null);
}
