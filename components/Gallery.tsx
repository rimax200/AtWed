import Image from "next/image";
import Section from "@/components/Section";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import GalleryCarousel from "@/components/GalleryCarousel";

export default function Gallery() {
  return (
    <Section id="gallery" labelledBy="gallery-heading">
      <Container className="flex flex-col items-center gap-[clamp(1.5rem,2.65vw,2.5rem)]">
        <header className="flex flex-col items-center gap-[15px] text-center">
          <Reveal>
            <p className="font-display text-eyebrow uppercase text-taupe">Photo Gallery</p>
          </Reveal>
          <Reveal delay={80}>
            <h2
              id="gallery-heading"
              className="max-w-[852px] font-display text-display font-semibold capitalize text-ink"
            >
              Moments From AtWED
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
      </Container>
      <div className="mt-[clamp(1.5rem,2.65vw,2.5rem)]">
        <Reveal delay={240}>
          <GalleryCarousel />
        </Reveal>
      </div>
    </Section>
  );
}
