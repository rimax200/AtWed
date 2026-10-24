"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const SLIDES = [1, 2, 3, 4, 5, 6].map((n) => ({
  src: `/images/gallery/gallery-0${n}.webp`,
  alt: `AtWED gathering, photo ${n} of 6`,
}));

export default function GalleryCarousel() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [update]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: "smooth" });
  };

  const arrow =
    "grid size-11 place-items-center rounded-full border border-sand bg-white text-ink transition-colors hover:bg-cream disabled:pointer-events-none disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

  return (
    <div className="flex flex-col gap-6" role="region" aria-roledescription="carousel" aria-label="Photo gallery">
      <ul
        ref={trackRef}
        tabIndex={0}
        aria-label="Gallery photos"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") scrollByCard(1);
          if (e.key === "ArrowLeft") scrollByCard(-1);
        }}
        className="flex snap-x snap-mandatory gap-[clamp(1rem,2.65vw,2.5rem)] overflow-x-auto px-(--gutter) pb-2 [scroll-padding-inline:var(--gutter)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {SLIDES.map((slide, i) => (
          <li
            key={slide.src}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${SLIDES.length}`}
            className="w-[min(85vw,672px)] shrink-0 snap-start bg-cream p-[clamp(1.25rem,3.24vw,3.06rem)] md:w-[44.44vw] md:max-w-[672px]"
          >
            <div className="relative aspect-[472/674] w-full overflow-hidden">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="(min-width: 768px) 30vw, 70vw"
                className="object-cover"
                draggable={false}
              />
            </div>
          </li>
        ))}
      </ul>

      <div className="flex justify-center gap-3">
        <button type="button" aria-label="Previous photo" disabled={!canPrev} onClick={() => scrollByCard(-1)} className={arrow}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>
        <button type="button" aria-label="Next photo" disabled={!canNext} onClick={() => scrollByCard(1)} className={arrow}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
