import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { caseStudies, type CaseStudy } from "@/data/cases";

import { CaseModal } from "@/components/CaseModal";
import profilePhoto from "@/assets/profile-photo.png";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jonas K.P. Sørensen — Digital konsulent · Brugeroplevelse & digitale løsninger" },
      {
        name: "description",
        content:
          "Selvstændig digital konsulent fra Aarhus. UX research, service design, digital strategi og medieproduktion siden 2016.",
      },
      { property: "og:title", content: "Jonas K.P. Sørensen — Digital konsulent" },
      {
        property: "og:description",
        content:
          "Brugeroplevelse & digitale løsninger. UX research, service design, digital strategi og medieproduktion.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

const competencies = [
  {
    no: "1",
    title: "UX Research",
    sub: "Research & Brugerinddragelse",
    body:
      "Dybdegående indsigt gennem interviews, observationer, co-design og brugertest. Jeg oversætter kompleks adfærd til handlebare designbeslutninger.",
    tags: [
      "Semistrukturerede interviews",
      "Feltobservation",
      "Co-design",
      "Mixed methods",
      "Facilitering",
      "Workshops",
    ],
  },
  {
    no: "2",
    title: "Service- & Konceptdesign",
    sub: "Fra problem til realiserbart koncept",
    body:
      "Fra identifikation af problemet til et konkret, realiserbart koncept. Jeg designer brugerrejser, touchpoints og serviceoplevelser der skaber reel værdi.",
    tags: ["Brugerrejser", "Touchpoint-mapping", "Participatorisk design", "Konceptvalidering"],
  },
  {
    no: "3",
    title: "Digital Strategi & Brand",
    sub: "Stemme, position og indhold",
    body:
      "Strategisk rådgivning om digital tilstedeværelse, indhold og positionering. Jeg hjælper organisationer med at finde og kommunikere deres unikke stemme.",
    tags: ["Kommunikationsstrategi", "Visuel identitet", "Indholdsarkitektur", "Positionering"],
  },
  {
    no: "4",
    title: "Medie- & Lydproduktion",
    sub: "Fra studie til kanal",
    body:
      "Professionel podcast-, video- og lydproduktion fra studie til kanal. Teknisk kompetence kombineret med journalistisk næse for det gode indhold.",
    tags: ["Redaktionel tilrettelæggelse", "Postproduktion", "Indholdsproduktion"],
  },
];




const partners = [
  { slug: "danmarks-radio", name: "Danmarks Radio", note: "Broadcast, podcastproduktion og tværgående koordinering" },
  { slug: "danmarks-naturfredningsforening", name: "Danmarks Naturfredningsforening", note: "Kommunikation om bæredygtighed og brandudvikling" },
  { slug: "amnesty-international", name: "Amnesty International", note: "Journalistisk formidling af menneskerettighedsspørgsmål" },
  { slug: "ulla-dyrlov", name: "Ulla Dyrløv", note: "Koncept- og platformudvikling med fokus på børns trivsel" },
  { slug: "concerto-copenhagen", name: "Concerto Copenhagen", note: "Engagement af publikum gennem kulturformidling" },
  { slug: "art-spirit-coaching", name: "Art Spirit Coaching", note: "Brand, koncept og kommunikation fra idé til lancering" },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex flex-col items-stretch w-fit cursor-default">
      <span className="eyebrow text-ember">{children}</span>
      <span aria-hidden className="mt-1.5 block h-px w-1/2 bg-[#C0281E]" />
    </span>
  );
}

const TYPE_SPEED = 50;
const LINE_PAUSE = 600;

const typewriterLines = [
  "The Ai paradox:",
  "Too much A",
  "Not enough i",
];

// For lines with a highlighted segment near the end, define [startFromEnd, length] of the red box.
const HIGHLIGHT_RANGE: Record<number, { fromEnd: number; length: number }> = {
  1: { fromEnd: 1, length: 1 }, // "A" at end of line 2
  2: { fromEnd: 1, length: 1 }, // "i" at end of line 3
};

