import { Section, SectionHeading } from "@/components/ui/section";
import { RISK_DISCLOSURE, SECURITY_PRINCIPLES } from "@/content/site";

export function Security() {
  return (
    <Section
      id="security"
      labelledBy="security-title"
      className="relative overflow-hidden bg-navy"
    >
      <div className="relative">
        <SectionHeading
          id="security-title"
          eyebrow="Security & transparency"
          title="Built for confidence and control."
          description="A modern approach to investing, combining transparency, simplicity and greater freedom over how you manage your assets."
          tone="light"
        />

        <ul className="mt-12 grid gap-7 border-y border-white/15 py-7 sm:grid-cols-3 sm:divide-x sm:divide-white/15 sm:py-9">
          {SECURITY_PRINCIPLES.map((principle, index) => (
            <li
              key={principle.title}
              className="sm:px-6 sm:first:pl-0 sm:last:pr-0"
            >
              <div className="flex items-baseline gap-3">
                <span
                  aria-hidden="true"
                  className="text-xs font-medium tabular-nums tracking-[0.12em] text-white/40"
                >
                  0{index + 1}
                </span>
                <h3 className="text-base font-semibold text-white sm:text-lg">
                  {principle.title}
                </h3>
              </div>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/70 sm:text-base">
                {principle.description}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-8 grid gap-3 sm:grid-cols-[10rem_1fr] sm:gap-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/55">
            Risk, in context
          </p>
          <p className="max-w-4xl text-sm leading-relaxed text-white/65 sm:text-base">
            {RISK_DISCLOSURE}
          </p>
        </div>
      </div>
    </Section>
  );
}
