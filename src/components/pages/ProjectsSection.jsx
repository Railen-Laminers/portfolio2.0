import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { dreamCut, stagger, fadeUp } from "../../animations/variants";
import { PROJECTS, PROJECT_FILTERS } from "../../data/projectsData";
import SectionLabel from "../common/SectionLabel";
import TapeStrip from "../common/TapeStrip";
import Crosshatch from "../common/Crosshatch";
import SketchCard from "../common/SketchCard";

export default function ProjectsSection() {
    const [filter, setFilter] = useState("ALL");
    const filtered = filter === "ALL" ? PROJECTS : PROJECTS.filter((p) => p.tag === filter);

    return (
        <motion.div
            variants={dreamCut}
            initial="initial"
            animate="animate"
            exit="exit"
            // Removed bg-bone
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
                        <p className="font-serif text-[1rem] text-fog italic mb-10 max-w-md">
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
                                        : "bg-transparent text-fog border-smudge hover:border-fog hover:text-void",
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
                                <SketchCard rotate={project.rotate} accent={project.accent}>
                                    <Crosshatch className="w-full aspect-[4/3] mb-5" label="[ image ]" />
                                    <TapeStrip color={project.accent}>{project.tag}</TapeStrip>
                                    <h3 className="font-serif text-[1.1rem] text-ink mt-3 mb-1 leading-snug">
                                        {project.title}
                                    </h3>
                                    <p className="font-mono text-[0.58rem] text-fog tracking-wider mb-3">
                                        {project.year}
                                    </p>
                                    <p className="font-serif italic text-[0.88rem] text-fog leading-relaxed">
                                        {project.desc}
                                    </p>
                                    <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="font-mono text-[0.58rem] text-smudge tracking-widest">view →</span>
                                    </div>
                                </SketchCard>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </motion.div>
    );
}