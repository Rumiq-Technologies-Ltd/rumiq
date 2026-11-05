import { CTABand, Eyebrow, Hero, PolicyCallout, SectionHeader, StepSection } from '@/components/rumiq';
import { contentPage as copy } from '@/content/platform-pages';
import { pageMetadata } from '@/lib/seo';

/* Section 8.7 — no demo. The content grader criteria are the central visual. */

export const metadata = pageMetadata({
  title: 'Content and Discovery',
  description:
    'Healthcare content as an operational asset: reviewed, structured, multilingual, and measured on whether it produced patients.',
  path: '/platform/content',
});

export default function ContentPage() {
  return (
    <main id="main">
      <Hero
        eyebrow={copy.hero.eyebrow}
        headline={copy.hero.headline}
        subhead={copy.hero.subhead}
        primary={copy.hero.primary}
        secondary={copy.hero.secondary}
        assurances={copy.hero.assurances}
      />

      {/* The grader criteria, as the page's central visual. */}
      <section data-plane="public" className="border-b border-rule">
        <div className="mx-auto max-w-bleed px-6 py-section-mobile lg:py-section lg:pl-gutter">
          <SectionHeader
            eyebrow={copy.grader.eyebrow}
            headline={copy.grader.headline}
            standfirst={copy.grader.standfirst}
          />

          <ol className="mt-12 grid border-l border-t border-rule md:grid-cols-2 xl:grid-cols-4">
            {copy.grader.criteria.map((criterion, index) => (
              <li
                key={criterion.name}
                className="flex min-h-[220px] flex-col border-b border-r border-rule bg-paper-raised p-6"
              >
                <span className="font-mono text-caption text-muted tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-h3 font-semibold">{criterion.name}</h3>
                <p className="mt-4 flex-1 text-caption text-muted">{criterion.test}</p>
                <span className="mt-5 inline-flex w-fit items-center rounded-button border border-rule px-2 py-[2px] font-mono text-mono-eyebrow uppercase text-muted">
                  Criterion
                </span>
              </li>
            ))}
          </ol>

          <p className="mt-8 max-w-measure text-caption text-muted">{copy.grader.note}</p>
        </div>
      </section>

      <StepSection
        eyebrow={copy.discovery.eyebrow}
        headline={copy.discovery.headline}
        steps={copy.discovery.steps}
        plane="public"
        columns={4}
      />

      <PolicyCallout eyebrow={copy.boundary.eyebrow} body={copy.boundary.body}>
        <p className="mt-6">
          <Eyebrow>Public plane</Eyebrow>
        </p>
      </PolicyCallout>

      <CTABand />
    </main>
  );
}
