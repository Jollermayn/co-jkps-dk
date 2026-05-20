import { useEffect, useRef, useState } from "react";
import type { CaseStudy } from "@/data/cases";
import { caseStudies } from "@/data/cases";
import { ApproachGrid } from "@/components/ApproachGrid";
import woltHeatmap from "@/assets/wolt-heatmap.png";
import boligaMockup from "@/assets/boliga-mockup.png";
import horesimQuotes from "@/assets/horesim-quotes.png";
import amnestyStudio from "@/assets/case-amnesty-studio.png";
import amnestyJournalists from "@/assets/case-amnesty-journalists.png";
import amnestyJonas from "@/assets/case-amnesty-jonas.png";
import ullaStudio from "@/assets/case-ulla-studio.webp";
import ullaPortrait from "@/assets/case-ulla-portrait.png";
import ullaSession from "@/assets/case-ulla-session.png";

import ullaGuest1 from "@/assets/case-ulla-guest-1.webp";
import ullaGuest2 from "@/assets/case-ulla-guest-2.webp";
import ullaGuest3 from "@/assets/case-ulla-guest-3.webp";
import ullaGuest4 from "@/assets/case-ulla-guest-4.webp";

type Props = {
  study: CaseStudy | null;
  onClose: () => void;
  onNavigate?: (study: CaseStudy) => void;
};

