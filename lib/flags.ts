/**
 * Feature flags — Specification Section 12.
 *
 * EXACTLY THREE FLAGS. Do not add a fourth.
 *
 * SHOW_MODULE_STATUS  Section 0.2 — <StatusChip> is built but never rendered in
 *                     this phase. Any status shown publicly today would be wrong
 *                     by launch. Single-line change to turn on before launch.
 * SHOW_PRICING        Governs the pricing FAQ entries and which cost answer
 *                     variant renders. No pricing figure may render while false.
 * NOINDEX             Section 13 — the site is unreleased for roughly six months.
 *                     An unfinished site indexed early is a lasting SEO problem.
 */

export const SHOW_MODULE_STATUS = false;
export const SHOW_PRICING = false;
export const NOINDEX = true;

export const FLAGS = {
  SHOW_MODULE_STATUS,
  SHOW_PRICING,
  NOINDEX,
} as const;

export type FlagName = keyof typeof FLAGS;
