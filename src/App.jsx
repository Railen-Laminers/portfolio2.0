import { useEffect, useMemo, memo } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import HeroSection from "./components/pages/HeroSection";
import AboutSection from "./components/pages/AboutSection";
import ProjectsSection from "./components/pages/ProjectsSection";
import ContactSection from "./components/pages/ContactSection";
import MiniGamesSection from "./components/pages/MiniGamesSection";
import CertificatesSection from "./components/pages/CertificatesSection";
import FlappyBird from "./components/games/FlappyBird";
import Navigation from "./components/common/Navigation";


// Memoized background component – stays fixed and never re‑renders during navigation
const NotebookBackground = memo(() => {
  const lineStyle = useMemo(
    () => ({
      backgroundImage:
        "repeating-linear-gradient(0deg, transparent, transparent 27px, var(--smudge) 27px, var(--smudge) 28px)",
    }),
    []
  );

  return (
    <>
      {/* Horizontal ruled lines – fixed to viewport */}
      <div
        className="fixed inset-0 pointer-events-none opacity-30 z-0"
        style={lineStyle}
      />
      {/* Vertical margin line – fixed to viewport */}
      <div className="fixed top-0 bottom-0 left-[72px] w-px bg-blush opacity-60 hidden lg:block z-0" />
    </>
  );
});

export default function App() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen bg-bone">
      {/* Notebook background – now completely independent of routing & animations */}
      <NotebookBackground />

      <div className="relative z-10">
        {!isHome && <Navigation />}

        <AnimatePresence mode="wait" custom={location.pathname}>
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={<HeroSection />}
            />
            <Route path="/about" element={<AboutSection />} />
            <Route path="/projects" element={<ProjectsSection />} />
            <Route path="/contact" element={<ContactSection />} />
            <Route path="/minigames" element={<MiniGamesSection />} />
            <Route path="/minigames/flappybird" element={<FlappyBird />} />
            <Route path="/certificates" element={<CertificatesSection />} />
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