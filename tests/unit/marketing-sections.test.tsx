// @vitest-environment jsdom

import { act, cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Security } from "@/components/sections/security";
import { WaitlistSection } from "@/components/sections/waitlist-section";
import { HowItWorks } from "@/components/sections/how-it-works";
import { SiteFooter } from "@/components/layout/site-footer";
import { ControlVisual, DiscoverVisual, InvestVisual } from "@/components/sections/product-visuals";
import { Hero } from "@/components/sections/hero";
import { WhyDeBro } from "@/components/sections/why-debro";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("marketing sections", () => {
  it("keeps the hero focused on the existing brand and navigation CTA", () => {
    render(<Hero />);

    expect(screen.getByRole("heading", { level: 1 })).toBeTruthy();
    expect(screen.getByRole("link", { name: /See how it works/ })).toBeTruthy();
    expect(screen.getByRole("link", { name: /Join the waitlist/ }).getAttribute("href")).toBe("#waitlist");
    expect(screen.queryByLabelText("Email address")).toBeNull();
  });

  it("renders the three immersive product stories and one contextual waitlist CTA", () => {
    render(<HowItWorks />);

    expect(screen.getByText("Discover what's possible.")).toBeTruthy();
    expect(screen.getByText("Invest without complexity.")).toBeTruthy();
    expect(screen.getByText("Stay in control.")).toBeTruthy();
    expect(screen.getAllByText("Get early access")).toHaveLength(1);
  });

  it("renders the 1,400+ assets heading as two exact lines", () => {
    render(<WhyDeBro />);

    expect(screen.getByText("1,400+ assets.")).toBeTruthy();
    expect(screen.getByText("One platform.")).toBeTruthy();
  });

  it("presents the editorial discovery composition", () => {
    render(<DiscoverVisual />);

    expect(screen.getByText("Find your next opportunity.")).toBeTruthy();
    expect(screen.getByText("Look beyond the ticker.")).toBeTruthy();
    expect(screen.getByText("Invest with greater perspective.")).toBeTruthy();
    expect(screen.getByText("EXPLORE")).toBeTruthy();
    expect(screen.getByText("RESEARCH")).toBeTruthy();
    expect(screen.getByText("EVALUATE")).toBeTruthy();
    expect(screen.queryByRole("searchbox")).toBeNull();
  });

  it("presents a minimal three-step investing composition", () => {
    render(<InvestVisual />);

    expect(screen.getByText("Select an asset")).toBeTruthy();
    expect(screen.getByText("Set an amount")).toBeTruthy();
    expect(screen.getByText("Review and confirm")).toBeTruthy();
    expect(screen.queryByRole("slider")).toBeNull();
  });

  it("reveals the illustrative portfolio chart when it enters the viewport", () => {
    let onIntersection: IntersectionObserverCallback | undefined;
    class MockIntersectionObserver {
      constructor(callback: IntersectionObserverCallback) {
        onIntersection = callback;
      }

      observe = vi.fn();
      disconnect = vi.fn();
      unobserve = vi.fn();
      takeRecords = () => [];
    }

    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
    const { container } = render(<ControlVisual />);
    const segments = container.querySelectorAll("circle");
    expect(segments[1]?.getAttribute("stroke-dasharray")).toMatch(/^0 /);
    expect(segments[1]?.getAttribute("stroke-linecap")).toBe("butt");

    const target = container.querySelector("svg");
    if (!target || !onIntersection) {
      throw new Error("The portfolio chart observer was not initialized.");
    }
    const entry: IntersectionObserverEntry = {
      boundingClientRect: new DOMRect(),
      intersectionRatio: 1,
      intersectionRect: new DOMRect(),
      isIntersecting: true,
      rootBounds: null,
      target,
      time: 0,
    };
    const observer: IntersectionObserver = {
      disconnect: vi.fn(),
      observe: vi.fn(),
      unobserve: vi.fn(),
      takeRecords: () => [],
      root: null,
      rootMargin: "0px",
      thresholds: [0.3],
    };
    const callback = onIntersection;
    act(() => callback([entry], observer));

    expect(segments[1]?.getAttribute("stroke-dasharray")).not.toMatch(/^0 /);
  });

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
      {
        name: "Email DeBro at hello@debro.finance",
        href: "mailto:hello@debro.finance",
      },
    ];

    for (const { name, href } of socialLinks) {
      const link = screen.getByRole("link", { name });
      expect(link.getAttribute("href")).toBe(href);
      if (href.startsWith("https://")) {
        expect(link.getAttribute("target")).toBe("_blank");
        expect(link.getAttribute("rel")).toBe("noopener noreferrer");
      }
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
