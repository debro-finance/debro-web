import {
  ACQUISITION_BREAKDOWN_SQL,
  COUNT_NEW_REGISTRATIONS_SQL,
  COUNT_SUBSCRIBED_SQL,
  COUNT_UNSUBSCRIBED_SQL,
  DAILY_REGISTRATION_COUNTS_SQL,
  WEEKLY_REGISTRATION_COUNTS_SQL,
} from "@/lib/waitlist/sql";

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

export type WaitlistAcquisitionBreakdown = {
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
  count: number;
};

export type WaitlistReport = {
  subscribedCount: number;
  unsubscribedCount: number;
  newRegistrationsCount: number;
  dailyCounts: Array<{ day: string; count: number }>;
  weeklyCounts: Array<{ week: string; count: number }>;
  acquisitionBreakdown: WaitlistAcquisitionBreakdown[] | null;
};

function normalizeRangeValue(value: Date | string | null | undefined): string | null {
  if (value == null) {
    return null;
  }

  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new Error("Invalid waitlist report date range");
  }

  return date.toISOString();
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

export async function getWaitlistReport(
  db: WaitlistReportDb,
  range: WaitlistReportRange = {},
  options: { includeAcquisitionBreakdown?: boolean } = {},
): Promise<WaitlistReport> {
  const from = normalizeRangeValue(range.from);
  const to = normalizeRangeValue(range.to);

  const [subscribedRows, unsubscribedRows, newRows, dailyRows, weeklyRows] =
    await Promise.all([
      db.query(COUNT_SUBSCRIBED_SQL),
      db.query(COUNT_UNSUBSCRIBED_SQL),
      db.query(COUNT_NEW_REGISTRATIONS_SQL, [from, to]),
      db.query(DAILY_REGISTRATION_COUNTS_SQL, [from, to]),
      db.query(WEEKLY_REGISTRATION_COUNTS_SQL, [from, to]),
    ]);

  let acquisitionBreakdown: WaitlistAcquisitionBreakdown[] | null = null;
  if (options.includeAcquisitionBreakdown) {
    const rows = await db.query(ACQUISITION_BREAKDOWN_SQL);
    acquisitionBreakdown = rows.map((row) => ({
      utmSource: (row.utm_source as string | null) ?? null,
      utmMedium: (row.utm_medium as string | null) ?? null,
      utmCampaign: (row.utm_campaign as string | null) ?? null,
      utmContent: (row.utm_content as string | null) ?? null,
      count: typeof row.count === "number" ? row.count : Number(row.count ?? 0),
    }));
  }

  return {
    subscribedCount: asCount(subscribedRows),
    unsubscribedCount: asCount(unsubscribedRows),
    newRegistrationsCount: asCount(newRows),
    dailyCounts: dailyRows.map((row) => ({
      day: asDateString(row.day),
      count: typeof row.count === "number" ? row.count : Number(row.count ?? 0),
    })),
    weeklyCounts: weeklyRows.map((row) => ({
      week: asDateString(row.week),
      count: typeof row.count === "number" ? row.count : Number(row.count ?? 0),
    })),
    acquisitionBreakdown,
  };
}
