import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import HeroSection from "./components/pages/HeroSection";
import AboutSection from "./components/pages/AboutSection";
import ProjectsSection from "./components/pages/ProjectsSection";
import JourneySection from "./components/pages/JourneySection";
import ContactSection from "./components/pages/ContactSection";
import Navigation from "./components/common/Navigation";
import { NAV } from "./data/navData";

export default function App() {
  const [page, setPage] = useState("home");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [page]);

  const handleNavigate = (id) => setPage(id);

  const renderPage = () => {
    switch (page) {
      case "about":
        return <AboutSection />;
      case "projects":
        return <ProjectsSection />;
      case "journey":
        return <JourneySection />;
      case "contact":
        return <ContactSection />;
      default:
        return <HeroSection onNavigate={handleNavigate} />;
    }
  };

  return (
    // GLOBAL BACKGROUND WRAPPER
    <div className="relative min-h-screen bg-bone overflow-hidden">
      {/* Global notebook grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 27px, #c4bfb0 27px, #c4bfb0 28px)",
        }}
      />
      {/* Global left margin rule */}
      <div className="absolute top-0 bottom-0 left-[72px] w-px bg-[#e8cdd4] opacity-60 hidden md:block" />

      {/* Foreground content */}
      <div className="relative z-10">
        {page !== "home" && <Navigation active={page} onNavigate={handleNavigate} />}

        <AnimatePresence mode="wait">{renderPage()}</AnimatePresence>

        {page !== "home" && (
          <footer className="border-t border-ash bg-paper px-6 py-5 flex justify-between items-center">
            <span className="font-mono text-[0.55rem] text-smudge tracking-widest">
              ...assets and illustrations to be added.
            </span>
          </footer>
        )}
      </div>
    </div>
  );
}