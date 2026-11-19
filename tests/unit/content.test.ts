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
    expect(FAQ_ITEMS.length).toBeGreaterThanOrEqual(10);
    expect(questions).toEqual([
      "What is DeBro?",
      "What are tokenized financial assets?",
      "What rights do tokenized assets provide?",
      "How is DeBro different from a traditional investing platform?",
      "How can I access DeBro?",
      "What are the risks?",
      "Why does DeBro use blockchain?",
      "When and where will DeBro be available?",
      "What happens after I join the waitlist?",
      "How is my email used?",
    ]);

    expect(FAQ_ITEMS.find((item) => item.question === "How can I access DeBro?")).toEqual({
      question: "How can I access DeBro?",
      answer:
        "DeBro is being designed to make investing accessible without requiring prior experience with crypto wallets. You'll be able to sign in using your email or Google account, or connect an existing compatible wallet. Wallets will work behind the scenes for users who choose a simpler sign-in experience, while those who prefer managing their own wallet can connect it directly.",
    });
    expect(FAQ_ITEMS.find((item) => item.question === "Why does DeBro use blockchain?")).toEqual({
      question: "Why does DeBro use blockchain?",
      answer:
        "DeBro uses Solana as the underlying infrastructure for tokenized assets. This enables digital assets to be transferred and transactions to be independently verified. Our goal is to make that technology work seamlessly in the background, so you can focus on investing rather than understanding blockchain.",
    });
    expect(FAQ_ITEMS.find((item) => item.question === "When and where will DeBro be available?")).toEqual({
      question: "When and where will DeBro be available?",
      answer:
        "DeBro is currently in development, with plans to make the platform accessible to investors across multiple markets. Availability will depend on local regulations, eligibility requirements and supported assets. Join the waitlist to receive an email when DeBro launches.",
    });

    for (const item of FAQ_ITEMS) {
      expect(item.answer.length).toBeGreaterThan(40);
    }
  });

  it("uses three distinct investing pillars", () => {
    expect(BENEFITS.map((benefit) => benefit.title)).toEqual([
      "A unified investing experience",
      "Clarity before decisions",
      "User control and asset portability",
    ]);
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

    expect(faqCopy).toMatch(/wallet/i);
    expect(faqCopy).toMatch(/managing their own wallet/i);
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
