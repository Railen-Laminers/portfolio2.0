// src/components/pages/HeroSection.jsx
import { motion } from "framer-motion";
import { dreamCut, stagger, fadeUp } from "../../animations/variants";
import { NAV } from "../../data/navData";

export default function HeroSection({ onNavigate }) {
    return (
        <motion.div
            variants={dreamCut}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen bg-bone flex flex-col items-center justify-center relative overflow-hidden"
        >
            {/* Background grid lines — notebook paper feel */}
            <div
                className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                    backgroundImage:
                        "repeating-linear-gradient(0deg, transparent, transparent 27px, #c4bfb0 27px, #c4bfb0 28px)",
                }}
            />
            {/* Left margin rule */}
            <div className="absolute top-0 bottom-0 left-[72px] w-px bg-[#e8cdd4] opacity-60 hidden md:block" />

            <motion.div
                variants={stagger}
                initial="hidden"
                animate="show"
                className="relative z-10 text-center px-6 max-w-3xl"
            >
                <motion.p variants={fadeUp} className="font-mono text-[0.62rem] text-fog tracking-[0.2em] mb-6 uppercase">
                    ○ portfolio 2.0
                </motion.p>

                <motion.h1
                    variants={fadeUp}
                    className="font-display italic text-ink leading-[1.08] mb-8"
                    style={{ fontSize: "clamp(3.5rem, 9vw, 7.5rem)" }}
                >
                    something
                </motion.h1>

                <motion.p variants={fadeUp} className="font-serif italic text-fog text-[1.05rem] mb-12 max-w-sm mx-auto leading-relaxed">
                    ...a portfolio. a sketchbook. a place that became real by being looked at.
                </motion.p>

                <motion.div variants={fadeUp} className="flex flex-wrap gap-3 justify-center">
                    {NAV.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            className="font-mono text-[0.62rem] tracking-[0.12em] text-void border border-smudge px-5 py-2.5 hover:bg-ink hover:text-bone hover:border-ink transition-all duration-300 rounded-[1px]"
                        >
                            {item.glyph} {item.label.toUpperCase()}
                        </button>
                    ))}
                </motion.div>
            </motion.div>
        </motion.div>
    );
}