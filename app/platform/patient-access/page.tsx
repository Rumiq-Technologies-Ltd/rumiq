import { CTABand, Hero, PolicyCallout, StepSection } from '@/components/rumiq';
import { CallIntelligence } from '@/app/demo/call-intelligence/calls';
import { patientAccessPage as copy } from '@/content/platform-pages';
import { pageMetadata } from '@/lib/seo';

/* Section 8.4 */

export const metadata = pageMetadata({
  title: 'Patient Access Intelligence',
  description:
    'Calls, forms, chat and text measured against what happened next, including the reason a booking did not happen.',
  path: '/platform/patient-access',
});

export default function PatientAccessPage() {
  return (
    <main id="main">
      <Hero
        eyebrow={copy.hero.eyebrow}
        headline={copy.hero.headline}
        subhead={copy.hero.subhead}
        primary={copy.hero.primary}
        secondary={copy.hero.secondary}
        assurances={copy.hero.assurances}
        demo={<CallIntelligence />}
      />

      <StepSection
        eyebrow={copy.how.eyebrow}
        headline={copy.how.headline}
        steps={copy.how.steps}
        plane="protected"
        columns={4}
      />

      {/* Section 8.4 — the recording and jurisdiction callout. */}
      <PolicyCallout
        eyebrow={copy.recordingCallout.eyebrow}
        body={copy.recordingCallout.body}
      />

      <PolicyCallout
        eyebrow={copy.humanLoop.eyebrow}
        headline={copy.humanLoop.headline}
        body={copy.humanLoop.body}
      />

      <CTABand />
    </main>
  );
}
