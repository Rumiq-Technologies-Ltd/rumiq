import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from '@/lib/og';

export const alt = 'Rumiq — helping American healthcare providers get found, chosen and trusted';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/**
 * Root OG card. Inherited by every route that does not define its own, so it
 * carries the landing page's headline (content/landing).
 */
export default function OpengraphImage() {
  return ogImage({
    eyebrow: 'Digital marketing and tech for US healthcare',
    title: 'Helping American healthcare providers get found, chosen and trusted.',
  });
}
