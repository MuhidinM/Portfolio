import { Suspense } from "react";
import AboutSection from "@/components/about-section";
import AchievementsSection from "@/components/achievement-section";
import EmailSection from "@/components/contact-me";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section";
import Navbar from "@/components/navbar";
import ProjectsSection from "@/components/project-section";
import { ProjectsSectionFallback } from "@/components/projects-section-fallback";
import { ScrollMarqueeBand } from "@/components/scroll-marquee-band";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="page-root" className="relative flex min-h-screen flex-col">
        <div className="relative z-10 container mx-auto mt-28 px-4 py-4 md:px-12">
          <div id="home">
            <HeroSection />
          </div>
          <AchievementsSection />
          <AboutSection />
        </div>
        <ScrollMarqueeBand />
        <div className="relative z-10 container mx-auto px-4 py-4 md:px-12">
          <Suspense fallback={<ProjectsSectionFallback />}>
            <ProjectsSection />
          </Suspense>
          <EmailSection />
        </div>
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </>
  );
}
