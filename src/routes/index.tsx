import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { caseStudies, type CaseStudy } from "@/data/cases";
import { HeroSymbol } from "@/components/HeroSymbol";
import { CaseModal } from "@/components/CaseModal";


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
    no: "01",
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
    no: "02",
    title: "Service- & Konceptdesign",
    sub: "Fra problem til realiserbart koncept",
    body:
      "Fra identifikation af problemet til et konkret, realiserbart koncept. Jeg designer brugerrejser, touchpoints og serviceoplevelser der skaber reel værdi.",
    tags: ["Brugerrejser", "Touchpoint-mapping", "Participatorisk design", "Konceptvalidering"],
  },
  {
    no: "03",
    title: "Digital Strategi & Brand",
    sub: "Stemme, position og indhold",
    body:
      "Strategisk rådgivning om digital tilstedeværelse, indhold og positionering. Jeg hjælper organisationer med at finde og kommunikere deres unikke stemme.",
    tags: ["Kommunikationsstrategi", "Visuel identitet", "Indholdsarkitektur", "Positionering"],
  },
  {
    no: "04",
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
    <div className="flex items-center gap-3">
      <span className="h-px w-8 bg-ember" />
      <span className="eyebrow text-ember">{children}</span>
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="relative flex flex-col gap-10 lg:justify-between lg:min-h-0 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto px-6 md:px-10 py-16 lg:py-20 border-b lg:border-b-0 lg:border-l border-cream/10 order-1 lg:order-last lg:bg-[#2D6A4F] lg:z-10 lg:rounded-l-xl lg:shadow-[-8px_0_24px_rgba(0,0,0,0.15)]">
      <div>
        <h1 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.02em] font-medium">
          Jonas K.P.<br />
          <span className="italic font-light">Sørensen</span>
        </h1>
        <p className="mt-6 text-lg text-cream/85 leading-snug font-display italic">
          Digital konsulent · Brugeroplevelse &amp; digitale løsninger.
        </p>
      </div>
      <div className="flex flex-col items-center gap-6 text-center">
        <HeroSymbol className="h-auto w-full max-w-[130px] md:max-w-[160px]" />
        <blockquote>
          <p className="font-display italic leading-snug text-cream/95" style={{ fontSize: "26px" }}>
            The problem with Ai is when there's too much A and{" "}
            <span className="not-italic font-normal text-[#C0281E] lg:text-[#8B3A2A]">not enough i</span>.
          </p>
        </blockquote>
      </div>

      <div className="mt-10 lg:mt-0 flex flex-col gap-3">
        <p className="mb-3 text-cream/65 text-sm">
          Selvstændig siden 2016. Jeg arbejder i skæringsfeltet mellem strategi, design og teknologi.
        </p>
        <a
          href="/jonas-kp-sorensen-cv.pdf"
          download
          className="inline-flex items-center justify-between gap-3 px-5 py-3 text-sm tracking-wide border border-cream/25 hover:border-ember hover:text-ember transition-colors"
        >
          Download CV (PDF) <span aria-hidden>↓</span>
        </a>
        <a
          href="#kontakt"
          className="inline-flex items-center justify-between gap-3 bg-ember lg:bg-[#8B3A2A] text-cream px-5 py-3 text-sm tracking-wide hover:bg-ember/90 lg:hover:bg-[#8B3A2A]/90 transition-colors"
        >
          Lad os tales ved <span aria-hidden>→</span>
        </a>
        <div className="mt-6 space-y-2 text-sm text-cream/70">
          <a href="mailto:Jonas@jkps.dk" className="block hover:text-ember transition-colors">
            Jonas@jkps.dk
          </a>
          <a href="tel:+4560959596" className="block hover:text-ember transition-colors">
            +45 60 95 95 96
          </a>
          <a
            href="https://www.linkedin.com/in/jonaskps/"
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:text-ember transition-colors"
          >
            LinkedIn →
          </a>
        </div>
      </div>
    </aside>
  );
}

