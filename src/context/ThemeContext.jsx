// src/context/ThemeContext.jsx
import { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem('theme');
        if (saved === 'dark' || saved === 'light') return saved;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });

    const [crimsonMode, setCrimsonMode] = useState(false);

    // Ref to store pre-crimson theme so we can restore it
    const preEasterEggTheme = useRef(null);

    // Click-burst tracking for easter egg
    const clickTimestamps = useRef([]);

    // Apply classes to <html> and save to localStorage whenever theme or crimsonMode changes
    useEffect(() => {
        const root = document.documentElement;
        // Remove all theme classes first
        root.classList.remove('dark', 'crimson');

        if (crimsonMode) {
            root.classList.add('crimson');
        } else if (theme === 'dark') {
            root.classList.add('dark');
        }
        // light mode = no class

        if (!crimsonMode) {
            localStorage.setItem('theme', theme);
        }
    }, [theme, crimsonMode]);

    const toggleTheme = useCallback(() => {
        // If in crimson mode, a single click deactivates it
        if (crimsonMode) {
            setCrimsonMode(false);
            // Restore the theme that was active before crimson activated
            if (preEasterEggTheme.current) {
                setTheme(preEasterEggTheme.current);
                preEasterEggTheme.current = null;
            }
            clickTimestamps.current = [];
            return;
        }

        // Track rapid clicks for the easter egg
        const now = Date.now();
        const recent = clickTimestamps.current.filter(t => now - t < 1500);
        recent.push(now);
        clickTimestamps.current = recent;

        if (recent.length >= 5) {
            // Easter egg triggered!
            preEasterEggTheme.current = theme;
            setCrimsonMode(true);
            clickTimestamps.current = [];
            return;
        }

        // Normal toggle
        setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    }, [crimsonMode, theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, crimsonMode }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useTheme must be used within a ThemeProvider');
    return context;
}