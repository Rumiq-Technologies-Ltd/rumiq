import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { CTABand, Eyebrow, JsonLd, PlaneTag } from '@/components/rumiq';
import { getInsight, insightBodies, insights, insightsIndexCopy } from '@/content/insights';
import { articleJsonLd, breadcrumbJsonLd, pageMetadata } from '@/lib/seo';

/*
 * /insights/[slug] — Section 8.13.
 *
 * The body is an MDX module resolved through the explicit registry, so an
 * article file that is not registered cannot ship, and a slug that does not
 * exist 404s rather than rendering an empty shell.
 */

export function generateStaticParams() {
  return insights.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = getInsight(slug);
  if (!meta) return {};

  return pageMetadata({
    title: meta.title,
    description: meta.description,
    path: `/insights/${meta.slug}`,
    type: 'article',
    publishedTime: meta.published,
    ogImagePath: `/insights/${meta.slug}/opengraph-image`,
  });
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = getInsight(slug);
  const loader = insightBodies[slug];
  if (!meta || !loader) notFound();

  const { default: Body } = await loader();

  return (
    <main id="main">
      <JsonLd
        data={[
          articleJsonLd({
            title: meta.title,
            description: meta.description,
            path: `/insights/${meta.slug}`,
            published: meta.published,
            updated: meta.updated,
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Insights', path: '/insights' },
            { name: meta.title, path: `/insights/${meta.slug}` },
          ]),
        ]}
      />

      <article>
        <header data-plane={meta.plane} className="border-b border-rule">
          <div className="mx-auto max-w-content px-6 py-section-mobile lg:py-section lg:pl-gutter">
            <p className="font-mono text-mono-eyebrow uppercase text-muted">
              <Link href="/insights" className="underline decoration-rule underline-offset-4 hover:decoration-ink">
                Insights
              </Link>
            </p>
            <h1 className="mt-6 max-w-measure text-display-l font-bold">{meta.title}</h1>
            <p className="mt-6 max-w-measure text-body-l text-muted">{meta.description}</p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <PlaneTag plane={meta.plane} label={meta.topic} />
              <time dateTime={meta.published} className="font-mono text-mono-eyebrow uppercase text-muted">
                {formatDate(meta.published)}
              </time>
              <span className="font-mono text-mono-eyebrow uppercase text-muted">
                {meta.readingMinutes} {insightsIndexCopy.metaLabels.reading}
              </span>
              <span className="font-mono text-mono-eyebrow uppercase text-muted">
                {insightsIndexCopy.metaLabels.reader}: {meta.reader}
              </span>
            </div>
          </div>
        </header>

        <div data-plane="boundary" className="border-b border-rule">
          <div className="mx-auto max-w-content px-6 py-section-mobile lg:py-section lg:pl-gutter">
            {/* MDX elements are mapped in /mdx-components.tsx, so no article
                authors any styling of its own. */}
            <Body />

            <div className="mt-16 border-t border-rule pt-8">
              <Eyebrow>Editorial</Eyebrow>
              <p className="mt-4 max-w-measure text-caption text-muted">
                {insightsIndexCopy.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </article>

      <CTABand />
    </main>
  );
}
