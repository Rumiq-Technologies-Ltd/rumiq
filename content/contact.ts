/**
 * /contact copy — Specification Section 8.15.
 *
 * It is a working session, not a demo. A demo is a performance with a
 * predetermined ending; a working session ends with something written down that
 * is true about the reader's operation. The page never uses the word demo for
 * this, and the CTA never says "book a demo" anywhere on the site.
 *
 * Section 7.3: the shared CTA band does not appear on this page.
 */

export const contact = {
  hero: {
    eyebrow: 'BOOK A WORKING SESSION',
    headline: 'Ninety minutes on your numbers. No slides.',
    subhead:
      'We work through how patients currently reach you, which figures you can already produce, and which of them you do not trust. You leave with the three measurement gaps costing you the most, in writing — including the case where the honest answer is that Rumiq is the wrong tool.',
  },

  agenda: {
    eyebrow: 'WHAT ACTUALLY HAPPENS',
    headline: 'Four things, in this order.',
    steps: [
      {
        label: 'How demand reaches you today',
        body: 'Channels, referral relationships, the phone, forms, walk-ins. What each one produces, and how you know.',
      },
      {
        label: 'Which numbers you can produce, and which you trust',
        body: 'Usually a short list and a shorter one. The gap between them is the interesting part.',
      },
      {
        label: 'Where the leak is worth money',
        body: 'Unanswered calls, unrecorded reasons, spend against locations that are already full. Ranked by what it plausibly costs you.',
      },
      {
        label: 'What the first phase would be, if anything',
        body: 'Scope, order and the exit point. Or a straight answer that this is not a Rumiq problem.',
      },
    ],
  },

  who: {
    eyebrow: 'WHO SHOULD BE THERE',
    headline: 'Two people is usually enough.',
    points: [
      'The person who owns the growth number — owner, principal, managing partner or marketing lead.',
      'Someone who actually handles enquiries. The front desk knows things the reporting does not.',
      'Compliance or IT if you already know the boundary is the blocker. Bring them and we will spend the time there instead.',
    ],
  },

  expect: {
    eyebrow: 'WHAT YOU GET, AND WHAT WE DO NOT DO',
    headline: 'A written summary either way.',
    gets: [
      'A one-page summary of the three gaps costing you the most, sent afterwards.',
      'The instrumentation order we would use, and what it would ask of your team.',
      'A clear no, with the reason, if your operation is not a fit for the current phase.',
    ],
    nots: [
      'No credentials, no system access and no data are needed for the session.',
      'Do not bring patient information. Nothing on this page or in the form should contain any.',
      'No sequence, no drip campaign and no re-marketing. The address you give is used to reply to this request.',
    ],
  },

  other: {
    eyebrow: 'OTHER ROUTES',
    headline: 'If this is not a growth conversation.',
    items: [
      {
        title: 'Security, privacy and vendor review',
        body: 'The architecture, hosting, subprocessor position and the regional obligations we design against are documented in the Trust Center. If your review needs something that is not there, ask for it in the form and say which framework you are working from.',
        link: { label: 'Trust Center', href: '/trust' },
      },
      {
        title: 'Data protection requests',
        body: 'Requests relating to personal data held by Rumiq itself are handled through the routes described in the privacy notice. That notice is awaiting legal review, so use the form in the meantime and mark it as a data protection request.',
        link: { label: 'Privacy notice', href: '/privacy' },
      },
      {
        title: 'Not ready to talk to anyone',
        body: 'Ten questions about how patients currently reach you, answered in about four minutes, and a ranked list of where you are losing the most. It is a self-assessment: nothing scans, crawls or inspects anything.',
        link: { label: 'Growth Leak Scorecard', href: '/scorecard' },
      },
    ],
  },
} as const;
