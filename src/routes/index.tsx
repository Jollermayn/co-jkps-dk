import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { SlidersHorizontal, X, MousePointerClick } from "lucide-react";
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
    title: "Læringsdesign & Formidling til børn og unge",
    sub: "Indhold og værktøjer til børn og unge",
    body: "Udvikling af læringsindhold og formidlingsværktøjer til børn og unge. Erfaring med co-design i skoleregi, AI-baserede formidlingsprojekter og lydlige læringsformater til målgruppen 7–12 år.",
    tags: ["Børn og unge", "Digital dannelse", "Co-design", "Læringsindhold", "AI"],
    relatedCases: ["interaktiv-horesimulering", "ulla-dyrlov"],
  },
  {
    no: "2",
    title: "Medie- & Lydproduktion",
    sub: "Fra studie til kanal",
    body: "Professionel podcast-, video- og lydproduktion fra studie til kanal. Teknisk kompetence kombineret med journalistisk næse for det gode indhold.",
    tags: ["Redaktionel tilrettelæggelse", "Postproduktion", "Indholdsproduktion"],
    relatedCases: ["danmarks-radio", "ulla-dyrlov", "amnesty-international"],
  },
  {
    no: "3",
    title: "Brugerindsigt & Co-design",
    sub: "Research & Brugerinddragelse",
    body: "Dybdegående indsigt gennem interviews, observationer, co-design og brugertest. Jeg oversætter kompleks adfærd til handlebare designbeslutninger.",
    tags: ["Interviews", "Feltobservation", "Co-design", "Mixed methods", "Facilitering", "Workshops"],
    relatedCases: ["interaktiv-horesimulering", "wolt"],
  },
  {
    no: "4",
    title: "Konceptudvikling & Redaktionel udvikling",
    sub: "Fra problem til realiserbart koncept",
    body: "Fra identifikation af problemet til et konkret, realiserbart koncept. Jeg designer brugerrejser, touchpoints og serviceoplevelser der skaber reel værdi.",
    tags: ["Brugerrejser", "Touchpoints", "Participatorisk design", "Konceptvalidering"],
    relatedCases: ["wolt", "danmarks-naturfredningsforening", "ulla-dyrlov"],
  },
  {
    no: "5",
    title: "Indholdsstrategi & Kommunikation",
    sub: "Stemme, position og indhold",
    body: "Strategisk rådgivning om digital tilstedeværelse, indhold og positionering. Jeg hjælper organisationer med at finde og kommunikere deres unikke stemme.",
    tags: ["Kommunikation", "Visuel identitet", "Indholdsarkitektur", "Positionering"],
    relatedCases: ["amnesty-international", "danmarks-naturfredningsforening", "danmarks-radio"],
  },
];

const partners = [
  { slug: "danmarks-radio", name: "Danmarks Radio", note: "Broadcast, podcastproduktion og tværgående koordinering" },
  {
    slug: "danmarks-naturfredningsforening",
    name: "Danmarks Naturfredningsforening",
    note: "Kommunikation om bæredygtighed og brandudvikling",
  },
  {
    slug: "amnesty-international",
    name: "Amnesty International",
    note: "Journalistisk formidling af menneskerettighedsspørgsmål",
  },
  { slug: "ulla-dyrlov", name: "Ulla Dyrløv", note: "Koncept- og platformudvikling med fokus på børns trivsel" },
  { slug: "concerto-copenhagen", name: "Concerto Copenhagen", note: "Engagement af publikum gennem kulturformidling" },
  {
    slug: "art-spirit-coaching",
    name: "Art Spirit Coaching",
    note: "Brand, koncept og kommunikation fra idé til lancering",
  },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex flex-col items-stretch w-fit cursor-default">
      <span className="eyebrow text-ember">{children}</span>
      <span aria-hidden className="mt-1.5 block h-px w-1/2 bg-[#B83A20]" />
    </span>
  );
}

const TYPE_SPEED = 40;
const LINE_PAUSE = 430;

const typewriterLines = ["The Ai paradox:", "Too much Artificial", "Not enough intelligence..."];

const HIGHLIGHT_RANGE: Record<
  number,
  { fromEnd?: number; fromStart?: number; length: number; style?: "box" | "text" }
