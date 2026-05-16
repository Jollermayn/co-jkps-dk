import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { SlidersHorizontal, X, MousePointerClick } from "lucide-react";
import { caseStudies, type CaseStudy } from "@/data/cases";

import { CaseModal } from "@/components/CaseModal";
import profilePhoto from "@/assets/profile-photo.png";
import chimpSuit from "@/assets/chimp-suit.png";
import { SiteLogo } from "@/components/SiteLogo";
import { MenuIcon } from "@/components/MenuIcon";


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
    title: "UX Research & Brugerindsigt",
    sub: "Research & Brugerinddragelse",
    body: "Dybdegående indsigt gennem interviews, feltobservation, co-design og brugertest. Jeg oversætter kompleks adfærd til handlebare beslutninger for både design og forretning.",
    tags: ["Interviews", "Feltobservation", "Co-design", "Mixed methods", "Workshops"],
    relatedCases: ["interaktiv-horesimulering", "wolt", "boliga"],
  },
  {
    no: "2",
    title: "Servicedesign & Konceptudvikling",
    sub: "Fra problem til realiserbart koncept",
    body: "Fra identifikation af problemet til et konkret, realiserbart koncept. Jeg designer brugerrejser, touchpoints og serviceoplevelser der skaber reel værdi for bruger og organisation.",
    tags: ["Brugerrejser", "Touchpoints", "Servicedesign", "Konceptvalidering"],
    relatedCases: ["wolt", "boliga", "ulla-dyrlov"],
  },
  {
    no: "3",
    title: "Forretningsforståelse & Rådgivning",
    sub: "Bruger møder forretning",
    body: "Jeg arbejder i krydsfeltet mellem brugerbehov og forretningsmål — og hjælper organisationer med at omsætte indsigt til konkrete beslutninger og løsninger.",
    tags: ["Stakeholdermanagement", "Forretningsudvikling", "Strategisk rådgivning"],
    relatedCases: ["wolt", "boliga", "art-spirit-coaching"],
  },
  {
    no: "4",
    title: "Formidling & Kommunikation",
    sub: "Stemme, position og indhold",
    body: "Strategisk rådgivning om digital tilstedeværelse, indhold og positionering. Erfaring med at kommunikere komplekse emner til brede målgrupper på tværs af platforme.",
    tags: ["Kommunikation", "Indholdsarkitektur", "Positionering", "Formidling"],
    relatedCases: ["amnesty-international", "danmarks-naturfredningsforening", "danmarks-radio"],
  },
  {
    no: "5",
    title: "Digital Design & Produktion",
    sub: "Fra koncept til færdig leverance",
    body: "Tværfaglig produktion fra koncept til færdig leverance. Teknisk kompetence kombineret med sans for kommunikation og brugervenlighed.",
    tags: ["Digital design", "Konceptudvikling", "Projektledelse", "Leverance"],
    relatedCases: ["ulla-dyrlov", "art-spirit-coaching", "danmarks-radio"],
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
      <span
        className="eyebrow text-ember"
        style={{ fontSize: "clamp(1.4rem, 2.6vw, 2.25rem)", fontWeight: 600, letterSpacing: "0.18em" }}
      >
        {children}
      </span>
      <span aria-hidden className="mt-2 block h-[2px] w-1/2 bg-[#B83A20]" />
    </span>
  );
}


