// src/sections/CertificatesSection.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { dreamCut, stagger, fadeUp } from "../../animations/variants";
import { CERTIFICATES, CERT_FILTERS } from "../../data/certificatesData";
import SectionLabel from "../common/SectionLabel";
import TapeStrip from "../common/TapeStrip";
import Crosshatch from "../common/Crosshatch";
import SketchCard from "../common/SketchCard";
import DashedRule from "../common/DashedRule";

function CardContent({ cert }) {
    const [imgError, setImgError] = useState(false);

    return (
        <>
            {!imgError && cert.image ? (
                <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full aspect-[4/3] object-cover mb-5 rounded-[2px] border border-smudge"
                    onError={() => setImgError(true)}
                    loading="lazy"
                />
            ) : (
                <Crosshatch className="w-full aspect-[4/3] mb-5" label="[ certificate image missing ]" />
            )}
            <TapeStrip color={cert.accent}>{cert.tag}</TapeStrip>
            <h3 className="font-serif text-[1.1rem] text-ink mt-3 mb-1 leading-snug">
                {cert.title}
            </h3>
            <p className="font-mono text-[0.58rem] text-void tracking-wider mb-1">
                {cert.issuer}
            </p>
            <p className="font-mono text-[0.55rem] text-void/70 tracking-wider mb-3">
                {cert.date}
            </p>
            <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="font-mono text-[0.58rem] text-void tracking-widest">
                    {cert.link ? "view certificate →" : "view only"}
                </span>
            </div>
        </>
    );
}

export default function CertificatesSection() {
    const [filter, setFilter] = useState("ALL");
    const filtered = filter === "ALL"
        ? CERTIFICATES
        : CERTIFICATES.filter((c) => c.tag === filter);

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
                    <motion.div variants={fadeUp}>
                        <SectionLabel>○ certificates</SectionLabel>
                        <h2
                            className="font-display italic text-ink leading-[1.1] mb-3"
                            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
                        >
                            achievements<br />& learning
                        </h2>
                        <p className="font-serif italic text-[0.9rem] text-void mb-4 leading-relaxed">
                            ...a record of skills earned and knowledge gained.
                        </p>
                    </motion.div>

                    <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-12">
                        {CERT_FILTERS.map((f) => (
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
                        {filtered.map((cert, i) => (
                            <motion.div
                                key={cert.id}
                                layout
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.5 } }}
                                exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.25 } }}
                            >
                                {cert.link ? (
                                    <a
                                        href={cert.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block no-underline focus:outline-none focus:ring-2 focus:ring-fog"
                                    >
                                        <SketchCard rotate={cert.rotate} accent={cert.accent}>
                                            <CardContent cert={cert} />
                                        </SketchCard>
                                    </a>
                                ) : (
                                    <div className="cursor-default">
                                        <SketchCard rotate={cert.rotate} accent={cert.accent}>
                                            <CardContent cert={cert} />
                                        </SketchCard>
                                    </div>
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
                            ...every certificate is a step. what matters is where you walk next.
                        </p>
                    </SketchCard>
                </motion.div>
            </div>
        </motion.div>
    );
}