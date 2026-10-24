"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** How far down the viewport the green line "reads" (0.6 = 60%). Tune here. */
export const TRIGGER_POINT = 0.6;

/** The line starts at the centre of the first star (half of its 37.6px image) */
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

export default function ObjectivesTimeline({ children }: { children: ReactNode }) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = timelineRef.current;
    const progress = progressRef.current;
    if (!timeline || !progress) return;

    const stars = Array.from(timeline.querySelectorAll<HTMLElement>("[data-star]"));
    const setStar = (star: HTMLElement, on: boolean) => {
      star.dataset.active = on ? "true" : "false";
    };

    // Reduced motion: everything filled and active, no listeners at all
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      progress.style.transform = "scaleY(1)";
      stars.forEach((s) => setStar(s, true));
      return;
    }

    // Cached on mount and when the timeline resizes
    let starY: number[] = []; // star centres, relative to the timeline top
    let lineTop = 0;
    let lineHeight = 1;
    let minScale = 0; // first segment (first star to the end of row 1) starts filled
    const active = stars.map(() => false);
    let last = -1;
    let frame = 0;

    const measure = () => {
      const t = timeline.getBoundingClientRect();
      starY = stars.map((s) => {
        const r = s.getBoundingClientRect();
        return r.top - t.top + r.height / 2;
      });
      lineTop = starY[0];
      lineHeight = Math.max(t.height - lineTop, 1);
      const firstRow = timeline.querySelector("li")!.getBoundingClientRect();
      minScale = clamp((firstRow.bottom - t.top - lineTop) / lineHeight, 0, 1);
      last = -1; // force a write
      update();
    };

    const update = () => {
      frame = 0;
      // one rect read per frame; everything else is cached
      const top = timeline.getBoundingClientRect().top;
      const triggerY = window.innerHeight * TRIGGER_POINT;
      const scale = clamp((triggerY - top - lineTop) / lineHeight, minScale, 1);

      if (scale !== last) {
        last = scale;
        progress.style.transform = `scaleY(${scale})`;
      }
      const reach = lineTop + scale * lineHeight; // where the green tip is
      for (let i = 0; i < stars.length; i++) {
        const on = reach >= starY[i] - 0.5;
        if (on !== active[i]) {
          active[i] = on;
          setStar(stars[i], on);
        }
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const observer = new ResizeObserver(measure);
    observer.observe(timeline);
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={timelineRef} className="relative">
      {/* Track + progress, from the first star's centre to the end of the last row */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[18.8px] bottom-0 left-[calc(1rem-1.5px)] w-[3px] md:left-[calc(50%-1.5px)]"
      >
        <div className="absolute inset-0 rounded-track bg-track" />
        <div
          ref={progressRef}
          className="timeline-progress absolute inset-0 origin-top rounded-track bg-sage"
          style={{ transform: "scaleY(0.12)" }}
        />
      </div>
      {children}
    </div>
  );
}
