import { BrandIcon, Logo } from "@/components/brand/logo";

export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[500px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 rounded-[3rem] bg-[radial-gradient(circle_at_60%_35%,#eef1fd_0%,transparent_70%)] sm:-inset-8"
      />

      <div className="relative pb-2 pt-12">
        <div
          aria-hidden="true"
          className="absolute inset-x-7 bottom-10 top-1 -rotate-[6deg] overflow-hidden rounded-[2rem] bg-navy shadow-float"
        >
          <div className="pattern-grid absolute inset-0 opacity-30" />
          <div className="absolute inset-x-8 top-5 h-px bg-white/15" />
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-x-3 bottom-6 top-7 rotate-[3deg] rounded-[2rem] border border-white bg-accent-soft shadow-card"
        />

        <div className="relative mt-12 rounded-[2rem] border border-line bg-white p-5 shadow-float sm:p-7">
          <div className="flex items-center justify-between gap-4">
            <Logo className="h-5 w-auto" />
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-muted">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-accent"
              />
              Prelaunch
            </span>
          </div>

          <div className="mt-6 rounded-[1.5rem] border border-line bg-surface px-5 py-7 text-center sm:px-6 sm:py-8">
            <div className="relative mx-auto flex h-32 w-32 items-center justify-center rounded-[1.6rem] border border-navy/10 bg-white shadow-sm sm:h-36 sm:w-36">
              <div
                aria-hidden="true"
                className="absolute inset-3 rounded-[1.2rem] border border-navy/10"
              />
              <div
                aria-hidden="true"
                className="absolute inset-7 rounded-[0.85rem] border border-navy/10 bg-surface"
              />
              <span
                aria-hidden="true"
                className="absolute right-3 top-3 h-1.5 w-1.5 rounded-full bg-accent/70"
              />
              <BrandIcon className="relative h-10 w-10" />
            </div>

            <p className="mt-6 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-accent">
              Investing, simplified
            </p>
            <p className="mx-auto mt-2 max-w-[15rem] text-balance text-xl font-semibold tracking-[-0.02em] text-ink">
              Tokenized assets, made approachable.
            </p>
          </div>

          <p className="mt-5 text-center text-[0.65rem] font-medium uppercase tracking-[0.14em] text-muted">
            Discover · Understand · Decide
          </p>
        </div>
      </div>

      <p className="relative mt-6 text-center text-xs text-muted">
        Illustrative composition. DeBro is in prelaunch.
      </p>
    </div>
  );
}
