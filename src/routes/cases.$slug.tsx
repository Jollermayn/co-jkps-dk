import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { caseStudies, getCaseBySlug } from "@/data/cases";
import { ApproachGrid } from "@/components/ApproachGrid";
import woltHeatmap from "@/assets/wolt-heatmap.png";
import boligaMockup from "@/assets/boliga-mockup.png";
import horesimQuotes from "@/assets/horesim-quotes.png";

export const Route = createFileRoute("/cases/$slug")({
  loader: ({ params }) => {
    const study = getCaseBySlug(params.slug);
    if (!study) throw notFound();
    return { study };
  },
  head: ({ loaderData }) => {
    const study = loaderData?.study;
    const title = study
      ? `${study.client} — ${study.title} · Jonas K.P. Sørensen`
      : "Case · Jonas K.P. Sørensen";
    const description = study?.context.slice(0, 155) ?? "Case study";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        ...(study?.image ? [{ property: "og:image", content: study.image }] : []),
      ],
    };
  },
  component: CaseDetail,
  notFoundComponent: () => {
    const params = Route.useParams();
    return (
      <main className="bg-navy-deep text-cream min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <p className="eyebrow text-ember">404</p>
          <h1 className="font-display text-5xl mt-4">Case ikke fundet</h1>
          <p className="mt-4 text-cream/70">Ingen case med slug "{params.slug}".</p>
          <Link to="/" className="inline-block mt-8 text-ember underline underline-offset-4">
            ← Tilbage til portfolio
          </Link>
        </div>
      </main>
    );
  },
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <main className="bg-navy-deep text-cream min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-display text-4xl">Noget gik galt</h1>
          <p className="mt-4 text-cream/70">{error.message}</p>
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="mt-6 px-5 py-2 border border-cream/25 hover:border-ember hover:text-ember"
          >
            Prøv igen
          </button>
        </div>
      </main>
    );
  },
});

function CaseDetail() {
  const { study } = Route.useLoaderData();
  const idx = caseStudies.findIndex((c) => c.slug === study.slug);
  const prev = caseStudies[(idx - 1 + caseStudies.length) % caseStudies.length];
  const next = caseStudies[(idx + 1) % caseStudies.length];

  return (
    <main className="bg-navy-deep text-cream">
      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-navy-deep/70 border-b border-cream/10">
        <nav className="mx-auto max-w-[1400px] px-6 md:px-10 h-16 flex items-center justify-between">
          <Link to="/" className="font-display text-lg tracking-tight">
            Jonas K.P. Sørensen
          </Link>
          <Link
            to="/"
            hash="cases"
            className="text-sm text-cream/80 hover:text-ember transition-colors"
          >
            ← Tilbage til portfolio
          </Link>
        </nav>
      </header>

      {/* HERO IMAGE */}
      <section className="pt-16">
        <figure className="w-full">
          <img
            src={study.image}
            alt={`${study.client} — ${study.title}`}
            className="w-full h-[280px] sm:h-[360px] md:h-[420px] object-cover"
          />
        </figure>
      </section>

      {/* TITLE */}
      <section className="py-12 md:py-16 border-b border-cream/10">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-8">
            <div className="flex items-center gap-3">
              <span className="eyebrow text-ember">{study.client}</span>
            </div>
            <h1 className="font-display mt-8 text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.02em]">
              {study.title}
            </h1>
          </div>
        </div>
      </section>

      {/* SECTIONS */}
      <article className="py-12 md:py-16">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 space-y-12 md:space-y-16">
          <Section label="Kontekst" title="Kontekst">
            <p className="text-lg md:text-xl text-cream/85 leading-relaxed">{study.context}</p>
          </Section>

          <Section label="Udfordring" title="Udfordring">
            <p className="text-lg md:text-xl text-cream/85 leading-relaxed">{study.challenge}</p>
            {study.slug === "interaktiv-horesimulering" && (
              <div className="mt-10">
                <span className="eyebrow text-ember tracking-[0.2em] block">— Stemmer fra feltet</span>
                <img
                  src={horesimQuotes}
                  alt="Citater fra hørehæmmede elever, lærere og eksperter"
                  className="mt-6 w-full h-auto"
                />
              </div>
            )}
          </Section>

          <Section label="Min rolle" title="Min rolle">
            <ul className="space-y-4">
              {study.role.map((r: string) => (
                <li key={r} className="flex items-start gap-4 text-lg text-cream/85 leading-relaxed">
                  <span className="text-ember shrink-0 leading-relaxed">—</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section label="Tilgang" title="Tilgang">
            <ApproachGrid tags={study.approach} />
          </Section>

          <Section label="Resultater" title="Resultater">
            <ul className="space-y-4">
              {study.outcomes.map((o: string) => (
                <li key={o} className="flex items-start gap-4 text-lg text-cream/85 leading-relaxed">
                  <span className="text-ember shrink-0 leading-relaxed">→</span>
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </Section>

          {study.slug === "boliga" && (
            <div className="flex justify-start">
              <img
                src={boligaMockup}
                alt="Boliga app mockups: vælg kommune, drømmebolig, boligtype og præferencer"
                className="w-full max-w-[480px] h-auto"
              />
            </div>
          )}

          {study.slug === "wolt" && (
            <div className="flex justify-start">
              <img
                src={woltHeatmap}
                alt="Heatmap der viser efterspørgsel i realtid i København"
                className="w-full max-w-[480px] h-auto"
              />
            </div>
          )}
        </div>
      </article>

      {/* NEXT / PREV */}
      <section className="py-12 md:py-16 border-t border-cream/10">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <Link
            to="/cases/$slug"
            params={{ slug: prev.slug }}
            aria-label={`Forrige case: ${prev.client}`}
            className="group inline-flex items-center gap-4"
          >
            <span className="w-12 h-12 rounded-full border border-cream/25 text-cream flex items-center justify-center transition-colors group-hover:border-[#B83A20] group-hover:text-[#B83A20]">
              <span aria-hidden className="text-xl leading-none">←</span>
            </span>
            <span className="flex flex-col">
              <span className="eyebrow text-ember">Forrige case</span>
              <span className="font-display text-xl md:text-2xl mt-1 group-hover:text-[#B83A20] transition-colors">
                {prev.client}
              </span>
            </span>
          </Link>

          <Link
            to="/"
            hash="cases"
            className="inline-flex items-center gap-3 px-6 py-3 text-sm tracking-wide border border-cream/25 hover:border-ember hover:text-ember transition-colors whitespace-nowrap"
          >
            ← Tilbage til portfolio
          </Link>

          <Link
            to="/cases/$slug"
            params={{ slug: next.slug }}
            aria-label={`Næste case: ${next.client}`}
            className="group inline-flex items-center gap-4 md:flex-row-reverse md:text-right"
          >
            <span className="w-12 h-12 rounded-full border border-cream/25 text-cream flex items-center justify-center transition-colors group-hover:border-[#B83A20] group-hover:text-[#B83A20]">
              <span aria-hidden className="text-xl leading-none">→</span>
            </span>
            <span className="flex flex-col md:items-end">
              <span className="eyebrow text-ember">Næste case</span>
              <span className="font-display text-xl md:text-2xl mt-1 group-hover:text-[#B83A20] transition-colors">
                {next.client}
              </span>
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}

function Section({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-12 gap-6 md:gap-10">
      <div className="col-span-12 md:col-span-3">
        <h2 className="font-display text-3xl md:text-4xl tracking-tight">{title}</h2>
      </div>
      <div className="col-span-12 md:col-span-8 md:col-start-5">{children}</div>
    </div>
  );
}
