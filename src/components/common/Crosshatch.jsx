// src/components/common/Crosshatch.jsx
export default function Crosshatch({ className = "", label = "[ asset ]" }) {
    return (
        <div
            className={`flex items-center justify-center ${className}`}
            style={{
                backgroundImage:
                    "repeating-linear-gradient(45deg,#c4bfb0 0,#c4bfb0 .5px,transparent .5px,transparent 8px)," +
                    "repeating-linear-gradient(-45deg,#c4bfb0 0,#c4bfb0 .5px,transparent .5px,transparent 8px)",
                backgroundColor: "#e8e4d9",
            }}
        >
            <span className="font-mono text-[0.6rem] text-smudge tracking-widest">{label}</span>
        </div>
    );
}