import { Container } from "@/components/ui/container";
import { STEPS } from "@/content/site";
import { WAITLIST_HREF } from "@/lib/site";
import {
  ControlVisual,
  DiscoverVisual,
  InvestVisual,
} from "@/components/sections/product-visuals";

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-title"
    >
      <h2 id="how-it-works-title" className="sr-only">How it works</h2>
      <ol>
        {STEPS.map((step, index) => {
          const reverse = index === 1;
          const visual = index === 0 ? <DiscoverVisual /> : index === 1 ? <InvestVisual /> : <ControlVisual />;
          const heading =
            index === 0
              ? "Discover what's possible."
              : index === 1
                ? "Invest without complexity."
                : "Stay in control.";

          return (
            <li
              key={step.number}
              className="border-t border-line/70 bg-white first:border-t-0"
            >
              <Container className="grid min-h-[100svh] items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-20">
                <div className={`${reverse ? "lg:order-2" : ""} relative`}>
                  <span
                    aria-hidden="true"
                    className="block text-[clamp(6rem,10vw,10rem)] font-semibold leading-[0.78] tracking-[-0.08em] text-navy/[0.10]"
                  >
                    {step.number}
                  </span>
                  <div className="-mt-2 sm:-mt-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                      {step.title}
                    </p>
                    <h3 className="mt-4 max-w-xl text-balance text-[clamp(2.75rem,5.2vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-ink">
                      {heading}
                    </h3>
                    <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-muted sm:text-lg">
                      {step.description}
                    </p>
                    {index === 1 ? (
                      <a
                        href={WAITLIST_HREF}
                        className="mt-7 inline-flex items-center text-sm font-semibold text-navy underline decoration-navy/25 underline-offset-4 transition-colors hover:decoration-navy"
                      >
                        Get early access
                        <span aria-hidden="true" className="ml-2">→</span>
                      </a>
                    ) : null}
                  </div>
                </div>
                <div className={`${reverse ? "lg:order-1" : ""}`}>{visual}</div>
              </Container>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
