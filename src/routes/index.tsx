import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { SlidersHorizontal, X, MousePointerClick, Search, GitBranch, MessageCircle, RotateCw, ArrowDown } from "lucide-react";
import { caseStudies, type CaseStudy } from "@/data/cases";
import caseWoltVideo from "@/assets/case-wolt.mp4?url";

import { CaseModal } from "@/components/CaseModal";
import { CaseVideo } from "@/components/CaseVideo";
import { BackgroundVideoSlideshow } from "@/components/BackgroundVideoSlideshow";
import profilePhoto from "@/assets/profile-photo.png";
import chimpSuit from "@/assets/chimp-suit-map.png";
import kompetence01Bg from "@/assets/kompetence-01-ux-research.jpg";
import kompetence02Bg from "@/assets/kompetence-02-servicedesign.jpg";
import kompetence03Bg from "@/assets/kompetence-03-formidling.jpg";
import { SiteLogo } from "@/components/SiteLogo";
import { MenuIcon } from "@/components/MenuIcon";
import { useIsMobile } from "@/hooks/use-mobile";


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
          "Jeg omsætter menneskelig indsigt til forandring der mærkes. Selvstændig siden 2016.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://jkps.dk/og-image.png?v=2" },
      { property: "og:url", content: "https://jkps.dk/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Jonas K.P. Sørensen — Digital konsulent" },
      {
        name: "twitter:description",
        content:
          "Jeg omsætter menneskelig indsigt til forandring der mærkes. Selvstændig siden 2016.",
      },
      { name: "twitter:image", content: "https://jkps.dk/og-image.png?v=2" },
    ],
    links: [
      { rel: "preload", as: "video", href: caseWoltVideo, type: "video/mp4" },
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
        style={{ fontSize: "clamp(0.95rem, 1.6vw, 1.35rem)", fontWeight: 600, letterSpacing: "0.18em" }}
      >
        {children}
      </span>
      <span aria-hidden className="mt-2 block h-[2px] w-1/2 bg-[#B83A20]" />
    </span>
  );
}

function SectionDivider() {
  return (
    <div aria-hidden="true" className="flex justify-center py-8 md:py-12">
      <span className="block h-px w-24 md:w-32 bg-cream/20" />
    </div>
  );
}


function Sidebar() {
  return (
    <aside className="hero-sidebar relative w-full min-w-0 max-w-full flex flex-col lg:overflow-y-auto lg:fixed lg:top-0 lg:right-0 lg:w-[40%] lg:h-screen px-6 md:px-14 lg:px-16 py-[40px] md:py-20 lg:py-10 border-b lg:border-b-0 lg:border-l border-cream/10 order-1 lg:order-last bg-[#0D1B2A] lg:z-20 lg:rounded-l-xl lg:shadow-[-8px_0_24px_rgba(0,0,0,0.25)] text-center items-center gap-8 lg:gap-6">
      <div className="w-full flex flex-col items-center gap-8 lg:gap-6 lg:pt-12">
        
        <div className="w-full flex flex-col gap-3 lg:gap-4 items-center text-center">
          <h1 className="font-display tracking-[-0.02em] font-medium text-center px-2 flex flex-col items-center leading-none mt-12 lg:mt-0 mb-4">
            <span className="block whitespace-nowrap text-[3rem] md:text-[4.5rem] leading-none" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>Jonas K.P.</span>
            <span className="block whitespace-nowrap text-[3rem] md:text-[4.5rem] leading-none -mt-[0.08em]" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>Sørensen</span>
          </h1>
          <p
            className="uppercase text-cream/55 mt-1 mb-6 mx-auto"
            style={{
              fontSize: "0.85rem",
              letterSpacing: "0.24em",
              lineHeight: 1.8,
              maxWidth: "26ch",
              wordBreak: "keep-all",
              overflowWrap: "break-word",
              textAlign: "center",
            }}
          >
            <span className="block">Digital konsulent</span>
            <span className="block">UX Research &amp; Servicedesign</span>
          </p>
        </div>

        <div
          className="overflow-hidden mx-auto block aspect-square my-8"
          style={{ width: "clamp(8rem, 52%, 12.5rem)", borderRadius: "0" }}
        >
          <img src={profilePhoto} alt="Jonas K.P. Sørensen" className="w-full h-full object-cover" />
        </div>


        <div className="flex flex-col items-center gap-5 w-full text-center mt-12">
          {/* Hairline divider */}
          <span
            aria-hidden
            className="block h-px w-10"
            style={{ backgroundColor: "rgba(192,40,30,0.15)" }}
          />

          {/* Primary CTA */}
          <Link
            to="/cv"
            className="group inline-flex items-center gap-4 font-display uppercase tracking-[0.18em] text-[0.78rem] bg-[#C0281E] text-cream border border-[#C0281E] transition-all duration-150 ease-out hover:bg-transparent hover:text-cream"
            style={{ borderRadius: 0, padding: "14px 24px", width: "fit-content" }}
          >
            <span>Download CV (PDF)</span>
            <span
              aria-hidden
              className="text-cream transition-transform duration-150 ease-out group-hover:translate-y-[2px]"
            >
              ↓
            </span>
          </Link>


          {/* Secondary CTA */}
          <a
            href="#kontakt"
            className="group inline-flex items-center gap-2 font-display text-cream text-[0.95rem] transition-colors duration-200 ease-out hover:text-[#C0281E]"
          >
            <span className="text-[#C0281E]">—</span>
            <span>Kontakt mig</span>
            <span
              aria-hidden
              className="text-[#C0281E] transition-transform duration-200 ease-out group-hover:translate-x-1"
            >
              →
            </span>
          </a>

          {/* Social proof — tidligere kunder */}
          <div className="flex flex-col items-center gap-2 mt-6">
            <span
              aria-hidden
              className="block h-px w-10"
              style={{ backgroundColor: "rgba(229,225,216,0.15)" }}
            />
            <p
              className="uppercase text-cream/45 mt-1"
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.24em",
              }}
            >
              Tidligere samarbejder
            </p>
            <p
              className="text-cream/75 text-center"
              style={{
                fontSize: "0.82rem",
                lineHeight: 1.7,
                maxWidth: "28ch",
              }}
            >
              DR · Wolt · Amnesty · Boliga
              <br />
              Danmarks Naturfredningsforening
            </p>
          </div>
        </div>



      </div>
    </aside>
  );
}

const OM_MIG_ROTATING_PHRASES: { text: string; boldWord: string; color: string }[] = [
  { text: "forandring der mærkes", boldWord: "mærkes", color: "#60A5FA" },
  { text: "design med mening", boldWord: "mening", color: "#F59E0B" },
  { text: "koncepter der holder", boldWord: "holder", color: "#A78BFA" },
  { text: "klarhed", boldWord: "klarhed", color: "#34D399" },
  { text: "mod til at ændre", boldWord: "ændre", color: "#FB923C" },
  { text: "fortællinger der huskes", boldWord: "huskes", color: "#F472B6" },
];

function lerpHex(a: string, b: string, t: number) {
  const pa = [parseInt(a.slice(1, 3), 16), parseInt(a.slice(3, 5), 16), parseInt(a.slice(5, 7), 16)];
  const pb = [parseInt(b.slice(1, 3), 16), parseInt(b.slice(3, 5), 16), parseInt(b.slice(5, 7), 16)];
  const m = pa.map((v, i) => Math.round(v + (pb[i] - v) * t));
  return `rgb(${m[0]}, ${m[1]}, ${m[2]})`;
}

