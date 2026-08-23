import type { Metadata } from 'next';
import Link from 'next/link';
import { CTABand, Hero, PolicyCallout, PointsSection, StepSection } from '@/components/rumiq';
import { PolicySandboxEmbed } from '@/components/demo/policy-sandbox-embed';
import { privacyGatewayPage as copy } from '@/content/platform-pages';

/* Section 8.3 — the flagship page. Primary reader: compliance and IT. */

export const metadata: Metadata = {
  title: 'Privacy and Data Gateway',
  description:
    'Every event classified before it routes anywhere, default deny on sensitive page classes, and a disclosure ledger that records the policy version behind each decision.',
};

export default function PrivacyGatewayPage() {
  return (
    <main id="main">
      <Hero
        eyebrow={copy.hero.eyebrow}
        headline={copy.hero.headline}
        subhead={copy.hero.subhead}
        primary={copy.hero.primary}
        secondary={copy.hero.secondary}
        assurances={copy.hero.assurances}
        demo={<PolicySandboxEmbed compact={false} />}
      />

      <StepSection
        eyebrow={copy.how.eyebrow}
        headline={copy.how.headline}
        steps={copy.how.steps}
        columns={4}
      />

      <PolicyCallout eyebrow={copy.hardLine.eyebrow} body={copy.hardLine.body} />

      <PointsSection
        eyebrow={copy.assurance.eyebrow}
        headline={copy.assurance.headline}
        points={copy.assurance.points}
        inverted
      >
        <p className="mt-8">
          <Link
            href={copy.assurance.link.href}
            className="text-body font-medium text-paper underline decoration-paper/40 underline-offset-4 hover:decoration-paper"
          >
            {copy.assurance.link.label}
          </Link>
        </p>
      </PointsSection>

      <CTABand />
    </main>
  );
}
