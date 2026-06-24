import { useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { NAV } from "../../data/navData";

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

function EyeCrimson({ size = 28 }) {
  return (
    <svg
      width={size}
      height={size * 1.1}
      viewBox="0 0 64 60"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="block"
    >
      <line x1="22" y1="8" x2="20" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="32" y1="6" x2="32" y2="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="42" y1="8" x2="44" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M5 23 C13 11 51 11 59 23 C51 35 13 35 5 23 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="32" cy="23" r="10" fill="currentColor" />
      <circle cx="32" cy="23" r="4" fill="currentColor" />
      <circle cx="36" cy="19" r="1.5" fill="#f0dfdf" opacity="0.6" />
      <circle cx="28" cy="27" r="1" fill="#f0dfdf" opacity="0.4" />
      <line x1="20" y1="34" x2="18" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="32" y1="36" x2="32" y2="42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="44" y1="34" x2="46" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M24 34 Q23.5 39 24.5 43 Q25 46 24 50"
        fill="none"
        stroke="#c0393a"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.9"
      />
      <ellipse cx="24" cy="51" rx="2" ry="2.8" fill="#c0393a" opacity="0.85" />
      <path
        d="M32 36 Q31.5 41 32.5 46 Q33 49 32.2 54"
        fill="none"
        stroke="#c0393a"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.85"
      />
      <ellipse cx="32.2" cy="55.5" rx="1.8" ry="2.5" fill="#c0393a" opacity="0.8" />
      <path
        d="M40 33 Q39.8 36 40.5 38"
        fill="none"
        stroke="#c0393a"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      <ellipse cx="40.5" cy="39.2" rx="1.2" ry="1.6" fill="#c0393a" opacity="0.55" />
    </svg>
  );
}

function DarkModeToggle({ isDark, isCrimson, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label={
        isCrimson
          ? "Deactivate crimson mode"
          : isDark
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
      title={isCrimson ? "crimson mode (click to exit)" : isDark ? "dark mode" : "light mode"}
      className="flex items-center group transition-opacity hover:opacity-60 bg-none border-none cursor-pointer p-[2px_4px]"
    >
      <span
        className={`transition-all duration-300 text-ink ${
          isCrimson
            ? "animate-crimson-pulse"
            : isDark
            ? "translate-y-px"
            : "translate-y-0"
        }`}
      >
        {isCrimson ? (
          <EyeCrimson size={26} />
        ) : isDark ? (
          <EyeClosed size={26} />
        ) : (
          <EyeOpen size={26} />
        )}
      </span>
    </button>
  );
}

function GameIcon({ size = 24 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="block"
    >
      <path d="M6 11h4M10 9v4" />
      <path d="M18 9v4M16 11h4" />
      <rect x="2" y="7" width="20" height="10" rx="3" />
      <circle cx="8" cy="12" r="0.5" fill="currentColor" />
      <circle cx="16" cy="12" r="0.5" fill="currentColor" />
    </svg>
  );
}

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

  const glyphClasses = `font-serif transition-all duration-300 ${
    isActive ? "text-ink opacity-100" : "text-ink/65"
  } ${mobile ? "text-base" : ""}`;

  const labelClasses = `font-mono tracking-wide transition-all duration-300 ${
    isActive ? "text-ink font-medium" : "text-fog"
  } uppercase ${mobile ? "text-sm tracking-[0.05em]" : "text-[0.62rem] tracking-[0.1em]"}`;

  return (
    <button onClick={onClick} className={`${baseClasses} ${activeClasses}`}>
      <span className={glyphClasses}>{item.glyph}</span>
      <span className={labelClasses}>{item.label}</span>
      {mobile && isActive && <span className="ml-auto text-xs text-ink/50">●</span>}
    </button>
  );
}

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme, crimsonMode } = useTheme();
  const isDark = theme === "dark";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);

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

  const activeId = getActiveId();

  const goToMinigames = useCallback(() => {
    navigate("/minigames");
    closeMenu();
  }, [navigate, closeMenu]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-paper border-b border-ash">
      <div className="hidden md:block">
        <nav className="max-w-6xl mx-auto px-6 flex items-stretch h-14">
          <button
            onClick={() => handleLinkClick("home")}
            className="font-display text-[1.05rem] text-ink pr-6 border-r border-ash mr-6 flex items-center shrink-0 transition-opacity hover:opacity-60"
          >
            ◈
          </button>
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
          <div className="ml-auto flex items-center gap-5">
            <button
              onClick={goToMinigames}
              aria-label="Go to minigames"
              title="Minigames"
              className="flex items-center transition-opacity hover:opacity-60 bg-none border-none cursor-pointer p-[2px_4px]"
            >
              <GameIcon size={24} />
            </button>
            <span className="block w-px h-7 bg-smudge" />
            <DarkModeToggle isDark={isDark} isCrimson={crimsonMode} onToggle={toggleTheme} />
          </div>
        </nav>
      </div>

      <div className="md:hidden">
        <div className="flex items-center justify-between h-14 px-4 sm:px-6">
          <button
            onClick={() => handleLinkClick("home")}
            className="font-display text-[1.05rem] text-ink flex items-center transition-opacity hover:opacity-60"
          >
            ◈
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={goToMinigames}
              aria-label="Go to minigames"
              title="Minigames"
              className="flex items-center transition-opacity hover:opacity-60 bg-none border-none cursor-pointer p-[2px_4px]"
            >
              <GameIcon size={22} />
            </button>
            <span className="w-px h-5 bg-smudge" />
            <DarkModeToggle isDark={isDark} isCrimson={crimsonMode} onToggle={toggleTheme} />
            <span className="w-px h-5 bg-smudge" />
            <button
              onClick={toggleMenu}
              className="flex flex-col items-center justify-center w-8 h-8 rounded-md transition-colors hover:bg-ash/10 focus:outline-none"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <div className="relative w-5 h-5">
                <span
                  className={`absolute h-0.5 w-5 bg-ink rounded-full transition-all duration-300 ${
                    isMenuOpen ? "rotate-45 top-2" : "top-0"
                  }`}
                />
                <span
                  className={`absolute h-0.5 w-5 bg-ink rounded-full transition-all duration-300 top-2 ${
                    isMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute h-0.5 w-5 bg-ink rounded-full transition-all duration-300 ${
                    isMenuOpen ? "-rotate-45 top-2" : "top-4"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
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