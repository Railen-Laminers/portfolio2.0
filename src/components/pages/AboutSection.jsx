import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaGithub, FaFacebook, FaFileAlt } from "react-icons/fa";

import { dreamCut, stagger, fadeUp } from "../../animations/variants";
import SectionLabel from "../common/SectionLabel";
import TapeStrip from "../common/TapeStrip";
import Crosshatch from "../common/Crosshatch";
import SketchCard from "../common/SketchCard";
import DashedRule from "../common/DashedRule";
import profileImg from "/profile.jpg";

export default function AboutSection() {
    const [imgError, setImgError] = useState(false);
    const navigate = useNavigate();

    return (
        <motion.div
            variants={dreamCut}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen pt-14"
        >
            <div className="max-w-6xl mx-auto px-6 py-20">
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-[1fr_380px] gap-16 items-start"
                >
                    {/* left column */}
                    <div>
                        <motion.div variants={fadeUp}>
                            <SectionLabel>○ about</SectionLabel>
                            <h1
                                className="font-display italic text-ink leading-[1.1] mb-8"
                                style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}
                            >
                                railen
                            </h1>
                        </motion.div>

                        <motion.p variants={fadeUp} className="font-serif text-[1.05rem] text-void leading-[1.85] mb-6">
                            I approach every project with consistency, attention to detail, and a commitment to continuous improvement — showing up, refining the work, and solving problems as they arise. Building has taught me that meaningful results come not from flashiness, but from reliability, discipline, and the willingness to improve day after day.
                        </motion.p>

                        <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-10">
                            {["DEVELOPER", "SOMETHING ELSE"].map((tag, i) => {
                                const colors = ["#d4c9e8", "#c8d9c4", "#e8cdd4"];
                                return (
                                    <TapeStrip key={i} color={colors[i]}>
                                        {tag}
                                    </TapeStrip>
                                );
                            })}
                        </motion.div>

                        <motion.div variants={fadeUp} className="border-l-2 border-smudge pl-5">
                            <p className="font-mono text-[0.6rem] text-void tracking-widest mb-1">
                                CURRENTLY LOCATED IN
                            </p>
                            <p className="font-serif italic text-void text-[1rem]">
                                Laguna
                            </p>
                        </motion.div>

                        {/* icon-only links with tooltips */}
                        <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mt-8">
                            <button
                                onClick={() => navigate("/certificates")}
                                className="flex items-center justify-center font-mono text-[0.9rem] text-void border border-smudge px-4 py-2 hover:bg-ink hover:text-bone hover:border-ink transition-all duration-300 rounded-[1px]"
                                title="View Certificates"
                                aria-label="Certificates"
                            >
                                <FaFileAlt />
                            </button>
                            <a
                                href="https://github.com/Railen-Laminers"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center font-mono text-[0.9rem] text-void border border-smudge px-4 py-2 hover:bg-ink hover:text-bone hover:border-ink transition-all duration-300 rounded-[1px]"
                                title="GitHub Profile"
                                aria-label="GitHub"
                            >
                                <FaGithub />
                            </a>
                            <a
                                href="https://facebook.com/railen"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center font-mono text-[0.9rem] text-void border border-smudge px-4 py-2 hover:bg-ink hover:text-bone hover:border-ink transition-all duration-300 rounded-[1px]"
                                title="Facebook Profile"
                                aria-label="Facebook"
                            >
                                <FaFacebook />
                            </a>
                        </motion.div>
                    </div>

                    {/* right column – profile image + sticky note */}
                    <motion.div variants={fadeUp} className="flex flex-col gap-5 items-center md:items-stretch">
                        <div className="relative max-w-[260px] mx-auto md:max-w-none w-full md:w-auto">
                            {!imgError ? (
                                <img
                                    src={profileImg}
                                    alt="Portrait of Railen"
                                    className="w-full aspect-[3/4] object-cover border border-smudge grayscale"
                                    onError={() => setImgError(true)}
                                    loading="lazy"
                                />
                            ) : (
                                <Crosshatch
                                    className="w-full aspect-[3/4] border border-smudge"
                                    label="[ portrait unavailable ]"
                                />
                            )}

                            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-3 bg-[#d4c9e8] opacity-70 rotate-[-1deg]" />
                            <div className="absolute -bottom-2 right-4 w-10 h-3 bg-[#e8cdd4] opacity-60 rotate-[1.5deg]" />
                        </div>

                        {/* sticky note */}
                        <SketchCard rotate={-0.6} accent="#e8d4c8" className="mt-2">
                            <p className="font-mono text-[0.58rem] text-void tracking-widest mb-2">
                                STICKY NOTE /
                            </p>
                            <p className="font-serif italic text-void text-[1.05rem] mb-4 max-w-sm mx-auto leading-relaxed">
                                ...Start small. Improve every version.
                            </p>
                        </SketchCard>
                    </motion.div>
                </motion.div>

                <DashedRule />

                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6"
                >
                    {[
                        { label: "LANGUAGES", items: ["Html", "Css", "JavaScript", "Php", "Python", "..."] },
                        { label: "FRAMEWORKS", items: ["Express", "React", "Node.js", "Laravel", "..."] },
                        { label: "Database", items: ["MySQL", "Mongo", "Postgre", "..."] },
                        { label: "INTERESTS", items: ["Gaming", "Coding", "Reading", "..."] },
                    ].map((col, i) => (
                        <motion.div key={i} variants={fadeUp}>
                            <SectionLabel>{col.label}</SectionLabel>
                            <ul className="space-y-1">
                                {col.items.map((item, j) => (
                                    <li
                                        key={j}
                                        className="font-serif text-[0.9rem] text-void leading-relaxed"
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
}