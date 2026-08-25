import localFont from 'next/font/local';

/**
 * Three faces, three jobs, all self-hosted.
 *
 * Files are vendored in ./files as woff2, Latin subset only. Nothing is
 * requested from fonts.googleapis.com or fonts.gstatic.com at runtime:
 * hotlinking would leak visitor IPs to a third party, which Section 4.3
 * forbids outright.
 *
 * Brand Guidelines v1.0: Manrope for display and headings, Inter for body.
 * Both ship as variable fonts, so one file per face covers every weight the
 * design system uses. The ranges below are clamped to those weights.
 *
 * IBM Plex Mono is kept deliberately, and only for tabular figures, record IDs
 * and audit lines in the demos. The brand kit names no monospace face because
 * it was not written for a data product; a call ID set in Inter is harder to
 * scan and easier to misread. It never appears in a heading.
 *
 * Arabic subsetting for /regions/gulf is a later addition (Section 12).
 */

export const fontDisplay = localFont({
  src: [{ path: './files/manrope-var.woff2', weight: '500 700', style: 'normal' }],
  variable: '--font-display',
  display: 'swap',
  preload: true,
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
  adjustFontFallback: false,
});

export const fontBody = localFont({
  src: [{ path: './files/inter-var.woff2', weight: '400 600', style: 'normal' }],
  variable: '--font-body',
  display: 'swap',
  preload: true,
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
  adjustFontFallback: false,
});

export const fontMono = localFont({
  src: [
    { path: './files/ibm-plex-mono-400.woff2', weight: '400', style: 'normal' },
    { path: './files/ibm-plex-mono-500.woff2', weight: '500', style: 'normal' },
  ],
  variable: '--font-mono',
  display: 'swap',
  preload: true,
  fallback: ['ui-monospace', 'SFMono-Regular', 'monospace'],
  adjustFontFallback: false,
});

export const fontVariables = [fontDisplay.variable, fontBody.variable, fontMono.variable].join(' ');
