import { useState, useEffect } from "react";
import { Link } from "react-router-dom";               // ← added for internal routing
import { motion, AnimatePresence } from "framer-motion";
import { dreamCut, stagger, fadeUp } from "../../animations/variants";
import { MINIGAMES, MINIGAME_FILTERS } from "../../data/minigamesData";
import SectionLabel from "../common/SectionLabel";
import TapeStrip from "../common/TapeStrip";
import Crosshatch from "../common/Crosshatch";
import SketchCard from "../common/SketchCard";
import DashedRule from "../common/DashedRule";

function GameModal({ game, onClose }) {
    const [imgError, setImgError] = useState(false);

    useEffect(() => {
        const handleEscape = (e) => { if (e.key === "Escape") onClose(); };
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [onClose]);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = "unset"; };
    }, []);

    const isExternal = game.link?.startsWith("http");
    const buttonText = isExternal ? "launch game ↗" : "play game →";

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
            <motion.div
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
                <SketchCard rotate={0} accent={game.accent} className="p-0">
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-bone border border-smudge hover:bg-fog transition-colors font-mono text-sm"
                        aria-label="Close"
                    >
                        ✕
                    </button>
                    <div className="p-6 pb-2">
                        {!imgError && game.image ? (
                            <img
                                src={game.image}
                                alt={game.title}
                                className="w-full rounded-[2px] border border-smudge shadow-md"
                                onError={() => setImgError(true)}
                            />
                        ) : (
                            <Crosshatch className="w-full aspect-[4/3]" label="[ play → ]" />
                        )}
                    </div>
                    <div className="p-6 pt-2">
                        <TapeStrip color={game.accent}>{game.tag}</TapeStrip>
                        <h3 className="font-serif text-[1.4rem] text-ink mt-4 mb-1 leading-snug">{game.title}</h3>
                        <p className="font-mono text-[0.6rem] text-void tracking-wider mb-3">{game.year}</p>
                        <p className="font-serif italic text-[0.9rem] text-void leading-relaxed mb-5">{game.desc}</p>
                        {game.link ? (
                            isExternal ? (
                                <a
                                    href={game.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-mono text-[0.62rem] tracking-[0.12em] text-void border border-smudge px-5 py-2.5 hover:bg-ink hover:text-bone hover:border-ink transition-all duration-300 rounded-[1px] inline-block"
                                >
                                    {buttonText}
                                </a>
                            ) : (
                                // ✅ FIX: use Link for internal routes
                                <Link
                                    to={game.link}
                                    onClick={onClose}
                                    className="font-mono text-[0.62rem] tracking-[0.12em] text-void border border-smudge px-5 py-2.5 hover:bg-ink hover:text-bone hover:border-ink transition-all duration-300 rounded-[1px] inline-block"
                                >
                                    {buttonText}
                                </Link>
                            )
                        ) : (
                            <span className="font-mono text-[0.62rem] tracking-[0.12em] text-void/40 border border-smudge/40 px-5 py-2.5 rounded-[1px] inline-block cursor-default">
                                play only
                            </span>
                        )}
                    </div>
                </SketchCard>
            </motion.div>
        </motion.div>
    );
}

function MinimalGameCard({ game, onClick }) {
    const [imgError, setImgError] = useState(false);
    const handleKeyDown = (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
        }
    };
    return (
        <div
            role="button"
            tabIndex={0}
            onClick={onClick}
            onKeyDown={handleKeyDown}
            className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-fog rounded-[2px]"
        >
            <SketchCard rotate={game.rotate} accent={game.accent} className="group">
                {!imgError && game.image ? (
                    <img
                        src={game.image}
                        alt={game.title}
                        className="w-full aspect-[4/3] object-cover rounded-[2px] border border-smudge transition-transform duration-300 group-hover:scale-[1.02]"
                        onError={() => setImgError(true)}
                        loading="lazy"
                    />
                ) : (
                    <Crosshatch className="w-full aspect-[4/3]" label="[ play → ]" />
                )}
            </SketchCard>
        </div>
    );
}

export default function MiniGamesSection() {
    const [filter, setFilter] = useState("ALL");
    const [selectedGame, setSelectedGame] = useState(null);
    const filteredGames = filter === "ALL"
        ? MINIGAMES
        : MINIGAMES.filter((g) => g.tag === filter);

    return (
        <>
            <motion.div
                variants={dreamCut}
                initial="hidden"
                animate="show"
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
                        <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-12">
                            {MINIGAME_FILTERS.map((f) => (
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
                            {filteredGames.map((game, i) => (
                                <motion.div
                                    key={game.id}
                                    layout
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.5 } }}
                                    exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.25 } }}
                                >
                                    <MinimalGameCard game={game} onClick={() => setSelectedGame(game)} />
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
                                ...sometimes the best game is the one you invent yourself.
                            </p>
                        </SketchCard>
                    </motion.div>
                </div>
            </motion.div>
            <AnimatePresence>
                {selectedGame && <GameModal game={selectedGame} onClose={() => setSelectedGame(null)} />}
            </AnimatePresence>
        </>
    );
}