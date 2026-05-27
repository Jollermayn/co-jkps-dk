import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
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
        @keyframes aif-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }

        /* Split content sections — 35% tekst / 65% billede, identisk med hero */
        .aif-split { display: flex; flex-direction: row; min-height: 100vh; }
        .aif-split-img { flex: 1; position: relative; background: #0D1B2A; overflow: hidden; }
        .aif-split-img img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .aif-split-text {
          flex: 0 0 35%;
          width: 35%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 64px 48px;
          background: #E8E2D9;
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
          .aif-split { flex-direction: column !important; min-height: auto; }
          .aif-split-img { flex: none; width: 100%; height: 50vh; }
          .aif-split-img img { object-fit: cover; object-position: center; }
          .aif-split-text { flex: none; width: 100%; padding: 48px 32px; }
        }
        /* Mobil (≤768px): reduceret billedhøjde, tættere padding */
        @media (max-width: 768px) {
          .aif-split-img { height: 40vh; }
          .aif-split-text { padding: 32px 24px; }
          .aif-split-text p { font-size: 1.05rem !important; }
        }

        /* Desktop split layout */
        .aif-hero-section { display: flex; flex-direction: row; height: calc(100vh - 72px); background: #E8E2D9; margin: 0; position: relative; }
        .aif-hero-left {
          width: 35%;
          flex-shrink: 0;
          background: #E8E2D9;
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

        /* Tablet + Mobil: hero stacker med overlay */
        @media (max-width: 1024px) {
          .aif-hero-section { flex-direction: column; }
          .aif-hero-left { display: none; }
          .aif-hero-right { width: 100%; flex: 1; position: relative; }
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
              fontWeight: 400,
              color: NAVY,
              lineHeight: 1.2,
              margin: 0,
              opacity: 0,
              animation: "aif-fade 0.8s ease 0.2s both",
            }}>
              Forandringen er begyndt
            </h1>
            <p style={{
              fontFamily: "serif",
              fontSize: "2.6rem",
              fontWeight: 700,
              fontStyle: "italic",
              color: NAVY,
              lineHeight: 1.2,
              margin: "2rem 0 0",
              opacity: 0,
              animation: "aif-fade 0.8s ease 2s both",
            }}>
              og det går stærkt...
            </p>
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
                fontWeight: 400,
                color: "#F5F0E8",
                lineHeight: 1.2,
                margin: 0,
                textShadow: "0 2px 12px rgba(0,0,0,0.6)",
                opacity: 0,
                animation: "aif-fade 0.8s ease 0.2s both",
              }}>
                Forandringen er begyndt
              </h1>
              <p style={{
                fontFamily: "serif",
                fontSize: "2.6rem",
                fontWeight: 700,
                fontStyle: "italic",
                color: "#F5F0E8",
                lineHeight: 1.2,
                margin: "2rem 0 0",
                textShadow: "0 2px 12px rgba(0,0,0,0.6)",
                opacity: 0,
                animation: "aif-fade 0.8s ease 2s both",
              }}>
                og det går stærkt...
              </p>
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
            <div className="aif-split-text">
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

        {/* SEKTION 4 — tekst venstre, billede højre */}
        <AnimatedSection delay={0}>
          <div className="aif-split" style={{ flexDirection: "row-reverse" }}>
            <div className="aif-split-img" />
            <div className="aif-split-text">
              <p style={{ fontStyle: "italic", fontWeight: 700, fontSize: "1.3rem", lineHeight: 1.5 }}>Det vi ikke må miste er evnen til at tænke selv.</p>
              <p>Kreativitet, empati og dømmekraft kommer ikke fra et system. De kommer fra mennesker der har rum til at reflektere — og mod til at handle på det de ser.</p>
              <p>AI er et kraftfuldt redskab. Men redskabet er aldrig svaret. Det er den menneskelige fornuft bag det der afgør om det bliver til noget godt.</p>
              <p style={{ fontStyle: "italic", fontWeight: 500, fontSize: "1.2rem", lineHeight: 1.6 }}>Vær nysgerrig på udviklingen. Brug teknologien. Men behold dig selv i centrum af det.</p>
            </div>
          </div>
        </AnimatedSection>

        {/* SEKTION 5 — centreret, fuld bredde */}
        <AnimatedSection delay={0}>
          <section style={{ backgroundColor: "#E8E2D9" }}>

            {/* Navy-boks med tekst indeni */}
            <div style={{
              width: "100%",
              height: "40vw",
              minHeight: 320,
              maxHeight: 560,
              backgroundColor: "#0D1B2A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "48px 32px",
              boxSizing: "border-box",
            }}>
              <div style={{ maxWidth: 680, width: "100%", textAlign: "center" }}>
                <p style={{
                  fontFamily: "serif",
                  fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)",
                  fontWeight: 700,
                  lineHeight: 1.5,
                  color: BEIGE,
                  margin: "0 0 24px",
                }}>
                  De der klarer sig bedst, er dem der kan bevæge sig i begge lag.
                </p>
                <p style={{
                  fontFamily: "serif",
                  fontSize: "clamp(1rem, 1.8vw, 1.25rem)",
                  fontWeight: 400,
                  fontStyle: "italic",
                  lineHeight: 1.6,
                  color: `rgba(232,226,217,0.75)`,
                  margin: 0,
                }}>
                  Det felt er der ikke mange der arbejder i. Men det er præcis det her handler om.
                </p>
              </div>
            </div>

            {/* CTA — beige baggrund */}
            <div style={{ padding: "96px 32px", textAlign: "center" }}>
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
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
