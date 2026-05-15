import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X, Users, Bot, BarChart3, ArrowRight } from "lucide-react";
import vindAiStrategiOnePager from "@/assets/vind-ai-strategi-onepager.png";

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

const phases = [
  {
    no: "01",
    title: "Research & indsigt",
    body: "Jeg starter med mennesket bag problemet. Interviews, feltobservation, co-design.",
    body2: "Ikke hvad folk siger de gør — men hvad de faktisk gør.",
  },
  {
    no: "02",
    title: "Konceptudvikling",
    body: "Indsigten bliver til konkrete løsningsforslag. Brugerrejser, touchpoints og servicedesign.",
    body2: "Fra abstrakt til realiserbart.",
  },
  {
    no: "03",
    title: "Design & eksekvering",
    body: "Konceptet bliver til færdigt visuelt output. Figma, Adobe, digitale prototyper.",
    body2: "Hele vejen til færdigt produkt.",
  },
  {
    no: "04",
    title: "Formidling & implementering",
    body: "Det færdige design skal lande hos dem der skal bruge det.",
    body2: "Kommunikation der giver mening i hverdagen.",
  },
];

const cards = [
  {
    no: "01",
    phaseRef: "Fase 01",
    title: "AI-strategi one-pager",
    body: "Et scanbart A4-dokument til direktionen. Tre kolonner: Hvor vi er nu / Hvor vi vil hen / Hvordan vi kommer der.",
  },
  {
    no: "02",
    phaseRef: "Fase 02 + 03",
    title: "Onboarding-flow",
    body: "Fem skærmbilleder der guider nye medarbejdere fra fremmed til fortrolig med Vind Consultings digitale værktøjer.",
  },
  {
    no: "03",
    phaseRef: "Fase 03",
    title: "Tone of voice guide",
    body: "Internt sprog der gør det digitale konkret. Ikke hvad vi siger — men hvordan vi siger det.",
  },
  {
    no: "04",
    phaseRef: "Fase 04",
    title: "Kommunikationskit",
    body: "Tre skabeloner til forandringskommunikation: all-hands slide, intern nyhedsbrev-intro og one-pager til nyt værktøj.",
  },
];

/* ---------- HOVER PREVIEWS (compact, fill image area) ---------- */

function PreviewOnePager() {
  return (
    <img
      src={vindAiStrategiOnePager}
      alt="AI-strategi one-pager til Vind Consulting"
      className="absolute inset-0 w-full h-full object-cover"
    />
  );
}