function TypewriterQuote() {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    if (lineIdx >= typewriterLines.length) return;
    const current = typewriterLines[lineIdx];

    if (charIdx < current.length) {
      const t = setTimeout(() => setCharIdx((c) => c + 1), TYPE_SPEED);
      return () => clearTimeout(t);
    }
    // line complete — pause then advance
    const t = setTimeout(() => {
      setLineIdx((i) => i + 1);
      setCharIdx(0);
    }, LINE_PAUSE);
    return () => clearTimeout(t);
  }, [lineIdx, charIdx]);

  const ariaLabel = typewriterLines.join(" ");

  const renderLine = (i: number) => {
    if (i > lineIdx) return "\u00A0";
    const full = typewriterLines[i];
    const shown = i < lineIdx ? full : full.slice(0, charIdx);
    const range = HIGHLIGHT_RANGE[i];
    if (range) {
      const start = full.length - range.fromEnd;
      const end = start + range.length;
      const before = shown.slice(0, Math.min(shown.length, start));
      const highlight = shown.length > start ? shown.slice(start, Math.min(shown.length, end)) : "";
      const after = shown.length > end ? shown.slice(end) : "";
      return (
        <>
          {before}
          {highlight && (
            <span className="not-italic font-black text-cream bg-[#C0281E] whitespace-nowrap px-[6px] py-[2px]">
              {highlight}
            </span>
          )}
          {after}
        </>
      );
    }
    return shown || "\u00A0";
  };

  // Reserve full height up-front so buttons below don't shift while typing.
  // Line 1 = 1.15em * 1.2 lh + 0.35em margin; lines 2-3 = 1em * 1.5 lh each.
  const reservedEm = 1.15 * 1.2 + 0.35 + 2 * 1.5;
  return (
    <p
      className="hero-quote font-display italic font-semibold leading-[1.5] text-cream/95"
      style={{ fontSize: "clamp(1.25rem, 1.8vw, 2rem)", minHeight: `${reservedEm}em` }}
      aria-label={ariaLabel}
    >
      {typewriterLines.map((_, i) => (
        <span
          key={i}
          aria-hidden
          className="block whitespace-nowrap"
          style={i === 0 ? { fontSize: "1.15em", lineHeight: 1.2, marginBottom: "0.35em" } : undefined}
        >
          {renderLine(i)}
        </span>
      ))}
    </p>
  );
}

function Sidebar() {
  return (
    <aside className="hero-sidebar relative w-full min-w-0 max-w-full flex flex-col gap-16 lg:gap-12 lg:fixed lg:top-0 lg:right-0 lg:w-[40%] lg:h-screen lg:overflow-hidden px-6 md:px-14 lg:px-16 py-12 md:py-20 lg:py-16 border-b lg:border-b-0 lg:border-l border-cream/10 order-1 lg:order-last bg-[#0D1B2A] lg:z-20 lg:rounded-l-xl lg:shadow-[-8px_0_24px_rgba(0,0,0,0.25)] text-center items-center lg:justify-center">
      <div className="w-full flex flex-col gap-3 lg:gap-4 items-center text-center">
        <h1 className="font-display tracking-[-0.02em] font-medium text-center px-2 flex flex-col items-center leading-none">
          <span className="block text-[clamp(2.25rem,9vw,4.5rem)] leading-none">
            <span className="font-bold text-[#C0281E]">J</span>onas
          </span>
          <span className="block text-[clamp(1.25rem,4.25vw,2.125rem)] font-bold text-[#C0281E] leading-none my-[0.15em]">
            K.P.
          </span>
          <span className="block text-[clamp(2.25rem,9vw,4.5rem)] leading-none -mt-[0.08em]">
            <span className="font-bold text-[#C0281E]">S</span>ørensen
          </span>
        </h1>
        <p className="hero-subtitle text-lg leading-relaxed lg:text-2xl lg:leading-snug text-cream/85 font-display italic text-center">
          Digital konsulent.
        </p>
        <blockquote className="max-w-full w-full text-center mt-16 lg:mt-24 lg:-translate-y-[15px]">
          <TypewriterQuote />
        </blockquote>
      </div>

      <div className="flex flex-col items-center gap-6 lg:gap-3 w-full text-center lg:translate-y-[15px]">
        <a
          href="/jonas-kp-sorensen-cv.pdf"
          download
          className="inline-flex items-center justify-center gap-3 px-6 py-2.5 text-sm tracking-wide rounded-lg border border-cream/40 text-cream hover:border-cream hover:bg-cream/5 transition-all duration-200 ease-out"
        >
          Download CV (PDF)
        </a>
        <a
          href="#kontakt"
          className="inline-flex items-center justify-center gap-2 text-[1.1rem] font-bold tracking-wide text-[#C0281E] hover:text-[#C0281E]/80 transition-colors"
        >
          Lad os tales ved
        </a>
      </div>
    </aside>
  );
}

