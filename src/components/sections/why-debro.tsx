import { Section, SectionHeading } from "@/components/ui/section";

import { BENEFITS } from "@/content/site";

export function WhyDeBro() {
  return (
    <Section
      id="why-debro"
      labelledBy="why-debro-title"
      className="border-y border-line/70 bg-surface"
    >
      <SectionHeading
        id="why-debro-title"
        eyebrow="Why DeBro"
        title="Invest beyond boundaries."
        description={
          <>
            A modern investing experience designed to connect people with financial opportunities
            around the world
            <sup aria-label="Geographic eligibility may vary">*</sup>.
          </>
        }
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-12">
        <article className="flex min-h-[24rem] flex-col justify-around rounded-[1.75rem] bg-navy p-7 text-white sm:p-10 lg:col-span-7 lg:min-h-[30rem] lg:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/55">
            Investment universe
          </p>
          <div className="mt-16 max-w-xl align-middle">
            <h3 className="text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              {BENEFITS[0].title}
            </h3>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
              {BENEFITS[0].description}
            </p>
          </div>
        </article>

        <ul className="flex flex-col justify-center divide-y divide-line-strong border-y border-line-strong lg:col-span-5">
          {BENEFITS.slice(1).map((benefit) => (
            <li key={benefit.title} className="py-7 sm:py-9">
              <h3 className="text-lg font-semibold tracking-[-0.015em] text-ink sm:text-xl">
                {benefit.title}
              </h3>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
                {benefit.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
