import { Link } from "@tanstack/react-router";

export function SiteLogo({ size = 48 }: { size?: number }) {
  return (
    <Link to="/" aria-label="Forside" style={{ display: "inline-flex", lineHeight: 0, textDecoration: "none" }}>
      <svg width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <line x1="24" y1="12" x2="24" y2="36" stroke="#C0281E" strokeWidth="1.5" strokeOpacity="0.5" />
        <line x1="12" y1="24" x2="36" y2="24" stroke="#C0281E" strokeWidth="1.5" strokeOpacity="0.5" />
        <text x="16" y="21" textAnchor="middle" fontFamily="serif" fontSize="15" fontWeight="900" fill="#000">J</text>
        <text x="32" y="21" textAnchor="middle" fontFamily="serif" fontSize="15" fontWeight="400" fill="#000">K</text>
        <text x="16" y="41" textAnchor="middle" fontFamily="serif" fontSize="15" fontWeight="400" fill="#000">P</text>
        <text x="32" y="41" textAnchor="middle" fontFamily="serif" fontSize="15" fontWeight="900" fill="#000">S</text>
      </svg>
    </Link>
  );
}
