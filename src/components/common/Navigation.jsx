// src/components/common/Navigation.jsx
import { NAV } from "../../data/navData";

export default function Navigation({ active, onNavigate }) {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-bone/90 backdrop-blur-sm border-b border-ash">
            <nav className="max-w-6xl mx-auto px-6 flex items-stretch h-14">
                {/* Logo */}
                <button
                    onClick={() => onNavigate("about")}
                    className="font-display italic text-[1.05rem] text-ink pr-6 border-r border-ash mr-6 flex items-center shrink-0 transition-opacity hover:opacity-60"
                >
                    ◈ you
                </button>

                {/* Links */}
                <div className="flex items-stretch gap-0">
                    {NAV.map((item) => {
                        const isActive = active === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => onNavigate(item.id)}
                                className={[
                                    "relative flex items-center gap-2 px-5 h-full transition-all duration-300",
                                    "border-b-2",
                                    isActive ? "border-ink" : "border-transparent",
                                ].join(" ")}
                            >
                                <span
                                    className="transition-all duration-300"
                                    style={{
                                        fontFamily: "'IM Fell English', Georgia, serif",
                                        fontSize: isActive ? "0.85rem" : "0.75rem",
                                        color: item.accent,
                                        opacity: isActive ? 1 : 0.65,
                                    }}
                                >
                                    {item.glyph}
                                </span>
                                <span
                                    className="transition-all duration-300"
                                    style={{
                                        fontFamily: isActive
                                            ? "'IM Fell English', Georgia, serif"
                                            : "'Space Mono', monospace",
                                        fontStyle: isActive ? "italic" : "normal",
                                        fontSize: isActive ? "0.95rem" : "0.62rem",
                                        letterSpacing: isActive ? "0" : "0.1em",
                                        color: isActive ? "#1a1a1a" : "#9a9690",
                                        textTransform: isActive ? "none" : "uppercase",
                                    }}
                                >
                                    {item.label}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Spacer + page marker */}
                <div className="ml-auto flex items-center">
                    <span className="font-mono text-[0.55rem] text-smudge tracking-widest hidden md:block">
                        {String(NAV.findIndex((n) => n.id === active) + 1).padStart(2, "0")} / 04
                    </span>
                </div>
            </nav>
        </header>
    );
}