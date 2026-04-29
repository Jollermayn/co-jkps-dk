import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { caseStudies } from "@/data/cases";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jonas K.P. Sørensen — Digital konsulent · Brugeroplevelse & digitale løsninger" },
      {
        name: "description",
        content:
          "Selvstændig digital konsulent fra Aarhus. UX research, service design, digital strategi og medieproduktion siden 2016.",
      },
      { property: "og:title", content: "Jonas K.P. Sørensen — Digital konsulent" },
      {
        property: "og:description",
        content:
          "Brugeroplevelse & digitale løsninger. UX research, service design, digital strategi og medieproduktion.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

const competencies = [
  {
    no: "01",
    title: "UX Research",
    sub: "Research & Brugerinddragelse",
    body:
      "Dybdegående indsigt gennem interviews, observationer, co-design og brugertest. Jeg oversætter kompleks adfærd til handlebare designbeslutninger.",
    tags: [
      "Semistrukturerede interviews",
      "Feltobservation",
      "Co-design",
      "Mixed methods",
      "Facilitering",
      "Workshops",
    ],
  },
  {
    no: "02",
    title: "Service- & Konceptdesign",
    sub: "Fra problem til realiserbart koncept",
    body:
      "Fra identifikation af problemet til et konkret, realiserbart koncept. Jeg designer brugerrejser, touchpoints og serviceoplevelser der skaber reel værdi.",
    tags: ["Brugerrejser", "Touchpoint-mapping", "Participatorisk design", "Konceptvalidering"],
  },
  {
    no: "03",
    title: "Digital Strategi & Brand",
    sub: "Stemme, position og indhold",
    body:
      "Strategisk rådgivning om digital tilstedeværelse, indhold og positionering. Jeg hjælper organisationer med at finde og kommunikere deres unikke stemme.",
    tags: ["Kommunikationsstrategi", "Visuel identitet", "Indholdsarkitektur", "Positionering"],
  },
  {
    no: "04",
    title: "Medie- & Lydproduktion",
    sub: "Fra studie til kanal",
    body:
      "Professionel podcast-, video- og lydproduktion fra studie til kanal. Teknisk kompetence kombineret med journalistisk næse for det gode indhold.",
    tags: ["Redaktionel tilrettelæggelse", "Postproduktion", "Indholdsproduktion"],
  },
];




const partners = [
  { slug: "danmarks-radio", name: "Danmarks Radio", note: "Broadcast, podcastproduktion og tværgående koordinering" },
  { slug: "danmarks-naturfredningsforening", name: "Danmarks Naturfredningsforening", note: "Kommunikation om bæredygtighed og brandudvikling" },
  { slug: "amnesty-international", name: "Amnesty International", note: "Journalistisk formidling af menneskerettighedsspørgsmål" },
  { slug: "ulla-dyrlov", name: "Ulla Dyrløv", note: "Koncept- og platformudvikling med fokus på børns trivsel" },
  { slug: "concerto-copenhagen", name: "Concerto Copenhagen", note: "Engagement af publikum gennem kulturformidling" },
  { slug: "art-spirit-coaching", name: "Art Spirit Coaching", note: "Brand, koncept og kommunikation fra idé til lancering" },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-8 bg-ember" />
      <span className="eyebrow text-ember">{children}</span>
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="flex flex-col gap-10 lg:justify-between lg:min-h-0 lg:sticky lg:top-0 lg:h-screen px-6 md:px-10 py-16 lg:py-20 border-b lg:border-b-0 lg:border-l border-cream/10 order-1 lg:order-last">
      <div>
        <h1 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.02em] font-medium">
          Jonas K.P.<br />
          <span className="italic font-light">Sørensen</span>
        </h1>
        <p className="mt-6 text-lg text-cream/85 leading-snug font-display italic">
          Digital konsulent · Brugeroplevelse &amp; digitale løsninger.
        </p>
        <p className="mt-4 text-cream/65 text-sm">
          Selvstændig siden 2016. Jeg arbejder i skæringsfeltet mellem strategi, design og teknologi.
        </p>
      </div>

      <div className="mt-10 lg:mt-0 flex flex-col gap-3">
        <a
          href="/jonas-kp-sorensen-cv.pdf"
          download
          className="inline-flex items-center justify-between gap-3 px-5 py-3 text-sm tracking-wide border border-cream/25 hover:border-ember hover:text-ember transition-colors"
        >
          Download CV (PDF) <span aria-hidden>↓</span>
        </a>
        <a
          href="#kontakt"
          className="inline-flex items-center justify-between gap-3 bg-ember text-cream px-5 py-3 text-sm tracking-wide hover:bg-ember/90 transition-colors"
        >
          Lad os tales ved <span aria-hidden>→</span>
        </a>
        <div className="mt-6 space-y-2 text-sm text-cream/70">
          <a href="mailto:Jonas@jkps.dk" className="block hover:text-ember transition-colors">
            Jonas@jkps.dk
          </a>
          <a href="tel:+4560959596" className="block hover:text-ember transition-colors">
            +45 60 95 95 96
          </a>
          <a
            href="https://www.linkedin.com/in/jonaskps/"
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:text-ember transition-colors"
          >
            LinkedIn →
          </a>
        </div>
      </div>
    </aside>
  );
}

