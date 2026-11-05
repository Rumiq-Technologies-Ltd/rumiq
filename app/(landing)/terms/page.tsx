import type { Metadata } from 'next';
import { LandingLegalPage } from '@/components/landing/legal-page';
import { landingLegal } from '@/content/landing/legal';
import { pageMetadata } from '@/lib/seo';

/* TEMPORARY LANDING PAGE — generic terms notice; the full terms replace it. */

export const metadata: Metadata = pageMetadata({
  title: landingLegal.terms.metaTitle,
  description: landingLegal.terms.description,
  path: '/terms',
});

export default function LandingTermsPage() {
  return (
    <LandingLegalPage
      eyebrow={landingLegal.terms.eyebrow}
      headline={landingLegal.terms.headline}
      intro={landingLegal.terms.intro}
      sections={landingLegal.terms.sections}
    />
  );
}
