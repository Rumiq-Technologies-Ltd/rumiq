/**
 * Site-wide copy. Section 12: all page copy lives in content files, never
 * inside a component, because it will be revised repeatedly over the next six
 * months without touching the build.
 */

export const site = {
  name: 'Rumiq',
  legalEntity: 'Rumiq Technologies Ltd',
  registeredIn: 'DIFC, Dubai',
  wordmark: 'rumiq',
} as const;

/** Section 4.2 — appears in the footer on every page. */
export const legalDisclaimer =
  'Nothing on this site is legal, regulatory or clinical advice. Regulatory obligations vary by jurisdiction and should be validated with counsel.';

/** Section 7.3 — verbatim. Once at the bottom of every page except /contact. */
export const ctaBand = {
  eyebrow: 'NEXT STEP',
  headline: 'See where your growth is leaking.',
  body: "Answer ten questions about how patients currently reach you. You'll get a one-page scorecard ranking where you're losing the most, with the specific fixes in order.",
  primary: { label: 'Get the scorecard', href: '/scorecard' },
  secondary: { label: 'Book a working session', href: '/contact' },
} as const;

/** Section 7.4 */
export const consentCopy = {
  title: 'Your choice about cookies',
  body: 'We load nothing non-essential until you decide. Necessary cookies keep the site working and cannot be switched off. Analytics and marketing stay off unless you turn them on.',
  note: 'This build loads no analytics or marketing scripts at all. Your choice is recorded in a first-party cookie and you can change it at any time from the footer.',
  acceptAll: 'Accept all',
  rejectAll: 'Reject all',
  manage: 'Manage preferences',
  save: 'Save choices',
  reopen: 'Cookie preferences',
  categories: [
    {
      id: 'necessary' as const,
      name: 'Necessary',
      description:
        'Required for the site to function: your consent choice, and security. No third party receives this.',
      locked: true,
    },
    {
      id: 'analytics' as const,
      name: 'Analytics',
      description:
        'Aggregate measurement of which pages are read. Off by default. Nothing is loaded while this is off.',
      locked: false,
    },
    {
      id: 'marketing' as const,
      name: 'Marketing',
      description:
        'Advertising and campaign measurement. Off by default. Nothing is loaded while this is off.',
      locked: false,
    },
  ],
} as const;
