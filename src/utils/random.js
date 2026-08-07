// src/utils/random.js

const ACCENTS = [
    "#d4c9e8",
    "#c9d8e8",
    "#e8d4c9",
    "#d4e8d0",
    "#e8d0dc",
    "#e8e0c9",
];

/**
 * Returns a random accent color from the predefined palette.
 */
export const randomAccent = () =>
    ACCENTS[Math.floor(Math.random() * ACCENTS.length)];

/**
 * Returns a random rotation between -0.8 and 0.8 (inclusive),
 * rounded to one decimal place.
 */
export const randomRotate = () =>
    Number((Math.random() * 1.6 - 0.8).toFixed(1));