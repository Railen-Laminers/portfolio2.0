import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

export default function Layout({ children }) {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const scrollRef = useRef(null);

    // Track scroll progress within the scrollable middle container
    const { scrollYProgress } = useScroll({ container: scrollRef });

    // Smoother spring — lower stiffness + higher damping = slower, silkier glide
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 30,   // was 60 — lower = more gradual response
        damping: 20,     // was 25 — balanced to avoid oscillation
        restDelta: 0.001,
    });

    // Map smoothed scroll 0→0.5 to bar height 15vh→6vh
    // Wider input range (0→0.5 instead of 0→0.3) means the shrink happens
    // over a longer scroll distance, feeling more deliberate and smooth
    const barHeight = useTransform(smoothProgress, [0, 0.5], ["15vh", "6vh"]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;
        const ctx = canvas.getContext("2d");

        function buildEdge(width) {
            const segs = [];
            let x = 0;
            while (x < width + 40) {
                const w = 14 + Math.random() * 22;
                const h = 4 + Math.random() * 12;
                segs.push({ x, w, h });
                x += w * 0.7;
            }
            return segs;
        }

        let topEdge = [];
        let bottomEdge = [];
        let rafId;
        let lastWidth = 0;
        let lastHeight = 0;

        function resize() {
            const width = container.clientWidth;
            const height = container.clientHeight;
            if (width === 0 && height === 0) return;
            canvas.width = width;
            canvas.height = height;
            topEdge = buildEdge(width);
            bottomEdge = buildEdge(width);
            lastWidth = width;
            lastHeight = height;
        }

        function drawTopEdge() {
            ctx.save();
            ctx.fillStyle = "#000";
            ctx.beginPath();
            ctx.moveTo(-10, 0);
            topEdge.forEach((seg) => {
                const mx = seg.x + seg.w * 0.5;
                ctx.quadraticCurveTo(seg.x, seg.h, mx, seg.h * 0.3);
                ctx.quadraticCurveTo(seg.x + seg.w, seg.h * 0.7, seg.x + seg.w, 0);
            });
            ctx.lineTo(canvas.width + 10, 0);
            ctx.lineTo(-10, 0);
            ctx.fill();
            ctx.restore();
        }

        function drawBottomEdge() {
            const h = canvas.height;
            ctx.save();
            ctx.fillStyle = "#000";
            ctx.beginPath();
            ctx.moveTo(-10, h);
            bottomEdge.forEach((seg) => {
                const mx = seg.x + seg.w * 0.5;
                ctx.quadraticCurveTo(seg.x, h - seg.h, mx, h - seg.h * 0.3);
                ctx.quadraticCurveTo(seg.x + seg.w, h - seg.h * 0.7, seg.x + seg.w, h);
            });
            ctx.lineTo(canvas.width + 10, h);
            ctx.lineTo(-10, h);
            ctx.fill();
            ctx.restore();
        }

        function loop() {
            const width = container.clientWidth;
            const height = container.clientHeight;
            if (width !== lastWidth || height !== lastHeight) {
                resize();
            }
            if (canvas.width === 0) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawTopEdge();
            drawBottomEdge();
            rafId = requestAnimationFrame(loop);
        }

        resize();
        loop();

        window.addEventListener("resize", resize);
        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <div className="flex flex-col h-screen">
            {/* Top black bar – shrinks smoothly on scroll */}
            <motion.div
                style={{ height: barHeight }}
                className="bg-black w-full shrink-0 overflow-hidden"
            />

            {/* Middle area with ink canvas overlay */}
            <div ref={containerRef} className="relative flex-1 bg-white overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full pointer-events-none z-10"
                />
                {/* Scrollable content lives here — scrollRef is the scroll container */}
                <div
                    ref={scrollRef}
                    className="relative z-20 h-full overflow-y-auto"
                >
                    {children}
                </div>
            </div>

            {/* Bottom black bar – shrinks smoothly on scroll */}
            <motion.div
                style={{ height: barHeight }}
                className="bg-black w-full shrink-0 overflow-hidden"
            />
        </div>
    );
}