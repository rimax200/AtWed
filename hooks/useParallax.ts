"use client";

import { useEffect, type RefObject } from "react";

type ParallaxOptions = {
  /** Fraction of scroll distance the element lags/leads by. Negative moves the other way. */
  speed?: number;
  /** Parallax is disabled below this viewport width (px) */
  minWidth?: number;
};

export function useParallax(
  ref: RefObject<HTMLElement | null>,
  { speed = 0.15, minWidth = 768 }: ParallaxOptions = {},
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const enabled = () => !reduced.matches && window.innerWidth >= minWidth;

    let visible = false;
    let frame = 0;
    let offset = 0;
    let centerY = 0; // document-space centre of the element, without our transform

    const measure = () => {
      const rect = el.getBoundingClientRect();
      centerY = rect.top + window.scrollY + rect.height / 2 - offset;
    };

    const update = () => {
      frame = 0;
      if (!enabled()) {
        reset();
        return;
      }
      const viewportCenter = window.scrollY + window.innerHeight / 2;
      offset = (viewportCenter - centerY) * speed;
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    };

    const reset = () => {
      offset = 0;
      el.style.transform = "";
      el.style.willChange = "";
    };

    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const onResize = () => {
      if (!enabled()) return reset();
      measure();
      request();
    };

    const start = () => {
      measure();
      el.style.willChange = "transform";
      window.addEventListener("scroll", request, { passive: true });
      window.addEventListener("resize", onResize);
      request();
    };

    const stop = () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", onResize);
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      el.style.willChange = "";
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting === visible) return;
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
      },
      // Start slightly before the element enters so there is no jump
      { rootMargin: "20% 0px" },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      stop();
      reset();
    };
  }, [ref, speed, minWidth]);
}
