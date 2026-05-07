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

const TW_CURSOR_CSS =
  "@keyframes tw-blink{0%,49.9%{opacity:1}50%,100%{opacity:0}}.tw-cursor{display:inline-block;margin-left:2px;font-weight:400;color:#F5F0E8;animation:tw-blink 1.06s steps(1,end) infinite}.tw-cursor.is-typing{animation:none;opacity:1}";

function CodeParadoxBlock() {
  const line1Ref = useRef<HTMLDivElement>(null);
  const line1PrefixRef = useRef<HTMLSpanElement>(null);
  const line1TitleRef = useRef<HTMLSpanElement>(null);
  const line2StringRef = useRef<HTMLSpanElement>(null);
  const line2CursorRef = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const line3CursorRef = useRef<HTMLSpanElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  
  const line1CursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const L1_PREFIX = "// ";
    const L1_TITLE = "The Ai paradox:";
    const L2S = '"Too much Artificial"';
    const L3 = "// Not enough intelligence...";

    // Reuse the statically-rendered cursor (visible from first paint)
    const cursor = line1CursorRef.current?.querySelector<HTMLSpanElement>(".tw-cursor");
    if (!cursor) return;

    const timeouts: ReturnType<typeof setTimeout>[] = [];

    if (reduceMotion) {
      cursor.remove();
      if (line1PrefixRef.current) line1PrefixRef.current.textContent = L1_PREFIX;
      if (line1TitleRef.current) line1TitleRef.current.textContent = L1_TITLE;
      if (line2StringRef.current) line2StringRef.current.textContent = L2S;
      if (line3Ref.current) line3Ref.current.textContent = L3;
      return;
    }

    let blinkTimer: ReturnType<typeof setTimeout> | null = null;
    const placeCursor = (parent: HTMLElement, holdMs: number) => {
      if (cursor.parentElement !== parent) parent.appendChild(cursor);
      cursor.classList.add("is-typing");
      if (blinkTimer) clearTimeout(blinkTimer);
      blinkTimer = setTimeout(() => cursor.classList.remove("is-typing"), holdMs);
      timeouts.push(blinkTimer);
    };

    type Target = "l1p" | "l1t" | "l2s" | "l3";
    type Step = { target: Target; text: string; delay: number };

    const rand = (min: number, max: number) => min + Math.random() * (max - min);
    const charDelay = () => rand(80, 100) + rand(-15, 15);

    const steps: Step[] = [];
    const pushTyping = (target: Target, full: string) => {
      for (let c = 1; c <= full.length; c++) {
        steps.push({ target, text: full.slice(0, c), delay: charDelay() });
      }
    };

    pushTyping("l1p", L1_PREFIX);
    pushTyping("l1t", L1_TITLE);
    if (steps.length) steps[steps.length - 1].delay += 400;

    pushTyping("l2s", L2S);
    if (steps.length) steps[steps.length - 1].delay += 400;

    const PREFIX = "// Not enough intelli";
    const WRONG = "ggenc";
    for (let c = 1; c <= PREFIX.length; c++) {
      steps.push({ target: "l3", text: PREFIX.slice(0, c), delay: charDelay() });
    }
    for (let k = 1; k <= WRONG.length; k++) {
      steps.push({ target: "l3", text: PREFIX + WRONG.slice(0, k), delay: 95 });
    }
    steps[steps.length - 1].delay += 600;
    for (let k = WRONG.length - 1; k >= 0; k--) {
      steps.push({ target: "l3", text: PREFIX + WRONG.slice(0, k), delay: 150 });
    }
    for (let c = PREFIX.length + 1; c <= L3.length; c++) {
      steps.push({ target: "l3", text: L3.slice(0, c), delay: charDelay() });
    }

    const writeStep = (s: Step) => {
      let el: HTMLElement | null = null;
      let cursorParent: HTMLElement | null = null;
      switch (s.target) {
        case "l1p":
          el = line1PrefixRef.current;
          cursorParent = line1CursorRef.current;
          break;
        case "l1t":
          el = line1TitleRef.current;
          cursorParent = line1CursorRef.current;
          break;
        case "l2s":
          el = line2StringRef.current;
          cursorParent = line2CursorRef.current;
          break;
        case "l3":
          el = line3Ref.current;
          cursorParent = line3CursorRef.current;
          break;
      }
      if (!el) return;
      el.textContent = s.text;
      if (cursorParent) placeCursor(cursorParent, Math.max(60, s.delay - 20));
    };

    let rafId = 0;
    let cancelled = false;
    let started = false;
    let stepIdx = 0;
    let nextAt = 0;

    const tick = (now: number) => {
      if (cancelled) return;
      while (stepIdx < steps.length && now >= nextAt) {
        const s = steps[stepIdx];
        writeStep(s);
        nextAt += s.delay;
        stepIdx++;
      }
      if (stepIdx < steps.length) {
        rafId = requestAnimationFrame(tick);
      } else {
        cursor.classList.remove("is-typing");
        cursor.style.transition = "opacity 800ms ease-out";
        cursor.style.opacity = "0";
        const removeT = setTimeout(() => {
          cursor.remove();
        }, 850);
        timeouts.push(removeT);
      }
    };

    const start = () => {
      if (started) return;
      started = true;
      // Wait 5s with cursor blinking, then begin typing
      const beginT = setTimeout(() => {
        nextAt = performance.now();
        rafId = requestAnimationFrame(tick);
      }, 5000);
      timeouts.push(beginT);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            start();
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.35 },
    );
    io.observe(section);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      timeouts.forEach(clearTimeout);
      io.disconnect();
    };
  }, []);

  const monoFamily =
    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace";

  return (
    <section
      ref={sectionRef}
      aria-label="The AI paradox"
      className="w-full flex flex-col items-center"
      style={{ padding: "48px 24px", background: "transparent" }}
    >
      <style dangerouslySetInnerHTML={{ __html: TW_CURSOR_CSS }} />
      <div
        ref={windowRef}
        style={{
          width: "560px",
          maxWidth: "100%",
          background: "#000000",
          border: "1px solid #2a2a2a",
          borderRadius: "10px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.45)",
          overflow: "hidden",
          fontFamily: monoFamily,
          textAlign: "left",
          contain: "layout paint",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 14px",
            background: "#1a1a1a",
            borderBottom: "1px solid #2a2a2a",
          }}
        >
          <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#FF5F56", display: "inline-block" }} />
          <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#FFBD2E", display: "inline-block" }} />
          <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#27C93F", display: "inline-block" }} />
        </div>
        <div style={{ padding: "40px", lineHeight: 1.8, minHeight: "152px" }}>
          <div ref={line1Ref} style={{ display: "flex", alignItems: "baseline", flexWrap: "nowrap", fontSize: "24px", lineHeight: 1.8, height: "43.2px", whiteSpace: "nowrap" }}>
            <span ref={line1PrefixRef} style={{ color: "#6A737D", whiteSpace: "pre" }} />
            <span ref={line1TitleRef} style={{ color: "#FFFFFF", fontWeight: 600, whiteSpace: "pre" }} />
            <span ref={line1CursorRef}><span aria-hidden="true" className="tw-cursor">|</span></span>
          </div>
          <div style={{ fontSize: "20px", lineHeight: 1.8, height: "36px", whiteSpace: "nowrap" }}>
            <span ref={line2StringRef} style={{ color: "#98C379", whiteSpace: "pre" }} />
            <span ref={line2CursorRef} />
          </div>
          <div style={{ fontSize: "20px", lineHeight: 1.8, color: "#6A737D", height: "36px", whiteSpace: "nowrap" }}>
            <span ref={line3Ref} style={{ whiteSpace: "pre" }} />
            <span ref={line3CursorRef} />
          </div>
        </div>
      </div>
    </section>
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
        </div>

        <CodeParadoxBlock />

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
            <div className="px-5 md:px-14">
              <div className="mb-8 md:mb-16">
                <Eyebrow>Uddannelse</Eyebrow>
                <h2 className="font-display text-5xl md:text-7xl mt-6 leading-[0.95] tracking-tight">
                  Mit faglige <span className="italic text-ember">ståsted</span>
                </h2>
              </div>

              <ul className="divide-y divide-cream/10 border-y border-cream/10">
                {[
                  {
                    no: "01",
                    title: "Cand.it · Digital Design og Interaktive Teknologier",
                    meta: "IT-Universitetet København · 2024",
                    body: "Tværfagligt kandidatprogram med fokus på interaktionsdesign, UX research og digitale teknologier.",
                  },
                  {
                    no: "02",
                    title: "Professionsbachelor · Medie- og sonokommunikation",
                    meta: "Sonic College · 2016",
                    body: "Praksisnær uddannelse i lyd, medieproduktion og kommunikation.",
                  },
                  {
                    no: "03",
                    title: "Sociologi & Kulturanalyse",
                    meta: "Syddansk Universitet · 2011",
                    body: "Første år af bacheloren — et fagligt afsæt i kulturteori, samfundsanalyse og sociologisk metode.",
                  },
                ].map((e) => (
                  <li
                    key={e.no}
                    className="group py-5 md:py-6 hover:bg-navy/40 transition-colors -mx-5 md:-mx-14 px-5 md:px-14"
                  >
                    <div className="min-w-0 flex items-baseline gap-4">
                      <span className="font-display text-2xl text-ember shrink-0">{e.no}</span>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-display tracking-tight leading-tight max-w-full [word-break:normal] [overflow-wrap:break-word] [hyphens:none] text-[clamp(1.3rem,5vw,2rem)] md:text-[2rem]">
                          {e.title}
                        </h3>
                        <p className="mt-1 md:mt-2 text-sm text-cream/55 italic leading-snug">{e.meta}</p>
                        <p className="mt-2 text-sm md:text-[0.95rem] text-cream/80 leading-snug">{e.body}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* BAGGRUND */}
          <section id="baggrund" className="py-16 md:py-20">
            <div className="px-5 md:px-14">
              <div className="mb-6 md:mb-10">
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
                      "Ti år med læringsdesign, medieproduktion og redaktionel tilrettelæggelse for bl.a. DR, Amnesty og Danmarks Naturfredningsforening.",
                    icon: (
                      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-20 h-20 md:w-24 md:h-24 text-cream">
                        {[0, 60, 120, 180, 240, 300].map((deg) => {
                          const rad = (deg * Math.PI) / 180;
                          const x = 50 + Math.cos(rad) * 22;
                          const y = 50 + Math.sin(rad) * 22;
                          return <line key={deg} x1="50" y1="50" x2={x} y2={y} />;
                        })}
                        {[0, 60, 120, 180, 240, 300].map((deg) => {
                          const rad = (deg * Math.PI) / 180;
                          const x = 50 + Math.cos(rad) * 22;
                          const y = 50 + Math.sin(rad) * 22;
                          return <circle key={deg} cx={x} cy={y} r="3" fill="none" stroke="currentColor" />;
                        })}
                        <circle cx="50" cy="50" r="3" stroke="none" className="fill-ember" />
                      </svg>
                    ),
                  },
                  {
                    title: "Lyd & Musik",
                    tagline: "Det soniske lag",
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
                    tagline: "Det menneskelige lag",
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
                      <div className="w-28 h-28 md:w-32 md:h-32 flex items-center justify-center mb-2 md:mb-3 shrink-0 transition-all duration-300 ease-out hover:scale-[1.06] hover:[filter:drop-shadow(0_0_14px_var(--ember))]">
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
            <div className="min-w-0 flex items-baseline gap-4">
              <span className="font-display text-2xl text-ember shrink-0">{c.no}</span>
              <div className="min-w-0 flex-1">
                <h3 className="font-display tracking-tight leading-tight max-w-full [word-break:normal] [overflow-wrap:break-word] [hyphens:none] text-[clamp(1.3rem,5vw,2rem)] md:text-[2rem]">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm md:text-[0.95rem] text-cream/80 leading-snug">{c.body}</p>
                <ul className="mt-2 flex flex-wrap gap-1.5">
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
            </div>
          </li>
        ))}
      </ul>
      <CaseModal study={openCase} onClose={() => setOpenCase(null)} onNavigate={(s) => setOpenCase(s)} />
    </>
  );
}
