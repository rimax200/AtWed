import Image from "next/image";
import Section from "@/components/Section";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import FaqAccordion from "@/components/FaqAccordion";

const FAQS = [
  {
    question: "Where and when does the program hold?",
    answer: "AtWED holds every last Sunday of the month at ParkInn By Radisson Hotel, from 2PM to 4PM.",
  },
  {
    question: "Can I attend online?",
    // TODO: placeholder copy. The client must confirm this answer before launch.
    answer: "Details about online attendance will be announced soon. Please check back for updates.",
  },
  {
    question: "Who is AtWED for?",
    answer:
      "AtWED is for unmarried individuals preparing for marriage, as well as married couples who want to build healthy, fulfilling and enduring marriages. It also equips relationship mentors and counsellors to guide singles and couples responsibly.",
  },
  {
    question: "I am not a Christian. Can I still join?",
    answer:
      "Yes. AtWED is open to people of all faiths. The platform is founded on biblical principles, which serve as its guiding framework for promoting love, mutual respect, commitment, forgiveness, understanding and lasting marital success, and it encourages mutual respect and understanding among people from different faith backgrounds.",
  },
  {
    question: "We are not engaged yet. Is it too early to start?",
    answer:
      "Not at all. AtWED exists to prepare the unmarried, so you can start learning the principles and responsibilities of marriage, including partner selection, compatibility, communication and conflict resolution, long before you are engaged.",
  },
  {
    question: "Is AtWED only about the wedding?",
    answer:
      "No. AtWED seeks to bridge the gap between preparing for a wedding and preparing for marriage. It provides relationship education, premarital counselling, mentorship and practical guidance, and it also supports married couples in strengthening their relationships.",
  },
];

export default function Faq() {
  return (
    <Section id="faq" labelledBy="faq-heading">
      <Container className="flex flex-col items-center gap-[clamp(2rem,4.23vw,4rem)]">
        <header className="flex flex-col items-center gap-[15px] text-center">
          <Reveal>
            <p className="font-display text-eyebrow uppercase text-taupe">FAQ</p>
          </Reveal>
          <Reveal delay={80}>
            <h2
              id="faq-heading"
              className="max-w-[852px] font-display text-display font-semibold capitalize text-ink"
            >
              Frequently Asked Questions
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
        <FaqAccordion items={FAQS} />
      </Container>
    </Section>
  );
}
