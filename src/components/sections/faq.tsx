import { Section, SectionHeading } from "@/components/ui/section";
import { ArrowRightIcon, PlusIcon } from "@/components/ui/icons";
import { FAQ_ITEMS } from "@/content/site";
import { WAITLIST_HREF } from "@/lib/site";

export function Faq() {
  return (
    <Section id="faq" labelledBy="faq-title" className="bg-white">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="faq-title"
            eyebrow="FAQ"
            title="Questions, answered plainly."
            description="Explore the investment universe, access options and how the platform works."
          />
          <a
            href={WAITLIST_HREF}
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-navy"
          >
            Join the waitlist
            <ArrowRightIcon className="h-4 w-4" />
          </a>
        </div>

        <div className="border-t border-line">
          {FAQ_ITEMS.map((item) => (
            <details
              key={item.question}
              name="debro-faq"
              className="group border-b border-line"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left text-base font-medium text-ink transition-colors hover:text-accent sm:text-lg">
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-transform duration-200 group-open:rotate-45"
                >
                  <PlusIcon className="h-3.5 w-3.5" />
                </span>
              </summary>
              <p className="max-w-2xl pb-6 pr-10 text-sm leading-relaxed text-muted sm:text-[0.95rem]">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
