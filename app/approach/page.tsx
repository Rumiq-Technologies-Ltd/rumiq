import Link from 'next/link';
import { CTABand, FaqSection, Hero, JsonLd, PointsSection, PolicyCallout, SectionHeader } from '@/components/rumiq';
import { approach } from '@/content/approach';
import { faqFor } from '@/content/faq';
import { breadcrumbJsonLd, faqJsonLd, pageMetadata, webPageJsonLd } from '@/lib/seo';
import { cn } from '@/lib/utils';

/*
 * /approach — Specification Section 8.11.
 *
 * The phase table renders directly on the page: no accordion, no gated PDF. A
 * buyer comparing vendors should be able to read the whole engagement shape in
 * one scroll, and a compliance reader should be able to find where the boundary
 * work sits without asking anyone.
 */

const seo = {
  title: 'Approach',
  description:
    'How Rumiq engagements run: six phases, what each produces, what it asks of your team, and the stop point at the end of every one.',
  path: '/approach',
};

export const metadata = pageMetadata(seo);

const planeBorder = {
  public: 'border-l-plane-public',
  boundary: 'border-l-boundary',
  protected: 'border-l-plane-protected',
} as const;

export default function ApproachPage() {
  const faqs = faqFor('approach');

  return (
    <main id="main">
      <JsonLd
        data={[
          webPageJsonLd({ title: seo.title, description: seo.description, path: seo.path }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: seo.title, path: seo.path },
          ]),
          faqJsonLd(faqs),
        ]}
      />

      <Hero
        eyebrow={approach.hero.eyebrow}
        headline={approach.hero.headline}
        subhead={approach.hero.subhead}
        primary={approach.hero.primary}
        secondary={approach.hero.secondary}
        assurances={approach.hero.assurances}
      />

      {/* The operating principles — why the phases are in this order. */}
      <section data-plane="public" className="border-b border-rule">
        <div className="mx-auto max-w-content px-6 py-section-mobile lg:py-section lg:pl-gutter">
          <SectionHeader eyebrow={approach.principles.eyebrow} headline={approach.principles.headline} />
          <ul className="mt-12 grid gap-px border-l border-t border-rule md:grid-cols-2">
            {approach.principles.items.map((item) => (
              <li key={item.title} className="border-b border-r border-rule bg-paper-raised p-6">
                <h3 className="text-h3 font-semibold">{item.title}</h3>
                <p className="mt-3 max-w-measure text-caption text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The phase table. Rendered as a real table: it is tabular data, and a
          screen reader user should get row and column context for free. */}
      <section data-plane="boundary" className="border-b border-rule">
        <div className="mx-auto max-w-bleed px-6 py-section-mobile lg:py-section lg:pl-gutter">
          <SectionHeader
            eyebrow={approach.phases.eyebrow}
            headline={approach.phases.headline}
            standfirst={approach.phases.standfirst}
          />

          {/* Focusable scroll container, so the table can be panned from the
              keyboard on a narrow viewport. */}
          <div
            role="region"
            aria-label={approach.phases.caption}
            tabIndex={0}
            className="mt-12 overflow-x-auto border border-rule bg-paper-raised"
          >
            <table className="w-full min-w-[64rem] border-collapse text-left">
              <caption className="sr-only">{approach.phases.caption}</caption>
              <thead>
                <tr className="border-b border-rule">
                  {approach.phases.columns.map((column) => (
                    <th
                      key={column}
                      scope="col"
                      className="p-5 align-bottom font-mono text-mono-eyebrow font-medium uppercase text-muted"
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {approach.phases.rows.map((row) => (
                  <tr key={row.id} className="border-b border-rule last:border-b-0">
                    <th
                      scope="row"
                      className={cn('border-l-2 p-5 align-top', planeBorder[row.plane])}
                    >
                      <span className="block font-mono text-caption tabular-nums text-muted">
                        {row.id}
                      </span>
                      <span className="mt-2 block font-display text-h3 font-semibold">{row.name}</span>
                    </th>
                    <td className="p-5 align-top text-caption text-muted">{row.duration}</td>
                    <td className="max-w-xs p-5 align-top text-caption">{row.happens}</td>
                    <td className="max-w-xs p-5 align-top text-caption">{row.output}</td>
                    <td className="max-w-xs p-5 align-top text-caption text-muted">{row.needs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 font-mono text-mono-eyebrow uppercase text-muted">
            Scroll the table sideways on a narrow screen. Every phase also has a stop point.
          </p>
        </div>
      </section>

      <PointsSection
        eyebrow={approach.notDoing.eyebrow}
        headline={approach.notDoing.headline}
        points={approach.notDoing.points}
        plane="protected"
        inverted
      />

      <PolicyCallout
        eyebrow={approach.exit.eyebrow}
        headline={approach.exit.headline}
        body={approach.exit.body}
        note={approach.exit.note}
      >
        <p className="mt-8">
          <Link
            href="/trust"
            className="text-body font-medium underline decoration-rule underline-offset-4 hover:decoration-ink"
          >
            What the Trust Center documents
          </Link>
        </p>
      </PolicyCallout>

      <FaqSection page="approach" />

      <CTABand />
    </main>
  );
}
