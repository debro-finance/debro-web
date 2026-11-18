import type { ReactNode } from "react";
import { Section, SectionHeading } from "@/components/ui/section";
import {
  EyeIcon,
  KeyIcon,
  ShieldAlertIcon,
} from "@/components/ui/icons";
import { RISK_DISCLOSURE, SECURITY_PRINCIPLES } from "@/content/site";

const icons: ReactNode[] = [
  <KeyIcon key="key" className="h-5 w-5" />,
  <EyeIcon key="eye" className="h-5 w-5" />,
  <ShieldAlertIcon key="shield" className="h-5 w-5" />,
];

export function Security() {
  return (
    <Section
      id="security"
      labelledBy="security-title"
      className="relative overflow-hidden bg-navy"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full border border-white/[0.06]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-[24rem] w-[24rem] rounded-full border border-white/[0.06]"
      />

      <div className="relative grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <SectionHeading
            id="security-title"
            eyebrow="Security & self-custody"
            title="Your wallet. Your control."
            description="DeBro is being built around self-custody: your wallet holds the keys, and every transaction is approved by you — not by a custodian holding assets on your behalf."
            tone="light"
          />

          <div className="mt-8 rounded-2xl border border-white/15 bg-white/[0.05] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-200/80">
              Important risk information
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/65">
              {RISK_DISCLOSURE}
            </p>
          </div>
        </div>

        <ul className="space-y-4">
          {SECURITY_PRINCIPLES.map((principle, index) => (
            <li
              key={principle.title}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:bg-white/[0.06]"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-white">
                  {icons[index]}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">
                    {principle.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">
                    {principle.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