function Sidebar() {
  return (
    <aside className="hero-sidebar relative w-full min-w-0 max-w-full flex flex-col lg:overflow-y-auto lg:fixed lg:top-0 lg:right-0 lg:w-[40%] lg:h-screen px-6 md:px-14 lg:px-16 py-12 md:py-20 lg:pt-[6vh] lg:pb-10 border-b lg:border-b-0 lg:border-l border-cream/10 order-1 lg:order-last bg-[#0D1B2A] lg:z-20 lg:rounded-l-xl lg:shadow-[-8px_0_24px_rgba(0,0,0,0.25)] text-center items-center gap-8 lg:gap-6">
      <div className="w-full flex flex-col items-center gap-8 lg:gap-6">
        <p className="text-xs uppercase tracking-[0.3em] text-ember mb-6">Portfolio</p>
        <div className="w-full flex flex-col gap-3 lg:gap-4 items-center text-center">
          <h1 className="font-display tracking-[-0.02em] font-medium text-center px-2 flex flex-col items-center leading-none">
            <span className="block whitespace-nowrap text-[clamp(3.5rem,9vw,6rem)] leading-none" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>Jonas K.P.</span>
            <span className="block whitespace-nowrap text-[clamp(3.5rem,9vw,6rem)] leading-none -mt-[0.08em]" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>Sørensen</span>
          </h1>
          <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-cream/55 mt-1">
            <span>Digital konsulent · UX Research & Servicedesign</span>
            <span style={{ color: "white", opacity: 1, display: "block", marginTop: "4px", fontWeight: 500 }}>
              Selvstændig siden 2016
            </span>
          </p>
        </div>

        <p className="font-display italic text-cream text-xl md:text-2xl leading-relaxed text-center mt-6 lg:mt-8 mb-6 lg:mb-8">
          &ldquo;For meget &lsquo;Artificial&rsquo; &mdash; for lidt &lsquo;Intelligence&rsquo;.&rdquo;
        </p>

        <div className="flex flex-col items-center gap-6 lg:gap-3 w-full text-center lg:translate-y-[15px]">
          <a
            href="/cv"
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

          <div className="shrink-0 w-[160px] h-[160px] overflow-hidden rounded-full ring-2 ring-[#F5F0E8]/30 shadow-[0_4px_16px_rgba(0,0,0,0.4)] mt-6 lg:mt-8">
            <img src={profilePhoto} alt="Jonas K.P. Sørensen" className="w-full h-full object-cover" />
          </div>
        </div>

      </div>
    </aside>
  );
}

function MobileHeader() {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* Mobile header — unchanged */}
      <nav className="flex md:hidden" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, backgroundColor: "#E0D9C8", height: 72, padding: "0 24px", alignItems: "center", justifyContent: "flex-end", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
        <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
          <SiteLogo />
        </div>
        <button type="button" aria-label="Åbn menu" onClick={() => setOpen(true)} style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer", display: "inline-flex" }}>
          <MenuIcon />
        </button>
      </nav>

      {/* Desktop header — spans only content column (stops where hero sidebar begins) */}
      <nav
        className="hidden md:flex"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "60%",
          zIndex: 100,
          height: 80,
          padding: "0 64px",
          backgroundColor: "#0A1628",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <SiteLogo color="#ffffff" lineColor="#F5F0E8" lineOpacity={1} size={48} />
        <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
          {[
            { label: "Cases", href: "/#cases" },
            { label: "Kompetencer", href: "/#kompetencer" },
            { label: "Min tilgang", href: "/tilgang" },
            { label: "Kontakt", href: "/#kontakt" },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="desktop-nav-link"
              style={{
                fontFamily: "serif",
                fontSize: "0.9rem",
                fontWeight: 400,
                color: "white",
                letterSpacing: "0.05em",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
      </nav>
      <style>{`.desktop-nav-link:hover { color: #C0281E !important; }`}</style>

      {/* Full-screen menu overlay */}
      {open && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, backgroundColor: "#E0D9C8", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32 }}>
          <button type="button" aria-label="Luk menu" onClick={() => setOpen(false)} style={{ position: "absolute", top: 16, right: 24, background: "transparent", border: "none", color: "#0A1628", fontSize: "2rem", lineHeight: 1, padding: 0, cursor: "pointer" }}>
            ×
          </button>
          <Link to="/" onClick={() => setOpen(false)} style={{ fontFamily: "serif", fontSize: "1.8rem", color: "#0A1628", textDecoration: "none" }}>Portfolio</Link>
          <Link to="/tilgang" onClick={() => setOpen(false)} style={{ fontFamily: "serif", fontSize: "1.8rem", color: "#0A1628", textDecoration: "none" }}>Min tilgang</Link>
          <Link to="/cv" onClick={() => setOpen(false)} style={{ fontFamily: "serif", fontSize: "1.8rem", color: "#0A1628", textDecoration: "none" }}>CV</Link>
          <a href="#kontakt" onClick={() => setOpen(false)} style={{ fontFamily: "serif", fontSize: "1.8rem", color: "#0A1628", textDecoration: "none" }}>Kontakt</a>
        </div>
      )}
    </>
  );
}

