import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { caseStudies, type CaseStudy } from "@/data/cases";
import { TAG_TO_SLUGS, TAG_HEADLINES } from "@/data/tag-cases";

interface Props {
  tag: string;
  /** Optional slug to exclude (e.g. the current case page) */
  excludeSlug?: string;
  /** Visual variant */
  variant?: "skill" | "approach";
  /** When provided, clicking a related case calls this instead of navigating */
  onSelectCase?: (study: CaseStudy) => void;
}

export function TagWithCases({ tag, excludeSlug, variant = "skill", onSelectCase }: Props) {
  const [open, setOpen] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const slugs = (TAG_TO_SLUGS[tag] ?? []).filter((s) => s !== excludeSlug);
  const hasCases = slugs.length > 0;
  const useHover = variant === "approach" && canHover;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHover(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!open || useHover) return;
    const onDocClick = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, useHover]);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  const handleMouseEnter = () => {
    if (!useHover || !hasCases) return;
    cancelClose();
    setOpen(true);
  };

  const handleMouseLeave = () => {
    if (!useHover) return;
    scheduleClose();
  };

  const handleClick = () => {
    if (useHover) return; // hover handles it on desktop for approach
    setOpen((o) => !o);
  };

  const buttonClasses =
    variant === "approach"
      ? "text-xs tracking-wide uppercase border px-3 py-1.5 transition-colors " +
        (open
          ? "bg-ember border-ember text-cream"
          : hasCases
            ? "border-cream/25 text-cream/80 hover:border-ember hover:text-cream cursor-pointer"
            : "border-cream/15 text-cream/50 cursor-default")
      : "text-[11px] tracking-wide uppercase border px-2.5 py-1 transition-colors " +
        (open
          ? "bg-ember border-ember text-cream"
          : hasCases
            ? "border-cream/20 text-cream/70 hover:border-ember hover:text-cream cursor-pointer"
            : "border-cream/10 text-cream/40 cursor-default");

  return (
    <li
      ref={ref}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        disabled={!hasCases}
        onClick={handleClick}
        onFocus={useHover ? handleMouseEnter : undefined}
        onBlur={useHover ? handleMouseLeave : undefined}
        aria-expanded={open}
        className={buttonClasses}
      >
        {tag}
      </button>
      {open && hasCases && (
        <div className="absolute z-30 left-0 top-full mt-2 w-72 bg-navy-deep border border-cream/15 shadow-2xl p-4 animate-in fade-in slide-in-from-top-1 duration-150">
          <div
            className="text-cream/55 uppercase font-semibold mb-3"
            style={{ fontSize: 9, letterSpacing: "0.18em" }}
          >
            Relaterede cases
          </div>
          <ul className="flex flex-col gap-2">
            {slugs.map((slug) => {
              const study = caseStudies.find((s) => s.slug === slug);
              if (!study) return null;
              return (
                <li key={slug}>
                  <Link
                    to="/cases/$slug"
                    params={{ slug }}
                    onClick={() => setOpen(false)}
                    className="group/case flex items-start gap-3 p-2 -mx-2 rounded hover:bg-cream/5 transition-colors"
                  >
                    <img
                      src={study.image}
                      alt=""
                      className="w-12 h-12 object-cover shrink-0 grayscale group-hover/case:grayscale-0 transition-all duration-300"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-display font-semibold text-cream leading-tight">
                        {study.client}
                      </div>
                      <div className="text-xs text-cream/65 leading-snug mt-0.5 truncate">
                        {TAG_HEADLINES[slug] ?? study.title}
                      </div>
                    </div>
                    <span
                      aria-hidden
                      className="text-cream/40 group-hover/case:text-ember transition-colors text-sm"
                    >
                      ↗
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </li>
  );
}
