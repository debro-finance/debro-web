import { Section, SectionHeading } from "@/components/ui/section";
import { STEPS } from "@/content/site";

export function HowItWorks() {
  return (
    <Section
      id="how-it-works"
      labelledBy="how-it-works-title"
      className="border-t border-line/70"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          id="how-it-works-title"
          eyebrow="How it works"
          title="A clear path from discovery to decision."
          description="DeBro is in prelaunch. This is how the experience is being designed — none of these steps are available today."
        />
        <p className="inline-flex w-fit items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-medium text-muted-strong">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-amber-500"
          />
          Planned for launch
        </p>
      </div>

      <ol className="mt-12 grid gap-4 md:grid-cols-3">
        {STEPS.map((step) => (
          <li
            key={step.number}
            className="group relative flex flex-col rounded-2xl border border-line bg-white p-6 shadow-card transition-colors hover:border-line-strong sm:p-7"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-semibold tracking-[0.14em] text-accent">
                {step.number}
              </span>
              <span className="rounded-full bg-surface px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted">
                At launch
              </span>
            </div>
            <h3 className="mt-8 text-lg font-semibold tracking-[-0.015em] text-ink">
              {step.title}
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-muted">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
