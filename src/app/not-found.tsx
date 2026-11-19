import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Section className="min-h-[60vh]">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            404
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-[-0.025em] text-ink sm:text-4xl">
            This page doesn&apos;t exist.
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
            The address may be wrong, or the page may not be available yet.
            DeBro is still in prelaunch.
          </p>
          <div className="mt-8">
            <ButtonLink href="/" size="lg">
              Back to the homepage
            </ButtonLink>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