function Index() {
  return (
    <main id="top" className="w-full min-w-0 max-w-full overflow-x-clip text-cream lg:bg-[#0D1B2A] pt-[72px] md:pt-[80px]">
      <MobileHeader />
      <div className="w-full min-w-0 max-w-full flex flex-col lg:block">

        {/* LEFT — scrolling content */}
        <div className="w-full min-w-0 max-w-full lg:max-w-[60%] lg:w-[60%] order-2 lg:order-none bg-navy-deep lg:mr-[40%]">
          {/* OM MIG */}
          <section id="om" className="py-16 md:py-20">
            <div className="px-12 md:px-14">
              <Eyebrow>Om mig</Eyebrow>
              <div className="mt-8 max-w-3xl space-y-6">
                <p style={{ color: "white", opacity: 0.85, fontSize: "1.1rem", lineHeight: 1.8 }}>
                  Jeg har arbejdet selvstændigt siden 2016 med UX research, servicedesign og konceptudvikling — på tværs af public service, civilsamfund og kommercielle virksomheder. Mit felt ligger i samspillet mellem strategi, teknologi og mennesker.
                </p>
                <p style={{ color: "white", fontStyle: "italic", opacity: 0.7, fontSize: "1rem", lineHeight: 1.8 }}>
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
                <h2 className="font-display text-5xl md:text-7xl mt-6 mb-8 leading-[0.95] tracking-tight">
                  Hvad jeg <span className="italic">bringer</span>
                </h2>
                <p style={{ color: "white", opacity: 0.85, fontSize: "1.05rem", lineHeight: 1.8, maxWidth: 560, marginBottom: 24 }}>
                  Jeg arbejder i skæringsfeltet mellem strategi, design og teknologi — hvor problemerne lever.
                </p>
                <p style={{ color: "white", fontStyle: "italic", opacity: 0.75, fontSize: "1rem", lineHeight: 2, maxWidth: 560 }}>
                  Indsigt omsættes. Design forankres. Strategi lander.
                </p>
              </div>

              <KompetencerList />

            </div>
          </section>


          {/* MIN TILGANG */}
          <section
            id="tilgang"
            style={{
              backgroundColor: "#F5F3EE",
              position: "relative",
              width: "100%",
              maxWidth: "100%",
              overflow: "hidden",
              boxSizing: "border-box",
            }}
            className="py-12 px-6 md:!py-20 md:!px-16"
          >
            <div className="flex flex-col md:flex-row md:items-center" style={{ width: "100%" }}>
              {/* LEFT: text */}
              <div
                className="w-full md:w-1/2 text-center md:text-left"
                style={{ overflow: "visible" }}
              >
                <Link to="/tilgang" style={{ display: "block", textDecoration: "none" }}>
                  <span
                    style={{
                      display: "block",
                      color: "#0A1628",
                      fontFamily: "serif",
                      fontStyle: "italic",
                      fontWeight: 600,
                      fontSize: "clamp(2rem, 4vw, 3.2rem)",
                      lineHeight: 1.1,
                    }}
                  >
                    Når vejen til forandring
                  </span>
                  <span
                    style={{
                      display: "block",
                      color: "#0A1628",
                      opacity: 0.5,
                      fontFamily: "serif",
                      fontStyle: "italic",
                      fontWeight: 400,
                      fontSize: "clamp(2rem, 4vw, 3.2rem)",
                      lineHeight: 1.1,
                      marginTop: "8px",
                    }}
                  >
                    er mere end pensel og papir.
                  </span>
                  <span
                    style={{
                      display: "block",
                      marginTop: "40px",
                      color: "#C0281E",
                      fontSize: "1rem",
                      fontStyle: "normal",
                      textDecoration: "underline",
                      textDecorationColor: "#C0281E",
                      textUnderlineOffset: "4px",
                    }}
                  >
                    Læs mere →
                  </span>
                </Link>
              </div>

              {/* RIGHT: empty for now */}
              <div className="w-full md:w-1/2 flex justify-center md:justify-end mt-8 md:mt-0">
                <img
                  src={chimpSuit}
                  alt=""
                  aria-hidden="true"
                  style={{ display: "block", objectFit: "contain", height: "auto", width: "420px", maxWidth: "100%", transform: "scaleX(-1)" }}
                />
              </div>
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
                    body: "Kandidatprogram med fokus på generativ AI, digital transformation og menneskelig interaktion med teknologi. Speciale i co-design og brugerinddragelse.",
                  },
                  {
                    no: "02",
                    title: "Professionsbachelor · Medie- og sonokommunikation",
                    meta: "Sonic College · 2016",
                    body: "Tværfaglig uddannelse i kommunikation, medieproduktion og digital formidling med stærkt praktisk fundament.",
                  },
                  {
                    no: "03",
                    title: "Sociologi & Kulturanalyse",
                    meta: "Syddansk Universitet · 2011",
                    body: "Analytisk fundament i samfund, kultur og menneskelig adfærd.",
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
                        {e.body && (
                          e.no === "03" ? (
                            <p className="leading-snug" style={{ marginTop: 8, fontSize: "0.95rem", fontStyle: "italic", color: "rgba(255,255,255,0.7)" }}>{e.body}</p>
                          ) : (
                            <p className="mt-2 text-sm md:text-[0.95rem] text-cream/80 leading-snug">{e.body}</p>
                          )
                        )}
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
                      "Ti år med UX research, servicedesign og digitale leverancer for organisationer som DR, Amnesty International og Danmarks Naturfredningsforening.",
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
                    title: "Kommunikation",
                    tagline: "Det menneskelige lag",
                    description:
                      "Strategisk kommunikation på tværs af organisationer og målgrupper. Evnen til at oversætte det svære til noget der faktisk rammer.",
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
                  {
                    title: "Kreativitet",
                    tagline: "Det kreative lag",
                    description:
                      "Med en baggrund i medieproduktion, musik og ledelse af kreative projekter har det kreative lag formet evnen til at tænke uden for det åbenlyse — og finde løsninger der ikke lå i problemformuleringen.",
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
          <section id="kontakt" className="py-16 md:py-20 relative overflow-hidden" style={{ backgroundColor: "#0D1B2A" }}>
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-10" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.18), rgba(0,0,0,0))" }} />
            <div className="px-12 md:px-14 relative">
              
              <h2 className="font-display text-5xl md:text-7xl mt-6 leading-[0.95] tracking-tight">
                Lad os <span className="italic text-ember">tales ved</span>
              </h2>
              <div className="mt-8">
                <p className="max-w-xl text-cream/70 text-lg italic font-display">
                  Jeg er altid interesseret i nye samarbejder — store som små, kommercielle som offentlige.
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
                  href="/cv"
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
      <footer className="w-full max-w-full lg:w-[60%] lg:max-w-[60%] py-10 relative z-10 overflow-x-hidden" style={{ backgroundColor: "#0D1B2A", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="px-12 md:px-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-sm text-cream/55">
          <p>Jonas K.P. Sørensen · IT-konsulent · UX & Servicedesign · Aarhus</p>
          <p>© {new Date().getFullYear()}</p>
        </div>
      </footer>
    </main>
  );
}

const FILTERS = [
  "Alle",
  "UX Research",
  "Servicedesign",
  "Generativ AI",
  "Strategisk kommunikation",
  "Konceptudvikling",
  "Forretningsudvikling",
  "Brandudvikling",
  "Sideløbende projekt",
] as const;

type Filter = (typeof FILTERS)[number];

const CASE_META: Record<string, { headline: string; tags: string[] }> = {
  wolt: {
    headline: "Fra usynlig algoritme til informeret bud",
    tags: ["UX Research", "Servicedesign", "Konceptudvikling"],
  },
  boliga: {
    headline: "Reduceret kompleksitet i boligsøgning",
    tags: ["UX Research", "Servicedesign"],
  },
  "itu-designlab": {
    headline: "Generativ AI som brobygger mellem minder og mennesker",
    tags: ["Generativ AI", "UX Research", "Konceptudvikling"],
  },
  "interaktiv-horesimulering": {
    headline: "Når teknologi ikke er svaret — men mennesket er",
    tags: ["UX Research", "Konceptudvikling"],
  },
  "danmarks-radio": {
    headline: "Digitale og lydbaserede formater",
    tags: ["Strategisk kommunikation", "Konceptudvikling"],
  },
  "amnesty-international": {
    headline: "Følsomme emner — skarp formidling",
    tags: ["Strategisk kommunikation"],
  },
  "danmarks-naturfredningsforening": {
    headline: "Bæredygtighed og brandudvikling",
    tags: ["Strategisk kommunikation", "Brandudvikling"],
  },
  "ulla-dyrlov": {
    headline: "Koncept og platform fra bunden",
    tags: ["Brandudvikling", "Konceptudvikling"],
  },
  "concerto-copenhagen": {
    headline: "Kulturel relevans på tværs af generationer",
    tags: ["Strategisk kommunikation", "Konceptudvikling"],
  },
  "art-spirit-coaching": {
    headline: "Brand og koncept fra idé til lancering",
    tags: ["Brandudvikling", "Konceptudvikling", "Forretningsudvikling"],
  },
  "musikfaellesskabet-i-nye": {
    headline: "En borgerdrevet musikskole",
    tags: ["Sideløbende projekt", "Konceptudvikling"],
  },
  "lydboger-til-born-med-adhd": {
    headline: "Når formatet ikke passer — design af auditiv fordybelse til børn med ADHD",
    tags: ["Sideløbende projekt", "Konceptudvikling"],
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
              ? "p-5 max-[428px]:p-4 flex flex-col gap-3 max-[428px]:gap-2 flex-1 min-w-0"
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
                "group relative flex flex-col text-left rounded-lg border border-cream/10 bg-navy/30 hover:bg-[rgba(255,255,255,0.04)] overflow-hidden transition-all duration-300 ease-out hover:-translate-y-[3px] " +
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
                  {c.slug === "musikfaellesskabet-i-nye" ? (
                    "Sideløbende projekt · " + c.client
                  ) : c.slug === "danmarks-naturfredningsforening" ? (
                    <>
                      <span className="sm:hidden">Danmarks Naturfrednings-forening</span>
                      <span className="hidden sm:inline">{c.client}</span>
                    </>
                  ) : (
                    c.client
                  )}
                </span>
                <h3
                  className={"font-display font-bold text-cream leading-snug " + headlineSize}
                  style={{ fontSize: 18 }}
                >
                  {c.slug === "interaktiv-horesimulering" ? (
                    <>
                      <span className="sm:hidden">Når teknologi ikke er svaret</span>
                      <span className="hidden sm:inline">{meta?.headline ?? c.title}</span>
                    </>
                  ) : c.slug === "danmarks-radio" ? (
                    <>
                      <span className="sm:hidden">Digitale formater · DR</span>
                      <span className="hidden sm:inline">{meta?.headline ?? c.title}</span>
                    </>
                  ) : (
                    meta?.headline ?? c.title
                  )}
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
                    className="mt-auto pt-2 self-start sm:self-end inline-flex items-center gap-1.5 text-[10px] tracking-[0.15em] uppercase text-cream font-semibold md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100 md:hover:!text-[#B83A20] transition-[opacity,color] duration-[400ms] md:hover:duration-300 ease-out"
                  >
                    <MousePointerClick className="w-3.5 h-3.5" strokeWidth={1.75} />
                    Se case
                  </span>
                )}
                {variant === "slider" && (
                  <span
                    aria-hidden
                    className="sm:hidden self-center mt-3 text-cream/45 font-mono tabular-nums text-[9px] tracking-[0.1em] pointer-events-none"
                  >
                    {index + 1} / {total}
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
                <div className="hidden sm:flex px-12 md:px-14 mt-4 items-center gap-6">
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
  "interaktiv-horesimulering": "Når teknologi ikke er svaret — men mennesket er",
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
