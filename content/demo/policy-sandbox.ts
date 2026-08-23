/**
 * Copy for the Policy Sandbox. Section 12: page copy lives in content files.
 */

export const policySandboxCopy = {
  eyebrow: 'DEMO · POLICY SANDBOX',
  headline: 'Pick a page and a destination. Watch what leaves.',
  standfirst:
    'Every event is classified before it routes anywhere. This is the same decision the gateway makes in production, running on synthetic data. Change any control and the ledger records what was decided and why.',
  illustrativeNote:
    'Every value below is synthetic. No real payload, patient record or client system is involved.',
  controls: {
    pageType: 'Page type',
    destination: 'Destination',
    consent: 'Consent state',
  },
  payloadHeading: 'Event payload',
  payloadStandfirst: 'Eleven fields. Each one resolves to allowed, redacted or blocked.',
  ledgerHeading: 'Disclosure ledger',
  ledgerStandfirst:
    'One line per decision, appended on every change. In production this is the record your privacy office audits.',
  legend: {
    allowed: 'Passes through with its value',
    redacted: 'Leaves with the value replaced',
    blocked: 'Never leaves',
    absent: 'Not collected on this page',
  },
  columns: {
    field: 'Field',
    state: 'Decision',
    value: 'What leaves',
    why: 'Why',
  },
  idleNotice: 'Cycling three preset scenarios. Change any control to take over.',
  takenOver: 'Preset cycle stopped. You are driving.',
  theHardLine:
    'Internal attribution does not imply permission to transmit. What you are allowed to know is not the same as what you are allowed to send.',
  internalNote:
    'The internal warehouse is Rumiq’s own first-party store, so consent state does not gate it. Writing to your own governed warehouse is not a disclosure. Sending to Google or Meta is.',
  moreLink: { label: 'How the gateway works', href: '/platform/privacy-gateway' },
} as const;
