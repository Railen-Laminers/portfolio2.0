import { motion } from "framer-motion";
import { useNavDirection } from "../../hooks/useNavDirection";
import { pageFlip } from "../../animations/variants";

export default function PageWrapper({ children }) {
    const dir = useNavDirection();

    return (
        <motion.div
            custom={dir}
            variants={pageFlip}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ perspective: 1200 }}
        >
            {children}
        </motion.div>
    );
}