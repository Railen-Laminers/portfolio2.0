import { useEffect, useMemo, memo, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Lenis from "@studio-freight/lenis";
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
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 1.2,
      easing: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Smooth scroll to top on route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 0.8 });
    }
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
      </div>
    </div>
  );
}