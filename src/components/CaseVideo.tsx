import { useEffect, useRef } from "react";

type Props = {
  src: string;
  poster?: string;
  ariaLabel?: string;
  className?: string;
  preload?: "none" | "metadata" | "auto";
  /** When true on touch devices, the video autoplays (used for the active carousel card). */
  active?: boolean;
};

export function CaseVideo({ src, poster, ariaLabel, className, preload = "metadata", active = false }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  const isTouch =
    typeof window !== "undefined" &&
    window.matchMedia("(hover: none)").matches;

  // Touch: drive playback from `active` prop.
  useEffect(() => {
    if (!isTouch) return;
    const el = ref.current;
    if (!el) return;
    el.muted = true;
    if (active) {
      el.currentTime = 0;
      el.play().catch(() => {});
    } else {
      el.pause();
      // Keep last frame visible to avoid black flicker between cards.
    }
  }, [active, isTouch]);

  // Non-touch: play on hover/focus of the card.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.muted = true;
    if (isTouch) return;

    const target = (el.closest("[data-case-slug]") as HTMLElement) ?? el.parentElement;
    if (!target) return;

    const play = () => {
      el.currentTime = 0;
      el.play().catch(() => {});
    };
    const stop = () => {
      el.pause();
      el.currentTime = 0;
    };

    target.addEventListener("mouseenter", play);
    target.addEventListener("focusin", play);
    target.addEventListener("mouseleave", stop);
    target.addEventListener("focusout", stop);

    return () => {
      target.removeEventListener("mouseenter", play);
      target.removeEventListener("focusin", play);
      target.removeEventListener("mouseleave", stop);
      target.removeEventListener("focusout", stop);
    };
  }, [isTouch]);

  // iOS Safari won't paint a video's first frame without a poster unless the
  // src includes a media fragment time. Append #t=0.001 when no poster is set.
  const resolvedSrc = poster ? src : `${src}${src.includes("#") ? "" : "#t=0.001"}`;

  return (
    <video
      ref={ref}
      src={resolvedSrc}
      poster={poster}
      aria-label={ariaLabel}
      className={className}
      muted
      loop
      playsInline
      preload={preload}
    />
  );
}
