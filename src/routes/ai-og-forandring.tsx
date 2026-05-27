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
          "De fleste implementeringer fejler ikke fordi systemet er dårligt. De fejler fordi ingen stillede de rigtige spørgsmål inden.",
      },
      { property: "og:title", content: "AI og forandring — Jonas K.P. Sørensen" },
      {
        property: "og:description",
        content:
          "De fleste implementeringer fejler ikke fordi systemet er dårligt. De fejler fordi ingen stillede de rigtige spørgsmål inden.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: AiOgForandringPage,
});

const NAVY = "#0A1628";
const BEIGE = "#E8E2D9";
const RED = "#C0281E";

function AiOgForandringPage() {
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
        .aif-section { opacity: 0; transform: translateY(24px); transition: opacity 0.8s ease, transform 0.8s ease; }
        .aif-section.is-visible { opacity: 1; transform: translateY(0); }
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

        /* Split content sections */
        .aif-split { display: flex; flex-direction: row; min-height: 100vh; }
        .aif-split-img { flex: 0 0 45%; position: relative; background: #0D1B2A; }
        .aif-split-img img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .aif-split-text {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 80px 64px;
          background: #ffffff;
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
        @media (max-width: 767px) {
          .aif-split { flex-direction: column; min-height: auto; }
          .aif-split-img { flex: none; height: 280px; }
          .aif-split-text { padding: 48px 24px; }
          .aif-split-text p { font-size: 1.05rem !important; }
        }

        /* Desktop split layout */
        .aif-hero-section { display: flex; flex-direction: row; min-height: 90vh; }
        .aif-hero-left {
          width: 35%;
          flex-shrink: 0;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 64px 48px;
          box-sizing: border-box;
        }
        .aif-hero-right {
          flex: 1;
          position: relative;
          overflow: hidden;
        }
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

        /* Mobile: full-width image with overlay */
        @media (max-width: 767px) {
          .aif-hero-section { flex-direction: column; min-height: 90vh; }
          .aif-hero-left { display: none; }
          .aif-hero-right { width: 100%; flex: 1; min-height: 90vh; position: relative; }
          .aif-hero-img { object-position: center 30% !important; }
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
          .aif-body-text { font-size: 1.1rem !important; }
          .aif-cta-text { font-size: clamp(1.6rem, 7vw, 2.4rem) !important; }
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

        {/* HERO — split layout */}
        <section className="aif-hero-section">

          {/* Venstre: tekst på hvid baggrund (desktop only) */}
          <div className="aif-hero-left">
            <p style={{
              fontFamily: "serif",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: RED,
              margin: "0 0 32px",
            }}>
              AI og forandring
            </p>
            <h1 style={{
              fontFamily: "serif",
              fontSize: "2.4rem",
              fontWeight: 700,
              color: NAVY,
              lineHeight: 1.15,
              margin: 0,
            }}>
              Forandringen<br />er i gang<br />og det går<br />stærkt…
            </h1>
          </div>

          {/* Højre: billede */}
          <div className="aif-hero-right">
            <img
              src={heroImg}
              alt=""
              aria-hidden="true"
              className="aif-hero-img"
            />
            {/* Mobile overlay */}
            <div className="aif-hero-mobile-overlay" aria-hidden="true" />
            {/* Mobile tekst */}
            <div className="aif-hero-mobile-content">
              <p style={{
                fontFamily: "serif",
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: RED,
                margin: 0,
              }}>
                AI og forandring
              </p>
              <h1 style={{
                fontFamily: "serif",
                fontSize: "2.4rem",
                fontWeight: 700,
                color: "#F5F0E8",
                lineHeight: 1.15,
                margin: 0,
                textShadow: "0 2px 12px rgba(0,0,0,0.6)",
              }}>
                Forandringen<br />er i gang<br />og det går stærkt…
              </h1>
            </div>
          </div>

        </section>

        {/* SEKTION 1 — billede venstre, tekst højre */}
        <AnimatedSection delay={0}>
          <div className="aif-split">
            <div className="aif-split-img" />
            <div className="aif-split-text">
              <p>Konkurrenterne nævner det. Medarbejderne spørger om det. Kunderne forventer det.</p>
              <p>Så de fleste af os prøver bare at følge med. Ikke fordi vi har en plan — men fordi frygten for at blive overhalet er reel.</p>
              <p style={{ fontStyle: "italic", fontSize: "1.3rem", fontWeight: 500, lineHeight: 1.6 }}>Og vi hopper med. I håbet om ikke at falde af.</p>
            </div>
          </div>
        </AnimatedSection>

        {/* SEKTION 2 — tekst venstre, billede højre */}
        <AnimatedSection delay={0}>
          <div className="aif-split" style={{ flexDirection: "row-reverse" }}>
            <div className="aif-split-img" />
            <div className="aif-split-text" style={{ background: "#E8E2D9" }}>
              <p>Historisk set har mønsteret gentaget sig. De der overlevede dampmaskinens indtog, elektriciteten og internettet var ikke dem der ignorerede forandringen — eller dem der bare købte teknologien.</p>
              <p style={{ fontStyle: "italic", fontWeight: 700, fontSize: "1.3rem", lineHeight: 1.6 }}>Det var dem der forstod hvad den ændrede ved måden mennesker arbejder og tænker.</p>
            </div>
          </div>
        </AnimatedSection>

        {/* SEKTION 3 — billede venstre, tekst højre */}
        <AnimatedSection delay={0}>
          <div className="aif-split">
            <div className="aif-split-img" />
            <div className="aif-split-text">
              <p>Organisationer investerer i AI-værktøjer og opdager at ingenting ændrer sig. Medarbejderne bruger dem ikke. Kunderne mærker ingen forskel. Ledelsen ved ikke hvorfor.</p>
              <p style={{ fontStyle: "italic", fontWeight: 700, fontSize: "1.3rem", lineHeight: 1.6 }}>Det er ikke et teknisk problem. Det er et menneskeligt et.</p>
              <p>AI kan generere, automatisere og optimere. Det den ikke kan er at forstå hvorfor folk gør som de gør — og designe udenom det.</p>
            </div>
          </div>
        </AnimatedSection>

        {/* SEKTION 4 — centreret, fuld bredde */}
        <AnimatedSection delay={0}>
          <section style={{ backgroundColor: "#ffffff", padding: "0 0 120px" }}>
            {/* Billede placeholder fuld bredde */}
            <div style={{ width: "100%", maxHeight: 500, height: "40vw", minHeight: 240, backgroundColor: "#0D1B2A" }} />
            {/* Centreret tekst */}
            <div style={{ maxWidth: 760, marginInline: "auto", padding: "80px 32px 60px", textAlign: "center" }}>
              {[
                "De der klarer sig bedst, er dem der kan bevæge sig i begge lag.",
                "Det kræver nogen der taler begge sprog.",
                "Det felt er der ikke mange der arbejder i. Men det er præcis det her handler om.",
              ].map((line, i) => (
                <p key={i} style={{
                  fontFamily: "serif",
                  fontSize: i === 0 ? "1.7rem" : "1.4rem",
                  fontWeight: i === 0 ? 700 : (i === 1 ? 600 : 400),
                  fontStyle: i === 2 ? "italic" : "normal",
                  lineHeight: 1.5,
                  color: NAVY,
                  margin: i === 1 ? "8px 0 36px" : "0 0 28px",
                  ...(i === 1 ? { borderLeft: `3px solid ${RED}`, paddingLeft: 20 } : {}),
                }}>
                  {line}
                </p>
              ))}
              <div style={{ marginTop: 64, paddingTop: 40, borderTop: `1px solid rgba(10,22,40,0.1)` }}>
                <p style={{
                  fontFamily: "serif",
                  fontStyle: "italic",
                  fontSize: "clamp(1.9rem, 5vw, 3rem)",
                  color: NAVY,
                  margin: 0,
                  lineHeight: 1.25,
                }}>
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); setContactOpen(true); }}
                    className="aif-tales-link"
                    style={{ color: RED, textDecoration: "none", cursor: "pointer" }}
                  >
                    Lad os tales ved
                  </a>
                  .
                </p>
              </div>
            </div>
          </section>
        </AnimatedSection>

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

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      ref={(el) => {
        if (!el) return;
        const io = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisible(true);
              io.disconnect();
            }
          },
          { threshold: 0.12 }
        );
        io.observe(el);
      }}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
