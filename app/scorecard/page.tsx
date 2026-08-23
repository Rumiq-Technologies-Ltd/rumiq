import { CTABand, JsonLd, SectionHeader } from '@/components/rumiq';
import { scorecardCopy } from '@/content/scorecard';
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from '@/lib/seo';
import { Scorecard } from './scorecard';

/*
 * /scorecard — Specification Section 10.
 *
 * A self-assessment. It does not scan, crawl or analyse the visitor's website
 * or systems, and the page says so above the fold rather than in a footnote.
 */

const seo = {
  title: 'Growth Leak Scorecard',
  description:
    'Ten questions about how patients currently reach you, and a ranked list of where you are most likely losing them. A self-assessment: nothing is scanned or analysed.',
  path: '/scorecard',
};

export const metadata = pageMetadata(seo);

export default function ScorecardPage() {
  return (
    <main id="main">
      <JsonLd
        data={[
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
            eyebrow={scorecardCopy.eyebrow}
            headline={scorecardCopy.headline}
            standfirst={scorecardCopy.subhead}
          />
          <p className="mt-8 font-mono text-mono-eyebrow uppercase text-muted">
            Ten questions · About four minutes · No email required to see the result
          </p>
        </div>
      </section>

      <section data-plane="boundary" className="border-b border-rule">
        <div className="mx-auto max-w-content px-6 py-section-mobile lg:py-section lg:pl-gutter">
          <div className="max-w-3xl">
            <Scorecard />
          </div>
        </div>
      </section>

      <CTABand />
    </main>
  );
}
