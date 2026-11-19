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
          title="Clarity is part of trust."
          description="Trust begins with clear information about an asset, its legal structure and the responsibilities involved."
          tone="light"
        />

        <ul className="mt-12 grid gap-7 border-y border-white/15 py-7 sm:grid-cols-3 sm:divide-x sm:divide-white/15 sm:py-9">
          {SECURITY_PRINCIPLES.map((principle) => (
            <li key={principle.title} className="sm:px-6 sm:first:pl-0 sm:last:pr-0">
              <h3 className="text-base font-semibold text-white sm:text-lg">
                {principle.title}
              </h3>
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
