import type { MetadataRoute } from 'next';
import { footerColumns, solutionsMenu } from '@/content/navigation';
import { insights } from '@/content/insights';
import { BASE_URL } from '@/lib/seo';

/**
 * Section 13 — sitemap.
 *
 * Derived from the navigation and the insights registry rather than hand-listed,
 * so a page that exists but is unlinked is a visible bug rather than a silent
 * omission. /styleguide is excluded on purpose: it is an internal reference.
 */

const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '/', priority: 1, changeFrequency: 'monthly' },
  { path: '/platform', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/solutions', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/trust', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/approach', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.8, changeFrequency: 'yearly' },
  { path: '/scorecard', priority: 0.8, changeFrequency: 'yearly' },
  { path: '/demo', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/demo/policy-sandbox', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/demo/dashboard', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/demo/call-intelligence', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/insights', priority: 0.6, changeFrequency: 'weekly' },
  { path: '/regions/united-states', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/regions/gulf', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/cookies', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const platformPages = (footerColumns.find((column) => column.title === 'Platform')?.links ?? []).map(
    (link) => ({ url: `${BASE_URL}${link.href}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 }),
  );

  const solutionPages = solutionsMenu.map((link) => ({
    url: `${BASE_URL}${link.href}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const insightPages = insights.map((entry) => ({
    url: `${BASE_URL}/insights/${entry.slug}`,
    lastModified: new Date(entry.updated ?? entry.published),
    changeFrequency: 'yearly' as const,
    priority: 0.5,
  }));

  return [
    ...staticRoutes.map((route) => ({
      url: `${BASE_URL}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...platformPages,
    ...solutionPages,
    ...insightPages,
  ];
}
