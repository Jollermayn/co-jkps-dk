import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import heroImage from "@/assets/vikingdanmark-hero.png";
import VikingChat from "@/components/VikingChat";

export const Route = createFileRoute("/vikingdanmark")({
  head: () => ({
    meta: [
      { title: "VikingDanmark — Case · Jonas K.P. Sørensen" },
      {
        name: "description",
        content:
          "Kampagnecase for Viking SmartFarming — nyhedsbrev og LinkedIn-opslag som del af jobansøgning til VikingDanmark.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: VikingDanmarkPage,
});

function VikingDanmarkPage() {
  const [liked, setLiked] = useState(false);
  const baseLikes = 47;
  const likeCount = baseLikes + (liked ? 1 : 0);
  return (
    <div
      className="min-h-screen text-cream"
      style={{ backgroundColor: "#0D1B2A" }}
    >
      {/* Header */}
      <header className="mx-auto max-w-3xl px-6 pt-16 pb-10">
        <Link
          to="/"
          className="inline-block text-[0.75rem] uppercase tracking-[0.2em] text-cream/60 hover:text-cream transition-colors"
        >
          ← Tilbage
        </Link>
        <p
          className="mt-8 text-[0.72rem] uppercase tracking-[0.22em] font-semibold"
          style={{ color: "#B83A20" }}
        >
          Case · Jobansøgning
        </p>
        <h1 className="mt-3 font-display text-[2.4rem] sm:text-[3rem] font-bold leading-[1.05] tracking-tight">
          VikingDanmark
        </h1>
        <img
          src={heroImage}
          alt="Moderne malkekvægsstald om natten med overvågningskamera"
          className="mt-8 w-full rounded-md"
        />
        <p className="mt-8 text-[1.05rem] leading-relaxed text-cream/85 max-w-2xl">
          To deliverables for <span className="font-semibold text-cream">Viking SmartFarming</span> —
          et AI-baseret stald­overvågnings­system til mælkeproducenter. Udarbejdet som del af min
          ansøgning til VikingDanmark.
        </p>
      </header>

      {/* Deliverables */}
      <main className="mx-auto max-w-3xl px-6 pb-24 space-y-16">
        {/* Deliverable 1 — Newsletter */}
        <section>
          <div className="flex items-baseline justify-between gap-4 mb-5">
            <h2 className="font-display text-[1.4rem] font-bold tracking-tight">
              Deliverable 1
            </h2>
            <span className="text-[0.7rem] uppercase tracking-[0.2em] text-cream/55">
              Nyhedsbrev
            </span>
          </div>

          {/* Newsletter mockup */}
          <article className="rounded-md overflow-hidden bg-cream text-navy-deep shadow-2xl ring-1 ring-black/10">
            {/* Email chrome */}
            <div className="border-b border-navy-deep/10 px-6 py-4 bg-cream">
              <div className="flex items-center justify-between text-[0.7rem] uppercase tracking-wider text-navy-deep/55">
                <span>Viking SmartFarming</span>
                <span>Nyhedsbrev</span>
              </div>
              <h3 className="mt-3 font-display text-[1.5rem] sm:text-[1.75rem] font-bold leading-tight text-navy-deep">
                Kameraet så det, du ikke nåede
              </h3>
            </div>

            {/* Email body */}
            <div className="px-6 sm:px-8 py-7 space-y-4 text-[0.97rem] leading-relaxed text-navy-deep/90">
              <p>
                Klokken var lidt over to om natten. Lars havde sovet i fire timer. Koen havde
                ligget ned i 22 minutter for længe — og alarmen var allerede sendt.
              </p>
              <p>
                Det er ikke en dramatisk historie. Det er en helt almindelig morgen på en bedrift
                med Viking SmartFarming.
              </p>
              <p>
                Vi taler meget om hvad AI kan. Vi taler sjældent om hvad det faktisk gør ved en
                arbejdsdag. Eller hvad det koster, når vi ikke ved hvad der sker i stalden — mens
                vi sover, mens vi er i marken, mens vi holder fri.
              </p>
              <p>
                Viking SmartFarming registrerer adfærd. Ikke som tal på en skærm, men som konkret
                viden: denne ko æder mindre end i går. Denne gruppe bruger for meget tid i gangene.
                Eltavlen er varmere end normalt.
              </p>
              <p>
                Systemet giver ikke svar på alt. Men det stiller de rigtige spørgsmål — i tide.
              </p>
              <p>
                Vi tager gerne forbi og viser, hvad det konkret ville betyde på din bedrift. Ingen
                forpligtelse. Bare gummistøvler og et reelt kig på dine tal.
              </p>

              <div className="pt-3">
                <a
                  href="https://www.vikingdanmark.dk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-sm px-5 py-3 text-[0.92rem] font-semibold text-cream transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#B83A20" }}
                >
                  Book en besøgsdemonstration →
                </a>
              </div>
            </div>

            {/* Email footer */}
            <div className="border-t border-navy-deep/10 px-6 py-4 text-[0.7rem] text-navy-deep/55">
              VikingDanmark · Agro Food Park 12 · 8200 Aarhus N
            </div>
          </article>
        </section>

        {/* Deliverable 2 — LinkedIn */}
        <section>
          <div className="flex items-baseline justify-between gap-4 mb-5">
            <h2 className="font-display text-[1.4rem] font-bold tracking-tight">
              Deliverable 2
            </h2>
            <span className="text-[0.7rem] uppercase tracking-[0.2em] text-cream/55">
              LinkedIn · organisk opslag
            </span>
          </div>

          {/* LinkedIn mockup */}
          <article className="rounded-md overflow-hidden bg-cream text-navy-deep shadow-2xl ring-1 ring-black/10">
            {/* Profile header */}
            <div className="flex items-start gap-3 px-5 pt-5">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-display text-[1.05rem] font-bold text-cream"
                style={{ backgroundColor: "#0D1B2A" }}
                aria-hidden
              >
                VD
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-navy-deep leading-tight">
                  VikingDanmark
                </div>
                <div className="text-[0.78rem] text-navy-deep/65 leading-snug">
                  18.412 følgere
                </div>
                <div className="text-[0.72rem] text-navy-deep/55 mt-0.5">
                  2 t · <span aria-hidden>🌐</span>
                </div>
              </div>
            </div>

            {/* Post body */}
            <div className="px-5 pt-4 pb-2 space-y-3 text-[0.95rem] leading-relaxed text-navy-deep/90 whitespace-pre-line">
              <p>Hvad ser du, når du går gennem stalden om aftenen?</p>
              <p>
                Du ser det, du kan nå at se. En ko der ser rolig ud. Et foderbord der er
                nogenlunde tomt. En kælvningsboks der er stille.
              </p>
              <p>Det du ikke ser, er de 14 timer du ikke var der.</p>
              <p>
                Viking SmartFarming registrerer hvad dyrene gør, når du ikke er til stede — og
                giver besked, hvis noget afviger fra det normale. Ikke næste morgen. Ikke ved
                tilsynet. Nu.
              </p>
              <p>
                Det er ikke magi. Det er data fra det lager, du allerede har: kameraer, sensorer,
                adfærd.
              </p>
              <p>Vi tager gerne forbi og viser hvad det ville betyde på din bedrift. ↓</p>

              <p className="pt-1 text-[0.92rem]" style={{ color: "#0a66c2" }}>
                #vikingdanmark #smartfarming #kvægbrug #mælkeproduktion #landbrugsteknologi
              </p>
            </div>

            {/* LinkedIn reactions count */}
            <div className="mt-3 flex items-center gap-1.5 px-5 pb-2 text-[0.78rem] text-navy-deep/65">
              <span aria-hidden>👍</span>
              <span>{likeCount}</span>
            </div>

            {/* LinkedIn engagement bar */}
            <div className="flex items-center justify-between border-t border-navy-deep/10 px-5 py-2 text-[0.78rem] font-semibold">
              <button
                type="button"
                onClick={() => setLiked((v) => !v)}
                className={`transition-colors ${liked ? "" : "text-navy-deep/65 hover:text-navy-deep"}`}
                style={liked ? { color: "#0a66c2" } : undefined}
                aria-pressed={liked}
              >
                👍 Synes godt om
              </button>
              <span className="text-navy-deep/65">💬 Kommentér</span>
              <span className="text-navy-deep/65">🔁 Del</span>
              <span className="text-navy-deep/65">📨 Send</span>
            </div>
          </article>
        </section>
      </main>
      <VikingChat />
    </div>
  );
}
