import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SiteLogo } from "@/components/SiteLogo";
import { MenuIcon } from "@/components/MenuIcon";
import heroImg from "@/assets/ai-og-forandring-hero.png";
import img2 from "@/assets/ai-udvikling2.png";
import img3 from "@/assets/ai-udvikling3.png";
import img5 from "@/assets/ai-udvikling5.png";
import img6 from "@/assets/ai-udvikling6.png";

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

function SplitSection1() {
  const focus = useScrollFocus();
  const imgFs = useFadeOnTrigger(focus.active, 0);
  const p1Fs  = useFadeOnTrigger(focus.active, 0.15);
  const p2Fs  = useFadeOnTrigger(focus.active, 0.30);
  const p3Fs  = useFadeOnTrigger(focus.active, 0.45);
  return (
    <div ref={focus.ref}>
      <div className="aif-split">
        <div className="aif-split-img" style={imgFs}>
          <img src={img2} alt="" aria-hidden="true" />
        </div>
        <div className="aif-split-text">
          <p style={p1Fs}>
            Konkurrenterne nævner det. Medarbejderne spørger. Kunderne forventer.
          </p>
          <p style={p2Fs}>
            Så vi følger med — ikke fordi vi har en plan, men fordi frygten for at blive overhalet er reel.
          </p>
          <p className="aif-punchline" style={{ ...p3Fs, fontSize: "1.3rem", fontWeight: 500, lineHeight: 1.6 }}>
            <em>Og vi hopper med.</em>
          </p>
        </div>
      </div>
    </div>
  );
}

