import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { SiteLogo } from "@/components/SiteLogo";
import { MenuIcon } from "@/components/MenuIcon";
import mazeKort from "@/assets/kort.png";
import mazeLygte from "@/assets/lygte.png";
const scenarioStrategi = "/videos/strategi.mp4";
const scenarioModelokale = "/videos/moedelokale.mp4";
const scenarioSystem = "/videos/onboarding.mp4";
const scenarioBrugere = "/videos/glasvaeg.mp4";

export const Route = createFileRoute("/tilgang")({
  head: () => ({
    meta: [
      { title: "Tilgang — Jonas K.P. Sørensen" },
      {
        name: "description",
        content:
          "Digitale forandringer fejler sjældent fordi teknologien er forkert. De fejler fordi noget går tabt på vejen.",
      },
      { property: "og:title", content: "Tilgang — Jonas K.P. Sørensen" },
      {
        property: "og:description",
        content:
          "Digitale forandringer fejler sjældent fordi teknologien er forkert. De fejler fordi noget går tabt på vejen.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: TilgangPage,
});

const NAVY = "#0A1628";
const BEIGE = "#E8E2D9";
const RED = "#C0281E";
const MUTED_ON_DARK = "#94a3b8";
const MUTED_ON_LIGHT = "#6b6157";

type Cell = {
  heading: string;
  silver: string;
  image: string;
};

const cells: Cell[] = [
  {
    heading: "Strategien fylder 40 sider. Ingen har åbnet den.",
    silver:
      "Et dokument er ikke en retning. Jeg designer indhold der læses — og huskes.",
    image: scenarioStrategi,
  },
  {
    heading: "Alle var enige i mødelokalet. Intet skete bagefter.",
    silver:
      "Enighed er ikke forankring. Jeg finder hullet mellem beslutningen og hverdagen.",
    image: scenarioModelokale,
  },
  {
    heading: "Systemet er rullet ud. Ingen bruger det.",
    silver: "Mening kan ikke installeres. Jeg designer den ind.",
    image: scenarioSystem,
  },
  {
    heading: "De designede det til brugerne. De glemte at spørge dem.",
    silver: "Antagelser er ikke viden. Jeg går ud og finder den.",
    image: scenarioBrugere,
  },
];

function TilgangPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const heroImgRef = useRef<HTMLImageElement | null>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const [contactOpen, setContactOpen] = useState(false);
  const [form, setForm] = useState({ navn: "", email: "", besked: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

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

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  useEffect(() => {
    const sources = [mazeKort, mazeLygte];
    let i = 0;
    const id = setInterval(() => {
      i = (i + 1) % 2;
      if (heroImgRef.current) heroImgRef.current.src = sources[i];
    }, 1500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 1024;
      videoRefs.current.forEach((v) => {
        if (!v) return;
        if (isMobile) {
          v.play().catch(() => {});
        } else {
          v.pause();
          v.currentTime = 0;
        }
      });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ backgroundColor: BEIGE, minHeight: "100vh" }}>
      <style>{`
        .tilgang-nav-link:hover { color: ${RED} !important; }
        .tilgang-cell-img { filter: grayscale(100%); transition: filter 0.4s ease; }
        .tilgang-video-frame { position: absolute; inset: 0; overflow: hidden; }
        .tilgang-bar { position: absolute; left: 0; right: 0; height: 40px; background: #000; z-index: 5; pointer-events: none; }
        .tilgang-bar-top { top: 0; height: 23px; }
        .tilgang-bar-bottom { bottom: 0; height: 23px; }
        @media (max-width: 767px) {
          .tilgang-bar { height: 20px !important; }
        }
        @media (max-width: 1023px) {
          .tilgang-bar { display: none !important; }
        }
        @media (min-width: 1024px) {
          .tilgang-tales-link { position: relative; display: inline-block; }
          .tilgang-tales-link::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: -2px;
            width: 100%;
            height: 2px;
            background: #C0281E;
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.3s ease;
          }
          .tilgang-tales-link:hover::after { transform: scaleX(1); }
          .tilgang-cell { min-height: 0 !important; aspect-ratio: auto !important; }
          .tilgang-video-frame { position: relative !important; inset: auto !important; width: 100% !important; aspect-ratio: 16 / 9 !important; height: auto !important; }
          .tilgang-cell-img { position: absolute !important; inset: 0 !important; width: 100% !important; height: 100% !important; object-fit: cover !important; }
        }
        @media (max-width: 1023px) {
          .tilgang-grid { padding: 0 !important; margin: 0 !important; gap: 0 !important; column-gap: 0 !important; row-gap: 0 !important; }
          .tilgang-cell { margin: 0 !important; padding: 0 !important; overflow: hidden !important; }
          .tilgang-cell::before, .tilgang-cell::after,
          .tilgang-video-frame::before, .tilgang-video-frame::after { content: none !important; background: transparent !important; display: none !important; }
          .tilgang-video-frame { margin: 0 !important; padding: 0 !important; }
        }
        .tilgang-cell:hover .tilgang-cell-img { filter: grayscale(0%); }
        .tilgang-cell-overlay { opacity: 0; transition: opacity 0.4s ease; }
        .tilgang-cell:hover .tilgang-cell-overlay { opacity: 1; transition: opacity 0.8s ease 0.8s; }
        @media (max-width: 1023px) {
          .tilgang-cell-img { filter: grayscale(0%) !important; }
          .tilgang-cell-overlay { opacity: 1 !important; }
        }
        @media (max-width: 1023px) {
          .tilgang-hero-h1 { font-size: 3.25rem !important; line-height: 1.15 !important; }
          .tilgang-intro-line { font-size: 1.25rem !important; margin-bottom: 56px !important; white-space: nowrap; }
        }
        @media (max-width: 767px) {
          .tilgang-intro-line { font-size: clamp(0.65rem, 2.85vw, 1.2rem) !important; white-space: nowrap !important; margin-bottom: 40px !important; }
        }
        .tilgang-cell-title-mobile { display: none; }
        @media (max-width: 767px) {
          .tilgang-hero-h1 { font-size: 2.1rem !important; line-height: 1.2 !important; }
          .tilgang-closing-h2 { font-size: 1.9rem !important; }
          .tilgang-grid { grid-template-columns: 1fr !important; }
          .tilgang-cell { min-height: 0 !important; aspect-ratio: auto !important; background-color: #0A1628 !important; }
          .tilgang-video-frame { position: relative !important; inset: auto !important; aspect-ratio: 16 / 9 !important; width: 100% !important; }
          .tilgang-cell-img { object-fit: cover !important; background-color: #0A1628 !important; }
          .tilgang-cell-title-mobile { padding: 12px 16px !important; }
          .tilgang-cell-overlay { display: none !important; }
          .tilgang-cell-title-mobile {
            display: block;
            background-color: #0A1628;
            color: #ffffff;
            padding: 16px;
            font-family: serif;
            font-weight: 600;
            font-size: 1.05rem;
            line-height: 1.3;
            text-align: center;
          }
        }
      `}</style>

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
          <div
            className="hidden md:flex"
            style={{ alignItems: "center", gap: 28, flexWrap: "wrap" }}
          >
            {[
              { label: "Cases", href: "/#cases" },
              { label: "Kompetencer", href: "/#kompetencer" },
              { label: "Tilgang", href: "/tilgang" },
              { label: "Kontakt", href: "/#kontakt" },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="tilgang-nav-link"
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
          style={{
            background: "transparent",
            border: "none",
            padding: 0,
            cursor: "pointer",
            color: "#F5F3EE",
            display: "inline-flex",
          }}
        >
          <MenuIcon color="#F5F3EE" />
        </button>
      </nav>

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
          <Link to="/cv" onClick={() => setMenuOpen(false)} style={{ fontFamily: "serif", fontSize: "1.8rem", color: NAVY, textDecoration: "none" }}>CV</Link>
          <a href="/#kontakt" onClick={() => setMenuOpen(false)} style={{ fontFamily: "serif", fontSize: "1.8rem", color: NAVY, textDecoration: "none" }}>Kontakt</a>
        </div>
      )}

      <main style={{ paddingTop: 72 }}>
        {/* HERO */}
        <section
          style={{
            backgroundColor: BEIGE,
            padding: "60px 24px 0",
            textAlign: "center",
          }}
        >
          <h1
            className="tilgang-hero-h1"
            style={{
              fontFamily: "serif",
              fontSize: "5.5rem",
              fontWeight: 700,
              color: NAVY,
              lineHeight: 1.1,
              margin: 0,
              maxWidth: 1100,
              marginInline: "auto",
            }}
          >
            Kunsten i at belyse,<br />hvad der går tabt undervejs.
          </h1>
        </section>

        <img
          ref={heroImgRef}
          src={mazeKort}
          alt=""
          style={{
            display: "block",
            width: "100%",
            height: 700,
            objectFit: "cover",
            objectPosition: "center 65%",
            marginTop: 48,
            marginBottom: 48,
          }}
        />

        {/* INTRO */}
        <section
          style={{
            backgroundColor: BEIGE,
            padding: "40px 24px 104px",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: 900, marginInline: "auto", marginTop: 64 }}>
            <IntroLines />
          </div>
        </section>

        {/* 2x2 IMAGE GRID */}
        <section
          className="tilgang-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
            paddingLeft: 48,
            paddingRight: 48,
          }}
        >
          {cells.map((cell, i) => (
            <div
              key={i}
              className="tilgang-cell"
              onMouseEnter={() => {
                setHoverIdx(i);
                const v = videoRefs.current[i];
                if (v) v.play().catch(() => {});
              }}
              onMouseLeave={() => {
                setHoverIdx(null);
                const v = videoRefs.current[i];
                if (v) {
                  v.pause();
                  v.currentTime = 0;
                }
              }}
              style={{
                position: "relative",
                minHeight: 450,
                backgroundColor: "#bdbdbd",
                overflow: "hidden",
                cursor: "default",
                marginBottom: 24,
              }}
            >
              <div className="tilgang-video-frame">
                <video
                  ref={(el) => {
                    videoRefs.current[i] = el;
                    if (el && typeof window !== "undefined" && window.innerWidth < 1024) {
                      el.play().catch(() => {});
                    }
                  }}
                  src={cell.image}
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="tilgang-cell-img"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center center",
                    display: "block",
                  }}
                />
                <div className="tilgang-bar tilgang-bar-top" aria-hidden="true" />
                <div className="tilgang-bar tilgang-bar-bottom" aria-hidden="true" />
              </div>
              <div
                className="tilgang-cell-overlay"
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: "rgba(10, 22, 40, 0.65)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  textAlign: "center",
                  padding: "32px 32px 28px",
                }}
              >
                <h3
                  style={{
                    fontFamily: "serif",
                    fontWeight: 700,
                    fontSize: "1.8rem",
                    color: "#ffffff",
                    lineHeight: 1.25,
                    margin: 0,
                    maxWidth: 520,
                  }}
                >
                  {cell.heading}
                </h3>
              </div>
              <div className="tilgang-cell-title-mobile">{cell.heading}</div>
            </div>
          ))}
        </section>

        <p
          style={{
            fontFamily: "serif",
            fontStyle: "italic",
            fontSize: "clamp(1.3rem, 3.5vw, 2.4rem)",
            color: "#0A1628",
            textAlign: "center",
            margin: "80px 24px",
          }}
        >
          Genkender du disse mønstre?<br />
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); setContactOpen(true); }}
            className="tilgang-tales-link"
            style={{ color: "#C0281E", textDecoration: "none", cursor: "pointer" }}
          >
            Lad os tales ved
          </a>
          .
        </p>

        {/* CLOSING */}
        <section
          style={{
            backgroundColor: NAVY,
            padding: "80px 24px",
            textAlign: "center",
          }}
        >
          <a
            href="/#tilgang"
            style={{
              fontFamily: "serif",
              fontSize: "1.5rem",
              color: MUTED_ON_DARK,
              textDecoration: "none",
            }}
          >
            ← Tilbage til portfolio
          </a>
        </section>
      </main>


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
            animation: "tilgang-fade 0.3s ease",
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
              animation: "tilgang-fade 0.3s ease",
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
                  style={{ marginTop: 6, padding: "12px 20px", background: "#C0281E", color: "#fff", border: "none", borderRadius: 6, fontSize: "1rem", fontWeight: 600, cursor: sending ? "default" : "pointer", opacity: sending ? 0.7 : 1 }}
                >
                  {sending ? "Sender..." : "Send"}
                </button>
              </form>
            )}
          </div>
          <style>{`@keyframes tilgang-fade { from { opacity: 0; } to { opacity: 1; } }`}</style>
        </div>
      )}
    </div>
  );
}

function IntroLine({ children, delay }: { children: React.ReactNode; delay: number }) {
  const ref = useRef<HTMLParagraphElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.6 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <p
      ref={ref}
      className="tilgang-intro-line"
      style={{
        fontFamily: "serif",
        fontStyle: "italic",
        fontSize: "clamp(1.25rem, 4.2vw, 2rem)",
        fontWeight: 600,
        color: "#0A1628",
        lineHeight: 1.7,
        margin: "0 0 28px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 1.2s ease ${delay}s, transform 1.2s ease ${delay}s`,
      }}
    >
      {children}
    </p>
  );
}

function IntroLines() {
  return (
    <div>
      <IntroLine delay={0}>Forandringer fejler sjældent fordi teknologien er forkert.</IntroLine>
      <IntroLine delay={0.6}>
        De fejler fordi noget <strong style={{ fontWeight: 800 }}>oplagt</strong> går tabt undervejs.
      </IntroLine>
      <IntroLine delay={1.2}>
        Fra beslutning til virkelighed. Fra afsender til modtager.
      </IntroLine>
    </div>
  );
}
