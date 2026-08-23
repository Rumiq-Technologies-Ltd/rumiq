import localFont from 'next/font/local';

/**
 * Section 5.3 / Section 12 — three faces, three jobs, all self-hosted.
 *
 * Files are vendored in ./files as woff2, Latin subset only. Nothing is
 * requested from fonts.googleapis.com or fonts.gstatic.com at runtime:
 * hotlinking would leak visitor IPs to a third party, which Section 4.3
 * forbids outright.
 *
 * Bricolage Grotesque and Public Sans ship as variable fonts, so one file
 * covers both required weights. The declared weight range is clamped to the
 * weights the design system actually uses.
 *
 * Arabic subsetting for /regions/gulf is a later addition (Section 12).
 */

export const fontDisplay = localFont({
  src: [{ path: './files/bricolage-grotesque-var.woff2', weight: '600 700', style: 'normal' }],
  variable: '--font-display',
  display: 'swap',
  preload: true,
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
  adjustFontFallback: false,
});

export const fontBody = localFont({
  src: [{ path: './files/public-sans-var.woff2', weight: '400 500', style: 'normal' }],
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
