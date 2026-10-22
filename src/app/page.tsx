import Image from "next/image";

const dateFrameBars = [
  { box: "left-[calc(15*var(--u))] top-[calc(-1.13*var(--u))] h-[calc(6*var(--u))] w-[calc(42*var(--u))]", turn: "rotate-180" },
  { box: "left-0 top-[calc(15*var(--u))] h-[calc(42*var(--u))] w-[calc(6*var(--u))]", turn: "rotate-90" },
  { box: "left-[calc(66*var(--u))] top-[calc(15*var(--u))] h-[calc(42*var(--u))] w-[calc(6*var(--u))]", turn: "-rotate-90" },
  { box: "left-[calc(15*var(--u))] top-[calc(66.13*var(--u))] h-[calc(6*var(--u))] w-[calc(42*var(--u))]", turn: "" },
];

const flourishes = [
  { src: "/images/flourish-top-left.webp", height: 520, position: "left-[10px] top-[10px]" },
  { src: "/images/flourish-top-right.webp", height: 520, position: "right-[10px] top-[10px]" },
  { src: "/images/flourish-bottom-left.webp", height: 501, position: "bottom-[10px] left-[10px]" },
  { src: "/images/flourish-bottom-right.webp", height: 501, position: "bottom-[10px] right-[10px]" },
];

export default function Home() {
  return (
    <main className="relative h-dvh w-full overflow-hidden border-[3px] border-muted bg-white">
      {flourishes.map(({ src, height, position }) => (
        <Image
          key={src}
          src={src}
          alt=""
          aria-hidden
          width={500}
          height={height}
          sizes="290px"
          className={`pointer-events-none absolute h-auto w-[calc(250*var(--u))] ${position}`}
        />
      ))}

      <nav className="absolute left-1/2 top-[calc(20*var(--u))] flex -translate-x-1/2 items-center gap-8 text-nav uppercase text-ink">
        <span>Our Story</span>
        <span>Features</span>
        <Image
          src="/images/logo.png"
          alt="AtWed"
          width={125}
          height={50}
          priority
          className="h-auto w-[calc(125*var(--u))]"
        />
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
        className="absolute left-1/2 top-[17.9dvh] h-[72.7dvh] w-auto max-w-none -translate-x-1/2"
      />

      <div className="absolute left-[calc(40*var(--u))] top-[41%] flex w-[33.7%] -translate-y-1/2 flex-col items-center gap-[30px]">
        <p className="w-[calc(232*var(--u))] text-left text-label uppercase text-muted">
          The Coming Soon Experience of
        </p>
        <h1 className="w-[calc(348*var(--u))] text-center text-[length:calc(72*var(--u))] font-normal capitalize leading-none text-ink">
          AtWed
        </h1>
        <p className="w-[calc(232*var(--u))] text-left text-label capitalize text-muted">
          A platform to teach biblical principles of marriage.
        </p>
      </div>

      <time
        dateTime="2026-10-25T14:00"
        className="absolute right-[calc(40*var(--u))] top-1/2 flex w-[33.7%] -translate-y-1/2 flex-col items-center gap-4 text-label uppercase text-muted"
      >
        <span>2pm</span>
        <span className="flex w-full items-center justify-center gap-4">
          <span className="min-w-0 flex-1 text-right">Oct</span>
          <span className="relative size-[calc(72*var(--u))] shrink-0">
            {dateFrameBars.map(({ box, turn }) => (
              <span key={box} className={`absolute flex items-center justify-center ${box}`}>
                <span className={`relative block h-[calc(6*var(--u))] w-[calc(42*var(--u))] shrink-0 ${turn}`}>
                  <Image src="/images/ornament.png" alt="" aria-hidden fill sizes="64px" className="object-cover" />
                </span>
              </span>
            ))}
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="-translate-y-[calc(5.5*var(--u))] font-garamond text-[length:calc(40*var(--u))] leading-[calc(32*var(--u))] tracking-[calc(-2*var(--u))] text-black">
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
        className="absolute bottom-4 left-1/2 h-auto w-[calc(68*var(--u))] -translate-x-1/2"
      />
    </main>
  );
}
