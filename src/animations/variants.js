export const dreamCut = {
    initial: { opacity: 0, filter: "brightness(4)" },
    animate: {
        opacity: 1,
        filter: "brightness(1)",
        transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] },
    },
    exit: {
        opacity: 0,
        filter: "brightness(6)",
        transition: { duration: 0.45, ease: "easeIn" },
    },
};

export const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.25 } },
};

export const fadeUp = {
    hidden: { opacity: 0, y: 14 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
    },
};

export const pageFlip = {
    initial: (dir) => ({
        opacity: 0,
        rotateY: dir > 0 ? 12 : -12,
        x: dir > 0 ? 60 : -60,
        transformOrigin: dir > 0 ? "left center" : "right center",
        filter: "blur(0.5px) brightness(0.85)",
    }),
    animate: {
        opacity: 1,
        rotateY: 0,
        x: 0,
        filter: "blur(0px) brightness(1)",
        transition: {
            duration: 0.45,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    },
    exit: (dir) => ({
        opacity: 0,
        rotateY: dir > 0 ? -14 : 14,
        x: dir > 0 ? -60 : 60,
        transformOrigin: dir > 0 ? "right center" : "left center",
        filter: "blur(1px) brightness(0.7)",
        transition: {
            duration: 0.35,
            ease: [0.55, 0, 1, 0.45],
        },
    }),
};