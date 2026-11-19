import { Section, SectionHeading } from "@/components/ui/section";
import { SECURITY_PRINCIPLES } from "@/content/site";

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
          title="Transparency without complexity."
          description="Modern financial technology, designed to make investing more transparent while keeping the experience simple and familiar."
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
      </div>
    </Section>
  );
}
