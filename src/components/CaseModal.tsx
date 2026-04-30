import { useEffect, useRef } from "react";
import type { CaseStudy } from "@/data/cases";
import { caseStudies } from "@/data/cases";
import { TagWithCases } from "@/components/TagWithCases";
import woltHeatmap from "@/assets/wolt-heatmap.png";

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
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
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
        <figure className="w-full">
          <img
            src={study.image}
            alt={`${study.client} — ${study.title}`}
            className="w-full h-[240px] sm:h-[320px] md:h-[380px] object-cover"
          />
        </figure>

        {/* Title */}
        <section className="px-6 md:px-10 pt-10 md:pt-12 pb-8 border-b border-cream/10">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-ember" />
            <span className="eyebrow text-ember">Case · {study.client}</span>
          </div>
          <h2 className="font-display mt-6 text-[clamp(2rem,4.5vw,3.5rem)] leading-[0.98] tracking-[-0.02em]">
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

          {study.slug === "wolt" && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8">
              <div className="md:col-span-3" />
              <div className="md:col-span-9 flex justify-center">
                <img
                  src={woltHeatmap}
                  alt="Heatmap der viser efterspørgsel i realtid i København"
                  className="w-full max-w-[480px] h-auto"
                />
              </div>
            </div>
          )}

          <ModalSection title="Tilgang">
            <ul className="flex flex-wrap gap-2">
              {study.approach.map((t) => (
                <TagWithCases key={t} tag={t} excludeSlug={study.slug} variant="approach" />
              ))}
            </ul>
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

          {(() => {
            const idx = caseStudies.findIndex((c) => c.slug === study.slug);
            if (idx === -1) return null;
            const prev = caseStudies[(idx - 1 + caseStudies.length) % caseStudies.length];
            const next = caseStudies[(idx + 1) % caseStudies.length];
            const handle = (s: CaseStudy) => {
              if (onNavigate) onNavigate(s);
            };
            return (
              <div className="pt-8 mt-4 border-t border-cream/10 flex flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => handle(prev)}
                  aria-label={`Forrige case: ${prev.client}`}
                  className="group inline-flex items-center gap-3 sm:gap-4 text-left"
                >
                  <span className="w-12 h-12 rounded-full border border-cream/25 text-cream flex items-center justify-center transition-colors group-hover:border-[#C0281E] group-hover:text-[#C0281E]">
                    <span aria-hidden className="text-xl leading-none">←</span>
                  </span>
                  <span className="hidden sm:flex flex-col">
                    <span className="eyebrow text-ember">Forrige case</span>
                    <span className="font-display text-xl mt-1 group-hover:text-[#C0281E] transition-colors">
                      {prev.client}
                    </span>
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => handle(next)}
                  aria-label={`Næste case: ${next.client}`}
                  className="group inline-flex flex-row-reverse items-center gap-3 sm:gap-4 text-right"
                >
                  <span className="w-12 h-12 rounded-full border border-cream/25 text-cream flex items-center justify-center transition-colors group-hover:border-[#C0281E] group-hover:text-[#C0281E]">
                    <span aria-hidden className="text-xl leading-none">→</span>
                  </span>
                  <span className="hidden sm:flex flex-col items-end">
                    <span className="eyebrow text-ember">Næste case</span>
                    <span className="font-display text-xl mt-1 group-hover:text-[#C0281E] transition-colors">
                      {next.client}
                    </span>
                  </span>
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
