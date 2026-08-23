import type { FaqEntry } from '@/components/rumiq/faq-accordion';
import { SHOW_PRICING } from '@/lib/flags';

/**
 * FAQ content — Document 05.
 *
 * RULES (Section 15):
 *  • Every entry in `faqEntries` is Document 05 text, verbatim. No entry may
 *    exist here that is not in Document 05, and none may be rewritten,
 *    shortened or expanded.
 *  • Placement is the Document 05 placement map, nothing else.
 *  • Entries tagged `pricing: true` render only while SHOW_PRICING is true.
 *    It is false, so no pricing answer reaches a page.
 *
 * Document 05 has not been supplied yet, so `faqEntries` is empty and every
 * accordion renders nothing. That is the correct behaviour: placeholder FAQ
 * copy would be indistinguishable from approved copy three weeks from now.
 */

export type FaqRecord = FaqEntry & {
  /** Plain-text form of the answer, for the FAQPage structured data. */
  plainAnswer: string;
  /** Gated behind SHOW_PRICING. */
  pricing?: boolean;
};

export type FaqPageId =
  | 'home'
  | 'platform'
  | 'trust'
  | 'approach'
  | 'contact'
  | 'solutions/independent'
  | 'solutions/dental'
  | 'solutions/multi-site'
  | 'solutions/transport'
  | 'solutions/health-systems';

/** Keyed by the Document 05 entry id. */
export const faqEntries: Record<string, FaqRecord> = {};

/** The Document 05 placement map. Order within each array is render order. */
export const faqPlacement: Record<FaqPageId, readonly string[]> = {
  home: [],
  platform: [],
  trust: [],
  approach: [],
  contact: [],
  'solutions/independent': [],
  'solutions/dental': [],
  'solutions/multi-site': [],
  'solutions/transport': [],
  'solutions/health-systems': [],
};

/**
 * The entries for one page, in placement order, with pricing entries dropped
 * while the flag is off. Unknown ids are skipped rather than throwing, so a
 * placement map edited ahead of the entries it references cannot break a build.
 */
export function faqFor(page: FaqPageId): FaqRecord[] {
  return (faqPlacement[page] ?? [])
    .map((id) => faqEntries[id])
    .filter((entry): entry is FaqRecord => Boolean(entry))
    .filter((entry) => (entry.pricing ? SHOW_PRICING : true));
}

/** Build note, not FAQ copy. Removed once Document 05 lands. */
export const faqAwaiting =
  'FAQ copy comes from Document 05 verbatim, placed by its placement map. Not yet supplied, so nothing renders here.';

export const faqHeadings = {
  eyebrow: 'QUESTIONS',
  headline: 'The questions buyers actually ask.',
} as const;