function Index() {
  return (
    <main id="top" className="bg-navy-deep text-cream">
      <div className="flex flex-col lg:grid lg:grid-cols-[60fr_40fr] lg:items-start">
        {/* LEFT — scrolling content */}
        <div className="min-w-0 order-2 lg:order-none">
          {/* OM MIG */}
          <section id="om" className="py-24 md:py-36">
            <div className="px-6 md:px-10">
              <Eyebrow>Om mig</Eyebrow>
              <div className="mt-8 max-w-3xl space-y-6 text-cream/80 text-lg leading-relaxed">
                <p>
                  Siden 2016 har jeg drevet egen konsulent- og medieproduktionsvirksomhed — med fokus på
                  samspillet mellem mennesker, teknologi og forretning.
                </p>
                <p>
                  Fælles for alt mit arbejde er interessen for det øjeblik hvor noget abstrakt bliver konkret —
                  hvor en idé finder sin form, en oplevelse finder sit udtryk, en fortælling finder sin modtager.
                  Jeg er mest på hjemmebane når disciplinerne overlapper, og tiltrukket af de projekter der ikke
                  lader sig løse med én faglighed alene.
                </p>
                <p className="text-cream/60 italic font-display">
                  Privat er jeg familiefar, naturmenneske og det, man nok ville kalde en seriøs lytter.
                </p>

                <blockquote className="border-l-2 border-ember pl-6 mt-10">
                  <p className="font-display italic text-2xl md:text-3xl leading-snug text-cream/95">
                    "Teknologien er kun så god som den{" "}
                    <mark className="bg-transparent text-ember">menneskelige oplevelse,</mark> den skaber."
                  </p>
                </blockquote>
              </div>
            </div>
          </section>

          {/* CASES */}
          <CasesSection />

          {/* KOMPETENCER */}
          <section id="kompetencer" className="py-24 md:py-36 border-t border-cream/10">
            <div className="px-6 md:px-10">
              <div className="mb-16 md:mb-24">
                <Eyebrow>Kompetencer</Eyebrow>
                <h2 className="font-display text-5xl md:text-7xl mt-6 leading-[0.95] tracking-tight">
                  Hvad jeg <span className="italic">bringer</span>.
                </h2>
                <p className="mt-8 max-w-2xl text-lg text-cream/75 leading-relaxed">
                  Jeg arbejder i skæringsfeltet mellem strategi, design og teknologi — og bringer alle tre
                  perspektiver ind i hvert projekt.
                </p>
              </div>

              <ul className="divide-y divide-cream/10 border-y border-cream/10">
                {competencies.map((c) => (
                  <li key={c.no} className="group py-10 md:py-14 grid grid-cols-12 gap-6 md:gap-10 items-start hover:bg-navy/40 transition-colors -mx-6 md:-mx-10 px-6 md:px-10">
                    <div className="col-span-2 md:col-span-1 font-display text-2xl text-ember">{c.no}</div>
                    <div className="col-span-10 md:col-span-4">
                      <h3 className="font-display text-3xl md:text-4xl tracking-tight leading-tight">
                        {c.title}
                      </h3>
                      <p className="mt-2 text-sm text-cream/55 italic">{c.sub}</p>
                    </div>
                    <p className="col-span-12 md:col-span-4 text-cream/80 leading-relaxed">{c.body}</p>
                    <ul className="col-span-12 md:col-span-3 flex flex-wrap gap-2">
                      {c.tags.map((t) => (
                        <li
                          key={t}
                          className="text-[11px] tracking-wide uppercase border border-cream/20 px-2.5 py-1 text-cream/70"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* PARTNERE */}
          <section id="partnere" className="py-24 md:py-36 border-t border-cream/10">
            <div className="px-6 md:px-10">
              <div className="mb-16 md:mb-24">
                <Eyebrow>Tidligere samarbejdspartnere</Eyebrow>
                <h2 className="font-display text-5xl md:text-7xl mt-6 leading-[0.95] tracking-tight">
                  Et bredt <span className="italic text-ember">felt</span>.
                </h2>
                <p className="mt-8 max-w-2xl text-lg text-cream/75 leading-relaxed">
                  Fra public broadcast til NGO, kulturliv og private brands.
                </p>
              </div>

              <ul className="divide-y divide-cream/10 border-y border-cream/10">
                {partners.map((p, i) => (
                  <li key={p.name}>
                    <Link
                      to="/cases/$slug"
                      params={{ slug: p.slug }}
                      className="group py-8 md:py-10 grid grid-cols-12 gap-6 items-baseline hover:bg-navy/40 transition-colors -mx-6 md:-mx-10 px-6 md:px-10"
                    >
                      <span className="col-span-2 md:col-span-1 text-ember font-display">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="col-span-10 md:col-span-5 font-display text-2xl md:text-4xl tracking-tight group-hover:text-ember transition-colors">
                        {p.name}
                      </h3>
                      <p className="col-span-12 md:col-span-6 text-cream/70">{p.note}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* UDDANNELSE */}
          <section id="uddannelse" className="py-24 md:py-36 border-t border-cream/10">
            <div className="px-6 md:px-10">
              <div className="mb-16">
                <Eyebrow>Uddannelse</Eyebrow>
                <h2 className="font-display text-5xl md:text-7xl mt-6 leading-[0.95] tracking-tight">
                  Et fagligt <span className="italic text-ember">ståsted</span>.
                </h2>
                <p className="mt-8 max-w-2xl text-lg text-cream/75 leading-relaxed">
                  Hvor analytisk overblik møder en kreativ og praksisnær tilgang.
                </p>
              </div>

              <ul className="divide-y divide-cream/10 border-y border-cream/10">
                <li className="py-8 md:py-10 grid grid-cols-12 gap-6">
                  <span className="col-span-2 md:col-span-1 text-ember font-display">01</span>
                  <div className="col-span-10 md:col-span-6">
                    <h3 className="font-display text-2xl md:text-3xl tracking-tight">Cand.it · Digital Design og Interaktive Teknologier</h3>
                    <p className="mt-2 text-cream/65 text-sm">IT-Universitetet København · 2024</p>
                  </div>
                  <p className="col-span-12 md:col-span-5 text-cream/75">
                    Tværfagligt kandidatprogram med fokus på interaktionsdesign, UX research og digitale teknologier.
                  </p>
                </li>
                <li className="py-8 md:py-10 grid grid-cols-12 gap-6">
                  <span className="col-span-2 md:col-span-1 text-ember font-display">02</span>
                  <div className="col-span-10 md:col-span-6">
                    <h3 className="font-display text-2xl md:text-3xl tracking-tight">Professionsbachelor · Medie- og sonokommunikation</h3>
                    <p className="mt-2 text-cream/65 text-sm">Sonic College · 2016</p>
                  </div>
                  <p className="col-span-12 md:col-span-5 text-cream/75">
                    Praksisnær uddannelse i lyd, medieproduktion og kommunikation.
                  </p>
                </li>
              </ul>

              <dl className="mt-12 text-sm">
                <dt className="eyebrow text-ember">Kernekompetencer</dt>
                <dd className="mt-2 text-cream/85">
                  Brugerinddragelse · Branding · Konceptudvikling · Service Design · UX Research
                </dd>
              </dl>
            </div>
          </section>

          {/* KONTAKT */}
          <section id="kontakt" className="py-24 md:py-40 border-t border-cream/10 relative overflow-hidden">
            <div className="px-6 md:px-10 relative">
              <Eyebrow>Kontakt · Portfolio 2026</Eyebrow>
              <h2 className="font-display text-5xl md:text-8xl mt-8 leading-[0.9] tracking-tight">
                Lad os <span className="italic text-ember">tales ved</span>.
              </h2>
              <p className="mt-8 max-w-xl text-cream/70 text-lg italic font-display">
                Jeg er altid interesseret i nye samarbejder — store som små, kommercielle som kulturelle.
              </p>

              <div className="mt-16 grid grid-cols-12 gap-6 md:gap-10">
                <div className="col-span-12 md:col-span-4">
                  <span className="eyebrow text-ember">Email</span>
                  <a
                    href="mailto:Jonas@jkps.dk"
                    className="block mt-3 font-display text-xl md:text-2xl hover:text-ember transition-colors break-all"
                  >
                    Jonas@jkps.dk
                  </a>
                </div>
                <div className="col-span-12 md:col-span-4">
                  <span className="eyebrow text-ember">Telefon</span>
                  <a
                    href="tel:+4560959596"
                    className="block mt-3 font-display text-xl md:text-2xl hover:text-ember transition-colors"
                  >
                    +45 60 95 95 96
                  </a>
                </div>
                <div className="col-span-12 md:col-span-4">
                  <span className="eyebrow text-ember">LinkedIn</span>
                  <a
                    href="https://www.linkedin.com/in/jonaskps/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-3 font-display text-xl md:text-2xl hover:text-ember transition-colors"
                  >
                    Find mig på LinkedIn
                  </a>
                </div>
              </div>

              <div className="mt-16">
                <a
                  href="/jonas-kp-sorensen-cv.pdf"
                  download
                  className="inline-flex items-center gap-3 bg-ember text-cream px-8 py-4 text-sm tracking-wide hover:bg-ember/90 transition-colors"
                >
                  Download CV (PDF) <span aria-hidden>↓</span>
                </a>
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT — sticky sidebar */}
        <Sidebar />
      </div>

      {/* FOOTER */}
      <footer className="border-t border-cream/10 py-10">
        <div className="px-6 md:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-sm text-cream/55">
          <p>Jonas K.P. Sørensen · Digital konsulent · Aarhus</p>
          <p>© {new Date().getFullYear()} · Selvstændig siden 2016</p>
        </div>
      </footer>
    </main>
  );
}

const FILTERS = [
  "Alle",
  "UX Research",
  "Service Design",
  "Kommunikation",
  "Brandudvikling",
  "Co-Creation",
] as const;

type Filter = (typeof FILTERS)[number];

const CASE_META: Record<string, { headline: string; tags: string[] }> = {
  wolt: {
    headline: "Fra usynlig algoritme til informeret bud",
    tags: ["UX Research", "Service Design"],
  },
  boliga: {
    headline: "Reduceret kompleksitet i boligsøgning",
    tags: ["UX Research", "Product Design"],
  },
  "interaktiv-horesimulering": {
    headline: "Inklusion i undervisningen",
    tags: ["UX Research", "Co-Creation"],
  },
  "danmarks-radio": {
    headline: "Digitale og lydbaserede formater",
    tags: ["Kommunikation"],
  },
  "amnesty-international": {
    headline: "Menneskerettigheder til konkret indhold",
    tags: ["Kommunikation"],
  },
  "danmarks-naturfredningsforening": {
    headline: "Bæredygtighed og brandudvikling",
    tags: ["Kommunikation", "Brandudvikling"],
  },
  "ulla-dyrlov": {
    headline: "Koncept og platform fra bunden",
    tags: ["Brandudvikling"],
  },
  "concerto-copenhagen": {
    headline: "Publikumsengagement gennem kulturformidling",
    tags: ["Brandudvikling", "Kommunikation"],
  },
  "art-spirit-coaching": {
    headline: "Brand og koncept fra idé til lancering",
    tags: ["Brandudvikling"],
  },
};

function CasesSection() {
  const [filter, setFilter] = useState<Filter>("Alle");

  const filtered = caseStudies.filter((c) => {
    if (filter === "Alle") return true;
    return CASE_META[c.slug]?.tags.includes(filter);
  });

  return (
    <section id="cases" className="py-24 md:py-36 border-t border-cream/10">
      <div className="px-6 md:px-10">
        <div className="mb-10 md:mb-14">
          <Eyebrow>Udvalgte cases</Eyebrow>
          <h2 className="font-display text-5xl md:text-7xl mt-6 leading-[0.95] tracking-tight">
            Ni projekter.<br />
            <span className="italic text-ember">Ét princip</span>: lad arbejdet tale.
          </h2>
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-3 mb-10 md:mb-12">
          <div className="flex flex-wrap gap-2 flex-1">
            {FILTERS.map((f) => {
              const active = f === filter;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={
                    "text-xs tracking-wide px-3.5 py-1.5 rounded-full border transition-colors " +
                    (active
                      ? "bg-ember text-cream border-ember"
                      : "border-cream/20 text-cream/70 hover:border-cream/50 hover:text-cream")
                  }
                >
                  {f}
                </button>
              );
            })}
          </div>
          <span className="eyebrow text-cream/50 ml-auto">
            {filtered.length} / {caseStudies.length}
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filtered.map((c) => {
            const meta = CASE_META[c.slug];
            return (
              <Link
                key={c.slug}
                to="/cases/$slug"
                params={{ slug: c.slug }}
                className="group flex flex-col border border-cream/10 bg-navy/30 hover:bg-navy/50 overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#C0281E]"
              >
                <div className="w-full overflow-hidden bg-navy" style={{ height: 200 }}>
                  <img
                    src={c.image}
                    alt={`${c.client} — ${meta?.headline ?? c.title}`}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-[400ms] ease-out"
                  />
                </div>
                <div className="p-5 flex flex-col gap-3">
                  <span
                    className="text-cream/60 uppercase font-semibold"
                    style={{ fontSize: 9, letterSpacing: "0.18em" }}
                  >
                    {c.client}
                  </span>
                  <h3
                    className="font-display font-bold text-cream leading-snug"
                    style={{ fontSize: 16 }}
                  >
                    {meta?.headline ?? c.title}
                  </h3>
                  <ul className="flex flex-wrap gap-1.5 mt-1">
                    {(meta?.tags ?? []).map((t) => (
                      <li
                        key={t}
                        className="text-[10px] tracking-wide px-2.5 py-1 rounded-full border border-cream/20 text-cream/70"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
