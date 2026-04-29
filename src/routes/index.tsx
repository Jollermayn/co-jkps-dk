import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
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
    <aside className="flex flex-col lg:sticky lg:top-0 lg:h-screen lg:justify-between px-6 md:px-10 py-16 lg:py-20 border-b lg:border-b-0 lg:border-l border-cream/10 order-first lg:order-last min-h-[100svh] lg:min-h-0 justify-between">
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
      <div className="lg:grid lg:grid-cols-[1fr_minmax(320px,420px)] lg:items-start">
        {/* LEFT — scrolling content */}
        <div className="min-w-0">
          {/* OM MIG */}
          <section id="om" className="py-24 md:py-36">
            <div className="px-6 md:px-10 grid grid-cols-12 gap-6 md:gap-10">
              <div className="col-span-12 md:col-span-4">
                <Eyebrow>Om mig</Eyebrow>
              </div>
              <div className="col-span-12 md:col-span-8 space-y-6 text-cream/80 text-lg leading-relaxed">
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

function CasesSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-case-card]");
    const delta = card ? card.offsetWidth + 32 : el.clientWidth * 0.8;
    el.scrollBy({ left: delta * dir, behavior: "smooth" });
  };

  return (
    <section id="cases" className="py-24 md:py-36 border-t border-cream/10">
      <div className="px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6 md:gap-10 mb-12 md:mb-16">
          <div className="col-span-12 md:col-span-7">
            <Eyebrow>Udvalgte cases</Eyebrow>
            <h2 className="font-display text-5xl md:text-7xl mt-6 leading-[0.95] tracking-tight">
              Ni projekter.<br />
              <span className="italic text-ember">Ét princip</span>: lad arbejdet tale.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-4 md:col-start-9 self-end flex md:justify-end items-center gap-3">
            <button
              type="button"
              aria-label="Forrige case"
              onClick={() => scrollByCard(-1)}
              className="h-12 w-12 rounded-full border border-cream/25 hover:border-ember hover:text-ember transition-colors flex items-center justify-center text-xl"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Næste case"
              onClick={() => scrollByCard(1)}
              className="h-12 w-12 rounded-full border border-cream/25 hover:border-ember hover:text-ember transition-colors flex items-center justify-center text-xl"
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="flex gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-6 px-6 md:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {caseStudies.map((c, i) => (
          <article
            key={c.slug}
            data-case-card
            className="snap-start shrink-0 w-[85vw] sm:w-[70vw] md:w-[60vw] lg:w-[40vw] xl:w-[34vw]"
          >
            <Link
              to="/cases/$slug"
              params={{ slug: c.slug }}
              className="group relative block aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-navy"
            >
              <img
                src={c.image}
                alt={`${c.client} — ${c.title}`}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/40 to-transparent" />
              <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold text-lg md:text-xl tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                    {String(i + 1).padStart(2, "0")} · {c.client}
                  </span>
                  <span className="text-ember text-2xl group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-3xl md:text-5xl leading-[1] tracking-tight text-cream">
                    {c.title}
                  </h3>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {c.approach.slice(0, 4).map((t) => (
                      <li
                        key={t}
                        className="text-[11px] tracking-wide uppercase border border-cream/30 px-2.5 py-1 text-cream/85 backdrop-blur-sm"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
