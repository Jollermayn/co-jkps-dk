import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

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
    <div className="fixed inset-0 z-[100] flex items-start md:items-center justify-center p-0 md:p-6" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full md:max-w-5xl max-h-screen md:max-h-[90vh] overflow-y-auto bg-[#0D1B2A] border border-cream/10 md:rounded-lg shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Luk"
          className="sticky top-4 float-right mr-4 mt-4 z-10 w-10 h-10 inline-flex items-center justify-center rounded-full bg-cream/10 hover:bg-cream/20 text-cream transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="p-6 md:p-12">
          <h3 className="font-display text-3xl md:text-5xl tracking-tight leading-[1.05]">{title}</h3>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}

function OnePagerContent() {
  const cols = [
    {
      h: "Hvor vi er nu",
      items: [
        "AI-værktøjer rullet ud til 80 medarbejdere",
        "Adoption på 23%",
        "Strategi kommunikeret — opleves som støj",
        "Manglende fælles sprog om det digitale",
      ],
    },
    {
      h: "Hvor vi vil hen",
      items: [
        "Adoption over 70% inden 12 måneder",
        "AI som naturlig del af hverdagen",
        "Fælles forståelse på tværs af teams",
        "Ledelse og medarbejdere taler samme sprog",
      ],
    },
    {
      h: "Hvordan vi kommer der",
      items: [
        "Onboarding-flow til alle nye medarbejdere",
        "Tone of voice guide internt",
        "Kommunikationskit til ledelsen",
        "Kvartalsvise check-ins og målinger",
      ],
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
      {cols.map((c, i) => (
        <div key={c.h} className="border border-cream/15 bg-cream/[0.03] p-5 md:p-6">
          <span className="font-display text-xl text-ember">0{i + 1}</span>
          <h4 className="font-display text-xl md:text-2xl mt-2 tracking-tight">{c.h}</h4>
          <ul className="mt-4 space-y-3">
            {c.items.map((it) => (
              <li key={it} className="text-sm md:text-base text-cream/80 leading-snug flex gap-2">
                <span className="text-ember shrink-0">—</span>
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function OnboardingContent() {
  const screens = [
    { t: "Velkommen", b: "Velkommen til Vind Consulting. Lad os komme i gang." },
    { t: "Tre værktøjer", b: "Teams, Copilot og Power BI — dine daglige redskaber." },
    { t: "Første uge", b: "Mandag, tirsdag, onsdag — sådan ser din opstart ud." },
    { t: "Spørgsmål?", b: "Du er ikke alene. Sådan får du hjælp." },
    { t: "Du er klar", b: "Velkommen ombord. Nu starter rejsen." },
  ];
  const [step, setStep] = useState(0);
  return (
    <div>
      <div className="flex items-center justify-center gap-6">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-cream/10 hover:bg-cream/20 disabled:opacity-30 disabled:cursor-not-allowed text-cream transition-colors"
          aria-label="Forrige"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="relative w-[260px] h-[520px] rounded-[2.5rem] bg-[#0A1628] border-[6px] border-cream/20 shadow-2xl overflow-hidden flex flex-col">
          <div className="h-1 bg-cream/10">
            <div className="h-full bg-[#C0281E] transition-all" style={{ width: `${((step + 1) / screens.length) * 100}%` }} />
          </div>
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
            <span className="text-[10px] uppercase tracking-[0.3em] text-cream/50">Skærm {step + 1} / {screens.length}</span>
            <h4 className="font-display text-2xl text-cream mt-4">{screens[step].t}</h4>
            <p className="mt-3 text-sm text-cream/75 leading-relaxed">{screens[step].b}</p>
            <button className="mt-8 px-5 py-2.5 rounded-full bg-[#C0281E] text-white text-xs font-semibold tracking-wide">
              Næste →
            </button>
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
            className={`h-1.5 rounded-full transition-all ${i === step ? "w-8 bg-[#C0281E]" : "w-1.5 bg-cream/30"}`}
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
      wrong: "Vi accelererer vores digitale transformation gennem strategiske AI-initiativer.",
      right: "Vi bruger Copilot til at skrive første udkast — så I sparer 30 min om dagen.",
    },
    {
      h: "Du frem for vi",
      wrong: "Organisationen forventer at alle medarbejdere onboardes i Q3.",
      right: "Du får din onboarding inden d. 15. september. Sådan ser din uge ud.",
    },
    {
      h: "Hvad frem for hvorfor",
      wrong: "Det er strategisk vigtigt at vi alle adopterer de nye værktøjer.",
      right: "Sådan logger du ind på Copilot. Tre trin — to minutter.",
    },
  ];
  return (
    <div className="space-y-8">
      {principles.map((p, i) => (
        <div key={p.h}>
          <div className="flex items-baseline gap-3">
            <span className="font-display text-xl text-ember">0{i + 1}</span>
            <h4 className="font-display text-2xl tracking-tight">{p.h}</h4>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-red-500/30 bg-red-500/[0.06] p-5">
              <span className="text-[10px] uppercase tracking-[0.25em] text-red-400 font-semibold">Ikke sådan</span>
              <p className="mt-2 text-sm md:text-base text-cream/85 leading-relaxed italic">"{p.wrong}"</p>
            </div>
            <div className="border border-emerald-500/30 bg-emerald-500/[0.06] p-5">
              <span className="text-[10px] uppercase tracking-[0.25em] text-emerald-400 font-semibold">Sådan</span>
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
        <div className="aspect-video w-full bg-[#0A1628] border border-cream/15 p-6 flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C0281E]">Q3 update</span>
          <h5 className="font-display text-2xl md:text-3xl text-cream mt-2">Vi rykker fra 23% til 70%.</h5>
          <p className="mt-3 text-cream/70 text-sm md:text-base">Tre konkrete skridt. Tre måneder. Sammen.</p>
          <div className="mt-auto flex justify-between text-[10px] uppercase tracking-[0.25em] text-cream/40">
            <span>Vind Consulting</span>
            <span>2025</span>
          </div>
        </div>
      ),
    },
    {
      t: "Nyhedsbrev-intro",
      label: "E-mail · 600px",
      preview: (
        <div className="w-full bg-cream text-[#0D1B2A] p-6 border border-cream/15">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C0281E] font-semibold">Internt nyhedsbrev</span>
          <h5 className="font-display text-xl md:text-2xl mt-2">Sådan bruger Lars Copilot i hverdagen</h5>
          <p className="mt-3 text-sm leading-relaxed text-[#0D1B2A]/75">
            "Jeg sparer halvanden time om dagen på rapportskrivning. Her er mine tre tricks til dig der lige er kommet i gang…"
          </p>
          <span className="mt-4 inline-block text-xs font-semibold text-[#C0281E] underline">Læs hele historien →</span>
        </div>
      ),
    },
    {
      t: "One-pager til nyt værktøj",
      label: "A4 · PDF",
      preview: (
        <div className="w-full bg-cream text-[#0D1B2A] p-6 border border-cream/15">
          <div className="flex items-baseline justify-between">
            <h5 className="font-display text-xl md:text-2xl">Power BI · Hurtigstart</h5>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#0D1B2A]/50">v1.0</span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
            <div><span className="font-semibold block mb-1">1. Log ind</span><span className="text-[#0D1B2A]/70">Brug dit Vind-login</span></div>
            <div><span className="font-semibold block mb-1">2. Vælg dashboard</span><span className="text-[#0D1B2A]/70">Find dit team</span></div>
            <div><span className="font-semibold block mb-1">3. Tilpas visning</span><span className="text-[#0D1B2A]/70">Drag & drop</span></div>
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
              <span className="font-display text-xl text-ember">0{i + 1}</span>
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

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {cards.map((card) => (
              <button
                key={card.no}
                type="button"
                onClick={() => setOpenCard(card.no)}
                className="group flex flex-col text-left border border-cream/10 bg-cream/[0.02] hover:bg-cream/[0.05] hover:border-cream/20 transition-all cursor-pointer"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-cream/5 to-cream/[0.02] border-b border-cream/10">
                  <span className="absolute top-4 left-4 font-display text-2xl text-ember">{card.no}</span>
                  <span className="absolute bottom-4 right-4 text-[10px] uppercase tracking-[0.25em] text-cream/40 group-hover:text-ember transition-colors">
                    Se mere →
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
