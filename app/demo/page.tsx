import Link from 'next/link';
import { Button, CTABand, IllustrativeBadge, JsonLd, SectionHeader } from '@/components/rumiq';
import { demoIndex } from '@/content/demo';
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from '@/lib/seo';
import { PolicySandbox } from './policy-sandbox/sandbox';
import { GrowthDashboard } from './dashboard/dashboard';
import { CallIntelligence } from './call-intelligence/calls';

/*
 * /demo — all three surfaces on one page.
 *
 * Section 4.1: the illustrative-data banner is the first thing after the
 * headline, in on-screen text, above every figure it applies to. Each surface
 * also keeps its own page, so a link to one of them still works.
 */

const seo = {
  title: 'Demos',
  description:
    'The Policy Sandbox, the Growth Intelligence dashboard and the call review interface, running in the browser on synthetic data.',
  path: '/demo',
};

export const metadata = pageMetadata(seo);

export default function DemoIndexPage() {
  return (
    <main id="main">
      <JsonLd
        data={[
          webPageJsonLd({ title: seo.title, description: seo.description, path: seo.path }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Demos', path: seo.path },
          ]),
        ]}
      />

      <section data-plane="public" className="border-b border-rule">
        <div className="mx-auto max-w-content px-6 py-section-mobile lg:py-section lg:pl-gutter">
          <SectionHeader
            as="h1"
            size="display-l"
            eyebrow={demoIndex.hero.eyebrow}
            headline={demoIndex.hero.headline}
            standfirst={demoIndex.hero.subhead}
          />

          {/* The banner. On-screen text, not a tooltip, above every figure. */}
          <div
            role="note"
            aria-label={demoIndex.banner.label}
            className="mt-12 border border-rule bg-paper-raised p-6"
          >
            <IllustrativeBadge label={demoIndex.banner.label} />
            <p className="mt-4 max-w-measure text-h3 font-display font-semibold">
              {demoIndex.banner.headline}
            </p>
            <p className="mt-4 max-w-measure text-body text-muted">{demoIndex.banner.body}</p>
            <p className="mt-4 max-w-measure text-caption text-muted">{demoIndex.banner.note}</p>
          </div>

          <nav aria-label={demoIndex.nav.label} className="mt-10">
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {demoIndex.nav.items.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="font-mono text-mono-eyebrow uppercase underline decoration-rule underline-offset-4 hover:decoration-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild>
              <Link href={demoIndex.hero.primary.href}>{demoIndex.hero.primary.label}</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href={demoIndex.hero.secondary.href}>{demoIndex.hero.secondary.label}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* One — the boundary. */}
      <section
        id="policy-sandbox"
        data-plane="boundary"
        className="scroll-mt-24 border-b border-rule"
        aria-labelledby="policy-sandbox-heading"
      >
        <div className="mx-auto max-w-content px-6 py-section-mobile lg:py-section lg:pl-gutter">
          <SectionHeader
            eyebrow={demoIndex.sections.sandbox.eyebrow}
            headline={<span id="policy-sandbox-heading">{demoIndex.sections.sandbox.headline}</span>}
            standfirst={demoIndex.sections.sandbox.standfirst}
          />
          <div className="mt-12">
            <PolicySandbox />
          </div>
          <p className="mt-10">
            <Link
              href={demoIndex.sections.sandbox.link.href}
              className="text-body font-medium underline decoration-rule underline-offset-4 hover:decoration-ink"
            >
              {demoIndex.sections.sandbox.link.label}
            </Link>
          </p>
        </div>
      </section>

      {/* Two — the measurement. */}
      <section
        id="dashboard"
        data-plane="protected"
        className="scroll-mt-24 border-b border-rule"
        aria-labelledby="dashboard-heading"
      >
        <div className="mx-auto max-w-bleed px-6 py-section-mobile lg:py-section lg:pl-gutter">
          <SectionHeader
            eyebrow={demoIndex.sections.dashboard.eyebrow}
            headline={<span id="dashboard-heading">{demoIndex.sections.dashboard.headline}</span>}
            standfirst={demoIndex.sections.dashboard.standfirst}
          />
          <div className="mt-12">
            <GrowthDashboard />
          </div>
          <p className="mt-10">
            <Link
              href={demoIndex.sections.dashboard.link.href}
              className="text-body font-medium underline decoration-rule underline-offset-4 hover:decoration-ink"
            >
              {demoIndex.sections.dashboard.link.label}
            </Link>
          </p>
        </div>
      </section>

      {/* Three — the biggest leak. */}
      <section
        id="call-review"
        data-plane="protected"
        className="scroll-mt-24 border-b border-rule"
        aria-labelledby="call-review-heading"
      >
        <div className="mx-auto max-w-bleed px-6 py-section-mobile lg:py-section lg:pl-gutter">
          <SectionHeader
            eyebrow={demoIndex.sections.calls.eyebrow}
            headline={<span id="call-review-heading">{demoIndex.sections.calls.headline}</span>}
            standfirst={demoIndex.sections.calls.standfirst}
          />
          <div className="mt-12">
            <CallIntelligence />
          </div>
          <p className="mt-10">
            <Link
              href={demoIndex.sections.calls.link.href}
              className="text-body font-medium underline decoration-rule underline-offset-4 hover:decoration-ink"
            >
              {demoIndex.sections.calls.link.label}
            </Link>
          </p>
        </div>
      </section>

      <CTABand />
    </main>
  );
}
