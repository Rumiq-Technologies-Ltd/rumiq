import type { Metadata } from 'next';
import { LandingLegalPage } from '@/components/landing/legal-page';
import { landingLegal } from '@/content/landing/legal';
import { pageMetadata } from '@/lib/seo';

/* TEMPORARY LANDING PAGE — generic privacy notice; the full notice replaces it. */

export const metadata: Metadata = pageMetadata({
  title: landingLegal.privacy.metaTitle,
  description: landingLegal.privacy.description,
  path: '/privacy',
});

export default function LandingPrivacyPage() {
  return (
    <LandingLegalPage
      eyebrow={landingLegal.privacy.eyebrow}
      headline={landingLegal.privacy.headline}
      intro={landingLegal.privacy.intro}
      sections={landingLegal.privacy.sections}
    />
  );
}
