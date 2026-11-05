import { SectionHeader } from '@/components/rumiq';

type LegalSection = { heading: string; paragraphs: readonly string[] };

/*
 * TEMPORARY LANDING PAGE — shared layout for the Privacy and Terms notices.
 * One short introduction, then the sections. No draft or review banners: these
 * are the published notices until the full documents replace them.
 */
export function LandingLegalPage({
  eyebrow,
  headline,
  intro,
  sections,
}: {
  eyebrow: string;
  headline: string;
  intro: string;
  sections: readonly LegalSection[];
}) {
  return (
    <main id="main" className="scroll-mt-20">
      <section className="border-b border-rule">
        <div className="mx-auto max-w-content px-6 py-section-mobile lg:py-section lg:pl-gutter">
          <SectionHeader as="h1" size="display-l" eyebrow={eyebrow} headline={headline} />
          <p className="mt-8 max-w-measure text-body-l text-muted">{intro}</p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-content px-6 py-section-mobile lg:py-section lg:pl-gutter">
          <div className="max-w-measure space-y-12">
            {sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-h3 font-semibold">{section.heading}</h2>
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-body text-muted">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
