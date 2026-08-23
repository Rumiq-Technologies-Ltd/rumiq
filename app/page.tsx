import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Button,
  Card,
  CTABand,
  Eyebrow,
  FunnelTrack,
  Hero,
  IllustrativeBadge,
  PlaneDiagram,
  PlaneTag,
  ProofSlot,
  SectionHeader,
} from '@/components/rumiq';
import { PolicySandboxEmbed } from '@/components/demo/policy-sandbox-embed';
import { home } from '@/content/home';
import { clinicalFunnel } from '@/content/funnels';

/*
 * Homepage — Specification Section 8.1.
 * Primary reader: owner, CEO or managing partner. All copy comes from
 * content/home.ts; this file is composition only.
 */

export const metadata: Metadata = {
  description:
    'Rumiq connects marketing, patient access and operational data into one governed view of growth, from first search to delivered care.',
};

export default function HomePage() {
  return (
    <main id="main">
      {/* 1 — Hero. Neutral defaults; solutions pages override the props. */}
      <Hero primary={home.hero.primary} secondary={home.hero.secondary} assurances={home.hero.assurances}>
        <PolicySandboxEmbed />
      </Hero>

      {/* 2 — Benefit strip */}
      <section data-plane="public" className="border-b border-rule">
        <div className="mx-auto max-w-content px-6 py-16 lg:pl-gutter">
          <ul className="grid gap-10 lg:grid-cols-3">
            {home.benefits.map((benefit) => (
              <li key={benefit.title}>
                <h2 className="text-h3 font-semibold">{benefit.title}</h2>
                <p className="mt-3 max-w-measure text-caption text-muted">{benefit.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3 — The problem, inverted */}
      <section data-plane="protected" className="bg-paper-dark">
        <div className="mx-auto max-w-content px-6 py-section-mobile lg:py-section lg:pl-gutter">
          <SectionHeader
            eyebrow={home.problem.eyebrow}
            headline={home.problem.headline}
            standfirst={home.problem.body}
            inverted
          />
          <p className="mt-12 max-w-measure text-body-l text-paper">{home.problem.lead}</p>
          <ul className="mt-8 grid gap-px border-l border-t border-paper/15 md:grid-cols-2">
            {home.problem.questions.map((question) => (
              <li
                key={question}
                className="border-b border-r border-paper/15 p-6 text-body text-paper/80"
              >
                {question}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4 — The three-plane diagram */}
      <section data-plane="boundary" className="border-b border-rule">
        <div className="mx-auto max-w-content px-6 py-section-mobile lg:py-section lg:pl-gutter">
          <SectionHeader
            eyebrow={home.planes.eyebrow}
            headline={home.planes.headline}
            standfirst={home.planes.caption}
          />
          <div className="mt-12">
            <PlaneDiagram />
          </div>
          <p className="mt-10">
            <Link
              href={home.planes.link.href}
              className="text-body font-medium underline decoration-rule underline-offset-4 hover:decoration-ink"
            >
              {home.planes.link.label}
            </Link>
          </p>
        </div>
      </section>

      {/* 5 — The funnel, seventeen clinical stages */}
      <section data-plane="protected" className="border-b border-rule">
        <div className="mx-auto max-w-content px-6 py-section-mobile lg:py-section lg:pl-gutter">
          <SectionHeader eyebrow={home.funnel.eyebrow} headline={home.funnel.headline} />
          <FunnelTrack className="mt-12" stages={clinicalFunnel} label={home.funnel.label} />
        </div>
      </section>

      {/* 6 — Demo teaser */}
      <section data-plane="boundary" className="border-b border-rule">
        <div className="mx-auto max-w-content px-6 py-section-mobile lg:py-section lg:pl-gutter">
          <SectionHeader
            eyebrow={home.demoTeaser.eyebrow}
            headline={home.demoTeaser.headline}
            standfirst={home.demoTeaser.body}
          />
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button asChild>
              <Link href={home.demoTeaser.cta.href}>{home.demoTeaser.cta.label}</Link>
            </Button>
            <IllustrativeBadge />
          </div>
        </div>
      </section>

      {/* 7 — Who it is for. Single-site first (Section 4.4). */}
      <section data-plane="public" className="border-b border-rule">
        <div className="mx-auto max-w-content px-6 py-section-mobile lg:py-section lg:pl-gutter">
          <SectionHeader eyebrow={home.whoItsFor.eyebrow} headline={home.whoItsFor.headline} />
          <ul className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {home.whoItsFor.cards.map((card) => (
              <Card as="li" key={card.title} interactive className="p-6">
                <Link href={card.href} className="block">
                  <h3 className="text-h3 font-semibold">{card.title}</h3>
                  <p className="mt-3 text-caption text-muted">{card.problem}</p>
                  <p className="mt-6 font-mono text-mono-eyebrow uppercase text-muted">
                    See the detail
                  </p>
                </Link>
              </Card>
            ))}
          </ul>
        </div>
      </section>

      {/* 8 — Regions */}
      <section data-plane="boundary" className="border-b border-rule">
        <div className="mx-auto max-w-content px-6 py-section-mobile lg:py-section lg:pl-gutter">
          <SectionHeader eyebrow={home.regions.eyebrow} headline={home.regions.headline} />
          <ul className="mt-12 grid gap-4 lg:grid-cols-2">
            {home.regions.panels.map((panel) => (
              <Card as="li" key={panel.name} className="p-6">
                <PlaneTag plane={panel.plane} label={panel.name} />
                <p className="mt-5 text-body">{panel.residency}</p>
                <p className="mt-3 text-caption text-muted">{panel.framework}</p>
                <p className="mt-6">
                  <Link
                    href={panel.href}
                    className="text-caption font-medium underline decoration-rule underline-offset-4 hover:decoration-ink"
                  >
                    {panel.name} detail
                  </Link>
                </p>
              </Card>
            ))}
          </ul>
          <p className="mt-8 max-w-measure text-caption text-muted">{home.regions.note}</p>
        </div>
      </section>

      {/* 9 — Proof. Section 4.1: placeholders only until content is approved. */}
      <section data-plane="public" className="border-b border-rule">
        <div className="mx-auto max-w-content px-6 py-section-mobile lg:py-section lg:pl-gutter">
          <SectionHeader
            eyebrow={home.proof.eyebrow}
            headline={home.proof.headline}
            standfirst={home.proof.body}
          />
          <p className="mt-6 max-w-measure text-body text-muted">{home.proof.second}</p>
          {/* TODO: real content required before launch. Both pilot references
              need written client approval first (Section 16.1). */}
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {home.proof.slots.map((slot) => (
              <li key={slot}>
                <ProofSlot intent={slot} />
              </li>
            ))}
          </ul>
          <p className="mt-10">
            <Link
              href={home.proof.cta.href}
              className="text-body font-medium underline decoration-rule underline-offset-4 hover:decoration-ink"
            >
              {home.proof.cta.label}
            </Link>
          </p>
        </div>
      </section>

      {/* 10 — FAQ. Section 15: copy comes from Document 05 only. */}
      <section data-plane="boundary" className="border-b border-rule">
        <div className="mx-auto max-w-content px-6 py-section-mobile lg:py-section lg:pl-gutter">
          <SectionHeader eyebrow={home.faq.eyebrow} headline={home.faq.headline} />
          {/* TODO: place the Document 05 entries here, verbatim, per its
              placement map. No FAQ copy is authored in this codebase. */}
          <div className="mt-12 rounded-card border border-dashed border-rule p-6">
            <Eyebrow>Awaiting Document 05</Eyebrow>
            <p className="mt-4 max-w-measure text-caption text-muted">{home.faq.pending}</p>
          </div>
        </div>
      </section>

      {/* 11 — CTA band */}
      <CTABand />
    </main>
  );
}
