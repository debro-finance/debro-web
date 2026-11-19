// @vitest-environment jsdom

import { readFileSync } from "node:fs";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { SiteHeader } from "@/components/layout/site-header";
import { NAV_LINKS, WAITLIST_HREF } from "@/lib/site";

beforeEach(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

afterEach(() => {
  cleanup();
});

describe("mobile navigation", () => {
  it("starts closed and exposes the disclosure state", () => {
    render(<MobileMenu links={NAV_LINKS} />);

    const trigger = screen.getByRole("button", {
      name: "Open navigation menu",
    });

    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(document.getElementById("mobile-navigation")).toBeNull();
  });

  it("opens the panel, moves focus and closes on Escape", () => {
    render(<MobileMenu links={NAV_LINKS} />);

    fireEvent.click(
      screen.getByRole("button", { name: "Open navigation menu" }),
    );

    expect(
      screen
        .getByRole("button", { name: "Close navigation menu" })
        .getAttribute("aria-expanded"),
    ).toBe("true");
    expect(screen.getByRole("navigation", { name: "Mobile" })).toBeTruthy();
    expect(document.activeElement?.textContent).toBe("How it works");

    fireEvent.keyDown(document, { key: "Escape" });

    expect(document.getElementById("mobile-navigation")).toBeNull();
    expect(screen.getByRole("button", { name: "Open navigation menu" })).toBe(
      document.activeElement,
    );
  });

  it("closes on an outside pointer interaction", () => {
    render(<MobileMenu links={NAV_LINKS} />);

    fireEvent.click(
      screen.getByRole("button", { name: "Open navigation menu" }),
    );
    expect(screen.getByRole("navigation", { name: "Mobile" })).toBeTruthy();

    fireEvent.pointerDown(document.body);

    expect(document.getElementById("mobile-navigation")).toBeNull();
  });

  it("closes after following a navigation link", () => {
    render(<MobileMenu links={NAV_LINKS} />);

    fireEvent.click(
      screen.getByRole("button", { name: "Open navigation menu" }),
    );
    fireEvent.click(screen.getByRole("link", { name: "How it works" }));

    expect(document.getElementById("mobile-navigation")).toBeNull();
  });

  it("points every waitlist CTA at the waitlist section", () => {
    render(<MobileMenu links={NAV_LINKS} />);

    fireEvent.click(
      screen.getByRole("button", { name: "Open navigation menu" }),
    );

    expect(
      screen
        .getByRole("link", { name: "Join the waitlist" })
        .getAttribute("href"),
    ).toBe(WAITLIST_HREF);
  });
});

describe("header navigation", () => {
  it("uses the DeBro mark as a back-to-top link", () => {
    render(<SiteHeader />);

    expect(
      screen.getByRole("link", { name: "Scroll to top" }).getAttribute(
        "href",
      ),
    ).toBe("#");
  });
});

describe("waitlist anchors", () => {
  it("uses the waitlist section rather than the email input", () => {
    expect(WAITLIST_HREF).toBe("#waitlist");

    const files = [
      "src/components/layout/site-header.tsx",
      "src/components/layout/mobile-menu.tsx",
      "src/components/sections/hero.tsx",
      "src/components/sections/faq.tsx",
      "src/components/layout/site-footer.tsx",
    ];

    for (const file of files) {
      const source = readFileSync(path.join(process.cwd(), file), "utf8");
      expect(source).not.toContain("#waitlist-email");
    }
  });

  it("compensates anchors for the sticky header", () => {
    const css = readFileSync(
      path.join(process.cwd(), "src/app/globals.css"),
      "utf8",
    );

    expect(css).toMatch(/scroll-padding-top:\s*5\.5rem/);
  });
});
