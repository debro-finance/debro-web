import { describe, expect, it } from "vitest";
import {
  APPROVED_ATTRIBUTION_VALUES,
  parseAttribution,
} from "@/lib/waitlist/attribution";

describe("parseAttribution", () => {
  it("accepts only normalized approved values", () => {
    expect(
      parseAttribution(
        {
          utm_source: " INSTAGRAM ",
          utm_medium: "social",
          utm_campaign: "HACKATHON",
          utm_content: "footer",
        },
        { enabled: true },
      ),
    ).toEqual({
      utm_source: "instagram",
      utm_medium: "social",
      utm_campaign: "hackathon",
      utm_content: "footer",
    });
  });

  it("discards unapproved, malformed, and oversized values", () => {
    expect(
      parseAttribution(
        {
          utm_source: "tracking-partner",
          utm_medium: "social",
          utm_campaign: "x".repeat(65),
          utm_content: 42,
        },
        { enabled: true },
      ),
    ).toEqual({
      utm_source: null,
      utm_medium: "social",
      utm_campaign: null,
      utm_content: null,
    });
  });

  it("returns null when disabled or when nothing is approved", () => {
    const approved = {
      utm_source: "instagram",
      utm_medium: "social",
      utm_campaign: "launch",
      utm_content: "hero",
    };

    expect(parseAttribution(approved, { enabled: false })).toBeNull();
    expect(
      parseAttribution({ utm_source: "unapproved" }, { enabled: true }),
    ).toBeNull();
  });

  it("uses only the approved marketing vocabulary", () => {
    expect([...APPROVED_ATTRIBUTION_VALUES.utm_source]).toEqual([
      "x",
      "instagram",
      "linkedin",
      "reddit",
      "partner",
      "newsletter",
    ]);
    expect([...APPROVED_ATTRIBUTION_VALUES.utm_medium]).toEqual([
      "social",
      "referral",
      "email",
    ]);
    expect([...APPROVED_ATTRIBUTION_VALUES.utm_campaign]).toEqual([
      "prelaunch",
      "hackathon",
      "launch",
    ]);
  });
});
