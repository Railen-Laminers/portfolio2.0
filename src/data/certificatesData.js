// src/data/certificatesData.js

import js1Img from "../assets/certificates/js1.png";
import ps1Img from "../assets/certificates/ps1.png";
import legacyRWDImg from "../assets/certificates/legacyRWD.png";
import googleAnalyticsImg from "../assets/certificates/googleAnalytics.png";

export const CERTIFICATES = [
    {
        id: "JS-FUNDAMENTALS-1",
        title: "JavaScript Fundamentals 1",
        issuer: "CISCO Academy",
        date: "2026",
        image: js1Img,
        link: "https://drive.google.com/file/d/1TA_Lic61_u4Dw0fdMi7FHf4w7yfCLTk2/view?usp=drive_link",
        accent: "#d4c9e8",
        rotate: -0.3,
        tag: "DEVELOPMENT",
    },
    {
        id: "PS-FUNDAMENTALS-1",
        title: "Python Fundamentals 1",
        issuer: "CISCO Academy",
        date: "2026",
        image: ps1Img,
        link: "https://drive.google.com/file/d/12SCjHCX2UF-gJzoXzmlZrq1_QPZ_AcHq/view?usp=drive_link", // no link → view only
        accent: "#c8d9c4",
        rotate: 0.2,
        tag: "DEVELOPMENT",
    },
    {
        id: "LEGACY-RWD",
        title: "Legacy Responsive Web Design",
        issuer: "FreeCodeCamp",
        date: "2026",
        image: legacyRWDImg,
        link: "https://www.freecodecamp.org/certification/fcc-6ce2a4be-fdaf-4129-9498-baf424b5d31a/responsive-web-design?fbclid=IwY2xjawR6zUtleHRuA2FlbQIxMABicmlkETFtZ05NOTVRZlQ2cnZ5T1ZJc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHoGstoWcqMHtL7F3E9QKW7RMkpniH1vwGyiCXh6orZBKS6UdabikKW9LDZNO_aem_KbEb6OnO1Q3e-uEU6vLRyQ",
        accent: "#e8cdd4",
        rotate: -0.1,
        tag: "DEVELOPMENT",
    },
    {
        id: "GOOGLE-ANALYTICS",
        title: "Google Analytics",
        issuer: "Google",
        date: "2026",
        image: googleAnalyticsImg,
        link: "https://drive.google.com/file/d/16LNAAu0-vXTqC1Uy2h-nUrQ8u6ei9eUH/view?usp=drive_link",
        accent: "#f5e3cb",
        rotate: 0.4,
        tag: "GOOGLE",
    },
];

export const CERT_FILTERS = ["ALL", ...new Set(CERTIFICATES.map(c => c.tag))];