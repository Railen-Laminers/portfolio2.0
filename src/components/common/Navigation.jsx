import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { NAV } from "../../data/navData";

export default function Navigation() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const closeMenu = () => setIsMenuOpen(false);
    const toggleMenu = () => setIsMenuOpen((prev) => !prev);

    const getActiveId = () => {
        const path = location.pathname.slice(1);
        return path === "" ? "home" : path;
    };

    const handleLinkClick = (id) => {
        navigate(id === "home" ? "/" : `/${id}`);
        closeMenu();
    };

    // Find current index for page marker (1-based)
    const currentIndex = NAV.findIndex((n) => n.id === getActiveId()) + 1;
    const totalPages = NAV.length;

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-bone/90 backdrop-blur-sm border-b border-ash">
            {/* ===== DESKTOP NAVIGATION (md and up) ===== */}
            <div className="hidden md:block">
                <nav className="max-w-6xl mx-auto px-6 flex items-stretch h-14">
                    <button
                        onClick={() => handleLinkClick("home")}
                        className="font-display italic text-[1.05rem] text-ink pr-6 border-r border-ash mr-6 flex items-center shrink-0 transition-opacity hover:opacity-60"
                    >
                        ◈
                    </button>

                    <div className="flex items-stretch gap-0">
                        {NAV.map((item) => {
                            const isActive = getActiveId() === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => handleLinkClick(item.id)}
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
                                            fontSize: "0.75rem",
                                            color: isActive ? "#1a1a1a" : "#000000",
                                            opacity: isActive ? 1 : 0.65,
                                        }}
                                    >
                                        {item.glyph}
                                    </span>
                                    <span
                                        className="transition-all duration-300"
                                        style={{
                                            fontFamily: "'Space Mono', monospace",
                                            fontStyle: "normal",
                                            fontSize: "0.62rem",
                                            letterSpacing: "0.1em",
                                            color: isActive ? "#1a1a1a" : "#9a9690",
                                            textTransform: "uppercase",
                                            fontWeight: isActive ? "500" : "400",
                                        }}
                                    >
                                        {item.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="ml-auto flex items-center">
                        <span className="font-mono text-[0.55rem] text-smudge tracking-widest">
                            {String(currentIndex).padStart(2, "0")} / {String(totalPages).padStart(2, "0")}
                        </span>
                    </div>
                </nav>
            </div>

            {/* ===== MOBILE NAVIGATION (below md) ===== */}
            <div className="md:hidden">
                <div className="flex items-center justify-between h-14 px-4 sm:px-6">
                    <button
                        onClick={() => handleLinkClick("home")}
                        className="font-display italic text-[1.05rem] text-ink flex items-center transition-opacity hover:opacity-60"
                    >
                        ◈
                    </button>
                    <div className="flex items-center gap-3">
                        <span className="font-mono text-[0.55rem] text-smudge tracking-widest">
                            {String(currentIndex).padStart(2, "0")} / {String(totalPages).padStart(2, "0")}
                        </span>
                        <button
                            onClick={toggleMenu}
                            className="flex flex-col items-center justify-center w-8 h-8 rounded-md transition-colors hover:bg-ash/10 focus:outline-none"
                            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        >
                            <div className="relative w-5 h-5">
                                <span className={`absolute h-0.5 w-5 bg-ink rounded-full transition-all duration-300 ${isMenuOpen ? "rotate-45 top-2" : "top-0"}`} />
                                <span className={`absolute h-0.5 w-5 bg-ink rounded-full transition-all duration-300 top-2 ${isMenuOpen ? "opacity-0" : "opacity-100"}`} />
                                <span className={`absolute h-0.5 w-5 bg-ink rounded-full transition-all duration-300 ${isMenuOpen ? "-rotate-45 top-2" : "top-4"}`} />
                            </div>
                        </button>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="absolute top-14 left-0 right-0 bg-bone/95 backdrop-blur-sm border-b border-ash shadow-lg z-40 animate-in slide-in-from-top-2 duration-200">
                        <div className="flex flex-col py-2">
                            {NAV.map((item) => {
                                const isActive = getActiveId() === item.id;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => handleLinkClick(item.id)}
                                        className={`flex items-center gap-4 px-6 py-3 w-full text-left transition-colors ${isActive ? "bg-ash/10" : "hover:bg-ash/5"}`}
                                    >
                                        <span
                                            className="text-base"
                                            style={{
                                                fontFamily: "'IM Fell English', Georgia, serif",
                                                color: isActive ? "#1a1a1a" : "#000000",
                                                opacity: isActive ? 1 : 0.65,
                                            }}
                                        >
                                            {item.glyph}
                                        </span>
                                        <span
                                            className="text-sm"
                                            style={{
                                                fontFamily: "'Space Mono', monospace",
                                                fontStyle: "normal",
                                                letterSpacing: "0.05em",
                                                color: isActive ? "#1a1a1a" : "#9a9690",
                                                textTransform: "uppercase",
                                                fontWeight: isActive ? "500" : "400",
                                            }}
                                        >
                                            {item.label}
                                        </span>
                                        {isActive && <span className="ml-auto text-xs text-ink/50">●</span>}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}