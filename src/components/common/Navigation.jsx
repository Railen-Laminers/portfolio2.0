import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { NAV } from "../../data/navData";

// ── OMORI Eye Icon Components ────────────────────────────────────────────────

function EyeOpen({ size = 28 }) {
    return (
        <svg
            width={size}
            height={size * 0.72}
            viewBox="0 0 64 46"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="block"
        >
            <line x1="22" y1="8" x2="20" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="32" y1="6" x2="32" y2="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="42" y1="8" x2="44" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M5 23 C13 11 51 11 59 23 C51 35 13 35 5 23 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            <circle cx="32" cy="23" r="10" fill="currentColor" />
            {/* Use CSS variable for pupil and highlight so they adapt to dark mode */}
            <circle cx="32" cy="23" r="4" fill="currentColor" />
            <circle cx="36" cy="19" r="1.5" fill="var(--fog)" />
            <circle cx="28" cy="27" r="1" fill="var(--fog)" />
            <line x1="20" y1="34" x2="18" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="32" y1="36" x2="32" y2="42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="44" y1="34" x2="46" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

function EyeClosed({ size = 28 }) {
    return (
        <svg
            width={size}
            height={size * 0.72}
            viewBox="0 0 64 46"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="block"
        >
            <path d="M10 22 Q32 28 54 22" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <path d="M16 27 Q32 31 48 27" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.25" />
            <line x1="22" y1="25" x2="20" y2="31" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="32" y1="27" x2="32" y2="34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="42" y1="25" x2="44" y2="31" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

// ── Dark Mode Toggle Button ──────────────────────────────────────────────────

function DarkModeToggle({ isDark, onToggle }) {
    return (
        <button
            onClick={onToggle}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "dark mode" : "light mode"}
            className="flex items-center group transition-opacity hover:opacity-60 bg-none border-none cursor-pointer p-[2px_4px]"
        >
            <span
                className={`transition-all duration-300 text-ink ${isDark ? "translate-y-px" : "translate-y-0"}`}
            >
                {isDark ? <EyeClosed size={26} /> : <EyeOpen size={26} />}
            </span>
        </button>
    );
}

// ── Reusable Navigation Link ────────────────────────────────────────────────

function NavLink({ item, isActive, onClick, mobile = false }) {
    const baseClasses = mobile
        ? "flex items-center gap-4 px-6 py-3 w-full text-left transition-colors"
        : "relative flex items-center gap-2 px-5 h-full transition-all duration-300 border-b-2";

    const activeClasses = mobile
        ? isActive
            ? "bg-ash/10"
            : "hover:bg-ash/5"
        : isActive
            ? "border-ink"
            : "border-transparent";

    const glyphClasses = `font-serif transition-all duration-300 ${isActive ? "text-ink opacity-100" : "text-ink/65"
        } ${mobile ? "text-base" : ""}`;

    const labelClasses = `font-mono tracking-wide transition-all duration-300 ${isActive ? "text-ink font-medium" : "text-fog"
        } uppercase ${mobile ? "text-sm tracking-[0.05em]" : "text-[0.62rem] tracking-[0.1em]"}`;

    return (
        <button onClick={onClick} className={`${baseClasses} ${activeClasses}`}>
            <span className={glyphClasses}>{item.glyph}</span>
            <span className={labelClasses}>{item.label}</span>
            {mobile && isActive && <span className="ml-auto text-xs text-ink/50">●</span>}
        </button>
    );
}

// ── Navigation Component ────────────────────────────────────────────────────

export default function Navigation() {
    const navigate = useNavigate();
    const location = useLocation();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDark, setIsDark] = useState(false);

    const closeMenu = useCallback(() => setIsMenuOpen(false), []);
    const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);

    const toggleDark = useCallback(() => {
        setIsDark((prev) => {
            const next = !prev;
            document.documentElement.classList.toggle("dark", next);
            return next;
        });
    }, []);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = (e) => {
            setIsDark(e.matches);
            document.documentElement.classList.toggle("dark", e.matches);
        };

        setIsDark(mediaQuery.matches);
        document.documentElement.classList.toggle("dark", mediaQuery.matches);

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    const getActiveId = useCallback(() => {
        const path = location.pathname.slice(1);
        return path === "" ? "home" : path;
    }, [location.pathname]);

    const handleLinkClick = useCallback(
        (id) => {
            navigate(id === "home" ? "/" : `/${id}`);
            closeMenu();
        },
        [navigate, closeMenu]
    );

    const currentIndex = NAV.findIndex((n) => n.id === getActiveId()) + 1;
    const totalPages = NAV.length;
    const activeId = getActiveId();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-paper border-b border-ash">
            {/* ===== DESKTOP NAVIGATION ===== */}
            <div className="hidden md:block">
                <nav className="max-w-6xl mx-auto px-6 flex items-stretch h-14">
                    {/* Logo */}
                    <button
                        onClick={() => handleLinkClick("home")}
                        className="font-display text-[1.05rem] text-ink pr-6 border-r border-ash mr-6 flex items-center shrink-0 transition-opacity hover:opacity-60"
                    >
                        ◈
                    </button>

                    {/* Nav links */}
                    <div className="flex items-stretch gap-0">
                        {NAV.map((item) => (
                            <NavLink
                                key={item.id}
                                item={item}
                                isActive={activeId === item.id}
                                onClick={() => handleLinkClick(item.id)}
                            />
                        ))}
                    </div>

                    {/* Right side */}
                    <div className="ml-auto flex items-center gap-5">
                        <span className="font-mono text-[0.55rem] text-void tracking-widest">
                            {String(currentIndex).padStart(2, "0")} / {String(totalPages).padStart(2, "0")}
                        </span>
                        <span className="block w-px h-7 bg-smudge" />
                        <DarkModeToggle isDark={isDark} onToggle={toggleDark} />
                    </div>
                </nav>
            </div>

            {/* ===== MOBILE NAVIGATION (with vertical separators) ===== */}
            <div className="md:hidden">
                <div className="flex items-center justify-between h-14 px-4 sm:px-6">
                    <button
                        onClick={() => handleLinkClick("home")}
                        className="font-display text-[1.05rem] text-ink flex items-center transition-opacity hover:opacity-60"
                    >
                        ◈
                    </button>

                    <div className="flex items-center gap-3">
                        {/* Page counter */}
                        <span className="font-mono text-[0.55rem] text-void tracking-widest">
                            {String(currentIndex).padStart(2, "0")} / {String(totalPages).padStart(2, "0")}
                        </span>

                        {/* Vertical separator */}
                        <span className="w-px h-5 bg-smudge" />

                        {/* Dark mode toggle */}
                        <DarkModeToggle isDark={isDark} onToggle={toggleDark} />

                        {/* Vertical separator (optional, but matches desktop consistency) */}
                        <span className="w-px h-5 bg-smudge" />

                        {/* Burger menu button */}
                        <button
                            onClick={toggleMenu}
                            className="flex flex-col items-center justify-center w-8 h-8 rounded-md transition-colors hover:bg-ash/10 focus:outline-none"
                            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        >
                            <div className="relative w-5 h-5">
                                <span
                                    className={`absolute h-0.5 w-5 bg-ink rounded-full transition-all duration-300 ${isMenuOpen ? "rotate-45 top-2" : "top-0"
                                        }`}
                                />
                                <span
                                    className={`absolute h-0.5 w-5 bg-ink rounded-full transition-all duration-300 top-2 ${isMenuOpen ? "opacity-0" : "opacity-100"
                                        }`}
                                />
                                <span
                                    className={`absolute h-0.5 w-5 bg-ink rounded-full transition-all duration-300 ${isMenuOpen ? "-rotate-45 top-2" : "top-4"
                                        }`}
                                />
                            </div>
                        </button>
                    </div>
                </div>

                {/* Mobile menu drawer */}
                {isMenuOpen && (
                    <div className="absolute top-14 left-0 right-0 bg-paper border-b border-ash shadow-lg z-40 animate-in slide-in-from-top-2 duration-200">
                        <div className="flex flex-col py-2">
                            {NAV.map((item) => (
                                <NavLink
                                    key={item.id}
                                    item={item}
                                    isActive={activeId === item.id}
                                    onClick={() => handleLinkClick(item.id)}
                                    mobile
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}