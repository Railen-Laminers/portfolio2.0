import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const PAGES = {
    projects: {
        label: "Projects",
        content: (
            <div className="space-y-6">
                {[
                    { title: "Void Chronicle", desc: "A serialized manga built entirely in WebGL. Infinite canvas, zero limits.", tag: "Interactive" },
                    { title: "Ink Engine", desc: "Real-time halftone renderer for live video streams. Pure canvas API.", tag: "Experiment" },
                    { title: "Panel Theory", desc: "Research into sequential art pacing — timing, tension, silence.", tag: "Writing" },
                    { title: "Screentone OS", desc: "A desktop environment that looks like it was printed in 1988.", tag: "Concept" },
                ].map((p) => (
                    <div key={p.title} className="border-b border-black/10 pb-5 last:border-0 group">
                        <div className="flex items-baseline justify-between gap-4 mb-1">
                            <h3 className="text-base font-semibold tracking-tight text-black leading-tight">{p.title}</h3>
                            <span className="text-[0.65rem] tracking-widest uppercase text-neutral-500 shrink-0">{p.tag}</span>
                        </div>
                        <p className="text-sm text-neutral-600 leading-relaxed">{p.desc}</p>
                    </div>
                ))}
            </div>
        ),
    },
    contact: {
        label: "Contact",
        content: (
            <div className="space-y-8">
                <p className="text-sm text-neutral-600 leading-relaxed max-w-xs">
                    Open to collaborations, commissions, and strange ideas. Best reached by email — responses within 48 hours.
                </p>
                {[
                    { label: "Email", value: "railen@void.studio", href: "mailto:railen@void.studio" },
                    { label: "Twitter", value: "@railen_draws", href: "#" },
                    { label: "GitHub", value: "github.com/railen", href: "#" },
                ].map((c) => (
                    <div key={c.label} className="flex items-baseline gap-3">
                        <span className="text-[0.65rem] tracking-widest uppercase text-neutral-400 w-14 shrink-0">{c.label}</span>
                        <a
                            href={c.href}
                            className="text-sm text-black font-medium underline underline-offset-2 decoration-black/20 hover:decoration-black transition-all"
                        >
                            {c.value}
                        </a>
                    </div>
                ))}
                <p className="text-[0.65rem] tracking-widest uppercase text-neutral-400 pt-4 border-t border-black/10">
                    Response time · 24–48 hrs
                </p>
            </div>
        ),
    },
    about: {
        label: "About",
        content: (
            <div className="space-y-6 max-w-md">
                <p className="text-sm text-neutral-700 leading-relaxed">
                    Railen is a visual artist and developer working at the intersection of sequential art, generative design, and interactive storytelling.
                </p>
                <div className="space-y-2 text-sm text-neutral-600">
                    <p>✶ Based in Tokyo / Berlin</p>
                    <p>✶ 10+ years in indie comics and creative coding</p>
                    <p>✶ Currently exploring real‑time halftone engines</p>
                </div>
                <div className="pt-4 border-t border-black/10">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">Tools of choice</h4>
                    <div className="flex flex-wrap gap-2">
                        {["React", "Three.js", "Canvas API", "Framer Motion", "p5.js", "Manga Studio"].map(tool => (
                            <span key={tool} className="text-[0.65rem] px-2 py-1 bg-black/5 rounded-full">{tool}</span>
                        ))}
                    </div>
                </div>
            </div>
        ),
    },
    journey: {
        label: "Journey",
        content: (
            <div className="space-y-6">
                <div className="space-y-4">
                    {[
                        { year: "2025", title: "Current · Ink Engine v2", desc: "Building a browser‑based halftone animation suite." },
                        { year: "2024", title: "Void Chronicle launched", desc: "First 3 chapters released as an interactive web manga." },
                        { year: "2023", title: "Residency at CCI Paris", desc: "Research on generative panel layouts." },
                        { year: "2022", title: "Started screentone experiments", desc: "Early prototypes of the Screentone OS concept." },
                    ].map(item => (
                        <div key={item.year} className="flex gap-4">
                            <div className="w-16 text-[0.65rem] font-mono text-neutral-400">{item.year}</div>
                            <div>
                                <h4 className="text-sm font-semibold text-black">{item.title}</h4>
                                <p className="text-xs text-neutral-500">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ),
    },
};

function ExpandingPanel({ page, originRect, targetRect, onClose, onExpanded, collapsing, onCollapsed }) {
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        if (collapsing) setShowContent(false);
    }, [collapsing]);

    const from = collapsing ? targetRect : originRect;
    const to = collapsing ? originRect : targetRect;

    return (
        <motion.div
            layoutId={`btn-${page.label}`}
            className="fixed overflow-hidden bg-white z-50"
            style={{
                border: "2.5px solid #000",
                boxShadow: collapsing ? "none" : "10px 10px 0 rgba(0,0,0,0.08)",
                top: 0,
                left: 0,
            }}
            initial={{
                x: from.x,
                y: from.y,
                width: from.width,
                height: from.height,
            }}
            animate={{
                x: to.x,
                y: to.y,
                width: to.width,
                height: to.height,
                boxShadow: collapsing ? "0px 0px 0 rgba(0,0,0,0)" : "10px 10px 0 rgba(0,0,0,0.08)",
            }}
            transition={{ duration: 0.42, ease: [0.4, 0, 0.2, 1] }}
            onAnimationComplete={() => {
                if (!collapsing) {
                    setShowContent(true);
                    onExpanded();
                } else {
                    onCollapsed?.();
                }
            }}
        >
            {/* Texture & decorative layers */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: "radial-gradient(circle, #000 0.55px, transparent 0.55px)",
                    backgroundSize: "6px 6px",
                    opacity: 0.03,
                }}
            />
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: "repeating-linear-gradient(to bottom, #f5f5f0 0px, #f5f5f0 3px, #fff 3px, #fff 8px)",
                    opacity: 0.5,
                }}
            />
            <div
                className="absolute bottom-0 right-0 pointer-events-none"
                style={{
                    width: 0, height: 0,
                    borderStyle: "solid",
                    borderWidth: "0 0 20px 20px",
                    borderColor: "transparent transparent #000 transparent",
                }}
            />

            <AnimatePresence mode="wait">
                {collapsing ? (
                    <motion.div
                        key="button-label"
                        className="absolute inset-0 flex items-center justify-center bg-white"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                    >
                        <span className="relative z-10 text-xs font-semibold tracking-[0.15em] uppercase">
                            {page.label}
                        </span>
                    </motion.div>
                ) : showContent ? (
                    <motion.div
                        key="content"
                        className="absolute inset-0 flex flex-col p-8 md:p-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.15 } }}
                        transition={{ duration: 0.3, delay: 0.05 }}
                    >
                        <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-black/10">
                            <motion.h2
                                className="text-2xl md:text-3xl font-semibold tracking-tight text-black"
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.28, delay: 0.1 }}
                            >
                                {page.label}
                            </motion.h2>
                            <motion.button
                                onClick={onClose}
                                className="group flex items-center gap-2 text-[0.65rem] tracking-widest uppercase text-neutral-500 hover:text-black transition-colors"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.28, delay: 0.18 }}
                            >
                                <span
                                    className="w-5 h-5 border border-current flex items-center justify-center text-base leading-none group-hover:bg-black group-hover:text-white group-hover:border-black transition-colors"
                                    aria-hidden="true"
                                >
                                    ×
                                </span>
                                Back
                            </motion.button>
                        </div>
                        <motion.div
                            className="flex-1 overflow-y-auto pr-1"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.32, delay: 0.2 }}
                        >
                            {page.content}
                        </motion.div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </motion.div>
    );
}

