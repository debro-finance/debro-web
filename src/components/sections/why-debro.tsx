import type { ReactNode } from "react";
import { Section, SectionHeading } from "@/components/ui/section";
import {
  KeyIcon,
  LinkIcon,
  SparkIcon,
  UsersIcon,
} from "@/components/ui/icons";
import { BENEFITS } from "@/content/site";

const icons: ReactNode[] = [
  <SparkIcon key="spark" className="h-5 w-5" />,
  <KeyIcon key="key" className="h-5 w-5" />,
  <LinkIcon key="link" className="h-5 w-5" />,
  <UsersIcon key="users" className="h-5 w-5" />,
];

export function WhyDeBro() {
  return (
    <Section
      id="why-debro"
      labelledBy="why-debro-title"
      className="border-y border-line/70 bg-surface"
    >
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="why-debro-title"
            eyebrow="Why DeBro"
            title="Built to make tokenized finance feel understandable."
            description="A familiar investing experience, paired with the transparency and control of self-custody. Designed for people who are new to tokenized assets — and for those who know them well."
          />
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {BENEFITS.map((benefit, index) => (
            <li
              key={benefit.title}
              className="rounded-2xl border border-line bg-white p-6 shadow-card"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
                {icons[index]}
              </div>
              <h3 className="mt-5 text-base font-semibold tracking-[-0.01em] text-ink">
                {benefit.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {benefit.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
