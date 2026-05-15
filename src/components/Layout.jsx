import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

export default function Layout({ children }) {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const scrollRef = useRef(null);

    const { scrollYProgress } = useScroll({ container: scrollRef });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 30,
        damping: 20,
        restDelta: 0.001,
    });

    const barHeight = useTransform(
        smoothProgress,
        [0, 0.5],
        ["15vh", "6vh"]
    );

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        const scrollEl = scrollRef.current;

        if (!canvas || !container || !scrollEl) return;

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

        // scroll-driven animation state
        let turbulence = 0;
        let targetTurbulence = 0;
        let lastScrollTop = 0;

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

        function handleScroll() {
            const current = scrollEl.scrollTop;
            const delta = Math.abs(current - lastScrollTop);

            lastScrollTop = current;

            targetTurbulence = Math.min(delta * 0.8, 25);
        }

        scrollEl.addEventListener("scroll", handleScroll);

        function drawTopEdge(time) {
            ctx.save();
            ctx.fillStyle = "#000";
            ctx.beginPath();
            ctx.moveTo(-10, 0);

            topEdge.forEach((seg, i) => {
                const wobble =
                    Math.sin(time * 0.005 + i) * turbulence;

                const h = seg.h + wobble;

                const mx = seg.x + seg.w * 0.5;

                ctx.quadraticCurveTo(seg.x, h, mx, h * 0.3);
                ctx.quadraticCurveTo(
                    seg.x + seg.w,
                    h * 0.7,
                    seg.x + seg.w,
                    0
                );
            });

            ctx.lineTo(canvas.width + 10, 0);
            ctx.lineTo(-10, 0);
            ctx.fill();
            ctx.restore();
        }

        function drawBottomEdge(time) {
            const hCanvas = canvas.height;

            ctx.save();
            ctx.fillStyle = "#000";
            ctx.beginPath();
            ctx.moveTo(-10, hCanvas);

            bottomEdge.forEach((seg, i) => {
                const wobble =
                    Math.sin(time * 0.005 + i) * turbulence;

                const h = seg.h + wobble;

                const mx = seg.x + seg.w * 0.5;

                ctx.quadraticCurveTo(
                    seg.x,
                    hCanvas - h,
                    mx,
                    hCanvas - h * 0.3
                );

                ctx.quadraticCurveTo(
                    seg.x + seg.w,
                    hCanvas - h * 0.7,
                    seg.x + seg.w,
                    hCanvas
                );
            });

            ctx.lineTo(canvas.width + 10, hCanvas);
            ctx.lineTo(-10, hCanvas);
            ctx.fill();
            ctx.restore();
        }

        function loop(time) {
            const width = container.clientWidth;
            const height = container.clientHeight;

            if (width !== lastWidth || height !== lastHeight) {
                resize();
            }

            if (canvas.width === 0) {
                rafId = requestAnimationFrame(loop);
                return;
            }

            // smooth turbulence decay
            turbulence += (targetTurbulence - turbulence) * 0.08;
            targetTurbulence *= 0.92;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            drawTopEdge(time);
            drawBottomEdge(time);

            rafId = requestAnimationFrame(loop);
        }

        resize();
        loop();

        window.addEventListener("resize", resize);

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener("resize", resize);
            scrollEl.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="flex flex-col h-screen">
            {/* Top bar */}
            <motion.div
                style={{ height: barHeight }}
                className="bg-black w-full shrink-0 overflow-hidden"
            />

            {/* Middle */}
            <div
                ref={containerRef}
                className="relative flex-1 bg-white overflow-hidden"
            >
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full pointer-events-none z-10"
                />

                <div
                    ref={scrollRef}
                    className="relative z-20 h-full overflow-y-auto"
                >
                    {children}
                </div>
            </div>

            {/* Bottom bar */}
            <motion.div
                style={{ height: barHeight }}
                className="bg-black w-full shrink-0 overflow-hidden"
            />
        </div>
    );
}