function RotatingPhrase() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">("typing");
  const [cut, setCut] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    const current = OM_MIG_ROTATING_PHRASES[index].text;
    let timeout: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      if (text === current) {
        setPhase("holding");
      } else {
        timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), 35);
      }
    } else if (phase === "holding") {
      timeout = setTimeout(() => {
        setCut(0);
        setPhase("deleting");
      }, 2000);
    } else {
      // delete from both ends simultaneously
      timeout = setTimeout(() => {
        const nextCut = cut + 1;
        if (nextCut * 2 >= current.length) {
          setText("");
          setCut(0);
          setIndex((i) => (i + 1) % OM_MIG_ROTATING_PHRASES.length);
          setPhase("typing");
        } else {
          setText(current.slice(nextCut, current.length - nextCut));
          setCut(nextCut);
        }
      }, 25);
    }
    return () => clearTimeout(timeout);
  }, [text, phase, index, cut, isMobile]);
  const n = OM_MIG_ROTATING_PHRASES.length;
  const current = OM_MIG_ROTATING_PHRASES[index];
  const prev = OM_MIG_ROTATING_PHRASES[(index - 1 + n) % n];
  const next = OM_MIG_ROTATING_PHRASES[(index + 1) % n];
  const total = current.text.length || 1;
  const progress =
    phase === "deleting"
      ? Math.max(0, (total - cut * 2) / total)
      : Math.min(1, text.length / total);
  const color =
    phase === "deleting"
      ? lerpHex(current.color, next.color, 1 - progress)
      : lerpHex(prev.color, current.color, progress);
  function renderTextWithBold(t: string, bold: string) {
    const idx = t.indexOf(bold);
    if (idx !== -1) {
      return (
        <>
          {t.slice(0, idx)}
          <strong style={{ fontWeight: 900 }}>{bold}</strong>
          {t.slice(idx + bold.length)}
        </>
      );
    }
    for (let i = bold.length - 1; i > 0; i--) {
      const prefix = bold.slice(0, i);
      if (t.endsWith(prefix)) {
        return (
          <>
            {t.slice(0, -prefix.length)}
            <strong style={{ fontWeight: 900 }}>{prefix}</strong>
          </>
        );
      }
    }
    return <>{t}</>;
  }

  return (
    <span style={{ fontStyle: "italic", color }}>
      <span>»</span>
      {renderTextWithBold(text, current.boldWord)}
      <span>«</span>
    </span>
  );
}





function MobileHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById("hero-video");
      const threshold = el ? el.offsetHeight : 0;
      setScrolled(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  const navBg = scrolled ? "#0A1628" : "transparent";
  const navBorder = scrolled ? "1px solid rgba(0,0,0,0.08)" : "1px solid transparent";
  return (
    <>
      {/* Mobile header (<768px) — unchanged */}
      <nav className="flex md:hidden" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, backgroundColor: navBg, height: 72, padding: "0 24px", alignItems: "center", justifyContent: "space-between", borderBottom: navBorder, transition: "background-color 0.3s ease, border-color 0.3s ease" }}>
        <div>
          <SiteLogo color="#F5F3EE" lineColor="#C0281E" lineOpacity={1} onClick={scrollToTop} />
        </div>
        <button type="button" aria-label="Åbn menu" onClick={() => setOpen(true)} style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer", display: "inline-flex", color: "#F5F3EE" }}>
          <MenuIcon color="#F5F3EE" />
        </button>
      </nav>

      {/* Tablet header (768–1024px) — cream bg, dark links, nav visible */}
      <nav
        className="hidden md:flex lg:hidden"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: 80,
          padding: "0 32px",
          backgroundColor: navBg,
          alignItems: "center",
          gap: 32,
          borderBottom: navBorder,
          transition: "background-color 0.3s ease, border-color 0.3s ease",
        }}
      >
        <SiteLogo color="#F5F3EE" lineColor="#C0281E" lineOpacity={1} size={44} onClick={scrollToTop} />
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {[
            { label: "Cases", href: "/#cases" },
            { label: "Ekspertise", href: "/#kompetencer" },
            { label: "Tilgang", href: "/tilgang" },
            { label: "Transformation", href: "/transformation" },
            { label: "Kontakt", href: "/#kontakt" },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="tablet-nav-link"
              style={{
                fontFamily: "serif",
                fontSize: "0.9rem",
                fontWeight: 600,
                color: "#F5F3EE",
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
      <style>{`.tablet-nav-link:hover { color: #C0281E !important; }`}</style>

      {/* Desktop header — spans only content column (stops where hero sidebar begins) */}
      <nav
        className="hidden lg:flex"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "60%",
          zIndex: 100,
          height: 80,
          padding: "0 64px",
          backgroundColor: navBg,
          alignItems: "center",
          gap: 32,
          transition: "background-color 0.3s ease",
        }}
      >
        <SiteLogo color="#F5F3EE" lineColor="#C0281E" lineOpacity={1} size={48} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} />
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {[
            { label: "Cases", href: "/#cases" },
            { label: "Ekspertise", href: "/#kompetencer" },
            { label: "Tilgang", href: "/tilgang" },
            { label: "Transformation", href: "/transformation" },
            { label: "Kontakt", href: "/#kontakt" },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="desktop-nav-link"
              style={{
                fontFamily: "serif",
                fontSize: "0.9rem",
                fontWeight: 600,
                color: "#F5F3EE",
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
          <Link to="/tilgang" onClick={() => setOpen(false)} style={{ fontFamily: "serif", fontSize: "1.8rem", color: "#0A1628", textDecoration: "none" }}>Tilgang</Link>
          <Link to="/transformation" onClick={() => setOpen(false)} style={{ fontFamily: "serif", fontSize: "1.8rem", color: "#0A1628", textDecoration: "none" }}>Transformation</Link>
          <Link to="/cv" onClick={() => setOpen(false)} style={{ fontFamily: "serif", fontSize: "1.8rem", color: "#0A1628", textDecoration: "none" }}>CV</Link>
          <a href="#kontakt" onClick={() => setOpen(false)} style={{ fontFamily: "serif", fontSize: "1.8rem", color: "#0A1628", textDecoration: "none" }}>Kontakt</a>
        </div>
      )}
    </>
  );
}

const PARADOX_LINE_1_PREFIX = "// ";
const PARADOX_LINE_1_TITLE = "The Ai paradox:";
const PARADOX_LINE_2 = '"Too much Artificial!"';
const PARADOX_LINE_3_PREFIX = "// Not enough ";
const PARADOX_LINE_3_WORD = "intelligence";
const PARADOX_LINE_3_SUFFIX = "...";

const TW_CURSOR_CSS = `
.tw-cursor { display: inline-block; width: 0.6ch; margin-left: 1px; color: #F5F0E8; animation: tw-blink 1s steps(2, start) infinite; }
.tw-cursor.is-typing { animation: none; opacity: 1; }
@keyframes tw-blink { to { visibility: hidden; } }
.tw-shell {
  position: relative;
  width: 100%;
  max-width: 720px;
  height: 361px;
  min-height: 361px;
  overflow: hidden;
  overflow-anchor: none;
  contain: strict;
}
.tw-window {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  overflow-anchor: none;
  contain: strict;
}
.tw-titlebar {
  flex: 0 0 41px;
  height: 41px;
}
.tw-content {
  flex: 0 0 320px;
  height: 320px;
  min-height: 320px;
  max-height: 320px;
  overflow: hidden;
  overflow-anchor: none;
  contain: strict;
}
.tw-desktop-static { display: none; }
.tw-mobile-animated { display: block; }
@media (min-width: 1024px) {
  .tw-shell { height: 381px; min-height: 381px; }
  .tw-content {
    flex-basis: 340px;
    height: 340px;
    min-height: 340px;
    max-height: 340px;
  }
  .tw-desktop-static { display: none; }
  .tw-mobile-animated { display: block; }
}
@media (max-width: 768px) {
  .tw-shell { height: 301px; min-height: 301px; }
  .tw-content {
    flex-basis: 260px;
    height: 260px;
    min-height: 260px;
    max-height: 260px;
    padding: 24px 18px 28px !important;
  }
  .tw-line-1, .tw-line-3 { font-size: 11px !important; letter-spacing: 0.02em !important; }
  .tw-line-2 { font-size: 1.4rem !important; padding: 8px 0 !important; }
}
`;

function CodeParadoxBlock() {
  const line1Ref = useRef<HTMLDivElement>(null);
  const line1PrefixRef = useRef<HTMLSpanElement>(null);
  const line1TitleRef = useRef<HTMLSpanElement>(null);
  const line2StringRef = useRef<HTMLSpanElement>(null);
  const line2CursorRef = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const line3PrefixRef = useRef<HTMLSpanElement>(null);
  const line3WordRef = useRef<HTMLSpanElement>(null);
  const line3SuffixRef = useRef<HTMLSpanElement>(null);
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
    const cursor = line1CursorRef.current?.querySelector<HTMLSpanElement>(".tw-cursor");
    if (!cursor) return;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    if (reduceMotion) {
      cursor.remove();
      if (line1PrefixRef.current) line1PrefixRef.current.textContent = PARADOX_LINE_1_PREFIX;
      if (line1TitleRef.current) line1TitleRef.current.textContent = PARADOX_LINE_1_TITLE;
      if (line2StringRef.current) line2StringRef.current.textContent = PARADOX_LINE_2;
      if (line3PrefixRef.current) line3PrefixRef.current.textContent = PARADOX_LINE_3_PREFIX;
      if (line3WordRef.current) line3WordRef.current.textContent = PARADOX_LINE_3_WORD;
      if (line3SuffixRef.current) line3SuffixRef.current.textContent = PARADOX_LINE_3_SUFFIX;
      return;
    }
    cursor.style.opacity = "0";
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
    pushTyping("l1p", PARADOX_LINE_1_PREFIX);
    pushTyping("l1t", PARADOX_LINE_1_TITLE);
    if (steps.length) steps[steps.length - 1].delay += 400;
    pushTyping("l2s", PARADOX_LINE_2);
    if (steps.length) steps[steps.length - 1].delay += 400;
    // Natural typo: write "intellegence" (common misspelling), pause, backspace to "intell", then type correctly.
    const STEM = "// Not enough intell";
    const WRONG_TAIL = "egence";  // forms "intellegence"
    const RIGHT_TAIL = "igence...";
    // 1) Type stem + wrong tail
    for (let c = 1; c <= STEM.length; c++) {
      steps.push({ target: "l3", text: STEM.slice(0, c), delay: charDelay() });
    }
    for (let k = 1; k <= WRONG_TAIL.length; k++) {
      steps.push({ target: "l3", text: STEM + WRONG_TAIL.slice(0, k), delay: charDelay() });
    }
    // 2) Long human "wait, that's wrong" pause
    steps[steps.length - 1].delay += 900;
    // 3) Backspace with slight acceleration (140ms → 90ms)
    const delLen = WRONG_TAIL.length;
    for (let k = delLen - 1; k >= 0; k--) {
      const t = (delLen - 1 - k) / Math.max(1, delLen - 1);
      const delDelay = 140 - t * 50;
      steps.push({ target: "l3", text: STEM + WRONG_TAIL.slice(0, k), delay: delDelay });
    }
    // 4) Brief thinking pause before correction
    steps[steps.length - 1].delay += 280;
    // 5) Type correct ending
    for (let k = 1; k <= RIGHT_TAIL.length; k++) {
      steps.push({ target: "l3", text: STEM + RIGHT_TAIL.slice(0, k), delay: charDelay() });
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
        case "l3": {
          const PRE = "// Not enough ";
          const WORD_LEN = "intelligence".length;
          const t = s.text;
          const prefixText = t.slice(0, Math.min(t.length, PRE.length));
          const wordText = t.length > PRE.length ? t.slice(PRE.length, PRE.length + WORD_LEN) : "";
          const suffixText = t.length > PRE.length + WORD_LEN ? t.slice(PRE.length + WORD_LEN) : "";
          if (line3PrefixRef.current) line3PrefixRef.current.textContent = prefixText;
          if (line3WordRef.current) line3WordRef.current.textContent = wordText;
          if (line3SuffixRef.current) line3SuffixRef.current.textContent = suffixText;
          if (line3CursorRef.current) placeCursor(line3CursorRef.current, Math.max(60, s.delay - 20));
          return;
        }
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
        const fadeT = setTimeout(() => {
          cursor.style.transition = "opacity 800ms ease-out";
          cursor.style.opacity = "0";
          const removeT = setTimeout(() => {
            cursor.remove();
          }, 850);
          timeouts.push(removeT);
        }, 3000);
        timeouts.push(fadeT);
      }
    };
    const start = () => {
      if (started) return;
      started = true;
      cursor.style.opacity = "1";
      const beginT = setTimeout(() => {
        nextAt = performance.now();
        rafId = requestAnimationFrame(tick);
      }, 800);
      timeouts.push(beginT);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            start();
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(section);

    return () => {
      cancelled = true;
      observer.disconnect();
      cancelAnimationFrame(rafId);
      timeouts.forEach(clearTimeout);
    };
  }, []);

  const monoFamily =
    "'VT323', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace";

  return (
    <section
      ref={sectionRef}
      aria-label="The AI paradox"
      className="w-full flex flex-col items-center"
      style={{ padding: "140px 48px 96px", background: "transparent" }}
    >
      <style dangerouslySetInnerHTML={{ __html: TW_CURSOR_CSS }} />
      <div className="tw-shell">
        <div
          ref={windowRef}
          className="tw-window"
          style={{
            width: "100%",
            maxWidth: "720px",
            background: "rgba(0,0,0,0.25)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "6px",
            textAlign: "left",
            overflow: "hidden",
          }}
        >
        {/* Subtle window tab — filename only, no traffic lights */}
        <div
          aria-hidden="true"
          className="tw-titlebar"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 18px",
            background: "rgba(0,0,0,0.35)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            fontFamily: monoFamily,
            fontSize: "12px",
            letterSpacing: "0.05em",
            color: "rgba(255,255,255,0.4)",
            textTransform: "uppercase",
          }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#FF5F57", display: "inline-block" }} />
            <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#FFBD2E", display: "inline-block" }} />
            <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#28C840", display: "inline-block" }} />
          </span>
          <span>paradox.md</span>
        </div>
        <div
          className="tw-content"
          style={{
            padding: "32px 28px 36px",
            lineHeight: 1.5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "8px",
            position: "relative",
          }}
        >
          <div className="tw-desktop-static" aria-hidden="true" style={{ width: "100%" }}>
            <div
              className="tw-line tw-line-1"
              style={{
                display: "flex",
                alignItems: "baseline",
                flexWrap: "nowrap",
                fontFamily: monoFamily,
                fontSize: "clamp(18px, 2.6vw, 28px)",
                letterSpacing: "0.04em",
                lineHeight: 1.6,
                whiteSpace: "nowrap",
                textTransform: "uppercase",
              }}
            >
              <span style={{ color: "rgba(255,255,255,0.45)", whiteSpace: "pre" }}>{PARADOX_LINE_1_PREFIX}</span>
              <span style={{ color: "rgba(255,255,255,0.75)", fontWeight: 500, whiteSpace: "pre" }}>{PARADOX_LINE_1_TITLE}</span>
            </div>
            <div
              className="tw-line tw-line-2"
              style={{
                fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
                fontSize: "clamp(1.85rem, 5.8vw, 3.75rem)",
                fontStyle: "italic",
                fontWeight: 500,
                lineHeight: 1.15,
                color: "#FFFFFF",
                padding: "12px 0",
                whiteSpace: "normal",
                maxWidth: "100%",
                overflowWrap: "break-word",
              }}
            >
              <span style={{ whiteSpace: "pre-wrap" }}>{PARADOX_LINE_2}</span>
            </div>
            <div
              className="tw-line tw-line-3"
              style={{
                fontFamily: monoFamily,
                fontSize: "clamp(18px, 2.6vw, 28px)",
                letterSpacing: "0.04em",
                lineHeight: 1.6,
                whiteSpace: "nowrap",
                textTransform: "uppercase",
              }}
            >
              <span style={{ color: "rgba(255,255,255,0.45)", whiteSpace: "pre" }}>{PARADOX_LINE_3_PREFIX}</span>
              <span style={{ color: "#C0281E", whiteSpace: "pre" }}>{PARADOX_LINE_3_WORD}</span>
              <span style={{ color: "rgba(255,255,255,0.45)", whiteSpace: "pre" }}>{PARADOX_LINE_3_SUFFIX}</span>
            </div>
          </div>

          <div className="tw-mobile-animated" style={{ width: "100%" }}>
            <div
              ref={line1Ref}
              className="tw-line tw-line-1"
              style={{
                display: "flex",
                alignItems: "baseline",
                flexWrap: "nowrap",
                fontFamily: monoFamily,
                fontSize: "clamp(18px, 2.6vw, 28px)",
                letterSpacing: "0.04em",
                lineHeight: 1.6,
                whiteSpace: "nowrap",
                textTransform: "uppercase",
              }}
            >
              <span ref={line1PrefixRef} style={{ color: "rgba(255,255,255,0.45)", whiteSpace: "pre" }} />
              <span ref={line1TitleRef} style={{ color: "rgba(255,255,255,0.75)", fontWeight: 500, whiteSpace: "pre" }} />
              <span ref={line1CursorRef}><span aria-hidden="true" className="tw-cursor">|</span></span>
            </div>
            <div
              className="tw-line tw-line-2"
              style={{
                fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
                fontSize: "clamp(1.85rem, 5.8vw, 3.75rem)",
                fontStyle: "italic",
                fontWeight: 500,
                lineHeight: 1.15,
                color: "#FFFFFF",
                padding: "12px 0",
                whiteSpace: "normal",
                maxWidth: "100%",
                overflowWrap: "break-word",
              }}
            >
              <span ref={line2StringRef} style={{ whiteSpace: "pre-wrap" }} />
              <span ref={line2CursorRef} />
            </div>
            <div
              ref={line3Ref}
              className="tw-line tw-line-3"
              style={{
                fontFamily: monoFamily,
                fontSize: "clamp(18px, 2.6vw, 28px)",
                letterSpacing: "0.04em",
                lineHeight: 1.6,
                whiteSpace: "nowrap",
                textTransform: "uppercase",
              }}
            >
              <span ref={line3PrefixRef} style={{ color: "rgba(255,255,255,0.45)", whiteSpace: "pre" }} />
              <span ref={line3WordRef} style={{ color: "#C0281E", whiteSpace: "pre" }} />
              <span ref={line3SuffixRef} style={{ color: "rgba(255,255,255,0.45)", whiteSpace: "pre" }} />
              <span ref={line3CursorRef} />
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}

