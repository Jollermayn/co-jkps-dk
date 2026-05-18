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

    // Ensure autoplay kicks in on mobile (iOS Safari / Android Chrome)
    el.muted = true;
    const tryPlay = () => el.play().catch(() => {});
    tryPlay();

    const isTouch =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none)").matches;
    if (isTouch) return;

    const target = (el.closest("[data-case-slug]") as HTMLElement) ?? el.parentElement;
    if (!target) return;

    const play = () => {
      el.currentTime = 0;
      tryPlay();
    };
    const pause = () => {
      el.pause();
      el.currentTime = 0;
    };

    target.addEventListener("mouseenter", play);
    target.addEventListener("mouseleave", pause);
    target.addEventListener("focusin", play);
    target.addEventListener("focusout", pause);

    return () => {
      target.removeEventListener("mouseenter", play);
      target.removeEventListener("mouseleave", pause);
      target.removeEventListener("focusin", play);
      target.removeEventListener("focusout", pause);
    };
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      aria-label={ariaLabel}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
    />
  );
}
