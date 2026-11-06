/* One tone per service group, the same four as the "How we work" panels: navy,
   peach, lilac, mint. `strip` is the label bar and shut card, `panel` the open body. */
export type ServiceTone = { strip: string; panel: string; dark?: boolean };

export const serviceTones: readonly ServiceTone[] = [
  { strip: 'bg-paper-dark', panel: 'bg-paper-dark', dark: true },
  { strip: 'bg-boundary/[0.14]', panel: 'bg-boundary/[0.08]' },
  { strip: 'bg-navy/[0.09]', panel: 'bg-navy/[0.05]' },
  { strip: 'bg-teal/[0.14]', panel: 'bg-teal/[0.07]' },
];