function Index() {
  return (
    <main id="top" className="w-full min-w-0 max-w-full overflow-x-clip text-cream lg:bg-[#0D1B2A]">
      <div className="w-full min-w-0 max-w-full flex flex-col lg:block">
        {/* LEFT — scrolling content */}
        <div className="w-full min-w-0 max-w-full lg:max-w-[60%] lg:w-[60%] order-2 lg:order-none bg-navy-deep lg:mt-11 lg:rounded-t-xl lg:shadow-[0_-8px_24px_rgba(0,0,0,0.2)] lg:mr-[40%]">
          {/* OM MIG */}
          <section id="om" className="py-16 md:py-20">
            <div className="px-12 md:px-14">
              <Eyebrow>Om mig</Eyebrow>
              <div className="mt-8 max-w-3xl space-y-6 text-cream/80 text-lg leading-relaxed">
                <p>
                  Siden 2016 har jeg drevet egen konsulent- og medieproduktionsvirksomhed — med fokus på
                  samspillet mellem mennesker, teknologi og forretning.
                </p>
                <p>
                  Fælles for alt mit arbejde er interessen for det øjeblik hvor noget abstrakt bliver konkret —
                  hvor en idé finder sin form, en oplevelse finder sit udtryk, en fortælling finder sin modtager.
                  Jeg er på hjemmebane når disciplinerne overlapper, og tiltrukket af de projekter der ikke
                  lader sig løse med én faglighed alene.
                </p>
                <p className="text-cream/60 italic font-display">
                  Privat er jeg familiefar, naturmenneske og det, man nok ville kalde en seriøs lytter.
                </p>
              </div>
            </div>
          </section>

          {/* CASES */}
          <CasesSection />

          {/* KOMPETENCER */}
          <section id="kompetencer" className="py-16 md:py-20">
            <div className="px-5 md:px-14">
              <div className="mb-10 md:mb-14">
                <Eyebrow>Kompetencer</Eyebrow>
                <h2 className="font-display text-5xl md:text-7xl mt-6 leading-[0.95] tracking-tight">
                  Hvad jeg <span className="italic">bringer</span>
                </h2>
                <p className="mt-8 max-w-2xl text-lg text-cream/75 leading-relaxed">
                  Jeg arbejder i skæringsfeltet mellem strategi, design og teknologi — og bringer alle tre
                  perspektiver ind i hvert projekt.
                </p>
              </div>

              <KompetencerList />

            </div>
          </section>

          {/* UDDANNELSE */}
          <section id="uddannelse" className="py-16 md:py-20">
            <div className="px-12 md:px-14">
              <div className="mb-16">
                <Eyebrow>Uddannelse</Eyebrow>
                <h2 className="font-display text-5xl md:text-7xl mt-6 leading-[0.95] tracking-tight">
                  Mit faglige <span className="italic text-ember">ståsted</span>
                </h2>
                <p className="mt-8 max-w-2xl text-lg text-cream/75 leading-relaxed">
                  Hvor analytisk overblik møder en kreativ og praksisnær tilgang.
                </p>
              </div>

              <ul className="divide-y divide-cream/10 border-y border-cream/10">
                <li className="py-8 md:py-10 grid grid-cols-12 gap-6">
                  <span className="col-span-2 md:col-span-1 font-display text-2xl text-ember">01</span>
                  <div className="col-span-10 md:col-span-11 lg:col-span-6">
                    <h3 className="font-display text-2xl md:text-[1.7rem] tracking-tight leading-snug break-words [overflow-wrap:anywhere]">Cand.it · Digital Design og Interaktive Teknologier</h3>
                    <p className="mt-2 text-sm text-cream/55 italic">IT-Universitetet København · 2024</p>
                  </div>
                  <p className="col-span-12 lg:col-span-5 lg:col-start-auto col-start-3 md:col-start-2 lg:mt-0 mt-3 text-cream/80 leading-relaxed">
                    Tværfagligt kandidatprogram med fokus på interaktionsdesign, UX research og digitale teknologier.
                  </p>
                </li>
                <li className="py-8 md:py-10 grid grid-cols-12 gap-6">
                  <span className="col-span-2 md:col-span-1 font-display text-2xl text-ember">02</span>
                  <div className="col-span-10 md:col-span-11 lg:col-span-6">
                    <h3 className="font-display text-2xl md:text-[1.7rem] tracking-snug leading-snug break-words [overflow-wrap:anywhere]">Professionsbachelor · Medie- og sonokommunikation</h3>
                    <p className="mt-2 text-sm text-cream/55 italic">Sonic College · 2016</p>
                  </div>
                  <p className="col-span-12 lg:col-span-5 lg:col-start-auto col-start-3 md:col-start-2 lg:mt-0 mt-3 text-cream/80 leading-relaxed">
                    Praksisnær uddannelse i lyd, medieproduktion og kommunikation.
                  </p>
                </li>
              </ul>

            </div>
          </section>

          {/* KONTAKT */}
          <section id="kontakt" className="py-16 md:py-20 relative overflow-hidden">
            <div className="px-12 md:px-14 relative">
              <Eyebrow>Kontakt · Portfolio 2026</Eyebrow>
              <h2 className="font-display text-5xl md:text-8xl mt-8 leading-[0.9] tracking-tight">
                Lad os <span className="italic text-ember">tales ved</span>
              </h2>
              <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <img
                  src={profilePhoto}
                  alt="Jonas K.P. Sørensen"
                  className="shrink-0 w-[120px] h-[120px] md:w-[140px] md:h-[140px] rounded-full object-cover shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
                />
                <p className="max-w-xl text-cream/70 text-lg italic font-display">
                  Jeg er altid interesseret i nye samarbejder — store som små, kommercielle som kulturelle.
                </p>
              </div>

              <div className="mt-16 grid grid-cols-12 gap-6 md:gap-10">
                <div className="col-span-12 md:col-span-4">
                  <span className="eyebrow text-ember">Email</span>
                  <a
                    href="mailto:Jonas@jkps.dk"
                    className="block mt-3 font-display text-xl md:text-2xl hover:text-ember transition-colors break-all"
                  >
                    Jonas@jkps.dk
                  </a>
                </div>
                <div className="col-span-12 md:col-span-4">
                  <span className="eyebrow text-ember">Telefon</span>
                  <a
                    href="tel:+4560959596"
                    className="block mt-3 font-display text-xl md:text-2xl hover:text-ember transition-colors"
                  >
                    +45 60 95 95 96
                  </a>
                </div>
                <div className="col-span-12 md:col-span-4">
                  <span className="eyebrow text-ember">LinkedIn</span>
                  <a
                    href="https://www.linkedin.com/in/jonaskps/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-3 font-display text-xl md:text-2xl hover:text-ember transition-colors"
                  >
                    Find mig på LinkedIn
                  </a>
                </div>
              </div>

              <div className="mt-16">
                <a
                  href="/jonas-kp-sorensen-cv.pdf"
                  download
                  className="inline-flex items-center gap-3 bg-ember text-cream px-8 py-4 text-sm tracking-wide hover:bg-ember/90 transition-colors"
                >
                  Download CV (PDF) <span aria-hidden>↓</span>
                </a>
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT — sticky sidebar */}
        <Sidebar />
      </div>

      {/* FOOTER */}
      <footer className="w-full max-w-full bg-navy-deep py-10 relative z-30 overflow-x-hidden">
        <div className="px-12 md:px-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-sm text-cream/55">
          <p>Jonas K.P. Sørensen · Digital konsulent &amp; strateg · Aarhus</p>
          <p>© {new Date().getFullYear()} · Selvstændig siden 2016</p>
        </div>
      </footer>
    </main>
  );
}

