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
        @media (max-width: 767px) {
          .aif-hero-title { font-size: 2.8rem !important; line-height: 1.15 !important; }
          .aif-body-text { font-size: 1.1rem !important; }
          .aif-cta-text { font-size: clamp(1.6rem, 7vw, 2.4rem) !important; }
          .aif-hero-img { object-fit: cover !important; object-position: center 30% !important; }
          .aif-hero-section { min-height: 90vh !important; align-items: stretch !important; }
          .aif-hero-content {
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            align-items: center !important;
            text-align: center !important;
            width: 100% !important;
            padding: 32px 24px 48px !important;
            min-height: calc(90vh - 72px) !important;
            box-sizing: border-box !important;
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
          className="aif-hero-section"
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
          <img
            src={heroImg}
            alt=""
            aria-hidden="true"
            className="aif-hero-img"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, rgba(10,22,40,0.6) 0%, rgba(10,22,40,0.78) 100%)",
            }}
          />
          <div className="aif-hero-content" style={{ position: "relative", zIndex: 1, padding: "120px 6vw 100px", textAlign: "left", alignSelf: "stretch", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center" }}>
            <p
              style={{
                fontFamily: "serif",
                fontSize: "0.85rem",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: RED,
                marginBottom: 32,
              }}
            >
              AI og forandring
            </p>
            <h1
              className="aif-hero-title"
              style={{
                fontFamily: "serif",
                fontSize: "5rem",
                fontWeight: 700,
                color: "#F5F0E8",
                lineHeight: 1.1,
                margin: "0 auto 0",
                maxWidth: 760,
              }}
            >
              Forandringen er i gang<br />og det går stærkt…
            </h1>
          </div>
        </section>

        {/* TEKST-SEKTIONER */}
        <div style={{ maxWidth: 680, marginInline: "auto", padding: "0 24px" }}>

          <AnimatedSection delay={0}>
            <div style={{ padding: "88px 0 80px", borderBottom: `1px solid rgba(10,22,40,0.1)` }}>
              {[
                "Dine konkurrenter taler om AI.",
                "Dine medarbejdere spørger om AI.",
                "Dine kunder forventer det.",
              ].map((line, i) => (
                <p
                  key={i}
                  className="aif-body-text"
                  style={{
                    fontFamily: "serif",
                    fontSize: "1.25rem",
                    lineHeight: 1.7,
                    color: NAVY,
                    margin: "0 0 4px",
                  }}
                >
                  {line}
                </p>
              ))}
              <p
                className="aif-body-text"
                style={{
                  fontFamily: "serif",
                  fontSize: "1.25rem",
                  lineHeight: 1.7,
                  color: NAVY,
                  margin: "28px 0 0",
                  fontStyle: "italic",
                }}
              >
                Og alligevel er ingenting egentlig forandret.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div style={{ padding: "80px 0", borderBottom: `1px solid rgba(10,22,40,0.1)` }}>
              <p
                className="aif-body-text"
                style={{
                  fontFamily: "serif",
                  fontSize: "1.25rem",
                  lineHeight: 1.7,
                  color: NAVY,
                  margin: "0 0 24px",
                  fontWeight: 700,
                }}
              >
                Det er ikke teknologien det handler om.
              </p>
              <p
                className="aif-body-text"
                style={{
                  fontFamily: "serif",
                  fontSize: "1.25rem",
                  lineHeight: 1.7,
                  color: "#2a3a52",
                  margin: "0 0 28px",
                }}
              >
                De fleste implementeringer fejler ikke fordi systemet er dårligt.
                De fejler fordi ingen stillede de rigtige spørgsmål inden.
              </p>
              {[
                "Hvem skal bruge det her?",
                "Hvad stopper dem?",
                "Hvad går der tabt hvis vi gør det forkert?",
              ].map((q, i) => (
                <p
                  key={i}
                  className="aif-body-text"
                  style={{
                    fontFamily: "serif",
                    fontSize: "1.25rem",
                    lineHeight: 1.7,
                    color: "#2a3a52",
                    fontStyle: "italic",
                    margin: "0 0 4px",
                  }}
                >
                  {q}
                </p>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div style={{ padding: "80px 0 96px" }}>
              <p
                className="aif-body-text"
                style={{
                  fontFamily: "serif",
                  fontSize: "1.25rem",
                  lineHeight: 1.7,
                  color: "#2a3a52",
                  margin: "0 0 8px",
                }}
              >
                Forandring sker ikke fordi et system er rullet ud.
              </p>
              <p
                className="aif-body-text"
                style={{
                  fontFamily: "serif",
                  fontSize: "1.25rem",
                  lineHeight: 1.7,
                  color: "#2a3a52",
                  margin: "0 0 28px",
                }}
              >
                Det sker fordi nogen har forstået hvad der faktisk stopper folk.
              </p>
              <p
                className="aif-body-text"
                style={{
                  fontFamily: "serif",
                  fontSize: "1.25rem",
                  lineHeight: 1.7,
                  color: NAVY,
                  fontWeight: 700,
                  margin: 0,
                }}
              >
                Det er det jeg arbejder med.
              </p>
            </div>
          </AnimatedSection>

        </div>

        {/* CTA */}
        <AnimatedSection delay={0}>
          <section
            style={{
              backgroundColor: BEIGE,
              padding: "0 24px 120px",
              textAlign: "center",
            }}
          >
            <p
              className="aif-cta-text"
              style={{
                fontFamily: "serif",
                fontStyle: "italic",
                fontSize: "clamp(1.6rem, 4vw, 2.6rem)",
                color: NAVY,
                margin: 0,
              }}
            >
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
          </section>
        </AnimatedSection>

        {/* CLOSING */}
        <section
          style={{
            backgroundColor: NAVY,
            padding: "80px 24px",
            textAlign: "center",
          }}
        >
          <a
            href="/"
            style={{
              fontFamily: "serif",
              fontSize: "1.5rem",
              color: "rgba(245,240,232,0.5)",
              textDecoration: "none",
            }}
          >
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
