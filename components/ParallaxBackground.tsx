"use client";

import { useRef, useSyncExternalStore, type CSSProperties } from "react";
import Image from "next/image";
import { useParallax } from "@/hooks/useParallax";

/*
 * Tune these. Fraction of scroll speed the photo lags behind the page.
 * Mobile uses a smaller value (and so a smaller travel distance).
 */
export const PARALLAX_SPEED_DESKTOP = 0.25;
export const PARALLAX_SPEED_MOBILE = 0.12;

const mobileQuery = "(max-width: 767px)";
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(mobileQuery);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

type Props = {
  src: string;
  width: number;
  height: number;
  /** Override the default speeds above for a specific section */
  speedDesktop?: number;
  speedMobile?: number;
  /** CSS object-position, to choose which part of the photo shows */
  objectPosition?: string;
};

/*
 * Parallax maths (s = speed, H = section height, V = viewport height):
 *   the hook's offset is (viewportCentre - imageCentre) * s, and the section is
 *   visible while that distance is at most (V + H) / 2, so
 *   max travel  T = s * (V + H) / 2
 *   image height  = H + 2T = H * (1 + s) + s * V   (100lvh >= innerHeight, so safe)
 *   image top     = -T                              (image is centred on the section)
 * The image therefore always covers the section; no empty edge can show.
 * Under reduced motion the transform is cleared and the image sits centred.
 */
export default function ParallaxBackground({
  src,
  width,
  height,
  speedDesktop = PARALLAX_SPEED_DESKTOP,
  speedMobile = PARALLAX_SPEED_MOBILE,
  objectPosition,
}: Props) {
  const ref = useRef<HTMLImageElement>(null);
  const isMobile = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(mobileQuery).matches,
    () => true,
  );
  const speed = isMobile ? speedMobile : speedDesktop;

  useParallax(ref, { speed, minWidth: 0 });

  return (
    <Image
      ref={ref}
      src={src}
      width={width}
      height={height}
      alt=""
      sizes="100vw"
      className="absolute left-0 w-full max-w-none object-cover"
      style={
        {
          "--s": speed,
          objectPosition,
          top: "calc(-50% * var(--s) - 50lvh * var(--s))",
          height: "calc(100% * (1 + var(--s)) + 100lvh * var(--s))",
        } as CSSProperties
      }
    />
  );
}
