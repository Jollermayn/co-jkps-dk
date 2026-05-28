import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SiteLogo } from "@/components/SiteLogo";
import { MenuIcon } from "@/components/MenuIcon";
import { useIsMobile } from "@/hooks/use-mobile";
import heroImg from "@/assets/ai-og-forandring-hero.png";

export const Route = createFileRoute("/transformation")({
  head: () => ({
    meta: [
      { title: "Transformation — Jonas K.P. Sørensen" },
      {
        name: "description",
        content:
          "De fleste implementeringer fejler ikke fordi systemet er dårligt. De fejler fordi ingen stillede de rigtige spørgsmål inden.",
      },
      { property: "og:title", content: "Transformation — Jonas K.P. Sørensen" },
      {
        property: "og:description",
        content:
          "De fleste implementeringer fejler ikke fordi systemet er dårligt. De fejler fordi ingen stillede de rigtige spørgsmål inden.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: TransformationPage,
});

const NAVY = "#0A1628";
const BEIGE = "#E8E2D9";
const RED = "#C0281E";

// ── Scroll-focus hook ─────────────────────────────────────────────────────────
// Active zone: viewport band from 10 % (top) to 70 % (bottom).
//
// Two refs, zero reactive state for the scroll path:
//
//   activeRef   — mirrors the current active/inactive state so check() can
//                 short-circuit when nothing has changed (avoids redundant
//                 DOM writes and avoids calling forceReveal unnecessarily).
//
//   revealedRef — one-shot latch: false → true, never resets. Ensures the
//                 child-reveal re-render fires exactly once per section no
//                 matter how many times the section enters the active zone.
//
// Opacity is written directly to el.style, completely outside React's
// reconciler. Because the wrapper div's JSX style prop never includes opacity,
// React has nothing to reconcile and can never reset the value.
//
// forceReveal is the only useState here. It increments from 0 → 1 exactly
// once (guarded by revealedRef) to give useFadeOnTrigger children the single
// reactive signal they need. Every subsequent scroll event takes the early
// return path and causes zero React work.
function useScrollFocus() {
  const ref         = useRef<HTMLDivElement>(null);
  const activeRef   = useRef(false); // current active state — updated without re-render
  const revealedRef = useRef(false); // has this section ever gone active — one-way latch
  const [, forceReveal] = useState(0); // incremented once to wake child hooks

  useEffect(() => {
    const check = () => {
      const el = ref.current;
      if (!el) return;
      const { top, bottom } = el.getBoundingClientRect();
      const isActive = top < window.innerHeight * 0.70 && bottom > window.innerHeight * 0.10;

      if (isActive === activeRef.current) return; // nothing changed — no work at all
      activeRef.current = isActive;

      // Direct DOM write — React will never touch this property
      el.style.opacity    = isActive ? "1" : "0.1";
      el.style.transition = isActive ? "opacity 0.8s ease" : "opacity 1.2s ease";

      // Trigger child reveals the very first time this section goes active.
      // revealedRef guards the call so forceReveal fires at most once.
      if (isActive && !revealedRef.current) {
        revealedRef.current = true;
        forceReveal(n => n + 1);
      }
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check, { passive: true });
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  // `active` exposes revealedRef (not activeRef) so it is a permanent latch:
  // false on initial render → true after first activation → never false again.
  // useFadeOnTrigger sees exactly one false→true transition and never rerenders again.
  return { ref, active: revealedRef.current };
}

// ── Coordinated fade hook ─────────────────────────────────────────────────────
// Fires once when `active` (from useScrollFocus on the parent wrapper) first
// becomes true. Replaces the old useFade which ran its own IntersectionObserver
// at threshold 0.15 — that fired before the parent reached the active zone,
// causing elements to ghost in at 0.1 effective opacity before snapping bright.
// Now both effects start at the same moment.
function useFadeOnTrigger(active: boolean, delay = 0): React.CSSProperties {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    if (active && !revealed) setRevealed(true);
  }, [active, revealed]);
  return {
    opacity: revealed ? 1 : 0,
    transform: revealed ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
  };
}

// ── Split section sub-components ──────────────────────────────────────────────
// Each element staggered 0.15s. Both hooks share the same `active` signal so
// the focus-brighten and element-reveal fire in sync, not sequentially.

// Shared card image style — absolute fill
const BG_IMG_STYLE: React.CSSProperties = {
  position: "absolute", inset: 0, width: "100%", height: "100%",
  objectFit: "cover", objectPosition: "center top", display: "block",
};
function onImgErr(e: React.SyntheticEvent<HTMLImageElement>) {
  console.error("[newspaper card] failed to load background image:", (e.target as HTMLImageElement).src);
}

function SplitSection1() {
  const focus = useScrollFocus();
  return (
    <div ref={focus.ref}>
      <div className="aif-card-wrapper">
        <div className="aif-np-card" style={{ transform: "rotate(-1.2deg)" }}>
          <img src="/_JKPS_AVIS_TEMP_5.png" alt="" style={BG_IMG_STYLE} onError={onImgErr} />
        </div>
      </div>
    </div>
  );
}

function SplitSection2() {
  const focus = useScrollFocus();
  return (
    <div ref={focus.ref}>
      <div className="aif-card-wrapper">
        <div className="aif-np-card" style={{ transform: "rotate(1.5deg)" }}>
          <img src="/AVIS_AI_11.png" alt="" style={BG_IMG_STYLE} onError={onImgErr} />
        </div>
      </div>
    </div>
  );
}

function SplitSection3() {
  const focus = useScrollFocus();
  return (
    <div ref={focus.ref}>
      <div className="aif-card-wrapper">
        <div className="aif-np-card" style={{ transform: "rotate(-0.8deg)" }}>
          <img src="/_JKPS_AVIS_TEMP_9.png" alt="" style={BG_IMG_STYLE} onError={onImgErr} />
        </div>
      </div>
    </div>
  );
}

function SplitSection4() {
  const focus = useScrollFocus();
  return (
    <div ref={focus.ref}>
      <div className="aif-card-wrapper">
        <div className="aif-np-card" style={{ transform: "rotate(0.9deg)" }}>
          <img src="/_JKPS_AVIS_TEMP_10.png" alt="" style={BG_IMG_STYLE} onError={onImgErr} />
        </div>
      </div>
    </div>
  );
}

function Section4Block() {
  const focus = useScrollFocus();
  const imgFs = useFadeOnTrigger(focus.active, 0);
  return (
    <div ref={focus.ref}>
      <section style={{ backgroundColor: BEIGE }}>
        <Section4Text />
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{ ...imgFs, width: "100%", height: "auto", display: "block", objectFit: "cover" }}
        >
          <source src="/videos/Ai_udvikling5_video.mp4" type="video/mp4" />
        </video>
      </section>
    </div>
  );
}

function SectionStatement() {
  const focus = useScrollFocus();
  const h1Fs  = useFadeOnTrigger(focus.active, 0);
  const h2Fs  = useFadeOnTrigger(focus.active, 0.18);

  return (
    <div ref={focus.ref} style={{ margin: 0 }}>
      <section style={{
        backgroundColor: "#0D1B2A",
        minHeight: "40vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 32px",
        textAlign: "center",
        boxSizing: "border-box",
      }}>
        <div>
          <p style={{
            ...h1Fs,
            fontFamily: "serif",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            fontWeight: 400,
            lineHeight: 1.2,
            color: "#FFFFFF",
            margin: "0 0 20px",
          }}>
            Når strategi <span style={{ color: RED }}>A</span>, <span style={{ color: RED }}>B</span>, <span style={{ color: RED }}>C</span> og <span style={{ color: RED }}>D</span> ikke virkede.
          </p>
          <p style={{
            ...h2Fs,
            fontFamily: "serif",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            fontWeight: 400,
            lineHeight: 1.2,
            color: "#FFFFFF",
            margin: 0,
          }}>
            Kunne vi prøve med det oprigtige?
          </p>
        </div>
      </section>
    </div>
  );
}

function SectionBridge() {
  const focus = useScrollFocus();
  const p1Fs  = useFadeOnTrigger(focus.active, 0);
  const p2Fs  = useFadeOnTrigger(focus.active, 0.12);
  const p3Fs  = useFadeOnTrigger(focus.active, 0.24);
  const p4Fs  = useFadeOnTrigger(focus.active, 0.36);
  const p5Fs  = useFadeOnTrigger(focus.active, 0.48);
  const p6Fs  = useFadeOnTrigger(focus.active, 0.15);

  return (
    <div ref={focus.ref} style={{ margin: 0 }}>
      <div className="aif-bridge">

        {/* Left column — beige, navy text */}
        <div className="aif-bridge-left">
          <p style={{ ...p1Fs, color: NAVY }}>
            De fleste organisationer ved godt hvad de vil opnå.
          </p>
          <p style={{ ...p2Fs, color: NAVY, margin: "0 0 32px" }}>
            Det svære er at få det til at lande.
          </p>
          <p style={{ ...p3Fs, color: NAVY }}>— Medarbejderne der skal ændre vaner.</p>
          <p style={{ ...p4Fs, color: NAVY }}>— Kunderne der skal mærke en forskel.</p>
          <p style={{ ...p5Fs, color: NAVY }}>— Ledelsen der skal se at det virker.</p>
        </div>

        {/* Right column — dark navy, cream text */}
        <div className="aif-bridge-right">
          <p style={{ ...p6Fs, color: "#F5F0E8" }}>
            Jeg arbejder i det mellemrum hvor teknologi møder mennesker. Ikke med værktøjerne — men med dem der skal bruge dem. Gennem metodisk research og et konsekvent fokus på mennesket finder jeg ind til det der faktisk foregår — og omsætter det til løsninger der virker fordi de tager afsæt i virkeligheden.
          </p>
        </div>

      </div>
    </div>
  );
}

function SectionClosing({ onContact }: { onContact: () => void }) {
  const focus = useScrollFocus();
  const p1Fs  = useFadeOnTrigger(focus.active, 0);
  const p2Fs  = useFadeOnTrigger(focus.active, 0.20);
  const p3Fs  = useFadeOnTrigger(focus.active, 0.40);
  return (
    <div ref={focus.ref}>
      <section style={{ backgroundColor: BEIGE, padding: "80px 32px" }}>
        <div style={{ maxWidth: 680, marginInline: "auto", textAlign: "center" }}>
          <p style={{
            ...p1Fs,
            fontFamily: "serif",
            fontSize: "1.2rem",
            lineHeight: 1.8,
            color: NAVY,
            margin: "0 0 20px",
          }}>
            Står du med en organisation der skal igennem noget svært, så er jeg interesseret i at høre om det.
          </p>
          <p style={{
            ...p2Fs,
            fontFamily: "serif",
            fontSize: "1.2rem",
            lineHeight: 1.8,
            color: NAVY,
            margin: "0 0 32px",
          }}>
            Ikke for at sælge en løsning. Men for at forstå problemet.
          </p>
          <p style={{ ...p3Fs, fontFamily: "serif", fontSize: "1.2rem", lineHeight: 1.8, color: NAVY, margin: 0 }}>
            <em>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); onContact(); }}
                className="aif-tales-link"
                style={{ color: NAVY, textDecoration: "none", cursor: "pointer" }}
              >
                Lad os tales ved.
              </a>
            </em>
          </p>
        </div>
      </section>
    </div>
  );
}

