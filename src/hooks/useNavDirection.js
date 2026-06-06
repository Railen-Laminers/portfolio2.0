import { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { NAV } from "../data/navData";

const getIndex = (pathname) => {
    const id = pathname.slice(1) || "home";
    const idx = NAV.findIndex((n) => n.id === id);
    return idx === -1 ? 0 : idx;
};

export function useNavDirection() {
    const location = useLocation();
    const prevIndex = useRef(getIndex(location.pathname));
    const directionRef = useRef(0);

    const currentIndex = getIndex(location.pathname);
    const prev = prevIndex.current;

    useEffect(() => {
        directionRef.current = currentIndex >= prev ? 1 : -1;
        prevIndex.current = currentIndex;
    }, [location.pathname]);

    // Return computed direction before the effect fires
    return currentIndex >= prev ? 1 : -1;
}