import { Section, SectionHeading } from "@/components/ui/section";
import { STEPS } from "@/content/site";

export function HowItWorks() {
  return (
    <Section
      id="how-it-works"
      labelledBy="how-it-works-title"
      className="border-t border-line/70 bg-white"
    >
      <SectionHeading
        id="how-it-works-title"
        eyebrow="How it works"
        title="Explore. Understand. Invest."
        description="A considered journey from discovering an opportunity to making an informed decision."
      />

      <ol className="mt-14 grid gap-10 lg:grid-cols-3 lg:gap-8">
        {STEPS.map((step, index) => (
          <li
            key={step.number}
            className="relative grid grid-cols-[4rem_1fr] gap-x-5 gap-y-3 lg:grid-cols-1 lg:gap-y-6"
          >
            <span className="relative z-10 text-5xl font-medium tabular-nums tracking-[-0.06em] text-navy/25 sm:text-6xl lg:text-7xl">
              {step.number}
            </span>
            <div className="pt-1 lg:pt-0">
              <h3 className="text-xl font-semibold tracking-[-0.02em] text-ink sm:text-2xl">
                {step.title}
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted sm:text-base">
                {step.description}
              </p>
            </div>
            {index < STEPS.length - 1 ? (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-[1.85rem] top-12 bottom-[-2.5rem] w-px bg-line lg:left-[5.5rem] lg:right-[-1rem] lg:top-[2.55rem] lg:bottom-auto lg:h-px lg:w-auto"
              />
            ) : null}
          </li>
        ))}
      </ol>
    </Section>
  );
}
