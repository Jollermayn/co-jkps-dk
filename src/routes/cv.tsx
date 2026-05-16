import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import profilePhoto from "@/assets/profile-photo.png";
import { SiteLogo } from "@/components/SiteLogo";
import { MenuIcon } from "@/components/MenuIcon";

function MobileHeader() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav className="md:hidden no-print" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, backgroundColor: "#F8F7F4", height: 72, padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "flex-end", borderBottom: "1px solid rgba(10, 22, 40, 0.08)" }}>
        <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
          <SiteLogo color="#0A1628" />
        </div>
        <button type="button" aria-label="Åbn menu" onClick={() => setOpen(true)} style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer", display: "inline-flex" }}>
          <MenuIcon />
        </button>
      </nav>
      {open && (
        <div className="md:hidden no-print" style={{ position: "fixed", inset: 0, zIndex: 200, backgroundColor: "#E0D9C8", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32 }}>
          <button type="button" aria-label="Luk menu" onClick={() => setOpen(false)} style={{ position: "absolute", top: 16, right: 24, background: "transparent", border: "none", color: "#0A1628", fontSize: "2rem", lineHeight: 1, padding: 0, cursor: "pointer" }}>
            ×
          </button>
          <Link to="/" onClick={() => setOpen(false)} style={{ fontFamily: "serif", fontSize: "1.8rem", color: "#0A1628", textDecoration: "none" }}>Portfolio</Link>
          <Link to="/tilgang" onClick={() => setOpen(false)} style={{ fontFamily: "serif", fontSize: "1.8rem", color: "#0A1628", textDecoration: "none" }}>Min tilgang</Link>
          <Link to="/cv" onClick={() => setOpen(false)} style={{ fontFamily: "serif", fontSize: "1.8rem", color: "#0A1628", textDecoration: "none" }}>CV</Link>
          <a href="/#kontakt" onClick={() => setOpen(false)} style={{ fontFamily: "serif", fontSize: "1.8rem", color: "#0A1628", textDecoration: "none" }}>Kontakt</a>
        </div>
      )}
    </>
  );
}


