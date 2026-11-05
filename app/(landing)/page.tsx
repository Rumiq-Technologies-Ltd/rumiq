import type { Metadata } from 'next';
import { ArrowDown } from 'lucide-react';
import { Button, Eyebrow, JsonLd, SectionHeader } from '@/components/rumiq';
import { HeroArcs } from '@/components/landing/hero-arcs';
import { ServiceStack } from '@/components/landing/service-stack';
import { WhoWeServe } from '@/components/landing/who-we-serve';
import { landing } from '@/content/landing';
import { ClientFlow, measureFlowNodes } from '@/components/landing/client-flow';
import { PrivacyFlow } from '@/components/landing/privacy-flow';
import { PrinciplesCarousel } from '@/components/landing/principles-carousel';
import { Commitments } from '@/components/landing/commitments';
import { ComplianceReview } from '@/components/landing/compliance-review';
import { CareersRoles } from '@/components/landing/careers-roles';
import { landingJsonLd } from '@/lib/landing/structured-data';
import { pageMetadata } from '@/lib/seo';

/*
 * TEMPORARY LANDING PAGE — the one-page rumiq.ai. Copy comes from
 * content/landing; this file composes it with the existing components and
 * tokens. Sections are in the order the owner supplied.
 */

export const metadata: Metadata = pageMetadata({
  title: landing.meta.title,
  description: landing.meta.description,
  path: '/',
});

/* Visual markers only. Not copy: the numbers follow section order. */
const sectionNumber = (n: number) => String(n).padStart(2, '0');

const contactHref = `mailto:${landing.email}`;

/* "How we work": one visual per principle, in the same order as the copy. */
const principleVisuals = [
  <Commitments key="commitments" label="Three commitments for every client: check compliance first, keep patient information protected, report every result honestly" />,
  <ComplianceReview key="compliance" label="A compliance review: website, social media and patient access checked; privacy and accessibility in review" />,
  <PrivacyFlow key="privacy" label="Your data passes through Rumiq; patient information stays in the practice and only business information reaches ad platforms" />,
  <ClientFlow key="measure" row label="Inquiries, calls and bookings, reported plainly" nodes={measureFlowNodes} />,
];

export default function LandingPage() {
  return (
    <main id="main">
      <JsonLd data={landingJsonLd()} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-rule">
        <HeroArcs />
        <div className="relative mx-auto flex max-w-content flex-col justify-center px-6 py-section-mobile min-h-[80svh] lg:min-h-[calc(88svh-72px)] lg:py-section lg:pl-gutter">
          <SectionHeader
            as="h1"
            size="display-xl"
            headline={landing.hero.headline}
            standfirst={landing.hero.subheadline}
            headlineClassName="text-navy"
            className="lg:max-w-[52rem]"
          />
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <Button asChild size="lg">
              <a href={landing.hero.primaryCta.href}>{landing.hero.primaryCta.label}</a>
            </Button>
            {/* Secondary route into the page. The label is the nav's own, so no new copy. */}
            <a
              href={landing.nav[0].href}
              className="group inline-flex items-center gap-2 text-body font-medium text-navy underline decoration-rule underline-offset-4 transition-colors hover:decoration-navy"
            >
              {landing.nav[0].label}
              <ArrowDown aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:translate-y-0.5" />
            </a>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section id="what-we-do" className="scroll-mt-20 border-b border-rule">
        <div className="mx-auto max-w-content px-6 py-section-mobile lg:py-section lg:pl-gutter">
          {/* The header lives inside the stack so the two pin together. */}
          <ServiceStack
            eyebrow={`${sectionNumber(1)} · ${landing.whatWeDo.eyebrow}`}
            headline={landing.whatWeDo.headline}
            intro={landing.whatWeDo.intro}
            groups={landing.whatWeDo.groups}
          />
        </div>
      </section>

      {/* Who we work with */}
      <section id="who-we-work-with" className="scroll-mt-20 border-b border-rule bg-paper-raised">
        <div className="mx-auto max-w-content px-6 py-section-mobile lg:py-section lg:pl-gutter">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
            <div>
              <SectionHeader
                eyebrow={`${sectionNumber(2)} · ${landing.whoWeWorkWith.eyebrow}`}
                headline={landing.whoWeWorkWith.headline}
                headlineClassName="text-navy"
                eyebrowClassName="text-[1.125rem]"
              />
              <div className="mt-10 max-w-measure space-y-6">
                {landing.whoWeWorkWith.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-body-l text-muted">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <WhoWeServe label="Physicians, specialists, dental care, pharmacies, laboratories, health spas, home and community care, and medical transport: people need to find, understand and trust every one of them" />
          </div>
        </div>
      </section>

      {/* How we work. A self-rotating carousel: one principle at a time, each with its visual. */}
      <section id="how-we-work" className="scroll-mt-20 border-b border-rule">
        <div className="mx-auto max-w-content px-6 py-section-mobile lg:py-section lg:pl-gutter">
          <SectionHeader
            eyebrow={`${sectionNumber(3)} · ${landing.howWeWork.eyebrow}`}
            headline={landing.howWeWork.headline}
            headlineClassName="text-navy"
            eyebrowClassName="text-[1.125rem]"
          />
          <div className="mt-12 lg:mt-14">
            <PrinciplesCarousel items={landing.howWeWork.principles} visuals={principleVisuals} />
          </div>
        </div>
      </section>

      {/* Careers */}
      <section id="careers" className="scroll-mt-20 border-b border-rule bg-paper-dark">
        <div className="mx-auto max-w-content px-6 py-section-mobile lg:py-section lg:pl-gutter">
          <CareersRoles
            header={
              <SectionHeader
                inverted
                eyebrow={`${sectionNumber(4)} · ${landing.careers.eyebrow}`}
                headline={landing.careers.headline}
                standfirst={landing.careers.intro}
                eyebrowClassName="text-[1.125rem]"
              />
            }
            roles={landing.careers.roles}
            facts={landing.careers.facts}
            email={landing.email}
            applicationsNote={landing.careers.applicationsNote}
          />
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-20">
        <div className="mx-auto max-w-content px-6 py-section-mobile lg:py-section lg:pl-gutter">
          <SectionHeader
            eyebrow={`${sectionNumber(5)} · ${landing.contact.eyebrow}`}
            headline={landing.contact.headline}
            headlineClassName="text-navy"
            eyebrowClassName="text-[1.125rem]"
            standfirst={landing.contact.body}
          />
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Button asChild size="lg">
              <a href={contactHref}>{landing.contact.cta.label}</a>
            </Button>
            <a
              href={contactHref}
              className="text-body font-medium underline decoration-rule underline-offset-4 hover:decoration-ink"
            >
              → {landing.email}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
