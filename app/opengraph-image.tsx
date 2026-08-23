import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from '@/lib/og';

export const alt = 'Rumiq — a governed view of healthcare growth';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** Root OG card. Inherited by every route that does not define its own. */
export default function OpengraphImage() {
  return ogImage({
    eyebrow: 'Healthcare growth, governed',
    title: 'Know which marketing actually produces patients.',
  });
}
