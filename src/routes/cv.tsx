import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cv")({
  head: () => ({
    meta: [
      { title: "CV — Jonas K.P. Sørensen" },
      {
        name: "description",
        content:
          "CV for Jonas K.P. Sørensen — digital konsulent med fokus på brugeroplevelse og konceptudvikling.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: CVPage,
});

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-[1.35rem] font-bold tracking-tight text-cream mb-3 pb-2 border-b border-[color-mix(in_oklab,var(--cream)_25%,transparent)] cv-section-title">
      {children}
    </h2>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-sm border border-[color-mix(in_oklab,var(--cream)_25%,transparent)] px-2 py-[3px] text-[0.7rem] leading-tight text-cream/90 cv-tag">
      {children}
    </span>
  );
}

const experience = [
  {
    company: "Boliga",
    role: "UX & Konceptudvikler",
    period: "2023 – nu",
    bullets: [
      "Ledet brugerresearch og kvalitative interviews med boligkøbere og -sælgere.",
      "Konceptudvikling af nye datadrevne værktøjer til boligmarkedet.",
      "Tæt samarbejde med produkt, design og udvikling om implementering.",
    ],
  },
  {
    company: "Danmarks Radio",
    role: "Tilrettelægger & Lydproducer",
    period: "2019 – 2022",
    bullets: [
      "Redaktionel tilrettelæggelse og produktion af podcasts og radioindhold.",
      "Tværgående koordinering mellem redaktion, teknik og publicering.",
      "Postproduktion, lyddesign og kvalitetssikring fra studie til kanal.",
    ],
  },
  {
    company: "Amnesty International",
    role: "Digital formidler",
    period: "2018 – 2020",
    bullets: [
      "Journalistisk formidling af menneskerettighedsspørgsmål til digitale kanaler.",
      "Udvikling af kampagnekoncepter med fokus på engagement og handling.",
    ],
  },
  {
    company: "Selvstændig konsulent",
    role: "Digital konsulent · Brugeroplevelse & koncept",
    period: "2016 – nu",
    bullets: [
      "Rådgivning om UX, service design og digital strategi for kultur, NGO og kommercielle kunder.",
      "Faciliterer workshops, co-design og brugertests fra idé til lancering.",
      "Leverer koncept, indhold og medieproduktion som ét sammenhængende spor.",
    ],
  },
];

const cases = [
  { name: "Wolt", note: "Service design & onboarding" },
  { name: "Boliga", note: "Brugerresearch & koncept" },
  { name: "Høresimulering", note: "Lydbaseret prototype" },
];

const skills: { group: string; items: string[] }[] = [
  {
    group: "Research",
    items: ["Interviews", "Feltobservation", "Brugertest", "Co-design", "Mixed methods"],
  },
  {
    group: "Design",
    items: ["Service design", "Konceptudvikling", "Brugerrejser", "Prototyping", "Facilitering"],
  },
  {
    group: "Strategi",
    items: ["Digital strategi", "Indholdsarkitektur", "Positionering", "Brand"],
  },
  {
    group: "Produktion",
    items: ["Podcast", "Lyddesign", "Video", "Postproduktion"],
  },
  {
    group: "Værktøjer",
    items: ["Figma", "Notion", "Miro", "Adobe CC", "Reaper"],
  },
];

