import { describe, expect, it } from "vitest";
import {
  BENEFITS,
  FAQ_ITEMS,
  HERO,
  SECURITY_PRINCIPLES,
  STEPS,
  WAITLIST_POINTS,
} from "@/content/site";
import { NAV_LINKS } from "@/lib/site";

describe("landing content", () => {
  it("has a unique, complete FAQ", () => {
    const questions = FAQ_ITEMS.map((item) => item.question);

    expect(new Set(questions).size).toBe(questions.length);
    expect(FAQ_ITEMS.length).toBeGreaterThanOrEqual(8);

    for (const item of FAQ_ITEMS) {
      expect(item.answer.length).toBeGreaterThan(40);
    }
  });

  it("exposes the required single-page anchors", () => {
    const hrefs = NAV_LINKS.map((link) => link.href);

    expect(hrefs).toEqual([
      "#how-it-works",
      "#why-debro",
      "#security",
      "#faq",
    ]);
  });

  it("does not invent a launch date or availability", () => {
    const copy = JSON.stringify({ HERO, STEPS, FAQ_ITEMS });
    const answers = FAQ_ITEMS.map((item) => item.answer).join(" ");

    expect(copy).not.toMatch(/q[1-4]\s*20\d{2}|launching on/i);
    expect(answers).not.toMatch(/available worldwide|globally available|in every country/i);
    expect(HERO.note).toMatch(/in development/i);
  });

  it("leads with investing rather than crypto infrastructure", () => {
    expect(`${HERO.titleLead} ${HERO.titleAccent}`).toMatch(
      /invest in tokenized assets/i,
    );

    const primaryCopy = JSON.stringify({
      HERO,
      STEPS,
      BENEFITS,
      SECURITY_PRINCIPLES,
      WAITLIST_POINTS,
    });

    expect(primaryCopy).not.toMatch(
      /solana|wallet|self-custody|on-chain|blockchain/i,
    );
  });

  it("keeps wallet, Solana and self-custody explanations in the FAQ", () => {
    const faqCopy = FAQ_ITEMS.map(
      (item) => `${item.question} ${item.answer}`,
    ).join(" ");

    expect(faqCopy).toMatch(/Solana wallet/i);
    expect(faqCopy).toMatch(/self-custody/i);
    expect(faqCopy).toMatch(/blockchain/i);
    expect(faqCopy).toMatch(/Solana/i);
  });

  it("does not promise returns, safety or universal access", () => {
    const allCopy = JSON.stringify({
      HERO,
      STEPS,
      BENEFITS,
      SECURITY_PRINCIPLES,
      FAQ_ITEMS,
    });

    expect(allCopy).not.toMatch(
      /guaranteed returns|risk[- ]free|bank[- ]grade|available everywhere|zero fees/i,
    );
  });
});
