import type { MetadataRoute } from 'next';
import { NOINDEX } from '@/lib/flags';
import { BASE_URL } from '@/lib/seo';

/**
 * Section 13. While NOINDEX is true nothing is crawlable: an unfinished site
 * indexed six months early is a lasting problem, and robots.txt is the cheapest
 * of the three defences (the others being the meta robots tag and the
 * X-Robots-Tag header set in proxy.ts).
 */
export default function robots(): MetadataRoute.Robots {
  if (NOINDEX) {
    return {
      rules: [{ userAgent: '*', disallow: '/' }],
      host: BASE_URL,
    };
  }

  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/styleguide'] }],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