export default function Nav() {
    const [active, setActive] = useState(null);
    const [phase, setPhase] = useState("idle");

    const btnRefs = useRef({});
    const containerRef = useRef(null);
    const [originRect, setOriginRect] = useState(null);
    const [targetRect, setTargetRect] = useState(null);

    const pageKeys = Object.keys(PAGES); // ['projects','contact','about','journey']

    useEffect(() => {
        if (phase !== "idle") {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [phase]);

    function open(id) {
        const btn = btnRefs.current[id];
        if (!btn) return;

        const btnR = btn.getBoundingClientRect();
        const origin = {
            x: btnR.left,
            y: btnR.top,
            width: btnR.width,
            height: btnR.height,
        };

        const target = {
            x: 0,
            y: 0,
            width: window.innerWidth,
            height: window.innerHeight,
        };

        setOriginRect(origin);
        setTargetRect(target);
        setActive(id);
        setPhase("expanding");
    }

    function close() {
        setPhase("collapsing");
    }

    const handleCollapsed = () => {
        setActive(null);
        setPhase("idle");
    };

    // Constellation positions (percentage relative to parent container)
    const constellationPositions = {
        projects: { left: "20%", top: "35%" },
        about:    { left: "45%", top: "18%" },
        journey:  { left: "72%", top: "40%" },
        contact:  { left: "48%", top: "70%" },
    };

    // Define connections between buttons (using indexes)
    const connections = [
        [0, 1], // projects ↔ about
        [1, 2], // about ↔ journey
        [2, 3], // journey ↔ contact
        [3, 0], // contact ↔ projects (closes the loop)
        [1, 3], // about ↔ contact (diagonal)
    ];

    return (
        <div ref={containerRef} className="relative w-full min-h-[70vh] flex items-center justify-center">
            {/* Constellation lines (SVG) */}
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
                style={{ overflow: "visible" }}
            >
                {connections.map(([fromIdx, toIdx], idx) => {
                    const fromKey = pageKeys[fromIdx];
                    const toKey = pageKeys[toIdx];
                    const fromPos = constellationPositions[fromKey];
                    const toPos = constellationPositions[toKey];
                    if (!fromPos || !toPos) return null;
                    return (
                        <line
                            key={idx}
                            x1={fromPos.left}
                            y1={fromPos.top}
                            x2={toPos.left}
                            y2={toPos.top}
                            stroke="black"
                            strokeWidth="0.8"
                            strokeDasharray="3 3"
                            strokeOpacity="0.25"
                            className="transition-all duration-300"
                        />
                    );
                })}
                {/* Decorative stars at each button anchor */}
                {pageKeys.map((key) => {
                    const pos = constellationPositions[key];
                    if (!pos) return null;
                    return (
                        <circle
                            key={`star-${key}`}
                            cx={pos.left}
                            cy={pos.top}
                            r="2.5"
                            fill="black"
                            fillOpacity="0.2"
                            className="pointer-events-none"
                        />
                    );
                })}
            </svg>

            {/* Buttons container */}
            <motion.div
                className="relative w-full h-full"
                style={{
                    opacity: phase === "idle" ? 1 : 0,
                    pointerEvents: phase === "idle" ? "auto" : "none",
                    minHeight: "500px",
                }}
                initial={false}
                animate={phase === "idle" ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
                transition={{ duration: 0.3, staggerChildren: 0.12 }}
            >
                {pageKeys.map((id, i) => {
                    const pos = constellationPositions[id];
                    return (
                        <motion.div
                            key={id}
                            layoutId={active === id ? `btn-${PAGES[id].label}` : undefined}
                            ref={(el) => (btnRefs.current[id] = el)}
                            onClick={() => open(id)}
                            className={`
                                absolute transform -translate-x-1/2 -translate-y-1/2
                                bg-white text-black font-semibold 
                                tracking-[0.15em] uppercase text-xs px-8 py-3.5
                                cursor-pointer select-none transition-colors duration-150
                                hover:bg-black hover:text-white
                                border-2 border-black
                                whitespace-nowrap
                                z-10
                            `}
                            style={{
                                left: pos?.left || "50%",
                                top: pos?.top || "50%",
                                boxShadow: i === 2 ? "4px 4px 0 rgba(0,0,0,0.12)" : "none", // arbitrary highlight
                            }}
                        >
                            <span
                                className="absolute inset-0 pointer-events-none opacity-[0.04]"
                                style={{
                                    backgroundImage: "radial-gradient(circle, #000 0.6px, transparent 0.6px)",
                                    backgroundSize: "5px 5px",
                                }}
                            />
                            <span className="relative z-10">{PAGES[id].label}</span>
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* Expanding panel */}
            <AnimatePresence>
                {(phase === "expanding" || phase === "open" || phase === "collapsing") && active && originRect && targetRect && (
                    <ExpandingPanel
                        key="panel"
                        page={PAGES[active]}
                        originRect={originRect}
                        targetRect={targetRect}
                        onClose={close}
                        onExpanded={() => setPhase("open")}
                        collapsing={phase === "collapsing"}
                        onCollapsed={handleCollapsed}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}