const FILTERS = [
  "Alle",
  "UX Research",
  "Service Design",
  "Kommunikation",
  "Brandudvikling",
  "Co-Creation",
] as const;

type Filter = (typeof FILTERS)[number];

const CASE_META: Record<string, { headline: string; tags: string[] }> = {
  wolt: {
    headline: "Fra usynlig algoritme til informeret bud",
    tags: ["UX Research", "Service Design"],
  },
  boliga: {
    headline: "Reduceret kompleksitet i boligsøgning",
    tags: ["UX Research", "Product Design"],
  },
  "interaktiv-horesimulering": {
    headline: "Inklusion i undervisningen",
    tags: ["UX Research", "Co-Creation"],
  },
  "danmarks-radio": {
    headline: "Digitale og lydbaserede formater",
    tags: ["Kommunikation"],
  },
  "amnesty-international": {
    headline: "Menneskerettigheder til konkret indhold",
    tags: ["Kommunikation"],
  },
  "danmarks-naturfredningsforening": {
    headline: "Bæredygtighed og brandudvikling",
    tags: ["Kommunikation", "Brandudvikling"],
  },
  "ulla-dyrlov": {
    headline: "Koncept og platform fra bunden",
    tags: ["Brandudvikling"],
  },
  "concerto-copenhagen": {
    headline: "Publikumsengagement gennem kulturformidling",
    tags: ["Brandudvikling", "Kommunikation"],
  },
  "art-spirit-coaching": {
    headline: "Brand og koncept fra idé til lancering",
    tags: ["Brandudvikling"],
  },
};

