import Image from "next/image";

type Tile = {
  src: string;
  alt: string;
  width: number;
  height: number;
  position: string;
  rotate: string;
  delay: string;
  duration: string;
  mobileHidden?: boolean;
};

const TILES: Tile[] = [
  {
    src: "/assets/companies/aapl.svg",
    alt: "Apple",
    width: 475,
    height: 475,
    position: "left-[6%] top-[6%]",
    rotate: "-rotate-6",
    delay: "0s",
    duration: "6s",
  },
  {
    src: "/assets/companies/msft.svg",
    alt: "Microsoft",
    width: 48,
    height: 48,
    position: "right-[8%] top-[4%]",
    rotate: "rotate-3",
    delay: "0.4s",
    duration: "7s",
  },
  {
    src: "/assets/companies/ko.svg",
    alt: "Coca-Cola",
    width: 64,
    height: 64,
    position: "left-[30%] top-[8%]",
    rotate: "-rotate-3",
    delay: "0.8s",
    duration: "6.5s",
  },
  {
    src: "/assets/companies/nvda.svg",
    alt: "NVIDIA",
    width: 64,
    height: 64,
    position: "left-[8%] top-[40%]",
    rotate: "-rotate-4",
    delay: "1.2s",
    duration: "7.5s",
  },
  {
    src: "/assets/companies/v.svg",
    alt: "Visa",
    width: 750,
    height: 471,
    position: "right-[6%] top-[36%]",
    rotate: "rotate-2",
    delay: "0.2s",
    duration: "6.2s",
  },
  {
    src: "/assets/companies/tsla.svg",
    alt: "Tesla",
    width: 64,
    height: 64,
    position: "left-[34%] top-[44%]",
    rotate: "rotate-5",
    delay: "1s",
    duration: "7s",
    mobileHidden: true,
  },
  {
    src: "/assets/companies/amzn.svg",
    alt: "Amazon",
    width: 64,
    height: 64,
    position: "left-[10%] bottom-[6%]",
    rotate: "-rotate-5",
    delay: "0.6s",
    duration: "6.8s",
  },
  {
    src: "/assets/companies/mcd.svg",
    alt: "McDonald's",
    width: 512,
    height: 512,
    position: "right-[10%] bottom-[4%]",
    rotate: "rotate-4",
    delay: "1.4s",
    duration: "7.2s",
    mobileHidden: true,
  },
];

export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[520px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 rounded-[3rem] bg-[radial-gradient(circle_at_50%_40%,#eef1fd_0%,transparent_72%)]"
      />

      <div className="relative aspect-[4/3] w-full">
        {TILES.map((tile, index) => (
          <div
            key={tile.src}
            className={`absolute ${tile.position} ${tile.rotate} ${
              tile.mobileHidden ? "hidden sm:block" : ""
            }`}
          >
            <div
              className="motion-safe:animate-[float_var(--dur)_ease-in-out_var(--delay)_infinite] flex h-16 w-16 items-center justify-center rounded-2xl border border-line bg-white/95 p-2.5 shadow-[0_10px_28px_-14px_rgb(20_27_61/0.2)] ring-1 ring-navy/5 backdrop-blur-sm sm:h-20 sm:w-20 sm:p-3"
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
                loading={index < 3 ? "eager" : "lazy"}
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
