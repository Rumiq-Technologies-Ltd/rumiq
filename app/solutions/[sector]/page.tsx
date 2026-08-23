import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  CTABand,
  Card,
  FaqSection,
  FunnelTrack,
  Hero,
  JsonLd,
  PointsSection,
  ProofSlot,
  SectionHeader,
  StepSection,
} from '@/components/rumiq';
import { clinicalFunnel } from '@/content/funnels';
import { faqFor, type FaqPageId } from '@/content/faq';
import { sectors, findSectorBySlug } from '@/lib/sectors';
import { breadcrumbJsonLd, faqJsonLd, pageMetadata, webPageJsonLd } from '@/lib/seo';

/*
 * One template for every solutions page — Section 8.8.
 *
 * The page is driven entirely by the sector config: hero headline and subhead,
 * failure modes, module order, first ninety days, regulatory notes and proof
 * slots. A sector with no config has no page: the route returns 404 rather than
 * shipping an empty template, which is how the five scaffolded sectors behave.
 */

type Params = { params: Promise<{ sector: string }> };

export function generateStaticParams() {
  return sectors.map((sector) => ({ sector: sector.href.replace('/solutions/', '') }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { sector: slug } = await params;
  const sector = findSectorBySlug(slug);
  if (!sector) return { title: 'Not found' };
  return pageMetadata({
    title: sector.label,
    description: sector.hero.subhead,
    path: sector.href,
  });
}

export default async function SolutionsPage({ params }: Params) {
  const { sector: slug } = await params;
  const sector = findSectorBySlug(slug);
  if (!sector) notFound();

  const { page, hero } = sector;
  const funnel = page.funnel;
  // The Document 05 placement map is keyed by route, so the sector page asks
  // for its own entries without the template knowing the sector list.
  const faqPage = `solutions/${slug}` as FaqPageId;
  const faqs = faqFor(faqPage);

  return (
    <main id="main">
      <JsonLd
        data={[
          webPageJsonLd({
            title: sector.label,
            description: sector.hero.subhead,
            path: sector.href,
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Solutions', path: '/solutions' },
            { name: sector.label, path: sector.href },
          ]),
          faqJsonLd(faqs),
        ]}
      />

      {/* Hero copy comes from the sector config, overriding the neutral default. */}
      <Hero
        eyebrow={hero.eyebrow}
        headline={hero.headline}
        subhead={hero.subhead}
        primary={{ label: 'Book a working session', href: '/contact' }}
        secondary={{ label: 'Get the scorecard', href: '/scorecard' }}
        assurances={hero.assurances}
      />

      {/* The problem, in this reader's words */}
      <section data-plane="protected" className="bg-paper-dark">
        <div className="mx-auto max-w-content px-6 py-section-mobile lg:py-section lg:pl-gutter">
          <SectionHeader
            eyebrow={page.problem.eyebrow}
            headline={page.problem.headline}
            standfirst={page.problem.body}
            inverted
          />
          <p className="mt-10 max-w-measure border-l-2 border-boundary pl-6 text-body-l text-paper">
            {hero.sharpestProblem}
          </p>
        </div>
      </section>

      {/* Three failure modes, and what each one costs */}
      <section data-plane="boundary" className="border-b border-rule">
        <div className="mx-auto max-w-content px-6 py-section-mobile lg:py-section lg:pl-gutter">
          <SectionHeader
            eyebrow="HOW IT FAILS"
            headline="Three failure modes, and what each one costs."
          />
          <ul className="mt-12 grid gap-4 lg:grid-cols-3">
            {page.failureModes.map((mode, index) => (
              <Card as="li" key={mode.title} className="p-6">
                <span className="font-mono text-caption text-muted tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-h3 font-semibold">{mode.title}</h3>
                <p className="mt-3 text-caption text-muted">{mode.body}</p>
                <p className="mt-6 border-t border-rule pt-4 font-mono text-mono-eyebrow uppercase text-boundary-ink">
                  Cost · {mode.cost}
                </p>
              </Card>
            ))}
          </ul>
        </div>
      </section>

      {/* The journey. Sectors with their own funnel array use it. */}
      <section data-plane="protected" className="border-b border-rule">
        <div className="mx-auto max-w-content px-6 py-section-mobile lg:py-section lg:pl-gutter">
          <SectionHeader
            eyebrow="THE JOURNEY WE MEASURE"
            headline={
              funnel
                ? 'Every stage in your own language, end to end.'
                : 'Marketing stops at the lead. The revenue does not happen until care is delivered.'
            }
          />
          <FunnelTrack
            className="mt-12"
            stages={funnel ? funnel.stages : clinicalFunnel}
            label={funnel ? funnel.label : 'The clinical growth journey, seventeen stages'}
          />
        </div>
      </section>

      {/* Which modules, in what order */}
      <StepSection
        eyebrow={page.modules.eyebrow}
        headline={page.modules.headline}
        steps={page.modules.steps.map((step, index) => ({
          label: `${index + 1}. ${step.name}`,
          body: step.why,
        }))}
        plane="boundary"
      />

      {/* The first 90 days */}
      <StepSection
        eyebrow={page.first90.eyebrow}
        headline={page.first90.headline}
        steps={page.first90.phases.map((phase) => ({ label: phase.label, body: phase.body }))}
        plane="protected"
      />

      {/* Regulatory notes */}
      <PointsSection
        eyebrow={page.regulatory.eyebrow}
        headline={page.regulatory.headline}
        points={page.regulatory.notes}
        plane="boundary"
      />

      {/* Proof. Section 4.1: placeholders only. */}
      <section data-plane="public" className="border-b border-rule">
        <div className="mx-auto max-w-content px-6 py-section-mobile lg:py-section lg:pl-gutter">
          <SectionHeader
            eyebrow="WHERE WE ARE"
            headline="Two pilots running. A small number of design partner slots open."
          />
          {/* TODO: real content required before launch (Section 16.1). */}
          <ul className="mt-12 grid gap-4 md:grid-cols-2">
            {page.proofSlots.map((slot) => (
              <li key={slot}>
                <ProofSlot intent={slot} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ. Section 15: Document 05 supplies every entry, and nothing
          renders until it does. */}
      <FaqSection page={faqPage} headline="The questions this buyer asks." />

      <section data-plane="public" className="border-b border-rule">
        <div className="mx-auto max-w-content px-6 py-10 lg:pl-gutter">
          <Link
            href="/solutions"
            className="text-body font-medium underline decoration-rule underline-offset-4 hover:decoration-ink"
          >
            Other provider types
          </Link>
        </div>
      </section>

      <CTABand />
    </main>
  );
}