function DigitalTransformationSection() {
  return (
    <section
      style={{
        backgroundColor: "#0D1B2A",
        padding: "40px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ maxWidth: "720px", width: "100%" }}>
        <h2
          style={{
            color: "#ffffff",
            fontSize: "clamp(1.75rem, 2.8vw, 2.4rem)",
            lineHeight: 1.1,

            maxWidth: "680px",
            marginTop: 0,
            marginBottom: 0,
            marginLeft: "auto",
            marginRight: "auto",
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          Værktøjerne er nye.
          <br />
          <span style={{ fontStyle: "italic", color: "#E5E1D8", opacity: 0.75, fontSize: "0.88em", fontWeight: 400 }}>Problematikken er gammel.</span>
        </h2>



        <p
          style={{
            color: "#E5E1D8",
            fontSize: "1.1rem",
            lineHeight: 1.7,
            maxWidth: "580px",
            marginTop: "24px",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: 0,
            textAlign: "center",
          }}
        >
          Måden vi søger, kommunikerer og træffer beslutninger på forandrer sig hurtigere, end vi når at følge med. Men vores behov for at forstå, vælge og handle er den samme som altid. Det er der design begynder.
        </p>


      </div>
    </section>
  );
}

function Index() {
  return (
    <main id="top" className="w-full min-w-0 max-w-full overflow-x-clip text-cream lg:bg-[#0D1B2A]">
      <MobileHeader />
      <div className="w-full min-w-0 max-w-full flex flex-col lg:block">

        {/* LEFT — scrolling content */}
        <div className="w-full min-w-0 max-w-full lg:max-w-[60%] lg:w-[60%] order-2 lg:order-none bg-navy-deep lg:mr-[40%]">
          {/* TYPEWRITER INTRO */}
          <section
            id="hero-video"
            className="flex flex-col justify-center items-stretch relative isolate overflow-visible min-h-[360px] sm:min-h-[420px] md:min-h-[480px] py-16 sm:py-20 md:py-24"
            style={{
              backgroundColor: "#0A1628",
            }}
          >
            <BackgroundVideoSlideshow />
            <div className="px-8 sm:px-12 md:px-14 lg:pr-4 relative w-full lg:max-w-none" style={{ zIndex: 1 }}>
              <p className="text-left relative hero-headline" style={{ color: "#FFFFFF", lineHeight: 1.15, fontWeight: 700, fontSize: "clamp(1.5rem, 6vw, 3.5rem)" }}>
                <span className="block">Jeg omsætter<br /><span className="hero-line-2">menneskelig <span className="max-md:whitespace-nowrap">indsigt til:</span></span></span>
                <span className="block overflow-visible hero-rotating" style={{ fontSize: "clamp(1.1rem, 5vw, 3.75rem)", fontStyle: "italic", fontWeight: 700, lineHeight: 1.15, whiteSpace: "nowrap", overflowAnchor: "none", contain: "layout style", minHeight: "1.15em" }}>
                  <RotatingPhrase />
                </span>
              </p>
            </div>
            <style>{`
              .hero-headline, .hero-headline * { overflow-anchor: none; }
              @media (min-width: 1024px) {
                .hero-headline { font-size: clamp(1.75rem, 3.2vw, 3rem) !important; }
                .hero-headline .hero-rotating { font-size: clamp(1.5rem, 3vw, 3rem) !important; }
                .hero-headline .hero-line-2 { white-space: nowrap; display: inline-block; }
              }
            `}</style>
          </section>
          <DigitalTransformationSection />

          {/* PORTRÆT */}
          <section id="om" className="pt-20 md:pt-28 pb-8 md:pb-10">

            <div className="px-12 md:px-14">
              <div className="max-w-3xl space-y-6">

                <p style={{ color: "white", opacity: 1, fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "1.5rem", lineHeight: 1.4 }}>
                  Jeg arbejder med dét, der sker mellem mennesker og systemer. Ikke brugeren — men personen bag beslutningen, vanen og frustrationen.
                </p>

                <p style={{ color: "white", opacity: 0.85, fontSize: "1.1rem", lineHeight: 1.8 }}>
                  UX research, servicedesign og konceptudvikling på tværs af public service, civilsamfund og kommercielle virksomheder. Selvstændig siden 2016.
                </p>
                <p style={{ color: "white", opacity: 0.95, fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "1.25rem", lineHeight: 1.5 }}>
                  Nysgerrig af natur. Seriøs lytter af profession.
                </p>
              </div>
            </div>
          </section>

          {/* FUNDAMENT */}
          <section id="baggrund" className="pt-8 md:pt-10 pb-16 md:pb-20">
            <div className="px-5 md:px-14">
              <div className="mb-6 md:mb-10 text-center">
                
                <h2 className="font-display text-4xl md:text-5xl mt-6 leading-[0.95] tracking-tight">
                  Tre <span className="italic text-ember">søjler.</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 relative md:items-start gap-x-8 md:pt-12">
                {/* Vandret forbindelsesstreg — spænder mellem col 1 og col 3 centre */}
                <div
                  aria-hidden="true"
                  className="hidden md:block absolute pointer-events-none"
                  style={{
                    top: "10px",
                    left: "4%",
                    right: "4%",
                    height: "1px",
                    backgroundColor: "var(--ember)",
                    opacity: 0.7,
                  }}
                />
                {[
                  {
                    title: "Digitalt lag",
                    description:
                      "Ti år med UX research, servicedesign og digital leverance for DR, Amnesty og DN.",
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
                    title: "Menneskeligt lag",
                    description:
                      "Evnen til at oversætte det komplekse til noget, der faktisk rammer.",
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
                    title: "Kreativt lag",
                    description:
                      "Løsninger der ikke lå i problemformuleringen — formet af en baggrund i medieproduktion og musik.",
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
                    className={`flex flex-col items-center md:px-8 ${i > 0 ? "mt-12 md:mt-0" : ""}`}
                  >
                    <div className="w-full max-w-[260px] flex flex-col items-center">
                      {/* Søjle-top: prik + lodret streg, centreret med symbolet */}
                      <div className="hidden md:flex flex-col items-center" aria-hidden="true">
                        <span
                          style={{
                            width: "5px",
                            height: "5px",
                            borderRadius: "9999px",
                            backgroundColor: "var(--ember)",
                            opacity: 0.9,
                            marginTop: "-2px",
                          }}
                        />
                        <span
                          style={{
                            width: "1px",
                            height: "28px",
                            backgroundColor: "var(--ember)",
                            opacity: 0.7,
                          }}
                        />
                      </div>
                      <div className="w-28 h-28 md:w-32 md:h-32 flex items-center justify-center mb-2 md:mb-3 shrink-0 transition-all duration-300 ease-out hover:scale-[1.06] hover:[filter:drop-shadow(0_0_14px_var(--ember))]">
                        {item.icon}
                      </div>
                      <h3 className="font-display text-xl md:text-[1.35rem] tracking-tight leading-snug text-center">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-cream/80 leading-relaxed text-center self-stretch">
                        {item.description}
                      </p>
                    </div>
                  </div>

                ))}
              </div>
            </div>
          </section>

          <SectionDivider />
          {/* CASES */}
          <CasesSection />

          <SectionDivider />
          {/* TILGANG eyebrow */}
          <div className="px-5 md:px-14 pt-16 md:pt-20 pb-6 md:pb-8">
            <Eyebrow>Tilgang</Eyebrow>
          </div>


          {/* MIN TILGANG */}



          <section
            id="tilgang"
            style={{
              backgroundColor: "#EDE8DC",
              backgroundImage: 'url("https://www.transparenttextures.com/patterns/paper.png")',
              backgroundBlendMode: "multiply",
              position: "relative",
              width: "100%",
              maxWidth: "100%",
              overflow: "hidden",
              boxSizing: "border-box",
            }}
            className="py-12 px-6 md:!py-20 md:!px-16"
          >
            <div className="flex flex-col items-center sm:items-center sm:flex-row" style={{ width: "100%" }}>
              {/* RIGHT: image */}
              <div className="w-full sm:w-1/2 flex justify-center sm:justify-end order-2 mt-8 sm:mt-0">
                <div style={{ position: "relative", display: "inline-block" }}>
                  <img
                    src={chimpSuit}
                    alt=""
                    aria-hidden="true"
                    className="w-full md:w-[420px]"
                    style={{ display: "block", objectFit: "contain", height: "auto", maxWidth: "100%", borderRadius: "4px" }}
                  />
                </div>
              </div>

              {/* LEFT: text */}
              <div
                className="w-full sm:w-1/2 text-center sm:text-left order-1"
                style={{ overflow: "visible" }}
              >
                <Link to="/tilgang" style={{ display: "block", textDecoration: "none" }}>
                  <span
                    className="monkey-headline"
                    style={{
                      display: "block",
                      color: "#000000",
                      fontFamily: "serif",
                      fontWeight: 700,
                      lineHeight: 1.1,
                      fontSize: "clamp(2rem, 5vw, 4rem)",
                    }}
                  >
                    Strategien er solid.
                  </span>
                  <span
                    className="monkey-headline"
                    style={{
                      display: "block",
                      color: "#C0281E",
                      fontFamily: "serif",
                      fontStyle: "italic",
                      fontWeight: 700,
                      lineHeight: 1.1,
                      marginTop: "8px",
                      fontSize: "clamp(2rem, 5vw, 4rem)",
                    }}
                  >
                    Forankringen fejler.
                  </span>
                  <span
                    className="hidden sm:inline-block bg-[#C0281E] hover:bg-[#A0201A] transition-colors"
                    style={{
                      marginTop: "40px",
                      color: "#ffffff",
                      fontSize: "1rem",
                      fontStyle: "normal",
                      fontWeight: 600,
                      padding: "16px 40px",
                      borderRadius: "4px",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Tilgang →
                  </span>
                </Link>
              </div>

              {/* Mobile only: Læs mere under the chimp */}
              <div className="w-full flex justify-center order-3 mt-6 sm:hidden">
                <Link
                  to="/tilgang"
                  className="bg-[#C0281E] hover:bg-[#A0201A] transition-colors"
                  style={{
                    color: "#ffffff",
                    fontSize: "1rem",
                    fontStyle: "normal",
                    fontWeight: 600,
                    padding: "16px 40px",
                    borderRadius: "4px",
                    letterSpacing: "0.05em",
                  }}
                >
                  Se min tilgang →
                </Link>
              </div>
            </div>
          </section>

          <CodeParadoxBlock />




          <SectionDivider />
          {/* KOMPETENCER */}
          <section id="kompetencer" className="pt-16 md:pt-20" style={{ paddingBottom: "80px" }}>
            <div className="px-5 md:px-14">
              <div className="mb-10 md:mb-14">
                <Eyebrow>Områder</Eyebrow>
                <h2 className="font-display text-5xl md:text-7xl mt-6 mb-8 leading-[0.95] tracking-tight">
                  Hvad jeg <span className="italic">bringer</span>
                </h2>
              </div>

              <KompetencerList />

            </div>
          </section>

          <SectionDivider />
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
                    className="block mt-3 font-display text-xl md:text-2xl hover:text-ember hover:underline transition-colors"
                  >
                    Find mig på LinkedIn →
                  </a>
                </div>
              </div>

              <div className="mt-16 flex justify-center">
                <a
                  href="/JKPS_CV.pdf#zoom=100"
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
        <div className="px-12 md:px-14 flex flex-col md:flex-row items-center md:items-center justify-between gap-4 text-sm text-cream/55 text-center md:text-left">
          <p>Jonas K.P. Sørensen · Digital konsulent · Aarhus</p>
          <div className="flex items-center gap-4">
            <p>© {new Date().getFullYear()}</p>
            <div className="flex items-center gap-2 text-xs">
              <SiteLogo color="#F5F3EE" lineColor="#C0281E" lineOpacity={1} size={20} />
              <span className="font-light">Made by JKPS</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

const FILTERS = [
  "Alle",
  "Interviews",
  "Feltobservation",
  "Co-design",
  "Brugerrejser",
  "Servicedesign",
  "Konceptudvikling",
  "Strategisk kommunikation",
  "Brandudvikling",
  "Generativ AI",
  "Sideløbende projekt",
] as const;

type Filter = (typeof FILTERS)[number];

const CASE_META: Record<string, { headline: string; tags: string[] }> = {
  wolt: {
    headline: "Fra usynlig algoritme til informeret bud",
    tags: ["Interviews", "Feltobservation", "Co-design", "Servicedesign"],
  },
  boliga: {
    headline: "Den gode start på boligjagten",
    tags: ["Brugerrejser", "Servicedesign", "Konceptudvikling"],
  },
  "itu-designlab": {
    headline: "Når fortiden vækkes til live",
    tags: ["Generativ AI", "Konceptudvikling"],
  },
  "interaktiv-horesimulering": {
    headline: "Social isolation. Teknologien løser lyden. Ikke ensomheden.",
    tags: ["Interviews", "Co-design", "Konceptudvikling"],
  },
  "danmarks-radio": {
    headline: "Redaktionel kvalitet bag Danmarks public service",
    tags: ["Strategisk kommunikation"],
  },
  "amnesty-international": {
    headline: "Når tunge emner finder sin stemme",
    tags: ["Strategisk kommunikation"],
  },
  "danmarks-naturfredningsforening": {
    headline: "Strategisk kommunikation for Danmarks største naturorganisation",
    tags: ["Brandudvikling", "Strategisk kommunikation"],
  },
  "ulla-dyrlov": {
    headline: "Ulla Dyrløv. En TV-psykologs stemme — fra idé til platform.",
    tags: ["Brandudvikling", "Konceptudvikling"],
  },
  "concerto-copenhagen": {
    headline: "Bach remixet for en ny generation",
    tags: ["Strategisk kommunikation", "Konceptudvikling"],
  },
  "art-spirit-coaching": {
    headline: "Brand og platform for en praksis der var før sin tid",
    tags: ["Brandudvikling", "Konceptudvikling"],
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

const CASE_BG_FALLBACK = "#0D1B2A";

function getPreloadIndices(length: number, active: number) {
  if (length <= 0) return [] as number[];
  const indices = new Set<number>([0, active]);
  if (active > 0) indices.add(active - 1);
  if (active < length - 1) indices.add(active + 1);
  return Array.from(indices).filter((index) => index >= 0 && index < length);
}

function sampleDominantColor(src: string) {
  return new Promise<string>((resolve) => {
    if (typeof window === "undefined") {
      resolve(CASE_BG_FALLBACK);
      return;
    }

    const image = new Image();
    image.decoding = "async";
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d", { willReadFrequently: true });

      if (!context) {
        resolve(CASE_BG_FALLBACK);
        return;
      }

      const size = 24;
      canvas.width = size;
      canvas.height = size;
      context.drawImage(image, 0, 0, size, size);

      const { data } = context.getImageData(0, 0, size, size);
      let red = 0;
      let green = 0;
      let blue = 0;
      let totalWeight = 0;

      for (let i = 0; i < data.length; i += 4) {
        const alpha = data[i + 3] / 255;
        if (alpha < 0.05) continue;

        const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
        const saturation = Math.max(data[i], data[i + 1], data[i + 2]) - Math.min(data[i], data[i + 1], data[i + 2]);
        const weight = alpha * (brightness < 24 ? 0.15 : brightness > 236 ? 0.4 : 1) * (saturation < 18 ? 0.85 : 1);

        red += data[i] * weight;
        green += data[i + 1] * weight;
        blue += data[i + 2] * weight;
        totalWeight += weight;
      }

      if (!totalWeight) {
        resolve(CASE_BG_FALLBACK);
        return;
      }

      const normalize = (value: number) => Math.max(18, Math.min(210, Math.round(value / totalWeight)));
      resolve(`rgb(${normalize(red)}, ${normalize(green)}, ${normalize(blue)})`);
    };

    image.onerror = () => resolve(CASE_BG_FALLBACK);
    image.src = src;
  });
}

function CasesSection() {
  const isMobile = useIsMobile();
  const [filter, setFilter] = useState<Filter>("Alle");
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openCase, setOpenCase] = useState<CaseStudy | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [chipPulse, setChipPulse] = useState(false);
  const [cardBackgrounds, setCardBackgrounds] = useState<Record<string, string>>({});
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const filterRef = useRef<HTMLDivElement | null>(null);
  const preloadedMediaRef = useRef(new Set<string>());
  const videoPreloadersRef = useRef<HTMLVideoElement[]>([]);

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

  useEffect(() => {
    const onFilterEvent = (e: Event) => {
      const tag = (e as CustomEvent<string>).detail;
      if (tag && (FILTERS as readonly string[]).includes(tag)) {
        setFilter(tag as Filter);
        setChipPulse(false);
        // restart pulse on next tick
        requestAnimationFrame(() => {
          setChipPulse(true);
          setTimeout(() => setChipPulse(false), 650);
        });
      }
    };
    window.addEventListener("kompetencer:filter", onFilterEvent);
    return () => window.removeEventListener("kompetencer:filter", onFilterEvent);
  }, []);

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

  // Fade carousel cards based on viewport visibility
  useEffect(() => {
    const root = scrollerRef.current;
    if (!root || isGrid) return;
    const cards = Array.from(root.children) as HTMLElement[];
    cards.forEach((el) => {
      el.style.transition = "opacity 0.4s ease-in-out";
    });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const ratio = entry.intersectionRatio;
          // Map ratio: fully visible (>=0.9) => 1, partial => 0.4
          const opacity = 0.4 + 0.6 * Math.min(1, Math.max(0, (ratio - 0.5) / 0.4));
          (entry.target as HTMLElement).style.opacity = String(opacity);
        });
      },
      {
        root,
        threshold: [0, 0.25, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      },
    );
    cards.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [filter, isGrid]);

  const total = filtered.length;
  const displayIndex = hoveredIndex ?? currentIndex;
  const progress = total > 0 ? ((displayIndex + 1) / total) * 100 : 0;
  const primedIndices = new Set(getPreloadIndices(filtered.length, currentIndex));

  useEffect(() => {
    if (isGrid || typeof window === "undefined" || !filtered.length) return;

    getPreloadIndices(filtered.length, currentIndex).forEach((index) => {
      const currentCase = filtered[index];
      if (!currentCase) return;
      const posterSrc = currentCase.poster ?? currentCase.image;

      if (!preloadedMediaRef.current.has(currentCase.image)) {
        const image = new Image();
        image.decoding = "sync";
        image.fetchPriority = "high";
        image.src = currentCase.image;
        preloadedMediaRef.current.add(currentCase.image);
      }

      if (!preloadedMediaRef.current.has(posterSrc)) {
        const posterImage = new Image();
        posterImage.decoding = "sync";
        posterImage.fetchPriority = "high";
        posterImage.src = posterSrc;
        preloadedMediaRef.current.add(posterSrc);
      }

      if (!cardBackgrounds[currentCase.slug]) {
        sampleDominantColor(posterSrc).then((color) => {
          setCardBackgrounds((existing) => {
            if (existing[currentCase.slug]) return existing;
            return { ...existing, [currentCase.slug]: color };
          });
        });
      }

      if (currentCase.video && !preloadedMediaRef.current.has(currentCase.video)) {
        const video = document.createElement("video");
        video.preload = "auto";
        video.muted = true;
        video.playsInline = true;
        video.poster = posterSrc;
        video.src = currentCase.video;
        video.load();
        videoPreloadersRef.current.push(video);
        preloadedMediaRef.current.add(currentCase.video);
      }
    });
  }, [cardBackgrounds, currentIndex, filtered, isGrid]);

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

  const getLastIndex = () => {
    if (!filtered.length) return 0;
    const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;
    return isMobile ? filtered.length - 1 : Math.max(0, filtered.length - 2);
  };

  const showNextCase = () => {
    if (!filtered.length) return;
    const last = getLastIndex();
    const next = currentIndex >= last - 1 ? 0 : currentIndex + 2;
    setCurrentIndex(next);
    scrollToIndex(next);
  };

  const showPreviousCase = () => {
    if (!filtered.length) return;
    const last = getLastIndex();
    const prev = currentIndex <= 1 ? last : currentIndex - 2;
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
          <Eyebrow>Cases</Eyebrow>
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
                    : "border-cream/25 text-cream/85 hover:border-cream/60 hover:text-cream") +
                  (chipPulse ? " filter-chip-pulse" : "")
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
        {filter !== "Alle" && (
          <div className="mt-4 flex items-center gap-2 text-xs text-cream/70">
            <span>Viser cases med:</span>
            <button
              type="button"
              onClick={() => setFilter("Alle")}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cream/30 bg-cream/5 text-cream hover:bg-cream/10 transition-colors"
              aria-label={`Ryd filter ${filter}`}
            >
              <span className="uppercase tracking-wide">{filter}</span>
              <X size={12} strokeWidth={2.25} />
            </button>
          </div>
        )}
      </div>

      {/* Cases view: slider (Alle) or grid (filter) */}
      {(() => {
        const renderCard = (c: (typeof caseStudies)[number], variant: "slider" | "grid", index: number) => {
          const meta = CASE_META[c.slug];
          const cardBackground = cardBackgrounds[c.slug] ?? CASE_BG_FALLBACK;
          const shouldEagerLoad = variant === "slider" && primedIndices.has(index);
          const sizing =
            variant === "slider"
              ? "snap-center sm:snap-start shrink-0 w-[calc(100vw-5rem)] sm:w-[calc((100vw-7.5rem)/2.5)] lg:w-[calc((60vw-7.5rem)/2.5)]"
              : "w-full";
          const imgWrapperClass =
            variant === "slider"
              ? "w-full overflow-hidden bg-navy h-[320px] max-[428px]:h-[260px]"
              : "w-full overflow-hidden bg-navy h-[290px]";
          const bodyPadding =
            variant === "slider"
              ? "px-5 py-6 max-[428px]:p-4 flex flex-col gap-3 max-[428px]:gap-2 flex-1 min-w-0"
              : "p-6 flex flex-col gap-3";
          const clientSize = variant === "slider" ? "max-[428px]:!text-[10px]" : "";
          const headlineSize = variant === "slider" ? "max-[428px]:!text-[15px]" : "";
          const tagSize = variant === "slider" ? "max-[428px]:text-[9px] max-[428px]:px-2 max-[428px]:py-0.5" : "";
          const imgClass =
            variant === "grid"
              ? "block w-full h-full object-cover border-0 outline-none transition-all duration-[400ms] ease-out group-hover:scale-[1.04]"
              : "block w-full h-full object-cover border-0 outline-none transition-all duration-[400ms] ease-out group-hover:scale-[1.04]";
          return (
            <button
              key={c.slug}
              data-case-slug={c.slug}
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
                "group relative flex flex-col text-left rounded-lg overflow-hidden transition-all duration-300 ease-out hover:-translate-y-[3px] hover:bg-[rgba(255,255,255,0.04)] outline-none ring-0 shadow-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 focus:shadow-none focus-visible:shadow-none " +
                "cursor-pointer " +
                sizing
              }
              style={{
                background: "#0D1B2A",
                appearance: "none",
                WebkitAppearance: "none",
                border: 0,
                outline: "none",
                boxShadow: "none",
              }}
            >
              <div className={imgWrapperClass + " relative isolate border-0 outline-none"} style={{ backgroundColor: cardBackground, border: 0, boxShadow: "none", outline: "none", marginBottom: 0 }}>
                {c.video ? (
                  <CaseVideo
                    src={c.video}
                    poster={c.poster ?? c.image}
                    ariaLabel={`${c.client} — ${meta?.headline ?? c.title}`}
                    className={imgClass}
                    preload={variant === "slider" ? "auto" : "metadata"}
                    active={variant === "slider" && index === currentIndex}
                    autoplayInView={isMobile}
                  />
                ) : (
                  <img
                    src={c.image}
                    alt={`${c.client} — ${meta?.headline ?? c.title}`}
                    loading={shouldEagerLoad ? "eager" : "lazy"}
                    decoding={shouldEagerLoad ? "sync" : "async"}
                    fetchPriority={shouldEagerLoad ? "high" : "auto"}
                    className={imgClass}
                  />
                )}
                {c.slug === "danmarks-radio" && (
                  <div
                    aria-hidden
                    style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.12)", zIndex: 1, pointerEvents: "none" }}
                  />
                )}
                {/* gradient overlay — fades image cleanly into card body, no visible seam */}
                <div
                  data-gradient-overlay
                  className="absolute inset-x-0 bottom-0 pointer-events-none"
                  style={{
                    height: "90px",
                    background:
                      "linear-gradient(to top, #0D1B2A 0%, rgba(13,27,42,0) 100%)",
                  }}
                />
                <div
                  aria-hidden
                  data-case-seam-cover
                  className="absolute inset-x-0 pointer-events-none"
                  style={{ bottom: -2, height: 6, backgroundColor: "#0D1B2A" }}
                />
                {/* client name directly on image, above bottom fade */}
                <span
                  data-case-client-label
                  className={"absolute bottom-8 left-3 z-[2] inline-block w-fit text-white uppercase font-extrabold leading-tight " + clientSize}
                  style={{
                    fontFamily: "'Arial Black', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                    fontSize: "0.9rem",
                    letterSpacing: "0.15em",
                    background: "transparent",
                    backgroundColor: "transparent",
                    backgroundImage: "none",
                    boxShadow: "none",
                  }}
                >
                  {c.slug === "musikfaellesskabet-i-nye" ? (
                    "Borgerdrevet fællesskab i Nye"
                  ) : c.slug === "danmarks-naturfredningsforening" ? (
                    <>
                      Danmarks Naturfrednings-<br />forening
                    </>
                  ) : (
                    c.client
                  )}
                </span>
                {c.status === "ongoing" && (
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0D1B2A]/70 backdrop-blur text-[10px] tracking-[0.15em] uppercase text-cream/90 font-semibold outline-none ring-0 shadow-none">
                    <span className="h-1.5 w-1.5 rounded-full bg-ember animate-pulse" />
                    {c.statusLabel ?? "Igangværende"}
                  </span>
                )}
              </div>
              <div className={bodyPadding + " border-0 outline-none"} style={{ border: 0, borderTop: 0, boxShadow: "none", outline: "none", marginTop: 0 }}>
                <h3
                  className={"font-display font-bold text-cream leading-snug min-h-[5rem] " + headlineSize}
                  style={{ fontSize: 18 }}
                >
                  {meta?.headline ?? c.title}
                </h3>
                <p className="text-[12px] text-cream/70 leading-snug italic min-h-[2.6rem]">
                  {c.stat ? <>→ {c.stat}</> : <>&nbsp;</>}
                </p>
                <ul className="mt-3 flex flex-col gap-1.5 text-[11px] uppercase tracking-[0.18em] text-cream/80 leading-relaxed">
                  {(meta?.tags ?? []).map((t) => (
                    <li key={t} className="flex items-baseline gap-2">
                      <span aria-hidden className="text-ember">—</span>
                      <span>{t}</span>
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
                {/* mobile per-card index removed in favor of unified progress bar below */}
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
                    className="cases-carousel flex w-full max-w-full gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth px-4 sm:px-12 md:px-14 sm:scroll-pl-12 md:scroll-pl-14 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                  >
                    {filtered.map((c, i) => renderCard(c, "slider", i))}
                  </div>
                </div>

                {/* Progress indicator */}
                <div className="flex px-12 md:px-14 mt-4 items-center gap-6">
                  <div className="flex-1 h-0.5 bg-cream/8 relative overflow-hidden rounded-full">
                    <div
                      className="absolute inset-y-0 left-0 bg-[#B83A20]/60 transition-[width] duration-300 ease-out rounded-full"
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

const FILTER_SET = new Set<string>(FILTERS as readonly string[]);

function scrollToTagFilter(tag: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("kompetencer:filter", { detail: tag }));
  const section = document.getElementById("cases");
  section?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const flipCards = [
  {
    no: "01",
    eyebrow: "RESEARCH",
    Icon: Search,
    title: "UX Research & Brugerindsigt",
    body: "Jeg oversætter kompleks adfærd til handlebare beslutninger, der peger direkte ind i forretningen.",
    tags: ["Interviews", "Feltobservation", "Co-design"],
    bg: kompetence01Bg,
  },
  {
    no: "02",
    eyebrow: "DESIGN",
    Icon: GitBranch,
    title: "Servicedesign & Konceptudvikling",
    body: "Fra identifikation af problemet til et færdigt koncept der kan eksekveres i den virkelige verden.",
    tags: ["Brugerrejser", "Servicedesign", "Konceptudvikling"],
    bg: kompetence02Bg,
  },
  {
    no: "03",
    eyebrow: "KOMMUNIKATION",
    Icon: MessageCircle,
    title: "Formidling & Kommunikation",
    body: "Komplekse emner gjort konkrete og forståelige for dem der skal handle på dem i hverdagen.",
    tags: ["Strategisk kommunikation", "Brandudvikling", "Konceptudvikling"],
    bg: kompetence03Bg,
  },
];





function KompetencerList() {
  const renderTags = (tags: string[]) => (
    <ul className="flex flex-wrap items-center gap-1.5 justify-start">
      {tags.map((t) => {
        const isFilter = FILTER_SET.has(t);
        const basePill =
          "inline-flex items-center gap-1.5 text-[10px] tracking-wide px-2.5 py-1 rounded-full border leading-tight whitespace-nowrap text-left transition-all duration-150 ease-out";
        if (isFilter) {
          return (
            <li key={t}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  scrollToTagFilter(t);
                }}
                className={
                  basePill +
                  " border-cream/30 text-cream/85 cursor-pointer hover:border-[#C0281E] hover:text-[#C0281E] hover:bg-[#C0281E]/10 hover:-translate-y-px"
                }
              >
                <SlidersHorizontal size={9} strokeWidth={2} className="opacity-60" aria-hidden />
                <span>{t}</span>
              </button>
            </li>
          );
        }
        return (
          <li key={t}>
            <span className={basePill + " border-cream/25 text-cream/80"}>{t}</span>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="flex flex-col gap-8">
      {flipCards.map((c) => (
        <article
          key={c.no}
          className="group relative grid grid-cols-1 md:grid-cols-5 overflow-hidden bg-[#0D1B2A] transition-colors duration-[400ms] ease-out hover:bg-[#0F2235] md:h-[320px]"
          style={{ border: "1px solid rgba(245,240,232,0.08)" }}
        >
          {/* Image — left ~40% on desktop, top on mobile */}
          <div className="relative md:col-span-2 w-full h-[220px] md:h-full">
            <img
              src={c.bg}
              alt=""
              aria-hidden
              className="absolute inset-0 w-full h-full object-cover transition-[filter] duration-300 ease-out"
            />
            {/* Subtle navy tint to unify the three different photos */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none bg-[#0D1B2A]/15"
            />
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none md:hidden"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(13,27,42,0) 50%, rgba(13,27,42,0.85) 90%, #0D1B2A 100%)",
              }}
            />
          </div>


          {/* Content — right ~60% on desktop */}
          <div
            className="md:col-span-3 flex flex-col"
            style={{ padding: "24px", rowGap: "12px" }}
          >
            <span className="font-display uppercase tracking-[0.22em] text-[10px] text-[#C0281E]">
              {c.eyebrow}
            </span>

            <h3
              className="font-display text-cream tracking-tight text-left"
              style={{ fontSize: "1.75rem", lineHeight: 1.25, fontWeight: 500 }}
            >
              {c.title}
            </h3>

            <p
              className="text-cream/70 font-display leading-snug"
              style={{ fontSize: "1rem" }}
            >
              {c.body}
            </p>

            <div
              className="flex flex-col gap-3"
              style={{ paddingTop: "8px" }}
            >
              {renderTags(c.tags)}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}


