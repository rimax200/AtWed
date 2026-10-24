"use client";

import { useEffect, useRef, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Delay in milliseconds */
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
  /** Below md, ignore `direction` and rise up instead */
  mobileUp?: boolean;
  className?: string;
  /** Viewport inset used to decide "in view". Use "0px" for content at the very end of the page. */
  rootMargin?: string;
};

// Where the element starts; it animates to its natural position.
const offsets = {
  up: ["0px", "var(--reveal-distance)", "1"],
  left: ["calc(var(--reveal-distance) * -1)", "0px", "1"],
  right: ["var(--reveal-distance)", "0px", "1"],
  scale: ["0px", "0px", "0.97"], // gentle fade + scale-up, no movement
} as const;

export default function Reveal({
  children,
  delay = 0,
  direction = "up",
  mobileUp = false,
  className = "",
  rootMargin = "0px 0px -8% 0px",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        el.dataset.state = "animating";
        // Drop will-change once the transition ends
        const done = (e: TransitionEvent) => {
          if (e.propertyName !== "transform") return;
          el.dataset.state = "done";
          el.removeEventListener("transitionend", done);
        };
        el.addEventListener("transitionend", done);
      },
      { threshold: 0.15, rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  const [x, y, scale] = offsets[direction];

  return (
    <div
      ref={ref}
      className={`reveal ${mobileUp ? "reveal-mobile-up" : ""} ${className}`}
      style={{
        "--reveal-x": x,
        "--reveal-y": y,
        "--reveal-scale": scale,
        transitionDelay: delay ? `${delay}ms` : undefined,
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