function PreviewOnboarding() {
  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: "#F5F0E8" }}>
      <div
        className="rounded-[18px] overflow-hidden flex flex-col"
        style={{ backgroundColor: NAVY, padding: 4, width: 110, height: 180, boxShadow: "0 10px 30px rgba(10,22,40,0.25)" }}
      >
        <div className="flex-1 rounded-[14px] flex flex-col" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="h-1 mx-3 mt-3 rounded-full" style={{ backgroundColor: "rgba(10,22,40,0.08)" }}>
            <div className="h-full rounded-full" style={{ width: "60%", backgroundColor: RED }} />
          </div>
          <div className="flex-1 flex flex-col items-center justify-center px-3 gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-[14px] font-bold"
              style={{ backgroundColor: RED, color: "#FFFFFF", fontFamily: "'Playfair Display', serif" }}
            >
              V
            </div>
            <div className="text-[8px] font-bold leading-tight text-center" style={{ color: NAVY, fontFamily: "'Playfair Display', serif" }}>
              Velkommen til<br />Vind Consulting
            </div>
            <div className="space-y-1 w-full mt-1">
              <div className="h-[3px] w-full rounded-full" style={{ backgroundColor: "rgba(10,22,40,0.12)" }} />
              <div className="h-[3px] w-4/5 rounded-full" style={{ backgroundColor: "rgba(10,22,40,0.12)" }} />
            </div>
            <div
              className="mt-2 px-3 py-1 rounded-full text-[7px] font-bold uppercase tracking-wider"
              style={{ backgroundColor: RED, color: "#FFFFFF" }}
            >
              Kom i gang
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PreviewToneOfVoice() {
  const sides = [
    {
      label: "Ikke",
      bg: "#7A1A12",
      lines: ["»Vi implementerer en holistisk AI-transformation«", "»Synergier på tværs af værdikæden«"],
    },
    {
      label: "Sådan",
      bg: NAVY,
      lines: ["»Du sparer en time om dagen«", "»Sådan bruger vi Copilot i morgen«"],
    },
  ];
  return (
    <div className="absolute inset-0 grid grid-cols-2">
      {sides.map((s) => (
        <div key={s.label} className="flex flex-col p-3 gap-2" style={{ backgroundColor: s.bg }}>
          <span
            className="text-[16px] font-bold leading-none"
            style={{ color: "#FFFFFF", fontFamily: "'Playfair Display', serif", letterSpacing: "0.05em" }}
          >
            {s.label.toUpperCase()}
          </span>
          <div className="h-px w-6" style={{ backgroundColor: "rgba(255,255,255,0.4)" }} />
          <div className="flex-1 flex flex-col justify-center gap-1.5">
            {s.lines.map((l) => (
              <p key={l} className="text-[7.5px] leading-snug italic" style={{ color: "rgba(255,255,255,0.85)" }}>
                {l}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function PreviewKommunikationskit() {
  const docs = [
    { title: "All-hands slide", rotate: -6, x: -22, y: 6, z: 1 },
    { title: "Nyhedsbrev", rotate: 3, x: 0, y: -4, z: 3 },
    { title: "One-pager", rotate: 8, x: 22, y: 8, z: 2 },
  ];
  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: "#F5F0E8" }}>
      {docs.map((d) => (
        <div
          key={d.title}
          className="absolute flex flex-col p-2"
          style={{
            width: 78,
            height: 100,
            backgroundColor: "#FFFFFF",
            transform: `translate(${d.x}px, ${d.y}px) rotate(${d.rotate}deg)`,
            boxShadow: "0 6px 18px rgba(10,22,40,0.18)",
            zIndex: d.z,
            borderTop: `2px solid ${RED}`,
          }}
        >
          <span className="text-[6.5px] uppercase tracking-[0.2em] font-bold" style={{ color: RED }}>{d.title}</span>
          <div className="mt-1.5 h-px w-full" style={{ backgroundColor: NAVY, opacity: 0.12 }} />
          <div className="mt-2 space-y-1">
            <div className="h-[2px] w-full rounded-full" style={{ backgroundColor: NAVY, opacity: 0.5 }} />
            <div className="h-[2px] w-5/6 rounded-full" style={{ backgroundColor: NAVY, opacity: 0.3 }} />
            <div className="h-[2px] w-3/4 rounded-full" style={{ backgroundColor: NAVY, opacity: 0.3 }} />
            <div className="h-[2px] w-2/3 rounded-full" style={{ backgroundColor: NAVY, opacity: 0.3 }} />
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

function OnboardingLogo({ size = 44 }: { size?: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-xl font-bold text-white"
      style={{
        width: size,
        height: size,
        background: NAVY,
        fontFamily: "'Inter', system-ui, sans-serif",
        letterSpacing: "-0.02em",
        fontSize: size * 0.45,
      }}
    >
      V
    </div>
  );
}

function OnboardingPrimaryButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full font-semibold text-white text-[15px] tracking-wide transition-transform active:scale-[0.98]"
      style={{ background: RED, fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {children}
    </button>
  );
}

function OnboardingContent() {
  const [step, setStep] = useState(0);
  const total = 5;
  const next = () => setStep((s) => Math.min(s + 1, total - 1));
  const restart = () => setStep(0);

  const ScreenWelcome = (
    <div className="flex flex-col items-center text-center px-7 pt-20 pb-10 h-full" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <OnboardingLogo size={64} />
      <h1 className="mt-6 text-[28px] font-bold leading-tight" style={{ color: NAVY, letterSpacing: "-0.02em" }}>
        Velkommen til <br /> Vind Consulting
      </h1>
      <p className="mt-4 text-[15px] text-slate-600 leading-relaxed max-w-[260px]">
        Vi glæder os til at have dig med på holdet — lad os få dig godt i gang.
      </p>
    </div>
  );

  const tools = [
    { icon: Users, title: "Microsoft Teams", desc: "Kommunikation og samarbejde med kolleger og kunder." },
    { icon: Bot, title: "Copilot", desc: "Din AI-assistent til research, skrivning og analyse." },
    { icon: BarChart3, title: "Power BI", desc: "Datavisualisering og rapporter til kundeleverancer." },
  ];
  const ScreenTools = (
    <div className="flex flex-col px-7 pt-16 pb-8 h-full" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <h2 className="text-[24px] font-bold leading-tight" style={{ color: NAVY, letterSpacing: "-0.02em" }}>Dine værktøjer</h2>
      <p className="mt-2 text-[14px] text-slate-600">Tre platforme du vil bruge dagligt.</p>
      <div className="mt-7 space-y-5">
        {tools.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex gap-4">
            <div className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${RED}14`, color: RED }}>
              <Icon size={22} strokeWidth={2} />
            </div>
            <div className="min-w-0">
              <h3 className="text-[15px] font-semibold" style={{ color: NAVY }}>{title}</h3>
              <p className="mt-1 text-[13px] text-slate-600 leading-snug">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const days = [
    { day: "Mandag", title: "Velkomst & opsætning", desc: "Møde HR, udlevering af udstyr og adgange." },
    { day: "Tirsdag", title: "Møde dit team", desc: "Introduktion til kolleger og igangværende projekter." },
    { day: "Onsdag", title: "Første kundemøde", desc: "Lyt med på et kundemøde sammen med din makker." },
  ];
  const ScreenFirstWeek = (
    <div className="flex flex-col px-7 pt-16 pb-8 h-full" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <h2 className="text-[24px] font-bold leading-tight" style={{ color: NAVY, letterSpacing: "-0.02em" }}>Din første uge</h2>
      <p className="mt-2 text-[14px] text-slate-600">Sådan ser de første dage ud.</p>
      <div className="mt-8 relative">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-slate-200" />
        <ul className="space-y-7">
          {days.map((d) => (
            <li key={d.day} className="relative pl-8">
              <span className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full" style={{ background: RED, boxShadow: "0 0 0 4px white" }} />
              <p className="text-[12px] font-semibold uppercase tracking-wider" style={{ color: RED }}>{d.day}</p>
              <h3 className="mt-1 text-[15px] font-semibold" style={{ color: NAVY }}>{d.title}</h3>
              <p className="mt-1 text-[13px] text-slate-600 leading-snug">{d.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const qItems = [
    "Skriv til din nærmeste leder — vi er her for at hjælpe.",
    "Brug #onboarding-kanalen i Teams til hurtige spørgsmål.",
    "Bogstavelig talt ingen spørgsmål er for små.",
  ];
  const ScreenQuestions = (
    <div className="flex flex-col px-7 pt-16 pb-8 h-full text-white" style={{ background: NAVY, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <h2 className="text-[24px] font-bold leading-tight" style={{ letterSpacing: "-0.02em" }}>Spørgsmål?</h2>
      <p className="mt-2 text-[14px] text-white/70">Vi gør det nemt at række ud.</p>
      <ul className="mt-8 space-y-5">
        {qItems.map((t, i) => (
          <li key={i} className="flex gap-3">
            <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: RED }} />
            <span className="text-[14px] leading-relaxed text-white/90">{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  const ScreenReady = (
    <div className="flex flex-col items-center text-center px-7 pt-20 pb-10 h-full" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <OnboardingLogo size={64} />
      <h1 className="mt-6 text-[32px] font-bold leading-tight" style={{ color: NAVY, letterSpacing: "-0.03em" }}>Du er klar.</h1>
      <p className="mt-6 text-[15px] italic text-slate-600 leading-relaxed max-w-[280px]">
        &ldquo;Den bedste måde at forudsige fremtiden på er at skabe den.&rdquo;
      </p>
      <p className="mt-2 text-[12px] text-slate-400 uppercase tracking-wider">— Peter Drucker</p>
      <div className="mt-auto w-full pt-10">
        <OnboardingPrimaryButton onClick={restart}>Kom i gang</OnboardingPrimaryButton>
      </div>
    </div>
  );

  const screens = [ScreenWelcome, ScreenTools, ScreenFirstWeek, ScreenQuestions, ScreenReady];
  const isDark = step === 3;
  const isLast = step === total - 1;

  return (
    <div
      className="w-full flex items-center justify-center py-8 px-4 rounded-md"
      style={{ background: "#E8EAEE", fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <div
        className="relative"
        style={{
          width: 390,
          height: 800,
          background: "#0A1628",
          borderRadius: 48,
          padding: 12,
          boxShadow: "0 30px 60px -15px rgba(10, 22, 40, 0.45), 0 0 0 2px rgba(0,0,0,0.6) inset",
        }}
      >
        <div
          className="relative w-full h-full overflow-hidden flex flex-col"
          style={{ borderRadius: 36, background: isDark ? NAVY : "#ffffff" }}
        >
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 rounded-full" style={{ width: 110, height: 28, background: "#0A1628" }} />
          <div className="absolute top-12 left-6 right-6 z-10 flex gap-1.5">
            {Array.from({ length: total }).map((_, i) => (
              <div key={i} className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: isDark ? "rgba(255,255,255,0.18)" : "#E5E7EB" }}>
                <div className="h-full transition-all duration-300" style={{ width: i <= step ? "100%" : "0%", background: RED }} />
              </div>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto">{screens[step]}</div>
          {!isLast && (
            <div className="px-7 pb-8 pt-2" style={{ background: isDark ? NAVY : "#ffffff" }}>
              <OnboardingPrimaryButton onClick={next}>
                Næste <ArrowRight size={16} strokeWidth={2.5} />
              </OnboardingPrimaryButton>
            </div>
          )}
        </div>
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
      <section className="pt-20 md:pt-28 pb-20 md:pb-28 px-5 md:px-14">
        <div className="pt-4">
          {/* INTRO */}
          <p className="text-[11px] uppercase tracking-[0.3em] font-semibold" style={{ color: RED }}>
            Vind Consulting · Konceptprojekt
          </p>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight mt-6 max-w-5xl">
            Da værktøjerne var på plads <span className="italic text-ember">— men kulturen ikke var.</span>
          </h2>

          <div className="mt-12 grid grid-cols-3 gap-4 md:gap-8 border-y border-cream/10 py-8 md:py-10">
            {[
              { stat: "80", label: "medarbejdere" },
              { stat: "23%", label: "adoption" },
              { stat: "4", label: "leverancer" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col">
                <span className="font-display text-4xl md:text-6xl lg:text-7xl tracking-tight leading-none" style={{ color: RED }}>
                  {s.stat}
                </span>
                <span className="mt-2 md:mt-3 text-xs md:text-sm uppercase tracking-[0.2em] text-cream/60">
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* PROCESS TIMELINE */}
          <div className="mt-10 md:mt-14">
            <div className="h-px w-16 mb-4" style={{ background: RED }} aria-hidden />
            <p className="text-[11px] uppercase tracking-[0.3em] font-semibold text-cream/55">Proces</p>
            <h3 className="font-display text-3xl md:text-5xl tracking-tight leading-tight mt-4 max-w-3xl">
              Fra <span className="italic text-ember">kløft</span> til fælles sprog.
            </h3>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-10 md:gap-y-12">
              {[
                { n: "01", title: "Kortlægning", body: "Interviews med ledelse og medarbejdere. Afdækning af kløft mellem strategi og hverdag." },
                { n: "02", title: "Indsigt", body: "Medarbejderne oplevede AI som noget der skete for dem — ikke med dem." },
                { n: "03", title: "Design", body: "Fire konkrete leverancer designet til at bygge bro." },
                { n: "04", title: "Formidling", body: "Sprog og skabeloner der gør det digitale meningsfuldt i hverdagen." },
              ].map((step, i, arr) => (
                <div key={step.n} className="relative flex flex-col md:min-h-[120px]">
                  <div className="flex items-center gap-3">
                    <span className="font-display text-sm tracking-[0.2em]" style={{ color: RED }}>{step.n}</span>
                    <div className="flex-1 h-px bg-cream/15" aria-hidden />
                    {i % 2 === 0 && i < arr.length - 1 && (
                      <span className="hidden md:inline text-cream/30 text-lg" aria-hidden>→</span>
                    )}
                  </div>
                  <h4 className="font-display tracking-tight leading-tight mt-5" style={{ fontSize: "1.4rem" }}>
                    {step.title}
                  </h4>
                  <p className="mt-3 text-sm text-cream/75 leading-relaxed">{step.body}</p>
                </div>
              ))}
            </div>
          </div>


          {/* DELIVERABLES */}
          <div className="mt-20 md:mt-28">
            <p className="text-[11px] uppercase tracking-[0.3em] font-semibold text-cream/55">Leverancer</p>
            <h3 className="font-display text-3xl md:text-5xl tracking-tight leading-tight mt-4 max-w-3xl">
              Fire spor — <span className="italic text-ember">ét fælles sprog.</span>
            </h3>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
            {cards.map((card, idx) => (
              <div
                key={card.no}
                className={`relative ${idx < 2 ? "md:col-span-2" : ""}`}
              >
                <button
                  type="button"
                  onClick={() => setOpenCard(card.no)}
                  className={`group w-full flex flex-col text-left border border-cream/10 bg-cream/[0.02] hover:bg-cream/[0.04] hover:border-cream/20 focus:bg-cream/[0.04] focus:border-cream/20 transition-colors outline-none cursor-pointer p-6 md:p-8 ${idx < 2 ? "md:min-h-[320px]" : ""}`}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-[0.25em] font-semibold" style={{ color: RED }}>
                        {card.phaseRef}
                      </span>
                      <h3 className="font-display text-xl md:text-2xl tracking-tight leading-tight mt-2 text-cream">
                        {card.title}
                      </h3>
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-cream/40 group-hover:text-ember transition-colors shrink-0">
                      Se mere →
                    </span>
                  </div>
                  <p className="mt-3 text-sm md:text-base text-cream/75 leading-relaxed">
                    {card.body}
                  </p>

                  {/* Floating preview tooltip */}
                  <div
                    className="pointer-events-none absolute left-1/2 -top-3 -translate-x-1/2 -translate-y-full opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 z-30"
                    style={{ width: 300 }}
                  >
                    <div
                      className="relative aspect-[4/3] w-full overflow-hidden border border-cream/15 shadow-2xl"
                      style={{ backgroundColor: NAVY }}
                    >
                      {previews[card.no]}
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>

            <p className="mt-10 text-sm text-cream/55 italic">
              Konceptprojekt · Servicedesign · Konceptudvikling · Strategisk kommunikation
            </p>
          </div>

          {/* RESULTS */}
          <div className="mt-20 md:mt-28">
            <p className="text-[11px] uppercase tracking-[0.3em] font-semibold text-cream/55">Resultater</p>
            <h3 className="font-display text-3xl md:text-5xl tracking-tight leading-tight mt-4 max-w-3xl">
              Hvad det <span className="italic text-ember">flyttede.</span>
            </h3>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-px bg-cream/10 border border-cream/10">
              {[
                { stat: "54%", label: "undervurderet arbejdsdistance", note: "Wolt-metodikken anvendt her" },
                { stat: "3", label: "kommunikationsspor designet", note: "Strategi · onboarding · tone" },
                { stat: "1", label: "fælles sprog om AI", note: "Fra støj til samtale" },
              ].map((r) => (
                <div key={r.label} className="bg-[#0D1B2A] p-8 md:p-10 flex flex-col">
                  <span className="font-display text-5xl md:text-7xl tracking-tight leading-none" style={{ color: RED }}>
                    {r.stat}
                  </span>
                  <span className="mt-4 font-display text-xl md:text-2xl tracking-tight leading-snug text-cream">
                    {r.label}
                  </span>
                  <span className="mt-3 text-xs uppercase tracking-[0.2em] text-cream/50">
                    {r.note}
                  </span>
                </div>
              ))}
            </div>
          </div>
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
