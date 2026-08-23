import Link from 'next/link';
import { Card, CTABand, JsonLd, PlaneTag, RumiqForm, SectionHeader } from '@/components/rumiq';
import { insightsByDate, insightsIndexCopy as copy } from '@/content/insights';
import { insightsForm } from '@/content/forms';
import { BASE_URL, breadcrumbJsonLd, pageMetadata, webPageJsonLd } from '@/lib/seo';

/*
 * /insights — Section 8.13. The index. Article bodies are MDX in
 * content/insights, registered in content/insights/index.ts.
 */

const seo = {
  title: 'Insights',
  description:
    'Writing on where healthcare growth measurement breaks, why the standard fixes make it worse, and what to instrument first.',
  path: '/insights',
};

export const metadata = pageMetadata(seo);

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

export default function InsightsIndexPage() {
  const entries = insightsByDate();

  return (
    <main id="main">
      <JsonLd
        data={[
          webPageJsonLd({ title: seo.title, description: seo.description, path: seo.path }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Insights', path: seo.path },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: seo.title,
            url: `${BASE_URL}${seo.path}`,
            hasPart: entries.map((entry) => ({
              '@type': 'Article',
              headline: entry.title,
              url: `${BASE_URL}/insights/${entry.slug}`,
              datePublished: entry.published,
            })),
          },
        ]}
      />

      <section data-plane="public" className="border-b border-rule">
        <div className="mx-auto max-w-content px-6 py-section-mobile lg:py-section lg:pl-gutter">
          <SectionHeader
            as="h1"
            size="display-l"
            eyebrow={copy.eyebrow}
            headline={copy.headline}
            standfirst={copy.subhead}
          />
        </div>
      </section>

      <section data-plane="boundary" className="border-b border-rule">
        <div className="mx-auto max-w-content px-6 py-section-mobile lg:py-section lg:pl-gutter">
          <h2 className="font-mono text-mono-eyebrow uppercase text-muted">{copy.listLabel}</h2>

          {entries.length ? (
            <ul className="mt-10 grid gap-4">
              {entries.map((entry) => (
                <Card as="li" key={entry.slug} interactive className="p-7">
                  <Link href={`/insights/${entry.slug}`} className="block">
                    <div className="flex flex-wrap items-center gap-4">
                      <PlaneTag plane={entry.plane} label={entry.topic} />
                      <time
                        dateTime={entry.published}
                        className="font-mono text-mono-eyebrow uppercase text-muted"
                      >
                        {formatDate(entry.published)}
                      </time>
                      <span className="font-mono text-mono-eyebrow uppercase text-muted">
                        {entry.readingMinutes} {copy.metaLabels.reading}
                      </span>
                    </div>
                    <h3 className="mt-5 max-w-measure text-h2 font-semibold">{entry.title}</h3>
                    <p className="mt-4 max-w-measure text-body text-muted">{entry.description}</p>
                    <p className="mt-6 font-mono text-mono-eyebrow uppercase text-muted">
                      {copy.metaLabels.reader}: {entry.reader}
                    </p>
                  </Link>
                </Card>
              ))}
            </ul>
          ) : (
            <p className="mt-10 text-body text-muted">{copy.emptyState}</p>
          )}

          <p className="mt-10 max-w-measure text-caption text-muted">{copy.disclaimer}</p>
        </div>
      </section>

      <section data-plane="public" className="border-b border-rule">
        <div className="mx-auto max-w-content px-6 py-section-mobile lg:py-section lg:pl-gutter">
          <SectionHeader
            eyebrow={insightsForm.eyebrow}
            headline={insightsForm.headline}
            standfirst={insightsForm.standfirst}
          />
          <RumiqForm
            className="mt-10"
            formId="insights"
            fields={insightsForm.fields}
            submitLabel={insightsForm.submit}
            success={insightsForm.success}
            note={insightsForm.privacyNote}
          />
        </div>
      </section>

      <CTABand />
    </main>
  );
}
