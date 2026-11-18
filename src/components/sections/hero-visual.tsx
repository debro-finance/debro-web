import { BrandIcon } from "@/components/brand/logo";
import Image from "next/image";

type Tile = {
  src: string;
  alt: string;
  width: number;
  height: number;
  angle: number;
  size: string;
  shadow: string;
};

const TILES: Tile[] = [
  {
    src: "/assets/companies/aapl.svg",
    alt: "Apple",
    width: 475,
    height: 475,
    angle: 20,
    size: "h-14 w-14 sm:h-16 sm:w-16 md:h-[4.5rem] md:w-[4.5rem]",
    shadow: "shadow-[0_12px_30px_-14px_rgb(20_27_61/0.22)]",
  },
  {
    src: "/assets/companies/msft.svg",
    alt: "Microsoft",
    width: 48,
    height: 48,
    angle: 75,
    size: "h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16",
    shadow: "shadow-[0_10px_26px_-14px_rgb(20_27_61/0.18)]",
  },
  {
    src: "/assets/companies/nvda.svg",
    alt: "NVIDIA",
    width: 64,
    height: 64,
    angle: 135,
    size: "h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16",
    shadow: "shadow-[0_12px_30px_-16px_rgb(20_27_61/0.2)]",
  },
  {
    src: "/assets/companies/v.svg",
    alt: "Visa",
    width: 750,
    height: 471,
    angle: 195,
    size: "h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16",
    shadow: "shadow-[0_10px_26px_-14px_rgb(20_27_61/0.18)]",
  },
  {
    src: "/assets/companies/amzn.svg",
    alt: "Amazon",
    width: 64,
    height: 64,
    angle: 260,
    size: "h-14 w-14 sm:h-16 sm:w-16 md:h-[4.5rem] md:w-[4.5rem]",
    shadow: "shadow-[0_14px_34px_-16px_rgb(20_27_61/0.22)]",
  },
  {
    src: "/assets/companies/tsla.svg",
    alt: "Tesla",
    width: 64,
    height: 64,
    angle: 320,
    size: "h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16",
    shadow: "shadow-[0_12px_30px_-16px_rgb(20_27_61/0.2)]",
  },
];

const ORBIT_DURATION = 64; // seconds per full revolution

export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[440px] md:max-w-[520px]">
      {/* Soft background halo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#eef1fd_0%,#eef1fd_40%,transparent_72%)] sm:h-[340px] sm:w-[340px] md:h-[400px] md:w-[400px]"
      />

      <div className="relative aspect-square w-full">
        {/* Orbit guide rings */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-navy/[0.07] md:border-navy/[0.08]"
          style={{ width: "70%", height: "70%" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-navy/[0.04]"
          style={{ width: "88%", height: "88%" }}
        />

        {/* Orbiting company logos */}
        {TILES.map((tile) => {
          const delay = -((tile.angle / 360) * ORBIT_DURATION);
          return (
            <div
              key={tile.src}
              className="motion-safe:animate-[orbit_var(--dur)_linear_var(--delay)_infinite] absolute left-1/2 top-1/2"
              style={
                {
                  transform: `rotate(${tile.angle}deg)`,
                  "--dur": `${ORBIT_DURATION}s`,
                  "--delay": `${delay}s`,
                } as React.CSSProperties
              }
            >
              <div className="translate-x-[7.5rem] sm:translate-x-[9.5rem] md:translate-x-[11rem]">
                <div
                  className={`motion-safe:animate-[counter-orbit_var(--dur)_linear_var(--delay)_infinite] flex ${tile.size} items-center justify-center rounded-2xl border border-line bg-white/95 p-2 ring-1 ring-navy/5 backdrop-blur-sm ${tile.shadow} sm:p-2.5`}
                  style={
                    {
                      "--dur": `${ORBIT_DURATION}s`,
                      "--delay": `${delay}s`,
                    } as React.CSSProperties
                  }
                >
                  <Image
                    src={tile.src}
                    alt={tile.alt}
                    width={tile.width}
                    height={tile.height}
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>
            </div>
          );
        })}

        {/* Central DeBro monogram — stationary focal point */}
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-navy shadow-[0_18px_44px_-18px_rgb(20_27_61/0.35)] ring-1 ring-navy/10 sm:h-28 sm:w-28 md:h-[7.5rem] md:w-[7.5rem]">
            <BrandIcon variant="white" className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14" />
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-xs leading-relaxed text-muted">
        Illustrative companies only. Asset availability is not confirmed.
      </p>
    </div>
  );
}
