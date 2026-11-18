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
};

const TILES: Tile[] = [
  {
    src: "/assets/companies/aapl.svg",
    alt: "Apple",
    width: 475,
    height: 475,
    size: "h-20 w-20 sm:h-24 sm:w-24",
    position: "left-[4%] top-[6%]",
    rotate: "-rotate-6",
    delay: "0s",
    duration: "6s",
  },
  {
    src: "/assets/companies/msft.svg",
    alt: "Microsoft",
    width: 48,
    height: 48,
    size: "h-16 w-16 sm:h-20 sm:w-20",
    position: "right-[6%] top-[2%]",
    rotate: "rotate-3",
    delay: "0.4s",
    duration: "7s",
  },
  {
    src: "/assets/companies/nvda.svg",
    alt: "NVIDIA",
    width: 64,
    height: 64,
    size: "h-24 w-24 sm:h-28 sm:w-28",
    position: "left-[2%] top-[42%]",
    rotate: "-rotate-3",
    delay: "0.8s",
    duration: "6.5s",
  },
  {
    src: "/assets/companies/v.svg",
    alt: "Visa",
    width: 750,
    height: 471,
    size: "h-14 w-24 sm:h-16 sm:w-[7.5rem]",
    position: "right-[4%] top-[34%]",
    rotate: "rotate-2",
    delay: "1.2s",
    duration: "7.5s",
  },
  {
    src: "/assets/companies/amzn.svg",
    alt: "Amazon",
    width: 64,
    height: 64,
    size: "h-20 w-20 sm:h-22 sm:w-22",
    position: "left-[18%] bottom-[8%]",
    rotate: "-rotate-4",
    delay: "0.2s",
    duration: "6.2s",
  },
  {
    src: "/assets/companies/tsla.svg",
    alt: "Tesla",
    width: 64,
    height: 64,
    size: "h-20 w-20 sm:h-24 sm:w-24",
    position: "right-[14%] bottom-[4%]",
    rotate: "rotate-5",
    delay: "1s",
    duration: "7s",
  },
];

export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[520px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 rounded-[3rem] bg-[radial-gradient(circle_at_50%_40%,#eef1fd_0%,transparent_72%)]"
      />

      <div className="relative aspect-[5/4.6] w-full">
        {TILES.map((tile, index) => (
          <div
            key={tile.src}
            className={`absolute ${tile.position} ${tile.rotate}`}
          >
            <div
              className={`motion-safe:animate-[float_var(--dur)_ease-in-out_var(--delay)_infinite] flex ${tile.size} items-center justify-center rounded-2xl border border-line bg-white/95 p-3 shadow-[0_12px_32px_-16px_rgb(20_27_61/0.22)] ring-1 ring-navy/5 backdrop-blur-sm sm:p-4`}
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
      </div>

      <p className="mt-4 text-center text-xs leading-relaxed text-muted">
        Illustrative companies only. Asset availability is not confirmed.
      </p>
    </div>
  );
}
