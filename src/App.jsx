// src/App.jsx
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
    <div className="font-mono bg-bone min-h-screen">
      {page !== "home" && <Navigation active={page} onNavigate={handleNavigate} />}

      <AnimatePresence mode="wait">{renderPage()}</AnimatePresence>

      {page !== "home" && (
        <footer className="border-t border-ash bg-paper px-6 py-5 flex justify-between items-center">
          <button
            onClick={() => setPage("home")}
            className="font-display italic text-smudge text-[0.85rem] hover:text-void transition-colors"
          >
            ◈ you
          </button>
          <span className="font-mono text-[0.55rem] text-smudge tracking-widest">
            ...assets and illustrations to be added.
          </span>
          <span className="font-mono text-[0.55rem] text-smudge tracking-widest hidden md:block">
            {String(NAV.findIndex((n) => n.id === page) + 1).padStart(2, "0")} / 04
          </span>
        </footer>
      )}
    </div>
  );
}