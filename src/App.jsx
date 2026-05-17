import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import HeroSection from "./components/pages/HeroSection";
import AboutSection from "./components/pages/AboutSection";
import ProjectsSection from "./components/pages/ProjectsSection";
import JourneySection from "./components/pages/JourneySection";
import ContactSection from "./components/pages/ContactSection";
import MiniGamesSection from "./components/pages/MiniGamesSection";
import FlappyBird from "./components/games/FlappyBird";
import Navigation from "./components/common/Navigation";

export default function App() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen bg-bone overflow-hidden">
      {/* Global notebook grid lines – use CSS variable for colour */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 27px, var(--smudge) 27px, var(--smudge) 28px)",
        }}
      />
      {/* Global left margin rule – use CSS variable */}
      <div className="absolute top-0 bottom-0 left-[72px] w-px bg-blush opacity-60 hidden md:block" />

      {/* Foreground content */}
      <div className="relative z-10">
        {!isHome && <Navigation />}

        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HeroSection />} />
            <Route path="/about" element={<AboutSection />} />
            <Route path="/projects" element={<ProjectsSection />} />
            <Route path="/journey" element={<JourneySection />} />
            <Route path="/contact" element={<ContactSection />} />
            <Route path="/minigames" element={<MiniGamesSection />} />
            <Route path="/minigames/flappybird" element={<FlappyBird />} />
          </Routes>
        </AnimatePresence>

        {!isHome && (
          <footer className="border-t border-ash bg-paper px-6 py-5 flex justify-between items-center">
            <span className="font-mono text-[0.55rem] text-smudge tracking-widest">
              ...
            </span>
          </footer>
        )}
      </div>
    </div>
  );
}