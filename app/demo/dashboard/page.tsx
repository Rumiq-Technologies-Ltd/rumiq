import type { Metadata } from 'next';
import { CTABand, SectionHeader } from '@/components/rumiq';
import { GrowthDashboard } from './dashboard';

export const metadata: Metadata = {
  title: 'Growth Intelligence dashboard',
  description:
    'A working dashboard on synthetic data: funnel, source performance, capacity and the next best action, for two very different operations.',
};

export default function DashboardDemoPage() {
  return (
    <main id="main">
      <section data-plane="protected" className="border-b border-rule">
        <div className="mx-auto max-w-bleed px-6 py-section-mobile lg:py-section lg:pl-gutter">
          <SectionHeader
            as="h1"
            size="display-l"
            eyebrow="DEMO · GROWTH INTELLIGENCE"
            headline="The same dashboard over two operations that share nothing."
            standfirst="Switch the provider type and every label, dimension and figure changes, because they come from the sector config rather than from the component. The filters filter the data, not the caption."
          />
          <p className="mt-8 max-w-measure text-caption text-muted">
            Every figure here is synthetic. No connector, client system or real record is involved.
            The transport dataset is deliberately generic: the pilot architecture work has not
            started, so it makes no claim about how a real operation is structured.
          </p>
        </div>
      </section>

      <section data-plane="protected">
        <div className="mx-auto max-w-bleed px-6 py-section-mobile lg:py-section lg:pl-gutter">
          <GrowthDashboard />
        </div>
      </section>

      <CTABand />
    </main>
  );
}
