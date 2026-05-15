// src/data/projectsData.js

import ojtImg from "../assets/projects/ojt.png";
import amsImg from "../assets/projects/ams.png";
import ydImg from "../assets/projects/yd.png";
import platformingImg from "../assets/projects/platforming.png";

export const PROJECTS = [
    {
        title: "OJT Project",
        year: "2026",
        tag: "PERSONAL",
        accent: "#d4c9e8",
        rotate: 0.6,
        desc: "CLiberduche is a frontend project built with React, Tailwind CSS, and Vite. It serves as a personal playground for experimenting with design and development ideas, showcasing a collection of works in progress.",
        link: "https://cliberduche-frontend.vercel.app",
        image: ojtImg,   
    },
    {
        title: "Capstone Project",
        year: "2025",
        tag: "PERSONAL",
        accent: "#d4c9e8",
        rotate: 0.6,
        desc: "Apartment Management System is a full-stack application designed to streamline the management of residential complexes. Built with React for the frontend and laravel for the backend, it offers features such as tenant management, maintenance tracking, and payment processing.",
        link: "https://github.com/Railen-Laminers/Apartment-Management.git",
        image: amsImg,      
    },
    {
        title: "Youtube Downloader",
        year: "2025",
        tag: "ARCHIVED",
        accent: "#d4c9e8",
        rotate: 0.6,
        desc: "YouTube Downloader is a web-based application built with React, Node.js, and FFmpeg that enables users to download YouTube videos or audio in different formats",
        link: "https://github.com/Railen-Laminers/YouTube_Downloader.git",
        image: ydImg, 
    },
    {
        title: "Platforming Game",
        year: "2025",
        tag: "ONGOING",
        accent: "#d4c9e8",
        rotate: 0.6,
        desc: "A 2D platformer game built with Godot Engine, featuring smooth controls, engaging levels, and a charming art style.",
        link: "https://railen-laminers.github.io/PlatformingGodotGame",
        image: platformingImg, 
    },
    {
        title: "Untitled Project",
        year: "2025",
        tag: "ONGOING",
        accent: "#d4c9e8",
        rotate: 0.6,
        desc: "Just testing",
        link: "/",
        image: "", 
    },
];

export const PROJECT_FILTERS = ["ALL", "PERSONAL", "ONGOING", "ARCHIVED"];