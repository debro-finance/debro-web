// @vitest-environment jsdom

import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Security } from "@/components/sections/security";
import { WaitlistSection } from "@/components/sections/waitlist-section";
import { SiteFooter } from "@/components/layout/site-footer";

afterEach(() => {
  cleanup();
});

describe("marketing sections", () => {
  it("links to DeBro's social profiles in a new tab", () => {
    render(<SiteFooter />);

    const socialLinks = [
      {
        name: "DeBro on X",
        href: "https://x.com/debrofinance",
      },
      {
        name: "DeBro on Instagram",
        href: "https://www.instagram.com/debro.finance/",
      },
    ];

    for (const { name, href } of socialLinks) {
      const link = screen.getByRole("link", { name });
      expect(link.getAttribute("href")).toBe(href);
      expect(link.getAttribute("target")).toBe("_blank");
      expect(link.getAttribute("rel")).toBe("noopener noreferrer");
    }
  });

  it("keeps Security & Transparency focused on its three principles", () => {
    render(
      <>
        <Security />
        <SiteFooter />
      </>,
    );

    const security = screen.getByRole("region", {
      name: "Transparency without complexity.",
    });

    expect(
      within(security).getByText(
        "Modern financial technology, designed to make investing more transparent while keeping the experience simple and familiar.",
      ),
    ).toBeTruthy();
    expect(within(security).getByText("Verifiable by design")).toBeTruthy();
    expect(
      within(security).getByText("Your portfolio, clearly presented"),
    ).toBeTruthy();
    expect(
      within(security).getByText("Technology in the background"),
    ).toBeTruthy();
    expect(security.textContent).not.toContain("Risk, in context");
    expect(screen.getByText(/Tokenized assets involve risk/)).toBeTruthy();
  });

  it("shows the requested waitlist invitation with one consent disclosure", () => {
    render(<WaitlistSection />);

    const waitlist = screen.getByRole("region", {
      name: "Be part of what's next in investing.",
    });

    expect(
      within(waitlist).getByText(
        "Join the DeBro waitlist and be among the first to hear when our new investing experience launches.",
      ),
    ).toBeTruthy();
    expect(
      within(waitlist).getByText(/I agree to receive one email announcing DeBro's availability/),
    ).toBeTruthy();
    expect(within(waitlist).getAllByText(/No newsletters/)).toHaveLength(1);
  });
});
