import { Link } from "@tanstack/react-router";

export function SiteLogo({ size = 80, color = "#000000" }: { size?: number; color?: string }) {
  return (
    <Link to="/" aria-label="Forside" style={{ display: "inline-flex", lineHeight: 0, textDecoration: "none" }}>
      <svg width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <line x1="24" y1="12" x2="24" y2="36" stroke="#C0281E" strokeWidth="0.75" strokeOpacity="0.5" />
        <line x1="4" y1="24" x2="44" y2="24" stroke="#C0281E" strokeWidth="0.75" strokeOpacity="0.5" />
        <text x="13" y="19" textAnchor="middle" fontFamily="serif" fontSize="15" fontWeight="900" fill={color}>J</text>
        <text x="35" y="19" textAnchor="middle" fontFamily="serif" fontSize="15" fontWeight="400" fill={color}>K</text>
        <text x="13" y="39" textAnchor="middle" fontFamily="serif" fontSize="15" fontWeight="400" fill={color}>P</text>
        <text x="35" y="39" textAnchor="middle" fontFamily="serif" fontSize="15" fontWeight="900" fill={color}>S</text>
      </svg>
    </Link>
  );
}
