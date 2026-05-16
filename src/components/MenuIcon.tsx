export function MenuIcon({ size = 32, color = "#0A1628" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <line x1="6" y1="11" x2="26" y2="11" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="6" y1="16" x2="26" y2="16" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="6" y1="21" x2="26" y2="21" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
