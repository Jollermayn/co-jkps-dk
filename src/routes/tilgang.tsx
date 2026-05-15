import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/tilgang")({
  head: () => ({
    meta: [
      { title: "Min tilgang — Jonas K.P. Sørensen" },
      {
        name: "description",
        content:
          "Fire faser fra indsigt til færdigt output: Research, konceptudvikling, design og formidling.",
      },
      { property: "og:title", content: "Min tilgang — Jonas K.P. Sørensen" },
      {
        property: "og:description",
        content:
          "Fire faser fra indsigt til færdigt output: Research, konceptudvikling, design og formidling.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: TilgangPage,
});

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex flex-col items-stretch w-fit cursor-default">
      <span className="eyebrow text-ember">{children}</span>
      <span aria-hidden className="mt-1.5 block h-px w-1/2 bg-[#B83A20]" />
    </span>
  );
}

const phases = [
  {
    no: "01",
    title: "Research & indsigt",
    body: "Jeg starter med at forstå mennesket bag problemet. Interviews, feltobservation, co-design og mixed methods. Ikke hvad folk siger de gør — men hvad de faktisk gør.",
    cases: ["Wolt", "Høresimulering"],
  },
  {
    no: "02",
    title: "Konceptudvikling",
    body: "Indsigten omsættes til konkrete idéer og løsningsforslag. Brugerrejser, touchpoints og servicedesign. Fra abstrakt problem til realiserbart koncept.",
    cases: ["Boliga", "Art Spirit Coaching"],
  },
  {
    no: "03",
    title: "Design & eksekvering",
    body: "Konceptet bliver til et færdigt visuelt output. Figma, Adobe, digitale prototyper. Jeg leverer hele vejen til færdigt produkt.",
    cases: ["Boliga", "Wolt"],
  },
  {
    no: "04",
    title: "Formidling & implementering",
    body: "Det færdige design skal lande hos dem der skal bruge det. Kommunikation der giver mening i hverdagen.",
    cases: ["DR", "Amnesty", "Danmarks Naturfredningsforening"],
  },
];

function TilgangPage() {
  return (
    <main className="min-h-screen bg-[#0D1B2A] text-cream">
      {/* Header */}
      <section className="pt-20 md:pt-28 pb-12 md:pb-16 px-5 md:px-14">
        <Eyebrow>Min tilgang</Eyebrow>
        <h1 className="font-display text-5xl md:text-7xl mt-6 leading-[0.95] tracking-tight max-w-4xl">
          Fra <span className="italic text-ember">indsigt</span> til <span className="italic">output</span>
        </h1>
        <p className="mt-8 max-w-3xl text-lg md:text-xl text-cream/80 leading-relaxed">
          Uanset opgavens størrelse arbejder jeg altid i fire faser. Det sikrer at vi ender med en løsning der virker i praksis — ikke bare i teorien.
        </p>
      </section>

      {/* Phases */}
      <section className="pb-20 md:pb-28 px-5 md:px-14">
        <div className="border-t border-cream/10" />
        <ul className="divide-y divide-cream/10 border-b border-cream/10">
          {phases.map((phase) => (
            <li
              key={phase.no}
              className="group py-10 md:py-14 hover:bg-navy/40 transition-colors -mx-5 md:-mx-14 px-5 md:px-14"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                <span className="font-display text-3xl md:text-4xl text-ember shrink-0 md:w-16">
                  {phase.no}
                </span>
                <div className="flex-1 min-w-0">
                  <h2 className="font-display text-2xl md:text-4xl tracking-tight leading-tight">
                    {phase.title}
                  </h2>
                  <p className="mt-4 max-w-3xl text-base md:text-lg text-cream/80 leading-relaxed">
                    {phase.body}
                  </p>
                  <p className="mt-4 text-sm text-cream/55 italic">
                    Cases: {phase.cases.join(", ")}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Footer CTA */}
      <section className="pb-20 md:pb-28 px-5 md:px-14">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[1.1rem] font-bold tracking-wide text-[#B83A20] underline underline-offset-4 hover:text-cream active:text-cream transition-colors duration-300"
          >
            <span aria-hidden>←</span> Tilbage til portfolio
          </Link>
          <a
            href="mailto:Jonas@jkps.dk"
            className="inline-flex items-center justify-center gap-3 text-sm font-semibold tracking-wide bg-transparent text-[#F5F0E8] border-2 border-[#F5F0E8] hover:bg-[#F5F0E8] hover:text-[#0D1B2A] transition-all duration-300 ease-out"
            style={{ padding: "12px 28px", borderRadius: "50px" }}
          >
            Kontakt mig
          </a>
        </div>
      </section>
    </main>
  );
}
