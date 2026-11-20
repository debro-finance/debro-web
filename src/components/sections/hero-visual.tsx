import { BrandIcon } from "@/components/brand/logo";
import Image from "next/image";

type Tile = {
  src: string;
  width: number;
  height: number;
  size: string;
  shadow: string;
};

const TILES: Tile[] = [
  {
    src: "/assets/companies/aapl.svg",
    width: 475,
    height: 475,
    size: "h-14 w-14 sm:h-16 sm:w-16 md:h-[4.5rem] md:w-[4.5rem]",
    shadow: "shadow-[0_12px_30px_-14px_rgb(20_27_61/0.22)]",
  },
  {
    src: "/assets/companies/msft.svg",
    width: 48,
    height: 48,
    size: "h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16",
    shadow: "shadow-[0_10px_26px_-14px_rgb(20_27_61/0.18)]",
  },
  {
    src: "/assets/companies/nvda.svg",
    width: 64,
    height: 64,
    size: "h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16",
    shadow: "shadow-[0_12px_30px_-16px_rgb(20_27_61/0.2)]",
  },
  {
    src: "/assets/companies/v.svg",
    width: 750,
    height: 471,
    size: "h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16",
    shadow: "shadow-[0_10px_26px_-14px_rgb(20_27_61/0.18)]",
  },
  {
    src: "/assets/companies/amzn.svg",
    width: 64,
    height: 64,
    size: "h-14 w-14 sm:h-16 sm:w-16 md:h-[4.5rem] md:w-[4.5rem]",
    shadow: "shadow-[0_14px_34px_-16px_rgb(20_27_61/0.22)]",
  },
  {
    src: "/assets/companies/tsla.svg",
    width: 64,
    height: 64,
    size: "h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16",
    shadow: "shadow-[0_12px_30px_-16px_rgb(20_27_61/0.2)]",
  },
  {
    src: "/assets/companies/ko.svg",
    width: 64,
    height: 64,
    size: "h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16",
    shadow: "shadow-[0_10px_26px_-14px_rgb(20_27_61/0.18)]",
  },
  {
    src: "/assets/companies/mcd.svg",
    width: 512,
    height: 512,
    size: "h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16",
    shadow: "shadow-[0_10px_26px_-14px_rgb(20_27_61/0.18)]",
  },
];

const ORBIT_DURATION = 64; // seconds per full revolution

export function HeroVisual() {
  return (
    <figure className="relative mx-auto aspect-square w-full max-w-[340px] overflow-clip sm:max-w-[440px] md:max-w-[520px]">
      <div aria-hidden="true" className="relative aspect-square w-full">
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#eef1fd_0%,#eef1fd_40%,transparent_72%)] sm:h-[340px] sm:w-[340px] md:h-[400px] md:w-[400px]" />

        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-navy/[0.07] md:border-navy/[0.08]"
          style={{ width: "64%", height: "64%" }}
        />
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-navy/[0.04]"
          style={{ width: "88%", height: "88%" }}
        />

        {TILES.map((tile, index) => {
          const isOuterOrbit = index % 2 === 1;
          const delay = -((index / TILES.length) * ORBIT_DURATION);
          return (
            <div
              key={tile.src}
              className={`motion-safe:animate-[orbit_var(--dur)_linear_var(--delay)_infinite] absolute ${
                isOuterOrbit
                  ? "left-[8%] top-[8%] h-[84%] w-[84%]"
                  : "left-[18%] top-[18%] h-[64%] w-[64%]"
              }`}
              style={
                {
                  "--dur": `${ORBIT_DURATION}s`,
                  "--delay": `${delay}s`,
                } as React.CSSProperties
              }
            >
              <div
                className="motion-safe:animate-[radial-drift_9s_ease-in-out_var(--pulse-delay)_infinite] absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
                style={
                  {
                    "--pulse-delay": `${-index * 1.1}s`,
                  } as React.CSSProperties
                }
              >
                <div
                  className={`motion-safe:animate-[counter-orbit_var(--dur)_linear_var(--delay)_infinite] flex ${tile.size} items-center justify-center rounded border border-line bg-white/95 p-2 ring-1 ring-navy/5 backdrop-blur-sm ${tile.shadow} sm:p-2.5`}
                  style={
                    {
                      "--dur": `${ORBIT_DURATION}s`,
                      "--delay": `${delay}s`,
                    } as React.CSSProperties
                  }
                >
                  <Image
                    src={tile.src}
                    alt=""
                    width={tile.width}
                    height={tile.height}
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>
            </div>
          );
        })}

        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-navy shadow-[0_18px_44px_-18px_rgb(20_27_61/0.35)] ring-1 ring-navy/10 sm:h-28 sm:w-28 md:h-[7.5rem] md:w-[7.5rem]">
            <BrandIcon variant="white" className="h-16 w-16 sm:h-20 sm:w-20 md:h-20 md:w-20" />
          </div>
        </div>
      </div>
    </figure>
  );
}
