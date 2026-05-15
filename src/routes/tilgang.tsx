import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

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

const NAVY = "#0A1628";
const RED = "#C0281E";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex flex-col items-stretch w-fit cursor-default">
      <span className="eyebrow text-ember">{children}</span>
      <span aria-hidden className="mt-1.5 block h-px w-1/2 bg-[#B83A20]" />
    </span>
  );
}

const cards = [
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
];

/* ---------- HOVER PREVIEWS (compact, fill image area) ---------- */

function PreviewOnePager() {
  return (
    <div className="absolute inset-0 p-4 flex gap-2">
      {["Hvor vi er nu", "Hvor vi vil hen", "Hvordan"].map((h, i) => (
        <div
          key={h}
          className="flex-1 rounded-sm p-2.5 flex flex-col"
          style={{ backgroundColor: i === 1 ? NAVY : "rgba(245,240,232,0.92)", color: i === 1 ? "#F5F0E8" : NAVY }}
        >
          <span className="text-[8px] uppercase tracking-[0.2em] font-bold" style={{ color: RED }}>0{i + 1}</span>
          <span className="mt-1 text-[10px] font-bold leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>{h}</span>
          <div className="mt-2 space-y-1">
            <div className="h-px w-full opacity-30" style={{ backgroundColor: i === 1 ? "#F5F0E8" : NAVY }} />
            <div className="h-px w-3/4 opacity-30" style={{ backgroundColor: i === 1 ? "#F5F0E8" : NAVY }} />
            <div className="h-px w-5/6 opacity-30" style={{ backgroundColor: i === 1 ? "#F5F0E8" : NAVY }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function PreviewOnboarding() {
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-2 p-4">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="rounded-[14px] overflow-hidden flex flex-col shrink-0"
          style={{
            backgroundColor: NAVY,
            border: "2px solid rgba(245,240,232,0.2)",
            width: i === 1 ? 78 : 64,
            height: i === 1 ? 150 : 130,
            transform: i === 1 ? "translateY(-4px)" : "translateY(4px) scale(0.95)",
            opacity: i === 1 ? 1 : 0.7,
          }}
        >
          <div className="h-1" style={{ backgroundColor: "rgba(245,240,232,0.1)" }}>
            <div className="h-full" style={{ width: `${(i + 1) * 33}%`, backgroundColor: RED }} />
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-2 gap-1.5">
            <div className="h-1 w-8 rounded-full" style={{ backgroundColor: "rgba(245,240,232,0.4)" }} />
            <div className="h-1 w-12 rounded-full" style={{ backgroundColor: "rgba(245,240,232,0.6)" }} />
            <div className="h-1 w-6 rounded-full" style={{ backgroundColor: "rgba(245,240,232,0.3)" }} />
            <div className="mt-2 h-3 w-10 rounded-full" style={{ backgroundColor: RED }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function PreviewToneOfVoice() {
  return (
    <div className="absolute inset-0 p-4 grid grid-cols-2 gap-2">
      {[
        { label: "Ikke", color: "rgba(220,38,38,0.5)", bg: "rgba(220,38,38,0.08)" },
        { label: "Sådan", color: "rgba(16,185,129,0.6)", bg: "rgba(16,185,129,0.08)" },
      ].map((c) => (
        <div
          key={c.label}
          className="rounded-sm p-3 flex flex-col gap-2"
          style={{ backgroundColor: c.bg, border: `1px solid ${c.color}` }}
        >
          <span className="text-[8px] uppercase tracking-[0.2em] font-bold" style={{ color: c.color, opacity: 0.95 }}>{c.label}</span>
          <div className="space-y-1.5 mt-1">
            <div className="h-1 w-full rounded-full" style={{ backgroundColor: "rgba(245,240,232,0.4)" }} />
            <div className="h-1 w-5/6 rounded-full" style={{ backgroundColor: "rgba(245,240,232,0.4)" }} />
            <div className="h-1 w-3/4 rounded-full" style={{ backgroundColor: "rgba(245,240,232,0.4)" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function PreviewKommunikationskit() {
  return (
    <div className="absolute inset-0 p-4 flex flex-col gap-2 justify-center">
      {[
        { ratio: "16/9", bg: NAVY, accent: "#F5F0E8" },
        { ratio: "4/1", bg: "#F5F0E8", accent: NAVY },
        { ratio: "3/1", bg: "#F5F0E8", accent: NAVY },
      ].map((t, i) => (
        <div
          key={i}
          className="rounded-sm flex items-center px-3 gap-2"
          style={{ backgroundColor: t.bg, height: i === 0 ? 48 : 28 }}
        >
          <div className="w-1 h-3/5 rounded-full" style={{ backgroundColor: RED }} />
          <div className="flex-1 space-y-1">
            <div className="h-1 w-1/2 rounded-full" style={{ backgroundColor: t.accent, opacity: 0.7 }} />
            {i === 0 && <div className="h-1 w-3/4 rounded-full" style={{ backgroundColor: t.accent, opacity: 0.4 }} />}
          </div>
        </div>
      ))}
    </div>
  );
}

const previews: Record<string, React.ReactNode> = {
  "01": <PreviewOnePager />,
  "02": <PreviewOnboarding />,
  "03": <PreviewToneOfVoice />,
  "04": <PreviewKommunikationskit />,
};

/* ---------- POPUP CONTENT ---------- */

function OnePagerContent() {
  const cols = [
    {
      h: "Hvor vi er nu",
      body: "Microsoft Copilot rullet ud til 80 medarbejdere. Adoption: 23%. Medarbejderne oplever AI som noget der sker for dem — ikke med dem.",
      stat: "23%",
      label: "aktiv adoption",
    },
    {
      h: "Hvor vi vil hen",
      body: "15% frigjort administrativ tid inden udgangen af 2025. Ikke ved at erstatte mennesker — men ved at frigøre dem til det der skaber reel rådgivningsværdi.",
      stat: "15%",
      label: "frigjort tid · ultimo 2025",
    },
    {
      h: "Hvordan vi kommer der",
      body: "Kompetenceløft: Målrettet onboarding i Copilot og Power BI. Kommunikation: Månedlige use cases der viser konkret værdi. Måling: Kvartalsvise adoption-målinger med handleplan.",
      stat: "Q4",
      label: "første måling 2025",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {cols.map((c, i) => (
        <div
          key={c.h}
          className="p-6 md:p-7 flex flex-col"
          style={{
            backgroundColor: i === 1 ? NAVY : "#F5F0E8",
            color: i === 1 ? "#F5F0E8" : NAVY,
          }}
        >
          <span className="text-3xl font-bold leading-none" style={{ color: RED, fontFamily: "'Playfair Display', serif" }}>
            0{i + 1}
          </span>
          <h4
            className="text-2xl mt-3 leading-tight font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {c.h}
          </h4>
          <p className="mt-4 text-sm leading-relaxed flex-1" style={{ opacity: 0.85 }}>
            {c.body}
          </p>
          <div className="mt-6 pt-4 border-t" style={{ borderColor: i === 1 ? "rgba(245,240,232,0.2)" : "rgba(10,22,40,0.15)" }}>
            <div className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>{c.stat}</div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.2em] font-semibold" style={{ opacity: 0.7 }}>
              {c.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function OnboardingContent() {
  const screens = [
    {
      t: "Velkommen",
      body: (
        <div className="flex flex-col items-center text-center gap-4">
          <div className="text-[10px] uppercase tracking-[0.3em] text-cream/50">Vind Consulting</div>
          <h5 className="font-display text-2xl text-cream">Velkommen til Vind Consulting</h5>
          <p className="text-sm text-cream/75 leading-relaxed">Lad os gøre det digitale konkret. På tre minutter.</p>
          <button className="mt-4 px-5 py-2.5 rounded-full text-white text-xs font-semibold tracking-wide" style={{ backgroundColor: RED }}>
            Kom i gang →
          </button>
        </div>
      ),
    },
    {
      t: "Dine tre værktøjer",
      body: (
        <div className="flex flex-col gap-4">
          <h5 className="font-display text-xl text-cream">Dine tre værktøjer</h5>
          {[
            { n: "Teams", d: "Sådan samarbejder vi på tværs." },
            { n: "Copilot", d: "Din digitale kollega — ikke din erstatning." },
            { n: "Power BI", d: "Din data, gjort visuel og handlingsklar." },
          ].map((tool) => (
            <div key={tool.n} className="border border-cream/15 rounded p-3">
              <div className="text-[10px] uppercase tracking-[0.25em] font-bold" style={{ color: RED }}>{tool.n}</div>
              <p className="mt-1 text-xs text-cream/80 leading-snug">{tool.d}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      t: "Din første uge",
      body: (
        <div className="flex flex-col gap-4">
          <h5 className="font-display text-xl text-cream">Din første uge</h5>
          <ol className="relative pl-6 space-y-5">
            <span className="absolute left-[7px] top-2 bottom-2 w-px" style={{ backgroundColor: "rgba(245,240,232,0.2)" }} />
            {[
              { d: "Dag 1", t: "Setup & login. Du er online inden frokost." },
              { d: "Dag 2", t: "Workshop: Copilot i din hverdag." },
              { d: "Dag 3", t: "Du leverer dit første konkrete output." },
            ].map((d) => (
              <li key={d.d} className="relative">
                <span className="absolute -left-6 top-1 w-3 h-3 rounded-full" style={{ backgroundColor: RED }} />
                <div className="text-[10px] uppercase tracking-[0.25em] font-bold text-cream/60">{d.d}</div>
                <p className="mt-0.5 text-xs text-cream/85 leading-snug">{d.t}</p>
              </li>
            ))}
          </ol>
        </div>
      ),
    },
    {
      t: "Spørgsmål?",
      body: (
        <div className="flex flex-col gap-4">
          <h5 className="font-display text-xl text-cream">Spørgsmål?</h5>
          <ul className="space-y-3">
            {[
              "Skriv i #ai-help på Teams — vi svarer samme dag.",
              "Booking: 30 min med en Copilot-mentor.",
              "Månedlige drop-ins: torsdag kl. 14.",
            ].map((b) => (
              <li key={b} className="flex gap-2.5 text-xs text-cream/85 leading-snug">
                <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: RED }} />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      t: "Du er klar",
      body: (
        <div className="flex flex-col items-center text-center gap-4">
          <div className="text-[10px] uppercase tracking-[0.3em] text-cream/50">Klar</div>
          <h5 className="font-display text-2xl text-cream">Du er klar.</h5>
          <p className="font-display italic text-cream/85 text-base leading-relaxed">
            "Teknologien er her for at hjælpe dig.<br />Ikke omvendt."
          </p>
          <button className="mt-4 px-5 py-2.5 rounded-full text-white text-xs font-semibold tracking-wide" style={{ backgroundColor: RED }}>
            Start dagen
          </button>
        </div>
      ),
    },
  ];
  const [step, setStep] = useState(0);
  return (
    <div>
      <div className="flex items-center justify-center gap-4 md:gap-6">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-cream/10 hover:bg-cream/20 disabled:opacity-30 disabled:cursor-not-allowed text-cream transition-colors"
          aria-label="Forrige"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div
          className="relative w-[280px] h-[560px] rounded-[2.5rem] border-[6px] shadow-2xl overflow-hidden flex flex-col"
          style={{ backgroundColor: NAVY, borderColor: "rgba(245,240,232,0.2)" }}
        >
          <div className="h-1" style={{ backgroundColor: "rgba(245,240,232,0.1)" }}>
            <div className="h-full transition-all" style={{ width: `${((step + 1) / screens.length) * 100}%`, backgroundColor: RED }} />
          </div>
          <div className="flex-1 p-6 flex flex-col justify-center">
            <span className="text-[10px] uppercase tracking-[0.3em] text-cream/50 text-center mb-4">
              Skærm {step + 1} / {screens.length}
            </span>
            {screens[step].body}
          </div>
        </div>
        <button
          onClick={() => setStep((s) => Math.min(screens.length - 1, s + 1))}
          disabled={step === screens.length - 1}
          className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-cream/10 hover:bg-cream/20 disabled:opacity-30 disabled:cursor-not-allowed text-cream transition-colors"
          aria-label="Næste"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      <div className="mt-6 flex items-center justify-center gap-2">
        {screens.map((_, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            className="h-1.5 rounded-full transition-all"
            style={{
              width: i === step ? 32 : 6,
              backgroundColor: i === step ? RED : "rgba(245,240,232,0.3)",
            }}
            aria-label={`Gå til skærm ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function ToneOfVoiceContent() {
  const principles = [
    {
      h: "Konkret frem for abstrakt",
      wrong: "Vi implementerer en AI-drevet arbejdsgang.",
      right: "Copilot skriver dit mødereferat — du bruger 10 minutter på at godkende det.",
    },
    {
      h: "Mennesket først",
      wrong: "Effektiviseringen kræver omstilling.",
      right: "Vi gør det lettere at gøre det vi er bedst til.",
    },
    {
      h: "Ærlig om hvad det ikke er",
      wrong: "AI løser vores udfordringer.",
      right: "AI er et værktøj. Vi er stadig dem der tænker.",
    },
  ];
  return (
    <div className="space-y-8">
      {principles.map((p, i) => (
        <div key={p.h}>
          <div className="flex items-baseline gap-3">
            <span className="font-display text-xl" style={{ color: RED }}>0{i + 1}</span>
            <h4 className="font-display text-2xl tracking-tight">{p.h}</h4>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-red-500/30 bg-red-500/[0.06] p-5">
              <span className="text-[10px] uppercase tracking-[0.25em] text-red-400 font-semibold">Ikke</span>
              <p className="mt-2 text-sm md:text-base text-cream/85 leading-relaxed italic">"{p.wrong}"</p>
            </div>
            <div className="border border-emerald-500/30 bg-emerald-500/[0.06] p-5">
              <span className="text-[10px] uppercase tracking-[0.25em] text-emerald-400 font-semibold">Men</span>
              <p className="mt-2 text-sm md:text-base text-cream/85 leading-relaxed italic">"{p.right}"</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function KommunikationskitContent() {
  const templates = [
    {
      t: "All-hands slide",
      label: "Slide · 16:9",
      preview: (
        <div className="aspect-video w-full p-8 flex flex-col" style={{ backgroundColor: NAVY }}>
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold" style={{ color: RED }}>Q3 update</span>
          <h5 className="font-display text-3xl md:text-4xl text-cream mt-3 leading-tight">
            Hvad virker — og hvad virker ikke endnu.
          </h5>
          <ul className="mt-6 grid grid-cols-3 gap-6 flex-1 items-end">
            {[
              { h: "Hvad vi har lært", t: "Konkrete use cases skaber adoption." },
              { h: "Hvad vi ændrer", t: "Færre webinarer. Flere drop-ins." },
              { h: "Hvad vi forventer af jer", t: "Prøv én ting. Del en historie." },
            ].map((b) => (
              <li key={b.h}>
                <div className="text-[10px] uppercase tracking-[0.2em] font-bold" style={{ color: RED }}>{b.h}</div>
                <p className="mt-2 text-cream/80 text-sm leading-snug">{b.t}</p>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      t: "Intern nyhedsbrev",
      label: "E-mail · 600px",
      preview: (
        <div className="w-full p-6 border border-cream/15" style={{ backgroundColor: "#F5F0E8", color: NAVY }}>
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold" style={{ color: RED }}>Månedligt nyhedsbrev</span>
          <h5 className="font-display text-xl md:text-2xl mt-2">Denne måned i tal</h5>
          <p className="mt-3 text-sm leading-relaxed" style={{ opacity: 0.8 }}>
            Denne måned har vi set <strong>34 medarbejdere</strong> bruge Copilot til mødereferater. Resultatet: <strong>140 timer frigjort</strong>. Her er hvad vi gør mere af fremover.
          </p>
          <span className="mt-4 inline-block text-xs font-semibold underline" style={{ color: RED }}>Læs hele opdateringen →</span>
        </div>
      ),
    },
    {
      t: "One-pager til nyt værktøj",
      label: "A4 · PDF",
      preview: (
        <div className="w-full p-6 border border-cream/15" style={{ backgroundColor: "#F5F0E8", color: NAVY }}>
          <div className="flex items-baseline justify-between">
            <h5 className="font-display text-xl md:text-2xl">Power BI · Hurtigstart</h5>
            <span className="text-[10px] uppercase tracking-[0.25em]" style={{ opacity: 0.5 }}>v1.0</span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
            {[
              { h: "Hvad er det", t: "Visuel data — på minutter, ikke dage." },
              { h: "Hvad gør det for dig", t: "Du finder svar uden at vente på rapporter." },
              { h: "Kom i gang på 5 minutter", t: "Log ind. Vælg dashboard. Tilpas. Færdig." },
            ].map((b) => (
              <div key={b.h}>
                <span className="font-semibold block mb-1" style={{ color: RED }}>{b.h}</span>
                <span style={{ opacity: 0.75 }}>{b.t}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="space-y-8">
      {templates.map((t, i) => (
        <div key={t.t}>
          <div className="flex items-baseline justify-between gap-4 mb-3">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-xl" style={{ color: RED }}>0{i + 1}</span>
              <h4 className="font-display text-2xl tracking-tight">{t.t}</h4>
            </div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-cream/45">{t.label}</span>
          </div>
          {t.preview}
        </div>
      ))}
    </div>
  );
}


/* ---------- MODAL ---------- */

function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-start md:items-center justify-center" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className="relative w-full md:max-w-5xl max-h-screen md:max-h-[90vh] overflow-y-auto md:m-6 bg-[#0D1B2A] border border-cream/10 md:rounded-lg shadow-2xl animate-scale-in">
        <button
          onClick={onClose}
          aria-label="Luk"
          className="absolute top-4 right-4 z-10 w-10 h-10 inline-flex items-center justify-center rounded-full bg-cream/10 hover:bg-cream/20 text-cream transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="p-6 md:p-12">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold" style={{ color: RED }}>
            Vind Consulting · Konceptprojekt
          </span>
          <h3 className="font-display text-3xl md:text-5xl tracking-tight leading-[1.05] mt-3">{title}</h3>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}

/* ---------- PAGE ---------- */

function TilgangPage() {
  const [openCard, setOpenCard] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-[#0D1B2A] text-cream">
      <section className="pt-20 md:pt-28 pb-12 md:pb-16 px-5 md:px-14">
        <Eyebrow>Min tilgang</Eyebrow>
        <h1 className="font-display text-5xl md:text-7xl mt-6 leading-[0.95] tracking-tight max-w-4xl">
          Fra <span className="italic text-ember">indsigt</span> til <span className="italic">output</span>
        </h1>
      </section>

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

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
            {cards.map((card) => (
              <button
                key={card.no}
                type="button"
                onClick={() => setOpenCard(card.no)}
                className="group flex flex-col text-left border border-cream/10 bg-cream/[0.02] hover:bg-cream/[0.04] hover:border-cream/20 focus:bg-cream/[0.04] focus:border-cream/20 transition-colors outline-none cursor-pointer"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-cream/10" style={{ backgroundColor: NAVY }}>
                  {/* Default state */}
                  <div className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-0 group-focus:opacity-0 bg-gradient-to-br from-cream/5 to-cream/[0.02]">
                    <span className="absolute top-4 left-4 font-display text-2xl text-ember">{card.no}</span>
                    <span className="absolute bottom-4 right-4 text-[10px] uppercase tracking-[0.25em] text-cream/40">
                      Hover for preview · klik for detaljer
                    </span>
                  </div>
                  {/* Hover preview */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300">
                    {previews[card.no]}
                  </div>
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-xl md:text-2xl tracking-tight leading-tight">
                      {card.title}
                    </h3>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-cream/40 group-hover:text-ember transition-colors shrink-0">
                      Se mere →
                    </span>
                  </div>
                  <p className="mt-3 text-sm md:text-base text-cream/75 leading-relaxed">
                    {card.body}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <p className="mt-10 text-sm text-cream/55 italic">
            Konceptprojekt · Servicedesign · Konceptudvikling · Strategisk kommunikation
          </p>
        </div>
      </section>

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

      <Modal open={openCard === "01"} onClose={() => setOpenCard(null)} title="AI-strategi one-pager">
        <OnePagerContent />
      </Modal>
      <Modal open={openCard === "02"} onClose={() => setOpenCard(null)} title="Onboarding-flow">
        <OnboardingContent />
      </Modal>
      <Modal open={openCard === "03"} onClose={() => setOpenCard(null)} title="Tone of voice guide">
        <ToneOfVoiceContent />
      </Modal>
      <Modal open={openCard === "04"} onClose={() => setOpenCard(null)} title="Kommunikationskit">
        <KommunikationskitContent />
      </Modal>
    </main>
  );
}
