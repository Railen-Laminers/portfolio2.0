import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { dreamCut, stagger, fadeUp } from "../../animations/variants";
import SectionLabel from "../common/SectionLabel";
import TapeStrip from "../common/TapeStrip";
import SketchCard from "../common/SketchCard";
import profileImg from "/profile.jpg";

const SIZE = 3;
const TILE_COUNT = SIZE * SIZE;
const CORNERS = [0, 2, 6, 8];

const TILE_PAPER = "var(--paper)";
const TILE_BONE = "var(--bone)";
const TILE_SMUDGE = "var(--smudge)";
const TILE_ACCENT = "#c4d4e8";

// ------------------------------------------------------------
//  Helpers
// ------------------------------------------------------------

const solvedBoard = (blankPos) => {
    const board = Array(TILE_COUNT).fill(0);
    let num = 1;
    for (let i = 0; i < TILE_COUNT; i++) {
        if (i === blankPos) continue;
        board[i] = num++;
    }
    return board;
};

const isSolved = (board, blankPos) => board.every((v, i) => v === solvedBoard(blankPos)[i]);

const canSlide = (index, board) => {
    const blankIndex = board.indexOf(0);
    if (blankIndex === -1) return false;
    const row = Math.floor(index / SIZE);
    const col = index % SIZE;
    const blankRow = Math.floor(blankIndex / SIZE);
    const blankCol = blankIndex % SIZE;
    const sameRow = row === blankRow;
    const sameCol = col === blankCol;
    const adjacent = Math.abs(row - blankRow) + Math.abs(col - blankCol) === 1;
    return (sameRow || sameCol) && adjacent;
};

const shuffleBoard = (blankPos) => {
    const board = solvedBoard(blankPos).slice();
    const numbers = board.filter((v) => v !== 0);
    for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    let idx = 0;
    for (let i = 0; i < board.length; i++) {
        if (i === blankPos) continue;
        board[i] = numbers[idx++];
    }
    let inversions = 0;
    const tiles = board.filter((v) => v !== 0);
    for (let i = 0; i < tiles.length; i++) {
        for (let j = i + 1; j < tiles.length; j++) {
            if (tiles[i] > tiles[j]) inversions++;
        }
    }
    if (inversions % 2 !== 0) {
        const nonBlankIndices = board
            .map((v, i) => ({ v, i }))
            .filter((o) => o.v !== 0)
            .map((o) => o.i);
        const a = nonBlankIndices[0];
        const b = nonBlankIndices[1];
        [board[a], board[b]] = [board[b], board[a]];
    }
    return board;
};

const createNewGame = () => {
    const blankPos = CORNERS[Math.floor(Math.random() * CORNERS.length)];
    return { blankPos, board: shuffleBoard(blankPos) };
};

const getTilePosition = (value, blankPos) => {
    const solved = solvedBoard(blankPos);
    const index = solved.indexOf(value);
    return { row: Math.floor(index / SIZE), col: index % SIZE };
};

const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return m > 0 ? `${m}:${String(s).padStart(2, "0")}` : `${s}s`;
};

