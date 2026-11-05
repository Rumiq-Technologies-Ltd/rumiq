import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from '@/lib/og';
import { landing } from '@/content/landing';

export const alt = `Rumiq — ${landing.hero.headline}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/**
 * Root OG card. Inherited by every route that does not define its own. Both
 * lines come from content/landing so the card matches the page: the meta title
 * as the eyebrow, the hero headline as the title.
 */
export default function OpengraphImage() {
  return ogImage({
    eyebrow: landing.meta.title,
    title: landing.hero.headline,
  });
}