> = {
  0: { fromStart: 4, length: 2, style: "text" },
  1: { fromStart: 9, length: 1, style: "box" },
  2: { fromStart: 11, length: 1, style: "box" },
};

function TypewriterQuote() {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const aBoxRef = useRef<HTMLSpanElement | null>(null);
  const iBoxRef = useRef<HTMLSpanElement | null>(null);
  const mountedRef = useRef(false);
  const pulseIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pulseStartTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pulseBeatTimeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;
    const root = containerRef.current;
    if (!root) return;

    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const schedule = (fn: () => void, ms: number) => {
      const t = setTimeout(fn, ms);
      timeouts.push(t);
      return t;
    };

    const lineSpans: HTMLSpanElement[] = typewriterLines.map((_, i) => {
      const span = document.createElement("span");
      span.setAttribute("aria-hidden", "true");
      span.className = "block whitespace-nowrap";
      if (i === 0) {
        span.style.fontSize = "1.15em";
        span.style.lineHeight = "1.2";
        span.style.marginBottom = "0.35em";
        span.style.fontWeight = "300";
      }
      span.innerHTML = "&nbsp;";
      root.appendChild(span);
      return span;
    });

    const buildLineHTML = (i: number, charsShown: number): string => {
      const full = typewriterLines[i];
      const shown = full.slice(0, charsShown);
      const range = HIGHLIGHT_RANGE[i];
      if (!range) return shown || "&nbsp;";

      const start = range.fromStart !== undefined ? range.fromStart : full.length - (range.fromEnd ?? 0);
      const end = start + range.length;
      const before = shown.slice(0, Math.min(shown.length, start));
      const highlight = shown.length > start ? shown.slice(start, Math.min(shown.length, end)) : "";
      const after = shown.length > end ? shown.slice(end) : "";

      const cls =
        range.style === "text"
          ? "not-italic font-black text-[#F5F0E8]"
          : "not-italic font-black text-[#F5F0E8] bg-[#B83A20] whitespace-nowrap px-[6px] py-[2px]";
      const id = i === 1 ? ' id="tw-box-A"' : i === 2 ? ' id="tw-box-i"' : "";
      const extraStyle = i === 1 ? ";margin-bottom:4px" : i === 2 ? ";margin-top:4px" : "";
      const hlContent = highlight || "&nbsp;";
      const afterHTML = after
        ? range.style === "box"
          ? `<span class="text-cream/40">${after}</span>`
          : after
        : "";
      return `${before}<span${id} class="${cls}" style="display:inline-block${extraStyle}">${hlContent}</span>${afterHTML}`;
    };

    let elapsed = 0;
    typewriterLines.forEach((line, i) => {
      for (let c = 0; c <= line.length; c++) {
        const charsShown = c;
        schedule(() => {
          lineSpans[i].innerHTML = buildLineHTML(i, charsShown);
        }, elapsed);
        elapsed += TYPE_SPEED;
      }
      elapsed += LINE_PAUSE;
    });

    schedule(() => {
      const aBox = root.querySelector<HTMLElement>("#tw-box-A");
      const iBox = root.querySelector<HTMLElement>("#tw-box-i");
      if (!aBox || !iBox) return;
      const aRect = aBox.getBoundingClientRect();
      const iRect = iBox.getBoundingClientRect();
      const aCenter = aRect.left + aRect.width / 2;
      const iCenter = iRect.left + iRect.width / 2;
      const dx = aCenter - iCenter;
      const line2 = lineSpans[2];
      if (!line2) return;
      line2.style.transition = "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)";
      line2.style.transform = `translateX(${dx}px)`;
    }, elapsed + 400);

    schedule(() => {
      aBoxRef.current = root.querySelector<HTMLSpanElement>("#tw-box-A");
      iBoxRef.current = root.querySelector<HTMLSpanElement>("#tw-box-i");
    }, elapsed);

    schedule(() => {
      const animate = (id: string) => {
        const el = root.querySelector<HTMLElement>(`#${id}`);
        if (!el) return;
        el.style.transition = "box-shadow 0.5s ease, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)";
        el.style.boxShadow = "0 0 20px rgba(184, 58, 32, 0.95)";
        el.style.transform = "scale(1.12)";
        setTimeout(() => {
          el.style.transform = "scale(1)";
          el.style.boxShadow = "0 0 8px rgba(184, 58, 32, 0.45)";
        }, 650);
      };
      animate("tw-box-A");
      animate("tw-box-i");
    }, elapsed + 400 + 600 + 100);

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    const setGlow = (el: HTMLSpanElement | null, on: boolean) => {
      if (!el) return;
      el.style.transition = "box-shadow 0.15s ease";
      el.style.boxShadow = on ? "0 0 14px rgba(184, 58, 32, 0.9)" : "none";
    };

    const runFlash = () => {
      const aBox = aBoxRef.current;
      const iBox = iBoxRef.current;
      if (!aBox || !iBox) return;

      pulseBeatTimeoutsRef.current.forEach(clearTimeout);
      pulseBeatTimeoutsRef.current = [];

      setGlow(aBox, true);
      setGlow(iBox, true);

      const t1 = setTimeout(() => {
        setGlow(aBox, false);
        setGlow(iBox, false);
      }, 150);

      pulseBeatTimeoutsRef.current = [t1];
    };

    pulseStartTimeoutRef.current = setTimeout(runFlash, 4000);

    return () => {
      if (pulseStartTimeoutRef.current) {
        clearTimeout(pulseStartTimeoutRef.current);
        pulseStartTimeoutRef.current = null;
      }
      pulseBeatTimeoutsRef.current.forEach(clearTimeout);
      pulseBeatTimeoutsRef.current = [];
      if (pulseIntervalRef.current) {
        clearInterval(pulseIntervalRef.current);
        pulseIntervalRef.current = null;
      }
    };
  }, []);

  const reservedEm = 1.15 * 1.5 + 0.35 + 2 * 2.1;
  const ariaLabel = typewriterLines.join(" ");

  return (
    <p
      ref={containerRef}
      className="hero-quote italic font-semibold leading-[1.5] text-cream/95 block w-full text-center"
      style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(1.45rem, 2.1vw, 2.35rem)",
        minHeight: `${reservedEm}em`,
      }}
      aria-label={ariaLabel}
    />
  );
}