export const Route = createFileRoute("/cv")({
  head: () => ({
    meta: [
      { title: "CV — Jonas K.P. Sørensen" },
      {
        name: "description",
        content:
          "CV for Jonas K.P. Sørensen — digital konsulent med fokus på UX, servicedesign og forretning.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: CVPage,
});

const expertise = [
  {
    title: "Indsigt",
    items: ["Research", "Interviews", "Feltobservation", "Co-design", "Workshops", "Mixed methods", "Analyse"],
  },
  {
    title: "Koncept",
    items: ["Konceptudvikling", "Service Design", "Brugerrejser", "Komm.strategi", "Brandudvikling", "Indholdsstrategi", "Procesledelse"],
  },
  {
    title: "Teknologi",
    items: ["Projektledelse", "Koordinering", "Generativ AI", "Microsoft 365", "Power Platform", "Facilitering", "HCI"],
  },
];

const experiencePage1 = [
  {
    name: "Boliga",
    tags: "PRODUCT DESIGN · UX RESEARCH · DATAANALYSE",
    body: "Analyserede brugsdata fra 6,5 mio. månedlige interaktioner på Danmarks største boligplatform. Designede personaliseret onboarding-flow valideret af product owner.",
  },
  {
    name: "Danmarks Radio",
    tags: "DIGITAL PRODUCER · TVÆRGÅENDE KOORDINERING",
    body: "Koordinerede tværgående processer på tværs af redaktioner i Danmarks største medieorganisation. Sikrede redaktionel og teknisk kvalitet under stram tidsstyring.",
  },
  {
    name: "Wolt",
    tags: "SERVICE DESIGN · UX RESEARCH · CO-DESIGN",
    body: "Mixed methods research med interviews, media-go-alongs og feltobservation. Designede tre interventioner i Wolt Partner-appen om transparens og rettigheder.",
  },
];

const experiencePage2 = [
  {
    name: "Danmarks Naturfredningsforening",
    tags: "KOMMUNIKATIONSANSVARLIG",
    body: "Ledede det samlede kommunikations- og produktionssetup. Ansvarlig for strategisk kommunikation og indhold målrettet nye og yngre målgrupper.",
  },
  {
    name: "Amnesty International",
    tags: "KOMMUNIKATION · REDAKTION",
    body: "Omsatte komplekse menneskerettighedstemaer til tilgængeligt indhold for bred dansk offentlighed — uden at kompromittere den journalistiske integritet.",
  },
  {
    name: "Art Spirit Coaching",
    tags: "BRANDUDVIKLING · KONCEPTDESIGN · PLATFORMSUDVIKLING",
    body: "Udviklede brandidentitet, positionering og kommunikationsstrategi fra bunden. Designede brugerrejser og indholdsstrategi for coaching- og psykoterapipraksis.",
  },
];

const education = [
  {
    title: "Cand.it · Digital Design & Interaktive Teknologier",
    meta: "IT-UNIVERSITETET KØBENHAVN · 2022–2024",
    body: "Kandidatuddannelse med fokus på brugercentreret design, interaktionsteknologi og digital transformation. Speciale i co-design og brugerinddragelse.",
  },
  {
    title: "Professionsbachelor · Medie- og sonokommunikation",
    meta: "SONIC COLLEGE, UC SYD · 2013–2016",
    body: "Tværfaglig uddannelse i medieproduktion, lyddesign og kommunikation med stærkt praktisk fundament.",
  },
  {
    title: "Sociologi & Kulturanalyse",
    meta: "SYDDANSK UNIVERSITET. 2011",
    body: "Fagligt afsæt i kulturteori, samfundsanalyse og sociologisk metode.",
  },
];

function Pill({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-block rounded-full border border-[#0D1B2A]/70 px-3 py-[3px] text-[0.78rem] leading-tight text-[#0D1B2A] ${className || ""}`}>
      {children}
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h2 className="text-[0.78rem] tracking-[0.2em] font-semibold text-[#C0281E]">{children}</h2>
      <div aria-hidden className="mt-1 h-px w-10 bg-[#C0281E]" />
    </>
  );
}

function ExperienceItem({ name, tags, body }: { name: string; tags: string; body: string }) {
  return (
    <div>
      <h3
        className="font-display font-bold text-[1.05rem] text-[#0D1B2A] leading-tight"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {name}
      </h3>
      <p className="mt-0.5 text-[0.7rem] tracking-[0.12em] font-semibold text-[#0D1B2A]/65">{tags}</p>
      <p className="mt-1.5 text-[0.85rem] leading-snug text-[#0D1B2A]">{body}</p>
    </div>
  );
}

function SidebarHeader() {
  return (
    <>
      <h1
        className="font-display font-bold leading-[1.05] tracking-tight"
        style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.6rem" }}
      >
        Jonas K.P.<br />Sørensen
      </h1>
      <p
        className="mt-4 font-display text-[1.1rem]"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Digital konsulent
      </p>
      <p className="mt-1 text-[0.78rem] tracking-wide text-[#F4EFE6]/70">
        UX Research & Servicedesign · Selvstændig siden 2016
      </p>
    </>
  );
}

function SidebarBottom() {
  return (
    <div className="mt-auto flex flex-col items-center text-center">
      <p
        className="font-display italic text-[0.95rem] text-[#F4EFE6]/85"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Portfolio: www.jkps.dk
      </p>
      <p
        className="mt-3 font-display italic text-[0.85rem] text-[#F4EFE6]/70"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        - Aarhus -
      </p>
    </div>
  );
}

function Page({ children, isFirst }: { children: React.ReactNode; isFirst?: boolean }) {
  return (
    <article
      className="cv-page bg-[#F4EFE6] grid grid-cols-[35%_65%] overflow-hidden"
      style={{
        width: "794px",
        height: "1123px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
        pageBreakAfter: isFirst ? "always" : "auto",
        breakAfter: isFirst ? "page" : "auto",
      }}
    >
      {children}
    </article>
  );
}

function CVPage() {
  const omMigEndRef = useRef<HTMLDivElement | null>(null);
  const [showPrintMobile, setShowPrintMobile] = useState(false);
  useEffect(() => {
    const el = omMigEndRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.boundingClientRect.top < 0) setShowPrintMobile(true);
      },
      { threshold: 0 },
    );
    obs.observe(el);
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      if (rect.top < 0) setShowPrintMobile(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return (
    <>
      <style>{`
        @page { size: A4; margin: 0; }
        @media print {
          html, body { background: #ffffff !important; margin: 0 !important; padding: 0 !important; }
          .cv-root { background: #ffffff !important; padding: 0 !important; gap: 0 !important; }
          .cv-page { box-shadow: none !important; margin: 0 !important; width: 210mm !important; height: 297mm !important; }
          .no-print { display: none !important; }
        }
        .cv-page, .cv-sidebar, .cv-content { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        @media (max-width: 768px) {
          html, body { overflow-x: hidden; max-width: 100vw; }
          .cv-root { padding: 0 24px !important; max-width: 100vw; overflow-x: hidden; }
          .cv-page {
            width: 100% !important;
            max-width: 100% !important;
            height: auto !important;
            grid-template-columns: 1fr !important;
            transform: none !important;
            box-sizing: border-box;
          }
          .cv-sidebar, .cv-content { padding: 36px 28px !important; box-sizing: border-box; }
          .cv-content section { margin-top: 40px !important; }
          .cv-content section:first-child { margin-top: 0 !important; }
          .cv-content p, .cv-content li { font-size: 0.95rem !important; line-height: 1.8 !important; word-break: break-word; }
          .cv-content h3 { font-size: clamp(1.2rem, 4vw, 1.6rem) !important; line-height: 1.35 !important; }
          .cv-content > section > div > div + div { margin-top: 24px !important; }
          .cv-print-btn { top: auto !important; bottom: 16px !important; right: 16px !important; font-size: 0.85rem !important; padding: 10px 16px !important; z-index: 100 !important; }
          .cv-print-mobile-hidden { display: none !important; }
          .cv-root { padding-top: 88px !important; gap: 20px !important; }
          .expertise-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
          .expertise-pills { display: flex !important; flex-wrap: wrap !important; gap: 10px !important; width: 100% !important; flex-direction: row !important; align-items: flex-start !important; }
          .expertise-pill { white-space: nowrap !important; padding: 7px 16px !important; border-radius: 20px !important; font-size: 0.85rem !important; border: 1px solid #0A1628 !important; color: #0A1628 !important; background: transparent !important; }
          .cv-page:nth-of-type(n+2) .cv-sidebar { display: none !important; }
          .cv-page:nth-of-type(n+2) { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div className="no-print" style={{ background: "transparent", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 50 }}>
        <Link to="/" style={{ color: "#F5F3EE", textDecoration: "none", fontSize: "0.9rem" }}>← Tilbage</Link>
        <button
          type="button"
          onClick={() => window.print()}
          style={{ background: "transparent", border: "1px solid #F5F3EE", color: "#F5F3EE", padding: "8px 20px", borderRadius: "4px", fontSize: "0.9rem", cursor: "pointer" }}
        >
          Print / Download PDF
        </button>
      </div>

      <div className="cv-root flex flex-col items-center gap-6 min-h-screen bg-[#1f1d1b] py-10 px-4">
        <button
          type="button"
          onClick={() => window.print()}
          className={`cv-print-btn no-print fixed top-6 right-6 z-50 rounded-full bg-[#C0281E] px-5 py-2.5 text-sm font-semibold text-[#F4EFE6] shadow-lg hover:opacity-90 transition-opacity ${showPrintMobile ? "" : "cv-print-mobile-hidden"}`}
        >
          Print / Gem som PDF
        </button>

        {/* PAGE 1 */}
        <Page isFirst>
          <aside
            className="cv-sidebar relative flex flex-col text-[#F4EFE6] px-8 py-10"
            style={{ backgroundColor: "#0A1628" }}
          >
            <SidebarHeader />

            <div className="mt-10 mx-auto w-[170px] h-[170px] overflow-hidden rounded-full ring-1 ring-[#F4EFE6]/20">
              <img
                src={profilePhoto}
                alt="Jonas K.P. Sørensen"
                className="w-full h-full object-cover"
                style={{ objectPosition: "center top" }}
              />
            </div>

            <SidebarBottom />
          </aside>

          <div
            className="cv-content px-10 py-10 text-[#0D1B2A] overflow-hidden"
            style={{ backgroundColor: "#F4EFE6" }}
          >
            <section>
              <SectionLabel>OM MIG</SectionLabel>
              <div className="mt-4 space-y-3 text-[0.88rem] leading-relaxed text-[#0D1B2A]">
                <p>
                  Mere end 10 års erfaring med digitale produkter og brugeroplevelser på tværs af public service, civilsamfund og kommercielle virksomheder — med projekter for DR, Amnesty International og Danmarks Naturfredningsforening.
                </p>
                <p>
                  Mit arbejde tager udgangspunkt i menneskelig adfærd. Ikke hvad mennesker siger de gør, men hvad de faktisk gør. Det er ofte forskellen på løsninger der fungerer i teorien og løsninger der skaber reel værdi i praksis.
                </p>
                <p>
                  Baggrunden i kreativ formidling kombineret med et fagligt fundament i UX, servicedesign og digital forretningsudvikling giver en distinkt tilgang til arbejdet med teknologi og mennesker.
                </p>
              </div>
              <div ref={omMigEndRef} aria-hidden style={{ height: 1 }} />
            </section>

            <section className="mt-7">
              <SectionLabel>EKSPERTISE</SectionLabel>
              <div className="mt-4 grid grid-cols-3 gap-5 expertise-grid">
                {expertise.map((col) => (
                  <div key={col.title} className="expertise-group">
                    <h3
                      className="font-display font-bold text-[1rem] text-[#0D1B2A] mb-3 expertise-group-title"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {col.title}
                    </h3>
                    <div className="flex flex-col items-start gap-1.5 expertise-pills">
                      {col.items.map((it) => (
                        <Pill key={it} className="expertise-pill">{it}</Pill>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-7">
              <SectionLabel>ERFARING</SectionLabel>
              <div className="mt-4 space-y-4">
                {experiencePage1.map((e) => (
                  <ExperienceItem key={e.name} {...e} />
                ))}
              </div>
            </section>
          </div>
        </Page>

        {/* PAGE 2 */}
        <Page>
          <aside
            className="cv-sidebar relative flex flex-col text-[#F4EFE6] px-8 py-10"
            style={{ backgroundColor: "#0A1628" }}
          >
            <SidebarBottom />
          </aside>

          <div
            className="cv-content px-10 py-10 text-[#0D1B2A] overflow-hidden"
            style={{ backgroundColor: "#F4EFE6" }}
          >
            <section>
              <div className="space-y-4">
                {experiencePage2.map((e) => (
                  <ExperienceItem key={e.name} {...e} />
                ))}
              </div>
            </section>

            <section className="mt-7">
              <SectionLabel>UDDANNELSE</SectionLabel>
              <div className="mt-4 space-y-4">
                {education.map((e) => (
                  <div key={e.title}>
                    <h3
                      className="font-display font-bold text-[1.05rem] text-[#0D1B2A] leading-tight"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {e.title.split(/(&)/).map((part, i) =>
                        part === "&" ? (
                          <span key={i} style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>&amp;</span>
                        ) : (
                          <span key={i}>{part}</span>
                        )
                      )}
                    </h3>
                    <p className="mt-0.5 text-[0.7rem] tracking-[0.12em] font-semibold text-[#0D1B2A]/65">
                      {e.meta}
                    </p>
                    {e.body && (
                      <p className="mt-1.5 text-[0.85rem] leading-snug text-[#0D1B2A]">{e.body}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-7">
              <SectionLabel>KONTAKT</SectionLabel>
              <ul className="mt-4 space-y-1.5 text-[0.88rem] text-[#0D1B2A]">
                <li className="font-semibold">Jonas@jkps.dk</li>
                <li className="font-semibold">linkedin.com/in/jonaskps</li>
                <li className="font-semibold">www.jkps.dk</li>
                <li className="font-semibold">+45 60 95 95 96</li>
              </ul>
            </section>
          </div>
        </Page>
      </div>
    </>
  );
}
