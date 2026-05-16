import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLogo } from "@/components/SiteLogo";
import { MenuIcon } from "@/components/MenuIcon";

export const Route = createFileRoute("/tilgang")({
  head: () => ({
    meta: [
      { title: "Min tilgang — Jonas K.P. Sørensen" },
      {
        name: "description",
        content:
          "Strategien er solid. Forankringen fejler. Fem observationer om hvorfor forandringer ikke lander.",
      },
      { property: "og:title", content: "Min tilgang — Jonas K.P. Sørensen" },
      {
        property: "og:description",
        content:
          "Strategien er solid. Forankringen fejler. Fem observationer om hvorfor forandringer ikke lander.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: TilgangPage,
});

const NAVY = "#0A1628";
const BEIGE = "#F5F0E8";
const RED = "#C0281E";
const MUTED_ON_DARK = "#94a3b8";
const MUTED_ON_LIGHT = "#6b6157";

type Statement = {
  lines: string[];
  caption: string;
  dark: boolean;
};

const statements: Statement[] = [
  {
    lines: ["Vi har en strategi.", "Den er på 40 sider.", "Ingen har læst den."],
    caption: "Et dokument er ikke en retning. Det er papir med ambitioner.",
    dark: true,
  },
  {
    lines: [
      "Alle nikker i mødelokalet.",
      "Ingen gør noget bagefter.",
      "Det kalder vi beslutninger.",
    ],
    caption:
      "Fordi beslutninger tages af organisationen. Forandringer leves af mennesker.",
    dark: false,
  },
  {
    lines: [
      "Teknologien er rullet ud.",
      "Adoption er 23%.",
      "Projektet er lukket.",
    ],
    caption: "Mening kan ikke installeres. Den skal opdages.",
    dark: true,
  },
  {
    lines: [
      "Vi kommunikerer konstant.",
      "Ingen forstår budskabet.",
      "Vi kommunikerer mere.",
    ],
    caption:
      "Budskabet er skrevet til afsenderen. Ikke til mennesket der skal handle på det.",
    dark: false,
  },
  {
    lines: [
      "Vi designede det til brugerne.",
      "Vi spurgte dem aldrig.",
      "De bruger det ikke.",
    ],
    caption: "Antagelser om mennesker er ikke det samme som viden om dem.",
    dark: true,
  },
];

function TilgangPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#0D1B2A] text-cream pt-[72px] md:pt-0">
      <style>{`
        .tilgang-nav-link:hover { color: ${RED} !important; }
        @media (max-width: 768px) {
          .tilgang-hero { padding-top: 96px !important; padding-bottom: 96px !important; }
          .tilgang-hero h1 { font-size: clamp(2rem, 9vw, 3rem) !important; }
          .tilgang-statement { padding-top: 80px !important; padding-bottom: 80px !important; padding-left: 24px !important; padding-right: 24px !important; }
          .tilgang-statement h2 { font-size: clamp(1.5rem, 6vw, 2rem) !important; }
          .tilgang-statement p { font-size: 0.95rem !important; }
          .tilgang-cta { padding-top: 80px !important; padding-bottom: 80px !important; padding-left: 24px !important; padding-right: 24px !important; }
          .tilgang-cta h2 { font-size: clamp(1.8rem, 7vw, 2.2rem) !important; }
        }
      `}</style>

      {/* NAV BAR */}
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
              { label: "Min tilgang", href: "/tilgang" },
              { label: "Kontakt", href: "/#kontakt" },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="tilgang-nav-link"
                style={{
                  fontFamily: "serif",
                  fontSize: "0.9rem",
                  fontWeight: 400,
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
          <Link to="/tilgang" onClick={() => setMenuOpen(false)} style={{ fontFamily: "serif", fontSize: "1.8rem", color: NAVY, textDecoration: "none" }}>Min tilgang</Link>
          <Link to="/cv" onClick={() => setMenuOpen(false)} style={{ fontFamily: "serif", fontSize: "1.8rem", color: NAVY, textDecoration: "none" }}>CV</Link>
          <a href="/#kontakt" onClick={() => setMenuOpen(false)} style={{ fontFamily: "serif", fontSize: "1.8rem", color: NAVY, textDecoration: "none" }}>Kontakt</a>
        </div>
      )}

      {/* HERO */}
      <section
        className="tilgang-hero"
        style={{
          backgroundColor: BEIGE,
          paddingTop: 160,
          paddingBottom: 160,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "100%", maxWidth: 1400, padding: "0 64px", display: "flex", justifyContent: "center" }}>
          <h1
            style={{
              fontWeight: 700,
              color: "#000000",
              fontFamily: "serif",
              fontSize: "clamp(2.6rem, 6.5vw, 6rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              textAlign: "center",
              margin: 0,
            }}
          >
            Kunsten i at finde<br />hvad der går tabt.
          </h1>
        </div>
      </section>

      {/* STATEMENTS */}
      {statements.map((s, i) => {
        const bg = s.dark ? NAVY : BEIGE;
        const fg = s.dark ? "#F5F3EE" : "#0A1628";
        const muted = s.dark ? MUTED_ON_DARK : MUTED_ON_LIGHT;
        return (
          <section
            key={i}
            className="tilgang-statement"
            style={{
              backgroundColor: bg,
              paddingTop: 120,
              paddingBottom: 120,
              paddingLeft: 24,
              paddingRight: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <div style={{ width: "100%", maxWidth: 880 }}>
              <h2
                style={{
                  color: fg,
                  fontFamily: "serif",
                  fontWeight: 700,
                  fontSize: "clamp(1.8rem, 3.2vw, 2.5rem)",
                  lineHeight: 1.25,
                  letterSpacing: "-0.01em",
                  margin: 0,
                }}
              >
                {s.lines.map((line, idx) => (
                  <span key={idx} style={{ display: "block" }}>
                    {line}
                  </span>
                ))}
              </h2>
              <p
                style={{
                  color: muted,
                  fontFamily: "serif",
                  fontStyle: "italic",
                  fontSize: "1rem",
                  lineHeight: 1.6,
                  marginTop: 32,
                  marginBottom: 0,
                }}
              >
                {s.caption}
              </p>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section
        className="tilgang-cta"
        style={{
          backgroundColor: BEIGE,
          paddingTop: 120,
          paddingBottom: 120,
          paddingLeft: 24,
          paddingRight: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div style={{ width: "100%", maxWidth: 720 }}>
          <h2
            style={{
              color: NAVY,
              fontFamily: "serif",
              fontWeight: 700,
              fontSize: "clamp(1.8rem, 3.2vw, 2.5rem)",
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            Kender du hullet?
          </h2>
          <p
            style={{
              color: MUTED_ON_DARK,
              fontFamily: "serif",
              fontSize: "1.1rem",
              marginTop: 16,
              marginBottom: 32,
            }}
          >
            jonas@jkps.dk
          </p>
          <a
            href="mailto:jonas@jkps.dk"
            style={{
              display: "inline-block",
              backgroundColor: RED,
              color: "#F5F3EE",
              fontFamily: "serif",
              fontSize: "1rem",
              fontWeight: 500,
              letterSpacing: "0.02em",
              padding: "14px 28px",
              textDecoration: "none",
              borderRadius: 2,
            }}
          >
            Kontakt mig →
          </a>
          <div style={{ marginTop: 32 }}>
            <Link
              to="/"
              style={{
                color: MUTED_ON_DARK,
                fontFamily: "serif",
                fontSize: "0.9rem",
                textDecoration: "underline",
                textUnderlineOffset: "4px",
              }}
            >
              ← Tilbage til portfolio
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
