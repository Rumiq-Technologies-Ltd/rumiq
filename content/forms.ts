import type { FormFieldConfig } from '@/lib/forms/schemas';

/**
 * Section 11 / Section 12 — all three forms, field by field, in copy.
 * No label, hint or success line is authored inside a component.
 */

export const formCommon = {
  /** Off-screen honeypot. Labelled for the DOM, hidden from everyone. */
  honeypotLabel: 'Leave this field empty',
  errorSummaryTitle: 'Fix these before sending',
  submitting: 'Sending…',
  serverError:
    'That did not send. Nothing was lost — try again, and if it fails twice something is wrong at our end.',
  tooFast: 'That submission arrived faster than a person can type. Try again.',
  expired: 'This form has been open a while. Reload the page and send it again.',
} as const;

export const workingSessionForm = {
  eyebrow: 'WORKING SESSION',
  headline: 'Tell us what you are trying to find out.',
  standfirst:
    'The more specific this is, the more useful the session is. If you already know which number you cannot produce, say which one.',
  submit: 'Request a working session',
  success: {
    eyebrow: 'SENT',
    headline: 'That is with us.',
    body: 'We reply to every request, usually within two working days, from a person rather than a sequence. If your operation is not a fit for the current phase we will say so plainly instead of scheduling a call to tell you.',
  },
  fields: [
    { name: 'name', label: 'Your name', type: 'text', autoComplete: 'name' },
    {
      name: 'email',
      label: 'Work email',
      type: 'email',
      autoComplete: 'email',
      hint: 'Used to reply to this request. Nothing else.',
    },
    { name: 'organisation', label: 'Practice, group or operator', type: 'text', autoComplete: 'organization' },
    {
      name: 'role',
      label: 'Your role',
      type: 'select',
      options: [
        { value: '', label: 'Choose one' },
        { value: 'owner', label: 'Owner, principal or managing partner' },
        { value: 'marketing', label: 'Marketing lead or director' },
        { value: 'operations', label: 'Operations or practice management' },
        { value: 'compliance', label: 'Compliance, privacy or legal' },
        { value: 'it', label: 'IT or data' },
        { value: 'other', label: 'Something else' },
      ],
    },
    {
      name: 'region',
      label: 'Where the operation is based',
      type: 'select',
      options: [
        { value: '', label: 'Choose one' },
        { value: 'us', label: 'United States' },
        { value: 'gulf', label: 'Gulf' },
        { value: 'other', label: 'Elsewhere' },
      ],
      hint: 'Region decides which obligations the session has to work inside.',
    },
    {
      name: 'systems',
      label: 'Systems you run on',
      type: 'text',
      optional: true,
      placeholder: 'Practice management, dispatch, CRM, call handling',
      hint: 'Optional. Helpful, not required — we do not need credentials or access to anything.',
    },
    {
      name: 'message',
      label: 'What are you trying to find out?',
      type: 'textarea',
      rows: 6,
      hint: 'For example: which locations are worth more spend, or why the phone number of missed calls does not exist.',
    },
    {
      name: 'consent',
      label: 'Reply to me about this request. I understand this is not a subscription and I can ask for the details to be deleted at any time.',
      type: 'checkbox',
    },
  ] satisfies FormFieldConfig[],
  privacyNote:
    'This form posts to our own server. No advertising or analytics platform receives it, and no third-party script runs on this page. Do not include patient information in the message.',
} as const;

export const insightsForm = {
  eyebrow: 'NEW WRITING',
  headline: 'Get new pieces when they are published.',
  standfirst:
    'Infrequent, and only when there is something worth reading. No drip sequence, no re-engagement campaign.',
  submit: 'Send me new pieces',
  success: {
    eyebrow: 'CONFIRMED',
    headline: 'You are on the list.',
    body: 'One address, held for this purpose only. Every message carries a one-click unsubscribe, and unsubscribing removes the address rather than pausing it.',
  },
  fields: [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      autoComplete: 'email',
      placeholder: 'name@practice.com',
    },
    {
      name: 'consent',
      label: 'Send me new pieces at this address. I can unsubscribe at any time.',
      type: 'checkbox',
    },
  ] satisfies FormFieldConfig[],
  privacyNote:
    'Held on our own infrastructure. Not shared, not sold, not uploaded to an advertising platform as an audience.',
} as const;
