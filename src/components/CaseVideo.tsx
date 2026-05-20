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

    let direction: "forward" | "reverse" = "forward";
    let rafId: number | null = null;
    let lastTs = 0;

    const cancelReverse = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    const stepReverse = (ts: number) => {
      if (!lastTs) lastTs = ts;
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;
      const next = el.currentTime - dt;
      if (next <= 0) {
        el.currentTime = 0;
        rafId = null;
        direction = "forward";
        el.play().catch(() => {});
        return;
      }
      el.currentTime = next;
      rafId = requestAnimationFrame(stepReverse);
    };

    const onEnded = () => {
      // Boomerang: at end, switch to reverse playback via rAF
      direction = "reverse";
      el.pause();
      lastTs = 0;
      rafId = requestAnimationFrame(stepReverse);
    };
    el.addEventListener("ended", onEnded);

    const tryPlay = () => {
      cancelReverse();
      direction = "forward";
      el.play().catch(() => {});
    };

    const isTouch =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none)").matches;

    if (isTouch) {
      tryPlay();
      return () => {
        cancelReverse();
        el.removeEventListener("ended", onEnded);
      };
    }

    const target = (el.closest("[data-case-slug]") as HTMLElement) ?? el.parentElement;
    if (!target) {
      return () => {
        cancelReverse();
        el.removeEventListener("ended", onEnded);
      };
    }

    const play = () => {
      cancelReverse();
      el.currentTime = 0;
      direction = "forward";
      el.play().catch(() => {});
    };
    const pause = () => {
      cancelReverse();
      el.pause();
      el.currentTime = 0;
      direction = "forward";
    };

    target.addEventListener("mouseenter", play);
    target.addEventListener("mouseleave", pause);
    target.addEventListener("focusin", play);
    target.addEventListener("focusout", pause);

    return () => {
      cancelReverse();
      el.removeEventListener("ended", onEnded);
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
      muted
      playsInline
      preload="auto"
    />
  );
}
