import { Container } from "@/components/ui/container";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Waitlist Privacy",
  description: "Privacy information for people joining the DeBro waitlist.",
  alternates: {
    canonical: "/waitlist-privacy",
  },
  openGraph: {
    type: "website",
    title: "Waitlist Privacy · DeBro",
    description: "Privacy information for people joining the DeBro waitlist.",
    url: "/waitlist-privacy",
  },
  twitter: {
    card: "summary",
    title: "Waitlist Privacy · DeBro",
    description: "Privacy information for people joining the DeBro waitlist.",
  },
};

export default function WaitlistPrivacyPage() {
  return (
    <>
      <header className="border-b border-line/70">
        <Container className="flex min-h-16 items-center justify-between gap-3 py-4 sm:gap-6">
          <Link href="/" aria-label="DeBro home" className="inline-flex rounded-sm">
            <Logo className="h-6 w-auto sm:h-7" />
          </Link>
          <Link
            href="/"
            className="text-xs font-medium text-muted-strong underline-offset-4 transition-colors hover:text-navy hover:underline sm:text-sm"
          >
            Return to homepage
          </Link>
        </Container>
      </header>

      <main id="main" className="min-h-screen bg-white">
        <Container className="max-w-3xl py-12 sm:py-16 lg:py-20">
          <article className="space-y-10 text-muted-strong">
            <header className="space-y-4">
              <h1 className="text-balance text-4xl font-semibold tracking-[-0.035em] text-navy sm:text-5xl">
                Waitlist Privacy
              </h1>
              <p className="max-w-2xl text-base leading-relaxed sm:text-lg">
                At DeBro, we respect your privacy and believe your personal information should only
                be used for the purpose you agreed to.
              </p>
            </header>

            <section aria-labelledby="information-collected" className="space-y-4">
              <h2
                id="information-collected"
                className="text-xl font-semibold tracking-[-0.02em] text-ink sm:text-2xl"
              >
                What information do we collect?
              </h2>
              <p className="leading-relaxed">
                When you join the DeBro waitlist, we ask only for your email address.
              </p>
              <p className="leading-relaxed">
                We do not ask for your name, phone number, financial information, wallet details, or
                identification documents.
              </p>
              <p className="leading-relaxed">
                We also keep a basic record of your registration and consent to manage the waitlist.
              </p>
            </section>

            <section aria-labelledby="email-use" className="space-y-4">
              <h2
                id="email-use"
                className="text-xl font-semibold tracking-[-0.02em] text-ink sm:text-2xl"
              >
                How do we use your email?
              </h2>
              <p className="leading-relaxed">
                Your email address is used exclusively to send you{" "}
                <strong className="font-semibold text-ink">
                  one notification announcing the launch of DeBro
                </strong>
                .
              </p>
              <p className="leading-relaxed">We will not use it for:</p>
              <ul className="list-disc space-y-2 pl-6 leading-relaxed marker:text-navy">
                <li>Newsletters or recurring emails.</li>
                <li>Advertising or promotional campaigns.</li>
                <li>Unrelated marketing communications.</li>
                <li>Selling or sharing contact lists with advertisers.</li>
              </ul>
              <p className="leading-relaxed">
                Joining the waitlist does not create a DeBro account, register you for the
                investment platform, or automatically enroll you in any future service.
              </p>
            </section>

            <section aria-labelledby="information-protection" className="space-y-4">
              <h2
                id="information-protection"
                className="text-xl font-semibold tracking-[-0.02em] text-ink sm:text-2xl"
              >
                How is your information protected?
              </h2>
              <p className="leading-relaxed">
                Your waitlist information is stored in a private database and is intended to be
                accessible only to authorized personnel and the technical service providers
                necessary to operate the waitlist.
              </p>
              <p className="leading-relaxed">
                We do not make subscriber information publicly available or share it with third
                parties for advertising purposes.
              </p>
              <p className="leading-relaxed">
                Limited technical information may also be processed by our hosting and security
                services to operate the website and prevent abuse.
              </p>
            </section>

            <section aria-labelledby="email-retention" className="space-y-4">
              <h2
                id="email-retention"
                className="text-xl font-semibold tracking-[-0.02em] text-ink sm:text-2xl"
              >
                How long do we keep your email?
              </h2>
              <p className="leading-relaxed">
                We keep your email address only for the purpose of notifying you when DeBro
                launches.
              </p>
              <p className="leading-relaxed">
                <strong className="font-semibold text-ink">
                  After the launch announcement has been sent, we will delete the waitlist records.
                </strong>{" "}
                The list will not be retained or repurposed as a customer or marketing database.
              </p>
              <p className="leading-relaxed">
                You may also request removal of your email before the launch.
              </p>
            </section>

            <section aria-labelledby="deletion-request" className="space-y-4">
              <h2
                id="deletion-request"
                className="text-xl font-semibold tracking-[-0.02em] text-ink sm:text-2xl"
              >
                Can I request deletion?
              </h2>
              <p className="leading-relaxed">
                Yes. You can request the removal of your email address from the DeBro waitlist at
                any time by contacting the designated privacy contact once that channel has been
                confirmed by the owner.
              </p>
              <p className="leading-relaxed">
                We will use your request solely to process the removal of your information and
                confirm once it has been completed.
              </p>
            </section>

            <section aria-labelledby="platform-access" className="space-y-4">
              <h2
                id="platform-access"
                className="text-xl font-semibold tracking-[-0.02em] text-ink sm:text-2xl"
              >
                Does joining guarantee access to DeBro?
              </h2>
              <p className="leading-relaxed">
                No. Joining the waitlist simply means you will receive the launch announcement. It
                does not create an account or automatically grant access to the platform.
              </p>
            </section>

            <p className="border-t border-line pt-6">
              <Link href="/" className="font-semibold text-navy underline-offset-4 hover:underline">
                Return to homepage
              </Link>
            </p>
          </article>
        </Container>
      </main>
    </>
  );
}
