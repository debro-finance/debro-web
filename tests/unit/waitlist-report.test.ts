import { describe, expect, it, vi } from "vitest";
import { getWaitlistReport, type WaitlistReportDb } from "@/server/waitlist-report";

describe("getWaitlistReport", () => {
  it("returns aggregate counts and date buckets", async () => {
    const query = vi.fn(async (sql: string) => {
      if (sql.includes("status = 'subscribed'")) return [{ count: 3 }];
      if (sql.includes("status = 'unsubscribed'")) return [{ count: 1 }];
      if (sql.includes("date_trunc('day'")) {
        return [{ day: "2026-01-01", count: 2 }];
      }
      if (sql.includes("date_trunc('week'")) {
        return [{ week: "2025-12-29", count: 2 }];
      }
      if (sql.includes("GROUP BY utm_source")) {
        return [
          {
            utm_source: "newsletter",
            utm_medium: "email",
            utm_campaign: "launch",
            utm_content: null,
            count: 2,
          },
        ];
      }
      return [{ count: 2 }];
    });

    const report = await getWaitlistReport(
      { query: query as unknown as WaitlistReportDb["query"] },
      { from: "2026-01-01T00:00:00Z", to: "2026-01-31T23:59:59Z" },
      { includeAcquisitionBreakdown: true },
    );

    expect(report).toEqual({
      subscribedCount: 3,
      unsubscribedCount: 1,
      newRegistrationsCount: 2,
      dailyCounts: [{ day: "2026-01-01", count: 2 }],
      weeklyCounts: [{ week: "2025-12-29", count: 2 }],
      acquisitionBreakdown: [
        {
          utmSource: "newsletter",
          utmMedium: "email",
          utmCampaign: "launch",
          utmContent: null,
          count: 2,
        },
      ],
    });
    expect(JSON.stringify(report)).not.toMatch(/@/);
    expect(JSON.stringify(report)).not.toMatch(/user@example/i);
  });

  it("omits acquisition breakdown unless requested", async () => {
    const query = vi.fn(async (sql: string) => {
      if (sql.includes("status = 'subscribed'")) return [{ count: 0 }];
      if (sql.includes("status = 'unsubscribed'")) return [{ count: 0 }];
      if (sql.includes("date_trunc('day'")) return [];
      if (sql.includes("date_trunc('week'")) return [];
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
  });

  it("rejects invalid date ranges", async () => {
    await expect(
      getWaitlistReport(
        { query: (async () => []) as unknown as WaitlistReportDb["query"] },
        { from: "not-a-date" },
      ),
    ).rejects.toThrow(/Invalid waitlist report date range/);
  });
});