function CVPage() {
  return (
    <>
      <style>{`
        @page { size: A4; margin: 10mm; }
        @media print {
          html, body { background: #ffffff !important; }
          .cv-root {
            background: #ffffff !important;
            color: #0D1B2A !important;
            padding: 0 !important;
            min-height: 0 !important;
          }
          .cv-sheet {
            box-shadow: none !important;
            margin: 0 !important;
            padding: 0 !important;
            max-width: 100% !important;
            background: #ffffff !important;
            color: #0D1B2A !important;
          }
          .cv-header { background: #0D1B2A !important; color: #ffffff !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .cv-footer { background: #B83A20 !important; color: #ffffff !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .cv-sidebar { background: #F4EFE6 !important; color: #0D1B2A !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .cv-section-title { color: #0D1B2A !important; border-color: #0D1B2A !important; }
          .cv-body-text, .cv-role, .cv-period, .cv-bullets li { color: #0D1B2A !important; }
          .cv-company { color: #B83A20 !important; }
          .cv-tag { color: #0D1B2A !important; border-color: #0D1B2A !important; background: transparent !important; }
          .cv-case { background: #0D1B2A !important; color: #ffffff !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .cv-page { page-break-inside: avoid; break-inside: avoid; }
          .no-print { display: none !important; }
        }
      `}</style>

      <div className="cv-root min-h-screen bg-navy-deep text-cream py-8 px-4 print:p-0">
        <div className="no-print mx-auto mb-4 flex max-w-[210mm] items-center justify-end">
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-sm bg-ember px-4 py-2 text-sm font-semibold text-cream hover:opacity-90"
          >
            Print / Gem som PDF
          </button>
        </div>

        <article
          className="cv-sheet cv-page mx-auto bg-navy-deep text-cream shadow-2xl"
          style={{ width: "210mm", minHeight: "297mm" }}
        >
          {/* Header */}
          <header
            className="cv-header px-10 py-7"
            style={{ backgroundColor: "#0D1B2A" }}
          >
            <h1 className="font-display text-[2rem] font-bold leading-tight tracking-tight text-cream">
              Jonas K.P. Sørensen
            </h1>
            <p
              className="mt-1 text-[0.95rem] font-semibold"
              style={{ color: "#B83A20" }}
            >
              Digital konsulent · Brugeroplevelse & Konceptudvikling
            </p>
            <p className="mt-3 text-[0.78rem] tracking-wide text-cream/85">
              Jonas@jkps.dk · +45 60 95 95 96 · linkedin.com/in/jonaskps · Aarhus N
            </p>
          </header>

          {/* Two-column body */}
          <div className="grid grid-cols-1 md:grid-cols-[1.7fr_1fr] print:grid-cols-[1.7fr_1fr]">
            {/* Left column */}
            <div className="px-10 py-8 space-y-7">
              <section>
                <SectionTitle>Profil</SectionTitle>
                <p className="cv-body-text text-[0.88rem] leading-relaxed text-cream/90">
                  Digital konsulent med ti års erfaring i krydsfeltet mellem brugerforståelse,
                  konceptudvikling og medieproduktion. Jeg oversætter komplekse brugerbehov til
                  konkrete, realiserbare løsninger og arbejder i hele værdikæden — fra research
                  og strategi til produktion og lancering.
                </p>
              </section>

              <section>
                <SectionTitle>Udvalgt erhvervserfaring</SectionTitle>
                <ul className="space-y-4">
                  {experience.map((job) => (
                    <li key={job.company}>
                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className="font-display text-[1rem] font-bold text-cream cv-company" style={{ color: "#B83A20" }}>
                          {job.company}
                        </h3>
                        <span className="text-[0.72rem] uppercase tracking-wider text-cream/70 cv-period">
                          {job.period}
                        </span>
                      </div>
                      <p className="text-[0.82rem] font-semibold text-cream/90 cv-role">
                        {job.role}
                      </p>
                      <ul className="mt-1.5 list-disc pl-5 space-y-0.5 text-[0.8rem] leading-snug text-cream/85 cv-bullets">
                        {job.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <SectionTitle>Udvalgte cases</SectionTitle>
                <div className="grid grid-cols-3 gap-2">
                  {cases.map((c) => (
                    <div
                      key={c.name}
                      className="cv-case rounded-sm px-3 py-3 text-center"
                      style={{ backgroundColor: "#0D1B2A", border: "1px solid color-mix(in oklab, #F4EFE6 25%, transparent)" }}
                    >
                      <div className="font-display text-[0.95rem] font-bold text-cream">
                        {c.name}
                      </div>
                      <div className="mt-0.5 text-[0.68rem] uppercase tracking-wider text-cream/70">
                        {c.note}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right sidebar */}
            <aside
              className="cv-sidebar px-7 py-8 space-y-7 border-l border-[color-mix(in_oklab,var(--cream)_15%,transparent)]"
              style={{ backgroundColor: "color-mix(in oklab, #F4EFE6 8%, #0D1B2A)" }}
            >
              <section>
                <SectionTitle>Uddannelse</SectionTitle>
                <ul className="space-y-3 text-[0.82rem] leading-snug">
                  <li>
                    <div className="font-bold text-cream cv-body-text">Cand.it.</div>
                    <div className="text-cream/85 cv-body-text">IT-Universitetet, 2024</div>
                  </li>
                  <li>
                    <div className="font-bold text-cream cv-body-text">Professionsbachelor</div>
                    <div className="text-cream/85 cv-body-text">Sonic College, 2016</div>
                  </li>
                </ul>
              </section>

              <section>
                <SectionTitle>Kompetencer</SectionTitle>
                <div className="space-y-3">
                  {skills.map((s) => (
                    <div key={s.group}>
                      <div className="mb-1 text-[0.68rem] uppercase tracking-[0.18em] font-semibold text-cream/70 cv-body-text">
                        {s.group}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {s.items.map((t) => (
                          <Tag key={t}>{t}</Tag>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <SectionTitle>Sprog</SectionTitle>
                <ul className="space-y-1 text-[0.82rem] cv-body-text">
                  <li>
                    <span className="font-semibold">Dansk</span> — modersmål
                  </li>
                  <li>
                    <span className="font-semibold">Engelsk</span> — flydende
                  </li>
                  <li>
                    <span className="font-semibold">Tysk</span> — basis
                  </li>
                </ul>
              </section>
            </aside>
          </div>

          {/* Footer */}
          <footer
            className="cv-footer px-10 py-6 text-center"
            style={{ backgroundColor: "#B83A20" }}
          >
            <p className="font-display text-[1.05rem] italic font-semibold text-cream leading-snug">
              „Teknologien er kun så god som den menneskelige oplevelse, den skaber.”
            </p>
          </footer>
        </article>
      </div>
    </>
  );
}
