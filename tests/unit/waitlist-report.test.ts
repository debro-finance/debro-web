import { describe, expect, it, vi } from "vitest";
import {
  getWaitlistReport,
  hasAttributionColumns,
  normalizeReportRange,
  parseWaitlistReportArgs,
  WaitlistReportError,
  type WaitlistReportDb,
} from "@/server/waitlist-report";

describe("normalizeReportRange", () => {
  it("uses inclusive UTC start and exclusive UTC end for date-only values", () => {
    expect(
      normalizeReportRange({ from: "2026-01-01", to: "2026-01-31" }),
    ).toEqual({
      from: "2026-01-01T00:00:00.000Z",
      to: "2026-02-01T00:00:00.000Z",
    });
  });

  it("converts offset timestamps to UTC boundaries", () => {
    expect(
      normalizeReportRange({
        from: "2026-01-01T02:00:00+02:00",
        to: "2026-01-02T02:00:00+02:00",
      }),
    ).toEqual({
      from: "2026-01-01T00:00:00.000Z",
      to: "2026-01-02T00:00:00.000Z",
    });
  });

  it("rejects reversed or equal ranges", () => {
    expect(() =>
      normalizeReportRange({ from: "2026-02-01", to: "2026-01-01" }),
    ).toThrow(WaitlistReportError);
    expect(() =>
      normalizeReportRange({
        from: "2026-01-01T00:00:00Z",
        to: "2026-01-01T00:00:00Z",
      }),
    ).toThrow(/start must be before/);
  });
});

describe("parseWaitlistReportArgs", () => {
  it("parses flags and rejects missing values", () => {
    expect(
      parseWaitlistReportArgs([
        "--from",
        "2026-01-01",
        "--to",
        "2026-02-01",
        "--include-attribution",
      ]),
    ).toEqual({
      from: "2026-01-01",
      to: "2026-02-01",
      includeAttribution: true,
      help: false,
    });

    expect(() => parseWaitlistReportArgs(["--from"])).toThrow(
      /requires a value/,
    );
    expect(() => parseWaitlistReportArgs(["--to", "--include-attribution"])).toThrow(
      WaitlistReportError,
    );
  });
});

describe("hasAttributionColumns", () => {
  it("checks the four attribution columns read-only", async () => {
    const query = vi.fn(async (text: string) => {
      void text;
      return [{ count: 4 }];
    });
    expect(
      await hasAttributionColumns({
        query: query as unknown as WaitlistReportDb["query"],
      }),
    ).toBe(true);
    expect(query.mock.calls[0]?.[0]).toContain("information_schema.columns");

    const missing = vi.fn(async () => [{ count: 0 }]);
    expect(
      await hasAttributionColumns({
        query: missing as unknown as WaitlistReportDb["query"],
      }),
    ).toBe(false);
  });
});

describe("getWaitlistReport", () => {
  it("returns aggregate counts and passes the UTC window to every query", async () => {
    const query = vi.fn(async (sql: string, params: readonly unknown[] = []) => {
      void params;
      if (sql.includes("status = 'subscribed'")) return [{ count: 3 }];
      if (sql.includes("status = 'unsubscribed'")) return [{ count: 1 }];
      if (sql.includes("AS day")) {
        return [{ day: "2026-01-01", count: 2 }];
      }
      if (sql.includes("AS week")) {
        return [{ week: "2025-12-29", count: 2 }];
      }
      if (sql.includes("GROUP BY utm_source")) {
        return [
          {
            utm_source: "newsletter",
            utm_medium: "email",
            utm_campaign: "prelaunch",
            utm_content: null,
            count: 2,
          },
        ];
      }
      return [{ count: 2 }];
    });

    const report = await getWaitlistReport(
      { query: query as unknown as WaitlistReportDb["query"] },
      { from: "2026-01-01", to: "2026-01-31" },
      { includeAcquisitionBreakdown: true },
    );

    expect(report).toEqual({
      subscribedCount: 3,
      unsubscribedCount: 1,
      newRegistrationsCount: 2,
      range: {
        from: "2026-01-01T00:00:00.000Z",
        to: "2026-02-01T00:00:00.000Z",
      },
      dailyCounts: [{ day: "2026-01-01", count: 2 }],
      weeklyCounts: [{ week: "2025-12-29", count: 2 }],
      acquisitionBreakdown: [
        {
          utmSource: "newsletter",
          utmMedium: "email",
          utmCampaign: "prelaunch",
          utmContent: null,
          count: 2,
        },
      ],
      attributionAvailable: true,
    });

    const rangeCalls = query.mock.calls.filter((call) => call[1] !== undefined);
    expect(rangeCalls.length).toBeGreaterThan(0);
    for (const call of rangeCalls) {
      expect(call[1]).toEqual([
        "2026-01-01T00:00:00.000Z",
        "2026-02-01T00:00:00.000Z",
      ]);
    }
  });

  it("omits acquisition breakdown unless requested", async () => {
    const query = vi.fn(async (sql: string) => {
      if (sql.includes("GROUP BY utm_source")) {
        throw new Error("should not query attribution");
      }
      return [{ count: 0 }];
    });

    const report = await getWaitlistReport(
      { query: query as unknown as WaitlistReportDb["query"] },
      {},
    );

    expect(report.acquisitionBreakdown).toBeNull();
    expect(report.attributionAvailable).toBe(false);
    expect(report.range).toEqual({ from: null, to: null });
  });

  it("handles a pre-migration schema without attribution columns", async () => {
    const query = vi.fn(async (sql: string) => {
      if (sql.includes("GROUP BY utm_source")) {
        throw Object.assign(new Error("column does not exist"), {
          code: "42703",
        });
      }
      return [{ count: 0 }];
    });

    const report = await getWaitlistReport(
      { query: query as unknown as WaitlistReportDb["query"] },
      {},
      { includeAcquisitionBreakdown: true },
    );

    expect(report.acquisitionBreakdown).toBeNull();
    expect(report.attributionAvailable).toBe(false);
    expect(report.subscribedCount).toBe(0);
  });

  it("does not surface raw database errors", async () => {
    const query = vi.fn(async (sql: string) => {
      if (sql.includes("GROUP BY utm_source")) {
        throw new Error("secret connection detail for user@example.com");
      }
      return [{ count: 0 }];
    });

    await expect(
      getWaitlistReport(
        { query: query as unknown as WaitlistReportDb["query"] },
        {},
        { includeAcquisitionBreakdown: true },
      ),
    ).rejects.toMatchObject({ code: "acquisition_unavailable" });
  });
});
