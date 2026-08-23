import type { ComponentType } from 'react';

/**
 * /insights registry — Section 8.13.
 *
 * Article bodies are MDX files in this directory. Metadata lives here rather
 * than in frontmatter so it is typed, so the index, the slug route, the sitemap
 * and the structured data all read the same source, and so a mistyped date is a
 * build error instead of a wrong <time> element.
 *
 * The loader map is explicit rather than a template-literal dynamic import:
 * bundlers resolve an explicit map reliably, and an article that exists as a
 * file but is not registered here will not silently ship.
 *
 * Section 4.1 applies to every word in these pieces. No client is named, no
 * outcome figure is attributed to a real operation, and no number is presented
 * as measured unless it is cited to a public source.
 */

export type InsightMeta = {
  slug: string;
  title: string;
  /** Meta description and index standfirst. One sentence, no hedging. */
  description: string;
  /** ISO date. */
  published: string;
  updated?: string;
  /** Which plane the piece sits in, so the index is legible at a glance. */
  plane: 'public' | 'boundary' | 'protected';
  topic: string;
  readingMinutes: number;
  /** Who the piece is written for (Section 2). */
  reader: string;
};

export const insights: InsightMeta[] = [
  {
    slug: 'cost-per-lead-is-the-wrong-denominator',
    title: 'Cost per lead is the wrong denominator',
    description:
      'Cheap leads look like good leads right up to the point where somebody checks who arrived. Changing the denominator changes where the budget goes.',
    published: '2025-05-12',
    plane: 'protected',
    topic: 'Measurement',
    readingMinutes: 6,
    reader: 'Owners, principals and marketing leads',
  },
  {
    slug: 'classify-the-page-before-the-tag-fires',
    title: 'Classify the page before the tag fires',
    description:
      'Most healthcare tracking incidents are not decisions. They are defaults. The fix is a classification step that runs at publication, not a review that runs after launch.',
    published: '2025-05-26',
    plane: 'boundary',
    topic: 'Privacy engineering',
    readingMinutes: 7,
    reader: 'Compliance, privacy and IT',
  },
  {
    slug: 'the-unattributable-share',
    title: 'The unattributable share is a number, not a rounding error',
    description:
      'Every attribution model quietly redistributes the demand it cannot explain. Showing that share as its own line changes which decisions you are willing to make.',
    published: '2025-06-09',
    plane: 'public',
    topic: 'Attribution',
    readingMinutes: 5,
    reader: 'Marketing directors and analysts',
  },
];

/** slug → MDX module loader. */
export const insightBodies: Record<string, () => Promise<{ default: ComponentType }>> = {
  'cost-per-lead-is-the-wrong-denominator': () =>
    import('./cost-per-lead-is-the-wrong-denominator.mdx'),
  'classify-the-page-before-the-tag-fires': () =>
    import('./classify-the-page-before-the-tag-fires.mdx'),
  'the-unattributable-share': () => import('./the-unattributable-share.mdx'),
};

export function getInsight(slug: string): InsightMeta | undefined {
  return insights.find((entry) => entry.slug === slug);
}

/** Newest first. The index and the sitemap both use this order. */
export function insightsByDate(): InsightMeta[] {
  return [...insights].sort((a, b) => (a.published < b.published ? 1 : -1));
}

export const insightsIndexCopy = {
  eyebrow: 'INSIGHTS',
  headline: 'Writing about the measurement problem, not the marketing of it.',
  subhead:
    'Pieces on where healthcare growth data breaks, why the standard fixes make it worse, and what to instrument first. Written for people who have to defend the number, not people who have to sell it.',
  listLabel: 'All pieces, newest first',
  emptyState: 'Nothing published yet.',
  metaLabels: { reader: 'Written for', reading: 'min read' },
  disclaimer:
    'These pieces are editorial. They are not legal, regulatory or clinical advice, and they describe no real customer.',
} as const;
