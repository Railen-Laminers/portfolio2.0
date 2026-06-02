import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { dreamCut, stagger, fadeUp } from "../../animations/variants";
import { NAV } from "../../data/navData";
import { useTheme } from "../../context/ThemeContext";
import profileImg from "/profile.png";

export default function HeroSection() {
    const navigate = useNavigate();
    const { theme, crimsonMode } = useTheme();

    // Natural, low‑contrast adjustments – identical base for dark and crimson
    const imageFilter = crimsonMode
        ? "brightness(0.85) contrast(0.9) saturate(0.75) sepia(0.15) hue-rotate(-5deg)"
        : theme === "dark"
            ? "brightness(0.85) contrast(0.9) saturate(0.75)"
            : "none";

    return (
        <motion.div
            variants={dreamCut}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
        >
            {/* Hero profile image – centred, touching the bottom */}
            <img
                src={profileImg}
                alt="Hero Profile"
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-screen w-auto object-contain z-0"
                style={{ filter: imageFilter }}
            />

            <motion.div
                variants={stagger}
                initial="hidden"
                animate="show"
                className="relative z-10 text-center px-6 max-w-3xl"
            >
                <motion.p
                    variants={fadeUp}
                    className="font-mono text-[0.62rem] text-void tracking-[0.2em] mb-6 uppercase"
                >
                    ◈ portfolio 2.0
                </motion.p>

                <motion.h1
                    variants={fadeUp}
                    className="font-display italic text-ink leading-[1.08] mb-8"
                    style={{ fontSize: "clamp(3.5rem, 9vw, 7.5rem)" }}
                >
                    Railen
                </motion.h1>

                <motion.p
                    variants={fadeUp}
                    className="font-serif italic text-void text-[1.05rem] mb-12 max-w-sm mx-auto leading-relaxed"
                >
                    ...a portfolio. a sketchbook. a place that became real by being looked at.
                </motion.p>

                <motion.div variants={fadeUp} className="flex flex-wrap gap-3 justify-center">
                    {NAV.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => navigate(`/${item.id}`)}
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