import { useState } from "react";
import { motion } from "framer-motion";

export default function SketchCard({ children, rotate = 0, accent = null, className = "" }) {
    const [hovered, setHovered] = useState(false);
    return (
        <motion.div
            className={`relative bg-paper border border-smudge rounded-[2px] p-6 ${className}`}
            animate={{
                rotate: hovered ? 0 : rotate,
                y: hovered ? -4 : 0,
                boxShadow: hovered ? "0 10px 40px rgba(0,0,0,0.15)" : "0 2px 8px rgba(0,0,0,0.06)",
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
        >
            {accent && (
                <div
                    className="absolute -top-[4px] left-5 w-12 h-2"
                    style={{ background: accent, opacity: 0.72, transform: "rotate(-1deg)" }}
                />
            )}
            {children}
        </motion.div>
    );
}