function CasesSection() {
  const [filter, setFilter] = useState<Filter>("Alle");
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openCase, setOpenCase] = useState<CaseStudy | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const filterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!filterOpen) return;
    const onClick = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFilterOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFilterOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [filterOpen]);

  const filtered = caseStudies.filter((c) => {
    if (filter === "Alle") return true;
    return CASE_META[c.slug]?.tags.includes(filter);
  });

  const filterCounts = FILTERS.reduce<Record<string, number>>((acc, f) => {
    acc[f] =
      f === "Alle"
        ? caseStudies.length
        : caseStudies.filter((c) => CASE_META[c.slug]?.tags.includes(f)).length;
    return acc;
  }, {});

  const isGrid = filter !== "Alle";

  useEffect(() => {
    setCurrentIndex(0);
    const el = scrollerRef.current;
    if (el) el.scrollTo({ left: 0, behavior: "auto" });
  }, [filter]);

  const total = filtered.length;
  const displayIndex = hoveredIndex ?? currentIndex;
  const progress = total > 0 ? ((displayIndex + 1) / total) * 100 : 0;

  const scrollToIndex = (target: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const children = Array.from(el.children) as HTMLElement[];
    const child = children[target];
    if (!child) return;
    el.scrollTo({
      left: child.offsetLeft - el.offsetLeft,
      behavior: "smooth",
    });
  };

  const showNextCase = () => {
    if (!filtered.length) return;
    const next = (currentIndex + 1) % filtered.length;
    setCurrentIndex(next);
    scrollToIndex(next);
  };

  const showPreviousCase = () => {
    if (!filtered.length) return;
    const prev = (currentIndex - 1 + filtered.length) % filtered.length;
    setCurrentIndex(prev);
    scrollToIndex(prev);
  };

  const handleScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const children = Array.from(el.children) as HTMLElement[];
    if (!children.length) return;
    const scrollLeft = el.scrollLeft;
    let closest = 0;
    let minDist = Infinity;
    children.forEach((child, i) => {
      const dist = Math.abs(child.offsetLeft - el.offsetLeft - scrollLeft);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });
    if (closest !== currentIndex) setCurrentIndex(closest);
  };

  return (
    <section id="cases" className="py-16 md:py-20">
      <div className="px-12 md:px-14">
        <div className="mb-10 md:mb-14">
          <Eyebrow>Udvalgte cases</Eyebrow>
        </div>

        {/* Filter dropdown */}
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-3 mb-2.5 md:mb-3">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
            <div className="relative" ref={filterRef}>
            <button
              type="button"
              onClick={() => setFilterOpen((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={filterOpen}
              className={
                "inline-flex items-center gap-2 text-xs tracking-wide px-4 py-2 rounded-full border transition-colors " +
                (filter !== "Alle"
                  ? "bg-ember text-cream border-ember hover:bg-ember/90"
                  : "border-cream/25 text-cream/85 hover:border-cream/60 hover:text-cream")
              }
            >
              <SlidersHorizontal size={14} strokeWidth={2} />
              <span>
                Filter
                {filter !== "Alle" && <span className="opacity-90"> · {filter}</span>}
              </span>
              {filter !== "Alle" && (
                <span
                  role="button"
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation();
                    setFilter("Alle");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      e.stopPropagation();
                      setFilter("Alle");
                    }
                  }}
                  aria-label="Ryd filter"
                  className="ml-1 -mr-1 inline-flex items-center justify-center rounded-full p-0.5 hover:bg-cream/20"
                >
                  <X size={12} strokeWidth={2.25} />
                </span>
              )}
            </button>

            {filterOpen && (
              <div className="absolute left-0 top-full mt-2 z-30 w-[min(16.25rem,calc(100vw-6rem))] max-w-[calc(100vw-6rem)] min-w-0 bg-navy-deep border border-cream/15 rounded-xl shadow-2xl p-3">
                <div className="eyebrow text-cream/50 px-2 pb-2">Kategorier</div>
                <ul role="listbox" className="flex flex-col">
                  {FILTERS.map((f) => {
                    const active = f === filter;
                    return (
                      <li key={f}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={active}
                          onClick={() => {
                            setFilter(f);
                            setFilterOpen(false);
                          }}
                          className={
                            "w-full flex items-center justify-between gap-3 text-left px-3 py-2 rounded-md text-sm transition-colors " +
                            (active
                              ? "bg-ember/15 text-cream"
                              : "text-cream/75 hover:bg-cream/5 hover:text-cream")
                          }
                        >
                          <span className="flex items-center gap-2">
                            {active && <span className="h-1.5 w-1.5 rounded-full bg-ember" />}
                            {f}
                          </span>
                          <span className="text-[11px] text-cream/50">{filterCounts[f]}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
          </div>
          {/* Arrow nav — right side, same row as filter */}
          {!isGrid && (
            <div className="hidden md:flex items-center gap-3">
              <button
                type="button"
                aria-label="Forrige case"
                onClick={showPreviousCase}
                className="w-12 h-12 rounded-full border border-cream/25 text-cream flex items-center justify-center transition-colors hover:border-[#C0281E] hover:text-[#C0281E]"
              >
                <span aria-hidden className="text-xl leading-none">←</span>
              </button>
              <button
                type="button"
                aria-label="Næste case"
                onClick={showNextCase}
                className="w-12 h-12 rounded-full border border-cream/25 text-cream flex items-center justify-center transition-colors hover:border-[#C0281E] hover:text-[#C0281E]"
              >
                <span aria-hidden className="text-xl leading-none">→</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Cases view: slider (Alle) or grid (filter) */}
      {(() => {
        const renderCard = (
          c: (typeof caseStudies)[number],
          variant: "slider" | "grid",
          index: number,
        ) => {
          const meta = CASE_META[c.slug];
          const sizing =
            variant === "slider"
              ? "snap-start shrink-0 w-[18rem] max-w-[calc(100vw-6rem)] sm:w-[420px]"
              : "w-full";
          const imgWrapperClass =
            variant === "slider"
              ? "w-full overflow-hidden bg-navy h-[250px] max-[428px]:h-[160px]"
              : "w-full overflow-hidden bg-navy h-[250px]";
          const bodyPadding =
            variant === "slider"
              ? "p-6 max-[428px]:p-4 flex flex-col gap-3 max-[428px]:gap-2"
              : "p-6 flex flex-col gap-3";
          const clientSize =
            variant === "slider" ? "max-[428px]:!text-[10px]" : "";
          const headlineSize =
            variant === "slider" ? "max-[428px]:!text-[15px]" : "";
          const tagSize =
            variant === "slider"
              ? "max-[428px]:text-[9px] max-[428px]:px-2 max-[428px]:py-0.5"
              : "";
          const imgClass =
            variant === "grid"
              ? "w-full h-full object-cover md:grayscale md:group-hover:grayscale-0 transition-all duration-[400ms] ease-out group-hover:scale-[1.04]"
              : "w-full h-full object-cover md:grayscale md:group-hover:grayscale-0 transition-all duration-[400ms] ease-out group-hover:scale-[1.04]";
          return (
            <button
              key={c.slug}
              type="button"
              onMouseDown={(e) => {
                if (variant === "slider") e.preventDefault();
              }}
              onClick={() => setOpenCase(c)}
              onMouseEnter={() => variant === "slider" && setHoveredIndex(index)}
              onMouseLeave={() => variant === "slider" && setHoveredIndex(null)}
              onFocus={(e) => {
                if (variant !== "slider") return;
                setHoveredIndex(index);
                // Prevent browser from auto-scrolling the carousel container
                // when a card receives focus (e.g. on click).
                const el = scrollerRef.current;
                if (!el) return;
                const left = el.scrollLeft;
                requestAnimationFrame(() => {
                  if (el.scrollLeft !== left) el.scrollLeft = left;
                });
              }}
              onBlur={() => variant === "slider" && setHoveredIndex(null)}
              className={
                "group flex flex-col text-left rounded-lg border border-cream/10 bg-navy/30 hover:bg-[rgba(255,255,255,0.04)] overflow-hidden transition-all duration-300 ease-out hover:-translate-y-[3px] " +
                sizing
              }
            >
              <div className={imgWrapperClass}>
                <img
                  src={c.image}
                  alt={`${c.client} — ${meta?.headline ?? c.title}`}
                  loading="lazy"
                  className={imgClass}
                />
              </div>
              <div className={bodyPadding}>
                <span
                  className={"text-cream/60 uppercase font-semibold " + clientSize}
                  style={{ fontSize: 9, letterSpacing: "0.18em" }}
                >
                  {c.client}
                </span>
                <h3
                  className={"font-display font-bold text-cream leading-snug " + headlineSize}
                  style={{ fontSize: 18 }}
                >
                  {meta?.headline ?? c.title}
                </h3>
                <ul className="flex flex-wrap gap-1.5 mt-1">
                  {(meta?.tags ?? []).map((t) => (
                    <li
                      key={t}
                      className={
                        "text-[10px] tracking-wide px-2.5 py-1 rounded-full border border-cream/20 text-cream/70 transition-[background-color,border-color,color] duration-[600ms] ease-in-out group-hover:bg-[#C0281E] group-hover:border-[#C0281E] group-hover:text-white hover:scale-[1.08] " +
                        tagSize
                      }
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </button>
          );
        };

        return (
          <div key={isGrid ? "grid" : "slider"} className="animate-fade-in">
            {isGrid ? (
              <>
                <div className="px-12 md:px-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {filtered.map((c, i) => renderCard(c, "grid", i))}
                </div>
                <div className="px-12 md:px-14 mt-10 flex justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      setFilter("Alle");
                      requestAnimationFrame(() => {
                        document
                          .getElementById("cases")
                          ?.scrollIntoView({ behavior: "smooth", block: "start" });
                      });
                    }}
                    className="text-sm tracking-wide text-cream/85 underline underline-offset-4 decoration-cream/40 hover:text-cream hover:decoration-cream transition-colors"
                  >
                    Vis alle cases →
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="w-full max-w-full overflow-x-hidden">
                  <div
                    ref={scrollerRef}
                    onScroll={handleScroll}
                    className="cases-carousel flex w-full max-w-full gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth px-12 md:px-14 scroll-pl-12 md:scroll-pl-14 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                  >
                  {filtered.map((c, i) => renderCard(c, "slider", i))}
                  </div>
                </div>

                {/* Progress indicator */}
                <div className="px-12 md:px-14 mt-4 flex items-center gap-6">
                  <div className="flex-1 h-0.5 bg-cream/15 relative overflow-hidden rounded-full">
                    <div
                      className="absolute inset-y-0 left-0 bg-[#C0281E] transition-[width] duration-300 ease-out rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span
                    className="text-cream/70 font-mono tabular-nums"
                    style={{ fontSize: 12, letterSpacing: "0.1em" }}
                  >
                    {displayIndex + 1} / {total}
                  </span>
                </div>
              </>
            )}
          </div>
        );
      })()}

      <CaseModal
        study={openCase}
        onClose={() => setOpenCase(null)}
        onNavigate={(s) => setOpenCase(s)}
      />
    </section>
  );
}

// ============ Kompetencer with interactive tag popups ============

const TAG_TO_SLUGS: Record<string, string[]> = {
  // 01 — Indsigt / UX Research
  "Semistrukturerede interviews": ["wolt", "interaktiv-horesimulering"],
  "Feltobservation": ["wolt", "interaktiv-horesimulering"],
  "Co-design": ["wolt", "interaktiv-horesimulering"],
  "Mixed methods": ["wolt", "interaktiv-horesimulering"],
  "Facilitering": ["interaktiv-horesimulering", "amnesty-international"],
  "Workshops": ["interaktiv-horesimulering", "amnesty-international"],

  // 02 — Koncept / Service- & Konceptdesign
  "Brugerrejser": ["boliga", "wolt"],
  "Touchpoint-mapping": ["boliga", "wolt"],
  "Participatorisk design": ["interaktiv-horesimulering"],
  "Konceptvalidering": ["interaktiv-horesimulering"],

  // 03 — Digital Strategi & Brand
  "Kommunikationsstrategi": ["amnesty-international", "danmarks-naturfredningsforening", "art-spirit-coaching"],
  "Visuel identitet": ["amnesty-international", "danmarks-naturfredningsforening", "art-spirit-coaching"],
  "Indholdsarkitektur": ["boliga", "danmarks-radio"],
  "Positionering": ["boliga", "danmarks-radio"],

  // 04 — Medie- & Lydproduktion
  "Redaktionel tilrettelæggelse": ["danmarks-radio", "ulla-dyrlov", "concerto-copenhagen"],
  "Indholdsproduktion": ["danmarks-radio", "ulla-dyrlov", "concerto-copenhagen"],
  "Postproduktion": ["danmarks-radio", "ulla-dyrlov"],
};

const TAG_HEADLINES: Record<string, string> = {
  wolt: "Fra usynlig algoritme til informeret bud",
  boliga: "Reduceret kompleksitet i boligsøgning",
  "interaktiv-horesimulering": "Inklusion i undervisningen",
  "danmarks-radio": "Digitale og lydbaserede formater",
  "amnesty-international": "Menneskerettigheder til konkret indhold",
  "danmarks-naturfredningsforening": "Bæredygtighed og brandudvikling",
  "ulla-dyrlov": "Koncept og platform fra bunden",
  "concerto-copenhagen": "Publikumsengagement gennem kulturformidling",
  "art-spirit-coaching": "Brand og koncept fra idé til lancering",
};

function KompetencerList() {
  const [openTag, setOpenTag] = useState<string | null>(null);
  const [openCase, setOpenCase] = useState<CaseStudy | null>(null);
  const [canHover, setCanHover] = useState(false);
  const activeTagRef = useRef<HTMLLIElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHover(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenTag(null), 140);
  };

  useEffect(() => {
    if (!openTag || canHover) return;
    const onDocClick = (e: MouseEvent) => {
      const node = activeTagRef.current;
      if (node && !node.contains(e.target as Node)) {
        setOpenTag(null);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenTag(null);
    };
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [openTag, canHover]);

  return (
    <>
    <ul className="divide-y divide-cream/10 border-y border-cream/10">
      {competencies.map((c) => (
        <li
          key={c.no}
          className="group py-8 md:py-10 hover:bg-navy/40 transition-colors -mx-5 md:-mx-14 px-5 md:px-14"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 md:gap-8">
            {/* Left: number + title + sub */}
            <div className="md:col-span-4 min-w-0 flex items-baseline gap-4">
              <span className="font-display text-2xl text-ember shrink-0">{c.no}</span>
              <div className="min-w-0 flex-1">
                <h3 className="font-display tracking-tight leading-tight max-w-full [word-break:normal] [overflow-wrap:break-word] [hyphens:none] text-[clamp(1.4rem,5.5vw,2.25rem)] md:text-4xl">
                  {c.title}
                </h3>
                
              </div>
            </div>

            {/* Middle: description */}
            <p className="md:col-span-5 mt-3 md:mt-0 text-cream/80 leading-relaxed">
              {c.body}
            </p>

            {/* Right: stacked tags */}
            <ul className="md:col-span-3 mt-6 md:mt-0 flex flex-col items-start gap-y-1">
            {c.tags.map((t, i) => {
              const slugs = TAG_TO_SLUGS[t] ?? [];
              const hasCases = slugs.length > 0;
              const isOpen = openTag === `${c.no}-${t}`;
              const tagKey = `${c.no}-${t}`;
              return (
                <li
                  key={t}
                  ref={isOpen ? activeTagRef : undefined}
                  className="relative inline-flex items-baseline"
                  onMouseEnter={() => {
                    if (!canHover || !hasCases) return;
                    cancelClose();
                    setOpenTag(tagKey);
                  }}
                  onMouseLeave={() => {
                    if (!canHover) return;
                    scheduleClose();
                  }}
                >
                  <span aria-hidden className="text-[#8899AA]/60 mr-1.5 select-none">·</span>
                  <button
                    type="button"
                    disabled={!hasCases}
                    onClick={() => {
                      if (canHover) return;
                      setOpenTag(isOpen ? null : tagKey);
                    }}
                    onFocus={() => {
                      if (!canHover || !hasCases) return;
                      cancelClose();
                      setOpenTag(tagKey);
                    }}
                    onBlur={() => {
                      if (!canHover) return;
                      scheduleClose();
                    }}
                    aria-expanded={isOpen}
                    className={
                      "text-left text-[11px] tracking-wide uppercase bg-transparent border-0 p-0 transition-colors " +
                      (hasCases
                        ? "cursor-pointer hover:text-[#C0281E] "
                        : "cursor-default ") +
                      (isOpen ? "text-[#C0281E]" : "text-[#8899AA]")
                    }
                  >
                    {t}
                  </button>
                  {isOpen && hasCases && (
                    <div style={{ zIndex: 9999 }} className="absolute left-full top-0 ml-3 w-[min(18rem,calc(100vw-6rem))] max-w-[calc(100vw-6rem)] bg-navy-deep border border-cream/15 shadow-2xl p-4 animate-in fade-in slide-in-from-left-1 duration-150">
                      <div
                        className="text-cream/55 uppercase font-semibold mb-3"
                        style={{ fontSize: 9, letterSpacing: "0.18em" }}
                      >
                        Relaterede cases
                      </div>
                      <ul className="flex flex-col gap-2">
                        {slugs.map((slug) => {
                          const study = caseStudies.find(
                            (s) => s.slug === slug,
                          );
                          if (!study) return null;
                          return (
                            <li key={slug}>
                              <button
                                type="button"
                                onClick={() => {
                                  setOpenTag(null);
                                  setOpenCase(study);
                                }}
                                className="group/case w-full text-left flex items-start gap-3 p-2 -mx-2 rounded hover:bg-cream/5 transition-colors"
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
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
          </div>
        </li>
      ))}
    </ul>
    <CaseModal
      study={openCase}
      onClose={() => setOpenCase(null)}
      onNavigate={(s) => setOpenCase(s)}
    />
    </>
  );
}
