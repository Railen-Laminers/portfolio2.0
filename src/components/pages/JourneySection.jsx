import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { dreamCut, stagger, fadeUp } from "../../animations/variants";
import { TIMELINE } from "../../data/timelineData";
import SectionLabel from "../common/SectionLabel";
import TapeStrip from "../common/TapeStrip";
import SketchCard from "../common/SketchCard";
import DashedRule from "../common/DashedRule";

export default function JourneySection() {
    const [expanded, setExpanded] = useState(null);

    return (
        <motion.div
            variants={dreamCut}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen pt-14"
        >
            <div className="max-w-6xl mx-auto px-6 py-20">
                <motion.div variants={stagger} initial="hidden" animate="show">
                    <motion.div variants={fadeUp} className="mb-16">
                        <SectionLabel>△ journey</SectionLabel>
                        <h2
                            className="font-display italic text-ink leading-[1.1] mb-3"
                            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
                        >
                            how i got<br />here
                        </h2>
                        <p className="font-serif italic text-[1rem] text-void max-w-md">
                            ...a record of becoming.
                        </p>
                    </motion.div>
                </motion.div>

                <div className="relative">
                    <div className="absolute left-[88px] top-0 bottom-0 w-px border-l border-dashed border-smudge hidden md:block" />

                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-60px" }}
                        className="space-y-12"
                    >
                        {TIMELINE.map((entry, i) => (
                            <motion.div
                                key={i}
                                variants={fadeUp}
                                className="grid grid-cols-1 md:grid-cols-[88px_1fr] gap-0 md:gap-12 group"
                            >
                                <div className="flex md:flex-col items-center md:items-end gap-3 md:gap-1 mb-3 md:mb-0">
                                    <span className="font-mono text-[0.62rem] text-void tracking-widest">{entry.year}</span>
                                    <div
                                        className="w-3 h-3 border border-smudge rotate-45 md:mr-[-6.5px] shrink-0"
                                        style={{ background: entry.accent, opacity: 0.85 }}
                                    />
                                </div>
                                <div className="pl-0 md:pl-2">
                                    <div className="mb-2">
                                        <TapeStrip color={entry.accent}>{entry.tag}</TapeStrip>
                                    </div>
                                    <button
                                        onClick={() => setExpanded(expanded === i ? null : i)}
                                        className="text-left w-full group/btn"
                                    >
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-display italic text-ink text-[1.4rem] leading-snug mb-1 group-hover/btn:opacity-70 transition-opacity">
                                                {entry.title}
                                            </h3>
                                            <div className="shrink-0">
                                                <svg
                                                    className={`w-5 h-5 transition-all duration-300 ease-out text-smudge/60 group-hover/btn:text-smudge/90 ${expanded === i ? 'rotate-180' : ''}`}
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    aria-label={expanded === i ? "Collapse" : "Expand"}
                                                >
                                                    <polyline points="6 9 12 15 18 9"></polyline>
                                                </svg>
                                            </div>
                                        </div>
                                    </button>
                                    <AnimatePresence>
                                        {expanded === i && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto", transition: { duration: 0.45, ease: "easeOut" } }}
                                                exit={{ opacity: 0, height: 0, transition: { duration: 0.3 } }}
                                                className="overflow-hidden"
                                            >
                                                <p className="font-serif text-[0.98rem] text-void leading-[1.82] mt-3 mb-3 max-w-xl">
                                                    {entry.body}
                                                </p>
                                                {entry.note && (
                                                    <p className="font-display italic text-[0.85rem] text-smudge">{entry.note}</p>
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                    {expanded !== i && !entry.note && (
                                        <p className="font-display italic text-[0.75rem] text-smudge/70 tracking-wide">
                                            click to read →
                                        </p>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

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
                            ...the further i go, the more the beginning makes sense.
                        </p>
                    </SketchCard>
                </motion.div>
            </div>
        </motion.div>
    );
}