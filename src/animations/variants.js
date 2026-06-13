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