function SplitSection2() {
  const focus = useScrollFocus();
  const p1Fs  = useFadeOnTrigger(focus.active, 0);
  const p2Fs  = useFadeOnTrigger(focus.active, 0.15);
  const p3Fs  = useFadeOnTrigger(focus.active, 0.30);
  const p4Fs  = useFadeOnTrigger(focus.active, 0.45);
  const imgFs = useFadeOnTrigger(focus.active, 0.15);
  return (
    <div ref={focus.ref}>
      <div className="aif-split" style={{ flexDirection: "row-reverse" }}>
        <div className="aif-split-img" style={imgFs}>
          <img src={img3} alt="" aria-hidden="true" />
        </div>
        <div className="aif-split-text">
          <p style={p1Fs}>
            Mønsteret har gentaget sig hver gang.
          </p>
          <p className="aif-punchline" style={{ ...p2Fs, fontSize: "1.3rem", lineHeight: 1.6 }}>
            <em>Dampmaskinens. Elektricitetens. Internettets.</em>
          </p>
          <p style={p3Fs}>
            De der klarede skærene var hverken dem der ignorerede det — eller dem der bare købte teknologien.
          </p>
          <p className="aif-boldline" style={{ ...p4Fs, fontWeight: 700, fontSize: "1.3rem", lineHeight: 1.6 }}>
            <strong>Det var dem der forstod hvad den ændrede ved mennesket.</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

function SplitSection3() {
  const focus = useScrollFocus();
  const imgFs = useFadeOnTrigger(focus.active, 0);
  const p1Fs  = useFadeOnTrigger(focus.active, 0.15);
  const p2Fs  = useFadeOnTrigger(focus.active, 0.30);
  const p3Fs  = useFadeOnTrigger(focus.active, 0.42);
  const p4Fs  = useFadeOnTrigger(focus.active, 0.54);
  const p5Fs  = useFadeOnTrigger(focus.active, 0.66);
  return (
    <div ref={focus.ref}>
      <div className="aif-split">
        <div className="aif-split-img" style={imgFs}>
          <img src={img6} alt="" aria-hidden="true" />
        </div>
        <div className="aif-split-text">
          <p style={p1Fs}>
            Værktøjerne rulles ud. Ingenting ændrer sig.
          </p>
          <p style={p2Fs}>
            Medarbejderne bruger dem ikke. Kunderne mærker ingen forskel. Ledelsen ved ikke hvorfor.
          </p>
          <p className="aif-boldline" style={{ ...p3Fs, fontWeight: 700, fontSize: "1.15rem", lineHeight: 1.6 }}>
            <strong>Det er ikke et teknisk problem.</strong>
          </p>
          <p className="aif-boldline" style={{ ...p4Fs, fontWeight: 700, fontSize: "1.15rem", lineHeight: 1.6 }}>
            <strong>Det er et menneskeligt et.</strong>
          </p>
          <p style={p5Fs}>
            AI kan generere, automatisere og optimere. Det den ikke kan er forstå hvorfor folk gør som de gør.
          </p>
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
        <img
          src={img5}
          alt=""
          aria-hidden="true"
          style={{ ...imgFs, width: "100%", height: "auto", display: "block" }}
        />
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
  const p6Fs  = useFadeOnTrigger(focus.active, 0.60);

  const pStyle = (fs: React.CSSProperties, extraMargin = false): React.CSSProperties => ({
    ...fs,
    fontFamily: "serif",
    fontSize: "1.2rem",
    lineHeight: 1.8,
    color: NAVY,
    margin: extraMargin ? "0 0 32px" : "0 0 20px",
  });

  return (
    <div ref={focus.ref}>
      <section style={{ backgroundColor: BEIGE, padding: "80px 32px" }}>
        <div style={{ maxWidth: 680, marginInline: "auto", textAlign: "center" }}>
          <p style={pStyle(p1Fs)}>
            De fleste organisationer ved godt hvad de vil opnå.
          </p>
          <p style={{ ...pStyle(p2Fs), margin: "0 0 32px" }}>
            Det svære er at få det til at lande.
          </p>
          <p style={pStyle(p3Fs)}>— Medarbejderne der skal ændre vaner.</p>
          <p style={pStyle(p4Fs)}>— Kunderne der skal mærke en forskel.</p>
          <p style={{ ...pStyle(p5Fs), margin: "0 0 32px" }}>— Ledelsen der skal se at det virker.</p>
          <p style={{ ...pStyle(p6Fs), margin: 0 }}>
            Jeg arbejder i det mellemrum hvor teknologi møder mennesker. Ikke med værktøjerne — men med dem der skal bruge dem. Gennem metodisk research og et konsekvent fokus på mennesket finder jeg ind til det der faktisk foregår — og omsætter det til løsninger der virker fordi de tager afsæt i virkeligheden.
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

        /* Split content sections — 35% tekst / 65% billede */
        .aif-split { display: flex; flex-direction: row; align-items: stretch; }
        .aif-split-img { flex: 1; }
        .aif-split-img img { width: 100%; height: auto; display: block; }
        .aif-split-text {
          flex: 0 0 35%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 64px 48px;
          background: ${BEIGE};
          box-sizing: border-box;
        }
        .aif-split-text p {
          font-family: serif;
          font-size: 1.15rem;
          line-height: 1.8;
          color: ${NAVY};
          margin: 0 0 20px;
        }
        .aif-split-text p:last-child { margin-bottom: 0; }

        /* Tablet (≤1024px): stacked layout */
        @media (max-width: 1024px) {
          .aif-split { flex-direction: column !important; }
          .aif-split-img { flex: none; width: 100%; }
          .aif-split-text { flex: none; width: 100%; padding: 48px 32px; }
        }
        /* Mobil (≤768px): tættere padding, tekst over billede */
        @media (max-width: 768px) {
          .aif-split { flex-direction: column-reverse !important; }
          .aif-split-text { padding: 32px 24px; }
          .aif-split-text p { font-size: 1.05rem; }
        }

        /* Desktop (≥1024px): larger body and emphasis text */
        @media (min-width: 1024px) {
          .aif-split-text p              { font-size: 1.3rem !important; }
          .aif-split-text .aif-punchline { font-size: 1.5rem !important; }
          .aif-split-text .aif-boldline  { font-size: 1.4rem !important; }
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

        <SectionBridge />
        <SplitSection1 />
        <SplitSection2 />
        <SplitSection3 />
        <Section4Block />
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
