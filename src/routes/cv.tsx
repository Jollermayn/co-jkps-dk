import { createFileRoute } from "@tanstack/react-router";
import profilePhoto from "@/assets/profile-photo.png";

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

const experience = [
  {
    name: "Wolt",
    tags: "SERVICE DESIGN · UX RESEARCH · CO-DESIGN",
    body: "Mixed methods research med interviews, media-go-alongs og feltobservation. Designede tre interventioner i Wolt Partner-appen om transparens og rettigheder.",
  },
  {
    name: "Danmarks Radio",
    tags: "DIGITAL PRODUCER · TVÆRGÅENDE KOORDINERING",
    body: "Koordinerede tværgående processer på tværs af redaktioner i Danmarks største medieorganisation. Sikrede redaktionel og teknisk kvalitet under stram tidsstyring.",
  },
  {
    name: "Boliga",
    tags: "PRODUCT DESIGN · UX RESEARCH · DATAANALYSE",
    body: "Analyserede brugsdata fra 6,5 mio. månedlige interaktioner på Danmarks største boligplatform. Designede personaliseret onboarding-flow valideret af product owner.",
  },
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
    meta: "SYDDANSK UNIVERSITET · 2011",
    body: "",
  },
];

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-[#0D1B2A]/70 px-3 py-[3px] text-[0.78rem] leading-tight text-[#0D1B2A] cv-pill">
      {children}
    </span>
  );
}

function CVPage() {
  return (
    <>
      <style>{`
        @page { size: A4; margin: 0; }
        html, body { background: #1c1c1c; }
        @media print {
          html, body { background: #ffffff !important; }
          .cv-root { background: #ffffff !important; padding: 0 !important; }
          .cv-sheet { box-shadow: none !important; margin: 0 !important; width: 210mm !important; min-height: 297mm !important; }
          .cv-sidebar, .cv-content { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
        }
        .cv-sidebar, .cv-content { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      `}</style>

      <div className="cv-root min-h-screen bg-[#1c1c1c] py-10 px-4 print:p-0">
        <button
          type="button"
          onClick={() => window.print()}
          className="no-print fixed top-6 right-6 z-50 rounded-full bg-[#C0281E] px-5 py-2.5 text-sm font-semibold text-[#F4EFE6] shadow-lg hover:opacity-90 transition-opacity"
        >
          Download CV
        </button>

        <article
          className="cv-sheet mx-auto bg-[#F4EFE6] shadow-2xl grid grid-cols-[35%_65%]"
          style={{ width: "210mm", minHeight: "297mm" }}
        >
          {/* Sidebar */}
          <aside
            className="cv-sidebar relative flex flex-col text-[#F4EFE6] px-8 py-10"
            style={{ backgroundColor: "#0A1628" }}
          >
            <h1
              className="font-display font-bold leading-[1.05] tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.6rem" }}
            >
              Jonas<br />K.P.<br />Sørensen
            </h1>
            <p className="mt-4 font-display text-[1.1rem]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Digital konsulent
            </p>
            <p className="mt-1 text-[0.78rem] tracking-wide text-[#F4EFE6]/70">
              UX Research & Servicedesign · Selvstændig siden 2016
            </p>

            <div className="mt-10 w-[140px] h-[180px] overflow-hidden rounded-md">
              <img src={profilePhoto} alt="Jonas K.P. Sørensen" className="w-full h-full object-cover" />
            </div>

            <div className="mt-auto pt-16">
              <p className="font-display italic text-[0.95rem] text-[#F4EFE6]/85" style={{ fontFamily: "'Playfair Display', serif" }}>
                Portfolio: www.jkps.dk
              </p>
              <p className="mt-12 font-display italic text-[0.85rem] text-[#F4EFE6]/70" style={{ fontFamily: "'Playfair Display', serif" }}>
                – Aarhus –
              </p>
            </div>
          </aside>

          {/* Content */}
          <div
            className="cv-content px-10 py-10 text-[#0D1B2A]"
            style={{ backgroundColor: "#F4EFE6" }}
          >
            {/* OM MIG */}
            <section>
              <h2 className="text-[0.78rem] tracking-[0.2em] font-semibold text-[#C0281E]">OM MIG</h2>
              <div aria-hidden className="mt-1 h-px w-10 bg-[#C0281E]" />
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
            </section>

            {/* EKSPERTISE */}
            <section className="mt-8">
              <h2 className="text-[0.78rem] tracking-[0.2em] font-semibold text-[#C0281E]">EKSPERTISE</h2>
              <div aria-hidden className="mt-1 h-px w-10 bg-[#C0281E]" />
              <div className="mt-4 grid grid-cols-3 gap-5">
                {expertise.map((col) => (
                  <div key={col.title}>
                    <h3
                      className="font-display font-bold text-[1rem] text-[#0D1B2A] mb-3"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {col.title}
                    </h3>
                    <div className="flex flex-col items-start gap-1.5">
                      {col.items.map((it) => (
                        <Pill key={it}>{it}</Pill>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ERFARING */}
            <section className="mt-8">
              <h2 className="text-[0.78rem] tracking-[0.2em] font-semibold text-[#C0281E]">ERFARING</h2>
              <div aria-hidden className="mt-1 h-px w-10 bg-[#C0281E]" />
              <div className="mt-4 space-y-4">
                {experience.map((e) => (
                  <div key={e.name}>
                    <h3
                      className="font-display font-bold text-[1.05rem] text-[#0D1B2A] leading-tight"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {e.name}
                    </h3>
                    <p className="mt-0.5 text-[0.7rem] tracking-[0.12em] font-semibold text-[#0D1B2A]/65">
                      {e.tags}
                    </p>
                    <p className="mt-1.5 text-[0.85rem] leading-snug text-[#0D1B2A]">
                      {e.body}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* UDDANNELSE */}
            <section className="mt-8">
              <h2 className="text-[0.78rem] tracking-[0.2em] font-semibold text-[#C0281E]">UDDANNELSE</h2>
              <div aria-hidden className="mt-1 h-px w-10 bg-[#C0281E]" />
              <div className="mt-4 space-y-4">
                {education.map((e) => (
                  <div key={e.title}>
                    <h3
                      className="font-display font-bold text-[1.05rem] text-[#0D1B2A] leading-tight"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {e.title}
                    </h3>
                    <p className="mt-0.5 text-[0.7rem] tracking-[0.12em] font-semibold text-[#0D1B2A]/65">
                      {e.meta}
                    </p>
                    {e.body && (
                      <p className="mt-1.5 text-[0.85rem] leading-snug text-[#0D1B2A]">
                        {e.body}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* KONTAKT */}
            <section className="mt-8">
              <h2 className="text-[0.78rem] tracking-[0.2em] font-semibold text-[#C0281E]">KONTAKT</h2>
              <div aria-hidden className="mt-1 h-px w-10 bg-[#C0281E]" />
              <ul className="mt-4 space-y-1.5 text-[0.88rem] text-[#0D1B2A]">
                <li className="font-semibold">Jonas@jkps.dk</li>
                <li className="font-semibold">linkedin.com/in/jonaskps</li>
                <li className="font-semibold">www.jkps.dk</li>
                <li className="font-semibold">+45 60 95 95 96</li>
              </ul>
            </section>
          </div>
        </article>
      </div>
    </>
  );
}
