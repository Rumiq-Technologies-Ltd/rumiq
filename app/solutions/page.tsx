import Link from 'next/link';
import { CTABand, Card, SectionHeader } from '@/components/rumiq';
import { sectors } from '@/lib/sectors';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Solutions',
  description:
    'One governed layer across very different operations, from an independent single-site provider to a health system.',
  path: '/solutions',
});

export default function SolutionsIndexPage() {
  return (
    <main id="main">
      <section data-plane="public" className="border-b border-rule">
        <div className="mx-auto max-w-content px-6 py-section-mobile lg:py-section lg:pl-gutter">
          <SectionHeader
            as="h1"
            size="display-l"
            eyebrow="WHO IT IS FOR"
            headline="One governed layer. Very different operations."
            standfirst="Each page is written for its own reader, in that reader's language. The independent provider is not a smaller version of the health system, and is not treated as one."
          />
          <ul className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {sectors.map((sector) => (
              <Card as="li" key={sector.id} interactive className="p-6">
                <Link href={sector.href} className="block">
                  <p className="font-mono text-mono-eyebrow uppercase text-muted">
                    {sector.hero.eyebrow}
                  </p>
                  <h2 className="mt-4 text-h3 font-semibold">{sector.hero.headline}</h2>
                  <p className="mt-3 text-caption text-muted">{sector.hero.sharpestProblem}</p>
                </Link>
              </Card>
            ))}
          </ul>
        </div>
      </section>
      <CTABand />
    </main>
  );
}
