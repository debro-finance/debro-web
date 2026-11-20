import { HeroVisual } from "@/components/sections/hero-visual";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowDownIcon, ArrowRightIcon } from "@/components/ui/icons";
import { HERO } from "@/content/site";
import { WAITLIST_HREF } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100svh-4.0625rem)] items-center bg-white lg:min-h-[calc(100svh-5.0625rem)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_50%_0%,#eef1fd_0%,transparent_70%)]"
      />
      <Container className="relative grid items-center gap-8 py-12 sm:gap-10 sm:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-8">
        <div className="mx-auto max-w-[34rem] lg:mx-0">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-medium text-muted-strong shadow-sm">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-accent"
            />
            {HERO.eyebrow}
          </p>

          <h1 className="mt-5 text-balance text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.045em] text-ink sm:text-6xl lg:text-[clamp(3.75rem,5.2vw,4.75rem)]">
            {HERO.titleLead}{" "}
            <span className="text-navy">{HERO.titleAccent}</span>
          </h1>

          <p className="mt-5 max-w-lg text-pretty text-base leading-relaxed text-muted sm:text-lg">
            {HERO.description}
          </p>

          <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row">
            <ButtonLink
              href="#how-it-works"
              variant="secondary"
              size="lg"
            >
              See how it works
              <ArrowDownIcon className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href={WAITLIST_HREF} size="lg">
              Join the waitlist
              <ArrowRightIcon className="h-4 w-4" />
            </ButtonLink>
          </div>

          <p className="mt-5 text-sm text-muted">{HERO.note}</p>
        </div>

        <div className="mx-auto w-full max-w-[24rem] sm:max-w-[27rem] lg:max-w-[29rem] xl:max-w-[32rem] motion-safe:animate-lift">
          <HeroVisual />
        </div>
      </Container>
    </section>
  );
}
