import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Users, Bot, BarChart3, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/vind-consulting-onboarding")({
  head: () => ({
    meta: [
      { title: "Vind Consulting — Onboarding" },
      { name: "description", content: "Mobile onboarding flow for Vind Consulting." },
    ],
  }),
  component: OnboardingPage,
});

const NAVY = "#0A1628";
const RED = "#C0281E";

function Logo({ size = 44 }: { size?: number }) {
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

function PrimaryButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
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

function ScreenWelcome() {
  return (
    <div className="flex flex-col items-center text-center px-7 pt-20 pb-10 h-full">
      <Logo size={64} />
      <h1
        className="mt-6 text-[28px] font-bold leading-tight"
        style={{ color: NAVY, fontFamily: "'Inter', system-ui, sans-serif", letterSpacing: "-0.02em" }}
      >
        Velkommen til <br /> Vind Consulting
      </h1>
      <p className="mt-4 text-[15px] text-slate-600 leading-relaxed max-w-[260px]">
        Vi glæder os til at have dig med på holdet — lad os få dig godt i gang.
      </p>
    </div>
  );
}

function ScreenTools() {
  const tools = [
    { icon: Users, title: "Microsoft Teams", desc: "Kommunikation og samarbejde med kolleger og kunder." },
    { icon: Bot, title: "Copilot", desc: "Din AI-assistent til research, skrivning og analyse." },
    { icon: BarChart3, title: "Power BI", desc: "Datavisualisering og rapporter til kundeleverancer." },
  ];
  return (
    <div className="flex flex-col px-7 pt-16 pb-8 h-full">
      <h2
        className="text-[24px] font-bold leading-tight"
        style={{ color: NAVY, fontFamily: "'Inter', system-ui, sans-serif", letterSpacing: "-0.02em" }}
      >
        Dine værktøjer
      </h2>
      <p className="mt-2 text-[14px] text-slate-600">Tre platforme du vil bruge dagligt.</p>
      <div className="mt-7 space-y-5">
        {tools.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex gap-4">
            <div
              className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ background: `${RED}14`, color: RED }}
            >
              <Icon size={22} strokeWidth={2} />
            </div>
            <div className="min-w-0">
              <h3 className="text-[15px] font-semibold" style={{ color: NAVY }}>
                {title}
              </h3>
              <p className="mt-1 text-[13px] text-slate-600 leading-snug">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScreenFirstWeek() {
  const days = [
    { day: "Mandag", title: "Velkomst & opsætning", desc: "Møde HR, udlevering af udstyr og adgange." },
    { day: "Tirsdag", title: "Møde dit team", desc: "Introduktion til kolleger og igangværende projekter." },
    { day: "Onsdag", title: "Første kundemøde", desc: "Lyt med på et kundemøde sammen med din makker." },
  ];
  return (
    <div className="flex flex-col px-7 pt-16 pb-8 h-full">
      <h2
        className="text-[24px] font-bold leading-tight"
        style={{ color: NAVY, fontFamily: "'Inter', system-ui, sans-serif", letterSpacing: "-0.02em" }}
      >
        Din første uge
      </h2>
      <p className="mt-2 text-[14px] text-slate-600">Sådan ser de første dage ud.</p>

      <div className="mt-8 relative">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-slate-200" />
        <ul className="space-y-7">
          {days.map((d) => (
            <li key={d.day} className="relative pl-8">
              <span
                className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full ring-4"
                style={{ background: RED, boxShadow: "0 0 0 4px white" }}
              />
              <p className="text-[12px] font-semibold uppercase tracking-wider" style={{ color: RED }}>
                {d.day}
              </p>
              <h3 className="mt-1 text-[15px] font-semibold" style={{ color: NAVY }}>
                {d.title}
              </h3>
              <p className="mt-1 text-[13px] text-slate-600 leading-snug">{d.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ScreenQuestions() {
  const items = [
    "Skriv til din nærmeste leder — vi er her for at hjælpe.",
    "Brug #onboarding-kanalen i Teams til hurtige spørgsmål.",
    "Bogstavelig talt ingen spørgsmål er for små.",
  ];
  return (
    <div className="flex flex-col px-7 pt-16 pb-8 h-full text-white" style={{ background: NAVY }}>
      <h2
        className="text-[24px] font-bold leading-tight"
        style={{ fontFamily: "'Inter', system-ui, sans-serif", letterSpacing: "-0.02em" }}
      >
        Spørgsmål?
      </h2>
      <p className="mt-2 text-[14px] text-white/70">Vi gør det nemt at række ud.</p>

      <ul className="mt-8 space-y-5">
        {items.map((t, i) => (
          <li key={i} className="flex gap-3">
            <span
              className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full"
              style={{ background: RED }}
            />
            <span className="text-[14px] leading-relaxed text-white/90">{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ScreenReady({ onRestart }: { onRestart: () => void }) {
  return (
    <div className="flex flex-col items-center text-center px-7 pt-20 pb-10 h-full">
      <Logo size={64} />
      <h1
        className="mt-6 text-[32px] font-bold leading-tight"
        style={{ color: NAVY, fontFamily: "'Inter', system-ui, sans-serif", letterSpacing: "-0.03em" }}
      >
        Du er klar.
      </h1>
      <p className="mt-6 text-[15px] italic text-slate-600 leading-relaxed max-w-[280px]">
        &ldquo;Den bedste måde at forudsige fremtiden på er at skabe den.&rdquo;
      </p>
      <p className="mt-2 text-[12px] text-slate-400 uppercase tracking-wider">— Peter Drucker</p>
      <div className="mt-auto w-full pt-10">
        <PrimaryButton onClick={onRestart}>Kom i gang</PrimaryButton>
      </div>
    </div>
  );
}

function OnboardingPage() {
  const [step, setStep] = useState(0);
  const total = 5;
  const next = () => setStep((s) => Math.min(s + 1, total - 1));
  const restart = () => setStep(0);

  const screens = [
    <ScreenWelcome key="0" />,
    <ScreenTools key="1" />,
    <ScreenFirstWeek key="2" />,
    <ScreenQuestions key="3" />,
    <ScreenReady key="4" onRestart={restart} />,
  ];

  const isDark = step === 3;
  const isLast = step === total - 1;

  return (
    <main
      className="min-h-screen w-full flex items-center justify-center py-10 px-4"
      style={{ background: "#E8EAEE", fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {/* Phone mockup */}
      <div
        className="relative"
        style={{
          width: 390,
          height: 800,
          background: "#0A1628",
          borderRadius: 48,
          padding: 12,
          boxShadow:
            "0 30px 60px -15px rgba(10, 22, 40, 0.45), 0 0 0 2px rgba(0,0,0,0.6) inset",
        }}
      >
        {/* Screen */}
        <div
          className="relative w-full h-full overflow-hidden flex flex-col"
          style={{
            borderRadius: 36,
            background: isDark ? NAVY : "#ffffff",
          }}
        >
          {/* Notch */}
          <div
            className="absolute top-2 left-1/2 -translate-x-1/2 z-20 rounded-full"
            style={{ width: 110, height: 28, background: "#0A1628" }}
          />

          {/* Progress bar */}
          <div className="absolute top-12 left-6 right-6 z-10 flex gap-1.5">
            {Array.from({ length: total }).map((_, i) => (
              <div
                key={i}
                className="flex-1 h-1 rounded-full overflow-hidden"
                style={{ background: isDark ? "rgba(255,255,255,0.18)" : "#E5E7EB" }}
              >
                <div
                  className="h-full transition-all duration-300"
                  style={{
                    width: i <= step ? "100%" : "0%",
                    background: RED,
                  }}
                />
              </div>
            ))}
          </div>

          {/* Screen content */}
          <div className="flex-1 overflow-y-auto">{screens[step]}</div>

          {/* Footer next button */}
          {!isLast && (
            <div
              className="px-7 pb-8 pt-2"
              style={{ background: isDark ? NAVY : "#ffffff" }}
            >
              <PrimaryButton onClick={next}>
                Næste <ArrowRight size={16} strokeWidth={2.5} />
              </PrimaryButton>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
