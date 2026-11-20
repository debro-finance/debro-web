import { Container } from "@/components/ui/container";
import { STEPS } from "@/content/site";
import { WAITLIST_HREF } from "@/lib/site";

function DiscoverVisual() {
  return (
    <figure
      aria-label="Illustrative asset discovery composition"
      className="relative mx-auto w-full max-w-[34rem]"
    >
      <div className="absolute left-[8%] top-[8%] h-[84%] w-[84%] rounded-full bg-accent-soft/60" aria-hidden="true" />
      <div className="relative ml-auto w-[92%] rounded-[1.75rem] border border-line bg-white p-4 shadow-float sm:p-6">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted">Discover assets</p>
        <div className="mt-4 flex h-12 items-center gap-3 rounded-xl border border-line-strong bg-surface px-4">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 text-muted" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="11" cy="11" r="6.5" />
            <path d="m16 16 4 4" />
          </svg>
          <span className="text-sm text-muted">Search stocks &amp; ETFs</span>
        </div>
        <div className="mt-5 divide-y divide-line">
          {([
            ["AAPL", "Apple", "Technology"],
            ["NVDA", "NVIDIA", "Technology"],
            ["V", "Visa", "Financials"],
          ] as const).map(([ticker, name, sector]) => (
            <div key={ticker} className="grid grid-cols-[2.75rem_1fr_auto] items-center gap-3 py-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-navy text-xs font-semibold text-white">
                {ticker.slice(0, 1)}
              </div>
              <div>
                <p className="text-sm font-semibold text-ink">{name}</p>
                <p className="mt-0.5 text-xs text-muted">{ticker}</p>
              </div>
              <span className="rounded-full bg-surface px-2.5 py-1 text-[0.65rem] font-medium text-muted-strong">
                {sector}
              </span>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-3 text-right text-xs text-muted">Illustrative asset catalog</figcaption>
    </figure>
  );
}

function InvestVisual() {
  return (
    <figure
      aria-label="Illustrative investment preview"
      className="relative mx-auto w-full max-w-[34rem]"
    >
      <div className="absolute -left-[4%] top-[12%] h-[76%] w-[76%] rounded-full bg-surface-alt" aria-hidden="true" />
      <div className="relative mr-auto w-[92%] rounded-[1.75rem] border border-line bg-white p-5 shadow-float sm:p-7">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-ink">Investment preview</p>
          <span className="rounded-full bg-surface px-2.5 py-1 text-[0.65rem] font-semibold text-muted-strong">Example</span>
        </div>
        <div className="mt-6 flex items-center gap-3 rounded-xl bg-surface p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-sm font-semibold text-white">A</div>
          <div>
            <p className="text-sm font-semibold text-ink">Apple</p>
            <p className="mt-0.5 text-xs text-muted">AAPL</p>
          </div>
        </div>
        <div className="mt-5 border-t border-line pt-5">
          <p className="text-xs font-medium text-muted">Investment amount</p>
          <p className="mt-2 text-[2.5rem] font-semibold tracking-[-0.04em] text-ink">$500</p>
        </div>
        <div className="mt-5 flex items-center justify-between rounded-xl border border-line px-4 py-3">
          <span className="text-xs text-muted">Estimated allocation</span>
          <span className="text-sm font-semibold text-ink">Illustrative</span>
        </div>
        <div className="mt-5 h-12 rounded-full bg-navy px-5 text-center text-sm font-semibold leading-[3rem] text-white">
          Review investment
        </div>
      </div>
      <figcaption className="mt-3 text-xs text-muted">Conceptual interface; no live prices or trades</figcaption>
    </figure>
  );
}

function ControlVisual() {
  return (
    <figure
      aria-label="Illustrative portfolio overview"
      className="relative mx-auto w-full max-w-[34rem]"
    >
      <div className="absolute right-[6%] top-[7%] h-[86%] w-[86%] rounded-full border border-navy/[0.07]" aria-hidden="true" />
      <div className="relative ml-auto w-[92%] rounded-[1.75rem] border border-line bg-white p-5 shadow-float sm:p-7">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted">Portfolio</p>
            <p className="mt-1 text-lg font-semibold text-ink">Illustrative overview</p>
          </div>
          <span className="text-xs font-medium text-success">Example</span>
        </div>
        <div className="mt-7 flex items-center gap-6 sm:gap-8">
          <div
            aria-hidden="true"
            className="flex h-36 w-36 shrink-0 items-center justify-center rounded-full sm:h-44 sm:w-44"
            style={{ background: "conic-gradient(#141b3d 0 58%, #2f55d4 58% 82%, #d4d8e2 82% 100%)" }}
          >
            <div className="h-[68%] w-[68%] rounded-full bg-white" />
          </div>
          <div className="min-w-0 space-y-4">
            {[
              ["Technology", "58%", "bg-navy"],
              ["Financials", "24%", "bg-accent"],
              ["Other", "18%", "bg-line-strong"],
            ].map(([name, share, color]) => (
              <div key={name} className="flex items-center gap-3">
                <span className={`h-2 w-2 shrink-0 rounded-full ${color}`} />
                <div className="min-w-0">
                  <p className="truncate text-xs text-muted">{name}</p>
                  <p className="mt-0.5 text-sm font-semibold text-ink">{share}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-right text-xs text-muted">Illustrative allocation only</figcaption>
    </figure>
  );
}

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-title"
    >
      <h2 id="how-it-works-title" className="sr-only">How it works</h2>
      <ol>
        {STEPS.map((step, index) => {
          const reverse = index === 1;
          const visual = index === 0 ? <DiscoverVisual /> : index === 1 ? <InvestVisual /> : <ControlVisual />;
          const heading =
            index === 0
              ? "Discover what's possible."
              : index === 1
                ? "Invest without complexity."
                : "Stay in control.";

          return (
            <li
              key={step.number}
              className="border-t border-line/70 bg-white first:border-t-0"
            >
              <Container className="grid min-h-[100svh] items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-20">
                <div className={`${reverse ? "lg:order-2" : ""} relative`}>
                  <span
                    aria-hidden="true"
                    className="block text-[clamp(6rem,10vw,10rem)] font-semibold leading-[0.78] tracking-[-0.08em] text-navy/[0.10]"
                  >
                    {step.number}
                  </span>
                  <div className="-mt-2 sm:-mt-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                      {step.title}
                    </p>
                    <h3 className="mt-4 max-w-xl text-balance text-[clamp(2.75rem,5.2vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-ink">
                      {heading}
                    </h3>
                    <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-muted sm:text-lg">
                      {step.description}
                    </p>
                    {index === 1 ? (
                      <a
                        href={WAITLIST_HREF}
                        className="mt-7 inline-flex items-center text-sm font-semibold text-navy underline decoration-navy/25 underline-offset-4 transition-colors hover:decoration-navy"
                      >
                        Get early access
                        <span aria-hidden="true" className="ml-2">→</span>
                      </a>
                    ) : null}
                  </div>
                </div>
                <div className={`${reverse ? "lg:order-1" : ""}`}>{visual}</div>
              </Container>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
