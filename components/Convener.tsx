import Image from "next/image";
import Section from "@/components/Section";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

export default function Convener() {
  return (
    <Section
      id="convener"
      labelledBy="convener-heading"
      className="py-[clamp(2.5rem,4vw,3.75rem)]!"
    >
      <Container className="flex flex-col items-center gap-[clamp(2rem,4.6vw,4.375rem)] pb-[clamp(1.5rem,2.65vw,2.5rem)]">
        <header className="flex flex-col items-center gap-1 text-center">
          <Reveal>
            <p className="font-display text-eyebrow uppercase text-taupe">The Convener</p>
          </Reveal>
          <Reveal delay={80}>
            <h2
              id="convener-heading"
              className="max-w-[852px] font-display text-display font-semibold capitalize text-ink"
            >
              Meet The Convener
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <Image
              src="/images/divider.webp"
              width={200}
              height={23}
              alt=""
              className="h-auto w-[clamp(8.75rem,13.2vw,12.5rem)]"
            />
          </Reveal>
        </header>

        {/* Figma: panel 532px + 64px gap + 610px text column, centred (1206px) */}
        <div className="grid w-full max-w-[75.375rem] items-center gap-x-[clamp(1.5rem,4.2vw,4rem)] gap-y-8 md:grid-cols-[minmax(0,532fr)_minmax(0,610fr)]">
          <Reveal direction="left" mobileUp>
            <figure className="mx-auto w-[88%] max-w-[380px] [container-type:inline-size] md:w-full md:max-w-none">
              {/* Panel padding is 49.22 / 532.35 = 9.25% of the panel width */}
              <div className="bg-cream p-[9.25cqw]">
                <Image
                  src="/images/convener.webp"
                  width={868}
                  height={886}
                  alt="Portrait of Pastor Nnamdy Osuji"
                  sizes="(min-width: 768px) 40vw, 80vw"
                  className="block aspect-[433.9/443] w-full object-cover object-top"
                />
              </div>
            </figure>
          </Reveal>

          <div className="flex flex-col gap-[14px]">
            <Reveal direction="right" mobileUp>
              <h3 className="text-balance text-center font-display text-display font-semibold capitalize text-ink md:text-left">
                Pastor Nnamdy Osuji
              </h3>
            </Reveal>
            <Reveal direction="right" mobileUp delay={100}>
              <p className="max-w-[610px] text-balance text-left font-display text-lead font-normal text-ink">
                Pastor Osuji is the Pastor-in-Charge of RCCG The Harvestfield, he is a
                seasoned Marriage Counsellor and Life Coach. He is passionate about
                teaching the foundational truths about marriages to unmarried adults, and
                newly wedded couples. He birthed the vision of AtWED in September 2016.
                He believes unmarried individuals should not be called &quot;singles&quot;
                but &quot;About to Wed&quot; hence the name &quot;
                <strong className="font-bold">AtWED</strong>&quot;.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
