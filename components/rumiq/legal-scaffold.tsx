import { Eyebrow } from './eyebrow';
import { SectionHeader } from './section-header';
import { legalBanner, type LegalPage } from '@/content/legal';

/**
 * The shared shape of /privacy, /cookies and /terms while they are scaffolds.
 *
 * One component, so the AWAITING LEGAL REVIEW banner cannot be present on two
 * of the three pages and missing from the other. Section 4.2.
 */
export function LegalScaffold({ page }: { page: LegalPage }) {
  return (
    <main id="main">
      <section data-plane="boundary" className="border-b border-rule">
        <div className="mx-auto max-w-content px-6 py-section-mobile lg:py-section lg:pl-gutter">
          {/* The one place amber is right on this page: a policy state, not decoration. */}
          <div
            role="note"
            aria-label={legalBanner.label}
            className="mb-12 border-l-2 border-boundary bg-paper-raised p-6"
          >
            <Eyebrow className="text-ink">{legalBanner.label}</Eyebrow>
            <p className="mt-4 max-w-measure text-body">{legalBanner.body}</p>
          </div>

          <SectionHeader
            as="h1"
            size="display-l"
            eyebrow={page.eyebrow}
            headline={page.headline}
            standfirst={page.standfirst}
          />
        </div>
      </section>

      <section data-plane="public" className="border-b border-rule">
        <div className="mx-auto max-w-content px-6 py-section-mobile lg:py-section lg:pl-gutter">
          <h2 className="text-h2 font-semibold">{page.factual.heading}</h2>
          <ul className="mt-10 space-y-4">
            {page.factual.points.map((point) => (
              <li key={point} className="max-w-measure border-b border-rule pb-4 text-body">
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section data-plane="protected" className="bg-paper-dark">
        <div className="mx-auto max-w-content px-6 py-section-mobile lg:py-section lg:pl-gutter">
          <h2 className="text-h2 font-semibold text-paper">{page.outstanding.heading}</h2>
          <ol className="mt-10 border-t border-paper/15">
            {page.outstanding.points.map((point, index) => (
              <li
                key={point}
                className="flex gap-6 border-b border-paper/15 py-5 text-body text-paper/80"
              >
                <span className="font-mono text-caption tabular-nums text-paper/60">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="max-w-measure">{point}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
