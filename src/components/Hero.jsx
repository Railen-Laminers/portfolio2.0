import { useState, useEffect } from "react";
import { motion, useAnimate, stagger } from "motion/react";

const FULL_NAME = "Hmm";

export default function Hero() {
    const [typedName, setTypedName] = useState("");
    const [doneTyping, setDoneTyping] = useState(false);
    const [scope, animate] = useAnimate();

    // Typewriter — runs after mount fade-in settles
    useEffect(() => {
        const delay = setTimeout(() => {
            let i = 0;
            const interval = setInterval(() => {
                if (i <= FULL_NAME.length) {
                    setTypedName(FULL_NAME.slice(0, i));
                    i++;
                } else {
                    clearInterval(interval);
                    setDoneTyping(true);
                }
            }, 90);
            return () => clearInterval(interval);
        }, 600);
        return () => clearTimeout(delay);
    }, []);

    // Stagger in the divider + byline after typing finishes
    useEffect(() => {
        if (!doneTyping || !scope.current) return;
        animate(
            [
                ["#hero-divider", { scaleX: [0, 1], opacity: [0, 1] }, { duration: 0.4, ease: "easeOut" }],
                ["#hero-byline", { opacity: [0, 1], y: [6, 0] }, { duration: 0.35, ease: "easeOut", at: "-0.1" }],
                ["#hero-sub", { opacity: [0, 1], y: [6, 0] }, { duration: 0.35, ease: "easeOut", at: "-0.1" }],
            ]
        );
    }, [doneTyping]);

    return (
        <div className="h-full flex items-center justify-center px-4">
            <motion.div
                className="relative w-[90%] max-w-[620px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
                {/* ── Manga panel card ── */}
                <div
                    className="relative overflow-hidden bg-white text-center px-8 py-10 md:px-12 md:py-14"
                    style={{ border: "3px solid #000", boxShadow: "10px 10px 0 rgba(0,0,0,0.10)" }}
                >
                    {/* Screentone dots */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            backgroundImage: "radial-gradient(circle, #000 0.6px, transparent 0.6px)",
                            backgroundSize: "6px 6px",
                            opacity: 0.035,
                        }}
                    />

                    {/* Halftone stripe */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            backgroundImage:
                                "repeating-linear-gradient(to bottom, #f5f5f0 0px, #f5f5f0 3px, #fff 3px, #fff 8px)",
                            opacity: 0.45,
                        }}
                    />

                    {/* Corner fold */}
                    <div
                        className="absolute bottom-0 right-0 pointer-events-none"
                        style={{
                            width: 0, height: 0,
                            borderStyle: "solid",
                            borderWidth: "0 0 22px 22px",
                            borderColor: "transparent transparent #000 transparent",
                        }}
                    />

                    {/* Content */}
                    <div ref={scope} className="relative z-10">
                        {/* Typewriter title */}
                        <h1 className="text-3xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-black flex items-baseline justify-center gap-1 flex-wrap min-h-[1.2em]">
                            {typedName}
                            {/* Cursor — hides once done */}
                            <motion.span
                                className="inline-block w-[3px] bg-black ml-1"
                                style={{ height: "0.85em", alignSelf: "center" }}
                                animate={doneTyping
                                    ? { opacity: [1, 0], transition: { delay: 0.8, duration: 0.3 } }
                                    : { opacity: [1, 0, 1] }
                                }
                                transition={doneTyping ? {} : {
                                    repeat: Infinity,
                                    duration: 0.7,
                                    ease: "steps(1)",
                                }}
                            />
                        </h1>

                        {/* Divider */}
                        <motion.div
                            id="hero-divider"
                            className="w-12 h-[2px] bg-black/50 mx-auto my-6 origin-left"
                            initial={{ scaleX: 0, opacity: 0 }}
                        />

                        {/* By line */}
                        <motion.p
                            id="hero-byline"
                            className="text-[0.7rem] md:text-xs tracking-[2px] uppercase text-neutral-600 font-light"
                            initial={{ opacity: 0, y: 6 }}
                        >
                            by Railen
                        </motion.p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}