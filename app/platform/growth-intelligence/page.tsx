import type { Metadata } from 'next';
import { CTABand, Hero, PolicyCallout, StepSection } from '@/components/rumiq';
import { GrowthDashboard } from '@/app/demo/dashboard/dashboard';
import { growthIntelligencePage as copy } from '@/content/platform-pages';

/* Section 8.5 */

export const metadata: Metadata = {
  title: 'Growth Intelligence',
  description:
    'Spend, access, attendance, delivered care and patient feedback in one view, with the gaps shown rather than smoothed.',
};

export default function GrowthIntelligencePage() {
  return (
    <main id="main">
      <Hero
        eyebrow={copy.hero.eyebrow}
        headline={copy.hero.headline}
        subhead={copy.hero.subhead}
        primary={copy.hero.primary}
        secondary={copy.hero.secondary}
        assurances={copy.hero.assurances}
        demo={<GrowthDashboard />}
      />

      <StepSection
        eyebrow={copy.how.eyebrow}
        headline={copy.how.headline}
        steps={copy.how.steps}
        plane="protected"
        columns={4}
      />

      <PolicyCallout
        eyebrow={copy.honesty.eyebrow}
        headline={copy.honesty.headline}
        body={copy.honesty.body}
      />

      <CTABand />
    </main>
  );
}
