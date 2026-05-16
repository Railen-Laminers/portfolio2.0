import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { dreamCut, stagger, fadeUp } from "../../animations/variants";
import SectionLabel from "../common/SectionLabel";
import SketchCard from "../common/SketchCard";
import DashedRule from "../common/DashedRule";
import TapeStrip from "../common/TapeStrip";
import Crosshatch from "../common/Crosshatch";  // <-- added import

export default function MiniGamesSection() {
    const navigate = useNavigate();

    const games = [
        {
            id: "flappybird",
            title: "flappy bird",
            description: "avoid the pipes. how far can you go?",
            accent: "#c8d9c4",
            rotate: -0.5,
            // glyph: "🐦",  // removed
        },
    ];

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
                        <SectionLabel>⌂ mini games</SectionLabel>
                        <h2
                            className="font-display italic text-ink leading-[1.1] mb-3"
                            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
                        >
                            play<br />a little
                        </h2>
                        <p className="font-serif italic text-[1rem] text-void max-w-md mb-10">
                            ...small amusements for quiet moments.
                        </p>
                    </motion.div>
                </motion.div>

                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
                >
                    {games.map((game) => (
                        <motion.div key={game.id} variants={fadeUp}>
                            <button
                                onClick={() => navigate(`/minigames/${game.id}`)}
                                className="w-full text-left focus:outline-none focus:ring-2 focus:ring-fog"
                            >
                                <SketchCard rotate={game.rotate} accent={game.accent}>
                                    {/* replaced emoji/glyph with Crosshatch */}
                                    <Crosshatch
                                        className="w-full aspect-[4/3] mb-5"
                                        label="[ play ]"
                                    />
                                    <TapeStrip color={game.accent}>play now</TapeStrip>
                                    <h3 className="font-serif text-[1.1rem] text-ink mt-3 mb-1">
                                        {game.title}
                                    </h3>
                                    <p className="font-serif italic text-[0.88rem] text-void/70 leading-relaxed">
                                        {game.description}
                                    </p>
                                </SketchCard>
                            </button>
                        </motion.div>
                    ))}
                </motion.div>

                <DashedRule />

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1, transition: { duration: 1 } }}
                    viewport={{ once: true }}
                    className="flex justify-start mt-12"
                >
                    <SketchCard rotate={0.7} accent="#c8d9c4" className="max-w-xs">
                        <p className="font-mono text-[0.58rem] text-void tracking-widest mb-2">NOTE /</p>
                        <p className="font-display italic text-[0.9rem] text-void leading-relaxed">
                            ...sometimes the best game is the one you invent yourself.
                        </p>
                    </SketchCard>
                </motion.div>
            </div>
        </motion.div>
    );
}