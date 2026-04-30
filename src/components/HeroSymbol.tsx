import heroSymbol from "@/assets/hero-symbol.png";

export function HeroSymbol({ className }: { className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-[240px] ${className ?? ""}`}>
      <style>{`
        @keyframes hero-symbol-pulse {
          0%, 100% { transform: scale(1); opacity: 0.95; }
          50% { transform: scale(1.04); opacity: 1; }
        }
        .hero-symbol-img {
          animation: hero-symbol-pulse 4s ease-in-out infinite;
        }
      `}</style>
      <img
        src={heroSymbol}
        alt=""
        aria-hidden="true"
        className="hero-symbol-img block w-full h-auto"
      />
    </div>
  );
}