export function CaseModal({ study, onClose, onNavigate }: Props) {
  const open = !!study;
  const panelRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchActive = useRef(false);
  const axis = useRef<"v" | "h" | null>(null);
  const [dragY, setDragY] = useState(0);
  const [closing, setClosing] = useState(false);
  const [slide, setSlide] = useState<{ dir: 1 | -1; phase: "out" | "in" } | null>(null);
  const pendingDir = useRef<1 | -1 | null>(null);

  useEffect(() => {
    if (study && panelRef.current) {
      panelRef.current.scrollTo({ top: 0, behavior: "auto" });
    }
    setDragY(0);
    setClosing(false);
    if (pendingDir.current != null) {
      const dir = pendingDir.current;
      pendingDir.current = null;
      // Start from opposite side, then settle on next frame
      setSlide({ dir, phase: "in" });
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setSlide(null));
      });
    }
  }, [study?.slug]);

  const navigateDir = (dir: 1 | -1) => {
    if (!study || !onNavigate) return;
    const idx = caseStudies.findIndex((c) => c.slug === study.slug);
    if (idx === -1) return;
    const target =
      dir === 1
        ? caseStudies[(idx + 1) % caseStudies.length]
        : caseStudies[(idx - 1 + caseStudies.length) % caseStudies.length];
    setSlide({ dir, phase: "out" });
    pendingDir.current = dir;
    window.setTimeout(() => onNavigate(target), 220);
  };

  useEffect(() => {
    if (!open) return;
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") navigateDir(1);
      else if (e.key === "ArrowLeft") navigateDir(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, study?.slug, onNavigate]);

  // Horizontal wheel/trackpad swipe → navigate cases
  const wheelAccum = useRef(0);
  const wheelCooldown = useRef(false);
  useEffect(() => {
    if (!open) return;
    const el = panelRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) {
        wheelAccum.current = 0;
        return;
      }
      e.preventDefault();
      if (wheelCooldown.current) return;
      wheelAccum.current += e.deltaX;
      if (Math.abs(wheelAccum.current) > 120) {
        const dir = wheelAccum.current > 0 ? 1 : -1;
        wheelAccum.current = 0;
        wheelCooldown.current = true;
        navigateDir(dir);
        window.setTimeout(() => {
          wheelCooldown.current = false;
        }, 600);
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [open, study?.slug, onNavigate]);

  if (!study) return null;

  const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;

  const onTouchStart = (e: React.TouchEvent) => {
    const el = panelRef.current;
    if (!el) return;
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
    touchActive.current = true;
    axis.current = null;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchActive.current || touchStartY.current == null || touchStartX.current == null) return;
    const dy = e.touches[0].clientY - touchStartY.current;
    const dx = e.touches[0].clientX - touchStartX.current;
    if (axis.current == null) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      // horizontal swipes always allowed; vertical drag-to-close only on mobile when scrolled to top
      if (Math.abs(dx) > Math.abs(dy)) {
        axis.current = "h";
      } else {
        const el = panelRef.current;
        if (!isMobile || !el || el.scrollTop > 0 || dy < 0) {
          touchActive.current = false;
          return;
        }
        axis.current = "v";
      }
    }
    if (axis.current === "v" && dy > 0) setDragY(dy);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchActive.current) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current ?? 0;
    const startX = touchStartX.current ?? 0;
    const dx = endX - startX;
    const wasAxis = axis.current;
    touchActive.current = false;
    touchStartY.current = null;
    touchStartX.current = null;
    axis.current = null;

    if (wasAxis === "h" && Math.abs(dx) > 60) {
      const idx = caseStudies.findIndex((c) => c.slug === study.slug);
      if (idx !== -1 && onNavigate) {
        const target =
          dx < 0
            ? caseStudies[(idx + 1) % caseStudies.length]
            : caseStudies[(idx - 1 + caseStudies.length) % caseStudies.length];
        onNavigate(target);
      }
      return;
    }

    if (dragY > 80) {
      setClosing(true);
      setDragY(window.innerHeight);
      window.setTimeout(() => onClose(), 280);
    } else {
      setDragY(0);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Case: ${study.client} — ${study.title}`}
      className="fixed inset-0 z-[100] flex items-end justify-center md:items-stretch md:justify-end animate-in fade-in duration-200"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Luk case"
        onClick={onClose}
        className="absolute inset-0 bg-[rgba(0,0,0,0.6)] cursor-default"
        style={{ opacity: dragY > 0 ? Math.max(0, 1 - dragY / 400) : undefined }}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
        style={(() => {
          let transform: string | undefined;
          let transition: string | undefined;
          if (dragY > 0) {
            transform = `translateY(${dragY}px)`;
            transition = touchActive.current ? "none" : closing || dragY === 0 ? "transform 280ms ease-out" : undefined;
          } else if (slide) {
            // Slide direction: dir=1 (next) → old exits left, new enters from right
            const offset = slide.phase === "out"
              ? (slide.dir === 1 ? -window.innerWidth : window.innerWidth)
              : (slide.dir === 1 ? window.innerWidth : -window.innerWidth);
            transform = `translateX(${offset}px)`;
            transition = slide.phase === "out" ? "transform 260ms ease-in" : "none";
          } else if (!dragY) {
            transition = "transform 320ms cubic-bezier(0.22, 0.61, 0.36, 1)";
          }
          return { transform, transition };
        })()}
        className="relative w-full h-[92vh] rounded-t-2xl md:rounded-none md:ml-auto md:w-[min(960px,92vw)] md:h-full bg-[#0D1B2A] text-cream overflow-y-auto shadow-2xl animate-in slide-in-from-bottom md:slide-in-from-right md:slide-in-from-bottom-0 duration-300 overscroll-contain"
      >
        {/* Mobile drag handle */}
        <div className="md:hidden sticky top-0 z-30 flex justify-center pt-3 pb-2 bg-[#0D1B2A]">
          <span aria-hidden className="block w-10 h-1 rounded-full bg-white/30" />
        </div>
        {/* Hero image */}
        <figure className="relative w-full">
          {study.video ? (
            <video
              key={study.slug}
              src={study.video}
              aria-label={`${study.client} — ${study.title}`}
              className="block w-full h-[240px] sm:h-[320px] md:h-[420px] max-h-[420px] object-cover bg-[#0A1628]"
              style={{ backgroundColor: "#0A1628" }}
              autoPlay
              muted
              playsInline
              preload="auto"
            />
          ) : (
            <img
              src={study.image}
              alt={`${study.client} — ${study.title}`}
              className="block w-full h-[240px] sm:h-[320px] md:h-[420px] max-h-[420px] object-cover"
            />
          )}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-32 md:h-40 bg-gradient-to-b from-transparent to-[#0D1B2A]"
          />
          {/* Close (desktop only) */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Luk"
            className="hidden md:flex absolute top-4 right-4 z-30 w-11 h-11 rounded-full bg-[#0D1B2A]/80 backdrop-blur border border-cream/20 text-cream items-center justify-center text-xl leading-none hover:border-ember hover:text-ember transition-colors"
          >
            ×
          </button>
          {(() => {
            const idx = caseStudies.findIndex((c) => c.slug === study.slug);
            if (idx === -1) return null;
            const prev = caseStudies[(idx - 1 + caseStudies.length) % caseStudies.length];
            const next = caseStudies[(idx + 1) % caseStudies.length];
            const handle = (s: CaseStudy) => {
              if (onNavigate) onNavigate(s);
            };
            const btn =
              "absolute top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-cream/25 bg-black/55 backdrop-blur text-cream flex items-center justify-center transition-colors hover:border-[#B83A20] hover:text-[#B83A20] hover:bg-black/70";
            return (
              <>
                <button
                  type="button"
                  onClick={() => handle(prev)}
                  aria-label={`Forrige case: ${prev.client}`}
                  className={`${btn} left-4`}
                >
                  <span aria-hidden className="text-xl leading-none">
                    ‹
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => handle(next)}
                  aria-label={`Næste case: ${next.client}`}
                  className={`${btn} right-4`}
                >
                  <span aria-hidden className="text-xl leading-none">
                    ›
                  </span>
                </button>
              </>
            );
          })()}
        </figure>

        {/* Title */}
        <section className="px-6 md:px-10 pt-10 md:pt-12 pb-8 border-b border-cream/10">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="eyebrow text-[16px] font-semibold tracking-[0.22em] text-[#B83A20] opacity-100">
              {study.client}
            </span>
            {study.status === "ongoing" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-cream/40 text-[10px] tracking-[0.15em] uppercase text-cream/85 font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-ember animate-pulse" />
                {study.statusLabel ?? "Igangværende projekt"}
              </span>
            )}
          </div>
          <h2 className="font-display mt-6 text-[clamp(2rem,4.5vw,3.5rem)] leading-[0.98] tracking-[-0.02em]">
            {study.title}
          </h2>
        </section>

        {/* Sections */}
        <article key={study.slug} className="px-6 md:px-10 py-10 md:py-14 space-y-10 md:space-y-12">
          <style>{`
            .case-section-anim {
              opacity: 0;
              transform: translateY(20px);
              transition: opacity 0.8s ease-out, transform 0.8s ease-out;
            }
            .case-section-anim.is-visible {
              opacity: 1;
              transform: translateY(0);
            }
          `}</style>
          <ModalSection title="Kontekst" rootRef={panelRef}>
            <p className="text-base md:text-lg text-cream/85 leading-relaxed">{study.context}</p>
          </ModalSection>

          <ModalSection title="Udfordring" rootRef={panelRef}>
            <p className="text-base md:text-lg text-cream/85 leading-relaxed">{study.challenge}</p>
            {study.slug === "interaktiv-horesimulering" && (
              <>
                <span className="eyebrow text-ember tracking-[0.2em] block mt-10">— Stemmer fra feltet</span>
                <div className="relative mt-6">
                  <img
                    src={horesimQuotes}
                    alt="Citater fra hørehæmmede elever, lærere og eksperter"
                    className="w-full h-auto"
                  />
                  <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-24 md:h-32 bg-gradient-to-b from-transparent to-[#0D1B2A]" />
                </div>
              </>
            )}
          </ModalSection>

          <ModalSection title="Min rolle" rootRef={panelRef}>
            <ul className="space-y-3">
              {study.role.map((r) => (
                <li key={r} className="flex items-start gap-3 text-base md:text-lg text-cream/85 leading-relaxed">
                  <span className="text-ember shrink-0">—</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </ModalSection>

          <ModalSection title="Tilgang" rootRef={panelRef}>
            <ApproachGrid tags={study.approach} />
          </ModalSection>

          <ModalSection title="Resultater" rootRef={panelRef}>
            <ul className="space-y-3">
              {study.outcomes.map((o) => (
                <li key={o} className="flex items-start gap-3 text-base md:text-lg text-cream/85 leading-relaxed">
                  <span className="text-ember shrink-0">→</span>
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </ModalSection>

          {study.slug === "boliga" && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8">
              <div className="md:col-span-3" />
              <div className="md:col-span-9 flex justify-start">
                <div className="relative w-full max-w-[480px]">
                  <img
                    src={boligaMockup}
                    alt="Boliga app mockups: vælg kommune, drømmebolig, boligtype og præferencer"
                    className="w-full h-auto"
                  />
                  <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-24 md:h-32 bg-gradient-to-b from-transparent to-[#0D1B2A]" />
                </div>
              </div>
            </div>
          )}

          {study.slug === "wolt" && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8">
              <div className="md:col-span-3" />
              <div className="md:col-span-9 flex justify-start">
                <div className="relative w-full max-w-[384px]">
                  <img
                    src={woltHeatmap}
                    alt="Heatmap der viser efterspørgsel i realtid i København"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          )}

          {study.slug === "amnesty-international" && (
            <div className="mt-12 flex flex-col" style={{ gap: "4px" }}>
              <div className="overflow-hidden aspect-[21/9]">
                <img
                  src={amnestyStudio}
                  alt="Lydstudie med person i optagerum"
                  loading="lazy"
                  className="w-full h-full object-cover grayscale transition-transform duration-300 ease-in-out hover:scale-105"
                />
              </div>
              <div className="grid grid-cols-2" style={{ gap: "4px" }}>
                {[
                  { src: amnestyJournalists, alt: "Journalister ved bord" },
                  { src: amnestyJonas, alt: "Jonas ved mixerpult i studie" },
                ].map((img, i) => (
                  <div key={i} className="overflow-hidden aspect-[4/3]">
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="w-full h-full object-cover grayscale transition-transform duration-300 ease-in-out hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {study.slug === "ulla-dyrlov" && (
            <div className="mt-12 [column-fill:_balance] columns-1 sm:columns-2 lg:columns-3" style={{ columnGap: "4px" }}>
              {[
                { src: ullaPortrait, alt: "Ulla Dyrløv ved mikrofonen" },
                { src: ullaStudio, alt: "Studierum hos Ulla Dyrløv" },
                { src: ullaSession, alt: "Podcastoptagelse i gang" },
                { src: ullaGuest1, alt: "Gæst 1 i Forældreskabet" },
                { src: ullaGuest2, alt: "Gæst 2 i Forældreskabet" },
                { src: ullaGuest3, alt: "Gæst 3 i Forældreskabet" },
                { src: ullaGuest4, alt: "Gæst 4 i Forældreskabet" },
              ].map((item, i) => (
                <img
                  key={i}
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="mb-1 block w-full h-auto break-inside-avoid grayscale hover:grayscale-0 transition-[filter,transform] duration-300 ease-in-out hover:scale-105"
                  style={{ objectFit: "contain" }}
                />
              ))}
            </div>
          )}

          {study.gallery && study.gallery.length > 0 && (
            <div className="space-y-4 md:space-y-6">
              <img
                src={study.gallery[0]}
                alt={`${study.client} — billede 2`}
                loading="lazy"
                className="w-full h-auto rounded-md"
              />
              {study.gallery.length > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {study.gallery.slice(1).map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`${study.client} — billede ${i + 3}`}
                      loading="lazy"
                      className="w-full h-auto rounded-md object-cover"
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {(() => {
            const idx = caseStudies.findIndex((c) => c.slug === study.slug);
            if (idx === -1) return null;
            const prev = caseStudies[(idx - 1 + caseStudies.length) % caseStudies.length];
            const next = caseStudies[(idx + 1) % caseStudies.length];
            const handle = (s: CaseStudy) => {
              if (onNavigate) onNavigate(s);
            };
            return (
              <div className="pt-8 pb-10 mt-4 border-t border-cream/10">
                <div className="flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => handle(prev)}
                    className="text-[#B83A20] hover:underline underline-offset-4 text-base md:text-lg tracking-wide"
                  >
                    ← Forrige case
                  </button>
                  <button
                    type="button"
                    onClick={() => handle(next)}
                    className="text-[#B83A20] hover:underline underline-offset-4 text-base md:text-lg tracking-wide"
                  >
                    Næste case →
                  </button>
                </div>
                <div className="mt-6 flex justify-center">
                  <button
                    type="button"
                    onClick={onClose}
                    className="text-[#C0281E] hover:underline underline-offset-4 text-base md:text-lg tracking-wide bg-transparent border-0 p-0"
                  >
                    ✕ Luk
                  </button>
                </div>
              </div>
            );
          })()}
        </article>
      </div>
    </div>
  );
}


function ModalSection({
  title,
  rootRef,
  children,
}: {
  title: string;
  rootRef?: React.RefObject<HTMLElement | null>;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { root: rootRef?.current ?? null, threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootRef]);
  return (
    <div
      ref={ref}
      className={`case-section-anim grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8${visible ? " is-visible" : ""}`}
    >
      <div className="md:col-span-3">
        <h3 className="font-display text-2xl md:text-3xl tracking-tight">{title}</h3>
      </div>
      <div className="md:col-span-9">{children}</div>
    </div>
  );
}
