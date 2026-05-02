import { useEffect, useRef } from "react";
import type { CaseStudy } from "@/data/cases";
import { caseStudies } from "@/data/cases";
import { ApproachGrid } from "@/components/ApproachGrid";
import woltHeatmap from "@/assets/wolt-heatmap.png";
import boligaMockup from "@/assets/boliga-mockup.png";
import horesimQuotes from "@/assets/horesim-quotes.png";

type Props = {
  study: CaseStudy | null;
  onClose: () => void;
  onNavigate?: (study: CaseStudy) => void;
};

export function CaseModal({ study, onClose, onNavigate }: Props) {
  const open = !!study;
  const panelRef = useRef<HTMLDivElement>(null);

  // Reset scroll to top when navigating to a different case
  useEffect(() => {
    if (study && panelRef.current) {
      panelRef.current.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [study?.slug]);

  // Lock body scroll + Escape to close
  useEffect(() => {
    if (!open) return;
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!study) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Case: ${study.client} — ${study.title}`}
      className="fixed inset-0 z-[100] flex justify-end animate-in fade-in duration-200"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Luk case"
        onClick={onClose}
        className="absolute inset-0 bg-[rgba(0,0,0,0.6)] cursor-default"
      />

      {/* Panel */}
      <div ref={panelRef} className="relative ml-auto w-full md:w-[min(960px,92vw)] h-full bg-navy-deep text-cream overflow-y-auto shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Luk"
          className="sticky top-4 float-right mr-4 z-10 w-11 h-11 rounded-full bg-navy-deep/80 backdrop-blur border border-cream/20 text-cream flex items-center justify-center text-xl leading-none hover:border-ember hover:text-ember transition-colors"
        >
          ×
        </button>

        {/* Hero image */}
        <figure className="relative w-full">
          <img
            src={study.image}
            alt={`${study.client} — ${study.title}`}
            className="w-full h-[240px] sm:h-[320px] md:h-[380px] object-cover"
          />
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
                  <span aria-hidden className="text-xl leading-none">‹</span>
                </button>
                <button
                  type="button"
                  onClick={() => handle(next)}
                  aria-label={`Næste case: ${next.client}`}
                  className={`${btn} right-4`}
                >
                  <span aria-hidden className="text-xl leading-none">›</span>
                </button>
              </>
            );
          })()}
        </figure>

        {/* Title */}
        <section className="px-6 md:px-10 pt-10 md:pt-12 pb-8 border-b border-cream/10">
          <div className="flex items-center gap-3">
            <span className="eyebrow text-[16px] font-semibold tracking-[0.22em] text-[#B83A20] opacity-100">{study.client}</span>
          </div>
          <h2 className="font-display mt-6 text-[clamp(2rem,4.5vw,3.5rem)] leading-[0.98] tracking-[-0.02em] border-l-2 border-[#B83A20] pl-4">
            {study.title}
          </h2>
        </section>

        {/* Sections */}
        <article className="px-6 md:px-10 py-10 md:py-14 space-y-10 md:space-y-12">
          <ModalSection title="Kontekst">
            <p className="text-base md:text-lg text-cream/85 leading-relaxed">{study.context}</p>
          </ModalSection>

          <ModalSection title="Udfordring">
            <p className="text-base md:text-lg text-cream/85 leading-relaxed">{study.challenge}</p>
            {study.quotes && study.quotes.length > 0 && (
              <div className="mt-10">
                <span className="eyebrow text-ember tracking-[0.2em] block">— Stemmer fra feltet</span>
                <ScatteredQuotes quotes={study.quotes} />
              </div>
            )}
          </ModalSection>

          <ModalSection title="Min rolle">
            <ul className="space-y-3">
              {study.role.map((r) => (
                <li key={r} className="flex items-start gap-3 text-base md:text-lg text-cream/85 leading-relaxed">
                  <span className="text-ember shrink-0">—</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </ModalSection>

          <ModalSection title="Tilgang">
            <ApproachGrid tags={study.approach} />
          </ModalSection>

          <ModalSection title="Resultater">
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
                <img
                  src={boligaMockup}
                  alt="Boliga app mockups: vælg kommune, drømmebolig, boligtype og præferencer"
                  className="w-full max-w-[480px] h-auto"
                />
              </div>
            </div>
          )}

          {study.slug === "wolt" && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8">
              <div className="md:col-span-3" />
              <div className="md:col-span-9 flex justify-start">
                <img
                  src={woltHeatmap}
                  alt="Heatmap der viser efterspørgsel i realtid i København"
                  className="w-full max-w-[480px] h-auto"
                />
              </div>
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
              <div className="pt-8 pb-10 mt-4 border-t border-cream/10 flex items-center justify-between gap-4">
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
            );
          })()}
        </article>
      </div>
    </div>
  );
}

function ModalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8">
      <div className="md:col-span-3">
        <h3 className="font-display text-2xl md:text-3xl tracking-tight">{title}</h3>
      </div>
      <div className="md:col-span-9">{children}</div>
    </div>
  );
}
