import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import VisionMission from "@/components/VisionMission";
import Objectives from "@/components/Objectives";
import MeetingDetails from "@/components/MeetingDetails";
import Convener from "@/components/Convener";
import Gallery from "@/components/Gallery";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <VisionMission />
        <Objectives />
        <MeetingDetails />
        <Convener />
        <Gallery />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