// ------------------------------------------------------------
//  Component
// ------------------------------------------------------------
export default function SlidingPuzzle() {
    const [blankPos, setBlankPos] = useState(() => {
        const { blankPos } = createNewGame();
        return blankPos;
    });
    const [board, setBoard] = useState(() => shuffleBoard(blankPos));
    const [moves, setMoves] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [won, setWon] = useState(false);
    const [wonTime, setWonTime] = useState(null);
    const [showSample, setShowSample] = useState(false);
    const [timerStarted, setTimerStarted] = useState(false); // NEW: timer only starts after first move

    const timerRef = useRef(null);
    const startRef = useRef(Date.now());

    const [drag, setDrag] = useState(null);
    const dragMovedRef = useRef(false);

    // Timer – runs only when timerStarted is true and not won
    useEffect(() => {
        if (won || !timerStarted) {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
            return;
        }
        // Start the interval if not already running
        if (!timerRef.current) {
            timerRef.current = setInterval(() => {
                setSeconds(Math.floor((Date.now() - startRef.current) / 1000));
            }, 1000);
        }
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [won, timerStarted]);

    const handleNewGame = useCallback(() => {
        const { blankPos: newBlank, board: newBoard } = createNewGame();
        setBlankPos(newBlank);
        setBoard(newBoard);
        setMoves(0);
        setWon(false);
        setWonTime(null);
        setSeconds(0);
        setTimerStarted(false);          // reset timer start flag
        startRef.current = Date.now();   // will be reset on first move
        // Clear any running timer
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    const handleTileClick = useCallback(
        (index) => {
            if (won) return;
            if (!canSlide(index, board)) return;

            // Start timer on first move
            if (!timerStarted) {
                setTimerStarted(true);
                startRef.current = Date.now();
            }

            const blank = board.indexOf(0);
            const next = board.slice();
            [next[index], next[blank]] = [next[blank], next[index]];
            setBoard(next);
            setMoves((m) => m + 1);

            if (isSolved(next, blankPos)) {
                setWon(true);
                const elapsed = Math.floor((Date.now() - startRef.current) / 1000);
                setWonTime(formatTime(elapsed));
            }
        },
        [board, won, blankPos, timerStarted]
    );

    // Keyboard arrows
    const handleKeyDown = useCallback(
        (e) => {
            if (won) return;
            const blank = board.indexOf(0);
            const blankRow = Math.floor(blank / SIZE);
            const blankCol = blank % SIZE;
            let target = null;
            if (e.key === "ArrowUp" && blankRow < SIZE - 1) target = blank + SIZE;
            if (e.key === "ArrowDown" && blankRow > 0) target = blank - SIZE;
            if (e.key === "ArrowLeft" && blankCol < SIZE - 1) target = blank + 1;
            if (e.key === "ArrowRight" && blankCol > 0) target = blank - 1;
            if (target !== null) {
                e.preventDefault();
                handleTileClick(target);
            }
        },
        [board, won, handleTileClick]
    );

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    // Drag handlers
    const handlePointerDown = (index, e) => {
        if (won) return;
        if (!canSlide(index, board)) return;
        const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
        const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
        setDrag({ index, startX: clientX, startY: clientY, moved: false });
        dragMovedRef.current = false;
    };

    const handlePointerMove = useCallback(
        (e) => {
            if (!drag) return;
            const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
            const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
            const dx = clientX - drag.startX;
            const dy = clientY - drag.startY;
            const threshold = 20;
            if (Math.abs(dx) > threshold || Math.abs(dy) > threshold) {
                dragMovedRef.current = true;
                const absDx = Math.abs(dx);
                const absDy = Math.abs(dy);
                let dir = null;
                if (absDx > absDy) {
                    dir = dx > 0 ? "right" : "left";
                } else {
                    dir = dy > 0 ? "down" : "up";
                }
                const blank = board.indexOf(0);
                const tileRow = Math.floor(drag.index / SIZE);
                const tileCol = drag.index % SIZE;
                const blankRow = Math.floor(blank / SIZE);
                const blankCol = blank % SIZE;
                let canSlideDir = false;
                if (dir === "up" && tileRow === blankRow + 1 && tileCol === blankCol) canSlideDir = true;
                if (dir === "down" && tileRow === blankRow - 1 && tileCol === blankCol) canSlideDir = true;
                if (dir === "left" && tileCol === blankCol + 1 && tileRow === blankRow) canSlideDir = true;
                if (dir === "right" && tileCol === blankCol - 1 && tileRow === blankRow) canSlideDir = true;
                if (canSlideDir) {
                    handleTileClick(drag.index);
                    setDrag(null);
                } else {
                    setDrag(null);
                }
                e.preventDefault();
            }
        },
        [drag, board, handleTileClick]
    );

    const handlePointerUp = useCallback(() => {
        if (drag) {
            setDrag(null);
        }
    }, [drag]);

    useEffect(() => {
        window.addEventListener("mousemove", handlePointerMove);
        window.addEventListener("mouseup", handlePointerUp);
        window.addEventListener("touchmove", handlePointerMove, { passive: false });
        window.addEventListener("touchend", handlePointerUp);
        return () => {
            window.removeEventListener("mousemove", handlePointerMove);
            window.removeEventListener("mouseup", handlePointerUp);
            window.removeEventListener("touchmove", handlePointerMove);
            window.removeEventListener("touchend", handlePointerUp);
        };
    }, [handlePointerMove, handlePointerUp]);

    const cellSize = "clamp(70px, 14vw, 120px)";

    const renderTile = (value, index) => {
        if (value === 0) {
            return (
                <motion.div
                    key={`blank-${index}`}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    style={{
                        gridColumnStart: (index % SIZE) + 1,
                        gridRowStart: Math.floor(index / SIZE) + 1,
                        backgroundImage:
                            "repeating-linear-gradient(45deg, var(--smudge) 0, var(--smudge) 0.5px, transparent 0.5px, transparent 6px)," +
                            "repeating-linear-gradient(-45deg, var(--smudge) 0, var(--smudge) 0.5px, transparent 0.5px, transparent 6px)",
                        backgroundColor: "var(--ash)",
                        border: "1px solid " + TILE_SMUDGE,
                    }}
                />
            );
        }

        const { row, col } = getTilePosition(value, blankPos);
        const bgPosX = -col * 100;
        const bgPosY = -row * 100;

        return (
            <motion.button
                key={value}
                layout
                onClick={() => {
                    if (!dragMovedRef.current) {
                        handleTileClick(index);
                    }
                    dragMovedRef.current = false;
                }}
                onMouseDown={(e) => handlePointerDown(index, e)}
                onTouchStart={(e) => handlePointerDown(index, e)}
                disabled={won}
                className="focus:outline-none focus-visible:ring-1 focus-visible:ring-ink"
                style={{
                    gridColumnStart: (index % SIZE) + 1,
                    gridRowStart: Math.floor(index / SIZE) + 1,
                    backgroundImage: `url(${profileImg})`,
                    backgroundSize: "300% 300%",
                    backgroundPosition: `${bgPosX}% ${bgPosY}%`,
                    border: "1px solid " + TILE_SMUDGE,
                    boxShadow: "inset 0 0 0 0.5px rgba(26,26,26,0.03)",
                    cursor: "pointer",
                    transition: "background 0.2s ease, transform 0.2s ease",
                    touchAction: "none",
                    backgroundColor: TILE_PAPER,
                }}
                whileHover={{ y: -2, rotate: index % 2 ? -0.6 : 0.6 }}
                whileTap={{ scale: 0.96 }}
            />
        );
    };

    return (
        <>
            <motion.div
                variants={dreamCut}
                initial="initial"
                animate="animate"
                exit="exit"
                className="min-h-screen pt-8 md:pt-14"
            >
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-20">
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        animate="show"
                        className="flex flex-col items-start"
                    >
                        <motion.div variants={fadeUp} className="w-full">
                            <SectionLabel>△ play</SectionLabel>
                            <h2
                                className="font-display italic text-ink leading-[1.1] mb-3"
                                style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
                            >
                                sliding<br />puzzle
                            </h2>
                            <p className="font-serif text-sm md:text-[1rem] text-void italic mb-8 max-w-md">
                                ...a quiet square dance. put the image back together.
                            </p>
                        </motion.div>

                        <motion.div variants={fadeUp} className="relative w-full flex justify-center">
                            <SketchCard rotate={0.8} accent={TILE_ACCENT} className="inline-block w-full md:w-auto">
                                <div className="flex justify-center">
                                    <div
                                        className="relative select-none touch-none"
                                        role="grid"
                                        aria-label="Sliding puzzle"
                                        style={{
                                            display: "grid",
                                            gridTemplateColumns: `repeat(${SIZE}, ${cellSize})`,
                                            gridTemplateRows: `repeat(${SIZE}, ${cellSize})`,
                                            gap: "0",
                                            padding: "0",
                                            background: TILE_BONE,
                                            border: "1px solid " + TILE_SMUDGE,
                                            borderRadius: "2px",
                                            boxShadow: "inset 0 2px 8px rgba(26,26,26,0.05)",
                                        }}
                                    >
                                        <AnimatePresence>
                                            {board.map((value, index) => renderTile(value, index))}
                                        </AnimatePresence>

                                        <AnimatePresence>
                                            {won && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                                    className="absolute inset-0 flex flex-col items-center justify-center bg-bone/80 backdrop-blur-sm z-10 p-4 text-center"
                                                >
                                                    <p className="font-serif italic text-ink text-2xl md:text-3xl mb-1">Solved!</p>
                                                    <p className="font-mono text-sm text-void/70 mb-4">
                                                        {moves} moves · {wonTime ?? formatTime(seconds)}
                                                    </p>
                                                    <button
                                                        onClick={handleNewGame}
                                                        className="font-mono text-[0.62rem] tracking-[0.12em] text-void border border-smudge px-6 py-2.5 hover:bg-ink hover:text-bone hover:border-ink transition-all duration-300 rounded-[1px]"
                                                    >
                                                        Play Again ↺
                                                    </button>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </SketchCard>
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 hidden sm:block">
                                <TapeStrip color={TILE_ACCENT}>DRAG / CLICK / ARROWS</TapeStrip>
                            </div>
                        </motion.div>

                        {/* Stats + Shuffle + Sample row */}
                        <motion.div
                            variants={fadeUp}
                            className="w-full flex flex-wrap items-center justify-center gap-x-8 gap-y-4 mt-10"
                        >
                            <div className="flex items-baseline gap-3">
                                <span className="font-mono text-[0.58rem] text-void/70 tracking-[0.14em] uppercase">
                                    moves
                                </span>
                                <span className="font-serif italic text-ink text-2xl tabular-nums">{moves}</span>
                            </div>
                            <div className="flex items-baseline gap-3">
                                <span className="font-mono text-[0.58rem] text-void/70 tracking-[0.14em] uppercase">
                                    time
                                </span>
                                <span className="font-serif italic text-ink text-2xl tabular-nums">
                                    {formatTime(seconds)}
                                </span>
                            </div>
                            <button
                                onClick={handleNewGame}
                                className="font-mono text-[0.62rem] tracking-[0.12em] text-void border border-smudge px-5 py-2.5 hover:bg-ink hover:text-bone hover:border-ink transition-all duration-300 rounded-[1px]"
                            >
                                shuffle ↺
                            </button>
                            <button
                                onClick={() => setShowSample(true)}
                                className="font-mono text-[0.62rem] tracking-[0.12em] text-void border border-smudge px-5 py-2.5 hover:bg-ink hover:text-bone hover:border-ink transition-all duration-300 rounded-[1px]"
                            >
                                sample
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>

            {/* ---- Sample Modal ---- */}
            <AnimatePresence>
                {showSample && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
                        onClick={() => setShowSample(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="bg-bone border border-smudge rounded-sm p-6 max-w-sm w-full shadow-xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="font-serif italic text-ink text-lg mb-4 text-center">Solved Puzzle</h3>
                            <div
                                className="grid grid-cols-3 gap-0 w-48 h-48 mx-auto"
                                style={{ gridTemplateColumns: `repeat(3, 1fr)` }}
                            >
                                {solvedBoard(blankPos).map((val, idx) => {
                                    if (val === 0) {
                                        return (
                                            <div
                                                key={idx}
                                                className="border border-smudge"
                                                style={{
                                                    aspectRatio: "1/1",
                                                    backgroundImage:
                                                        "repeating-linear-gradient(45deg, var(--smudge) 0, var(--smudge) 0.5px, transparent 0.5px, transparent 6px)," +
                                                        "repeating-linear-gradient(-45deg, var(--smudge) 0, var(--smudge) 0.5px, transparent 0.5px, transparent 6px)",
                                                    backgroundColor: "var(--ash)",
                                                }}
                                            />
                                        );
                                    }
                                    const { row, col } = getTilePosition(val, blankPos);
                                    return (
                                        <div
                                            key={idx}
                                            className="border border-smudge"
                                            style={{
                                                aspectRatio: "1/1",
                                                backgroundImage: `url(${profileImg})`,
                                                backgroundSize: "300% 300%",
                                                backgroundPosition: `${-col * 100}% ${-row * 100}%`,
                                                backgroundColor: TILE_PAPER,
                                            }}
                                        />
                                    );
                                })}
                            </div>
                            <button
                                onClick={() => setShowSample(false)}
                                className="mt-6 mx-auto block font-mono text-[0.62rem] tracking-[0.12em] text-void border border-smudge px-5 py-2 hover:bg-ink hover:text-bone hover:border-ink transition-all duration-300 rounded-[1px]"
                            >
                                Close
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}