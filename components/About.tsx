import Image from "next/image";
import Section from "@/components/Section";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

export default function About() {
  return (
    <Section id="about">
      <Container className="flex flex-col items-center gap-[clamp(1.5rem,2.65vw,2.5rem)] text-center">
        <Reveal className="flex flex-col items-center gap-[15px]">
          <p className="font-display text-eyebrow uppercase text-taupe">About AtWED</p>
          <h2 className="max-w-[852px] font-display text-display font-semibold capitalize text-ink">
            About to Wed
          </h2>
          <Image
            src="/images/divider.webp"
            width={200}
            height={23}
            alt=""
            className="h-auto w-[clamp(8.75rem,13.2vw,12.5rem)]"
          />
        </Reveal>
        <Reveal delay={100}>
          <p className="mx-auto max-w-[1052px] text-balance font-display text-statement font-medium text-ink">
            AtWED is a Relationship and Marriage Counselling Platform committed to
            preparing individuals for successful marriage and empowering couples to
            build healthy, fulfilling, and enduring marital relationships.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
