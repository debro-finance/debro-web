import { HeroVisual } from "@/components/sections/hero-visual";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowDownIcon } from "@/components/ui/icons";
import { HERO } from "@/content/site";
import { isWaitlistEnabled } from "@/lib/site";
import { WaitlistForm } from "@/components/waitlist/waitlist-form";

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden bg-white lg:min-h-[calc(100svh-5rem)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_50%_0%,#eef1fd_0%,transparent_70%)]"
      />
      <Container className="relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-20">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-medium text-muted-strong shadow-sm">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-accent"
            />
            {HERO.eyebrow}
          </p>

          <h1 className="mt-6 text-balance text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.045em] text-ink sm:text-6xl lg:text-[clamp(4.5rem,6vw,5.5rem)]">
            {HERO.titleLead}{" "}
            <span className="text-navy">{HERO.titleAccent}</span>
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
            {HERO.description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink
              href="#how-it-works"
              variant="secondary"
              size="lg"
            >
              See how it works
              <ArrowDownIcon className="h-4 w-4" />
            </ButtonLink>
          </div>

          <div className="mt-7 max-w-xl rounded-2xl border border-line bg-white/90 p-4 shadow-card sm:p-5">
            <WaitlistForm enabled={isWaitlistEnabled()} idPrefix="hero-waitlist" />
          </div>
          <p className="mt-4 text-sm text-muted">{HERO.note}</p>
        </div>

        <div className="animate-lift">
          <HeroVisual />
        </div>
      </Container>
    </section>
  );
}
