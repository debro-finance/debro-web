import {
  BENEFITS,
  FAQ_ITEMS,
  HERO,
  RISK_DISCLOSURE,
  SECURITY_PRINCIPLES,
  STEPS,
  WAITLIST_POINTS,
} from "@/content/site";
import { describe, expect, it } from "vitest";

import { NAV_LINKS } from "@/lib/site";

describe("landing content", () => {
  it("has a unique, complete FAQ", () => {
    const questions = FAQ_ITEMS.map((item) => item.question);

    expect(new Set(questions).size).toBe(questions.length);
    expect(FAQ_ITEMS).toHaveLength(9);
    expect(questions).toEqual([
      "What is DeBro?",
      "What are tokenized financial assets?",
      "What can I invest in with DeBro?",
      "Can I transfer my assets outside DeBro?",
      "Can I use DeBro from anywhere in the world?",
      "Do I need a crypto wallet?",
      "Why does DeBro use blockchain?",
      "What are the risks?",
      "What happens after I join the waitlist?",
    ]);

    expect(HERO.description).toBe(
      "Discover a new way to invest in tokenized stocks and financial assets. DeBro brings global investment opportunities together in one simple, modern platform — designed to make investing more accessible and give you greater control over your assets.",
    );
    expect(HERO.note).toBe("DeBro is in development. Investing is not available yet.");
    expect(STEPS.map((step) => step.description)).toEqual([
      "Explore tokenized stocks, ETFs and other financial assets from a growing universe of investment opportunities.",
      "Buy and sell tokenized assets through an intuitive platform designed to make investing simple and accessible.",
      "Manage your portfolio and transfer supported tokenized assets to compatible wallets, with the flexibility to move beyond DeBro.",
    ]);
    expect(BENEFITS).toEqual([
      {
        title: "1,400+ assets. One platform.",
        description:
          "DeBro is working toward bringing more than 1,400 tokenized financial assets together, including stocks and ETFs, making it easier to explore investment opportunities from one place.",
      },
      {
        title: "Investing made simple",
        description: "Experience financial markets through a familiar and intuitive platform.",
      },
      {
        title: "Your assets. Your freedom.",
        description:
          "Take greater control of your investments with the ability to transfer supported tokenized assets to other compatible wallets, rather than keeping everything inside one platform.",
      },
    ]);
    expect(SECURITY_PRINCIPLES).toEqual([
      {
        title: "Invest with confidence",
        description:
          "Enjoy a clear, intuitive investing experience designed to put the information you need within reach.",
      },
      {
        title: "Stay in control",
        description:
          "Manage your investments from one place, with visibility and control at the center of the experience.",
      },
      {
        title: "Freedom beyond DeBro",
        description:
          "Transfer supported tokenized assets to compatible wallets and enjoy greater flexibility beyond a single platform.",
      },
    ]);
    expect(
      FAQ_ITEMS.find((item) => item.question === "What are tokenized financial assets?")?.answer,
    ).toContain("not necessarily equivalent to direct ownership of traditional shares");
    expect(
      FAQ_ITEMS.find((item) => item.question === "What can I invest in with DeBro?")?.answer,
    ).toBe(
      "DeBro is being built to provide access to a broad range of tokenized financial assets, including stocks and ETFs. Our goal is to expand toward more than 1,400 assets over time. The available selection will grow as the platform develops.",
    );
    expect(
      FAQ_ITEMS.find((item) => item.question === "Can I transfer my assets outside DeBro?")?.answer,
    ).toBe(
      "Yes. DeBro is designed to let you transfer supported tokenized assets to compatible wallets, giving you greater flexibility in how you manage your holdings. Asset-specific restrictions may apply.",
    );
    expect(
      FAQ_ITEMS.find((item) => item.question === "Can I use DeBro from anywhere in the world?")
        ?.answer,
    ).toBe(
      "DeBro is designed for investors around the world. Availability of certain assets and services may vary by country, local regulations and eligibility requirements.",
    );
    expect(FAQ_ITEMS.find((item) => item.question === "Do I need a crypto wallet?")?.answer).toBe(
      "No crypto experience is required. DeBro will support signing in with email or Google, as well as connecting an existing compatible wallet. Wallet functionality will work behind the scenes for users choosing the simpler sign-in experience.",
    );
    expect(
      FAQ_ITEMS.find((item) => item.question === "Why does DeBro use blockchain?")?.answer,
    ).toBe(
      "Blockchain enables tokenized assets to move between compatible wallets and supports independently verifiable transactions. DeBro uses Solana as its underlying infrastructure, while keeping the investing experience simple and familiar.",
    );
    expect(RISK_DISCLOSURE).toBe(
      "Tokenized assets involve risk and may lose value. A tokenized stock is not necessarily equivalent to direct ownership of traditional shares. This is not investment advice or an offer to buy or sell financial instruments.",
    );

    for (const item of FAQ_ITEMS) {
      expect(item.answer.length).toBeGreaterThan(40);
    }
  });

  it("uses three distinct investing pillars", () => {
    expect(BENEFITS.map((benefit) => benefit.title)).toEqual([
      "1,400+ assets. One platform.",
      "Investing made simple",
      "Your assets. Your freedom.",
    ]);
  });

  it("exposes the required single-page anchors", () => {
    const hrefs = NAV_LINKS.map((link) => link.href);

    expect(hrefs).toEqual(["#how-it-works", "#why-debro", "#security", "#faq"]);
  });

  it("does not invent a launch date or availability", () => {
    const copy = JSON.stringify({ HERO, STEPS, FAQ_ITEMS });
    const answers = FAQ_ITEMS.map((item) => item.answer).join(" ");

    expect(copy).not.toMatch(/q[1-4]\s*20\d{2}|launching on/i);
    expect(answers).not.toMatch(/available worldwide|globally available|in every country/i);
    expect(HERO.note).toMatch(/in development/i);
  });

  it("leads with investing rather than crypto infrastructure", () => {
    expect(`${HERO.titleLead} ${HERO.titleAccent}`).toMatch(/invest in tokenized assets/i);

    const primaryCopy = JSON.stringify({
      HERO,
      STEPS,
      BENEFITS,
      WAITLIST_POINTS,
    });

    expect(primaryCopy).not.toMatch(/solana|self-custody|on-chain/i);
  });

  it("keeps wallet, Solana and self-custody explanations in the FAQ", () => {
    const faqCopy = FAQ_ITEMS.map((item) => `${item.question} ${item.answer}`).join(" ");

    expect(faqCopy).toMatch(/wallet/i);
    expect(faqCopy).toMatch(/email or Google/i);
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
      /guaranteed returns|risk[- ]free|bank[- ]grade|available everywhere|in every country|zero fees/i,
    );
  });
});
