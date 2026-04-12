import AboutSection from "@/components/about-section";
import AchievementsSection from "@/components/achievement-section";
import EmailSection from "@/components/contact-me";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section";
import Navbar from "@/components/navbar";
import ProjectsSection from "@/components/project-section";
import { ScrollMarqueeBand } from "@/components/scroll-marquee-band";

export default function Home() {
  return (
    <main
      id="page-root"
      className="relative flex min-h-screen flex-col overflow-x-hidden"
    >
      <Navbar />
      <div className="relative z-10 container mt-24 mx-auto px-4 md:px-12 py-4">
        <div id="home">
          <HeroSection />
        </div>
        <div id="about">
          <AboutSection />
        </div>
        <AchievementsSection />
        <ScrollMarqueeBand />
        <div id="projects">
          <ProjectsSection />
        </div>
        <div id="contact">
          <EmailSection />
        </div>
      </div>
      <div className="relative z-10">
        <Footer />
      </div>
    </main>
  );
}
