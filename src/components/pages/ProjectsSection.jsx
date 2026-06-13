// src/components/pages/ProjectsSection.jsx
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { dreamCut, stagger, fadeUp } from "../../animations/variants";
import { PROJECTS, PROJECT_FILTERS } from "../../data/projectsData";
import SectionLabel from "../common/SectionLabel";
import TapeStrip from "../common/TapeStrip";
import Crosshatch from "../common/Crosshatch";
import SketchCard from "../common/SketchCard";
import DashedRule from "../common/DashedRule";

// ---------- Helper: detect if device supports hover (mouse) ----------
function useHoverCapable() {
  const [isHoverCapable, setIsHoverCapable] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const handleChange = (e) => setIsHoverCapable(e.matches);
    setIsHoverCapable(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);
  return isHoverCapable;
}

// ---------- Modal for mobile (matches tooltip layout, no image) ----------
function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleEscape = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "unset"; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-[280px] w-full" // Matches tooltip width
      >
        <SketchCard rotate={0} accent={project.accent} className="p-0">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-paper border border-smudge hover:bg-fog transition-colors font-mono text-sm"
            aria-label="Close"
          >
            ✕
          </button>
          <div className="p-4">
            {/* Exact same layout and fonts as the desktop tooltip */}
            <div className="inline-block">
              <TapeStrip color={project.accent} className="font-mono text-[0.55rem] tracking-wider">{project.tag}</TapeStrip>
            </div>
            <h4 className="font-sans text-sm font-semibold text-ink mt-1 tracking-tight">{project.title}</h4>
            <p className="font-mono text-[0.55rem] text-void/60 mt-0.5">{project.year}</p>
            <p className="font-sans text-[0.7rem] text-void/80 mt-2 leading-relaxed whitespace-normal mb-4">{project.desc}</p>
            
            {/* Kept the link button so users can still view the project on mobile */}
            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[0.62rem] tracking-[0.12em] text-void border border-smudge px-5 py-2.5 hover:bg-ink hover:text-bone hover:border-ink transition-all duration-300 rounded-[1px] inline-block"
              >
                view project ↗
              </a>
            ) : (
              <span className="font-mono text-[0.62rem] tracking-[0.12em] text-void/40 border border-smudge/40 px-5 py-2.5 rounded-[1px] inline-block cursor-default">
                view only
              </span>
            )}
          </div>
        </SketchCard>
      </motion.div>
    </motion.div>
  );
}

