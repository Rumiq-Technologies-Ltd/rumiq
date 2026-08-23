import { faqFor, faqHeadings, type FaqPageId, type FaqRecord } from '@/content/faq';
import { cn } from '@/lib/utils';
import { FAQAccordion, type FaqEntry } from './faq-accordion';
import { SectionHeader } from './section-header';

/**
 * The FAQ section as it appears on Home, /platform, /trust, /approach, /contact
 * and all five solutions pages. One component, so placement is the only thing
 * that varies between them, and every entry comes from content/faq.ts.
 *
 * This file contains no FAQ copy and no answer text. It renders paragraphs.
 */

/** Document 05 uses inline emphasis in exactly one entry. Nothing else. */
function Paragraph({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);

  return (
    <p className="mt-4 first:mt-0">
      {parts.map((part, index) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={index} className="font-semibold text-ink">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
    </p>
  );
}

const toEntry = (record: FaqRecord): FaqEntry => ({
  id: record.id,
  question: record.question,
  answer: (
    <>
      {record.paragraphs.map((paragraph, index) => (
        <Paragraph key={index} text={paragraph} />
      ))}
    </>
  ),
});

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
  const records = faqFor(page);
  if (!records.length) return null;

  return (
    <section
      data-plane={plane}
      id="faq"
      className={cn('border-b border-rule', className)}
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-content px-6 py-section-mobile lg:py-section lg:pl-gutter">
        <SectionHeader eyebrow={eyebrow} headline={<span id="faq-heading">{headline}</span>} />
        <FAQAccordion className="mt-12" entries={records.map(toEntry)} />
      </div>
    </section>
  );
}
