// src/components/pages/ContactSection.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { dreamCut, stagger, fadeUp } from "../../animations/variants";
import SectionLabel from "../common/SectionLabel";
import SketchCard from "../common/SketchCard";

export default function ContactSection() {
    const [focused, setFocused] = useState(null);
    const [sent, setSent] = useState(false);
    const [values, setValues] = useState({ name: "", email: "", message: "" });
    const [privacyAgreed, setPrivacyAgreed] = useState(false);
    const [formError, setFormError] = useState("");

    const fields = [
        { key: "name", placeholder: "your name (First and Last name)", type: "text", rows: null },
        { key: "email", placeholder: "your email (Gmail)", type: "email", rows: null },
        { key: "message", placeholder: "your message / feedback", type: "textarea", rows: 4 },
    ];

    const resetForm = () => {
        setValues({ name: "", email: "", message: "" });
        setPrivacyAgreed(false);
        setFormError("");
        setSent(false);
    };

    const handleSubmit = () => {
        setFormError("");

        if (!values.name.trim() || !values.email.trim() || !values.message.trim()) {
            setFormError("name, email, and message are all required.");
            return;
        }

        if (!privacyAgreed) {
            setFormError("you must agree to the data privacy terms to continue.");
            return;
        }

        // basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(values.email.trim())) {
            setFormError("please enter a valid email address.");
            return;
        }

        setSent(true);
        // clear sensitive fields after "send"
        setValues({ name: "", email: "", message: "" });
        setPrivacyAgreed(false);
        setFormError("");
    };

    const handleFieldChange = (key, value) => {
        setValues({ ...values, [key]: value });
        if (formError) setFormError("");
    };

    const handlePrivacyChange = (checked) => {
        setPrivacyAgreed(checked);
        if (formError) setFormError("");
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
                            <SectionLabel>× contact</SectionLabel>
                            <h2
                                className="font-display italic text-ink leading-[1.1] mb-6"
                                style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
                            >
                                say<br />something
                            </h2>
                        </motion.div>

                        <motion.p variants={fadeUp} className="font-serif text-[1rem] text-void leading-[1.85] mb-8">
                            Whether you have a project in mind, a question to ask, or just something to say.
                        </motion.p>

                        <motion.div variants={fadeUp} className="space-y-5">
                            {[
                                { label: "EMAIL", value: "your@email.com" },
                                { label: "Location", value: "@yourhandle" },
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
                                        onClick={resetForm}
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
                                                    onChange={(e) => handleFieldChange(field.key, e.target.value)}
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
                                                    onChange={(e) => handleFieldChange(field.key, e.target.value)}
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

                                    {/* DATA PRIVACY AGREEMENT */}
                                    <motion.div variants={fadeUp} className="mb-8">
                                        <label className="flex items-start gap-3 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={privacyAgreed}
                                                onChange={(e) => handlePrivacyChange(e.target.checked)}
                                                className="mt-0.5 w-4 h-4 accent-void bg-bone border-ash rounded-sm focus:ring-0 focus:ring-offset-0"
                                            />
                                            <span className="font-mono text-[0.7rem] text-void leading-relaxed tracking-wide">
                                                I agree to the{" "}
                                                <span className="border-b border-smudge italic">data privacy terms</span> — my name, email, and message will only be used to reply, never shared or stored forever.
                                            </span>
                                        </label>
                                    </motion.div>

                                    {/* FORM ERROR MESSAGE */}
                                    {formError && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -4 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mb-6"
                                        >
                                            <p className="font-mono text-[0.7rem] text-[#c8686e] border-l-2 border-[#c8686e] pl-3 italic">
                                                {formError}
                                            </p>
                                        </motion.div>
                                    )}

                                    <motion.div variants={fadeUp}>
                                        <button
                                            onClick={handleSubmit}
                                            className="
        font-display italic
        text-paper
        bg-ink
        border border-ink
        rounded-none

        px-6 py-1
        min-w-[140px]

        text-[1.05rem]
        flex items-center justify-center gap-2

        transition-all duration-300 ease-dream

        hover:bg-paper
        hover:text-ink
        hover:border-ink
    "
                                        >
                                            Submit
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