// ---------- Desktop card with hover tooltip (solid bg, no scaling) ----------
function DesktopCard({ project }) {
  const [imgError, setImgError] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [adjustedPos, setAdjustedPos] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const tooltipRef = useRef(null);
  const showTimeout = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!tooltipVisible) return;
    
    const updatePosition = () => {
      if (!tooltipRef.current) return;
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      let { x, y } = mousePos;
      const offsetX = 16;
      const offsetY = 16;
      
      if (x + offsetX + tooltipRect.width > viewportWidth - 8) {
        x = x - tooltipRect.width - offsetX;
      } else {
        x = x + offsetX;
      }
      
      if (y + offsetY + tooltipRect.height > viewportHeight - 8) {
        y = viewportHeight - tooltipRect.height - 8;
      } else {
        y = y + offsetY;
      }
      
      setAdjustedPos({ x, y });
    };

    const raf = requestAnimationFrame(updatePosition);
    return () => cancelAnimationFrame(raf);
  }, [mousePos, tooltipVisible]);

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };
  
  const handleMouseEnter = () => { 
    showTimeout.current = setTimeout(() => setTooltipVisible(true), 150); 
  };
  
  const handleMouseLeave = () => { 
    if (showTimeout.current) clearTimeout(showTimeout.current); 
    setTooltipVisible(false); 
  };
  
  const handleClick = () => { 
    if (project.link) window.open(project.link, "_blank", "noopener noreferrer"); 
  };
  
  const handleKeyDown = (e) => { 
    if (e.key === "Enter" || e.key === " ") { 
      e.preventDefault(); 
      handleClick(); 
    } 
  };

  return (
    <div
      className="relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-fog rounded-[2px]"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      role="button"
      tabIndex={0}
    >
      <SketchCard rotate={project.rotate} accent={project.accent}>
        {!imgError && project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full aspect-[4/3] object-cover rounded-[2px] border border-smudge"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <Crosshatch className="w-full aspect-[4/3]" label="[ image missing ]" />
        )}
      </SketchCard>
      
      {mounted && createPortal(
        <AnimatePresence>
          {tooltipVisible && (
            <motion.div
              ref={tooltipRef}
              initial={{ opacity: 0, scale: 0.92, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -2 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              style={{ position: "fixed", left: adjustedPos.x, top: adjustedPos.y, zIndex: 100, pointerEvents: "none" }}
              className="bg-paper border border-smudge shadow-xl rounded-md p-3 max-w-[280px]"
            >
              <div className="inline-block">
                <TapeStrip color={project.accent} className="font-mono text-[0.55rem] tracking-wider">{project.tag}</TapeStrip>
              </div>
              <h4 className="font-sans text-sm font-semibold text-ink mt-1 tracking-tight">{project.title}</h4>
              <p className="font-mono text-[0.55rem] text-void/60 mt-0.5">{project.year}</p>
              <p className="font-sans text-[0.7rem] text-void/80 mt-2 leading-relaxed whitespace-normal">{project.desc}</p>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}

// ---------- Mobile card (opens modal) ----------
function MobileCard({ project, onClick }) {
  const [imgError, setImgError] = useState(false);
  return (
    <div
      className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-fog rounded-[2px]"
      onClick={() => onClick(project)}
    >
      <SketchCard rotate={project.rotate} accent={project.accent}>
        {!imgError && project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full aspect-[4/3] object-cover rounded-[2px] border border-smudge"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <Crosshatch className="w-full aspect-[4/3]" label="[ image missing ]" />
        )}
      </SketchCard>
    </div>
  );
}

// ---------- Main Projects Section ----------
export default function ProjectsSection() {
  const [filter, setFilter] = useState("ALL");
  const [selectedProject, setSelectedProject] = useState(null);
  const isHoverCapable = useHoverCapable();
  const filtered = filter === "ALL" ? PROJECTS : PROJECTS.filter((p) => p.tag === filter);

  return (
    <>
      <motion.div
        variants={dreamCut}
        initial="initial"
        animate="animate"
        exit="exit"
        className="min-h-screen pt-14"
      >
        <div className="max-w-6xl mx-auto px-6 py-20">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.div variants={fadeUp}>
              <SectionLabel>□ projects</SectionLabel>
              <h2
                className="font-display italic text-ink leading-[1.1] mb-3"
                style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
              >
                things<br />made
              </h2>
              <p className="font-serif italic text-[0.9rem] text-void mb-4 leading-relaxed">
                ...a collection of works. Some finished, some ongoing, some just begun.
              </p>
            </motion.div>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-12">
              {PROJECT_FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={[
                    "font-mono text-[0.6rem] tracking-widest px-4 py-2 border transition-all duration-200 rounded-[1px]",
                    filter === f
                      ? "bg-ink text-bone border-ink"
                      : "bg-transparent text-void border-smudge hover:border-fog hover:text-void",
                  ].join(" ")}
                >
                  {f}
                </button>
              ))}
            </motion.div>
          </motion.div>
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.5 } }}
                  exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.25 } }}
                >
                  {isHoverCapable ? (
                    <DesktopCard project={project} />
                  ) : (
                    <MobileCard project={project} onClick={setSelectedProject} />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          <DashedRule />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, transition: { duration: 0.6 } }}
            viewport={{ once: true }}
            className="flex justify-end mt-12"
          >
            <SketchCard rotate={-0.6} accent="#e8d4c8">
              <p className="font-mono text-[0.58rem] text-void tracking-widest mb-2">STICKY NOTE /</p>
              <p className="font-serif italic text-void text-[1.05rem] mb-4 max-w-sm mx-auto leading-relaxed">
                ...each project began as a scribble on a sticky note. some stayed, some evolved.
              </p>
            </SketchCard>
          </motion.div>
        </div>
      </motion.div>
      <AnimatePresence>
        {!isHoverCapable && selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </>
  );
}