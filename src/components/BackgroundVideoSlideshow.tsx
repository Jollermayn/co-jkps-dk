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

function randomEffect(): Effect {
  return EFFECTS[Math.floor(Math.random() * EFFECTS.length)];
}

function randomDurationMs() {
  return 2000 + Math.random() * 3000; // 2–5s
}

const CROSSFADE_MS = 150;

export function BackgroundVideoSlideshow() {
  const playlist = useMemo(() => shuffle(VIDEOS), []);
  const indexRef = useRef(0);
  const [activeLayer, setActiveLayer] = useState<0 | 1>(0);
  const [sources, setSources] = useState<[string, string]>(() => [
    playlist[0],
    playlist[1 % playlist.length],
  ]);
  const [effects, setEffects] = useState<[Effect, Effect]>(() => [
    randomEffect(),
    randomEffect(),
  ]);

  const videoRefs = [useRef<HTMLVideoElement>(null), useRef<HTMLVideoElement>(null)];

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const scheduleNext = () => {
      timeoutId = setTimeout(() => {
        const current = indexRef.current;
        const next = (current + 1) % playlist.length;
        const afterNext = (next + 1) % playlist.length;
        const nextLayer: 0 | 1 = activeLayerRef.current === 0 ? 1 : 0;

        // Set new effect + preload upcoming source on the layer becoming active
        setEffects((prev) => {
          const updated = [...prev] as [Effect, Effect];
          updated[nextLayer] = randomEffect();
          return updated;
        });

        // The incoming layer source was already set last cycle; just play it
        const incoming = videoRefs[nextLayer].current;
        if (incoming) {
          try {
            incoming.currentTime = 0;
            incoming.play().catch(() => {});
          } catch {}
        }

        setActiveLayer(nextLayer);
        activeLayerRef.current = nextLayer;
        indexRef.current = next;

        // Prepare the now-hidden layer with the source AFTER the upcoming one,
        // so it's preloaded and ready next cycle.
        setSources((prev) => {
          const updated = [...prev] as [string, string];
          const hiddenLayer: 0 | 1 = nextLayer === 0 ? 1 : 0;
          updated[hiddenLayer] = playlist[afterNext];
          return updated;
        });

        scheduleNext();
      }, randomDurationMs());
    };

    const activeLayerRef = { current: activeLayer };
    scheduleNext();
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          ref={videoRefs[i]}
          src={sources[i]}
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
          className={`bg-slide-effect-${effects[i]}`}
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
