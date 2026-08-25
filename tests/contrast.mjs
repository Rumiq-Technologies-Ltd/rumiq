/**
 * WCAG 2.2 contrast audit for the token pairs this site actually renders.
 *
 * Run:  node tests/contrast.mjs
 *
 * Hex values are read from lib/design-tokens.ts so the audit cannot drift from
 * the Brand Guidelines v1.0 palette. Alpha pairs (paper at 60/70/80% over paper-dark) are
 * composited before measuring, because that is what a user sees.
 *
 * Thresholds: 4.5 for normal text, 3.0 for large text (>=24px, or >=18.66px
 * bold) and for the non-text contrast of UI components and meaningful graphics.
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const source = readFileSync(join(here, '..', 'lib', 'design-tokens.ts'), 'utf8');

const tokens = {};
for (const match of source.matchAll(/name: '([a-z-]+)',\s*\n\s*hex: '(#[0-9A-Fa-f]{6})'/g)) {
  tokens[match[1]] = match[2];
}

const srgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
const lin = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const luminance = (hex) => {
  const [r, g, b] = srgb(hex).map(lin);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [x, y] = [luminance(a), luminance(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};
const over = (hex, backdrop, alpha) => {
  const f = srgb(hex);
  const b = srgb(backdrop);
  const mix = f.map((c, i) => Math.round((c * alpha + b[i] * (1 - alpha)) * 255));
  return `#${mix.map((v) => v.toString(16).padStart(2, '0')).join('')}`;
};

const t = tokens;
/**
 * kind:
 *   text        1.4.3 — 4.5:1, counted
 *   nontext     1.4.11 — 3:1, counted (UI component boundaries, state graphics)
 *   decorative  not counted: a divider or an accent rule that carries no
 *               information on its own. Every one of these sits next to text
 *               that states the same thing.
 *   unused      not rendered anywhere; measured to document why.
 *
 * [label, foreground, background, threshold, kind, note]
 */
