import { useEffect, useMemo, memo, useRef } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Lenis from "@studio-freight/lenis";

import HeroSection from "./components/pages/HeroSection";
import AboutSection from "./components/pages/AboutSection";
import ProjectsSection from "./components/pages/ProjectsSection";
import ContactSection from "./components/pages/ContactSection";
import MiniGamesSection from "./components/pages/MiniGamesSection";
import CertificatesSection from "./components/pages/CertificatesSection";
import FlappyBird from "./components/games/FlappyBird";
import SlidingPuzzle from "./components/games/SlidingPuzzle";
import Navigation from "./components/common/Navigation";

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
      <div
        className="fixed inset-0 pointer-events-none opacity-30 z-0"
        style={lineStyle}
      />
      <div className="fixed top-0 bottom-0 left-[72px] w-px bg-blush opacity-60 hidden lg:block z-0" />
    </>
  );
});

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const lenisRef = useRef(null);
  const isNavigating = useRef(false);
  const pathnameRef = useRef(location.pathname);

  // Order of the three scroll‑navigable pages
  const scrollPages = ["/about", "/projects", "/contact"];

  // Attempt counters for up/down scrolling at edges
  const scrollAttempts = useRef({ up: 0, down: 0 });
  const lastAttemptTime = useRef({ up: 0, down: 0 });

  // Keep pathname up‑to‑date
  useEffect(() => {
    pathnameRef.current = location.pathname;
  }, [location.pathname]);

  // Reset attempt counters on route change, and keep navigation LOCKED
  // for a short cooldown so leftover wheel events from the same physical
  // gesture (esp. on trackpads) can't immediately trigger a second jump.
  useEffect(() => {
    scrollAttempts.current.up = 0;
    scrollAttempts.current.down = 0;

    const NAV_LOCK_MS = 600; // must be >= your exit + enter animation duration
    const timer = setTimeout(() => {
      isNavigating.current = false;
    }, NAV_LOCK_MS);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Lenis setup — slowed down and smoothed out for a gentler scroll feel
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.05, // lower = smoother/slower catch-up to target scroll position
      duration: 1.8, // higher = slower overall scroll animation
      smoothWheel: true,
      wheelMultiplier: 0.75, // lower = each wheel tick moves less distance
      easing: (t) =>
        t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    });

    lenisRef.current = lenis;

    let rafId;

    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Discrete wheel-event based edge navigation
  useEffect(() => {
    // How close to the true edge (in px) counts as "actually at the boundary".
    // Kept very tight (not a loose zone) so normal scrolling that's merely
    // approaching the edge — while Lenis is still easing toward it — never
    // gets counted as a navigation attempt. Only wheel events that occur
    // once the page truly cannot scroll any further start the counter.
    const BOUNDARY_EPSILON = 1;
    const attemptsNeeded = 5; // distinct wheel "ticks" needed once at the edge
    const ATTEMPT_TIMEOUT = 700; // ms - pause longer than this resets the count

    const handleWheel = (e) => {
      if (isNavigating.current) return;

      const lenis = lenisRef.current;
      if (!lenis) return;

      const currentPath = pathnameRef.current;
      const index = scrollPages.indexOf(currentPath);
      if (index === -1) return;

      const { scroll, limit } = lenis;
      if (limit <= 0) return; // page has no scrollable content

      const isDown = e.deltaY > 0;
      const isUp = e.deltaY < 0;

      // True only once the page is fully stopped at that edge — i.e. there is
      // (practically) zero remaining scrollable distance left in that direction.
      const isAtTopBoundary = scroll <= BOUNDARY_EPSILON;
      const isAtBottomBoundary = limit - scroll <= BOUNDARY_EPSILON;

      const now = performance.now();

      if (isAtTopBoundary && isUp && index > 0) {
        if (now - lastAttemptTime.current.up > ATTEMPT_TIMEOUT) {
          scrollAttempts.current.up = 0;
        }
        lastAttemptTime.current.up = now;
        scrollAttempts.current.up += 1;
        scrollAttempts.current.down = 0; // opposite direction resets

        if (scrollAttempts.current.up >= attemptsNeeded) {
          isNavigating.current = true;
          scrollAttempts.current.up = 0;
          navigate(scrollPages[index - 1]);
        }
      } else if (isAtBottomBoundary && isDown && index < scrollPages.length - 1) {
        if (now - lastAttemptTime.current.down > ATTEMPT_TIMEOUT) {
          scrollAttempts.current.down = 0;
        }
        lastAttemptTime.current.down = now;
        scrollAttempts.current.down += 1;
        scrollAttempts.current.up = 0;

        if (scrollAttempts.current.down >= attemptsNeeded) {
          isNavigating.current = true;
          scrollAttempts.current.down = 0;
          navigate(scrollPages[index + 1]);
        }
      } else {
        // Not sitting at a navigable boundary, or scrolling the "wrong" way
        // (e.g. scrolling up while away from the top) — reset both counters.
        scrollAttempts.current.up = 0;
        scrollAttempts.current.down = 0;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [navigate]);

  return (
    <div className="relative min-h-screen bg-bone">
      <NotebookBackground />
      <div className="relative z-10">
        {!isHome && <Navigation />}
        <AnimatePresence
          mode="wait"
          onExitComplete={() => {
            // Old page is now fully gone (invisible), new page hasn't
            // rendered its animated-in state yet — safe to reset scroll
            // here with zero visible jump.
            lenisRef.current?.scrollTo(0, { immediate: true });
          }}
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HeroSection />} />
            <Route path="/about" element={<AboutSection />} />
            <Route path="/projects" element={<ProjectsSection />} />
            <Route path="/contact" element={<ContactSection />} />
            <Route path="/minigames" element={<MiniGamesSection />} />
            <Route path="/minigames/flappybird" element={<FlappyBird />} />
            <Route path="/minigames/slidingpuzzle" element={<SlidingPuzzle />} />
            <Route path="/certificates" element={<CertificatesSection />} />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
}