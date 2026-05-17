import { useEffect, useRef } from "react";

type Props = {
  src: string;
  poster?: string;
  ariaLabel?: string;
  className?: string;
};

export function CaseVideo({ src, poster, ariaLabel, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const target = (el.closest("[data-case-slug]") as HTMLElement) ?? el.parentElement;
    if (!target) return;

    const play = () => {
      el.currentTime = 0;
      el.play().catch(() => {});
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
      poster={poster}
      aria-label={ariaLabel}
      className={className}
      muted
      loop
      playsInline
      preload="metadata"
    />
  );
}
