import type { CSSProperties } from "react";
import Image from "next/image";

const dateFrameBars = [
  { box: "left-[calc(15*var(--k))] top-[calc(-1.13*var(--k))] h-[calc(6*var(--k))] w-[calc(42*var(--k))]", turn: "rotate-180" },
  { box: "left-0 top-[calc(15*var(--k))] h-[calc(42*var(--k))] w-[calc(6*var(--k))]", turn: "rotate-90" },
  { box: "left-[calc(66*var(--k))] top-[calc(15*var(--k))] h-[calc(42*var(--k))] w-[calc(6*var(--k))]", turn: "-rotate-90" },
  { box: "left-[calc(15*var(--k))] top-[calc(66.13*var(--k))] h-[calc(6*var(--k))] w-[calc(42*var(--k))]", turn: "" },
];

const flourishes = [
  { src: "/images/flourish-top-left.webp", height: 520, position: "left-[6px] top-[6px] desk:left-[10px] desk:top-[10px]" },
  { src: "/images/flourish-top-right.webp", height: 520, position: "right-[6px] top-[6px] desk:right-[10px] desk:top-[10px]" },
  { src: "/images/flourish-bottom-left.webp", height: 501, position: "bottom-[6px] left-[6px] desk:bottom-[10px] desk:left-[10px]" },
  { src: "/images/flourish-bottom-right.webp", height: 501, position: "bottom-[6px] right-[6px] desk:bottom-[10px] desk:right-[10px]" },
];

const petalFrame = { width: 1512, height: 861 };

// x, y, size, rot and the Figma opacity come from the Petals frame (15:2001); the rest is motion tuning
const petals = [
  { src: "/images/petals/petal-1.webp", x: 1125.14, y: 753.63, size: 112.65, rot: 78.32, peak: 0.85, fall: 17.5, sway: 45, swayDur: 3.4, tumbleDur: 6.4 },
  { src: "/images/petals/petal-2.webp", x: 856.34, y: 809.84, size: 84.28, rot: 116.28, peak: 0.84, fall: 20.5, sway: 28, swayDur: 5.2, tumbleDur: 4.6 },
  { src: "/images/petals/petal-3.webp", x: 751.81, y: 539.89, size: 137.31, rot: 170.14, peak: 0.86, fall: 14, sway: 55, swayDur: 5.8, tumbleDur: 7.8 },
  { src: "/images/petals/petal-2.webp", x: 355.7, y: 373.94, size: 135.78, rot: -125.42, peak: 0.94, fall: 15.5, sway: 60, swayDur: 4.1, tumbleDur: 5.5 },
  { src: "/images/petals/petal-3.webp", x: 161.11, y: -127.27, size: 61.01, rot: -6.48, peak: 0.85, fall: 24, sway: 15, swayDur: 3.9, tumbleDur: 7 },
];

