/**
 * /demo copy.
 *
 * The three demo surfaces on one page, so a reader who arrived from a link to
 * one of them discovers the other two. Section 4.1: the illustrative-data
 * banner is the first thing on the page, in on-screen text, above every figure
 * it applies to.
 */

export const demoIndex = {
  hero: {
    eyebrow: 'THE PRODUCT SURFACE',
    headline: 'Three working surfaces. None of them is a screenshot.',
    subhead:
      'The Policy Sandbox, the Growth Intelligence dashboard and the call review interface all run in your browser. Every figure in all three is synthetic, and the numbers are chosen to be plausible rather than flattering.',
    primary: { label: 'Book a working session', href: '/contact' },
    secondary: { label: 'See the platform', href: '/platform' },
  },

  banner: {
    label: 'Illustrative data',
    headline: 'Everything on this page is synthetic.',
    body: 'No connector, client system, patient record or real call is involved anywhere on this page. Figures, transcripts, call outcomes and capacity numbers were written for the demo. They show how the surfaces behave, not how any customer performs.',
    note: 'The transport dataset is deliberately generic: that pilot’s architecture work has not started, so it makes no claim about how a real operation is structured.',
  },

  nav: {
    label: 'On this page',
    items: [
      { id: 'policy-sandbox', label: 'Policy Sandbox' },
      { id: 'dashboard', label: 'Growth Intelligence dashboard' },
      { id: 'call-review', label: 'Call review' },
    ],
  },

  sections: {
    sandbox: {
      eyebrow: 'ONE · THE BOUNDARY',
      headline: 'Pick a page type and a destination. Watch what leaves.',
      standfirst:
        'The decision is made before anything is sent, and the reason is stated in the same breath as the outcome. Allowed, redacted or blocked, with the policy that decided it.',
      link: { label: 'Open the Policy Sandbox on its own page', href: '/demo/policy-sandbox' },
    },
    dashboard: {
      eyebrow: 'TWO · THE MEASUREMENT',
      headline: 'The same dashboard over two operations that share nothing.',
      standfirst:
        'Switch the provider type and every label, dimension and figure changes, because they come from the sector config rather than from the component. The filters filter the data, not the caption.',
      link: { label: 'Open the dashboard on its own page', href: '/demo/dashboard' },
    },
    calls: {
      eyebrow: 'THREE · THE BIGGEST LEAK',
      headline: 'Every call gets a reason, a confidence score and a human who can overrule it.',
      standfirst:
        'Low-confidence classifications are flagged rather than quietly counted, because a confident wrong label is worse than an admitted gap.',
      link: { label: 'Open call review on its own page', href: '/demo/call-intelligence' },
    },
  },
} as const;
