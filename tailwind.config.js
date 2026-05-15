/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {

      /* ── COLORS ─────────────────────────────────────────────── */
      colors: {
        // Monochrome palette
        ink: "#1a1a1a",
        void: "#2d2b28",
        fog: "#9a9690",
        smudge: "#c4bfb0",
        ash: "#e8e4d9",
        bone: "#f5f2eb",
        paper: "#faf8f3",

        // Pastel accent quartet
        lav: "#d4c9e8",   // surreal / dream
        blush: "#e8cdd4",   // memory / warmth
        sage: "#c8d9c4",   // growth / nature
        sky: "#c4d4e8",   // distance / longing
      },

      /* ── TYPOGRAPHY ─────────────────────────────────────────── */
      fontFamily: {
        display: ["'IM Fell English'", "Georgia", "'Times New Roman'", "serif"],
        title: ["'Special Elite'", "'Courier New'", "monospace"],
        serif: ["'Crimson Pro'", "Georgia", "'Times New Roman'", "serif"],
        body: ["'Crimson Pro'", "Georgia", "'Times New Roman'", "serif"],
        mono: ["'Space Mono'", "'Courier New'", "monospace"],
      },

      fontSize: {
        // Fluid sizes via clamp — use as inline styles; these are fixed fallbacks
        "hero": ["clamp(3.5rem, 9vw, 7.5rem)", { lineHeight: "1.05", letterSpacing: "-0.01em" }],
        "section": ["clamp(2.2rem, 5vw, 4.5rem)", { lineHeight: "1.1" }],
        "display": ["clamp(1.6rem, 3vw, 2.4rem)", { lineHeight: "1.2" }],
        // Micro sizes for UI chrome
        "2xs": ["0.58rem", { lineHeight: "1.5" }],
        "xs-mono": ["0.62rem", { lineHeight: "1.6" }],
        "sm-serif": ["0.88rem", { lineHeight: "1.7" }],
      },

      letterSpacing: {
        "widest-2": "0.14em",
        "widest-3": "0.2em",
      },

      lineHeight: {
        "relaxed-serif": "1.85",
        "tight-display": "1.05",
      },

      /* ── SPACING ─────────────────────────────────────────────── */
      spacing: {
        "section": "clamp(3rem, 8vh, 7rem)",
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
        "88": "22rem",
        "92": "23rem",
        "100": "25rem",
        "112": "28rem",
        "128": "32rem",
      },

      /* ── MAX WIDTHS ──────────────────────────────────────────── */
      maxWidth: {
        "container": "72rem",
        "prose-xl": "72ch",
        "prose-lg": "60ch",
        "prose-md": "48ch",
        "prose-sm": "38ch",
      },

      /* ── BORDER RADIUS ───────────────────────────────────────── */
      borderRadius: {
        "none": "0px",
        "px": "1px",
        "sm": "2px",   // default sketch card
        "md": "4px",
        "lg": "8px",
        "xl": "12px",
        DEFAULT: "2px",
      },

      /* ── BORDER WIDTH ────────────────────────────────────────── */
      borderWidth: {
        DEFAULT: "1px",
        "0": "0",
        "2": "2px",
        "half": "0.5px",
      },

      /* ── BORDER STYLE ────────────────────────────────────────── */
      // Used for dashed rules and timeline
      // (Tailwind has border-dashed built-in — this is for extra patterns)

      /* ── BOX SHADOW ──────────────────────────────────────────── */
      boxShadow: {
        "lift-sm": "0 4px 16px rgba(26,26,26,0.06)",
        "lift": "0 10px 40px rgba(26,26,26,0.09)",
        "lift-lg": "0 20px 60px rgba(26,26,26,0.12)",
        "ink": "0 2px 8px rgba(26,26,26,0.04)",
        "none": "none",
      },

      /* ── ANIMATION / KEYFRAMES ───────────────────────────────── */
      keyframes: {
        // Notebook paper fade-in — used for section enters
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },

        // Dream flash — overexpose then settle (supplement to framer-motion)
        "dream-flash": {
          "0%": { opacity: "0", filter: "brightness(4)" },
          "100%": { opacity: "1", filter: "brightness(1)" },
        },

        // Pencil draw underline
        "draw-line": {
          "0%": { transform: "scaleX(0)", transformOrigin: "left" },
          "100%": { transform: "scaleX(1)", transformOrigin: "left" },
        },

        // Gentle float — used for floating sketch cards
        "float": {
          "0%, 100%": { transform: "translateY(0px) rotate(var(--card-rotate, 0deg))" },
          "50%": { transform: "translateY(-6px) rotate(var(--card-rotate, 0deg))" },
        },

        // Ink bloom on form focus
        "ink-bloom": {
          "0%": { boxShadow: "0 1.5px 0 0 rgba(26,26,26,0)" },
          "100%": { boxShadow: "0 1.5px 0 0 rgba(26,26,26,0.2)" },
        },

        // Stagger reveal for lists
        "stagger-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },

      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.25,0.1,0.25,1) both",
        "dream-flash": "dream-flash 0.9s cubic-bezier(0.25,0.1,0.25,1) both",
        "draw-line": "draw-line 0.4s cubic-bezier(0.25,0.1,0.25,1) both",
        "float": "float 5s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "ink-bloom": "ink-bloom 0.5s ease forwards",
        "stagger-in": "stagger-in 0.6s cubic-bezier(0.25,0.1,0.25,1) both",
      },

      /* ── TRANSITION TIMING ───────────────────────────────────── */
      transitionTimingFunction: {
        "dream": "cubic-bezier(0.25, 0.1, 0.25, 1)",
        "in-slow": "cubic-bezier(0.4, 0, 1, 1)",
        "out-slow": "cubic-bezier(0, 0, 0.2, 1)",
        "pencil": "cubic-bezier(0.0, 0.0, 0.2, 1)",
      },

      transitionDuration: {
        "350": "350ms",
        "450": "450ms",
        "600": "600ms",
        "800": "800ms",
        "900": "900ms",
      },

      /* ── BACKDROP BLUR ───────────────────────────────────────── */
      backdropBlur: {
        "xs": "2px",
        "sm": "4px",
      },

      /* ── ASPECT RATIO ────────────────────────────────────────── */
      aspectRatio: {
        "3/4": "3 / 4",
        "4/3": "4 / 3",
        "1/1": "1 / 1",
        "16/9": "16 / 9",
      },

      /* ── GRID TEMPLATE ───────────────────────────────────────── */
      gridTemplateColumns: {
        // Used for journey timeline layout
        "timeline": "88px 1fr",
        // Used for about section
        "portrait": "1fr 380px",
        // Used for contact
        "contact": "1fr 1fr",
        // Auto-fill responsive
        "fill-240": "repeat(auto-fill, minmax(240px, 1fr))",
        "fill-300": "repeat(auto-fill, minmax(300px, 1fr))",
      },

      /* ── Z-INDEX SCALE ───────────────────────────────────────── */
      zIndex: {
        "nav": "50",
        "overlay": "40",
        "card": "10",
        "base": "1",
      },

      /* ── CUSTOM SCREEN BREAKPOINTS ───────────────────────────── */
      screens: {
        "xs": "380px",
        "sm": "640px",
        "md": "768px",
        "lg": "1024px",
        "xl": "1280px",
        "2xl": "1536px",
      },
    },
  },

  plugins: [
    // Add as needed:
    // require('@tailwindcss/typography'),
    // require('@tailwindcss/forms'),
  ],
};