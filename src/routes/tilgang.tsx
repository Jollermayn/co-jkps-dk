import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLogo } from "@/components/SiteLogo";
import { MenuIcon } from "@/components/MenuIcon";
import mazeHero from "@/assets/maze-hero.png";

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
};

const cells: Cell[] = [
  {
    heading: "Strategien fylder 40 sider. Ingen har åbnet den.",
    silver:
      "Et dokument er ikke en retning. Jeg designer indhold der læses — og huskes.",
  },
  {
    heading: "Alle var enige i mødelokalet. Intet skete bagefter.",
    silver:
      "Enighed er ikke forankring. Jeg finder hullet mellem beslutningen og hverdagen.",
  },
  {
    heading: "Systemet er rullet ud. Ingen bruger det.",
    silver: "Mening kan ikke installeres. Jeg designer den ind.",
  },
  {
    heading: "De designede det til brugerne. De glemte at spørge dem.",
    silver: "Antagelser er ikke viden. Jeg går ud og finder den.",
  },
];

function TilgangPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  return (
    <div style={{ backgroundColor: BEIGE, minHeight: "100vh" }}>
      <style>{`
        .tilgang-nav-link:hover { color: ${RED} !important; }
        .tilgang-cell-overlay { opacity: 0; transition: opacity 0.3s ease; }
        .tilgang-cell:hover .tilgang-cell-overlay { opacity: 1; }
        @media (max-width: 767px) {
          .tilgang-hero-h1 { font-size: 3rem !important; }
          .tilgang-closing-h2 { font-size: 1.9rem !important; }
          .tilgang-grid { grid-template-columns: 1fr !important; }
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
            padding: "160px 24px 0",
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
            Kunsten i at belyse,<br />hvad der går tabt.
          </h1>
        </section>

        <img
          src={mazeHero}
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
            padding: "40px 24px 80px",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: 820, marginInline: "auto" }}>
            {[
              "Forandringer fejler sjældent fordi teknologien er forkert.",
              "De fejler fordi noget går tabt på vejen.",
              "Mellem beslutning og virkelighed. Mellem afsender og modtager.",
            ].map((line) => (
              <p
                key={line}
                style={{
                  fontFamily: "serif",
                  fontStyle: "italic",
                  fontSize: "1.3rem",
                  fontWeight: 600,
                  color: "#0A1628",
                  lineHeight: 1.6,
                  margin: "0 0 12px",
                }}
              >
                {line}
              </p>
            ))}
          </div>
        </section>

        {/* 2x2 IMAGE GRID */}
        <section
          className="tilgang-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 0,
          }}
        >
          {cells.map((cell, i) => (
            <div
              key={i}
              className="tilgang-cell"
              onMouseEnter={() => setHoverIdx(i)}
              onMouseLeave={() => setHoverIdx(null)}
              style={{
                position: "relative",
                minHeight: 450,
                backgroundColor: "#bdbdbd",
                overflow: "hidden",
                cursor: "default",
              }}
            >
              <div
                className="tilgang-cell-overlay"
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: "rgba(10, 22, 40, 0.8)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  padding: "40px 32px",
                  opacity: hoverIdx === i ? 1 : undefined,
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
                <p
                  style={{
                    marginTop: 20,
                    fontFamily: "serif",
                    fontStyle: "italic",
                    fontSize: "1rem",
                    color: MUTED_ON_DARK,
                    lineHeight: 1.5,
                    maxWidth: 480,
                    margin: "20px 0 0",
                  }}
                >
                  {cell.silver}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* CLOSING + CTA */}
        <section
          style={{
            backgroundColor: NAVY,
            padding: "120px 24px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "serif",
              fontStyle: "italic",
              fontSize: "1.3rem",
              color: "#ffffff",
              lineHeight: 1.5,
              maxWidth: 760,
              margin: "0 auto",
            }}
          >
            Jeg sætter lys på det der går tabt. Formidler det der er svært at
            se. Og designer broen til det der skal ske.
          </p>

          <div style={{ height: 60 }} />

          <h2
            className="tilgang-closing-h2"
            style={{
              fontFamily: "serif",
              fontWeight: 700,
              fontSize: "2.5rem",
              color: "#ffffff",
              margin: 0,
            }}
          >
            Her kan du fange mig.
          </h2>

          <a
            href="mailto:jonas@jkps.dk"
            style={{
              display: "inline-block",
              marginTop: 28,
              backgroundColor: RED,
              color: "#ffffff",
              padding: "14px 28px",
              fontFamily: "serif",
              fontSize: "1rem",
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
                fontFamily: "serif",
                fontSize: "0.95rem",
                color: MUTED_ON_DARK,
                textDecoration: "none",
              }}
            >
              ← Tilbage til portfolio
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