function Index() {
  return (
    <main id="top" className="bg-navy-deep text-cream">
      <div className="flex flex-col lg:grid lg:grid-cols-[60fr_40fr] lg:items-start">
        {/* LEFT — scrolling content */}
        <div className="min-w-0 order-2 lg:order-none">
          {/* OM MIG */}
          <section id="om" className="py-16 md:py-20">
            <div className="px-6 md:px-10">
              <Eyebrow>Om mig</Eyebrow>
              <div className="mt-8 max-w-3xl space-y-6 text-cream/80 text-lg leading-relaxed">
                <p>
                  Siden 2016 har jeg drevet egen konsulent- og medieproduktionsvirksomhed — med fokus på
                  samspillet mellem mennesker, teknologi og forretning.
                </p>
                <p>
                  Fælles for alt mit arbejde er interessen for det øjeblik hvor noget abstrakt bliver konkret —
                  hvor en idé finder sin form, en oplevelse finder sit udtryk, en fortælling finder sin modtager.
                  Jeg er mest på hjemmebane når disciplinerne overlapper, og tiltrukket af de projekter der ikke
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
          <section id="kompetencer" className="py-16 md:py-20 border-t border-cream/10">
            <div className="px-6 md:px-10">
              <div className="mb-10 md:mb-14">
                <Eyebrow>Kompetencer</Eyebrow>
                <h2 className="font-display text-5xl md:text-7xl mt-6 leading-[0.95] tracking-tight">
                  Hvad jeg <span className="italic">bringer</span>.
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
          <section id="uddannelse" className="py-16 md:py-20 border-t border-cream/10">
            <div className="px-6 md:px-10">
              <div className="mb-16">
                <Eyebrow>Uddannelse</Eyebrow>
                <h2 className="font-display text-5xl md:text-7xl mt-6 leading-[0.95] tracking-tight">
                  Et fagligt <span className="italic text-ember">ståsted</span>.
                </h2>
                <p className="mt-8 max-w-2xl text-lg text-cream/75 leading-relaxed">
                  Hvor analytisk overblik møder en kreativ og praksisnær tilgang.
                </p>
              </div>

              <ul className="divide-y divide-cream/10 border-y border-cream/10">
                <li className="py-8 md:py-10 grid grid-cols-12 gap-6">
                  <span className="col-span-2 md:col-span-1 font-display text-2xl text-ember">01</span>
                  <div className="col-span-10 md:col-span-6">
                    <h3 className="font-display text-3xl md:text-4xl tracking-tight leading-tight">Cand.it · Digital Design og Interaktive Teknologier</h3>
                    <p className="mt-2 text-sm text-cream/55 italic">IT-Universitetet København · 2024</p>
                  </div>
                  <p className="col-span-12 md:col-span-5 text-cream/80 leading-relaxed">
                    Tværfagligt kandidatprogram med fokus på interaktionsdesign, UX research og digitale teknologier.
                  </p>
                </li>
                <li className="py-8 md:py-10 grid grid-cols-12 gap-6">
                  <span className="col-span-2 md:col-span-1 font-display text-2xl text-ember">02</span>
                  <div className="col-span-10 md:col-span-6">
                    <h3 className="font-display text-3xl md:text-4xl tracking-tight leading-tight">Professionsbachelor · Medie- og sonokommunikation</h3>
                    <p className="mt-2 text-sm text-cream/55 italic">Sonic College · 2016</p>
                  </div>
                  <p className="col-span-12 md:col-span-5 text-cream/80 leading-relaxed">
                    Praksisnær uddannelse i lyd, medieproduktion og kommunikation.
                  </p>
                </li>
              </ul>

            </div>
          </section>

          {/* KONTAKT */}
          <section id="kontakt" className="py-16 md:py-20 border-t border-cream/10 relative overflow-hidden">
            <div className="px-6 md:px-10 relative">
              <Eyebrow>Kontakt · Portfolio 2026</Eyebrow>
              <h2 className="font-display text-5xl md:text-8xl mt-8 leading-[0.9] tracking-tight">
                Lad os <span className="italic text-ember">tales ved</span>.
              </h2>
              <p className="mt-8 max-w-xl text-cream/70 text-lg italic font-display">
                Jeg er altid interesseret i nye samarbejder — store som små, kommercielle som kulturelle.
              </p>

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
      <footer className="border-t border-cream/10 py-10">
        <div className="px-6 md:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-sm text-cream/55">
          <p>Jonas K.P. Sørensen · Digital konsulent · Aarhus</p>
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
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [openCase, setOpenCase] = useState<CaseStudy | null>(null);

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

  // Reset scroll when filter changes
  useEffect(() => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollTo({ left: 0, behavior: "smooth" });
      setActiveIndex(0);
    }
  }, [filter]);

  const handleScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const children = Array.from(el.children) as HTMLElement[];
    if (!children.length) return;
    // Use the horizontal center of the viewport as reference so the active
    // card is whichever one the user is currently looking at.
    const viewportCenter = el.scrollLeft + el.clientWidth / 2;
    let closest = 0;
    let min = Infinity;
    children.forEach((child, i) => {
      const childCenter = child.offsetLeft + child.offsetWidth / 2;
      const dist = Math.abs(childCenter - viewportCenter);
      if (dist < min) {
        min = dist;
        closest = i;
      }
    });
    setActiveIndex((prev) => (prev === closest ? prev : closest));
  };

  const scrollByCard = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const children = Array.from(el.children) as HTMLElement[];
    if (!children.length) return;
    const target = Math.max(
      0,
      Math.min(children.length - 1, activeIndex + dir),
    );
    children[target]?.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });
  };

  const total = filtered.length;
  const progress = total > 1 ? ((activeIndex + 1) / total) * 100 : 100;

  return (
    <section id="cases" className="py-16 md:py-20 border-t border-cream/10">
      <div className="px-6 md:px-10">
        <div className="mb-10 md:mb-14 flex items-start justify-between gap-6">
          <div>
            <Eyebrow>Udvalgte cases</Eyebrow>
            <h2 className="font-display text-5xl md:text-7xl mt-6 leading-[0.95] tracking-tight">
              Ni projekter.
            </h2>
          </div>
          {/* Arrow nav */}
          <div
            className={
              "hidden md:flex items-center gap-3 shrink-0 pt-4 transition-opacity duration-300 " +
              (isGrid ? "opacity-0 pointer-events-none" : "opacity-100")
            }
          >
            <button
              type="button"
              aria-label="Forrige case"
              onClick={() => scrollByCard(-1)}
              disabled={activeIndex === 0}
              className="w-12 h-12 rounded-full border border-cream/25 text-cream flex items-center justify-center transition-colors hover:border-[#C0281E] hover:text-[#C0281E] disabled:opacity-30 disabled:hover:border-cream/25 disabled:hover:text-cream"
            >
              <span aria-hidden className="text-xl leading-none">←</span>
            </button>
            <button
              type="button"
              aria-label="Næste case"
              onClick={() => scrollByCard(1)}
              disabled={activeIndex >= total - 1}
              className="w-12 h-12 rounded-full border border-cream/25 text-cream flex items-center justify-center transition-colors hover:border-[#C0281E] hover:text-[#C0281E] disabled:opacity-30 disabled:hover:border-cream/25 disabled:hover:text-cream"
            >
              <span aria-hidden className="text-xl leading-none">→</span>
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-3 mb-10 md:mb-12">
          <div className="flex flex-wrap gap-2 flex-1">
            {FILTERS.map((f) => {
              const active = f === filter;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={
                    "text-xs tracking-wide px-3.5 py-1.5 rounded-full border transition-colors " +
                    (active
                      ? "bg-ember text-cream border-ember"
                      : "border-cream/20 text-cream/70 hover:border-cream/50 hover:text-cream")
                  }
                >
                  {f} <span className="text-[10px] opacity-70">({filterCounts[f]})</span>
                </button>
              );
            })}
          </div>
          <span className="eyebrow text-cream/50 ml-auto">
            {filtered.length} / {caseStudies.length}
          </span>
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
              ? "snap-start shrink-0 w-[85vw] max-[428px]:w-[78vw] sm:w-[420px]"
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
          const isActiveMobile = variant === "slider" && index === activeIndex;
          // Slider: mobile shows active card in color, others greyscale; desktop greyscale + hover color.
          // Grid: always full color.
          const imgClass =
            variant === "grid"
              ? "w-full h-full object-cover transition-all duration-[300ms] ease-out group-hover:scale-[1.04]"
              : "w-full h-full object-cover transition-all duration-[300ms] ease-out group-hover:scale-[1.04] " +
                (isActiveMobile ? "grayscale-0 " : "grayscale ") +
                "md:grayscale md:group-hover:grayscale-0";
          return (
            <button
              key={c.slug}
              type="button"
              onClick={() => setOpenCase(c)}
              onMouseEnter={() => {
                if (variant === "slider") setHoverIndex(index);
              }}
              onMouseLeave={() => {
                if (variant === "slider") setHoverIndex(null);
              }}
              onFocus={() => {
                if (variant === "slider") setHoverIndex(index);
              }}
              onBlur={() => {
                if (variant === "slider") setHoverIndex(null);
              }}
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
                        "text-[10px] tracking-wide px-2.5 py-1 rounded-full border border-cream/20 text-cream/70 " +
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
                <div className="px-6 md:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {filtered.map((c, i) => renderCard(c, "grid", i))}
                </div>
                <div className="px-6 md:px-10 mt-10 flex justify-center">
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
                <div
                  ref={scrollerRef}
                  onScroll={handleScroll}
                  className="flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 px-6 md:px-10 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                >
                  {filtered.map((c, i) => renderCard(c, "slider", i))}
                </div>

                {/* Progress indicator */}
                <div className="px-6 md:px-10 mt-4 flex items-center gap-6">
                  <span
                    className="text-cream/70 font-mono tabular-nums"
                    style={{ fontSize: 12, letterSpacing: "0.1em" }}
                  >
                    {String(Math.min((hoverIndex ?? activeIndex) + 1, total)).padStart(2, "0")} / {String(total).padStart(2, "0")}
                  </span>
                  <div className="flex-1 h-px bg-cream/15 relative overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-[#C0281E] transition-[width] duration-300 ease-out"
                      style={{ width: `${progress}%`, height: 1 }}
                    />
                  </div>
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
  "Semistrukturerede interviews": ["wolt", "boliga", "interaktiv-horesimulering"],
  "Feltobservation": ["wolt", "boliga", "interaktiv-horesimulering"],
  "Mixed methods": ["wolt", "boliga", "interaktiv-horesimulering"],
  "Co-design": ["interaktiv-horesimulering", "wolt"],
  "Participatorisk design": ["interaktiv-horesimulering", "wolt"],
  "Brugerrejser": ["boliga", "wolt"],
  "Touchpoint-mapping": ["boliga", "wolt"],
  "Servicedesign": ["wolt", "boliga"],
  "Konceptvalidering": ["wolt", "boliga"],
  "Workshopfacilitering": ["interaktiv-horesimulering", "danmarks-naturfredningsforening"],
  "Digital strategi": ["ulla-dyrlov", "art-spirit-coaching", "concerto-copenhagen"],
  "Positionering": ["ulla-dyrlov", "art-spirit-coaching", "concerto-copenhagen"],
  "Brandudvikling": ["ulla-dyrlov", "art-spirit-coaching", "concerto-copenhagen"],
  "Kommunikationsstrategi": ["amnesty-international", "danmarks-radio", "danmarks-naturfredningsforening"],
  "Indholdsstrategi": ["amnesty-international", "danmarks-radio", "danmarks-naturfredningsforening"],
  "Podcastproduktion": ["danmarks-radio", "ulla-dyrlov"],
  "Lydproduktion": ["danmarks-radio", "ulla-dyrlov"],
  "Redaktionel tilrettelæggelse": ["danmarks-radio", "amnesty-international"],
  "Postproduktion": ["danmarks-radio", "ulla-dyrlov"],
  "Indholdsproduktion": ["amnesty-international", "danmarks-radio", "danmarks-naturfredningsforening"],
  "Visuel identitet": ["ulla-dyrlov", "art-spirit-coaching"],
  "Indholdsarkitektur": ["ulla-dyrlov", "concerto-copenhagen"],
  "Facilitering": ["danmarks-naturfredningsforening", "interaktiv-horesimulering", "wolt"],
  "Workshops": ["interaktiv-horesimulering", "wolt"],
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
  const activeTagRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!openTag) return;
    const onDocClick = (e: MouseEvent) => {
      const node = activeTagRef.current;
      if (node && !node.contains(e.target as Node)) {
        setOpenTag(null);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenTag(null);
    };
    // Use 'click' (bubble phase) so the tag's own onClick toggles first
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [openTag]);

  return (
    <ul className="divide-y divide-cream/10 border-y border-cream/10">
      {competencies.map((c) => (
        <li
          key={c.no}
          className="group py-8 md:py-10 hover:bg-navy/40 transition-colors -mx-6 md:-mx-10 px-6 md:px-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 md:gap-8">
            {/* Left: number + title + sub */}
            <div className="md:col-span-4 flex items-baseline gap-4">
              <span className="font-display text-2xl text-ember shrink-0">{c.no}</span>
              <div>
                <h3 className="font-display text-3xl md:text-4xl tracking-tight leading-tight">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm text-cream/55 italic">{c.sub}</p>
              </div>
            </div>

            {/* Middle: description */}
            <p className="md:col-span-5 mt-6 text-cream/80 leading-relaxed">
              {c.body}
            </p>

            {/* Right: stacked tags */}
            <ul className="md:col-span-3 mt-6 md:mt-0 flex flex-wrap justify-center gap-2 md:flex-col md:flex-nowrap md:justify-start md:items-start">
            {c.tags.map((t) => {
              const slugs = TAG_TO_SLUGS[t] ?? [];
              const hasCases = slugs.length > 0;
              const isOpen = openTag === `${c.no}-${t}`;
              return (
                <li key={t} ref={isOpen ? activeTagRef : undefined} className="relative">
                  <button
                    type="button"
                    disabled={!hasCases}
                    onClick={() =>
                      setOpenTag(isOpen ? null : `${c.no}-${t}`)
                    }
                    aria-expanded={isOpen}
                    className={
                      "text-[11px] tracking-wide uppercase border px-2.5 py-1 transition-colors " +
                      (isOpen
                        ? "bg-ember border-ember text-cream"
                        : hasCases
                          ? "border-cream/20 text-cream/70 hover:border-ember hover:text-cream cursor-pointer"
                          : "border-cream/10 text-cream/40 cursor-default")
                    }
                  >
                    {t}
                  </button>
                  {isOpen && hasCases && (
                    <div className="absolute z-30 left-0 top-full mt-2 w-72 bg-navy-deep border border-cream/15 shadow-2xl p-4 animate-in fade-in slide-in-from-top-1 duration-150">
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
                              <Link
                                to="/cases/$slug"
                                params={{ slug }}
                                onClick={() => setOpenTag(null)}
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
            })}
          </ul>
          </div>
        </li>
      ))}
    </ul>
  );
}
