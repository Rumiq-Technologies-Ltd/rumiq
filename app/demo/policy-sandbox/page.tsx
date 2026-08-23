import Link from 'next/link';
import { CTABand, IllustrativeBadge, SectionHeader } from '@/components/rumiq';
import { policySandboxCopy as copy } from '@/content/demo/policy-sandbox';
import { PolicySandbox } from './sandbox';
import { pageMetadata } from '@/lib/seo';

/*
 * Primary reader: compliance, IT and the data protection officer (Section 2).
 * The marketing director is the secondary reader.
 */

export const metadata = pageMetadata({
  title: 'Policy Sandbox',
  description:
    'Pick a page type and a destination and watch what Rumiq allows, redacts or blocks before anything leaves.',
  path: '/demo/policy-sandbox',
});

export default function PolicySandboxPage() {
  return (
    <main id="main">
      <section data-plane="boundary" className="border-b border-rule">
        <div className="mx-auto max-w-content px-6 py-section-mobile lg:py-section lg:pl-gutter">
          <SectionHeader
            as="h1"
            size="display-l"
            eyebrow={copy.eyebrow}
            headline={copy.headline}
            standfirst={copy.standfirst}
          />
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <IllustrativeBadge />
            <p className="max-w-measure text-caption text-muted">{copy.illustrativeNote}</p>
          </div>
        </div>
      </section>

      <section data-plane="boundary">
        <div className="mx-auto max-w-content px-6 py-section-mobile lg:py-section lg:pl-gutter">
          <PolicySandbox />

          <blockquote className="mt-16 border-l-2 border-boundary pl-6">
            <p className="max-w-measure text-h3 font-display font-semibold">{copy.theHardLine}</p>
          </blockquote>

          <p className="mt-10">
            <Link href={copy.moreLink.href} className="text-body font-medium underline decoration-rule underline-offset-4 hover:decoration-ink">
              {copy.moreLink.label}
            </Link>
          </p>
        </div>
      </section>

      <CTABand />
    </main>
  );
}
