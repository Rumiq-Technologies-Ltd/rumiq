import { CTABand, DataFreshness, Hero, PolicyCallout, StepSection } from '@/components/rumiq';
import { connectorsPage as copy } from '@/content/platform-pages';
import { dashboardSectors } from '@/lib/sectors';
import { pageMetadata } from '@/lib/seo';

/* Section 8.6 — the two-pilot argument. Curve Dental is named; nothing on the
 * transport side is: no dispatch platform, no broker, no integration claim. */

export const metadata = pageMetadata({
  title: 'Knowledge Graph and Connectors',
  description:
    'Read the systems you already run, map each source into one canonical model, and state what every source cannot tell you.',
  path: '/platform/connectors',
});

export default function ConnectorsPage() {
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

      <PolicyCallout
        eyebrow={copy.twoPilots.eyebrow}
        headline={copy.twoPilots.headline}
        body={copy.twoPilots.body}
        note={copy.twoPilots.note}
      />

      <StepSection
        eyebrow={copy.how.eyebrow}
        headline={copy.how.headline}
        steps={copy.how.steps}
        columns={4}
      />

      {/* Freshness, using the same connector health data the dashboard reads. */}
      <section data-plane="protected" className="border-b border-rule">
        <div className="mx-auto max-w-content px-6 py-section-mobile lg:py-section lg:pl-gutter">
          <div className="border-l-2 border-boundary pl-6">
            <p className="font-mono text-mono-eyebrow uppercase text-muted">
              {copy.freshness.eyebrow}
            </p>
            <p className="mt-5 max-w-measure text-body-l">{copy.freshness.body}</p>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            {dashboardSectors.map((sector) => (
              <div key={sector.id}>
                <p className="font-mono text-mono-eyebrow uppercase text-muted">
                  {sector.label} · illustrative connector state
                </p>
                <ul className="mt-5 divide-y divide-rule border-y border-rule">
                  {sector.dashboard.connectors.map((connector) => (
                    <li key={connector.name} className="py-4">
                      <DataFreshness
                        source={connector.name}
                        updated={connector.updated}
                        state={connector.state}
                      />
                      <p className="mt-2 text-caption text-muted">{connector.note}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </main>
  );
}
