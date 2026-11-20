import {
  BENEFITS,
  FAQ_ITEMS,
  HERO,
  SECURITY_PRINCIPLES,
  STEPS,
  WAITLIST_POINTS,
} from "@/content/site";
import { describe, expect, it } from "vitest";

import { NAV_LINKS, SITE_DESCRIPTION } from "@/lib/site";

describe("landing content", () => {
  it("has a unique, complete FAQ", () => {
    const questions = FAQ_ITEMS.map((item) => item.question);

    expect(new Set(questions).size).toBe(questions.length);
    expect(FAQ_ITEMS).toHaveLength(10);
    expect(questions).toEqual([
      "What is DeBro?",
      "Why choose DeBro over a traditional broker?",
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
      "Discover tokenized stocks, ETFs, and investment opportunities from around the world. DeBro brings investing, portfolio management, and greater freedom over your assets together in one intuitive platform.",
    );
    expect(SITE_DESCRIPTION).toBe(HERO.description);
    expect(HERO.note).toBe("DeBro is in development. Investing is not available yet.");
    expect(STEPS.map((step) => step.description)).toEqual([
      "Explore tokenized stocks and ETFs through a simple, intuitive experience.",
      "A straightforward experience designed to make investing easier to understand.",
      "Follow your portfolio and manage your tokenized assets in one place.",
    ]);
    expect(BENEFITS).toEqual([
      {
        title: "1,400+ assets. One platform.",
        description:
          "Explore a broad investment universe of tokenized stocks, ETFs, and other financial assets — all from one platform.",
      },
      {
        title: "Get started your way",
        description:
          "Sign in with email or Google, or connect your existing compatible wallet. No crypto experience required.",
      },
      {
        title: "Your assets. Your freedom.",
        description:
          "Take your investments beyond DeBro. Transfer eligible tokenized assets to compatible wallets and enjoy greater freedom over how you manage your holdings.",
      },
    ]);
    expect(SECURITY_PRINCIPLES).toEqual([
      {
        title: "Verifiable by design",
        description:
          "Transactions recorded on Solana can be independently verified, bringing greater transparency to investment activity.",
      },
      {
        title: "Your portfolio, clearly presented",
        description:
          "Follow your investments, positions, and activity from one intuitive experience.",
      },
      {
        title: "Technology in the background",
        description:
          "DeBro brings blockchain-powered financial infrastructure into a familiar investing experience, without requiring technical expertise.",
      },
    ]);
    expect(
      FAQ_ITEMS.find((item) => item.question === "What are tokenized financial assets?")?.answer,
    ).toContain("not necessarily equivalent to direct ownership of traditional shares");
    expect(
      FAQ_ITEMS.find((item) => item.question === "Why choose DeBro over a traditional broker?")
        ?.answer,
    ).toBe(
      "DeBro combines a familiar investing experience with the possibilities of tokenized financial assets. Explore a broad investment universe, access your account without crypto experience, and enjoy greater flexibility to transfer eligible assets beyond the platform.",
    );
    expect(
      FAQ_ITEMS.find((item) => item.question === "What can I invest in with DeBro?")?.answer,
    ).toBe(
      "DeBro is building toward 1,400+ tokenized assets, including stocks and ETFs. The available catalog will evolve as the platform develops.",
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
    expect(FAQ_ITEMS.find((item) => item.question === "What are the risks?")?.answer).toBe(
      "Like traditional investments, tokenized assets are subject to market fluctuations and can lose value.",
    );
    expect(WAITLIST_POINTS).toEqual(["No product account needed to express interest"]);
    expect(
      FAQ_ITEMS.find((item) => item.question === "What happens after I join the waitlist?")
        ?.answer,
    ).toBe(
      "With your consent, we use your email only to send one launch-availability email. Joining does not create an account.",
    );

    for (const item of FAQ_ITEMS) {
      expect(item.answer.length).toBeGreaterThan(40);
    }
  });

  it("uses three distinct investing pillars", () => {
    expect(BENEFITS.map((benefit) => benefit.title)).toEqual([
      "1,400+ assets. One platform.",
      "Get started your way",
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

  it("qualifies the planned investment universe only in its FAQ answer", () => {
    const copy = JSON.stringify({ HERO, STEPS, BENEFITS, SECURITY_PRINCIPLES });
    const investmentFaq = FAQ_ITEMS.find(
      (item) => item.question === "What can I invest in with DeBro?",
    )?.answer;

    expect(copy).not.toMatch(/building toward|catalog will evolve|not a guaranteed launch catalog/i);
    expect(investmentFaq).toBe(
      "DeBro is building toward 1,400+ tokenized assets, including stocks and ETFs. The available catalog will evolve as the platform develops.",
    );
  });
});