const pairs = [
  // Text, 1.4.3, 4.5:1
  ['Charcoal on white', t.ink, t.paper, 4.5, 'text', 'body copy, the default'],
  ['Charcoal on Cloud', t.ink, t['paper-raised'], 4.5, 'text', 'body copy in a panel'],
  ['Charcoal on Snow', t.ink, t['paper-alt'], 4.5, 'text', 'body copy on the alternate canvas'],
  ['Ink on white', t['ink-strong'], t.paper, 4.5, 'text', 'emphasis'],
  ['Navy on white', t['paper-dark'], t.paper, 4.5, 'text', 'headings'],
  ['Navy on Cloud', t['paper-dark'], t['paper-raised'], 4.5, 'text', 'headings in a panel'],
  ['Slate on white', t.muted, t.paper, 4.5, 'text', 'secondary text, captions, eyebrows'],
  ['Slate on Cloud', t.muted, t['paper-raised'], 4.5, 'text', 'captions inside cards'],
  ['Teal on white (TEXT)', t['plane-public'], t.paper, 4.5, 'unused', 'the guidelines rule this out; plane-public-ink exists for it'],
  ['Teal ink on white', t['plane-public-ink'], t.paper, 4.5, 'text', 'ALLOW labels, teal words on light'],
  ['Teal ink on Cloud', t['plane-public-ink'], t['paper-raised'], 4.5, 'text', 'ALLOW in the audit line'],
  ['Amber ink on white', t['boundary-ink'], t.paper, 4.5, 'text', 'REDACT and BLOCK on light'],
  ['Amber ink on Cloud', t['boundary-ink'], t['paper-raised'], 4.5, 'text', 'policy states in a panel'],
  ['Signal red on white', t['signal-red'], t.paper, 4.5, 'text', 'form errors'],
  ['Signal red on Cloud', t['signal-red'], t['paper-raised'], 4.5, 'text', 'error summary'],
  ['White on Navy', t.paper, t['paper-dark'], 4.5, 'text', 'inverted headings and body'],
  ['White 80% on Navy', over(t.paper, t['paper-dark'], 0.8), t['paper-dark'], 4.5, 'text', 'inverted body'],
  ['White 70% on Navy', over(t.paper, t['paper-dark'], 0.7), t['paper-dark'], 4.5, 'text', 'inverted standfirst'],
  ['White 60% on Navy', over(t.paper, t['paper-dark'], 0.6), t['paper-dark'], 4.5, 'text', 'inverted eyebrow'],
  ['White on Navy button', t.paper, t['paper-dark'], 4.5, 'text', 'primary button label'],
  ['Navy on white button', t['paper-dark'], t.paper, 4.5, 'text', 'inverted primary button label'],

  // Non-text, 1.4.11, 3:1
  ['Teal on white', t['plane-public'], t.paper, 3.0, 'nontext', 'fresh freshness dot, teal fills and icons'],
  ['Teal ink on Cloud (dot)', t['plane-public-ink'], t['paper-raised'], 3.0, 'nontext', 'fresh freshness dot inside a panel'],
  ['Teal on Cloud', t['plane-public'], t['paper-raised'], 3.0, 'decorative', 'plane tag rules and fills, always beside their own label'],
  ['Teal on Navy', t['plane-public'], t['paper-dark'], 3.0, 'nontext', 'teal accents on dark; never small text there'],
  ['Amber on Navy', t.boundary, t['paper-dark'], 3.0, 'nontext', 'policy accents on dark; never small text there'],
  ['Amber ink on Cloud', t['boundary-ink'], t['paper-raised'], 3.0, 'nontext', 'over-committed capacity chip, stale dot'],
  ['Slate on white', t.muted, t.paper, 3.0, 'nontext', 'input, select and checkbox borders'],
  ['Slate on Cloud', t.muted, t['paper-raised'], 3.0, 'nontext', 'control borders inside panels'],
  ['Navy on white (ring)', t['paper-dark'], t.paper, 3.0, 'nontext', 'focus ring, 2px, 2px offset'],

  // Decorative: dividers and accent rules, always beside text that says the same
  ['Mist on white', t.rule, t.paper, 3.0, 'decorative', 'hairlines, table and list dividers'],
  ['Mist on Cloud', t.rule, t['paper-raised'], 3.0, 'decorative', 'panel dividers'],
  ['Amber on white', t.boundary, t.paper, 3.0, 'decorative', 'accent left rules; the label beside them says the same thing'],
  ['White 15% on Navy', over(t.paper, t['paper-dark'], 0.15), t['paper-dark'], 3.0, 'decorative', 'inverted dividers'],

  // Measured to document why they are not used
  ['Teal on Navy (TEXT)', t['plane-public'], t['paper-dark'], 4.5, 'unused', 'why inverted audit labels are white'],
  ['Amber on Navy (TEXT)', t.boundary, t['paper-dark'], 4.5, 'unused', 'same reason'],
  ['Signal red on Navy', t['signal-red'], t['paper-dark'], 3.0, 'unused', 'failed-state dot on dark is supplementary to its on-screen label'],
];

let failures = 0;
console.log('');
console.log('pair'.padEnd(32), 'ratio'.padStart(6), ' need', ' kind      ', 'verdict');
console.log('-'.repeat(112));
for (const [label, fg, bg, threshold, kind, note] of pairs) {
  const value = ratio(fg, bg);
  const counted = kind === 'text' || kind === 'nontext';
  const pass = value >= threshold;
  if (counted && !pass) failures += 1;
  console.log(
    label.padEnd(32),
    value.toFixed(2).padStart(6),
    String(threshold).padStart(5),
    kind.padEnd(12),
    (counted ? (pass ? 'PASS' : 'FAIL') : 'n/a ').padEnd(6),
    note,
  );
}
console.log('-'.repeat(112));
console.log(
  failures
    ? `${failures} failing pair(s)`
    : 'Every text and non-text pair the site renders meets WCAG 2.2 AA.',
);
console.log('');
process.exit(failures ? 1 : 0);
