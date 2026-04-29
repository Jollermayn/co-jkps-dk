import { createFileRoute } from "@tanstack/react-router";
import heroWave from "@/assets/hero-wave.jpg";
import caseWolt from "@/assets/case-wolt.jpg";
import caseBoliga from "@/assets/case-boliga.jpg";
import caseHearing from "@/assets/case-hearing.jpg";

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

const cases = [
  {
    no: "01",
    client: "Wolt",
    title: "Fra usynlig algoritme til informeret bud",
    desc:
      "Forbedret beslutningstagning for bude gennem øget transparens i platformens algoritmer og lønberegning.",
    tags: ["Service Design", "UX Research"],
    image: caseWolt,
  },
  {
    no: "02",
    client: "Boliga",
    title: "Reduceret kompleksitet i boligsøgning",
    desc:
      "Færre valg, bedre beslutninger på en platform med 6,5 mio. månedlige interaktioner.",
    tags: ["Product Design", "UX Research"],
    image: caseBoliga,
  },
  {
    no: "03",
    client: "Interaktiv høresimulering",
    title: "Inklusion i undervisningen",
    desc:
      "Binaural høresimulation valideret af hørehæmmede deltagere — ikke som information, men som indsigt.",
    tags: ["Concept Design", "Co-Creation"],
    image: caseHearing,
  },
];

const partners = [
  { name: "Danmarks Radio", note: "Broadcast, podcastproduktion og tværgående koordinering" },
  { name: "Danmarks Naturfredningsforening", note: "Kommunikation om bæredygtighed og brandudvikling" },
  { name: "Amnesty International", note: "Journalistisk formidling af menneskerettighedsspørgsmål" },
  { name: "Ulla Dyrløv", note: "Koncept- og platformudvikling med fokus på børns trivsel" },
  { name: "Concerto Copenhagen", note: "Engagement af publikum gennem kulturformidling" },
  { name: "Art Spirit Coaching", note: "Brand, koncept og kommunikation fra idé til lancering" },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-8 bg-ember" />
      <span className="eyebrow text-ember">{children}</span>
    </div>
  );
}

