import Image from "next/image";
import ParallaxBackground from "@/components/ParallaxBackground";
import Reveal from "@/components/Reveal";

/*
 * The open book is one image from Figma (node 17:390, trimmed to its visible pixels,
 * 1323 x 943) with the copy baked into it. The same copy is kept below as real text,
 * visually hidden, for screen readers and search engines.
 */
export default function VisionMission() {
  return (
    <section
      id="vision-mission"
      aria-labelledby="vision-heading mission-heading"
      className="scroll-mt-(--nav-h) bg-white py-(--vm-band)"
    >
      <div className="relative isolate overflow-hidden">
        <ParallaxBackground src="/images/vm-photo.webp" width={2400} height={1493} />

        <div className="relative px-(--gutter) py-(--vm-inner)">
          <Reveal>
            <div className="relative mx-auto w-full max-w-[34rem] md:w-[min(92vw,max(55.8vw,40rem),68.75rem)] md:max-w-none">
              <Image
                src="/images/vm-book-open.webp"
                width={1323}
                height={943}
                alt=""
                sizes="(min-width: 768px) 70vw, 100vw"
                className="pointer-events-none h-auto w-full"
              />

              <article className="sr-only">
                <h2 id="vision-heading">Vision Statement</h2>
                <p>
                  To Raise A Generation Of Well-Prepared Yet To Be Married People,
                  Successful Married Couples, And Thriving Families By Promoting Sound
                  Relationship Principles And Biblical Values That Foster Lasting
                  Marriages And A Better Society.
                </p>
              </article>

              <article className="sr-only">
                <h2 id="mission-heading">Our Mission</h2>
                <p>
                  To Educate, Equip, Counsel, And Prepare Individuals For Successful
                  Marriage Through Relationship Education, Practical Counselling,
                  Mentorship, And The Application Of Biblical Principles, And Helping
                  Couples Build Healthy, Loving, Peaceful, And Enduring Marriages.
                </p>
              </article>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
