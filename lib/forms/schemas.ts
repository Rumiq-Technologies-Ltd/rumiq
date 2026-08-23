import { z } from 'zod';

/**
 * Section 11 — form handling.
 *
 * One schema per form, defined once and imported by both the client component
 * and the route handler, so the browser and the server can never disagree about
 * what is valid or about the wording of an error.
 *
 * Spam controls are a honeypot plus a timing check. No CAPTCHA: a CAPTCHA is a
 * third-party request on a page that promises none (Section 4.3), and it taxes
 * exactly the users least able to pay it.
 */

/** Rendered off-screen, never visible, never announced. A real person leaves
 *  it empty; most bots fill every field they find. */
export const HONEYPOT_FIELD = 'organisation_website';

/** Nobody reads a form and completes it honestly in under two seconds. */
export const MIN_FILL_MS = 2_000;
/** A page left open overnight is a stale token, not a submission. */
export const MAX_FILL_MS = 12 * 60 * 60 * 1_000;

export const antiSpamSchema = z.object({
  [HONEYPOT_FIELD]: z
    .string()
    .max(0, 'This field must be left empty.')
    .optional()
    .default(''),
  startedAt: z.number().int().positive(),
});

const emailField = z
  .string()
  .trim()
  .min(1, 'Enter the email address we should reply to.')
  .email('That does not look like an email address. Check for a missing @ or a typo in the domain.');

const consentField = z.literal(true, {
  errorMap: () => ({ message: 'Tick the box so we know you want a reply.' }),
});

/* -------------------------------------------------------------------------- */
/* Form 1 — working session request (/contact)                                */
/* -------------------------------------------------------------------------- */

export const workingSessionSchema = z.object({
  name: z.string().trim().min(2, 'Enter your name, so we know who we are speaking to.'),
  email: emailField,
  organisation: z
    .string()
    .trim()
    .min(2, 'Enter the practice, group or operator name.'),
  role: z.string().trim().min(1, 'Choose the closest description of your role.'),
  region: z.string().trim().min(1, 'Choose where the operation is based.'),
  systems: z.string().trim().max(200, 'Keep this under 200 characters.').optional().default(''),
  message: z
    .string()
    .trim()
    .min(20, 'Give us at least a sentence or two on what you are trying to find out. Twenty characters minimum.')
    .max(2_000, 'Keep this under 2,000 characters.'),
  consent: consentField,
});

/* -------------------------------------------------------------------------- */
/* Form 2 — insights subscription (/insights)                                 */
/* -------------------------------------------------------------------------- */

export const insightsSchema = z.object({
  email: emailField,
  consent: consentField,
});

/* -------------------------------------------------------------------------- */
/* Form 3 — scorecard email gate (/scorecard)                                 */
/* -------------------------------------------------------------------------- */

export const scorecardSchema = z.object({
  email: emailField,
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Tick the box so we can send the scorecard to that address.' }),
  }),
});

/** Answers travel with the gate submission so the result can be produced.
 *  Ten questions, four options each, scored nought to three. */
export const scorecardAnswersSchema = z.object({
  answers: z.array(z.number().int().min(0).max(3)).length(10, 'Answer all ten questions first.'),
});

/* -------------------------------------------------------------------------- */

export const formSchemas = {
  'working-session': workingSessionSchema,
  insights: insightsSchema,
  scorecard: scorecardSchema,
} as const;

export type FormId = keyof typeof formSchemas;

export const isFormId = (value: string): value is FormId =>
  Object.prototype.hasOwnProperty.call(formSchemas, value);

/** The server validates the user fields plus the anti-spam envelope. */
export const serverSchemas = {
  'working-session': workingSessionSchema.merge(antiSpamSchema),
  insights: insightsSchema.merge(antiSpamSchema),
  scorecard: scorecardSchema.merge(antiSpamSchema).merge(scorecardAnswersSchema),
} as const;

/* -------------------------------------------------------------------------- */
/* Field configuration. Shape only — every string lives in content/forms.ts.  */
/* -------------------------------------------------------------------------- */

export type FormFieldConfig = {
  name: string;
  label: string;
  type: 'text' | 'email' | 'select' | 'textarea' | 'checkbox';
  /** Helper text under the label. Rendered, not a tooltip. */
  hint?: string;
  placeholder?: string;
  options?: readonly { value: string; label: string }[];
  autoComplete?: string;
  optional?: boolean;
  rows?: number;
};

export type FormValues = Record<string, string | boolean>;

/** Turns a ZodError into a field → message map for inline display. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? '_form');
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
