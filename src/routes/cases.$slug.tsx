import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { caseStudies, getCaseBySlug } from "@/data/cases";

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
            className="w-full h-[55vh] md:h-[80vh] object-cover"
          />
        </figure>
      </section>

      {/* TITLE */}
      <section className="py-16 md:py-24 border-b border-cream/10">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-8">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-ember" />
              <span className="eyebrow text-ember">Case · {study.client}</span>
            </div>
            <h1 className="font-display mt-8 text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.02em]">
              {study.title}
            </h1>
          </div>
        </div>
      </section>

      {/* SECTIONS */}
      <article className="py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 space-y-20 md:space-y-28">
          <Section label="Context" title="Kontekst">
            <p className="text-lg md:text-xl text-cream/85 leading-relaxed">{study.context}</p>
          </Section>

          <Section label="Challenge" title="Udfordring">
            <p className="text-lg md:text-xl text-cream/85 leading-relaxed">{study.challenge}</p>
          </Section>

          <Section label="My role" title="Min rolle">
            <ul className="space-y-4">
              {study.role.map((r) => (
                <li key={r} className="flex gap-4 text-lg text-cream/85 leading-relaxed">
                  <span className="text-ember mt-2 shrink-0">—</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section label="Approach" title="Tilgang">
            <ul className="flex flex-wrap gap-2">
              {study.approach.map((t) => (
                <li
                  key={t}
                  className="text-xs tracking-wide uppercase border border-cream/25 px-3 py-1.5 text-cream/80"
                >
                  {t}
                </li>
              ))}
            </ul>
          </Section>

          <Section label="Outcomes" title="Resultater">
            <ul className="space-y-4">
              {study.outcomes.map((o) => (
                <li key={o} className="flex gap-4 text-lg text-cream/85 leading-relaxed">
                  <span className="text-ember mt-2 shrink-0">→</span>
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </Section>
        </div>
      </article>

      {/* NEXT / PREV */}
      <section className="py-16 md:py-24 border-t border-cream/10">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-6">
            <Link
              to="/"
              hash="cases"
              className="inline-flex items-center gap-3 px-6 py-3 text-sm tracking-wide border border-cream/25 hover:border-ember hover:text-ember transition-colors mb-8"
            >
              ← Tilbage til portfolio
            </Link>
            <div>
              <span className="eyebrow text-ember">Forrige case</span>
              <Link
                to="/cases/$slug"
                params={{ slug: prev.slug }}
                className="block mt-3 font-display text-2xl md:text-3xl hover:text-ember transition-colors"
              >
                ← {prev.client}
              </Link>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 md:text-right">
            <span className="eyebrow text-ember">Næste case</span>
            <Link
              to="/cases/$slug"
              params={{ slug: next.slug }}
              className="block mt-3 font-display text-3xl md:text-4xl hover:text-ember transition-colors"
            >
              {next.client} →
            </Link>
          </div>
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
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-ember" />
          <span className="eyebrow text-ember">{label}</span>
        </div>
        <h2 className="font-display text-3xl md:text-4xl mt-4 tracking-tight">{title}</h2>
      </div>
      <div className="col-span-12 md:col-span-8 md:col-start-5">{children}</div>
    </div>
  );
}
