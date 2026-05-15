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

  const deliverables = [
    {
      no: "01",
      phase: "FASE 01",
      title: "AI-strategi one-pager",
      body: "Et scanbart A4-dokument til direktionen. Tre kolonner: Hvor vi er nu / Hvor vi vil hen / Hvordan vi kommer der.",
      preview: <PreviewOnePager />,
    },
    {
      no: "02",
      phase: "FASE 02 + 03",
      title: "Onboarding-flow",
      body: "Fem skærmbilleder der guider nye medarbejdere fra fremmed til fortrolig med Vind Consultings digitale værktøjer.",
      preview: <PreviewOnboarding />,
    },
    {
      no: "03",
      phase: "FASE 03",
      title: "Tone of voice guide",
      body: "Internt sprog der gør det digitale konkret. Ikke hvad vi siger — men hvordan vi siger det.",
      preview: <PreviewToneOfVoice />,
    },
    {
      no: "04",
      phase: "FASE 04",
      title: "Kommunikationskit",
      body: "Tre skabeloner til forandringskommunikation: all-hands slide, intern nyhedsbrev-intro og one-pager til nyt værktøj.",
      preview: <PreviewKommunikationskit />,
    },
  ];

  const contextStats = [
    { stat: "80", label: "Medarbejdere" },
    { stat: "23%", label: "Adoption" },
    { stat: "4", label: "Leverancer" },
  ];

  const resultStats = [
    { stat: "54%", label: "Undervurderet arbejdsdistance" },
    { stat: "3", label: "Kommunikationsspor" },
    { stat: "1", label: "Fælles sprog om AI" },
  ];

  const approach = [
    { n: "01", title: "Kortlægning", body: "Interviews med ledelse og medarbejdere på tværs af afdelinger. Afdækning af den konkrete kløft mellem det strategiske niveau og hverdagens praksis." },
    { n: "02", title: "Indsigt", body: "Medarbejderne oplevede AI som noget der skete for dem — ikke med dem. Manglen på et fælles sprog gjorde adoption umulig." },
    { n: "03", title: "Design", body: "Fire konkrete leverancer designet til at bygge bro: fra strategidokument til onboarding-flow, tone of voice guide og kommunikationskit." },
    { n: "04", title: "Formidling", body: "Sprog og skabeloner der oversætter det digitale til noget meningsfuldt i hverdagen — uden jargon, uden buzzwords." },
  ];

  return (
    <main className="min-h-screen bg-[#0D1B2A] text-cream">
      {/* SECTION 1 — HERO BANNER */}
      <div
        className="relative w-full overflow-hidden h-[220px] md:h-[320px]"
        style={{ backgroundColor: NAVY }}
      >
        <div
          className="absolute inset-0"
          aria-hidden
          style={{ background: "linear-gradient(to right, rgba(10,22,40,0.85) 0%, rgba(10,22,40,0) 100%)" }}
        />
        <div className="relative h-full flex flex-col justify-center max-w-5xl" style={{ paddingLeft: 48, paddingRight: 24 }}>
          <p className="uppercase font-semibold" style={{ color: RED, letterSpacing: "0.15em", fontSize: "0.75rem" }}>
            Vind Consulting · Konceptprojekt
          </p>
          <h1
            className="font-display text-white leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", marginTop: 16 }}
          >
            De fleste organisationer har ikke et AI-problem.
            <br />
            <span className="italic" style={{ color: RED }}>De har et oversættelsesproblem.</span>
          </h1>
        </div>
      </div>

      {/* SECTION 2 — THE PROBLEM */}
      <section style={{ padding: "80px 48px" }}>
        <h2 className="font-display text-white" style={{ fontSize: "2.2rem", marginBottom: 32 }}>
          Problemet.
        </h2>
        <p className="text-white" style={{ opacity: 0.85, fontSize: "1.1rem", lineHeight: 1.8, maxWidth: 640 }}>
          Værktøjerne er på plads. Strategien er godkendt. Men et sted mellem direktionsgangen og hverdagen går meningen tabt — og medarbejderne ved ikke hvad det egentlig kræver af dem.
          <br /><br />
          Det er det øjeblik jeg arbejder i.
        </p>
      </section>

      {/* SECTION 3 — THE CONTEXT */}
      <section style={{ padding: 48 }}>
        <div style={{ height: 1, width: "100%", background: RED, marginBottom: 48 }} aria-hidden />
        <h2 className="font-display text-white" style={{ fontSize: "2.2rem", marginBottom: 24 }}>
          Konteksten.
        </h2>
        <p className="text-white" style={{ opacity: 0.85, fontSize: "1.1rem", lineHeight: 1.8, maxWidth: 640, marginBottom: 40 }}>
          Vind Consulting. 80 medarbejdere fordelt på Aarhus og København. AI-værktøjer rullet ud på tværs af organisationen — men kun 23% af medarbejderne bruger dem aktivt. Kløften mellem ledelsens ambition og hverdagens praksis er målbar og voksende.
        </p>
        <div className="flex flex-wrap gap-x-16 gap-y-8">
          {contextStats.map((s) => (
            <div key={s.label} className="flex flex-col">
              <span className="font-display leading-none" style={{ color: RED, fontSize: "3rem" }}>{s.stat}</span>
              <span className="mt-2 uppercase text-white/70" style={{ fontSize: "0.7rem", letterSpacing: "0.2em" }}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4 — THE APPROACH */}
      <section style={{ padding: "80px 48px" }}>
        <div style={{ height: 1, width: "100%", background: RED, marginBottom: 48 }} aria-hidden />
        <h2 className="font-display text-white" style={{ fontSize: "2.2rem", marginBottom: 40 }}>
          Tilgangen.
        </h2>
        <div className="flex flex-col" style={{ gap: 40, maxWidth: 640 }}>
          {approach.map((a) => (
            <div key={a.n} style={{ borderLeft: `2px solid ${RED}`, paddingLeft: 24 }}>
              <h3 className="font-display text-white leading-tight" style={{ fontSize: "1.4rem" }}>
                <span style={{ color: RED, fontWeight: 700 }}>{a.n}</span> — {a.title}
              </h3>
              <p className="text-white mt-3" style={{ opacity: 0.85, fontSize: "1rem", lineHeight: 1.8 }}>
                {a.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5 — THE WORK */}
      <section style={{ paddingTop: 80 }}>
        <div style={{ height: 1, width: "100%", background: RED, marginBottom: 48 }} aria-hidden />
        <h2 className="font-display text-white" style={{ fontSize: "2.2rem", padding: "0 48px", marginBottom: 48 }}>
          Arbejdet.
        </h2>
        <div className="flex flex-col" style={{ gap: 80 }}>
          {deliverables.map((d) => (
            <article key={d.no}>
              <p className="uppercase font-semibold" style={{ color: RED, fontSize: "0.75rem", letterSpacing: "0.15em", padding: "0 48px" }}>
                {d.phase}
              </p>
              <h3 className="font-display text-white leading-tight" style={{ fontSize: "1.6rem", padding: "0 48px", margin: "8px 0 16px" }}>
                {d.title}
              </h3>
              <p className="text-white" style={{ opacity: 0.85, fontSize: "1rem", lineHeight: 1.7, maxWidth: 640, padding: "0 48px", marginBottom: 16 }}>
                {d.body}
              </p>
              <div style={{ padding: "0 48px", marginBottom: 24 }}>
                <button
                  type="button"
                  onClick={() => setOpenCard(d.no)}
                  className="uppercase font-semibold hover:opacity-80 transition-opacity"
                  style={{ color: RED, fontSize: "0.75rem", letterSpacing: "0.2em" }}
                >
                  Se mere →
                </button>
              </div>
              <div
                className="relative w-full overflow-hidden h-[260px] md:h-[400px]"
                style={{ backgroundColor: NAVY }}
              >
                {d.preview}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SECTION 6 — THE RESULTS */}
      <section style={{ padding: "80px 48px" }}>
        <div style={{ height: 1, width: "100%", background: RED, marginBottom: 48 }} aria-hidden />
        <h2 className="font-display text-white" style={{ fontSize: "2.2rem", marginBottom: 32 }}>
          Resultatet.
        </h2>
        <p className="text-white" style={{ opacity: 0.85, fontSize: "1.1rem", lineHeight: 1.8, maxWidth: 640, marginBottom: 48 }}>
          Konceptprojektet dokumenterede en undervurderet arbejdsdistance på 54% — samme metodikken som Wolt-casen. Tre kommunikationsspor designet og testet. Ét fælles sprog om AI, fra støj til samtale.
        </p>
        <div className="flex flex-wrap gap-x-16 gap-y-8">
          {resultStats.map((s) => (
            <div key={s.label} className="flex flex-col">
              <span className="font-display leading-none" style={{ color: RED, fontSize: "3rem" }}>{s.stat}</span>
              <span className="mt-2 uppercase text-white/70" style={{ fontSize: "0.7rem", letterSpacing: "0.2em" }}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 7 — CTA */}
      <section style={{ padding: "64px 48px" }}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <Link
            to="/"
            className="font-display hover:opacity-80 transition-opacity"
            style={{ color: RED, fontSize: "1rem" }}
          >
            ← Tilbage til portfolio
          </Link>
          <a
            href="mailto:Jonas@jkps.dk"
            className="inline-flex items-center justify-center border-2 border-white text-white hover:bg-white hover:text-[#0A1628] transition-colors"
            style={{ padding: "12px 32px", fontSize: "0.95rem", letterSpacing: "0.05em" }}
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
