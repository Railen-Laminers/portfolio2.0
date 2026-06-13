import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { dreamCut, stagger, fadeUp } from "../../animations/variants";
import { NAV } from "../../data/navData";
import { useTheme } from "../../context/ThemeContext";
import profileImg from "/profile.png";

export default function HeroSection() {
    const navigate = useNavigate();
    const { theme, crimsonMode } = useTheme();

    const imageFilter = crimsonMode
        ? "brightness(0.85) contrast(0.9) saturate(0.75) sepia(0.15) hue-rotate(-5deg)"
        : theme === "dark"
            ? "brightness(0.85) contrast(0.9) saturate(0.75)"
            : "none";

    // Mouse tracking values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    // Map mouse position to rotation/translation ranges
    const rotateX = useTransform(y, [-0.5, 0.5], [6, -6]);
    const rotateY = useTransform(x, [-0.5, 0.5], [-6, 6]);
    const translateX = useTransform(x, [-0.5, 0.5], [-15, 15]);
    const translateY = useTransform(y, [-0.5, 0.5], [-15, 15]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(px);
        mouseY.set(py);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            variants={dreamCut}
            initial="initial"
            animate="animate"
            exit="exit"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative h-screen w-screen overflow-hidden"
            style={{ perspective: 1000 }}
        >
            {/* Background Profile Image (perfectly centered) */}
            <motion.img
                src={profileImg}
                alt="Hero Profile"
                className="
                    absolute
                    top-1/2 left-1/2
                    h-full
                    w-auto
                    max-w-none
                    object-contain
                    z-0
                "
                style={{
                    filter: imageFilter,
                    x: translateX,
                    y: translateY,
                    rotateX,
                    rotateY,
                    translateX: "-50%",
                    translateY: "-50%",
                    transformStyle: "preserve-3d",
                }}
            />

            {/* Hero Content */}
            <motion.div
                variants={stagger}
                initial="hidden"
                animate="show"
                className="relative z-10 flex flex-col justify-between h-screen px-6 py-10"
            >
                {/* Top */}
                <motion.p
                    variants={fadeUp}
                    className="font-mono text-[0.62rem] text-void tracking-[0.2em] uppercase text-center"
                >
                    ◈ Portfolio 2.0
                </motion.p>

                {/* Bottom Navigation */}
                <motion.div
                    variants={fadeUp}
                    className="flex flex-wrap justify-center gap-3"
                >
                    {NAV.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => navigate(`/${item.id}`)}
                            className={`font-mono text-[0.62rem] tracking-[0.12em] px-5 py-2.5 rounded-[1px] border transition-all duration-300 ${theme === "light"
                                    ? "bg-ink text-paper border-ink hover:bg-paper hover:text-ink"
                                    : "bg-paper text-ink border-smudge hover:bg-ink hover:text-bone hover:border-ink"
                                }`}
                        >
                            {item.glyph} {item.label.toUpperCase()}
                        </button>
                    ))}
                </motion.div>
            </motion.div>
        </motion.div>
    );
}