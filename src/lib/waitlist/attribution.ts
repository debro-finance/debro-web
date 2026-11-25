/**
 * Minimal, optional UTM attribution support for waitlist registrations.
 *
 * Collection is disabled by default and must be explicitly enabled by the owner.
 * Values are never stored unless they are present in the approved allowlists below.
 * The allowlists are intentionally empty until the owner approves campaign values.
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

export const APPROVED_ATTRIBUTION_VALUES: Record<
  AttributionField,
  Set<string>
> = {
  utm_source: new Set<string>(),
  utm_medium: new Set<string>(),
  utm_campaign: new Set<string>(),
  utm_content: new Set<string>(),
};

export function isApprovedAttributionValue(
  field: AttributionField,
  value: string,
): boolean {
  return APPROVED_ATTRIBUTION_VALUES[field]?.has(value) ?? false;
}

export type AttributionParseResult =
  | { ok: true; attribution: Attribution }
  | { ok: false; error: "invalid_attribution" };

export type AttributionParseOptions = {
  enabled?: boolean;
};

export function parseAttribution(
  input: unknown,
  options: AttributionParseOptions = {},
): AttributionParseResult {
  const enabled = options.enabled === true;
  const attribution: Attribution = {
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
    utm_content: null,
  };

  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    return { ok: true, attribution };
  }

  const record = input as Record<string, unknown>;

  for (const field of ATTRIBUTION_FIELDS) {
    if (!Object.prototype.hasOwnProperty.call(record, field)) {
      continue;
    }

    const rawValue = record[field];
    if (rawValue === undefined || rawValue === null) {
      attribution[field] = null;
      continue;
    }

    if (typeof rawValue !== "string") {
      return { ok: false, error: "invalid_attribution" };
    }

    const normalized = rawValue.trim();
    if (normalized.length === 0) {
      attribution[field] = null;
      continue;
    }

    if (normalized.length > MAX_ATTRIBUTION_VALUE_LENGTH) {
      return { ok: false, error: "invalid_attribution" };
    }

    if (enabled && !isApprovedAttributionValue(field, normalized)) {
      return { ok: false, error: "invalid_attribution" };
    }

    attribution[field] = enabled ? normalized : null;
  }

  if (!enabled) {
    for (const field of ATTRIBUTION_FIELDS) {
      attribution[field] = null;
    }
  }

  return { ok: true, attribution };
}

export function hasAttributionValues(attribution: Attribution | null | undefined): boolean {
  if (!attribution) {
    return false;
  }

  return ATTRIBUTION_FIELDS.some((field) => attribution[field] !== null);
}
