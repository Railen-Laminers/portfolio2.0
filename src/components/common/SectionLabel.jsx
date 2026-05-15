// src/components/common/SectionLabel.jsx
export default function SectionLabel({ children }) {
    return (
        <p className="font-mono text-[0.62rem] text-fog tracking-[0.14em] mb-2 uppercase">
            {children}
        </p>
    );
}