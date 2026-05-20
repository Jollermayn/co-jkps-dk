import { useEffect, useRef } from "react";

type Props = {
  src: string;
  poster?: string;
  ariaLabel?: string;
  className?: string;
  preload?: "none" | "metadata" | "auto";
};

export function CaseVideo({ src, poster, ariaLabel, className, preload = "metadata" }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.muted = true;

    const isTouch =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none)").matches;
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
      preload={preload}
    />
  );
}