function Index() {
  return (
    <main className="bg-navy-deep text-cream">
      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-navy-deep/70 border-b border-cream/10">
        <nav className="mx-auto max-w-[1400px] px-6 md:px-10 h-16 flex items-center justify-between">
          <a href="#top" className="font-display text-lg tracking-tight">
            Jonas K.P. Sørensen
          </a>
          <ul className="hidden md:flex items-center gap-8 text-sm text-cream/80">
            <li><a href="#om" className="hover:text-ember transition-colors">Om</a></li>
            <li><a href="#kompetencer" className="hover:text-ember transition-colors">Kompetencer</a></li>
            <li><a href="#cases" className="hover:text-ember transition-colors">Cases</a></li>
            <li><a href="#partnere" className="hover:text-ember transition-colors">Samarbejder</a></li>
            <li>
              <a href="#kontakt" className="text-ember hover:underline underline-offset-4">Kontakt</a>
            </li>
          </ul>
        </nav>
      </header>

      {/* HERO */}
      <section id="top" className="pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="grid grid-cols-12 gap-6 md:gap-10">
            <div className="col-span-12 md:col-span-7">
              <Eyebrow>Portfolio · Digital konsulent · Aarhus</Eyebrow>
              <h1 className="font-display mt-8 text-[clamp(3rem,8vw,7.5rem)] leading-[0.92] tracking-[-0.02em] font-medium">
                Jonas K.P.<br />
                <span className="italic font-light">Sørensen</span>
              </h1>
              <p className="mt-8 text-lg md:text-2xl text-cream/85 max-w-xl leading-snug font-display italic">
                Digital konsulent · Brugeroplevelse &amp; digitale løsninger.
              </p>
              <p className="mt-6 max-w-md text-cream/65 text-base">
                Selvstændig siden 2016. Jeg arbejder i skæringsfeltet mellem strategi, design og teknologi.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#kontakt"
                  className="inline-flex items-center gap-3 bg-ember text-cream px-6 py-3 text-sm tracking-wide hover:bg-ember/90 transition-colors"
                >
                  Lad os tales ved <span aria-hidden>→</span>
                </a>
                <a
                  href="#cases"
                  className="inline-flex items-center gap-3 px-6 py-3 text-sm tracking-wide border border-cream/25 hover:border-ember hover:text-ember transition-colors"
                >
                  Se cases
                </a>
              </div>
            </div>

            <div className="col-span-12 md:col-span-5 flex items-end">
              <figure className="w-full">
                <img
                  src={heroWave}
                  alt="Crosshatch illustration af en bølge med en rød sol"
                  width={1536}
                  height={1280}
                  className="w-full h-auto mix-blend-screen opacity-95"
                />
              </figure>
            </div>
          </div>

          <blockquote className="mt-16 md:mt-24 border-l-2 border-ember pl-6 max-w-3xl">
            <p className="font-display italic text-2xl md:text-3xl leading-snug text-cream/95">
              "Teknologien er kun så god som den{" "}
              <mark className="bg-transparent text-ember">menneskelige oplevelse,</mark> den skaber."
            </p>
          </blockquote>
        </div>
      </section>

      {/* OM MIG */}
      <section id="om" className="py-24 md:py-36 border-t border-cream/10">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-4">
            <Eyebrow>Om mig</Eyebrow>
            <h2 className="font-display text-5xl md:text-7xl mt-6 leading-[0.95] tracking-tight">
              Hvor noget abstrakt bliver <span className="italic text-ember">konkret</span>.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-6 space-y-6 text-cream/80 text-lg leading-relaxed">
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
            <p>
              Uddannet cand.it i Digital Design og Interaktive Teknologier samt professionsbachelor i medie-
              og sonokommunikation fra Sonic College. Et fagligt ståsted, hvor analytisk overblik møder en
              kreativ og praksisnær tilgang.
            </p>
            <p className="text-cream/60 italic font-display">
              Privat er jeg familiefar, naturmenneske og det, man nok ville kalde en seriøs lytter.
            </p>

            <dl className="hairline pt-8 mt-10 grid grid-cols-2 gap-y-6 gap-x-8 text-sm">
              <div>
                <dt className="eyebrow text-ember">Uddannelse</dt>
                <dd className="mt-2 text-cream/85">
                  Cand.it · Digital Design og Interaktive Teknologier · IT-Universitetet København
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-ember">Professionsbachelor</dt>
                <dd className="mt-2 text-cream/85">
                  Medie- og sonokommunikation · Sonic College
                </dd>
              </div>
              <div className="col-span-2">
                <dt className="eyebrow text-ember">Kernekompetencer</dt>
                <dd className="mt-2 text-cream/85">
                  Brugerinddragelse · Branding · Konceptudvikling · Service Design · UX Research
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* KOMPETENCER */}
      <section id="kompetencer" className="py-24 md:py-36 border-t border-cream/10">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="grid grid-cols-12 gap-6 md:gap-10 mb-16 md:mb-24">
            <div className="col-span-12 md:col-span-5">
              <Eyebrow>Kompetencer</Eyebrow>
              <h2 className="font-display text-5xl md:text-7xl mt-6 leading-[0.95] tracking-tight">
                Hvad jeg <span className="italic">bringer</span>.
              </h2>
            </div>
            <p className="col-span-12 md:col-span-6 md:col-start-7 text-lg text-cream/75 self-end leading-relaxed">
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

      {/* CASES */}
      <section id="cases" className="py-24 md:py-36 border-t border-cream/10">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="grid grid-cols-12 gap-6 md:gap-10 mb-16 md:mb-24">
            <div className="col-span-12 md:col-span-7">
              <Eyebrow>Udvalgte cases</Eyebrow>
              <h2 className="font-display text-5xl md:text-7xl mt-6 leading-[0.95] tracking-tight">
                Tre projekter.<br />
                <span className="italic text-ember">Ét princip</span>: lad arbejdet tale.
              </h2>
            </div>
            <p className="col-span-12 md:col-span-4 md:col-start-9 text-lg text-cream/75 self-end leading-relaxed">
              Brugeroplevelser, service design og digital konceptudvikling — kort fortalt.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-6 md:gap-8">
            {cases.map((c, i) => (
              <article
                key={c.no}
                className={`col-span-12 md:col-span-6 ${i === 0 ? "md:col-span-8" : ""} ${i === 1 ? "md:col-span-4" : ""} ${i === 2 ? "md:col-span-12 lg:col-span-12" : ""}`}
              >
                <div className="bg-cream text-navy-deep group cursor-pointer overflow-hidden">
                  <div className="overflow-hidden">
                    <img
                      src={c.image}
                      alt={`${c.client} — ${c.title}`}
                      width={1024}
                      height={768}
                      loading="lazy"
                      className="w-full h-[280px] md:h-[420px] object-cover group-hover:scale-[1.02] transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6 md:p-10">
                    <div className="flex items-center justify-between gap-4">
                      <span className="eyebrow text-ember">Case {c.no} · {c.client}</span>
                      <span className="text-ember text-xl group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                    <h3 className="font-display text-3xl md:text-5xl mt-4 leading-[1] tracking-tight">
                      {c.title}
                    </h3>
                    <p className="mt-4 text-navy-deep/75 max-w-2xl leading-relaxed">{c.desc}</p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {c.tags.map((t) => (
                        <li
                          key={t}
                          className="text-[11px] tracking-wide uppercase border border-navy-deep/20 px-2.5 py-1 text-navy-deep/70"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERE */}
      <section id="partnere" className="py-24 md:py-36 border-t border-cream/10">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="grid grid-cols-12 gap-6 md:gap-10 mb-16 md:mb-24">
            <div className="col-span-12 md:col-span-6">
              <Eyebrow>Tidligere samarbejdspartnere</Eyebrow>
              <h2 className="font-display text-5xl md:text-7xl mt-6 leading-[0.95] tracking-tight">
                Et bredt <span className="italic text-ember">felt</span>.
              </h2>
            </div>
            <p className="col-span-12 md:col-span-5 md:col-start-8 text-lg text-cream/75 self-end leading-relaxed">
              Fra public broadcast til NGO, kulturliv og private brands.
            </p>
          </div>

          <ul className="divide-y divide-cream/10 border-y border-cream/10">
            {partners.map((p, i) => (
              <li
                key={p.name}
                className="group py-8 md:py-10 grid grid-cols-12 gap-6 items-baseline hover:bg-navy/40 transition-colors -mx-6 md:-mx-10 px-6 md:px-10"
              >
                <span className="col-span-2 md:col-span-1 text-ember font-display">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="col-span-10 md:col-span-5 font-display text-2xl md:text-4xl tracking-tight">
                  {p.name}
                </h3>
                <p className="col-span-12 md:col-span-6 text-cream/70">{p.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* KONTAKT */}
      <section id="kontakt" className="py-24 md:py-40 border-t border-cream/10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
          <img src={heroWave} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 relative">
          <Eyebrow>Kontakt · Portfolio 2026</Eyebrow>
          <h2 className="font-display text-6xl md:text-9xl mt-8 leading-[0.9] tracking-tight">
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
                className="block mt-3 font-display text-2xl md:text-3xl hover:text-ember transition-colors break-all"
              >
                Jonas@jkps.dk
              </a>
            </div>
            <div className="col-span-12 md:col-span-4">
              <span className="eyebrow text-ember">Telefon</span>
              <a
                href="tel:+4560959596"
                className="block mt-3 font-display text-2xl md:text-3xl hover:text-ember transition-colors"
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
                className="block mt-3 font-display text-2xl md:text-3xl hover:text-ember transition-colors"
              >
                Kontakt mig på LinkedIn
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

      {/* FOOTER */}
      <footer className="border-t border-cream/10 py-10">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-sm text-cream/55">
          <p>Jonas K.P. Sørensen · Digital konsulent · Aarhus</p>
          <p>© {new Date().getFullYear()} · Selvstændig siden 2016</p>
        </div>
      </footer>
    </main>
  );
}
