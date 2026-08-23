import Link from 'next/link';
import { Button, Card, CTABand, JsonLd, PlaneTag, PointsSection, SectionHeader } from '@/components/rumiq';
import { about } from '@/content/about';
import { breadcrumbJsonLd, organisationJsonLd, pageMetadata, webPageJsonLd } from '@/lib/seo';

/*
 * /about — Specification Section 8.14.
 *
 * Section 4.1 governs this page hardest. Two pilots exist; neither is named
 * until written client approval is in hand; no headcount, funding, award or
 * customer count is claimed anywhere on it.
 */

const seo = {
  title: 'About',
  description:
    'Why Rumiq exists, the two pilots it is being built with, and what each one proves about the architecture.',
  path: '/about',
};

export const metadata = pageMetadata(seo);

export default function AboutPage() {
  return (
    <main id="main">
      <JsonLd
        data={[
          organisationJsonLd(),
          webPageJsonLd({ title: seo.title, description: seo.description, path: seo.path }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: seo.title, path: seo.path },
          ]),
        ]}
      />

      <section data-plane="public" className="border-b border-rule">
        <div className="mx-auto max-w-content px-6 py-section-mobile lg:py-section lg:pl-gutter">
          <SectionHeader
            as="h1"
            size="display-l"
            eyebrow={about.hero.eyebrow}
            headline={about.hero.headline}
            standfirst={about.hero.subhead}
          />
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href={about.hero.primary.href}>{about.hero.primary.label}</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href={about.hero.secondary.href}>{about.hero.secondary.label}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section data-plane="protected" className="bg-paper-dark">
        <div className="mx-auto max-w-content px-6 py-section-mobile lg:py-section lg:pl-gutter">
          <SectionHeader
            eyebrow={about.why.eyebrow}
            headline={about.why.headline}
            standfirst={about.why.body}
            inverted
          />
          <p className="mt-8 max-w-measure text-body-l text-paper/80">{about.why.second}</p>
        </div>
      </section>

      {/* The two pilots, and what each one proves. */}
      <section data-plane="boundary" className="border-b border-rule">
        <div className="mx-auto max-w-content px-6 py-section-mobile lg:py-section lg:pl-gutter">
          <SectionHeader
            eyebrow={about.pilots.eyebrow}
            headline={about.pilots.headline}
            standfirst={about.pilots.standfirst}
          />

          <ul className="mt-12 grid gap-4 lg:grid-cols-2">
            {about.pilots.items.map((pilot) => (
              <Card as="li" key={pilot.name} className="p-7">
                <PlaneTag plane={pilot.plane} label={pilot.where} />
                <h3 className="mt-5 text-h3 font-semibold">{pilot.name}</h3>
                <p className="mt-4 max-w-measure text-caption text-muted">{pilot.runsOn}</p>

                <p className="mt-6 font-mono text-mono-eyebrow uppercase text-muted">
                  The problem
                </p>
                <p className="mt-2 max-w-measure text-body">{pilot.problem}</p>

                <p className="mt-7 font-mono text-mono-eyebrow uppercase text-muted">
                  What it proves
                </p>
                <ul className="mt-3 space-y-3">
                  {pilot.proves.map((proof) => (
                    <li key={proof} className="border-b border-rule pb-3 text-caption">
                      {proof}
                    </li>
                  ))}
                </ul>

                <p className="mt-6 font-mono text-mono-eyebrow uppercase text-muted">
                  {pilot.status}
                </p>
              </Card>
            ))}
          </ul>

          <p className="mt-10 max-w-measure text-body text-muted">{about.pilots.note}</p>
        </div>
      </section>

      <PointsSection
        eyebrow={about.how.eyebrow}
        headline={about.how.headline}
        points={about.how.points}
        plane="public"
      />

      {/* The entity. Facts only, and "none claimed" where that is the truth. */}
      <section data-plane="boundary" className="border-b border-rule">
        <div className="mx-auto max-w-content px-6 py-section-mobile lg:py-section lg:pl-gutter">
          <SectionHeader eyebrow={about.entity.eyebrow} headline={about.entity.headline} />
          <dl className="mt-12 border-t border-rule">
            {about.entity.facts.map((fact) => (
              <div
                key={fact.label}
                className="grid gap-2 border-b border-rule py-5 md:grid-cols-[16rem_1fr] md:gap-8"
              >
                <dt className="font-mono text-mono-eyebrow uppercase text-muted">{fact.label}</dt>
                <dd className="max-w-measure text-body">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8">
            <Link
              href={about.entity.link.href}
              className="text-body font-medium underline decoration-rule underline-offset-4 hover:decoration-ink"
            >
              {about.entity.link.label}
            </Link>
          </p>
        </div>
      </section>

      <section id="careers" data-plane="public" className="border-b border-rule">
        <div className="mx-auto max-w-content px-6 py-section-mobile lg:py-section lg:pl-gutter">
          <SectionHeader
            eyebrow={about.careers.eyebrow}
            headline={about.careers.headline}
            standfirst={about.careers.body}
          />
          <div className="mt-10">
            <Button asChild>
              <Link href={about.careers.cta.href}>{about.careers.cta.label}</Link>
            </Button>
          </div>
        </div>
      </section>

      <CTABand />
    </main>
  );
}
