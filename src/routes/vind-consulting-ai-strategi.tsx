import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/vind-consulting-ai-strategi")({
  head: () => ({
    meta: [
      { title: "AI-strategi one-pager — Vind Consulting" },
      {
        name: "description",
        content:
          "A4 one-pager: Hvor vi er nu, hvor vi vil hen, og hvordan vi kommer der. Vind Consultings AI-strategi.",
      },
      { property: "og:title", content: "AI-strategi one-pager — Vind Consulting" },
      {
        property: "og:description",
        content:
          "Tre kolonner: Hvor vi er nu, hvor vi vil hen, og hvordan vi kommer der.",
      },
      { property: "og:type", content: "article" },
    ],
  }),
  component: AiStrategiPage,
});

const NAVY = "#0A1628";
const RED = "#C0281E";

function AiStrategiPage() {
  const columns = [
    {
      no: "01",
      title: "Hvor vi er nu",
      lede: "Værktøjet er på plads. Kulturen er ikke.",
      bullets: [
        "Microsoft Copilot rullet ud til 80 medarbejdere",
        "Adoption: 23%",
        "Medarbejderne oplever AI som noget der sker for dem — ikke med dem",
        "Manglende fælles sprog om hvad AI skal bruges til",
      ],
      stat: { value: "23%", label: "aktiv adoption" },
    },
    {
      no: "02",
      title: "Hvor vi vil hen",
      lede: "Frigjort tid. Tydelig retning. Fælles forståelse.",
      bullets: [
        "15% frigjort administrativ tid inden udgangen af 2025",
        "AI som naturlig del af hverdagens arbejdsgange",
        "Fælles sprog om hvornår AI hjælper — og hvornår det ikke gør",
        "Ledelse og medarbejdere taler samme sprog om transformationen",
      ],
      stat: { value: "15%", label: "frigjort tid · ultimo 2025" },
    },
    {
      no: "03",
      title: "Hvordan vi kommer der",
      lede: "Tre konkrete spor. Tre måneder ad gangen.",
      bullets: [
        "Kompetenceløft: praksisnære workshops for alle teams",
        "Månedlige use cases: konkrete eksempler delt internt",
        "Kvartalsvise målinger: adoption, tidsbesparelse, tilfredshed",
        "Tone of voice og kommunikationskit til ledelsen",
      ],
      stat: { value: "Q4 2025", label: "første måling" },
    },
  ];

  return (
    <main
      className="min-h-screen w-full flex flex-col items-center py-8 md:py-16 px-4"
      style={{ backgroundColor: "#1a1a1a" }}
    >
      {/* Print controls — hidden on print */}
      <div className="w-full max-w-[210mm] mb-6 flex items-center justify-between print:hidden">
        <a
          href="/tilgang"
          className="text-sm font-semibold tracking-wide text-[#F5F0E8] underline underline-offset-4 hover:text-[#C0281E] transition-colors"
        >
          ← Tilbage
        </a>
        <button
          onClick={() => window.print()}
          className="text-xs uppercase tracking-[0.2em] font-semibold text-[#F5F0E8] border border-[#F5F0E8]/40 hover:border-[#F5F0E8] px-4 py-2 rounded-full transition-colors"
        >
          Print / PDF
        </button>
      </div>

      {/* A4 Page — 210mm x 297mm */}
      <article
        className="bg-white text-[#0A1628] shadow-2xl print:shadow-none w-full max-w-[210mm] aspect-[210/297] flex flex-col"
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
        }}
      >
        {/* Header band */}
        <header
          className="flex items-stretch justify-between px-10 py-6 text-white"
          style={{ backgroundColor: NAVY }}
        >
          <div className="flex flex-col justify-between">
            <span
              className="text-[10px] uppercase tracking-[0.35em]"
              style={{ color: RED, fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
            >
              Konceptprojekt · Internt arbejdsdokument
            </span>
            <h1 className="text-3xl md:text-4xl leading-tight mt-2 font-bold">
              AI-strategi <span className="italic" style={{ color: RED }}>one-pager</span>
            </h1>
          </div>
          <div className="flex flex-col items-end justify-between text-right">
            <div
              className="text-[10px] uppercase tracking-[0.25em]"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, opacity: 0.7 }}
            >
              Vind Consulting
            </div>
            <div
              className="mt-2 text-[10px] uppercase tracking-[0.2em]"
              style={{ fontFamily: "'Inter', sans-serif", opacity: 0.55 }}
            >
              v1.0 · Q3 2025
            </div>
          </div>
        </header>

        {/* Subtitle / lede */}
        <div
          className="px-10 py-5 border-b"
          style={{ borderColor: "rgba(10,22,40,0.12)" }}
        >
          <p
            className="text-sm md:text-base leading-relaxed italic"
            style={{ color: "rgba(10,22,40,0.78)" }}
          >
            Vi har værktøjerne. Nu skal vi bygge kulturen. Tre kolonner — én retning.
          </p>
        </div>

        {/* Three columns */}
        <section className="flex-1 grid grid-cols-3 divide-x" style={{ borderColor: "rgba(10,22,40,0.1)" }}>
          {columns.map((col) => (
            <div key={col.no} className="flex flex-col p-6 md:p-7" style={{ borderColor: "rgba(10,22,40,0.1)" }}>
              <div className="flex items-baseline gap-3">
                <span
                  className="text-3xl md:text-4xl font-bold leading-none"
                  style={{ color: RED }}
                >
                  {col.no}
                </span>
                <span
                  className="text-[9px] uppercase tracking-[0.3em]"
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, color: "rgba(10,22,40,0.5)" }}
                >
                  Kolonne
                </span>
              </div>

              <h2 className="font-bold text-xl md:text-2xl mt-4 leading-tight">
                {col.title}
              </h2>
              <p
                className="mt-2 text-sm italic leading-snug"
                style={{ color: "rgba(10,22,40,0.7)" }}
              >
                {col.lede}
              </p>

              <ul
                className="mt-5 space-y-3 flex-1"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {col.bullets.map((b) => (
                  <li key={b} className="flex gap-2.5 text-[13px] leading-snug" style={{ color: "rgba(10,22,40,0.85)" }}>
                    <span style={{ color: RED }} className="font-bold shrink-0">—</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              {/* Stat block */}
              <div
                className="mt-5 pt-4 border-t"
                style={{ borderColor: "rgba(10,22,40,0.12)" }}
              >
                <div className="text-3xl md:text-4xl font-bold leading-none" style={{ color: NAVY }}>
                  {col.stat.value}
                </div>
                <div
                  className="mt-1.5 text-[10px] uppercase tracking-[0.2em]"
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, color: "rgba(10,22,40,0.55)" }}
                >
                  {col.stat.label}
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Footer band */}
        <footer
          className="flex items-center justify-between px-10 py-4 text-[10px] uppercase tracking-[0.25em]"
          style={{
            backgroundColor: NAVY,
            color: "rgba(245,240,232,0.7)",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
          }}
        >
          <span>Vind Consulting · AI-strategi 2025</span>
          <span className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: RED }} />
            Internt · ikke til ekstern distribution
          </span>
          <span>Side 1 / 1</span>
        </footer>
      </article>

      <style>{`
        @media print {
          body { background: white !important; }
          @page { size: A4; margin: 0; }
        }
      `}</style>
    </main>
  );
}
