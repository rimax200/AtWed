import Image from "next/image";
import Reveal from "@/components/Reveal";
import ParallaxBackground from "@/components/ParallaxBackground";
import FooterHands from "@/components/FooterHands";
import { FacebookIcon, InstagramIcon } from "@/components/SocialIcons";

// TODO: the client must supply the real social media URLs. '#' links stay in the page and open nothing.
export const SOCIAL_LINKS = {
  instagram: "#",
  facebook: "#",
  youtube: "#",
};

/** Background parallax speed (fraction of scroll speed). The hands do not take part in it. */
const BG_PARALLAX_SPEED = 0.2;
const BG_PARALLAX_SPEED_MOBILE = 0.15;

const socialLink =
  "social-link grid h-9 place-items-center text-white";

function externalProps(url: string) {
  return url === "#" ? {} : { target: "_blank", rel: "noopener noreferrer" };
}

export default function Footer() {
  return (
    // Figma: 180px of page background above the photo (180 / 1511 of the width).
    // Clip only sideways: the woman's hand reaches up out of the photo into that band.
    <footer className="relative overflow-x-clip bg-white pt-[11.913%]">
      <div className="relative md:aspect-[1511/1115]">
        {/* Background photo + Figma overlay. The photo parallaxes inside this clip. */}
        <div className="absolute inset-0 overflow-hidden">
          <ParallaxBackground
            src="/images/footer/footer-bg.webp"
            width={1440}
            height={1253}
            speedDesktop={BG_PARALLAX_SPEED}
            speedMobile={BG_PARALLAX_SPEED_MOBILE}
          />
          <div className="footer-overlay absolute inset-0" />
        </div>

        <FooterHands />

        {/* Mobile: leave room for the hands (scaled by width), then the content flows underneath */}
        <div className="aspect-[1511/650] md:hidden" aria-hidden="true" />

        <div className="relative z-20 flex flex-col items-center px-(--gutter) pt-6 pb-8 text-center md:absolute md:inset-x-0 md:bottom-[3.4%] md:p-0">
          <Reveal rootMargin="0px">
            <Image
              src="/images/footer/logo-footer.webp"
              width={1000}
              height={401}
              alt="AtWED - About To Wed"
              loading="lazy"
              className="h-auto w-[clamp(13rem,22.1vw,20.9rem)]"
            />
          </Reveal>

          <Reveal delay={100} rootMargin="0px" className="mt-5 max-w-full md:mt-[1.59vw]">
            <p className="mx-auto max-w-[1201px] px-4 font-accent text-[clamp(0.9375rem,1.787vw,1.6875rem)] leading-[1.5] text-white uppercase md:leading-[1.78]">
              Preparing The Unmarried. Strengthening Marriages. Building Families.
            </p>
          </Reveal>

          <Reveal
            delay={200}
            rootMargin="0px"
            className="mt-4 flex max-w-full flex-wrap items-center justify-center gap-x-[10px] md:mt-[1.85vw]"
          >
            <p className="px-[18px] font-body text-label font-medium text-gold-light">
              Grounded in Biblical Principles. Open to All.
            </p>
            <nav aria-label="Social media">
              <ul className="flex items-center">
                <li>
                  <a
                    href={SOCIAL_LINKS.instagram}
                    aria-label="AtWED on Instagram"
                    className={`${socialLink} w-9`}
                    {...externalProps(SOCIAL_LINKS.instagram)}
                  >
                    <InstagramIcon />
                  </a>
                </li>
                <li>
                  <a
                    href={SOCIAL_LINKS.facebook}
                    aria-label="AtWED on Facebook"
                    className={`${socialLink} w-9`}
                    {...externalProps(SOCIAL_LINKS.facebook)}
                  >
                    <FacebookIcon />
                  </a>
                </li>
                <li>
                  <a
                    href={SOCIAL_LINKS.youtube}
                    aria-label="AtWED on YouTube"
                    className={`${socialLink} px-1.5`}
                    {...externalProps(SOCIAL_LINKS.youtube)}
                  >
                    <Image
                      src="/images/footer/youtube.svg"
                      width={104}
                      height={24}
                      alt=""
                      className="block h-[23.535px] w-[104.025px] max-w-none"
                    />
                  </a>
                </li>
              </ul>
            </nav>
          </Reveal>
        </div>
      </div>
    </footer>
  );
}
