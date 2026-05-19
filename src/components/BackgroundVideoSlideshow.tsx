import { useEffect, useMemo, useRef, useState } from "react";

const VIDEOS = [
  "/videos/postits.mp4",
  "/videos/hands.mp4",
  "/videos/bridge.mp4",
  "/videos/model.mp4",
  "/videos/cranes.mp4",
  "/videos/shore.mp4",
  "/videos/field.mp4",
];

const EFFECTS = ["zoom-in", "zoom-out", "pan-left", "pan-right"] as const;
type Effect = (typeof EFFECTS)[number];

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const randomEffect = (): Effect =>
  EFFECTS[Math.floor(Math.random() * EFFECTS.length)];
const randomDurationMs = () => 2000 + Math.random() * 3000;

const CROSSFADE_MS = 150;

export function BackgroundVideoSlideshow() {
  const playlist = useMemo(() => shuffle(VIDEOS), []);
  const [activeLayer, setActiveLayer] = useState<0 | 1>(0);
  const [sources, setSources] = useState<[string, string]>(() => [
    playlist[0],
    playlist[1 % playlist.length],
  ]);
  const [effects, setEffects] = useState<[Effect, Effect]>(() => [
    randomEffect(),
    randomEffect(),
  ]);

  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const refs = [videoARef, videoBRef];

  const activeLayerRef = useRef<0 | 1>(0);
  const indexRef = useRef(0);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const scheduleNext = () => {
      timeoutId = setTimeout(() => {
        const next = (indexRef.current + 1) % playlist.length;
        const afterNext = (next + 1) % playlist.length;
        const nextLayer: 0 | 1 = activeLayerRef.current === 0 ? 1 : 0;

        setEffects((prev) => {
          const updated: [Effect, Effect] = [prev[0], prev[1]];
          updated[nextLayer] = randomEffect();
          return updated;
        });

        const incoming = refs[nextLayer].current;
        if (incoming) {
          try {
            incoming.currentTime = 0;
            incoming.play().catch(() => {});
          } catch {}
        }

        setActiveLayer(nextLayer);
        activeLayerRef.current = nextLayer;
        indexRef.current = next;

        // Preload the next-next video on the hidden layer
        setSources((prev) => {
          const updated: [string, string] = [prev[0], prev[1]];
          const hiddenLayer: 0 | 1 = nextLayer === 0 ? 1 : 0;
          updated[hiddenLayer] = playlist[afterNext];
          return updated;
        });

        scheduleNext();
      }, randomDurationMs());
    };

    scheduleNext();
    return () => clearTimeout(timeoutId);
  }, [playlist]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {[0, 1].map((i) => (
        <video
          key={i}
          ref={refs[i]}
          src={sources[i]}
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
          className={`bg-slide bg-slide-${effects[i]}`}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: activeLayer === i ? 1 : 0,
            transition: `opacity ${CROSSFADE_MS}ms ease`,
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(10, 22, 40, 0.55)",
        }}
      />
    </div>
  );
}