export default function Home() {
  return (
    <main className="relative flex h-dvh w-full flex-col items-center gap-3 overflow-hidden border-2 border-muted bg-white pb-[max(16px,env(safe-area-inset-bottom))] pl-[max(16px,env(safe-area-inset-left))] pr-[max(16px,env(safe-area-inset-right))] pt-[max(16px,env(safe-area-inset-top))] desk:block desk:border-[3px] desk:p-0">
      {flourishes.map(({ src, height, position }) => (
        <Image
          key={src}
          src={src}
          alt=""
          aria-hidden
          width={500}
          height={height}
          sizes="290px"
          className={`pointer-events-none absolute h-auto w-[clamp(44px,14vw,90px)] desk:w-[min(calc(250*var(--u)),calc(250*var(--v)))] ${position}`}
        />
      ))}

      <nav className="order-1 z-10 mb-1 flex flex-wrap justify-center gap-x-[14px] gap-y-3 text-nav uppercase text-ink desk:absolute desk:left-1/2 desk:top-[calc(20*var(--u))] desk:mb-0 desk:-translate-x-1/2 desk:flex-nowrap desk:items-center desk:gap-8">
        <span>Our Story</span>
        <span>Features</span>
        <span className="order-first flex basis-full justify-center desk:order-none desk:basis-auto">
          <Image
            src="/images/logo.png"
            alt="AtWed"
            width={125}
            height={50}
            priority
            className="h-auto w-[100px] desk:w-[calc(125*var(--u))]"
          />
        </span>
        <span>Schedule</span>
        <span>Contact</span>
      </nav>

      <Image
        src="/images/couple.webp"
        alt="Illustration of a bride and groom"
        width={1023}
        height={1330}
        priority
        sizes="35vw"
        className="order-3 min-h-0 w-full flex-1 object-contain desk:absolute desk:left-1/2 desk:top-[17.9dvh] desk:h-[72.7dvh] desk:w-auto desk:max-w-none desk:flex-none desk:-translate-x-1/2"
      />

      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {petals.map(({ src, x, y, size, rot, peak, fall, sway, swayDur, tumbleDur }, i) => {
          const top = (y / petalFrame.height) * 100;
          const style = {
            "--cx": ((x + size / 2) / petalFrame.width) * 100,
            "--top": `${top}%`,
            "--s": size,
            "--rot": `${rot}deg`,
            "--o": peak,
            "--dur": `${fall}s`,
            "--delay": `${(-(fall * (top + 15)) / 130).toFixed(2)}s`,
            "--sway": `${sway}px`,
            "--sdur": `${swayDur}s`,
            "--tdur": `${tumbleDur}s`,
          } as CSSProperties;
          return (
            <span key={i} className="petal-fall" style={style}>
              <span className="petal-sway">
                <Image src={src} alt="" width={300} height={300} loading="eager" className="petal-img" />
              </span>
            </span>
          );
        })}
      </div>

      <div className="order-2 z-10 flex flex-col items-center gap-1.5 text-center desk:absolute desk:left-[calc(40*var(--u))] desk:top-[41%] desk:w-[33.7%] desk:-translate-y-1/2 desk:gap-[30px] desk:text-left">
        <p className="text-label uppercase text-muted [--fs:13px] desk:w-[calc(232*var(--u))]">
          The Coming Soon Experience of
        </p>
        <h1 className="text-[length:clamp(44px,14vw,72px)] font-normal capitalize leading-none text-ink desk:w-[calc(348*var(--u))] desk:text-center desk:text-[length:calc(72*var(--u))]">
          AtWED
        </h1>
        <p className="max-w-[260px] text-label capitalize text-muted desk:w-[calc(232*var(--u))] desk:max-w-none">
          A platform to teach biblical principles of marriage.
        </p>
      </div>

      <time
        dateTime="2026-10-25T14:00"
        className="order-4 z-10 flex flex-col items-center gap-2 text-label uppercase text-muted desk:absolute desk:right-[calc(40*var(--u))] desk:top-1/2 desk:w-[33.7%] desk:-translate-y-1/2 desk:gap-4"
      >
        <span>2pm</span>
        <span className="flex w-full items-center justify-center gap-3 desk:gap-4">
          <span className="min-w-0 flex-1 text-right">Oct</span>
          <span className="relative size-[calc(72*var(--k))] shrink-0 [--k:0.7222px] desk:[--k:var(--u)]">
            {dateFrameBars.map(({ box, turn }) => (
              <span key={box} className={`absolute flex items-center justify-center ${box}`}>
                <span className={`relative block h-[calc(6*var(--k))] w-[calc(42*var(--k))] shrink-0 ${turn}`}>
                  <Image src="/images/ornament.png" alt="" aria-hidden fill sizes="64px" className="object-cover" />
                </span>
              </span>
            ))}
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="-translate-y-[calc(5.5*var(--k))] font-garamond text-[length:calc(40*var(--k))] leading-[calc(32*var(--k))] tracking-[calc(-2*var(--k))] text-black">
                25
              </span>
            </span>
          </span>
          <span className="min-w-0 flex-1 text-left">2026</span>
        </span>
        <span>Live</span>
      </time>

      <Image
        src="/images/logo.png"
        alt=""
        aria-hidden
        width={68}
        height={27}
        className="hidden h-auto desk:absolute desk:bottom-4 desk:left-1/2 desk:block desk:w-[calc(68*var(--u))] desk:-translate-x-1/2"
      />
    </main>
  );
}
