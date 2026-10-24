"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/*
 * Tune these. Start offsets, as a percentage of the scene (footer) width.
 * The final position (progress = 1) is the Figma position: offset 0.
 * Positive X moves right, positive Y moves down.
 */
export const LEFT_HAND_START_X = -18;
export const RIGHT_HAND_START_X = 18;
export const RIGHT_HAND_START_Y = -4;

/** Progress reaches 1 when the footer's top edge is this far from the top of the viewport (0.25 = 25%) */
export const END_FOOTER_TOP = 0.25;

/** Below this scroll range (px) the hands switch from scrubbing to "in once the footer is fully in view" */
const MIN_RANGE = 120;

/** easeOutCubic: the hands decelerate as they approach each other */
const ease = (p: number) => 1 - (1 - p) ** 3;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/*
 * Hand frames from Figma, relative to the 1511 x 1115 photo block, tight-cropped
 * to the visible pixels. left/width are % of the block width, top/height % of its height.
 */
const MAN = { left: "-0.0062%", top: "16.4468%", width: "56.7736%", height: "37.2617%" };
const WOMAN = { left: "46.81%", top: "-16.6925%", width: "53.19%", height: "48.0141%" };

export default function FooterHands() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const manRef = useRef<HTMLDivElement>(null);
  const womanRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const man = manRef.current;
    const woman = womanRef.current;
    const footer = scene?.closest("footer");
    if (!scene || !man || !woman || !footer) return;

    // Reduced motion: no listener, the hands stay at their final (Figma) position
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    let startY = 0;
    let endY = 1;
    let fullyInViewY = 0; // scrollY at which the footer's bottom edge reaches the viewport bottom
    let sceneWidth = 0;
    let shortRange = false;
    let frame = 0;
    let lastMan = "";
    let lastWoman = "";

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const p = shortRange ? (y >= fullyInViewY ? 1 : 0) : clamp01((y - startY) / (endY - startY));
      const k = 1 - ease(p); // 1 = start offset, 0 = final position
      const unit = (sceneWidth / 100) * k;

      const nextMan = `translate3d(${(LEFT_HAND_START_X * unit).toFixed(1)}px, 0px, 0px)`;
      const nextWoman = `translate3d(${(RIGHT_HAND_START_X * unit).toFixed(1)}px, ${(RIGHT_HAND_START_Y * unit).toFixed(1)}px, 0px)`;
      if (nextMan !== lastMan) {
        lastMan = nextMan;
        man.style.transform = nextMan;
      }
      if (nextWoman !== lastWoman) {
        lastWoman = nextWoman;
        woman.style.transform = nextWoman;
      }
    };

    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    // Scroll positions, not element rects: the footer is the last section, so the
    // page may never scroll far enough for it to reach the desired end position.
    const measure = () => {
      const rect = footer.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const viewport = window.innerHeight;
      const maxY = document.documentElement.scrollHeight - viewport;
      startY = top - viewport;
      endY = Math.min(top - viewport * END_FOOTER_TOP, maxY);
      shortRange = endY - startY < MIN_RANGE;
      fullyInViewY = Math.min(top + rect.height - viewport, maxY);
      sceneWidth = scene.offsetWidth;
      request();
    };

    let listening = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting === listening) return;
        listening = entry.isIntersecting;
        if (listening) {
          man.style.willChange = woman.style.willChange = "transform";
          window.addEventListener("scroll", request, { passive: true });
        } else {
          window.removeEventListener("scroll", request);
          man.style.willChange = woman.style.willChange = "";
        }
        request(); // also settles the hands when the footer is left
      },
      { rootMargin: "50% 0px 50% 0px" },
    );
    observer.observe(footer);

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(footer);
    resizeObserver.observe(document.body);
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);
    measure();

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
      if (frame) cancelAnimationFrame(frame);
      man.style.transform = woman.style.transform = "";
      man.style.willChange = woman.style.willChange = "";
    };
  }, []);

  return (
    <div
      ref={sceneRef}
      aria-hidden="true"
      className="pointer-events-none absolute top-0 left-0 z-10 aspect-[1511/1115] w-full"
    >
      <div ref={manRef} className="absolute" style={MAN}>
        <Image
          src="/images/footer/hand-man.webp"
          width={1875}
          height={909}
          alt=""
          loading="lazy"
          className="block size-full max-w-none"
        />
      </div>
      <div ref={womanRef} className="absolute" style={WOMAN}>
        <Image
          src="/images/footer/hand-woman.webp"
          width={1757}
          height={1170}
          alt=""
          loading="lazy"
          className="block size-full max-w-none"
        />
      </div>
    </div>
  );
}