function Sidebar() {
  return (
    <aside className="hero-sidebar relative w-full min-w-0 max-w-full flex flex-col lg:overflow-y-auto lg:fixed lg:top-0 lg:right-0 lg:w-[40%] lg:h-screen px-6 md:px-14 lg:px-16 py-12 md:py-20 lg:pt-[6vh] lg:pb-10 border-b lg:border-b-0 lg:border-l border-cream/10 order-1 lg:order-last bg-[#0D1B2A] lg:z-20 lg:rounded-l-xl lg:shadow-[-8px_0_24px_rgba(0,0,0,0.25)] text-center items-center gap-8 lg:gap-6">
      <div className="w-full flex flex-col items-center gap-8 lg:gap-6">
        <p className="text-xs uppercase tracking-[0.3em] text-ember mb-6">Portfolio</p>
        <div className="w-full flex flex-col gap-3 lg:gap-4 items-center text-center">
          <h1 className="font-display tracking-[-0.02em] font-medium text-center px-2 flex flex-col items-center leading-none">
            <span className="block whitespace-nowrap text-[clamp(3.5rem,9vw,6rem)] leading-none" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>Jonas</span>
            <span className="block whitespace-nowrap text-[clamp(3.5rem,9vw,6rem)] leading-none -mt-[0.08em]" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>Sørensen</span>
          </h1>
          <p className="hero-subtitle text-xl leading-relaxed lg:text-2xl lg:leading-snug text-cream/85 italic text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
            Redaktionel tilrettelægger <span style={{ fontFamily: "'Apple Chancery', 'Snell Roundhand', 'Zapfino', 'Adobe Caslon Pro', Garamond, Georgia, serif", fontStyle: "italic", fontWeight: 400, fontSize: "1.15em", letterSpacing: "0.02em", verticalAlign: "-0.02em" }}>&amp;</span> formidler
          </p>
          <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-cream/55 mt-1">
            Læring · Medier · Teknologi
          </p>
          <blockquote className="max-w-full w-full text-center mt-6 lg:mt-16 lg:-translate-y-[15px]">
            <TypewriterQuote />
          </blockquote>
        </div>

        <div className="flex flex-col items-center gap-6 lg:gap-3 w-full text-center lg:translate-y-[15px]">
          <a
            href="/Jonas_Sorensen_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group/cv inline-flex items-center justify-center gap-3 text-sm font-semibold tracking-wide bg-transparent text-[#F5F0E8] border-2 border-[#F5F0E8] hover:bg-[#F5F0E8] hover:text-[#0D1B2A] hover:border-[#F5F0E8] transition-all duration-300 ease-out"
            style={{ padding: "12px 28px", borderRadius: "50px" }}
          >
            Download CV (PDF)
          </a>
          <a
            href="#kontakt"
            className="inline-flex items-center justify-center gap-2 text-[1.1rem] font-bold tracking-wide text-[#B83A20] underline underline-offset-4 hover:text-cream active:text-cream transition-colors duration-300"
          >
            Kontakt mig
          </a>
        </div>

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
                <p className="text-xl md:text-2xl leading-relaxed text-cream font-light">
                  Fælles for alt mit arbejde er interessen for det øjeblik hvor noget abstrakt bliver konkret — hvor en
                  idé finder sin form, en oplevelse finder sit udtryk, en fortælling finder sin modtager.
                </p>
                <p>
                  Jeg er på hjemmebane når disciplinerne overlapper, og tiltrukket af de projekter der ikke lader sig løse med én faglighed alene.
                </p>
                <p>
                  De seneste ti år har jeg arbejdet selvstændigt med klienter som DR, Amnesty International og Danmarks
                  Naturfredningsforening. Med særlig interesse for formidling til børn og unge i skæringspunktet mellem teknologi, læring og menneskelig indsigt.
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
                  Jeg arbejder i skæringsfeltet mellem strategi, design og teknologi — og bringer alle tre perspektiver
                  ind i hvert projekt.
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
              </div>

              <ul className="divide-y divide-cream/10 border-y border-cream/10">
                <li className="py-8 md:py-10 grid grid-cols-12 gap-6">
                  <span className="col-span-2 md:col-span-1 font-display text-2xl text-ember">01</span>
                  <div className="col-span-10 md:col-span-11 lg:col-span-6">
                    <h3 className="font-display text-2xl md:text-[1.7rem] tracking-tight leading-snug break-words [overflow-wrap:anywhere]">
                      Cand.it · Digital Design og Interaktive Teknologier
                    </h3>
                    <p className="mt-2 text-sm text-cream/55 italic">IT-Universitetet København · 2024</p>
                  </div>
                  <p className="col-span-10 col-start-3 md:col-span-11 md:col-start-2 lg:col-span-5 lg:col-start-auto lg:mt-0 mt-3 text-cream/80 leading-relaxed">
                    Tværfagligt kandidatprogram med fokus på interaktionsdesign, UX research og digitale teknologier.
                  </p>
                </li>
                <li className="py-8 md:py-10 grid grid-cols-12 gap-6">
                  <span className="col-span-2 md:col-span-1 font-display text-2xl text-ember">02</span>
                  <div className="col-span-10 md:col-span-11 lg:col-span-6">
                    <h3 className="font-display text-2xl md:text-[1.7rem] tracking-snug leading-snug break-words [overflow-wrap:anywhere]">
                      Professionsbachelor · Medie- og sonokommunikation
                    </h3>
                    <p className="mt-2 text-sm text-cream/55 italic">Sonic College · 2016</p>
                  </div>
                  <p className="col-span-10 col-start-3 md:col-span-11 md:col-start-2 lg:col-span-5 lg:col-start-auto lg:mt-0 mt-3 text-cream/80 leading-relaxed">
                    Praksisnær uddannelse i lyd, medieproduktion og kommunikation.
                  </p>
                </li>
                <li className="py-8 md:py-10 grid grid-cols-12 gap-6">
                  <span className="col-span-2 md:col-span-1 font-display text-2xl text-ember">03</span>
                  <div className="col-span-10 md:col-span-11 lg:col-span-6">
                    <h3 className="font-display text-2xl md:text-[1.7rem] tracking-snug leading-snug break-words [overflow-wrap:anywhere]">
                      Sociologi & Kulturanalyse
                    </h3>
                    <p className="mt-2 text-sm text-cream/55 italic">Syddansk Universitet · 2011</p>
                  </div>
                  <p className="col-span-10 col-start-3 md:col-span-11 md:col-start-2 lg:col-span-5 lg:col-start-auto lg:mt-0 mt-3 text-cream/80 leading-relaxed">
                    Første år af bacheloren — et fagligt afsæt i kulturteori, samfundsanalyse og sociologisk metode.
                  </p>
                </li>
              </ul>
            </div>
          </section>

          {/* BAGGRUND */}
          <section id="baggrund" className="py-16 md:py-20">
            <div className="px-5 md:px-14">
              <div className="mb-12 md:mb-16">
                <Eyebrow>Baggrund</Eyebrow>
                <h2 className="font-display text-5xl md:text-7xl mt-6 leading-[0.95] tracking-tight">
                  Tre <span className="italic text-ember">aner</span>
                </h2>
                <p className="mt-8 max-w-2xl text-lg text-cream/75 leading-relaxed">
                  Bag det professionelle arbejde ligger tre aner — som tilsammen former den måde jeg arbejder på i dag.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 relative md:items-start gap-x-8">
                {[
                  {
                    title: "Teknologi",
                    tagline: "Det digitale lag",
                    description:
                      "Ti år med læringsdesign, medieproduktion og redaktionel tilrettelæggelse for DR, Amnesty og Danmarks Naturfredningsforening.",
                    icon: (
                      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-20 h-20 md:w-24 md:h-24 text-cream">
                        <line x1="25" y1="30" x2="60" y2="20" />
                        <line x1="25" y1="30" x2="50" y2="55" />
                        <line x1="25" y1="30" x2="30" y2="75" />
                        <line x1="60" y1="20" x2="80" y2="45" />
                        <line x1="50" y1="55" x2="80" y2="45" />
                        <line x1="50" y1="55" x2="70" y2="80" />
                        <line x1="30" y1="75" x2="50" y2="55" />
                        <line x1="30" y1="75" x2="70" y2="80" />
                        <line x1="80" y1="45" x2="70" y2="80" />
                        <circle cx="25" cy="30" r="3.5" fill="currentColor" stroke="none" />
                        <circle cx="60" cy="20" r="3.5" fill="currentColor" stroke="none" />
                        <circle cx="80" cy="45" r="3.5" fill="currentColor" stroke="none" />
                        <circle cx="50" cy="55" r="5" stroke="none" className="fill-ember" />
                        <circle cx="30" cy="75" r="3.5" fill="currentColor" stroke="none" />
                        <circle cx="70" cy="80" r="3.5" fill="currentColor" stroke="none" />
                      </svg>
                    ),
                  },
                  {
                    title: "Lyd & Musik",
                    tagline: "Lyden og udtrykket",
                    description:
                      "Komponist, musiker og sangskriver med arbejde for kunstnere, kortfilm og reklame.",
                    icon: (
                      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-20 h-20 md:w-24 md:h-24 text-cream">
                        {[18, 26, 34, 42, 50, 58, 66, 74, 82].map((x, i) => {
                          const heights = [10, 22, 16, 32, 44, 32, 16, 22, 10];
                          const h = heights[i];
                          const isCenter = i === 4;
                          return (
                            <line key={x} x1={x} y1={50 - h / 2} x2={x} y2={50 + h / 2} strokeWidth={isCenter ? 2.5 : 1.5} className={isCenter ? "stroke-ember" : undefined} />
                          );
                        })}
                      </svg>
                    ),
                  },
                  {
                    title: "Kommunikation",
                    tagline: "Brobyggeren",
                    description:
                      "Oversætter kompleksitet til oplevelse — og håndværk til indhold der rammer.",
                    icon: (
                      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-20 h-20 md:w-24 md:h-24 text-cream">
                        <defs>
                          <clipPath id="venn-left"><circle cx="38" cy="50" r="22" /></clipPath>
                        </defs>
                        <circle cx="62" cy="50" r="22" className="fill-ember" stroke="none" clipPath="url(#venn-left)" />
                        <circle cx="38" cy="50" r="22" />
                        <circle cx="62" cy="50" r="22" />
                      </svg>
                    ),
                  },
                ].map((item, i) => (
                  <div
                    key={item.title}
                    className={`flex flex-col items-center ${i === 0 ? "md:pr-8" : i === 2 ? "md:pl-8" : "md:px-8"} ${i > 0 ? "mt-12 md:mt-0" : ""}`}
                  >
                    <div className="w-full max-w-[220px] flex flex-col items-center">
                      <div className="w-32 h-32 md:w-36 md:h-36 flex items-center justify-center mb-6 shrink-0">
                        {item.icon}
                      </div>
                      <h3 className="font-display text-xl md:text-2xl tracking-tight leading-snug text-center whitespace-nowrap">
                        {item.title}
                      </h3>
                      <p className="mt-2 italic text-cream/60 text-sm text-center">
                        {item.tagline}
                      </p>
                      <p className="mt-3 text-cream/80 leading-relaxed text-center self-stretch">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* KONTAKT */}
          <section id="kontakt" className="py-16 md:py-20 relative overflow-hidden">
            <div className="px-12 md:px-14 relative">
              <Eyebrow>Kontakt</Eyebrow>
              <h2 className="font-display text-5xl md:text-7xl mt-6 leading-[0.95] tracking-tight">
                Lad os <span className="italic text-ember">tales ved</span>
              </h2>
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-6">
                <div className="group shrink-0 w-[200px] h-[200px] overflow-hidden rounded-full ring-2 ring-[#F5F0E8]/30 shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
                  <img
                    src={profilePhoto}
                    alt="Jonas K.P. Sørensen"
                    className="w-full h-full object-cover brightness-90 saturate-75 group-hover:brightness-100 group-hover:saturate-100 transition-all duration-[400ms] ease-out group-hover:scale-[1.06]"
                  />
                </div>
                <p className="max-w-xl text-cream/70 text-lg italic font-display">
                  Jeg er altid interesseret i nye samarbejder — store som små, kommercielle som kulturelle. Særligt inden for læringsindhold, medieproduktion og formidling til børn og unge.
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

              <div className="mt-16 flex justify-center">
                <a
                  href="/Jonas_Sorensen_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-sm font-semibold tracking-wide bg-transparent text-[#F5F0E8] border-2 border-[#F5F0E8] hover:bg-[#F5F0E8] hover:text-[#0D1B2A] hover:border-[#F5F0E8] transition-all duration-300 ease-out"
                  style={{ padding: "12px 28px", borderRadius: "50px" }}
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

      {/* FOOTER — only under left content column so sidebar reaches the bottom */}
      <footer className="w-full max-w-full lg:w-[60%] lg:max-w-[60%] bg-navy-deep py-10 relative z-10 overflow-x-hidden">
        <div className="px-12 md:px-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-sm text-cream/55">
          <p>Jonas K.P. Sørensen · Redaktionel tilrettelægger & formidler · Aarhus</p>
          <p>© {new Date().getFullYear()}</p>
        </div>
      </footer>
    </main>
  );
}

const FILTERS = [
  "Alle",
  "Lydproduktion",
  "Børn og unge",
  "Læringsdesign",
  "Digital design",
  "Strategisk kommunikation",
  "Brandudvikling",
  "Konceptudvikling",
  "Medieproduktion",
] as const;

type Filter = (typeof FILTERS)[number];

const CASE_META: Record<string, { headline: string; tags: string[] }> = {
  wolt: {
    headline: "Fra usynlig algoritme til informeret bud",
    tags: ["Digital design", "Konceptudvikling"],
  },
  boliga: {
    headline: "Reduceret kompleksitet i boligsøgning",
    tags: ["Digital design"],
  },
  "interaktiv-horesimulering": {
    headline: "Inklusion i undervisningen",
    tags: ["Læringsdesign", "Børn og unge", "Konceptudvikling"],
  },
  "danmarks-radio": {
    headline: "Digitale og lydbaserede formater",
    tags: ["Lydproduktion", "Børn og unge", "Medieproduktion"],
  },
  "amnesty-international": {
    headline: "Menneskerettigheder i lyd",
    tags: ["Lydproduktion", "Medieproduktion"],
  },
  "danmarks-naturfredningsforening": {
    headline: "Bæredygtighed og brandudvikling",
    tags: ["Medieproduktion", "Strategisk kommunikation", "Brandudvikling"],
  },
  "ulla-dyrlov": {
    headline: "Koncept og platform fra bunden",
    tags: ["Lydproduktion", "Børn og unge", "Brandudvikling"],
  },
  "concerto-copenhagen": {
    headline: "Bach til en ny generation",
    tags: ["Lydproduktion", "Børn og unge", "Strategisk kommunikation"],
  },
  "art-spirit-coaching": {
    headline: "Brand og koncept fra idé til lancering",
    tags: ["Brandudvikling", "Strategisk kommunikation", "Konceptudvikling"],
  },
  "musikfaellesskabet-i-nye": {
    headline: "En borgerdrevet musikskole",
    tags: ["Lydproduktion", "Konceptudvikling", "Læringsdesign"],
  },
  "lydboger-til-born-med-adhd": {
    headline: "Lydbøger til børn med ADHD",
    tags: ["Læringsdesign", "Børn og unge", "Lydbaseret formidling"],
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
    acc[f] = f === "Alle" ? caseStudies.length : caseStudies.filter((c) => CASE_META[c.slug]?.tags.includes(f)).length;
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

  const SCROLL_STEP = 3; // matches fully-visible cards in the 3.5-card layout

  const showNextCase = () => {
    if (!filtered.length) return;
    const last = filtered.length - 1;
    const next = currentIndex >= last ? 0 : Math.min(currentIndex + SCROLL_STEP, last);
    setCurrentIndex(next);
    scrollToIndex(next);
  };

  const showPreviousCase = () => {
    if (!filtered.length) return;
    const last = filtered.length - 1;
    const prev = currentIndex <= 0 ? last : Math.max(currentIndex - SCROLL_STEP, 0);
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
                              (active ? "bg-ember/15 text-cream" : "text-cream/75 hover:bg-cream/5 hover:text-cream")
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
            <div className="hidden md:flex items-center gap-2">
              <button
                type="button"
                aria-label="Forrige case"
                onClick={showPreviousCase}
                className="w-9 h-9 rounded-full border border-cream/25 text-cream flex items-center justify-center transition-colors hover:border-[#B83A20] hover:text-[#B83A20]"
              >
                <span aria-hidden className="text-base leading-none">
                  ←
                </span>
              </button>
              <button
                type="button"
                aria-label="Næste case"
                onClick={showNextCase}
                className="w-9 h-9 rounded-full border border-cream/25 text-cream flex items-center justify-center transition-colors hover:border-[#B83A20] hover:text-[#B83A20]"
              >
                <span aria-hidden className="text-base leading-none">
                  →
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Cases view: slider (Alle) or grid (filter) */}
      {(() => {
        const renderCard = (c: (typeof caseStudies)[number], variant: "slider" | "grid", index: number) => {
          const meta = CASE_META[c.slug];
          const sizing =
            variant === "slider"
              ? "snap-start shrink-0 w-[calc((100vw-6rem)/1.5)] sm:w-[calc((100vw-7rem)/2.5)] md:w-[calc((100vw-8rem)/3.5)] lg:w-[calc((60vw-8rem)/3.5)]"
              : "w-full";
          const imgWrapperClass =
            variant === "slider"
              ? "w-full overflow-hidden bg-navy h-[180px] max-[428px]:h-[160px]"
              : "w-full overflow-hidden bg-navy h-[250px]";
          const bodyPadding =
            variant === "slider"
              ? "p-6 max-[428px]:p-4 flex flex-col gap-3 max-[428px]:gap-2"
              : "p-6 flex flex-col gap-3";
          const clientSize = variant === "slider" ? "max-[428px]:!text-[10px]" : "";
          const headlineSize = variant === "slider" ? "max-[428px]:!text-[15px]" : "";
          const tagSize = variant === "slider" ? "max-[428px]:text-[9px] max-[428px]:px-2 max-[428px]:py-0.5" : "";
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
                "cursor-pointer " +
                sizing
              }
            >
              <div className={imgWrapperClass + " relative"}>
                <img
                  src={c.image}
                  alt={`${c.client} — ${meta?.headline ?? c.title}`}
                  loading="lazy"
                  className={imgClass}
                />
                {c.status === "ongoing" && (
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-cream/40 bg-[#0D1B2A]/70 backdrop-blur text-[10px] tracking-[0.15em] uppercase text-cream/90 font-semibold">
                    <span className="h-1.5 w-1.5 rounded-full bg-ember animate-pulse" />
                    {c.statusLabel ?? "Igangværende"}
                  </span>
                )}
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
                        "text-[10px] tracking-wide px-2.5 py-1 rounded-full border border-cream/10 bg-cream/5 text-cream/55 " +
                        tagSize
                      }
                    >
                      {t}
                    </li>
                  ))}
                </ul>
                {variant === "slider" && (
                  <span
                    aria-hidden
                    className="mt-2 self-end inline-flex items-center gap-1.5 text-[10px] tracking-[0.15em] uppercase text-cream font-semibold md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100 md:hover:!text-[#B83A20] transition-[opacity,color] duration-[400ms] md:hover:duration-300 ease-out"
                  >
                    <MousePointerClick className="w-3.5 h-3.5" strokeWidth={1.75} />
                    Se case
                  </span>
                )}
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
                        document.getElementById("cases")?.scrollIntoView({ behavior: "smooth", block: "start" });
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
                      className="absolute inset-y-0 left-0 bg-[#B83A20] transition-[width] duration-300 ease-out rounded-full"
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

      <CaseModal study={openCase} onClose={() => setOpenCase(null)} onNavigate={(s) => setOpenCase(s)} />
    </section>
  );
}

// ============ Kompetencer with interactive tag popups ============

const TAG_TO_SLUGS: Record<string, string[]> = {
  Interviews: ["wolt", "interaktiv-horesimulering"],
  Feltobservation: ["wolt", "interaktiv-horesimulering"],
  "Co-design": ["wolt", "interaktiv-horesimulering"],
  "Mixed methods": ["wolt", "interaktiv-horesimulering"],
  Facilitering: ["interaktiv-horesimulering", "amnesty-international"],
  Workshops: ["interaktiv-horesimulering", "amnesty-international"],
  Brugerrejser: ["boliga", "wolt"],
  Touchpoints: ["boliga", "wolt"],
  "Participatorisk design": ["interaktiv-horesimulering"],
  Konceptvalidering: ["interaktiv-horesimulering"],
  Kommunikation: ["amnesty-international", "danmarks-naturfredningsforening", "art-spirit-coaching"],
  "Visuel identitet": ["amnesty-international", "danmarks-naturfredningsforening", "art-spirit-coaching"],
  Indholdsarkitektur: ["boliga", "danmarks-radio"],
  Positionering: ["boliga", "danmarks-radio"],
  "Redaktionel tilrettelæggelse": ["danmarks-radio", "ulla-dyrlov", "concerto-copenhagen"],
  Indholdsproduktion: ["danmarks-radio", "ulla-dyrlov", "concerto-copenhagen"],
  Postproduktion: ["danmarks-radio", "ulla-dyrlov"],
  "Børn og unge": ["interaktiv-horesimulering", "ulla-dyrlov"],
  "Digital dannelse": ["interaktiv-horesimulering", "wolt"],
  Læringsindhold: ["ulla-dyrlov", "interaktiv-horesimulering"],
  AI: ["wolt", "interaktiv-horesimulering"],
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
  const [openCase, setOpenCase] = useState<CaseStudy | null>(null);


  return (
    <>
      <ul className="divide-y divide-cream/10 border-y border-cream/10">
        {competencies.map((c) => (
          <li
            key={c.no}
            className="group py-5 md:py-6 hover:bg-navy/40 transition-colors -mx-5 md:-mx-14 px-5 md:px-14"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 md:gap-12 md:gap-y-3">
              <div className="md:col-span-12 min-w-0 flex items-baseline gap-4">
                <span className="font-display text-2xl text-ember shrink-0">{c.no}</span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display tracking-tight leading-tight max-w-full [word-break:normal] [overflow-wrap:break-word] [hyphens:none] text-[clamp(1.3rem,5vw,2rem)] md:text-[2rem]">
                    {c.title}
                  </h3>
                </div>
              </div>

              <p className="md:col-span-12 mt-2 text-sm md:text-[0.95rem] text-cream/80 leading-snug">{c.body}</p>

              <ul className="md:col-span-12 mt-2 self-start flex flex-wrap gap-1.5">
                {c.tags.map((t) => (
                  <li key={t} className="inline-flex">
                    <span
                      style={{ padding: "4px 10px", fontSize: "10px", lineHeight: "1" }}
                      className="tracking-wide uppercase rounded-md bg-[#F5F0E8]/40 text-[#F5F0E8]"
                    >
                      {t}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
      <CaseModal study={openCase} onClose={() => setOpenCase(null)} onNavigate={(s) => setOpenCase(s)} />
    </>
  );
}
