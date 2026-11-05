import { getInsight } from '@/content/insights';
import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from '@/lib/og';

export const alt = 'Rumiq Insights';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** Per-article OG card, so a shared link shows the piece rather than the brand. */
export default async function InsightOgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = getInsight(slug);

  return ogImage({
    eyebrow: meta ? `Insights · ${meta.topic}` : 'Insights',
    title: meta?.title ?? 'Insights',
  });
}
