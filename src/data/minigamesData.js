// src/data/minigamesData.js
import flapImg from "../assets/minigames/flap.png";
import tomoImg from "../assets/minigames/tomo.png";
import slidePuzzle from "../assets/minigames/slidePuzzle.png";

// Import the shared random helpers
import { randomAccent, randomRotate } from "../utils/random";

export const MINIGAMES = [
    {
        id: "tomori",
        title: "Tomori",
        year: "2025",
        tag: "PLAYABLE",
        accent: randomAccent(),
        rotate: randomRotate(),
        desc: "Hangout with your friends and chat anonymously.",
        link: "https://tomori-frontend.vercel.app/",
        image: tomoImg,
    },
    {
        id: "flappybird",
        title: "Flappy Bird",
        year: "2025",
        tag: "CLASSIC",
        accent: randomAccent(),
        rotate: randomRotate(),
        desc: "Avoid the pipes. How far can you go? A faithful remake with a sketchy twist.",
        link: "/minigames/flappybird",
        image: flapImg,
    },
    {
        id: "slidingpuzzle",
        title: "Sliding Puzzle",
        year: "2025",
        tag: "BRAIN TEASER",
        accent: randomAccent(),
        rotate: randomRotate(),
        desc: "A 3×3 sliding puzzle. Slide the tiles and put them back in order.",
        link: "/minigames/slidingpuzzle",
        image: slidePuzzle,
    },
    // Add more games following the same structure
];

export const MINIGAME_FILTERS = ["ALL", "PLAYABLE", "CLASSIC"];