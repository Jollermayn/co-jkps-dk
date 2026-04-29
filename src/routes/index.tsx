import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";

function HeroWaveSVG({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 600"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <defs>
        {/* Crosshatch pattern for the red sun */}
        <pattern id="sunHatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="#c0392b" strokeWidth="1.2" />
        </pattern>
        <pattern id="sunHatch2" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(-30)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="#a83224" strokeWidth="1" opacity="0.85" />
        </pattern>
      </defs>

      {/* Red crosshatch sun, upper right */}
      <g>
        <circle cx="615" cy="135" r="58" fill="url(#sunHatch)" />
        <circle cx="615" cy="135" r="58" fill="url(#sunHatch2)" />
        <circle cx="615" cy="135" r="58" fill="none" stroke="#a83224" strokeWidth="1.5" />
      </g>

      {/* Hand-drawn white wave crests (Hokusai-inspired) */}
      <g
        stroke="#f5efe6"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        {/* Three rolling crests */}
        <path d="M120 360 C 220 200, 330 200, 380 320 C 400 360, 360 380, 340 360 C 325 345, 335 320, 360 325" />
        <path d="M260 350 C 340 230, 430 230, 470 340 C 485 375, 450 390, 435 370 C 425 358, 435 338, 455 342" />
        <path d="M380 360 C 450 260, 530 260, 565 350 C 578 380, 548 395, 535 378 C 527 367, 535 350, 552 354" />

        {/* Long sweeping under-curves */}
        <path d="M60 430 C 220 360, 420 380, 720 420" />
        <path d="M70 470 C 240 410, 440 430, 740 460" />
        <path d="M80 510 C 260 460, 460 478, 760 498" />
        <path d="M100 548 C 280 510, 480 522, 770 538" />

        {/* Crosshatch suggestion in wave troughs */}
        <g opacity="0.55" strokeWidth="1.2">
          <path d="M180 440 L 230 470" />
          <path d="M210 442 L 250 468" />
          <path d="M310 460 L 360 488" />
          <path d="M340 462 L 380 486" />
          <path d="M470 470 L 520 495" />
          <path d="M500 472 L 540 494" />
          <path d="M610 478 L 660 500" />
          <path d="M635 480 L 675 502" />
        </g>
      </g>
    </svg>
  );
}

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
          <div className="max-w-4xl">
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
      <CasesSection />

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

      {/* KONTAKT */}
      <section id="kontakt" className="py-24 md:py-40 border-t border-cream/10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.06]">
          <HeroWaveSVG className="w-full h-full" />
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
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
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
            className="snap-start shrink-0 w-[85vw] sm:w-[70vw] md:w-[60vw] lg:w-[48vw] xl:w-[42vw]"
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
