import Image from "next/image";
import ParallaxBackground from "@/components/ParallaxBackground";
import Reveal from "@/components/Reveal";
import SetReminderButton, { NextDate } from "@/components/SetReminderButton";

// Parallax tuning for this section (fraction of scroll speed the photo lags behind)
const PARALLAX_SPEED_DESKTOP = 0.2;
const PARALLAX_SPEED_MOBILE = 0.1;

/*
 * The card keeps Figma's 434 x 724 proportions. Text sizes are clamp(15px, cqw, Figma px)
 * with cqw relative to the card width, so text scales with the ornate frame and never
 * drops below 15px. The text area is the part inside the filigree: the Figma text block
 * (19% side inset, 32.2% top, 23.3% bottom) widened to 17% / 28% to make room for the
 * "Next:" date line and the Google Calendar link.
 */
export default function MeetingDetails() {
  return (
    <section
      id="join-us"
      aria-labelledby="join-heading"
      className="scroll-mt-(--nav-h) bg-white"
    >
      <div className="relative isolate overflow-hidden">
        <ParallaxBackground
          src="/images/md-photo.webp"
          width={1600}
          height={2211}
          speedDesktop={PARALLAX_SPEED_DESKTOP}
          speedMobile={PARALLAX_SPEED_MOBILE}
          objectPosition="50% 79%"
        />

        <div className="relative flex justify-center px-4 py-6 lg:py-[1.19rem]">
          <Reveal direction="scale">
            <div className="relative aspect-[434/724] w-[min(calc(100vw-2rem),clamp(20.5rem,22vw+12rem,27.125rem))] [container-type:inline-size]">
              <Image
                src="/images/md-card.webp"
                width={868}
                height={1446}
                alt=""
                sizes="434px"
                className="absolute inset-0 size-full"
              />

              <div className="absolute inset-x-[17%] top-[28%] bottom-[23.3%] flex flex-col items-center justify-center gap-[clamp(0.75rem,3.69cqw,1rem)] text-center">
                <div className="flex flex-col items-center gap-[clamp(0.25rem,1.4cqw,0.375rem)]">
                  <h2
                    id="join-heading"
                    className="font-body text-[clamp(0.9375rem,4.147cqw,1.125rem)] leading-none font-medium tracking-[-0.02em] text-gold"
                  >
                    Venue and Time
                  </h2>
                  <p className="font-body text-[clamp(0.9375rem,5.07cqw,1.375rem)] leading-[1.31] font-semibold tracking-[-0.018em] text-balance text-ink-strong">
                    ParkInn By Radisson Hotel
                  </p>
                </div>

                <p className="font-accent text-[clamp(1.75rem,9.68cqw,2.625rem)] leading-[1.2] tracking-[-0.0143em] whitespace-nowrap text-ink-strong uppercase">
                  2PM - 4PM
                </p>

                <div className="flex flex-col items-center gap-[clamp(0.125rem,0.7cqw,0.25rem)]">
                  <p className="font-body text-[clamp(0.9375rem,3.687cqw,1rem)] leading-[1.2] font-medium tracking-[-0.0125em] text-balance text-ink-strong">
                    Holds Every Last Sunday of the Month
                  </p>
                  <NextDate className="font-body text-[clamp(0.9375rem,3.687cqw,1rem)] leading-[1.2] font-medium tracking-[-0.0125em] text-balance text-ink-strong/80" />
                </div>

                <SetReminderButton linkClassName="font-body text-[clamp(0.9375rem,3.687cqw,1rem)] leading-[1.2] font-medium tracking-[-0.0125em] text-ink-strong/70 hover:underline focus-visible:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink-strong" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