function Section5CTA({ onContact }: { onContact: () => void }) {
  const focus = useScrollFocus();
  const ctaFs = useFadeOnTrigger(focus.active, 0);
  return (
    <div ref={focus.ref}>
      <section style={{ backgroundColor: BEIGE }}>
        <div style={{ padding: "96px 32px", textAlign: "center" }}>
          <p
            style={{
              ...ctaFs,
              fontFamily: "serif",
              fontStyle: "italic",
              fontSize: "clamp(1.9rem, 5vw, 3rem)",
              color: NAVY,
              margin: 0,
              lineHeight: 1.25,
            }}
          >
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); onContact(); }}
              className="aif-tales-link"
              style={{ color: RED, textDecoration: "none", cursor: "pointer" }}
            >
              Lad os tales ved
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}

// ── Main page component ───────────────────────────────────────────────────────

function TransformationPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [form, setForm] = useState({ navn: "", email: "", besked: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  useEffect(() => {
    if (!contactOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setContactOpen(false); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [contactOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setSendError(null);
    try {
      const fd = new FormData(e.currentTarget as HTMLFormElement);
      const res = await fetch("https://formspree.io/f/xojbqzdp", {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error("send failed");
      setSent(true);
      setTimeout(() => {
        setContactOpen(false);
        setSent(false);
        setForm({ navn: "", email: "", besked: "" });
      }, 3000);
    } catch {
      setSendError("Noget gik galt. Prøv venligst igen.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={{ backgroundColor: BEIGE, minHeight: "100vh" }}>
      <svg width="0" height="0" style={{position:'absolute'}}>
        <defs>
          <filter id="paper-grain" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" result="noise"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.18 0" in="noise" result="alpha"/>
            <feBlend in="SourceGraphic" in2="alpha" mode="multiply"/>
          </filter>
          <filter id="edge-worn">
            <feTurbulence type="turbulence" baseFrequency="0.02 0.06" numOctaves="3" result="n"/>
            <feDisplacementMap in="SourceGraphic" in2="n" scale="2.5" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
        </defs>
      </svg>
      <style>{`
        .aif-nav-link:hover { color: ${RED} !important; }
        .aif-tales-link { position: relative; display: inline-block; }
        .aif-tales-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 100%;
          height: 2px;
          background: ${RED};
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }
        .aif-tales-link:hover::after { transform: scaleX(1); }
        @keyframes aif-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes aif-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }

        /* Card layout — mobile-first single column */
        /* ── Newspaper card layout ─────────────────────────────── */
        .aif-cards-section {
          background: ${BEIGE};
          padding: 60px 24px;
          overflow: visible;
        }
        .aif-cards-section > div { margin-bottom: 80px; }
        .aif-cards-section > div:last-child { margin-bottom: 0; }
        .aif-card-wrapper { padding: 0; }

        /* Card */
        .aif-np-card {
          background-color: transparent;
          border: none;
          box-shadow: none;
          padding: 14px 14px 0;
          font-family: serif;
          overflow: hidden;
          min-height: 620px;
          max-width: 400px;
          margin: 0 auto;
          width: 100%;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .aif-np-card::after {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.15;
          mix-blend-mode: multiply;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E");
          background-size: 200px 200px;
        }
        /* Top bar */
        .aif-np-topbar {
          background: #000;
          color: #fff;
          text-align: center;
          font-variant: small-caps;
          letter-spacing: 0.3em;
          font-size: 11px;
          padding: 5px 0;
          margin: -14px -14px 8px;
        }
        /* Date line */
        .aif-np-dateline {
          font-size: 9px;
          color: #555;
          border-bottom: 0.5px solid #888;
          padding-bottom: 5px;
          margin-bottom: 9px;
          font-family: sans-serif;
          letter-spacing: 0.05em;
        }
        /* Headline */
        .aif-np-headline {
          font-family: serif;
          font-weight: 700;
          font-size: clamp(1.4rem, 3.5vw, 2rem);
          line-height: 1.05;
          text-transform: uppercase;
          color: #0a0a0a;
          margin: 0 0 10px;
          letter-spacing: -0.01em;
        }
        /* Double rule */
        .aif-np-doublerule {
          border-top: 2px solid #000;
          margin-bottom: 4px;
        }
        .aif-np-doublerule::after {
          content: '';
          display: block;
          border-top: 0.5px solid #000;
          margin-top: 4px;
          margin-bottom: 8px;
        }
        /* Deck */
        .aif-np-deck {
          font-style: italic;
          font-size: 10px;
          line-height: 1.55;
          color: #222;
          margin: 0 0 10px;
          font-family: serif;
        }
        /* Video wrapper */
        .aif-np-video-wrap {
          position: relative;
          margin: 0 -14px 10px;
          border-top: 1.5px solid #000;
          border-bottom: 1.5px solid #000;
        }
        .aif-np-video-wrap video {
          width: 100%;
          height: 185px;
          object-fit: cover;
          display: block;
        }
        .aif-np-caption {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          background: rgba(0,0,0,0.68);
          color: #fff;
          font-size: 8px;
          padding: 3px 8px;
          font-family: sans-serif;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        /* Two-column body */
        .aif-np-body {
          column-count: 2;
          column-gap: 14px;
          font-size: 10px;
          line-height: 1.65;
          font-family: sans-serif;
          color: #111;
          margin: 10px 0 0;
        }
        .aif-np-body p { margin: 0 0 6px; break-inside: avoid; }
        /* Footer bar */
        .aif-np-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #000;
          color: #ccc;
          font-size: 8.5px;
          padding: 5px 8px;
          font-family: sans-serif;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin: 10px -14px 0;
        }
        .aif-np-readmore { color: #C0281E !important; font-weight: 600; }

        /* Desktop (≥1024px): two-column staggered grid */
        @media (min-width: 1024px) {
          .aif-cards-section {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 140px 80px;
            padding: 100px 100px 140px;
            max-width: 1300px;
            box-sizing: border-box;
            margin: 0 auto;
            align-items: start;
            justify-items: center;
            overflow: visible;
          }
          .aif-cards-section > div { margin-bottom: 0; width: 100%; max-width: 400px; }
          .aif-cards-section > div:last-child { margin-bottom: 0; }
          .aif-cards-section > div:nth-child(even) { margin-top: -180px; }
          .aif-card-wrapper { padding: 0; }
          .aif-np-card { max-width: 400px; }
          .aif-np-headline { font-size: clamp(1.4rem, 3.5vw, 2rem); }
        }

        /* Hero */
        .aif-hero-section { display: flex; flex-direction: row; height: calc(100vh - 72px); background: ${BEIGE}; margin: 0; position: relative; }
        .aif-hero-left {
          width: 35%;
          flex-shrink: 0;
          background: ${BEIGE};
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 64px 48px;
          box-sizing: border-box;
        }
        .aif-hero-right { flex: 1; position: relative; overflow: hidden; }
        .aif-hero-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
        .aif-hero-mobile-overlay,
        .aif-hero-mobile-content { display: none; }

        /* Tablet + Mobil: hero med overlay */
        @media (max-width: 1024px) {
          .aif-hero-section { flex-direction: column; }
          .aif-hero-left { display: none; }
          .aif-hero-right { width: 100%; flex: 1; position: relative; }
          .aif-hero-img { object-position: center 30%; }
          .aif-hero-mobile-overlay {
            display: block;
            position: absolute;
            inset: 0;
            background: linear-gradient(to bottom, rgba(10,22,40,0.6) 0%, rgba(10,22,40,0.78) 100%);
            pointer-events: none;
          }
          .aif-hero-mobile-content {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            text-align: center;
            position: absolute;
            inset: 0;
            padding: 32px 24px 48px;
            box-sizing: border-box;
            z-index: 1;
          }
        }

        /* Mobil only: heading anchored bottom-left, gradient from bottom, taller hero */
        @media (max-width: 768px) {
          .aif-hero-section { min-height: 85vh; }
          .aif-hero-img { object-position: center top; }
          .aif-hero-mobile-overlay {
            background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%);
          }
          .aif-mobile-hero-h1 {
            position: absolute;
            bottom: 32px;
            left: 24px;
            text-align: left;
          }
          .aif-mobile-hero-h1 span {
            color: white !important;
          }
        }

        /* Bridge section — two-column split, proportions mirror the hero (35/65) */
        .aif-bridge { display: flex; flex-direction: row; margin: 0; }
        .aif-bridge-left {
          flex: 0 0 35%;
          background: ${BEIGE};
          padding: 60px 48px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .aif-bridge-right {
          flex: 1;
          background: #1C2B3A;
          padding: 60px 48px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .aif-bridge-left p, .aif-bridge-right p {
          font-family: serif;
          font-size: 1.2rem;
          line-height: 1.8;
          margin: 0 0 20px;
        }
        .aif-bridge-left p:last-child, .aif-bridge-right p:last-child { margin-bottom: 0; }
        @media (max-width: 768px) {
          .aif-bridge { flex-direction: column; }
          .aif-bridge-left, .aif-bridge-right { flex: none; width: 100%; padding: 40px 24px; }
        }
      `}</style>

      {/* NAV */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backgroundColor: NAVY,
          height: 72,
          padding: "0 64px 0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 48,
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 6px 16px rgba(0,0,0,0.18)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 48 }}>
          <SiteLogo color="#ffffff" lineColor={RED} lineOpacity={1} />
          <div className="hidden md:flex" style={{ alignItems: "center", gap: 28 }}>
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
                className="aif-nav-link"
                style={{
                  fontFamily: "serif",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: "#F5F0E8",
                  letterSpacing: "0.05em",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
        <button
          type="button"
          aria-label="Åbn menu"
          onClick={() => setMenuOpen(true)}
          className="md:hidden inline-flex"
          style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer" }}
        >
          <MenuIcon color="#F5F3EE" />
        </button>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div
          className="md:hidden"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            backgroundColor: "#E0D9C8",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 32,
          }}
        >
          <button
            type="button"
            aria-label="Luk menu"
            onClick={() => setMenuOpen(false)}
            style={{
              position: "absolute",
              top: 16,
              right: 24,
              background: "transparent",
              border: "none",
              color: NAVY,
              fontSize: "2rem",
              lineHeight: 1,
              padding: 0,
              cursor: "pointer",
            }}
          >
            ×
          </button>
          <Link to="/" onClick={() => setMenuOpen(false)} style={{ fontFamily: "serif", fontSize: "1.8rem", color: NAVY, textDecoration: "none" }}>Portfolio</Link>
          <Link to="/tilgang" onClick={() => setMenuOpen(false)} style={{ fontFamily: "serif", fontSize: "1.8rem", color: NAVY, textDecoration: "none" }}>Tilgang</Link>
          <Link to="/transformation" onClick={() => setMenuOpen(false)} style={{ fontFamily: "serif", fontSize: "1.8rem", color: NAVY, textDecoration: "none" }}>Transformation</Link>
          <Link to="/cv" onClick={() => setMenuOpen(false)} style={{ fontFamily: "serif", fontSize: "1.8rem", color: NAVY, textDecoration: "none" }}>CV</Link>
          <a href="/#kontakt" onClick={() => setMenuOpen(false)} style={{ fontFamily: "serif", fontSize: "1.8rem", color: NAVY, textDecoration: "none" }}>Kontakt</a>
        </div>
      )}

      <main style={{ paddingTop: 72 }}>

        {/* HERO — no scroll animation, loads immediately */}
        <section className="aif-hero-section">

          <div className="aif-hero-left">
            <h1 style={{
              fontFamily: "serif",
              fontSize: "2.4rem",
              fontWeight: 400,
              color: NAVY,
              lineHeight: 1.2,
              margin: 0,
              textAlign: "center",
              opacity: 0,
              animation: "aif-fade 0.8s ease 0.2s both",
            }}>
              <span style={{ display: "block", color: NAVY }}>Transformationen</span>
              <span style={{ display: "block", fontSize: "0.65em", fontWeight: 300, color: NAVY }}>er</span>
              <span style={{ display: "block", color: RED }}>begyndt</span>
            </h1>
          </div>

          <div className="aif-hero-right">
            <img src={heroImg} alt="" aria-hidden="true" className="aif-hero-img" />
            <div className="aif-hero-mobile-overlay" aria-hidden="true" />
            <div className="aif-hero-mobile-content">
              <h1
                className="aif-mobile-hero-h1"
                style={{
                  fontFamily: "serif",
                  fontSize: "2.4rem",
                  fontWeight: 400,
                  color: "#F5F0E8",
                  lineHeight: 1.2,
                  margin: 0,
                  textShadow: "0 2px 12px rgba(0,0,0,0.6)",
                  opacity: 0,
                  animation: "aif-fade 0.8s ease 0.2s both",
                }}
              >
                <span style={{ display: "block", color: "#F5F0E8" }}>Transformationen</span>
                <span style={{ display: "block", fontSize: "0.65em", fontWeight: 300, color: "#F5F0E8" }}>er</span>
                <span style={{ display: "block", color: RED }}>begyndt</span>
              </h1>
            </div>
          </div>

          {/* Bounce-pil */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: 24,
              left: "50%",
              marginLeft: -12,
              zIndex: 10,
              animation: "aif-bounce 1.5s ease-in-out infinite",
              pointerEvents: "none",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 9l6 6 6-6" stroke="#C0281E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

        </section>

        <SectionStatement />
        <div className="aif-cards-section">
          <SplitSection1 />
          <SplitSection2 />
          <SplitSection3 />
          <SplitSection4 />
        </div>
        <SectionBridge />
        <Section4Block />
        <SectionClosing onContact={() => setContactOpen(true)} />
        <Section5CTA onContact={() => setContactOpen(true)} />

        {/* CLOSING */}
        <section style={{ backgroundColor: NAVY, padding: "80px 24px", textAlign: "center" }}>
          <a href="/" style={{ fontFamily: "serif", fontSize: "1.5rem", color: "rgba(245,240,232,0.5)", textDecoration: "none" }}>
            ← Tilbage til portfolio
          </a>
        </section>

      </main>

      {/* KONTAKT MODAL */}
      {contactOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Kontaktformular"
          onClick={() => setContactOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            animation: "aif-fade 0.3s ease",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 480,
              background: "#0A1628",
              color: "#fff",
              borderRadius: 12,
              padding: "40px 32px",
              boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
              animation: "aif-fade 0.3s ease",
            }}
          >
            <button
              type="button"
              aria-label="Luk"
              onClick={() => setContactOpen(false)}
              style={{
                position: "absolute",
                top: 12,
                right: 16,
                background: "transparent",
                border: "none",
                color: "#fff",
                fontSize: "1.8rem",
                lineHeight: 1,
                cursor: "pointer",
                padding: 4,
              }}
            >
              ×
            </button>
            <h3 style={{ fontFamily: "serif", fontSize: "1.6rem", fontWeight: 700, margin: "0 0 20px" }}>
              Lad os tales ved
            </h3>
            {sent ? (
              <p style={{ color: "#fff", textAlign: "center", padding: "32px 0", fontSize: "1.15rem" }}>
                Tak — jeg vender tilbage.
              </p>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <input type="hidden" name="_subject" value="Henvendelse fra jkps.dk" />
                <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: "0.9rem" }}>
                  Dit navn
                  <input
                    type="text"
                    name="navn"
                    required
                    value={form.navn}
                    onChange={(e) => setForm({ ...form, navn: e.target.value })}
                    style={{ padding: "10px 12px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.05)", color: "#fff", fontSize: "1rem" }}
                  />
                </label>
                <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: "0.9rem" }}>
                  Din email
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    style={{ padding: "10px 12px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.05)", color: "#fff", fontSize: "1rem" }}
                  />
                </label>
                <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: "0.9rem" }}>
                  Besked
                  <textarea
                    name="besked"
                    required
                    rows={4}
                    value={form.besked}
                    onChange={(e) => setForm({ ...form, besked: e.target.value })}
                    style={{ padding: "10px 12px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.05)", color: "#fff", fontSize: "1rem", fontFamily: "inherit", resize: "vertical" }}
                  />
                </label>
                {sendError && (
                  <p style={{ color: "#ff9a9a", fontSize: "0.85rem", margin: 0 }}>{sendError}</p>
                )}
                <button
                  type="submit"
                  disabled={sending}
                  style={{ marginTop: 6, padding: "12px 20px", background: RED, color: "#fff", border: "none", borderRadius: 6, fontSize: "1rem", fontWeight: 600, cursor: sending ? "default" : "pointer", opacity: sending ? 0.7 : 1 }}
                >
                  {sending ? "Sender..." : "Send"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Section 4 heading reveal (Framer Motion) ──────────────────────────────────

function Section4Text() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <div ref={ref} style={{ maxWidth: 680, marginInline: "auto", padding: "120px 32px", textAlign: "center" }}>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        style={{
          fontFamily: "serif",
          fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
          fontWeight: 700,
          lineHeight: 1.3,
          color: NAVY,
          margin: 0,
        }}
      >
        Nogle ting kan aldrig erstattes.
      </motion.p>
    </div>
  );
}
