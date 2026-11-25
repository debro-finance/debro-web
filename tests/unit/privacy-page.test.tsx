// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { SiteFooter } from "@/components/layout/site-footer";
import { WaitlistForm } from "@/components/waitlist/waitlist-form";
import PrivacyPage, { metadata } from "@/app/waitlist-privacy/page";

afterEach(() => {
  cleanup();
});

describe("waitlist privacy page", () => {
  it("renders the supplied notice with semantic sections and homepage links", () => {
    const { container } = render(<PrivacyPage />);

    expect(screen.getByRole("heading", { name: "Waitlist Privacy", level: 1 })).toBeTruthy();
    const paragraphs = Array.from(container.querySelectorAll("article p")).map((paragraph) =>
      paragraph.textContent?.replace(/\s+/g, " ").trim(),
    );
    const expectedParagraphs = [
      "At DeBro, we respect your privacy and believe your personal information should only be used for the purpose you agreed to.",
      "When you join the DeBro waitlist, we ask only for your email address.",
      "We do not ask for your name, phone number, financial information, wallet details, or identification documents.",
      "We also keep a basic record of your registration and consent to manage the waitlist.",
      "Your email address is used exclusively to send you one notification announcing the launch of DeBro.",
      "We will not use it for:",
      "Joining the waitlist does not create a DeBro account, register you for the investment platform, or automatically enroll you in any future service.",
      "Your waitlist information is stored in a private database and is intended to be accessible only to authorized personnel and the technical service providers necessary to operate the waitlist.",
      "We do not make subscriber information publicly available or share it with third parties for advertising purposes.",
      "Limited technical information may also be processed by our hosting and security services to operate the website and prevent abuse.",
      "We keep your email address only for the purpose of notifying you when DeBro launches.",
      "After the launch announcement has been sent, we will delete the waitlist records. The list will not be retained or repurposed as a customer or marketing database.",
      "You may also request removal of your email before the launch.",
      "Yes. You can request the removal of your email address from the DeBro waitlist at any time by contacting the designated privacy contact once that channel has been confirmed by the owner.",
      "We will use your request solely to process the removal of your information and confirm once it has been completed.",
      "No. Joining the waitlist simply means you will receive the launch announcement. It does not create an account or automatically grant access to the platform.",
    ];

    for (const paragraph of expectedParagraphs) {
      expect(paragraphs).toContain(paragraph);
    }

    expect(
      screen.getAllByRole("listitem").map((item) => item.textContent?.trim()),
    ).toEqual([
      "Newsletters or recurring emails.",
      "Advertising or promotional campaigns.",
      "Unrelated marketing communications.",
      "Selling or sharing contact lists with advertisers.",
    ]);

    const sectionHeadings = [
      "What information do we collect?",
      "How do we use your email?",
      "How is your information protected?",
      "How long do we keep your email?",
      "Can I request deletion?",
      "Does joining guarantee access to DeBro?",
    ];

    for (const heading of sectionHeadings) {
      expect(screen.getByRole("heading", { name: heading, level: 2 })).toBeTruthy();
    }

    expect(screen.getAllByRole("link", { name: "Return to homepage" })).toHaveLength(2);
    expect(screen.getByRole("link", { name: "DeBro home" }).getAttribute("href")).toBe("/");
    expect(screen.queryByRole("link", { name: "privacy@debro.finance" })).toBeNull();
  });

  it("uses page-specific title, description and canonical metadata", () => {
    expect(metadata).toMatchObject({
      title: "Waitlist Privacy",
      description: "Privacy information for people joining the DeBro waitlist.",
      alternates: { canonical: "/waitlist-privacy" },
      openGraph: {
        title: "Waitlist Privacy · DeBro",
        url: "/waitlist-privacy",
      },
      twitter: { title: "Waitlist Privacy · DeBro" },
    });
  });
});

describe("privacy notice entry points", () => {
  it("links to the notice from the footer", () => {
    render(<SiteFooter />);

    const privacyLink = screen.getByRole("link", {
      name: "Read our privacy notice",
    });

    expect(privacyLink.getAttribute("href")).toBe("/waitlist-privacy");
    expect(
      privacyLink.parentElement?.querySelector("p")?.textContent
        ?.replace(/\s+/g, " ")
        .trim(),
    ).toBe(
      "Your email is kept private and used exclusively to announce DeBro's launch. No newsletters, advertising, or account creation. Your information will be deleted after the launch announcement.",
    );
    expect(screen.queryByRole("link", { name: "privacy@debro.finance" })).toBeNull();
  });

  it("links to the notice from the form without changing consent or fields", () => {
    render(<WaitlistForm enabled={false} />);

    expect(screen.getByLabelText("Email address")).toBeTruthy();
    expect(
      screen.getByRole("checkbox", {
        name: "I agree to receive one email announcing DeBro's availability. No newsletters or recurring marketing.",
      }),
    ).toBeTruthy();

    const privacyLink = screen.getByRole("link", {
      name: "Waitlist Privacy notice",
    });

    expect(privacyLink.getAttribute("href")).toBe("/waitlist-privacy");
    expect(
      privacyLink.parentElement?.textContent?.replace(/\s+/g, " ").trim(),
    ).toBe(
      "We use your email only to announce DeBro's launch. Read our Waitlist Privacy notice.",
    );
  });
});
