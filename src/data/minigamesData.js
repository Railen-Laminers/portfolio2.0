// src/data/minigamesData.js

// If you have local images for your games, import them here.
// Example: import flappyPreview from "../assets/games/flappy-preview.png";
// For now, we'll use null and let the Crosshatch component act as a placeholder.

export const MINIGAMES = [
    {
        id: "tomori",
        title: "Tomori",
        year: "2025",
        tag: "PLAYABLE",
        accent: "#f5e2c8",      // warm paper tone
        rotate: -0.3,           // slight left tilt
        desc: "Hangout with your friends and chat anonymously.",
        link: "https://tomori-frontend.vercel.app/",   // external link
        image: null,            // no local preview image – will show placeholder
    },
    {
        id: "flappybird",
        title: "Flappy Bird",
        year: "2025",
        tag: "CLASSIC",
        accent: "#c8d9c4",      // soft green
        rotate: 0.5,
        desc: "Avoid the pipes. How far can you go? A faithful remake with a sketchy twist.",
        link: "/minigames/flappybird",   // internal React Router link
        image: null,
    },
    // Add more games here following the same structure
];

// Optional: if you want filters like "ALL", "PLAYABLE", "CLASSIC"
export const MINIGAME_FILTERS = ["ALL", "PLAYABLE", "CLASSIC"];