export default function Crosshatch({ className = "", label = "[ image ]" }) {
    return (
        <div
            className={`flex items-center justify-center ${className}`}
            style={{
                backgroundImage:
                    "repeating-linear-gradient(45deg, var(--smudge) 0, var(--smudge) 0.5px, transparent 0.5px, transparent 8px)," +
                    "repeating-linear-gradient(-45deg, var(--smudge) 0, var(--smudge) 0.5px, transparent 0.5px, transparent 8px)",
                backgroundColor: "var(--ash)",
            }}
        >
            <span className="font-mono text-[0.6rem] text-void tracking-widest">{label}</span>
        </div>
    );
}