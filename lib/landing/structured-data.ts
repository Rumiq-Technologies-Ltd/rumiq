import { BASE_URL } from '@/lib/seo';
import { site } from '@/content/site';
import { landing } from '@/content/landing';

/*
 * TEMPORARY LANDING PAGE — structured data for the one-page site. Built here,
 * never inline in a component, so every claim in the JSON-LD is also on the page.
 */

/** Published when the roles were posted. Keep in step with the careers section. */
const JOB_POSTED = '2026-11-05';
/** The application deadline from the job postings: close of business, Pakistan time (UTC+5). */
const JOB_VALID_THROUGH = `${landing.careers.applicationsClose}T23:59:59+05:00`;

export function landingJsonLd() {
  const organisationId = `${BASE_URL}/#organisation`;
  const pageUrl = `${BASE_URL}/`;

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': organisationId,
      name: site.name,
      legalName: site.legalEntity,
      url: pageUrl,
      description: landing.meta.description,
      address: { '@type': 'PostalAddress', addressLocality: 'Dubai', addressRegion: 'DIFC', addressCountry: 'AE' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      name: site.name,
      url: pageUrl,
      publisher: { '@id': organisationId },
      inLanguage: 'en-US',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${pageUrl}#page`,
      name: landing.meta.title,
      description: landing.meta.description,
      url: pageUrl,
      isPartOf: { '@id': `${BASE_URL}/#website` },
      inLanguage: 'en-US',
    },
    ...landing.careers.roles.map((role) => ({
      '@context': 'https://schema.org',
      '@type': 'JobPosting',
      '@id': `${pageUrl}#${role.id}`,
      title: role.title,
      description: [role.summary, ...role.youllWorkOn.map((item) => `- ${item}`)].join('\n'),
      datePosted: JOB_POSTED,
      validThrough: JOB_VALID_THROUGH,
      employmentType: 'FULL_TIME',
      url: `${pageUrl}#careers`,
      hiringOrganization: { '@type': 'Organization', name: site.name, sameAs: pageUrl },
      jobLocation: {
        '@type': 'Place',
        address: { '@type': 'PostalAddress', addressLocality: 'Islamabad', addressCountry: 'PK' },
      },
    })),
  ];
}
