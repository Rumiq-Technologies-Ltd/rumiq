import type { Metadata } from 'next';
import { CTABand, SectionHeader } from '@/components/rumiq';
import { CallIntelligence } from './calls';

export const metadata: Metadata = {
  title: 'Call review',
  description:
    'Twelve synthetic calls, classified with confidence scores, with every machine label open to human correction.',
};

export default function CallIntelligenceDemoPage() {
  return (
    <main id="main">
      <section data-plane="protected" className="border-b border-rule">
        <div className="mx-auto max-w-bleed px-6 py-section-mobile lg:py-section lg:pl-gutter">
          <SectionHeader
            as="h1"
            size="display-l"
            eyebrow="DEMO · PATIENT ACCESS INTELLIGENCE"
            headline="The phone is the biggest leak, and the least measured."
            standfirst="Every call gets a reason, a confidence score and a human who can overrule it. Low-confidence classifications are flagged rather than quietly counted."
          />
          <p className="mt-8 max-w-measure text-caption text-muted">
            All twelve calls are synthetic. Transcript lines are summaries written for this demo:
            no real call, no patient and no clinical content is involved.
          </p>
        </div>
      </section>

      <section data-plane="protected">
        <div className="mx-auto max-w-bleed px-6 py-section-mobile lg:py-section lg:pl-gutter">
          <CallIntelligence />
        </div>
      </section>

      <CTABand />
    </main>
  );
}
