import { useEffect, useRef } from "react";

type Props = {
  src: string;
  poster?: string;
  ariaLabel?: string;
  className?: string;
};

export function CaseVideo({ src, ariaLabel, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.muted = true;
    // Autoplay once on mount; video stops on the last frame (no loop attribute).
    el.play().catch(() => {});

    const isTouch =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none)").matches;

    if (isTouch) return;

    const target = (el.closest("[data-case-slug]") as HTMLElement) ?? el.parentElement;
    if (!target) return;

    // On hover: restart from the beginning and play through once.
    const replay = () => {
      el.currentTime = 0;
      el.play().catch(() => {});
    };

    target.addEventListener("mouseenter", replay);
    target.addEventListener("focusin", replay);

    return () => {
      target.removeEventListener("mouseenter", replay);
      target.removeEventListener("focusin", replay);
    };
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      aria-label={ariaLabel}
      className={className}
      muted
      playsInline
      preload="auto"
    />
  );
}
