import type { MetadataRoute } from 'next';
import { NOINDEX } from '@/lib/flags';
import { BASE_URL } from '@/lib/seo';
import { DEV_PREVIEW, PUBLIC_DEPLOY } from '@/lib/site-mode';

/**
 * Section 13. While NOINDEX is true nothing is crawlable. Outside `npm run dev`
 * only the landing page exists, so the sitemap lists that alone (see sitemap.ts).
 */
export default function robots(): MetadataRoute.Robots {
  if (NOINDEX || !PUBLIC_DEPLOY) {
    return {
      rules: [{ userAgent: '*', disallow: '/' }],
      host: BASE_URL,
    };
  }

  return {
    rules: [{ userAgent: '*', allow: '/', disallow: DEV_PREVIEW ? ['/api/', '/styleguide'] : ['/api/'] }],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
