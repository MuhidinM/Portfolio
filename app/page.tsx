import AboutSection from "@/components/about-section";
import AchievementsSection from "@/components/achievement-section";
import EmailSection from "@/components/contact-me";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section";
import Navbar from "@/components/navbar";
import ProjectsSection from "@/components/project-section";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
      <Navbar />
      <div className="container mt-24 mx-auto px-4 md:px-12 py-4">
        <div id="home">
          <HeroSection />
        </div>
        <div id="about">
          <AboutSection />
        </div>
        <div id="projects">
          <ProjectsSection />
        </div>
        <div id="contact">
          <EmailSection />
        </div>
      </div>
      <Footer />
    </main>
  );
}
