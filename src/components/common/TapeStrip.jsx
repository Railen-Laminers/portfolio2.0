// src/components/common/TapeStrip.jsx
export default function TapeStrip({ color, children, tilt = -0.5 }) {
    return (
        <span
            className="inline-block px-3 py-[3px] text-[0.6rem] tracking-widest font-mono"
            style={{
                background: color,
                color: "#1a1a1a",
                opacity: 0.78,
                transform: `rotate(${tilt}deg)`,
            }}
        >
            {children}
        </span>
    );
}