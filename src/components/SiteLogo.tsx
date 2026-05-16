import { Link } from "@tanstack/react-router";

export function SiteLogo({ size = 48 }: { size?: number }) {
  return (
    <Link to="/" aria-label="Forside" style={{ display: "inline-flex", lineHeight: 0, textDecoration: "none" }}>
      <svg width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <line x1="24" y1="0" x2="24" y2="48" stroke="#C0281E" strokeWidth="1.5" />
        <line x1="0" y1="24" x2="48" y2="24" stroke="#C0281E" strokeWidth="1.5" />
        <text x="12" y="19" textAnchor="middle" fontFamily="serif" fontSize="15" fontWeight="900" fill="white">J</text>
        <text x="36" y="19" textAnchor="middle" fontFamily="serif" fontSize="15" fontWeight="400" fill="white">K</text>
        <text x="12" y="43" textAnchor="middle" fontFamily="serif" fontSize="15" fontWeight="400" fill="white">P</text>
        <text x="36" y="43" textAnchor="middle" fontFamily="serif" fontSize="15" fontWeight="900" fill="white">S</text>
      </svg>
    </Link>
  );
}
