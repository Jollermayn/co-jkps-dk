import { Link } from "@tanstack/react-router";

export function SiteLogo({
  size = 80,
  color = "#000000",
  lineColor = "#C0281E",
  lineOpacity = 0.5,
  onClick,
}: {
  size?: number;
  color?: string;
  lineColor?: string;
  lineOpacity?: number;
  onClick?: () => void;
}) {
  return (
    <Link to="/" aria-label="Forside" onClick={onClick} style={{ display: "inline-flex", lineHeight: 0, textDecoration: "none" }}>
      <svg width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <line x1="24" y1="12" x2="24" y2="36" stroke={lineColor} strokeWidth="0.75" strokeOpacity={lineOpacity} />
        <line x1="4" y1="24" x2="44" y2="24" stroke={lineColor} strokeWidth="0.75" strokeOpacity={lineOpacity} />
        <text x="13" y="19" textAnchor="middle" fontFamily="serif" fontSize="15" fontWeight="900" fill={color}>J</text>
        <text x="35" y="19" textAnchor="middle" fontFamily="serif" fontSize="15" fontWeight="400" fill={color}>K</text>
        <text x="13" y="39" textAnchor="middle" fontFamily="serif" fontSize="15" fontWeight="400" fill={color}>P</text>
        <text x="35" y="39" textAnchor="middle" fontFamily="serif" fontSize="15" fontWeight="900" fill={color}>S</text>
      </svg>
    </Link>
  );
}
