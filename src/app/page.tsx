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

      <nav className="order-1 mb-1 flex flex-wrap justify-center gap-x-[14px] gap-y-3 text-nav uppercase text-ink desk:absolute desk:left-1/2 desk:top-[calc(20*var(--u))] desk:mb-0 desk:-translate-x-1/2 desk:flex-nowrap desk:items-center desk:gap-8">
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

      <div className="order-2 flex flex-col items-center gap-1.5 text-center desk:absolute desk:left-[calc(40*var(--u))] desk:top-[41%] desk:w-[33.7%] desk:-translate-y-1/2 desk:gap-[30px] desk:text-left">
        <p className="text-label uppercase text-muted [--fs:13px] desk:w-[calc(232*var(--u))]">
          The Coming Soon Experience of
        </p>
        <h1 className="text-[length:clamp(44px,14vw,72px)] font-normal capitalize leading-none text-ink desk:w-[calc(348*var(--u))] desk:text-center desk:text-[length:calc(72*var(--u))]">
          AtWed
        </h1>
        <p className="max-w-[260px] text-label capitalize text-muted desk:w-[calc(232*var(--u))] desk:max-w-none">
          A platform to teach biblical principles of marriage.
        </p>
      </div>

      <time
        dateTime="2026-10-25T14:00"
        className="order-4 flex flex-col items-center gap-2 text-label uppercase text-muted desk:absolute desk:right-[calc(40*var(--u))] desk:top-1/2 desk:w-[33.7%] desk:-translate-y-1/2 desk:gap-4"
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
