import {
  ACQUISITION_BREAKDOWN_SQL,
  COUNT_NEW_REGISTRATIONS_SQL,
  COUNT_SUBSCRIBED_SQL,
  COUNT_UNSUBSCRIBED_SQL,
  DAILY_REGISTRATION_COUNTS_SQL,
  WEEKLY_REGISTRATION_COUNTS_SQL,
} from "../lib/waitlist/sql.ts";

export type WaitlistReportDb = {
  query<T extends Record<string, unknown> = Record<string, unknown>>(
    text: string,
    params?: readonly unknown[],
  ): Promise<readonly T[]>;
};

export type WaitlistReportRange = {
  from?: Date | string | null;
  to?: Date | string | null;
};

export type NormalizedWaitlistReportRange = {
  from: string | null;
  to: string | null;
};

export type WaitlistAcquisitionBreakdown = {
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
  count: number;
};

export type WaitlistReport = {
  /** All currently subscribed records, independent of the reporting window. */
  subscribedCount: number;
  unsubscribedCount: number;
  /** Registrations created inside the reporting window. */
  newRegistrationsCount: number;
  range: NormalizedWaitlistReportRange;
  dailyCounts: Array<{ day: string; count: number }>;
  weeklyCounts: Array<{ week: string; count: number }>;
  acquisitionBreakdown: WaitlistAcquisitionBreakdown[] | null;
  /** False when the pre-migration schema has no attribution columns. */
  attributionAvailable: boolean;
};

export type WaitlistReportErrorCode =
  | "invalid_date"
  | "invalid_range"
  | "invalid_argument"
  | "missing_argument_value"
  | "acquisition_unavailable";

export class WaitlistReportError extends Error {
  readonly code: WaitlistReportErrorCode;

  constructor(code: WaitlistReportErrorCode, message: string) {
    super(message);
    this.name = "WaitlistReportError";
    this.code = code;
  }
}

const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;

function normalizeBoundary(
  value: Date | string | null | undefined,
  boundary: "from" | "to",
): string | null {
  if (value == null) {
    return null;
  }

  if (typeof value === "string" && DATE_ONLY.test(value)) {
    const date = new Date(`${value}T00:00:00.000Z`);
    if (Number.isNaN(date.getTime())) {
      throw new WaitlistReportError("invalid_date", "Invalid reporting date.");
    }
    // A date-only end boundary means the whole UTC day: exclusive next midnight.
    if (boundary === "to") {
      date.setUTCDate(date.getUTCDate() + 1);
    }
    return date.toISOString();
  }

  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new WaitlistReportError("invalid_date", "Invalid reporting date.");
  }

  return date.toISOString();
}

/** Inclusive UTC start, exclusive UTC end. Reversed ranges are rejected. */
export function normalizeReportRange(
  range: WaitlistReportRange = {},
): NormalizedWaitlistReportRange {
  const from = normalizeBoundary(range.from, "from");
  const to = normalizeBoundary(range.to, "to");

  if (from && to && from >= to) {
    throw new WaitlistReportError(
      "invalid_range",
      "Reporting start must be before the end.",
    );
  }

  return { from, to };
}

export type WaitlistReportCliArgs = {
  from: string | null;
  to: string | null;
  includeAttribution: boolean;
  help: boolean;
};

/** Shared CLI argument parser so the CLI has no duplicate reporting logic. */
export function parseWaitlistReportArgs(
  argv: readonly string[],
): WaitlistReportCliArgs {
  const args: WaitlistReportCliArgs = {
    from: null,
    to: null,
    includeAttribution: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--from" || arg === "--to") {
      const value = argv[index + 1];
      if (value == null || value.startsWith("--")) {
        throw new WaitlistReportError(
          "missing_argument_value",
          `${arg} requires a value.`,
        );
      }
      args[arg === "--from" ? "from" : "to"] = value;
      index += 1;
      continue;
    }
    if (arg === "--include-attribution") {
      args.includeAttribution = true;
      continue;
    }
    if (arg === "--help" || arg === "-h") {
      args.help = true;
      continue;
    }

    throw new WaitlistReportError("invalid_argument", "Unknown argument.");
  }

  return args;
}

function asCount(rows: readonly Record<string, unknown>[]): number {
  const count = rows[0]?.count;
  return typeof count === "number" ? count : Number(count ?? 0);
}

function asDateString(value: unknown): string {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }
  return String(value);
}

function isMissingAttributionColumn(error: unknown): boolean {
  const code = (error as { code?: unknown } | null)?.code;
  return code === "42703" || code === "42P01";
}

export async function getWaitlistReport(
  db: WaitlistReportDb,
  range: WaitlistReportRange = {},
  options: { includeAcquisitionBreakdown?: boolean } = {},
): Promise<WaitlistReport> {
  const normalizedRange = normalizeReportRange(range);
  const params = [normalizedRange.from, normalizedRange.to] as const;

  const [subscribedRows, unsubscribedRows, newRows, dailyRows, weeklyRows] =
    await Promise.all([
      db.query(COUNT_SUBSCRIBED_SQL),
      db.query(COUNT_UNSUBSCRIBED_SQL),
      db.query(COUNT_NEW_REGISTRATIONS_SQL, params),
      db.query(DAILY_REGISTRATION_COUNTS_SQL, params),
      db.query(WEEKLY_REGISTRATION_COUNTS_SQL, params),
    ]);

  let acquisitionBreakdown: WaitlistAcquisitionBreakdown[] | null = null;
  let attributionAvailable = false;

  if (options.includeAcquisitionBreakdown === true) {
    try {
      const rows = await db.query(ACQUISITION_BREAKDOWN_SQL, params);
      attributionAvailable = true;
      acquisitionBreakdown = rows.map((row) => ({
        utmSource: (row.utm_source as string | null) ?? null,
        utmMedium: (row.utm_medium as string | null) ?? null,
        utmCampaign: (row.utm_campaign as string | null) ?? null,
        utmContent: (row.utm_content as string | null) ?? null,
        count: typeof row.count === "number" ? row.count : Number(row.count ?? 0),
      }));
    } catch (error) {
      // Pre-migration schemas legitimately lack the attribution columns. The
      // rest of the report remains available and no SQL/PII is surfaced.
      if (!isMissingAttributionColumn(error)) {
        throw new WaitlistReportError(
          "acquisition_unavailable",
          "Unable to produce the acquisition breakdown.",
        );
      }
    }
  }

  return {
    subscribedCount: asCount(subscribedRows),
    unsubscribedCount: asCount(unsubscribedRows),
    newRegistrationsCount: asCount(newRows),
    range: normalizedRange,
    dailyCounts: dailyRows.map((row) => ({
      day: asDateString(row.day),
      count: typeof row.count === "number" ? row.count : Number(row.count ?? 0),
    })),
    weeklyCounts: weeklyRows.map((row) => ({
      week: asDateString(row.week),
      count: typeof row.count === "number" ? row.count : Number(row.count ?? 0),
    })),
    acquisitionBreakdown,
    attributionAvailable,
  };
}
