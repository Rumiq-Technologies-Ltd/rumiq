import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CTABand, Hero, PolicyCallout, TrustTable } from '@/components/rumiq';
import { regions } from '@/content/trust';

/* Section 8.9 — the two region pages, from one template. */

type Params = { params: Promise<{ region: string }> };

export function generateStaticParams() {
  return Object.keys(regions).map((region) => ({ region }));
}

function find(slug: string) {
  return (regions as Record<string, (typeof regions)[keyof typeof regions] | undefined>)[slug];
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { region: slug } = await params;
  const region = find(slug);
  if (!region) return { title: 'Not found' };
  return { title: region.hero.headline, description: region.hero.subhead };
}

export default async function RegionPage({ params }: Params) {
  const { region: slug } = await params;
  const region = find(slug);
  if (!region) notFound();

  const whatsapp = 'whatsapp' in region ? region.whatsapp : null;

  return (
    <main id="main">
      <Hero
        eyebrow={region.hero.eyebrow}
        headline={region.hero.headline}
        subhead={region.hero.subhead}
        primary={{ label: 'Book a technical review', href: '/contact' }}
        secondary={{ label: 'Trust Center', href: '/trust' }}
        assurances={region.hero.assurances}
      />

      {region.sections.map((section) => (
        <TrustTable
          key={section.eyebrow}
          eyebrow={section.eyebrow}
          headline={section.headline}
          rows={section.rows}
          columns={['Requirement', 'How it is treated']}
        />
      ))}

      {/* Gulf only — WhatsApp as a primary patient channel. */}
      {whatsapp ? (
        <TrustTable
          eyebrow={whatsapp.eyebrow}
          headline={whatsapp.headline}
          body={whatsapp.body}
          rows={whatsapp.rows}
          columns={['Concern', 'How it is handled']}
          plane="protected"
        />
      ) : null}

      {/* Both region pages say this explicitly (Sections 4.2, 8.9). */}
      <PolicyCallout eyebrow="VALIDATE WITH LOCAL COUNSEL" body={region.counsel} />

      <CTABand />
    </main>
  );
}
