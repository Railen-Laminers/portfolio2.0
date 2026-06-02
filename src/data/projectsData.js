// src/data/projectsData.js

import ojt1Img from "../assets/projects/ojt1.png";
import ojt2Img from "../assets/projects/ojt2.png";
import amsImg from "../assets/projects/ams.png";
import ydImg from "../assets/projects/yd.png";
import platformingImg from "../assets/projects/platforming.png";

export const PROJECTS = [
    {
        title: "OJT Project 1",
        year: "2026",
        tag: "PERSONAL",
        accent: "#d4c9e8",
        rotate: -0.4,   // slight left tilt
        desc: "Cliberduche company profile is created using React and Tailwind CSS, showcasing the company's services, team, and contact information. It provides an engaging and informative online presence for potential clients and partners.",
        link: "https://cliberduche-portfolio.vercel.app",
        image: ojt1Img,
    },
    {
        title: "OJT Project 2",
        year: "2026",
        tag: "PERSONAL",
        accent: "#d4c9e8",
        rotate: 0.6,    // gentle right tilt
        desc: "CLiberduche Corporation Website is a full-stack web application built with React and Tailwind CSS for the frontend and Laravel for the backend. It allows clients to explore the company profile, learn more about its services, and easily book appointments for projects or service inquiries, making client communication and engagement more convenient.",
        link: "https://cliberduche-frontend.vercel.app",
        image: ojt2Img,
    },
    {
        title: "Capstone Project",
        year: "2025",
        tag: "PERSONAL",
        accent: "#d4c9e8",
        rotate: -0.2,   // subtle left tilt
        desc: "An Apartment Management System with Dynamic Notifications is a web application built with React and Laravel to simplify apartment management. It helps manage tenants, maintenance requests, and rent payments in one platform. The system also sends real-time notifications to admins, landlords, and tenants through email, Messenger, and Telegram, making communication faster and more efficient.",
        link: "https://github.com/Railen-Laminers/Apartment-Management.git",
        image: amsImg,
    },
    {
        title: "Youtube Downloader",
        year: "2025",
        tag: "ARCHIVED",
        accent: "#d4c9e8",
        rotate: 0.3,    // small right tilt
        desc: "YouTube Downloader is a web-based application built with React, Node.js, and FFmpeg that enables users to download YouTube videos or audio in different formats",
        link: "https://github.com/Railen-Laminers/YouTube_Downloader.git",
        image: ydImg,
    },
    {
        title: "Untitled Project",
        year: "2025",
        tag: "ONGOING",
        accent: "#d4c9e8",
        rotate: 0.1,    // almost straight, tiny right tilt
        desc: "Just testing",
        link: "/",
        image: "",
    },
];

export const PROJECT_FILTERS = ["ALL", "PERSONAL", "ONGOING", "ARCHIVED"];