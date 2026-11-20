import { WaitlistForm } from "@/components/waitlist/waitlist-form";
import { Eyebrow, Section } from "@/components/ui/section";
import { CheckIcon } from "@/components/ui/icons";
import { WAITLIST_POINTS } from "@/content/site";
import { isWaitlistEnabled } from "@/lib/site";

export function WaitlistSection() {
  return (
    <Section
      id="waitlist"
      labelledBy="waitlist-title"
      className="flex min-h-[100svh] items-center border-t border-line/70 bg-navy"
      containerClassName="py-8"
    >
      <div className="relative overflow-hidden rounded-[2rem] border border-line bg-white shadow-card">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative overflow-hidden bg-navy p-7 text-white sm:p-10 lg:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full border border-white/[0.08]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-accent/15 blur-3xl"
            />
            <div className="relative">
              <Eyebrow tone="light">Join the waitlist</Eyebrow>
              <h2
                id="waitlist-title"
                className="text-balance text-3xl font-semibold tracking-[-0.025em] text-white sm:text-4xl"
              >
                Be part of what&apos;s next in investing.
              </h2>
              <p className="mt-4 max-w-md text-pretty text-sm leading-relaxed text-white/65 sm:text-base">
                Join the DeBro waitlist and be among the first to hear when our
                new investing experience launches.
              </p>

              {/* The list restates the supporting copy; on narrow screens the
                  form takes priority so it stays visible after anchor jumps. */}
              <ul className="mt-8 hidden space-y-3 lg:block">
                {WAITLIST_POINTS.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-3 text-sm text-white/75"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white">
                      <CheckIcon className="h-3 w-3" />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>

            </div>
          </div>

          <div className="p-8 sm:p-10 lg:p-12">
            <WaitlistForm enabled={isWaitlistEnabled()} />
          </div>
        </div>
      </div>
    </Section>
  );
}
