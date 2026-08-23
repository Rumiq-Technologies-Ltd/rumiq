import { faqAwaiting, faqFor, type FaqPageId } from '@/content/faq';
import { faqHeadings } from '@/content/faq';
import { cn } from '@/lib/utils';
import { Eyebrow } from './eyebrow';
import { FAQAccordion } from './faq-accordion';
import { SectionHeader } from './section-header';

/**
 * The FAQ section as it appears on Home, /platform, /trust, /approach, /contact
 * and all five solutions pages. One component, so placement is the only thing
 * that varies between them.
 *
 * While Document 05 is outstanding this renders the build note and no entries
 * (Section 15). It never invents a question.
 */
export function FaqSection({
  page,
  eyebrow = faqHeadings.eyebrow,
  headline = faqHeadings.headline,
  plane = 'boundary',
  className,
}: {
  page: FaqPageId;
  eyebrow?: string;
  headline?: string;
  plane?: 'public' | 'boundary' | 'protected';
  className?: string;
}) {
  const entries = faqFor(page);

  return (
    <section
      data-plane={plane}
      id="faq"
      className={cn('border-b border-rule', className)}
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-content px-6 py-section-mobile lg:py-section lg:pl-gutter">
        <SectionHeader eyebrow={eyebrow} headline={<span id="faq-heading">{headline}</span>} />
        {entries.length ? (
          <FAQAccordion className="mt-12" entries={entries} />
        ) : (
          <div className="mt-12 rounded-card border border-dashed border-rule p-6">
            <Eyebrow>Awaiting Document 05</Eyebrow>
            <p className="mt-4 max-w-measure text-caption text-muted">{faqAwaiting}</p>
          </div>
        )}
      </div>
    </section>
  );
}
