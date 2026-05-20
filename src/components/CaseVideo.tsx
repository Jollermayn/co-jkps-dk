import { useEffect, useRef } from "react";

type Props = {
  src: string;
  poster?: string;
  ariaLabel?: string;
  className?: string;
  preload?: "none" | "metadata" | "auto";
  /** When true on touch devices, the video autoplays (used for the active carousel card). */
  active?: boolean;
  /** When true, the video autoplays (muted, looping) as soon as it scrolls into view, on all devices. Disables hover/active behavior. */
  autoplayInView?: boolean;
};

export function CaseVideo({ src, poster, ariaLabel, className, preload = "metadata", active = false, autoplayInView = false }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const touchMounted = useRef(false);

  const isTouch =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches;

  // Autoplay-in-view: IntersectionObserver drives playback, looping.
  useEffect(() => {
    if (!autoplayInView) return;
    const el = ref.current;
    if (!el) return;
    el.muted = true;
    el.loop = true;
    if (poster) el.poster = poster;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.play().catch(() => {});
          } else {
            el.pause();
          }
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [autoplayInView, poster]);

  // Touch: drive playback from `active` prop.
  // Skip the very first render so the initially-active card (index 0) doesn't
  // autoplay on mount — only play when the user swipes to this card.
  useEffect(() => {
    if (autoplayInView) return;
    if (!isTouch) return;
    const el = ref.current;
    if (!el) return;
    el.muted = true;
    if (poster) el.poster = poster;
    if (!touchMounted.current) {
      touchMounted.current = true;
      return;
    }
    if (active) {
      el.currentTime = 0;
      el.play().catch(() => {});
    } else {
      el.pause();
      // Keep last frame visible to avoid black flicker between cards.
    }
  }, [active, isTouch, autoplayInView]);

  // Non-touch: play on hover/focus of the card.
  useEffect(() => {
    if (autoplayInView) return;
    const el = ref.current;
    if (!el) return;
    el.muted = true;
    if (poster) el.poster = poster;
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
  }, [isTouch, poster, autoplayInView]);

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
      loop={autoplayInView}
      playsInline
      preload={preload}
      style={{ backgroundColor: "transparent", outline: "none", border: "none", boxShadow: "none" }}
    />
  );
}
