import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { dreamCut, stagger, fadeUp } from "../../animations/variants";
import SectionLabel from "../common/SectionLabel";
import TapeStrip from "../common/TapeStrip";
import SketchCard from "../common/SketchCard";

export default function FlappyBird() {
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const animationIdRef = useRef(null);

    // Game state
    const birdRef = useRef({ y: 0, vy: 0 });
    const pipesRef = useRef([]);
    const particlesRef = useRef([]);
    const bloodPoolsRef = useRef([]);
    const frameRef = useRef(0);
    const stateRef = useRef("idle");      // 'idle', 'playing', 'dead'
    const scoreRef = useRef(0);

    // Constants
    const W = 680;
    const H = 420;
    const GROUND_Y = H - 36;
    const BIRD_X = 100;
    const BIRD_R = 11;
    const PIPE_W = 52;
    const GAP = 136;
    const PIPE_SPACING = 230;
    const GRAVITY = 0.22;
    const JUMP = -4.6;
    const SPEED = 2.4;
    const SPAWN_FRAMES = 28; // ~0.5s at 60fps

    // --- Helper functions -------------------------------------------------
    const makeEyes = (pipeH) => {
        const eyes = [];
        const count = pipeH > 120 ? 2 : 1;
        for (let i = 0; i < count; i++) {
            const ey = pipeH - 22 - i * 34;
            if (ey < 14) continue;
            eyes.push({ lx: PIPE_W * 0.3, rx: PIPE_W * 0.7, y: ey });
        }
        return eyes;
    };

    const makeBotEyes = (botY) => {
        const eyes = [];
        const available = GROUND_Y - botY;
        const count = available > 100 ? 2 : 1;
        for (let i = 0; i < count; i++) {
            const ey = 22 + i * 34;
            if (ey > available - 10) continue;
            eyes.push({ lx: PIPE_W * 0.3, rx: PIPE_W * 0.7, y: ey });
        }
        return eyes;
    };

    const spawnPipe = (x, fullyGrown = false) => {
        const topH = Math.random() * (GROUND_Y - GAP - 80) + 50;
        pipesRef.current.push({
            x,
            topH,
            botY: topH + GAP,
            passed: false,
            topEyes: makeEyes(topH),
            botEyes: makeBotEyes(topH + GAP),
            blinkT: Math.random() * 100,
            spawnProgress: fullyGrown ? 1 : 0,
        });
    };

    // Blood particles
    const spawnBlood = (x, y, hitGround) => {
        const count = 28;
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
            const speed = 1.5 + Math.random() * 4.5;
            const gravity = hitGround ? 0.18 : 0.08;
            particlesRef.current.push({
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - (hitGround ? 2.5 : 0),
                r: 2 + Math.random() * 4,
                life: 1,
                decay: 0.018 + Math.random() * 0.012,
                gravity,
                stuck: false,
            });
        }
        for (let i = 0; i < 6; i++) {
            particlesRef.current.push({
                x: x + (Math.random() - 0.5) * 16,
                y,
                vx: (Math.random() - 0.5) * 0.8,
                vy: 1.2 + Math.random() * 2.5,
                r: 1.5 + Math.random() * 2,
                life: 1,
                decay: 0.008 + Math.random() * 0.006,
                gravity: 0.12,
                stuck: false,
                drip: true,
            });
        }
    };

    const resetGame = () => {
        birdRef.current = { y: H / 2, vy: 0 };
        pipesRef.current = [];
        scoreRef.current = 0;
        frameRef.current = 0;
        particlesRef.current = [];
        bloodPoolsRef.current = [];
        stateRef.current = "playing";
        // First pipe fully grown (already on screen), subsequent ones animate in
        for (let i = 0; i < 3; i++) {
            spawnPipe(W + i * PIPE_SPACING, i === 0);
        }
    };

    const checkCollision = () => {
        const bird = birdRef.current;
        if (bird.y + BIRD_R >= GROUND_Y) return "ground";
        if (bird.y - BIRD_R <= 0) return "ceil";
        for (const p of pipesRef.current) {
            // Only collide with fully (or nearly) grown pipes
            if (p.spawnProgress < 0.5) continue;
            if (BIRD_X + BIRD_R > p.x && BIRD_X - BIRD_R < p.x + PIPE_W) {
                const t = p.spawnProgress;
                const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
                const topDrawH = p.topH * ease;
                const botStart = p.botY + (GROUND_Y - p.botY) * (1 - ease);
                if (bird.y - BIRD_R < topDrawH || bird.y + BIRD_R > botStart) return "pipe";
            }
        }
        return null;
    };

    // --- Drawing functions ------------------------------------------------
    const drawBackground = () => {
        const ctx = ctxRef.current;
        ctx.fillStyle = "#f5f2eb";
        ctx.fillRect(0, 0, W, H);
        ctx.strokeStyle = "rgba(26,26,26,0.04)";
        ctx.lineWidth = 0.5;
        for (let y2 = 0; y2 < GROUND_Y; y2 += 28) {
            ctx.beginPath();
            ctx.moveTo(0, y2);
            ctx.lineTo(W, y2);
            ctx.stroke();
        }
        const scribbles = [
            [60, 80], [200, 160], [450, 90], [580, 200],
            [120, 300], [380, 260], [620, 130],
        ];
        ctx.strokeStyle = "rgba(26,26,26,0.05)";
        ctx.lineWidth = 0.7;
        for (const [sx, sy] of scribbles) {
            ctx.beginPath();
            ctx.moveTo(sx, sy);
            ctx.bezierCurveTo(sx + 10, sy - 8, sx + 20, sy + 4, sx + 14, sy + 10);
            ctx.stroke();
        }
        ctx.fillStyle = "#1a1a1a";
        ctx.fillRect(0, GROUND_Y, W, H - GROUND_Y);
        ctx.strokeStyle = "#f5f2eb";
        ctx.lineWidth = 0.8;
        ctx.setLineDash([4, 10]);
        ctx.beginPath();
        ctx.moveTo(0, GROUND_Y + 2);
        ctx.lineTo(W, GROUND_Y + 2);
        ctx.stroke();
        ctx.setLineDash([]);
    };

    const drawBloodPools = () => {
        const ctx = ctxRef.current;
        for (const pool of bloodPoolsRef.current) {
            ctx.save();
            ctx.globalAlpha = pool.alpha;
            ctx.fillStyle = "#8b0000";
            ctx.beginPath();
            ctx.ellipse(pool.x, pool.y, pool.rx, pool.ry, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    };

    const updateParticles = () => {
        for (let i = particlesRef.current.length - 1; i >= 0; i--) {
            const p = particlesRef.current[i];
            if (p.stuck) {
                p.life -= 0.004;
                if (p.life <= 0) particlesRef.current.splice(i, 1);
                continue;
            }
            p.vy += p.gravity;
            p.x += p.vx;
            p.y += p.vy;
            p.life -= p.decay;

            if (p.y >= GROUND_Y - 2) {
                p.y = GROUND_Y - 2;
                p.stuck = true;
                p.vx = 0;
                p.vy = 0;
                bloodPoolsRef.current.push({
                    x: p.x,
                    y: GROUND_Y - 1,
                    rx: p.r * (1.5 + Math.random()),
                    ry: p.r * 0.4,
                    alpha: 0.7 + Math.random() * 0.2,
                });
            }
            if (p.x <= 0 || p.x >= W) p.stuck = true;
            if (p.life <= 0) particlesRef.current.splice(i, 1);
        }
    };

    const drawParticles = () => {
        const ctx = ctxRef.current;
        for (const p of particlesRef.current) {
            ctx.save();
            ctx.globalAlpha = p.life * 0.9;
            ctx.fillStyle = p.life > 0.5 ? "#c0001a" : "#8b0000";
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    };

    const drawEye = (absX, absY, blink) => {
        const ctx = ctxRef.current;
        const bird = birdRef.current;
        const ER = 7;
        if (blink) {
            ctx.fillStyle = "#f5f2eb";
            ctx.strokeStyle = "#1a1a1a";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.ellipse(absX, absY, ER, 1.5, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            return;
        }
        ctx.fillStyle = "#f5f2eb";
        ctx.strokeStyle = "#1a1a1a";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(absX, absY, ER, ER * 0.75, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        const dx = Math.min(Math.max(BIRD_X - absX, -3), 3);
        const dy = Math.min(Math.max(bird.y - absY, -2), 2);
        ctx.fillStyle = "#1a1a1a";
        ctx.beginPath();
        ctx.ellipse(absX + dx, absY + dy, 3.5, 3, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#f5f2eb";
        ctx.beginPath();
        ctx.arc(absX + dx - 1.2, absY + dy - 1.2, 1, 0, Math.PI * 2);
        ctx.fill();
    };

    const drawPipe = (p) => {
        const ctx = ctxRef.current;
        const blink = Math.sin((frameRef.current - p.blinkT) * 0.08) > 0.96;

        // Quadratic ease-in-out for smooth growth
        const t = p.spawnProgress;
        const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

        // Top pipe grows downward from the ceiling
        const topDrawH = p.topH * ease;
        // Bottom pipe grows upward from the ground
        const botStart = p.botY + (GROUND_Y - p.botY) * (1 - ease);
        const botDrawH = GROUND_Y - botStart;

        ctx.save();
        ctx.globalAlpha = 0.15 + ease * 0.85; // subtle fade-in alongside the grow

        // Top pipe
        ctx.fillStyle = "#1a1a1a";
        ctx.fillRect(p.x, 0, PIPE_W, topDrawH);
        ctx.strokeStyle = "rgba(245,242,235,0.1)";
        ctx.lineWidth = 0.5;
        ctx.strokeRect(p.x, 0, PIPE_W, topDrawH);

        // Bottom pipe
        ctx.fillStyle = "#1a1a1a";
        ctx.fillRect(p.x, botStart, PIPE_W, botDrawH);
        ctx.strokeStyle = "rgba(245,242,235,0.1)";
        ctx.lineWidth = 0.5;
        ctx.strokeRect(p.x, botStart, PIPE_W, botDrawH);

        ctx.restore();

        // Draw eyes only once pipes are nearly fully grown, then fade them in
        if (ease > 0.85) {
            const eyeAlpha = (ease - 0.85) / 0.15;
            ctx.save();
            ctx.globalAlpha = eyeAlpha;
            for (const e of p.topEyes) {
                drawEye(p.x + e.lx, e.y, blink);
                drawEye(p.x + e.rx, e.y, blink);
            }
            for (const e of p.botEyes) {
                drawEye(p.x + e.lx, p.botY + e.y, blink);
                drawEye(p.x + e.rx, p.botY + e.y, blink);
            }
            ctx.restore();
        }
    };

    const drawBird = () => {
        const ctx = ctxRef.current;
        const x = BIRD_X;
        const y = birdRef.current.y;
        const tilt = Math.min(Math.max(birdRef.current.vy * 4, -25), 45);
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate((tilt * Math.PI) / 180);
        const s = 18;
        ctx.fillStyle = "#f5f2eb";
        ctx.fillRect(-s / 2, -s / 2, s, s);
        ctx.strokeStyle = "#1a1a1a";
        ctx.lineWidth = 1.5;
        ctx.strokeRect(-s / 2, -s / 2, s, s);

        ctx.fillStyle = "#1a1a1a";
        if (stateRef.current === "dead") {
            ctx.lineWidth = 1.2;
            ctx.strokeStyle = "#1a1a1a";
            ctx.beginPath();
            ctx.moveTo(-5, -4);
            ctx.lineTo(-2, -1);
            ctx.moveTo(-2, -4);
            ctx.lineTo(-5, -1);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(2, -4);
            ctx.lineTo(5, -1);
            ctx.moveTo(5, -4);
            ctx.lineTo(2, -1);
            ctx.stroke();
        } else {
            ctx.beginPath();
            ctx.arc(-3.5, -2.5, 1.8, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(3.5, -2.5, 1.8, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.strokeStyle = "#1a1a1a";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(-3, 4);
        ctx.lineTo(3, 4);
        ctx.stroke();
        ctx.restore();
    };

    const drawHUD = () => {
        const ctx = ctxRef.current;
        const scoreText = String(scoreRef.current);
        const fontSize = 26;
        ctx.font = `bold ${fontSize}px 'IM Fell English', Georgia, serif`;
        ctx.textAlign = "center";

        const textMetrics = ctx.measureText(scoreText);
        const textWidth = textMetrics.width;
        const textHeight = fontSize * 0.8;
        const textX = W / 2 - textWidth / 2;
        const textY = 52;
        const textTop = textY - textHeight;

        let overlappingPipe = false;
        for (const pipe of pipesRef.current) {
            const topPipeRect = { x: pipe.x, y: 0, w: PIPE_W, h: pipe.topH };
            const bottomPipeRect = { x: pipe.x, y: pipe.botY, w: PIPE_W, h: GROUND_Y - pipe.botY };

            const rectIntersect = (r1, r2) => {
                return !(r2.x > r1.x + r1.w ||
                    r2.x + r2.w < r1.x ||
                    r2.y > r1.y + r1.h ||
                    r2.y + r2.h < r1.y);
            };

            if (rectIntersect({ x: textX, y: textTop, w: textWidth, h: textHeight }, topPipeRect) ||
                rectIntersect({ x: textX, y: textTop, w: textWidth, h: textHeight }, bottomPipeRect)) {
                overlappingPipe = true;
                break;
            }
        }

        ctx.fillStyle = overlappingPipe ? "#ffffff" : "#1a1a1a";
        ctx.fillText(scoreText, W / 2, 52);
        ctx.textAlign = "left";
    };

    const drawIdle = () => {
        const ctx = ctxRef.current;
        ctx.save();
        ctx.textAlign = "center";
        const bx = W / 2;
        const by = H / 2 - 20;
        ctx.fillStyle = "rgba(245,242,235,0.92)";
        ctx.fillRect(bx - 160, by - 30, 320, 66);
        ctx.strokeStyle = "#1a1a1a";
        ctx.lineWidth = 0.8;
        ctx.strokeRect(bx - 160, by - 30, 320, 66);
        ctx.fillStyle = "#1a1a1a";
        ctx.font = "italic 16px 'IM Fell English', Georgia, serif";
        ctx.fillText("...they're watching you.", bx, by - 6);
        ctx.font = "11px 'Space Mono', monospace";
        ctx.fillStyle = "#9a9690";
        ctx.fillText("tap / space to begin", bx, by + 18);
        ctx.textAlign = "left";
        ctx.restore();
    };

    const drawDead = () => {
        const ctx = ctxRef.current;
        ctx.save();
        ctx.textAlign = "center";
        const bx = W / 2;
        const by = H / 2 - 30;
        ctx.fillStyle = "rgba(245,242,235,0.92)";
        ctx.fillRect(bx - 160, by - 34, 320, 90);
        ctx.strokeStyle = "#1a1a1a";
        ctx.lineWidth = 0.8;
        ctx.strokeRect(bx - 160, by - 34, 320, 90);
        ctx.fillStyle = "#1a1a1a";
        ctx.font = "italic 18px 'IM Fell English', Georgia, serif";
        ctx.fillText("...i couldn't escape them.", bx, by - 8);
        ctx.font = "13px 'Space Mono', monospace";
        ctx.fillStyle = "#2d2b28";
        ctx.fillText("score: " + scoreRef.current, bx, by + 14);
        ctx.font = "10px 'Space Mono', monospace";
        ctx.fillStyle = "#9a9690";
        ctx.fillText("try again →", bx, by + 36);
        ctx.textAlign = "left";
        ctx.restore();
    };

    // --- Game Loop -------------------------------------------------------
    const gameLoop = () => {
        frameRef.current++;

        if (stateRef.current === "playing") {
            birdRef.current.vy += GRAVITY;
            birdRef.current.y += birdRef.current.vy;

            for (const p of pipesRef.current) {
                p.x -= SPEED;
                // Advance spawn animation
                if (p.spawnProgress < 1) {
                    p.spawnProgress = Math.min(1, p.spawnProgress + 1 / SPAWN_FRAMES);
                }
                if (!p.passed && p.x + PIPE_W < BIRD_X) {
                    p.passed = true;
                    scoreRef.current++;
                }
            }

            if (pipesRef.current.length && pipesRef.current[0].x + PIPE_W < 0) {
                pipesRef.current.shift();
                const last = pipesRef.current[pipesRef.current.length - 1];
                spawnPipe(last.x + PIPE_SPACING); // new pipes always animate in
            }

            const hit = checkCollision();
            if (hit) {
                stateRef.current = "dead";
                const birdY = hit === "ground" ? GROUND_Y - BIRD_R : birdRef.current.y;
                spawnBlood(BIRD_X, birdY, hit === "ground");
            }
        }

        updateParticles();

        drawBackground();
        drawBloodPools();
        for (const p of pipesRef.current) drawPipe(p);
        drawParticles();
        if (stateRef.current !== "dead") drawBird();
        drawHUD();
        if (stateRef.current === "idle") drawIdle();
        if (stateRef.current === "dead") drawDead();

        animationIdRef.current = requestAnimationFrame(gameLoop);
    };

    // --- Jump / reset ----------------------------------------------------
    const jump = () => {
        if (stateRef.current === "idle" || stateRef.current === "dead") {
            resetGame();
        } else if (stateRef.current === "playing") {
            birdRef.current.vy = JUMP;
        }
    };

    // --- Setup & cleanup ------------------------------------------------
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctxRef.current = ctx;

        birdRef.current = { y: H / 2, vy: 0 };
        pipesRef.current = [];
        scoreRef.current = 0;
        frameRef.current = 0;
        particlesRef.current = [];
        bloodPoolsRef.current = [];
        stateRef.current = "idle";

        drawBackground();
        drawBird();
        drawIdle();

        animationIdRef.current = requestAnimationFrame(gameLoop);

        const handleKeyDown = (e) => {
            if (e.code === "Space") {
                e.preventDefault();
                jump();
            }
        };
        const handlePointerDown = (e) => {
            e.preventDefault();
            jump();
        };

        window.addEventListener("keydown", handleKeyDown);
        canvas.addEventListener("pointerdown", handlePointerDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            canvas.removeEventListener("pointerdown", handlePointerDown);
            if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // --- RENDER with portfolio UI elements ------------------------------
    return (
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
                            flappy<br />bird
                        </h2>
                        <p className="font-serif text-sm md:text-[1rem] text-void italic mb-8 max-w-md">
                            ...a tiny, restless thing. tap to keep it from the pipes.
                        </p>
                    </motion.div>

                    <motion.div variants={fadeUp} className="relative w-full flex justify-center">
                        <SketchCard rotate={0.8} accent="#e8cdd4" className="inline-block w-full md:w-auto">
                            <div className="flex justify-center">
                                <canvas
                                    ref={canvasRef}
                                    className="flappy-canvas block border border-smudge w-full h-auto max-w-full"
                                    width={W}
                                    height={H}
                                    style={{ display: "block", width: "100%", height: "auto", maxWidth: "100%" }}
                                />
                            </div>
                        </SketchCard>
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 hidden sm:block">
                            <TapeStrip color="#d4c9e8">TAP / SPACE</TapeStrip>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Fixed: removed 'jsx' attribute */}
            <style>{`
                .flappy-canvas {
                    cursor: crosshair;
                    touch-action: manipulation;
                }
                @media (max-width: 640px) {
                    .flappy-canvas {
                        border-width: 1px;
                    }
                }
            `}</style>

            <link
                href="https://fonts.googleapis.com/css2?family=IM+Fell+English:ital@0;1&family=Space+Mono:wght@400;700&display=swap"
                rel="stylesheet"
            />
        </motion.div>
    );
}