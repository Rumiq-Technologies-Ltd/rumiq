/**
 * The design system as data — Section 5.
 *
 * This module exists so the styleguide can document tokens without any
 * component containing an inline hex value. The authoritative declarations
 * live in app/globals.css; the hex strings here are documentation of those
 * declarations and must be kept in step with them.
 */

export type TokenGroup = 'surface' | 'plane' | 'boundary' | 'utility';

export type ColourToken = {
  /** CSS custom property name, without the leading -- */
  name: string;
  hex: string;
  /** Tailwind class that paints this token, used for the swatch */
  swatchClass: string;
  group: TokenGroup;
  usage: string;
  /** true when the token is semantic and must not be used decoratively */
  semantic?: boolean;
};

export const colourTokens: ColourToken[] = [
  {
    name: 'paper',
    hex: '#F2F4F3',
    swatchClass: 'bg-paper',
    group: 'surface',
    usage: 'Default page background. Cool paper, deliberately not warm cream.',
  },
  {
    name: 'paper-raised',
    hex: '#FFFFFF',
    swatchClass: 'bg-paper-raised',
    group: 'surface',
    usage: 'Cards and panels lifted off the page.',
  },
  {
    name: 'ink',
    hex: '#0F1F1C',
    swatchClass: 'bg-ink',
    group: 'surface',
    usage: 'Deep pine-black. Body text, primary buttons, dark sections.',
  },
  {
    name: 'paper-dark',
    hex: '#0A1614',
    swatchClass: 'bg-paper-dark',
    group: 'surface',
    usage: 'Inverted section background. The problem section, the CTA band.',
  },
  {
    name: 'plane-public',
    hex: '#0E7C6B',
    swatchClass: 'bg-plane-public',
    group: 'plane',
    semantic: true,
    usage: 'Teal. Public-plane concepts only: marketing, demand, public data.',
  },
  {
    name: 'plane-protected',
    hex: '#1E3A6B',
    swatchClass: 'bg-plane-protected',
    group: 'plane',
    semantic: true,
    usage: 'Deep clinical blue. Protected-plane concepts only: PHI, operational systems.',
  },
  {
    name: 'boundary',
    hex: '#D98A16',
    swatchClass: 'bg-boundary',
    group: 'boundary',
    semantic: true,
    usage:
      'Amber. Only where a policy decision is made or shown: blocked events, redacted fields, consent gates, the boundary rule. Never on a button or a heading.',
  },
  {
    name: 'rule',
    hex: '#CBD5D1',
    swatchClass: 'bg-rule',
    group: 'utility',
    usage: 'Hairlines, dividers, table borders, input borders.',
  },
  {
    name: 'muted',
    hex: '#5C6B67',
    swatchClass: 'bg-muted',
    group: 'utility',
    usage: 'Secondary text and captions. Contrast against paper verified per Section 13.',
  },
  {
    name: 'signal-red',
    hex: '#A8342A',
    swatchClass: 'bg-signal-red',
    group: 'utility',
    usage:
      'Addition to Section 5.2, required by the demos: the missed-call outcome chip (9.3) and the red data-quality chip (9.2). Status signal only, never a surface or a brand colour.',
  },
];

export type TypeStep = {
  name: string;
  className: string;
  size: string;
  lineHeight: string;
  face: 'Bricolage Grotesque' | 'Public Sans' | 'IBM Plex Mono';
  notes?: string;
};

export const typeScale: TypeStep[] = [
  {
    name: 'display-xl',
    className: 'font-display font-bold text-display-xl',
    size: 'clamp(2.75rem, 6vw, 5.25rem)',
    lineHeight: '0.98',
    face: 'Bricolage Grotesque',
    notes: 'Tracking -0.03em. Sentence case, never all caps.',
  },
  {
    name: 'display-l',
    className: 'font-display font-semibold text-display-l',
    size: 'clamp(2.25rem, 4.5vw, 3.75rem)',
    lineHeight: '1.02',
    face: 'Bricolage Grotesque',
  },
  {
    name: 'h2',
    className: 'font-display font-semibold text-h2',
    size: 'clamp(1.75rem, 3vw, 2.75rem)',
    lineHeight: '1.08',
    face: 'Bricolage Grotesque',
  },
  {
    name: 'h3',
    className: 'font-display font-semibold text-h3',
    size: 'clamp(1.25rem, 2vw, 1.625rem)',
    lineHeight: '1.2',
    face: 'Bricolage Grotesque',
  },
  {
    name: 'body-l',
    className: 'text-body-l',
    size: '1.125rem',
    lineHeight: '1.6',
    face: 'Public Sans',
    notes: 'Measure capped at 68 characters. Never full-bleed paragraphs.',
  },
  {
    name: 'body',
    className: 'text-body',
    size: '1rem',
    lineHeight: '1.65',
    face: 'Public Sans',
  },
  {
    name: 'caption',
    className: 'text-caption text-muted',
    size: '0.875rem',
    lineHeight: '1.5',
    face: 'Public Sans',
  },
  {
    name: 'mono-eyebrow',
    className: 'font-mono text-mono-eyebrow uppercase',
    size: '0.75rem',
    lineHeight: '1.2',
    face: 'IBM Plex Mono',
    notes: 'Letter-spacing 0.08em, uppercase.',
  },
];

export type ComponentSpec = {
  name: string;
  purpose: string;
  /** Section of the specification that governs the component */
  ref: string;
};

