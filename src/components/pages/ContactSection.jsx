// src/components/pages/ContactSection.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { dreamCut, stagger, fadeUp } from "../../animations/variants";
import SectionLabel from "../common/SectionLabel";
import SketchCard from "../common/SketchCard";

export default function ContactSection() {
    const [focused, setFocused] = useState(null);
    const [sent, setSent] = useState(false);
    const [values, setValues] = useState({ name: "", contact: "", message: "" });

    const fields = [
        { key: "name", placeholder: "your name", type: "text", rows: null },
        { key: "contact", placeholder: "where to find you", type: "text", rows: null },
        { key: "message", placeholder: "what you want to say", type: "textarea", rows: 4 },
    ];

    const handleSubmit = () => {
        if (values.name && values.message) setSent(true);
    };

    return (
        <motion.div
            variants={dreamCut}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen pt-14 bg-bone"
        >
            <div className="max-w-6xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                    {/* Left — heading + context */}
                    <motion.div variants={stagger} initial="hidden" animate="show">
                        <motion.div variants={fadeUp}>
                            <SectionLabel>× reach / contact</SectionLabel>
                            <h2
                                className="font-display italic text-ink leading-[1.1] mb-6"
                                style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
                            >
                                say<br />something
                            </h2>
                        </motion.div>

                        <motion.p variants={fadeUp} className="font-serif text-[1rem] text-void leading-[1.85] mb-8">
                            Whether you have a project in mind, a question to ask, or just something to say — the white space is open.
                        </motion.p>

                        <motion.div variants={fadeUp} className="space-y-5">
                            {[
                                { label: "EMAIL", value: "your@email.com" },
                                { label: "ELSEWHERE", value: "@yourhandle" },
                                { label: "RESPONSE TIME", value: "...when i find the right words" },
                            ].map((item, i) => (
                                <div key={i} className="border-b border-dashed border-ash pb-4">
                                    <p className="font-mono text-[0.58rem] text-fog tracking-widest mb-1">{item.label}</p>
                                    <p className="font-serif italic text-void text-[0.95rem]">{item.value}</p>
                                </div>
                            ))}
                        </motion.div>

                        {/* Floating card */}
                        <motion.div variants={fadeUp} className="mt-10">
                            <SketchCard rotate={1.1} accent="#c4d4e8">
                                <p className="font-display italic text-[0.88rem] text-void leading-relaxed">
                                    ...messages received in order of sincerity, not urgency.
                                </p>
                            </SketchCard>
                        </motion.div>
                    </motion.div>

                    {/* Right — form */}
                    <motion.div variants={stagger} initial="hidden" animate="show" className="md:pt-16">
                        <AnimatePresence mode="wait">
                            {sent ? (
                                <motion.div
                                    key="sent"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0, transition: { duration: 0.7 } }}
                                    className="text-center py-16"
                                >
                                    <p className="font-display italic text-ink text-[2.5rem] mb-4">received.</p>
                                    <p className="font-serif italic text-fog text-[1rem]">
                                        ...it landed somewhere in the white space. i'll find it.
                                    </p>
                                    <button
                                        onClick={() => {
                                            setSent(false);
                                            setValues({ name: "", contact: "", message: "" });
                                        }}
                                        className="mt-8 font-mono text-[0.6rem] text-fog tracking-widest border-b border-smudge pb-0.5 hover:text-void transition-colors"
                                    >
                                        send another
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.div key="form" variants={stagger}>
                                    {fields.map((field, i) => (
                                        <motion.div key={field.key} variants={fadeUp} className="mb-8">
                                            {field.type === "textarea" ? (
                                                <textarea
                                                    rows={field.rows}
                                                    placeholder={field.placeholder}
                                                    value={values[field.key]}
                                                    onFocus={() => setFocused(i)}
                                                    onBlur={() => setFocused(null)}
                                                    onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
                                                    className="contact-field w-full resize-none"
                                                    style={{
                                                        fontFamily:
                                                            focused === i ? "'IM Fell English', Georgia, serif" : "'Space Mono', monospace",
                                                        fontStyle: focused === i ? "italic" : "normal",
                                                    }}
                                                />
                                            ) : (
                                                <input
                                                    type={field.type}
                                                    placeholder={field.placeholder}
                                                    value={values[field.key]}
                                                    onFocus={() => setFocused(i)}
                                                    onBlur={() => setFocused(null)}
                                                    onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
                                                    className="contact-field w-full"
                                                    style={{
                                                        fontFamily:
                                                            focused === i ? "'IM Fell English', Georgia, serif" : "'Space Mono', monospace",
                                                        fontStyle: focused === i ? "italic" : "normal",
                                                    }}
                                                />
                                            )}
                                        </motion.div>
                                    ))}

                                    <motion.div variants={fadeUp}>
                                        <button
                                            onClick={handleSubmit}
                                            className="font-display italic text-ink text-[1.05rem] border-b border-ink pb-0.5 flex items-center gap-2 hover:opacity-60 transition-opacity"
                                        >
                                            ◈ send it into the white
                                        </button>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}