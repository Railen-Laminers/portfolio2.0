// src/components/pages/AboutSection.jsx
import { motion } from "framer-motion";
import { dreamCut, stagger, fadeUp } from "../../animations/variants";
import SectionLabel from "../common/SectionLabel";
import TapeStrip from "../common/TapeStrip";
import Crosshatch from "../common/Crosshatch";
import SketchCard from "../common/SketchCard";
import DashedRule from "../common/DashedRule";

export default function AboutSection() {
    return (
        <motion.div
            variants={dreamCut}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen pt-14 bg-bone"
        >
            <div className="max-w-6xl mx-auto px-6 py-20">
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-[1fr_380px] gap-16 items-start"
                >
                    {/* Left — text */}
                    <div>
                        <motion.div variants={fadeUp}>
                            <SectionLabel>○ entry / about</SectionLabel>
                            <h1
                                className="font-display italic text-ink leading-[1.1] mb-8"
                                style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}
                            >
                                who<br />
                                i am<br />
                                becoming
                            </h1>
                        </motion.div>

                        <motion.p variants={fadeUp} className="font-serif text-[1.05rem] text-void leading-[1.85] mb-6">
                            {/* ↓ Replace with your actual bio */}
                            Write your story here. This paragraph carries the emotional weight of the section — your voice, your work, what you carry with you. Let it breathe. Let it be honest.
                        </motion.p>

                        <motion.p variants={fadeUp} className="font-display italic text-[0.95rem] text-fog leading-[1.8] mb-10">
                            ...a second thought, quieter than the first. Maybe a detail about where you come from, or what you make, or what you're still figuring out.
                        </motion.p>

                        <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-10">
                            {["DESIGNER", "DEVELOPER", "SOMETHING ELSE"].map((tag, i) => {
                                const colors = ["#d4c9e8", "#c8d9c4", "#e8cdd4"];
                                return <TapeStrip key={i} color={colors[i]}>{tag}</TapeStrip>;
                            })}
                        </motion.div>

                        <motion.div variants={fadeUp} className="border-l-2 border-smudge pl-5">
                            <p className="font-mono text-[0.6rem] text-fog tracking-widest mb-1">CURRENTLY LOCATED IN</p>
                            <p className="font-serif italic text-void text-[1rem]">somewhere between here and the white space</p>
                        </motion.div>
                    </div>

                    {/* Right — portrait zone + floaters */}
                    <motion.div variants={fadeUp} className="flex flex-col gap-5">
                        {/* Portrait placeholder */}
                        <div className="relative">
                            <Crosshatch className="w-full aspect-[3/4] border border-smudge" label="[ portrait / illustration ]" />
                            {/* Tape accent */}
                            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-3 bg-[#d4c9e8] opacity-70 rotate-[-1deg]" />
                            <div className="absolute -bottom-2 right-4 w-10 h-3 bg-[#e8cdd4] opacity-60 rotate-[1.5deg]" />
                        </div>

                        {/* Small caption */}
                        <p className="font-display italic text-[0.82rem] text-smudge text-right">
                            ...i remember this.
                        </p>

                        {/* Floating note card */}
                        <SketchCard rotate={1.2} accent="#c8d9c4" className="mt-2">
                            <p className="font-mono text-[0.58rem] text-fog tracking-widest mb-2">NOTE TO SELF /</p>
                            <p className="font-serif italic text-[0.9rem] text-void leading-relaxed">
                                Add a small personal note, quote, or detail here — something that feels like a margin annotation.
                            </p>
                        </SketchCard>
                    </motion.div>
                </motion.div>

                <DashedRule />

                {/* Skills / tools row */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6"
                >
                    {[
                        { label: "TOOLS", items: ["Figma", "VS Code", "Procreate", "..."] },
                        { label: "LANGUAGES", items: ["JavaScript", "TypeScript", "Python", "..."] },
                        { label: "INTERESTS", items: ["game design", "writing", "illustration", "..."] },
                        { label: "CURRENTLY", items: ["learning —", "making —", "reading —", "..."] },
                    ].map((col, i) => (
                        <motion.div key={i} variants={fadeUp}>
                            <SectionLabel>{col.label}</SectionLabel>
                            <ul className="space-y-1">
                                {col.items.map((item, j) => (
                                    <li key={j} className="font-serif text-[0.9rem] text-void leading-relaxed">
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