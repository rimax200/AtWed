import Image from "next/image";
import Section from "@/components/Section";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import ObjectivesTimeline from "@/components/ObjectivesTimeline";

// Objectives 5 and 7 use the same illustration in the Figma design
const objectives = [
  {
    number: 1,
    text: "Prepare unmarried individuals for the realities and responsibilities of marriage.",
    image: "/images/objectives/card-1.webp",
    imageAlt: "Watercolour illustration of a bride and groom holding a bouquet",
  },
  {
    number: 2,
    text: "Provide relationship education and premarital counselling.",
    image: "/images/objectives/card-2.webp",
    imageAlt: "Watercolour illustration of two gold wedding rings among flowers",
  },
  {
    number: 3,
    text: "Teach practical principles of partner selection, compatibility, communication, and conflict resolution.",
    image: "/images/objectives/card-3.webp",
    imageAlt: "Watercolour illustration of a champagne bottle and two glasses",
  },
  {
    number: 4,
    text: "Support married couples in addressing marital challenges and strengthening their relationships.",
    image: "/images/objectives/card-4.webp",
    imageAlt: "Watercolour illustration of a wedding dinner table with a flower centrepiece",
  },
  {
    number: 5,
    text: "Promote biblical values as a foundation for building successful and enduring marriages.",
    image: "/images/objectives/card-5.webp",
    imageAlt: "Watercolour illustration of a couple embracing",
  },
  {
    number: 6,
    text: "Encourage mutual respect and understanding among people from different faith backgrounds.",
    image: "/images/objectives/card-6.webp",
    imageAlt: "Watercolour illustration of a newlywed couple in a decorated vintage car",
  },
  {
    number: 7,
    text: "Equip relationship mentors and counsellors to guide singles and couples responsibly.",
    image: "/images/objectives/card-5.webp",
    imageAlt: "Watercolour illustration of a couple embracing",
  },
  {
    number: 8,
    text: "Contribute to stronger families and a healthier society through marriage education.",
    image: "/images/objectives/card-8.webp",
    imageAlt: "Watercolour illustration of a mother, father and two children",
  },
];

export default function Objectives() {
  return (
    <Section id="objectives" labelledBy="objectives-heading">
      <Container className="flex flex-col items-center gap-[clamp(2.5rem,5.3vw,5rem)]">
        <Reveal className="flex flex-col items-center gap-[15px] text-center">
          <p className="font-display text-eyebrow uppercase text-taupe">
            Strategic Objectives
          </p>
          <h2
            id="objectives-heading"
            className="max-w-[852px] font-display text-display font-semibold capitalize text-ink"
          >
            What AtWED Seeks To Do
          </h2>
          <Image
            src="/images/divider.webp"
            width={200}
            height={23}
            alt=""
            className="h-auto w-[clamp(8.75rem,13.2vw,12.5rem)]"
          />
        </Reveal>

        <div className="w-full max-w-[68rem]">
          <ObjectivesTimeline>
            <ol role="list" className="flex flex-col gap-10 md:gap-6">
              {objectives.map(({ number, text, image, imageAlt }) => {
                const cardLeft = number % 2 === 1; // odd rows: card on the left (desktop)
                return (
                  <li
                    key={number}
                    className="grid grid-cols-[2rem_1fr] gap-x-4 gap-y-5 md:grid-cols-[1fr_2rem_1fr] md:items-center md:gap-x-[clamp(1rem,3.2vw,3rem)]"
                  >
                    <Reveal
                      mobileUp
                      direction={cardLeft ? "left" : "right"}
                      className={`col-start-2 row-start-1 md:row-start-1 ${
                        cardLeft
                          ? "md:col-start-1 md:justify-self-end"
                          : "md:col-start-3 md:justify-self-start"
                      }`}
                    >
                      <div className="aspect-[244/300] w-[min(75%,15.25rem)] md:w-[clamp(12rem,8vw+8rem,15.25rem)]">
                        <Image
                          src={image}
                          width={488}
                          height={600}
                          alt={imageAlt}
                          sizes="244px"
                          className="size-full object-contain"
                        />
                      </div>
                    </Reveal>

                    <Reveal
                      mobileUp
                      delay={120}
                      direction={cardLeft ? "right" : "left"}
                      className={`col-start-2 row-start-2 md:row-start-1 ${
                        cardLeft
                          ? "md:col-start-3 md:justify-self-start"
                          : "md:col-start-1 md:justify-self-end md:text-right"
                      }`}
                    >
                      <Image
                        src={`/images/objectives/seal-${number}.webp`}
                        width={170}
                        height={168}
                        alt=""
                        className={`mb-6 h-auto w-[85px] ${cardLeft ? "" : "md:ml-auto"}`}
                      />
                      <p className="max-w-[17rem] font-body text-card font-medium tracking-[-0.0167em] text-ink-strong">
                        <span className="sr-only">Objective {number}: </span>
                        {text}
                      </p>
                    </Reveal>

                    <span
                      aria-hidden="true"
                      data-star
                      data-active={number === 1 ? "true" : "false"}
                      className="star relative col-start-1 row-span-2 row-start-1 self-start justify-self-center md:col-start-2 md:row-span-1"
                    >
                      <Image
                        src="/images/objectives/star.webp"
                        width={32}
                        height={38}
                        alt=""
                        className="block h-auto w-8"
                      />
                    </span>
                  </li>
                );
              })}
            </ol>
          </ObjectivesTimeline>
        </div>
      </Container>
    </Section>
  );
}
