// src/data/minigamesData.js

import flapImg from "../assets/minigames/flap.png";
import tomoImg from "../assets/minigames/tomo.png";

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
        image: tomoImg,            // no local preview image – will show placeholder
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
        image: flapImg,
    },
    {
        id: "slidingpuzzle",
        title: "Sliding Puzzle",
        year: "2025",
        tag: "BRAIN TEASER",
        accent: "#c4d4e8",      // soft sky blue
        rotate: -0.4,
        desc: "A 3×3 sliding puzzle. Slide the tiles and put the numbers back in order.",
        link: "/minigames/slidingpuzzle",   // internal React Router link
        // no image – will show crosshatch placeholder
    },
    // Add more games here following the same structure
];

// Optional: if you want filters like "ALL", "PLAYABLE", "CLASSIC"
export const MINIGAME_FILTERS = ["ALL", "PLAYABLE", "CLASSIC"];