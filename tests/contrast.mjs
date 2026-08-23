/**
 * WCAG 2.2 contrast audit for the token pairs this site actually renders.
 *
 * Run:  node tests/contrast.mjs
 *
 * Hex values are read from lib/design-tokens.ts so the audit cannot drift from
 * the documented palette. Alpha pairs (paper at 60/70/80% over paper-dark) are
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
const paperOnDark = (alpha) => over(t.paper, t['paper-dark'], alpha);

const inkOn = (backdrop, alpha) => over(t.ink, backdrop, alpha);

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
  ['ink on paper', t.ink, t.paper, 4.5, 'text', 'body copy'],
  ['ink on paper-raised', t.ink, t['paper-raised'], 4.5, 'text', 'card copy'],
  ['muted on paper', t.muted, t.paper, 4.5, 'text', 'captions and eyebrows — the pair called out in review'],
  ['muted on paper-raised', t.muted, t['paper-raised'], 4.5, 'text', 'captions inside cards'],
  ['plane-public on paper', t['plane-public'], t.paper, 4.5, 'text', 'teal labels'],
  ['plane-public on paper-raised', t['plane-public'], t['paper-raised'], 4.5, 'text', 'ALLOW in the audit line'],
  ['plane-protected on paper', t['plane-protected'], t.paper, 4.5, 'text', 'blue labels'],
  ['signal-red on paper', t['signal-red'], t.paper, 4.5, 'text', 'form errors'],
  ['signal-red on paper-raised', t['signal-red'], t['paper-raised'], 4.5, 'text', 'error summary'],
  ['boundary-ink on paper', t['boundary-ink'], t.paper, 4.5, 'text', 'amber words on light'],
  ['boundary-ink on paper-raised', t['boundary-ink'], t['paper-raised'], 4.5, 'text', 'REDACT / BLOCK in the audit line'],
  ['boundary on paper-dark', t.boundary, t['paper-dark'], 4.5, 'text', 'amber on dark — the pair called out in review'],
  ['paper on ink', t.paper, t.ink, 4.5, 'text', 'primary button'],
  ['paper on paper-dark', t.paper, t['paper-dark'], 4.5, 'text', 'inverted headings'],
  ['paper 80% on paper-dark', paperOnDark(0.8), t['paper-dark'], 4.5, 'text', 'inverted body'],
  ['paper 70% on paper-dark', paperOnDark(0.7), t['paper-dark'], 4.5, 'text', 'inverted standfirst'],
  ['paper 60% on paper-dark', paperOnDark(0.6), t['paper-dark'], 4.5, 'text', 'inverted eyebrow'],

  ['ink 60% on paper-raised', inkOn(t['paper-raised'], 0.6), t['paper-raised'], 3.0, 'nontext', 'input, select and checkbox borders'],
  ['ink 60% on paper', inkOn(t.paper, 0.6), t.paper, 3.0, 'nontext', 'input borders on the page surface'],
  ['boundary-ink on paper-raised', t['boundary-ink'], t['paper-raised'], 3.0, 'nontext', 'over-committed capacity chip, stale freshness dot'],
  ['plane-public on paper-raised', t['plane-public'], t['paper-raised'], 3.0, 'nontext', 'fresh freshness dot'],
  ['signal-red on paper-raised', t['signal-red'], t['paper-raised'], 3.0, 'nontext', 'failed freshness dot, error field border'],
  ['ink on paper (focus ring)', t.ink, t.paper, 3.0, 'nontext', '2px ring, 2px offset, never removed'],

  ['boundary on paper', t.boundary, t.paper, 3.0, 'decorative', 'accent left rules; the eyebrow beside them says the same thing'],
  ['rule on paper', t.rule, t.paper, 3.0, 'decorative', 'hairline dividers, not component boundaries'],
  ['rule on paper-raised', t.rule, t['paper-raised'], 3.0, 'decorative', 'table and list dividers'],
  ['paper 15% on paper-dark', paperOnDark(0.15), t['paper-dark'], 3.0, 'decorative', 'inverted dividers'],

  ['boundary on paper (as TEXT)', t.boundary, t.paper, 4.5, 'unused', 'why boundary-ink exists: amber words on paper reach 2.5:1'],
  ['plane-protected on paper-dark', t['plane-protected'], t['paper-dark'], 4.5, 'unused', 'never used as text; the boundary-rule label is aria-hidden decoration'],
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
