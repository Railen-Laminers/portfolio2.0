// src/data/projectsData.js

import ojt1Img from "../assets/projects/ojt1.png";
import ojt2Img from "../assets/projects/ojt2.png";
import amsImg from "../assets/projects/ams.png";
import welFragranceImg from "../assets/projects/welFragrance.png";

export const PROJECTS = [
    {
        title: "Cliberduche Profile",
        year: "2026",
        tag: "INTERNSHIP",
        accent: "#d4c9e8",
        rotate: -0.4,
        desc: "A modern company profile website built with React and Tailwind CSS, showcasing services, team, and contact details to establish a strong online presence for clients and partners.",
        link: "https://cliberduche-portfolio.vercel.app",
        image: ojt1Img,
    },
    {
        title: "Cliberduche Corporation Website",
        year: "2026",
        tag: "INTERNSHIP",
        accent: "#d4c9e8",
        rotate: 0.6,
        desc: "A full-stack corporate website built with React, Tailwind CSS, and Laravel, allowing users to explore services, view company information, and book appointments for inquiries and projects.",
        link: "https://cliberduche-frontend.vercel.app",
        image: ojt2Img,
    },
    {
        title: "Apartment Management System with Dynamic Notifications",
        year: "2025",
        tag: "CAPSTONE",
        accent: "#d4c9e8",
        rotate: -0.2,
        desc: "A web-based apartment management system built with React and Laravel that handles tenants, maintenance requests, and rent tracking, with real-time notifications via email, Messenger, and Telegram.",
        link: "https://apartment-management-red.vercel.app/",
        image: amsImg,
    },
    {
        title: "Wel Fragrance Collection",
        year: "2025",
        tag: "PERSONAL",
        accent: "#d4c9e8",
        rotate: -0.2,
        desc: "A personal project showcasing a collection of fragrances, built with React and Tailwind CSS, featuring product details, reviews, and an interactive user interface for fragrance enthusiasts.",
        link: "https://wel-fragrance.vercel.app/",
        image: welFragranceImg,
    },
];

export const PROJECT_FILTERS = ["ALL", "PERSONAL", "ONGOING", "ARCHIVED"];