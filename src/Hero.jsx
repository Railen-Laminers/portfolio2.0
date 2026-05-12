import { useState, useEffect, useRef } from "react";

export default function Hero() {
    const [typedName, setTypedName] = useState("");
    const fullName = "Railen";
    const canvasRef = useRef(null);

    // Typewriter effect
    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            if (i <= fullName.length) {
                setTypedName(fullName.slice(0, i));
                i++;
            } else {
                clearInterval(interval);
            }
        }, 100);
        return () => clearInterval(interval);
    }, []);

    // Ink edge canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
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

        function resize() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            topEdge = buildEdge(canvas.width);
            bottomEdge = buildEdge(canvas.width);
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
        <div className="flex flex-col h-screen w-full bg-white">
            {/* Top black bar */}
            <div className="bg-black h-[15vh] w-full z-10"></div>

            {/* Middle section */}
            <div className="flex-1 bg-white relative overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full pointer-events-none"
                />

                {/* Portfolio text */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20 w-[90%] max-w-[650px] bg-white/94 backdrop-blur-sm p-8 md:p-10 border border-black shadow-[12px_12px_0_rgba(0,0,0,0.08)] pointer-events-none">
                    <p className="text-xs md:text-sm tracking-[6px] uppercase text-neutral-800 mb-4 font-light">
                        Portfolio of
                    </p>
                    <h1 className="text-3xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-black flex items-baseline justify-center gap-1 flex-wrap">
                        {typedName}
                        <span className="inline-block w-[2px] h-7 bg-black ml-1 animate-pulse"></span>
                    </h1>
                    <div className="w-12 h-[2px] bg-black/50 mx-auto my-6"></div>
                    <p className="text-[0.7rem] md:text-xs tracking-[2px] uppercase text-neutral-600 font-light">
                        design · art · direction
                    </p>
                </div>
            </div>

            {/* Bottom black bar */}
            <div className="bg-black h-[15vh] w-full z-10"></div>
        </div>
    );
}