import Image from "next/image";
import Reveal from "@/components/Reveal";
import Parallax from "@/components/Parallax";

const flourish = "pointer-events-none absolute h-auto w-(--flourish-w)";

export default function Hero() {
  return (
    <section className="relative overflow-clip bg-white">
      {/* Corner flourishes, drifting slightly against the rings */}
      <Parallax speed={0.05} className="pointer-events-none absolute inset-0 z-20">
        <Image
          src="/images/flourish-tl.webp"
          width={250}
          height={260}
          alt=""
          className={`${flourish} top-(--flourish-inset) left-(--flourish-inset)`}
        />
        <Image
          src="/images/flourish-tr.webp"
          width={250}
          height={260}
          alt=""
          className={`${flourish} top-(--flourish-inset) right-(--flourish-inset)`}
        />
        <Image
          src="/images/flourish-bl.webp"
          width={250}
          height={250}
          alt=""
          className={`${flourish} bottom-(--flourish-bottom) left-(--flourish-inset)`}
        />
        <Image
          src="/images/flourish-br.webp"
          width={250}
          height={250}
          alt=""
          className={`${flourish} right-(--flourish-inset) bottom-(--flourish-bottom)`}
        />
      </Parallax>

      <div className="relative z-10 mx-auto flex max-w-[849px] flex-col items-center px-(--gutter) pt-(--hero-pt) text-center">
        <Reveal>
          <Image
            src="/images/logo.webp"
            width={430}
            height={172}
            alt="AtWED, About To Wed: two wine glasses and a pair of gold wedding rings"
            className="h-auto w-[clamp(16rem,28.4vw,26.875rem)]"
          />
        </Reveal>

        <Reveal delay={90} className="mt-(--hero-gap)">
          <h1 className="mx-auto max-w-[778px] font-display text-tagline font-semibold text-black-60">
            Preparing The Unmarried. Strengthening Marriages. Building Families.
          </h1>
        </Reveal>

        <Reveal delay={180} className="mt-(--hero-gap)">
          <Image
            src="/images/divider.webp"
            width={200}
            height={23}
            alt=""
            className="h-auto w-[clamp(8.75rem,13.2vw,12.5rem)]"
          />
        </Reveal>

        <Reveal
          delay={270}
          className="mt-[clamp(1.25rem,2.2vw,2.0875rem)] flex flex-wrap items-center justify-center gap-x-[clamp(1.5rem,2.6vw,2.478rem)] gap-y-4"
        >
          <a
            href="#objectives"
            className="inline-flex items-center gap-[2px] rounded-pill bg-black bg-(image:--gradient-pill) py-[10.4px] pr-[18.8px] pl-[26.1px] font-display text-button font-medium text-white shadow-pill transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brown"
          >
            Our Goals
            <svg
              viewBox="0 0 25.043 25.043"
              className="size-[25px] -rotate-90"
              aria-hidden="true"
            >
              <path
                transform="translate(5.215 9.597)"
                fill="#fff"
                d="M7.30862 8.3521C7.17129 8.35289 7.03515 8.32657 6.90802 8.27464C6.78088 8.22271 6.66525 8.1462 6.56775 8.04949L0.306878 1.78862C0.209586 1.69132 0.13241 1.57582 0.0797554 1.4487C0.0271011 1.32158 0 1.18534 0 1.04775C0 0.769867 0.110387 0.503369 0.306878 0.306878C0.503369 0.110387 0.769868 0 1.04775 0C1.32563 0 1.59213 0.110387 1.78862 0.306878L7.30862 5.82688L12.8286 0.306878C12.9259 0.209585 13.0414 0.132409 13.1685 0.0797544C13.2956 0.0271001 13.4319 0 13.5695 0C13.7071 0 13.8433 0.0271001 13.9704 0.0797544C14.0976 0.132409 14.2131 0.209585 14.3104 0.306878C14.4076 0.40417 14.4848 0.519674 14.5375 0.646792C14.5901 0.773911 14.6172 0.910155 14.6172 1.04775C14.6172 1.18534 14.5901 1.32158 14.5375 1.4487C14.4848 1.57582 14.4076 1.69132 14.3104 1.78862L8.04949 8.04949C7.95198 8.1462 7.83635 8.22271 7.70922 8.27464C7.58208 8.32657 7.44595 8.35289 7.30862 8.3521Z"
              />
            </svg>
          </a>
          <a
            href="#about"
            className="font-display text-button font-semibold text-black-50 transition-opacity duration-200 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brown"
          >
            About AtWED
          </a>
        </Reveal>
      </div>

      {/* Rings: Figma shows only the top of the image, blurred, fading into the page */}
      <div className="relative left-1/2 mt-(--hero-rings-gap) aspect-[1440/348] w-[max(95.24vw,44rem)] -translate-x-1/2 overflow-hidden">
        <Parallax speed={-0.08} className="absolute inset-0">
          <Image
            src="/images/rings.webp"
            width={2400}
            height={840}
            alt=""
            priority
            fetchPriority="high"
            sizes="(min-width: 704px) 95vw, 704px"
            className="absolute top-0 left-0 -mt-[6.46%] h-auto w-full max-w-none"
          />
        </Parallax>
        <div className="absolute inset-x-0 bottom-0 h-[33.9%] bg-linear-to-b from-white/0 to-white" />
      </div>
    </section>
  );
}
