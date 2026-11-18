import { BrandIcon } from "@/components/brand/logo";
import { KeyIcon, LayersIcon } from "@/components/ui/icons";

export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[520px]">
      <div
        aria-hidden="true"
        className="absolute -inset-5 rounded-[3rem] bg-accent-soft/80 blur-2xl sm:-inset-8"
      />

      <div className="relative rounded-[2rem] bg-gradient-to-b from-navy-soft to-navy p-2 shadow-float ring-1 ring-navy/10">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.65rem] border border-white/10 bg-navy">
          <div aria-hidden="true" className="pattern-grid absolute inset-0 opacity-70" />
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-white/5 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 hidden items-center justify-center sm:flex"
          >
            <div className="relative flex h-[64%] w-[64%] items-center justify-center rounded-full border border-white/10">
              <div className="absolute inset-[15%] rounded-full border border-white/10" />
              <div className="absolute inset-[31%] rounded-full border border-white/10 bg-white/[0.03]" />
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-sm">
                <BrandIcon variant="white" className="h-11 w-11" />
              </div>
              <span
                aria-hidden="true"
                className="absolute left-[8%] top-[32%] h-2 w-2 rounded-full bg-accent/80 ring-4 ring-accent/10"
              />
              <span
                aria-hidden="true"
                className="absolute bottom-[14%] right-[18%] h-1.5 w-1.5 rounded-full bg-white/50"
              />
            </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center sm:hidden">
            <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/15 bg-white/[0.06]">
              <BrandIcon variant="white" className="h-11 w-11" />
            </div>
          </div>

          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3 py-1.5 text-[0.7rem] font-medium text-white/75 backdrop-blur-sm">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-emerald-300"
            />
            Built on Solana
          </div>

          <div className="absolute right-4 top-16 hidden w-[11.5rem] rounded-2xl border border-white/60 bg-white p-3.5 shadow-float sm:block sm:top-20 sm:w-[12.5rem]">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent">
              <KeyIcon className="h-4 w-4" />
            </div>
            <p className="mt-2.5 text-sm font-semibold text-ink">
              Self-custody
            </p>
            <p className="mt-0.5 text-xs leading-snug text-muted">
              Your wallet, your control.
            </p>
          </div>

          <div className="absolute bottom-16 left-4 hidden w-[12rem] rounded-2xl border border-white/10 bg-white/[0.08] p-3.5 backdrop-blur-md sm:bottom-20 sm:block sm:w-[13rem]">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white">
              <LayersIcon className="h-4 w-4" />
            </div>
            <p className="mt-2.5 text-sm font-semibold text-white">
              Tokenized assets
            </p>
            <p className="mt-0.5 text-xs leading-snug text-white/60">
              A clearer view of what you explore.
            </p>
          </div>

          <div className="absolute inset-x-0 bottom-[4.5rem] px-6 text-center sm:hidden">
            <p className="text-sm font-semibold text-white">
              Your wallet. Your control.
            </p>
            <p className="mt-1 text-xs text-white/60">
              Tokenized assets on Solana
            </p>
          </div>

          <p className="absolute bottom-4 right-4 text-[0.6rem] font-medium uppercase tracking-[0.16em] text-white/55">
            Prelaunch
          </p>
        </div>
      </div>

      <p className="mt-5 text-center text-xs text-muted">
        Illustrative composition. DeBro is in prelaunch.
      </p>
    </div>
  );
}
