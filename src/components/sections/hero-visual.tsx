import { BrandIcon } from "@/components/brand/logo";
import Image from "next/image";

type Tile = {
  src: string;
  alt: string;
  width: number;
  height: number;
  size: string;
  position: string;
  rotate: string;
  delay: string;
  duration: string;
  shadow: string;
};

const TILES: Tile[] = [
  {
    src: "/assets/companies/aapl.svg",
    alt: "Apple",
    width: 475,
    height: 475,
    size: "h-20 w-20 sm:h-24 sm:w-24",
    position: "left-[4%] top-[8%]",
    rotate: "-rotate-8",
    delay: "0s",
    duration: "6.4s",
    shadow: "shadow-[0_14px_34px_-16px_rgb(20_27_61/0.22)]",
  },
  {
    src: "/assets/companies/msft.svg",
    alt: "Microsoft",
    width: 48,
    height: 48,
    size: "h-16 w-16 sm:h-20 sm:w-20",
    position: "right-[6%] top-[6%]",
    rotate: "rotate-4",
    delay: "0.5s",
    duration: "7.2s",
    shadow: "shadow-[0_10px_26px_-14px_rgb(20_27_61/0.18)]",
  },
  {
    src: "/assets/companies/nvda.svg",
    alt: "NVIDIA",
    width: 64,
    height: 64,
    size: "h-16 w-16 sm:h-20 sm:w-20",
    position: "left-[2%] top-[46%]",
    rotate: "-rotate-5",
    delay: "1.1s",
    duration: "6.8s",
    shadow: "shadow-[0_12px_30px_-16px_rgb(20_27_61/0.2)]",
  },
  {
    src: "/assets/companies/v.svg",
    alt: "Visa",
    width: 750,
    height: 471,
    size: "h-16 w-16 sm:h-20 sm:w-20",
    position: "right-[4%] top-[42%]",
    rotate: "rotate-3",
    delay: "0.3s",
    duration: "7.6s",
    shadow: "shadow-[0_10px_26px_-14px_rgb(20_27_61/0.18)]",
  },
  {
    src: "/assets/companies/amzn.svg",
    alt: "Amazon",
    width: 64,
    height: 64,
    size: "h-20 w-20 sm:h-24 sm:w-24",
    position: "left-[14%] bottom-[6%]",
    rotate: "-rotate-6",
    delay: "0.9s",
    duration: "6.6s",
    shadow: "shadow-[0_14px_34px_-16px_rgb(20_27_61/0.22)]",
  },
  {
    src: "/assets/companies/tsla.svg",
    alt: "Tesla",
    width: 64,
    height: 64,
    size: "h-16 w-16 sm:h-20 sm:w-20",
    position: "right-[12%] bottom-[8%]",
    rotate: "rotate-7",
    delay: "1.4s",
    duration: "7.4s",
    shadow: "shadow-[0_12px_30px_-16px_rgb(20_27_61/0.2)]",
  },
];

export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[520px]">
      {/* Soft halo behind the central monogram */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#eef1fd_0%,#eef1fd_45%,transparent_72%)] sm:h-52 sm:w-52"
      />

      <div className="relative aspect-square w-full">
        {/* Floating company logos, organically distributed */}
        {TILES.map((tile, index) => (
          <div
            key={tile.src}
            className={`absolute ${tile.position} ${tile.rotate}`}
          >
            <div
              className={`motion-safe:animate-[float_var(--dur)_ease-in-out_var(--delay)_infinite] flex ${tile.size} items-center justify-center rounded-2xl border border-line bg-white/95 p-2.5 ring-1 ring-navy/5 backdrop-blur-sm sm:p-3 ${tile.shadow}`}
              style={
                {
                  "--dur": tile.duration,
                  "--delay": tile.delay,
                } as React.CSSProperties
              }
            >
              <Image
                src={tile.src}
                alt={tile.alt}
                width={tile.width}
                height={tile.height}
                className="h-full w-full object-contain"
                loading={index < 2 ? "eager" : "lazy"}
              />
            </div>
          </div>
        ))}

        {/* Central DeBro monogram focal point */}
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-navy/10 bg-white shadow-[0_18px_40px_-18px_rgb(20_27_61/0.28)] ring-1 ring-navy/5 sm:h-24 sm:w-24">
            <BrandIcon className="h-9 w-9 sm:h-11 sm:w-11" />
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-xs leading-relaxed text-muted">
        Illustrative companies only. Asset availability is not confirmed.
      </p>
    </div>
  );
}
