"use client";

import { useRef, type ReactNode } from "react";
import { useParallax } from "@/hooks/useParallax";

type ParallaxProps = {
  children: ReactNode;
  speed: number;
  className?: string;
};

// Client wrapper so server components can use useParallax
export default function Parallax({ children, speed, className = "" }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  useParallax(ref, { speed });
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
