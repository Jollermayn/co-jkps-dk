export function HeroSymbol({ className }: { className?: string }) {
  // Loop timing (seconds): triangle 1.5, waves 0.8, dots 0.8, figure 0.5, pause 2, fadeout 0.8
  // Total loop = 8s
  const DUR = 8;
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-hidden="true"
    >
      <style>{`
        @keyframes hs-draw { 0% { stroke-dashoffset: 520; } 18.75% { stroke-dashoffset: 0; } 70% { stroke-dashoffset: 0; opacity:1; } 80% { opacity: 0; } 100% { opacity: 0; stroke-dashoffset: 0; } }
        @keyframes hs-waves { 0%,18.75% { opacity: 0; } 28.75% { opacity: 1; } 70% { opacity: 1; } 80%,100% { opacity: 0; } }
        @keyframes hs-dots { 0%,28.75% { opacity: 0; } 38.75% { opacity: 1; } 70% { opacity: 1; } 80%,100% { opacity: 0; } }
        @keyframes hs-figure { 0%,38.75% { opacity: 0; } 45% { opacity: 1; } 70% { opacity: 1; } 80%,100% { opacity: 0; } }

        .hs-tri {
          stroke-dasharray: 520;
          stroke-dashoffset: 520;
          animation: hs-draw ${DUR}s ease-in-out infinite;
        }
        .hs-waves { opacity: 0; animation: hs-waves ${DUR}s ease-in-out infinite; }
        .hs-dots  { opacity: 0; animation: hs-dots  ${DUR}s ease-in-out infinite; }
        .hs-figure { opacity: 0; animation: hs-figure ${DUR}s ease-in-out infinite; }
      `}</style>

      <defs>
        <clipPath id="hs-tri-clip">
          <polygon points="100,30 25,165 175,165" />
        </clipPath>
        <clipPath id="hs-tri-left">
          <polygon points="100,30 25,165 100,165" />
        </clipPath>
        <clipPath id="hs-tri-right">
          <polygon points="100,30 100,165 175,165" />
        </clipPath>
      </defs>

      {/* Wave lines (left half) */}
      <g className="hs-waves" clipPath="url(#hs-tri-left)" stroke="#F2EDE4" strokeWidth="1.2" fill="none" strokeLinecap="round">
        {[70, 90, 110, 130, 150].map((y) => (
          <path
            key={y}
            d={`M 20 ${y} Q 35 ${y - 5}, 50 ${y} T 80 ${y} T 110 ${y}`}
          />
        ))}
      </g>

      {/* Dot grid (right half) */}
      <g className="hs-dots" clipPath="url(#hs-tri-right)" fill="#C0281E">
        {Array.from({ length: 8 }).map((_, row) =>
          Array.from({ length: 8 }).map((_, col) => (
            <circle
              key={`${row}-${col}`}
              cx={102 + col * 10}
              cy={62 + row * 13}
              r="1.6"
            />
          ))
        )}
      </g>

      {/* Triangle outline (drawn) */}
      <polygon
        className="hs-tri"
        points="100,30 25,165 175,165"
        fill="none"
        stroke="#F2EDE4"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Circle + human figure at top */}
      <g>
        <circle cx="100" cy="30" r="14" fill="none" stroke="#F2EDE4" strokeWidth="2" />
        <g className="hs-figure" fill="#F2EDE4">
          <circle cx="100" cy="26" r="3" />
          <path d="M 94 38 Q 100 30 106 38 L 105 36 Q 100 32 95 36 Z" />
          <rect x="96.5" y="32" width="7" height="7" rx="1.5" />
        </g>
      </g>
    </svg>
  );
}
