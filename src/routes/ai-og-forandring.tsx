import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SiteLogo } from "@/components/SiteLogo";
import { MenuIcon } from "@/components/MenuIcon";
import heroImg from "@/assets/ai-og-forandring-hero.png";

export const Route = createFileRoute("/ai-og-forandring")({
  head: () => ({
    meta: [
      { title: "AI og forandring — Jonas K.P. Sørensen" },
      {
        name: "description",
        content:
          "De fleste AI-implementeringer fejler ikke fordi teknologien er dårlig. De fejler fordi ingen stillede de rigtige spørgsmål inden de gik i gang.",
      },
      { property: "og:title", content: "AI og forandring — Jonas K.P. Sørensen" },
      {
        property: "og:description",
        content:
          "De fleste AI-implementeringer fejler ikke fordi teknologien er dårlig. De fejler fordi ingen stillede de rigtige spørgsmål inden de gik i gang.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: AiOgForandringPage,
});

const NAVY = "#0A1628";
const BEIGE = "#E8E2D9";
const RED = "#C0281E";

const sections = [
  {
    heading: "Det går stærkt. Det ved du godt.",
    body: [
      "Dine konkurrenter taler om AI.\nDine medarbejdere spørger om AI.\nDine kunder forventer at du har styr på AI.",
      "Og du har måske allerede købt noget. Et abonnement. Et kursus. En konsulent der præsenterede en roadmap med fine pile og farver.",
      "Men ingenting er egentlig forandret.",
    ],
  },
  {
    heading: "Det er ikke din skyld.",
    body: [
      "De fleste AI-implementeringer fejler ikke fordi teknologien er dårlig.\nDe fejler fordi ingen stillede de rigtige spørgsmål inden de gik i gang.",
      "Hvem skal bruge det her?\nHvad løser det for dem?\nHvad går der tabt hvis vi gør det forkert?",
      "De spørgsmål er ikke tekniske. De er menneskelige.\nOg de fleste teknologileverandører stiller dem ikke.",
    ],
  },
  {
    heading: "Teknologien er klar. Mennesket er ikke.",
    body: [
      "AI kan automatisere, generere og optimere hurtigere end nogensinde.\nMen den person der skal bruge det i en travl hverdag — med deadlines, kollegaer og gamle vaner — er den samme som altid.",
      "Forandring sker ikke fordi et system er rullet ud.\nDet sker fordi nogen har forstået hvad der faktisk stopper folk.\nOg designet udenom det.",
    ],
  },
  {
    heading: "Det er det jeg arbejder med.",
    body: [
      "Ikke AI som teknologi. AI som forandring.",
      "Skæringsfeltet mellem det nye system og den rigtige person.\nMellem ledelsesbeslutningen og hverdagsvirkeligheden.\nMellem hvad der er muligt og hvad der faktisk virker.",
      "Jeg hjælper organisationer med at stille de rigtige spørgsmål — inden det går galt.",
    ],
  },
];

function AiOgForandringPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ backgroundColor: BEIGE, minHeight: "100vh" }}>
      <style>{`
        .aif-nav-link:hover { color: ${RED} !important; }
        .aif-section { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .aif-section.is-visible { opacity: 1; transform: translateY(0); }
        .aif-cta-link { display: inline-block; color: ${RED}; font-family: serif; font-size: 1.25rem; font-weight: 700; text-decoration: none; border-bottom: 2px solid ${RED}; padding-bottom: 2px; transition: opacity 0.2s ease; }
        .aif-cta-link:hover { opacity: 0.75; }
        .aif-divider { width: 48px; height: 2px; background: ${RED}; margin: 0 auto; }
        @media (max-width: 767px) {
          .aif-hero-title { font-size: 3rem !important; }
          .aif-hero-sub { font-size: 1.1rem !important; }
          .aif-section-heading { font-size: 1.75rem !important; }
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
              { label: "AI og forandring", href: "/ai-og-forandring" },
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
          <Link to="/ai-og-forandring" onClick={() => setMenuOpen(false)} style={{ fontFamily: "serif", fontSize: "1.8rem", color: NAVY, textDecoration: "none" }}>AI og forandring</Link>
          <Link to="/cv" onClick={() => setMenuOpen(false)} style={{ fontFamily: "serif", fontSize: "1.8rem", color: NAVY, textDecoration: "none" }}>CV</Link>
          <a href="/#kontakt" onClick={() => setMenuOpen(false)} style={{ fontFamily: "serif", fontSize: "1.8rem", color: NAVY, textDecoration: "none" }}>Kontakt</a>
        </div>
      )}

      <main style={{ paddingTop: 72 }}>

        {/* HERO */}
        <section
          style={{
            position: "relative",
            minHeight: "90vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            overflow: "hidden",
          }}
        >
          {/* Baggrundsbillede */}
          <img
            src={heroImg}
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
          {/* Mørkt overlay */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, rgba(10,22,40,0.65) 0%, rgba(10,22,40,0.75) 100%)",
            }}
          />
          {/* Indhold */}
          <div style={{ position: "relative", zIndex: 1, padding: "120px 24px 100px" }}>
            <p
              style={{
                fontFamily: "serif",
                fontSize: "0.85rem",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: RED,
                marginBottom: 24,
              }}
            >
              AI og forandring
            </p>
            <h1
              className="aif-hero-title"
              style={{
                fontFamily: "serif",
                fontSize: "4.5rem",
                fontWeight: 700,
                color: "#F5F0E8",
                lineHeight: 1.1,
                margin: "0 auto 32px",
                maxWidth: 820,
              }}
            >
              En side til dem der ved at noget sker — men ikke helt ved hvad.
            </h1>
            <div
              style={{
                width: 48,
                height: 2,
                background: RED,
                margin: "0 auto",
              }}
            />
          </div>
        </section>

        {/* CONTENT SECTIONS */}
        <div style={{ maxWidth: 760, marginInline: "auto", padding: "0 24px" }}>
          {sections.map((section, i) => (
            <AnimatedSection key={i}>
              <section
                style={{
                  padding: "80px 0",
                  borderBottom: i < sections.length - 1 ? `1px solid rgba(10,22,40,0.12)` : "none",
                }}
              >
                <h2
                  className="aif-section-heading"
                  style={{
                    fontFamily: "serif",
                    fontSize: "2.25rem",
                    fontWeight: 700,
                    color: NAVY,
                    lineHeight: 1.2,
                    marginBottom: 40,
                  }}
                >
                  {section.heading}
                </h2>
                {section.body.map((paragraph, j) => (
                  <p
                    key={j}
                    style={{
                      fontFamily: "serif",
                      fontSize: "1.2rem",
                      lineHeight: 1.75,
                      color: "#2a3a52",
                      marginBottom: j < section.body.length - 1 ? 24 : 0,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            </AnimatedSection>
          ))}

          {/* CTA */}
          <AnimatedSection>
            <section style={{ padding: "80px 0 120px", textAlign: "center" }}>
              <h2
                className="aif-section-heading"
                style={{
                  fontFamily: "serif",
                  fontSize: "2.25rem",
                  fontWeight: 700,
                  color: NAVY,
                  lineHeight: 1.2,
                  marginBottom: 24,
                }}
              >
                Lad os tales ved.
              </h2>
              <p
                style={{
                  fontFamily: "serif",
                  fontSize: "1.2rem",
                  lineHeight: 1.75,
                  color: "#2a3a52",
                  marginBottom: 48,
                  maxWidth: 520,
                  marginInline: "auto",
                }}
              >
                Ikke et tilbud. Ikke en pitch.
                <br />
                Bare en samtale om hvor I er og hvad der stopper jer.
              </p>
              <a
                href="mailto:jonas@jkps.dk"
                className="aif-cta-link"
              >
                Kontakt →
              </a>
            </section>
          </AnimatedSection>
        </div>
      </main>

      {/* FOOTER */}
      <footer
        style={{
          backgroundColor: NAVY,
          padding: "32px 24px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "serif",
            fontSize: "0.85rem",
            color: "rgba(245,240,232,0.4)",
            margin: 0,
          }}
        >
          © {new Date().getFullYear()} Jonas K.P. Sørensen
        </p>
      </footer>
    </div>
  );
}

function AnimatedSection({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  const ref = (el: HTMLDivElement | null) => {
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
  };

  return (
    <div
      ref={ref}
      className={`aif-section${visible ? " is-visible" : ""}`}
    >
      {children}
    </div>
  );
}
