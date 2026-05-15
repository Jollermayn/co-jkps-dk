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



function TilgangPage() {
  return (
    <main className="min-h-screen bg-[#0D1B2A] text-cream">
      {/* Header */}
      <section className="pt-20 md:pt-28 pb-12 md:pb-16 px-5 md:px-14">
        <Eyebrow>Min tilgang</Eyebrow>
        <h1 className="font-display text-5xl md:text-7xl mt-6 leading-[0.95] tracking-tight max-w-4xl">
          Fra <span className="italic text-ember">indsigt</span> til <span className="italic">output</span>
        </h1>
      </section>

      {/* I praksis — Case example */}
      <section className="pb-20 md:pb-28 px-5 md:px-14">
        <div className="border-t border-cream/10 pt-16 md:pt-24">
          <Eyebrow>I praksis</Eyebrow>
          <div className="mt-6 flex flex-col gap-3">
            <p className="text-xs uppercase tracking-[0.25em] text-cream/55">Konceptprojekt</p>
            <h2 className="font-display text-4xl md:text-6xl leading-[0.95] tracking-tight">
              Vind Consulting <span className="italic text-ember">· Digital transformation</span>
            </h2>
            <p className="font-display italic text-cream/90 text-xl md:text-2xl mt-2">
              80 medarbejdere. Fuld investering. 23% adoption.
            </p>
          </div>

          <p className="mt-8 max-w-3xl text-base md:text-lg text-cream/80 leading-relaxed">
            Vind Consulting havde værktøjerne. De manglede kulturen. AI-værktøjer rullet ud til 80 medarbejdere. Adoption på 23%. Ledelsen kommunikerede strategi — medarbejderne oplevede støj. Opgaven var at designe broen — fire konkrete leverancer der oversætter ambition til hverdag.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[
              {
                no: "01",
                title: "AI-strategi one-pager",
                body: "Et scanbart A4-dokument til direktionen. Tre kolonner: Hvor vi er nu / Hvor vi vil hen / Hvordan vi kommer der.",
              },
              {
                no: "02",
                title: "Onboarding-flow",
                body: "Fem skærmbilleder der guider nye medarbejdere fra fremmed til fortrolig med Vind Consultings digitale værktøjer.",
              },
              {
                no: "03",
                title: "Tone of voice guide",
                body: "Internt sprog der gør det digitale konkret. Ikke hvad vi siger — men hvordan vi siger det.",
              },
              {
                no: "04",
                title: "Kommunikationskit",
                body: "Tre skabeloner til forandringskommunikation: all-hands slide, intern nyhedsbrev-intro og one-pager til nyt værktøj.",
              },
            ].map((card) => (
              <div
                key={card.no}
                className="group flex flex-col border border-cream/10 bg-cream/[0.02] hover:bg-cream/[0.04] transition-colors"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-cream/5 to-cream/[0.02] border-b border-cream/10">
                  <span className="absolute top-4 left-4 font-display text-2xl text-ember">{card.no}</span>
                  <span className="absolute bottom-4 right-4 text-[10px] uppercase tracking-[0.25em] text-cream/40">
                    Placeholder
                  </span>
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="font-display text-xl md:text-2xl tracking-tight leading-tight">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm md:text-base text-cream/75 leading-relaxed">
                    {card.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-10 text-sm text-cream/55 italic">
            Konceptprojekt · Servicedesign · Konceptudvikling · Strategisk kommunikation
          </p>
        </div>
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