/** Section 5.6 — build these before building pages. */
export const componentInventory: ComponentSpec[] = [
  { name: 'Eyebrow', purpose: 'Uppercase mono label above a statement headline.', ref: '5.3' },
  { name: 'SectionHeader', purpose: 'Eyebrow plus headline plus optional standfirst.', ref: '5.6' },
  { name: 'Button', purpose: 'Primary, secondary and ghost. 2px radius. Never amber.', ref: '5.4' },
  { name: 'Card', purpose: '4px radius, hairline border, lifts 2px on hover.', ref: '5.5' },
  { name: 'ModuleCard', purpose: 'One of the ten modules. Optional status prop, gated by SHOW_MODULE_STATUS.', ref: '0.2' },
  { name: 'PlaneTag', purpose: 'Marks a block as public, boundary or protected plane.', ref: '5.2' },
  { name: 'StatusChip', purpose: 'Four variants. Built now, shipped hidden. Renders only when SHOW_MODULE_STATUS is true.', ref: '0.2' },
  { name: 'StatBlock', purpose: 'A single figure with its label. Carries an illustrative badge when synthetic.', ref: '4.1' },
  { name: 'ProofSlot', purpose: 'Dashed placeholder reading PROOF SLOT — pending client approval. No fabricated proof.', ref: '4.1' },
  { name: 'FAQAccordion', purpose: 'Copy comes from Document 05 verbatim, placed by its placement map.', ref: '8.1' },
  { name: 'CTABand', purpose: 'Inverted band, once per page except /contact. Boundary rule continues through it in amber.', ref: '7.3' },
  { name: 'AuditLine', purpose: 'Monospace disclosure-ledger line appended on every policy decision.', ref: '9.1' },
  { name: 'DataFreshness', purpose: 'Connector freshness readout on every demo panel.', ref: '9' },
  { name: 'BoundaryRule', purpose: 'The signature element. 1px left-gutter rule, colour tracks the active plane on scroll.', ref: '5.1' },
  { name: 'IllustrativeBadge', purpose: 'Visible on-screen label on every illustrative number. Not a tooltip.', ref: '4.1' },
  { name: 'SectorToggle', purpose: 'Maps over the sector registry. Adding a sector must not touch this component.', ref: '9.2' },
  { name: 'FunnelTrack', purpose: 'Data-driven. Accepts an arbitrary stage array, from 7 stages to 17.', ref: '8.1' },
];

export type MotionSpec = { name: string; duration: string; detail: string };

/** Section 5.5 — deliberate and sparse. All of this resolves instantly under prefers-reduced-motion. */
export const motionSpecs: MotionSpec[] = [
  { name: 'Hero load', duration: '400ms', detail: 'Text rises 12px and fades in, staggered 60ms per line. Nothing else animates on load.' },
  { name: 'Scroll reveal', duration: '300ms', detail: 'Fade in at 8% opacity offset. No slide, no scale, no parallax.' },
  { name: 'Boundary rule', duration: '600ms', detail: 'Colour transition as the active section changes.' },
  { name: 'Hover', duration: '120ms', detail: 'Buttons darken. Cards lift 2px with a hairline border shift. No growing shadows.' },
];

export type LayoutRule = { name: string; value: string };

/** Section 5.4 */
export const layoutRules: LayoutRule[] = [
  { name: 'Grid', value: '12 columns' },
  { name: 'Max content width', value: '1280px (max-w-content)' },
  { name: 'Max full-bleed width', value: '1440px (max-w-bleed)' },
  { name: 'Left gutter', value: '64px desktop, reserved for the boundary rule and its label (pl-gutter)' },
  { name: 'Section padding', value: '120px desktop / 72px mobile (py-section-mobile lg:py-section)' },
  { name: 'Body measure', value: '68 characters (max-w-measure)' },
  { name: 'Section breaks', value: 'Hard hairline. No gradients, no soft fades.' },
  { name: 'Radius', value: '4px cards and inputs, 2px buttons. Nothing rounder.' },
];

export type ContrastPair = { pair: string; ratio: string; note: string };

/**
 * Section 13 — contrast verified on every token pair in use.
 * Ratios computed from the Section 5.2 hex values against WCAG 2.2.
 * Normal text needs 4.5:1, non-text UI boundaries need 3:1.
 */
export const contrastPairs: ContrastPair[] = [
  { pair: 'ink on paper', ratio: '15.42:1', note: 'Body text. Passes AA and AAA.' },
  { pair: 'muted on paper', ratio: '5.06:1', note: 'Captions. Passes AA at any size.' },
  { pair: 'muted on paper-raised', ratio: '5.59:1', note: 'Captions on cards. Passes AA.' },
  { pair: 'paper on ink', ratio: '15.42:1', note: 'Inverted sections and primary buttons.' },
  { pair: 'amber on paper-dark', ratio: '6.68:1', note: 'Policy moments on inverted sections. Passes AA.' },
  { pair: 'plane-public on paper', ratio: '4.62:1', note: 'Passes AA, with little margin. Do not lighten the teal.' },
  { pair: 'plane-protected on paper', ratio: '10.15:1', note: 'Passes AA and AAA.' },
  { pair: 'signal-red on paper', ratio: '5.96:1', note: 'Missed-call and red data-quality chips. Passes AA.' },
  {
    pair: 'rule on paper',
    ratio: '1.36:1',
    note: 'Decorative hairlines only. Below the 3:1 non-text threshold, so an input border or a focus boundary must not rely on it alone. Open question for Rumiq: a darker rule variant for form controls.',
  },
];
