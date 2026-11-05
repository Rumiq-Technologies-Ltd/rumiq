import type { Metadata, Viewport } from 'next';
import './globals.css';
import { fontVariables } from '@/lib/fonts';
import { BASE_URL, robotsDirective } from '@/lib/seo';
import { tokenHex } from '@/lib/design-tokens';

/*
 * Root layout: document shell only (html, body, fonts, metadata, skip link).
 * The full site's chrome (Header, Footer, consent, JSON-LD) lives in
 * app/(site)/layout.tsx, so the temporary landing page in app/(landing) gets
 * none of it.
 */

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Rumiq — healthcare growth operating system',
    template: '%s · Rumiq',
  },
  description:
    'Rumiq connects marketing, patient access and operational data into one governed view of growth, without handing patient data to ad platforms.',
  // Section 13 — every route gets a canonical. './' resolves against
  // metadataBase and the current path, so routes that do not set their own
  // still self-canonicalise rather than inheriting the homepage's.
  alternates: { canonical: './' },
  robots: robotsDirective,
  applicationName: 'Rumiq',
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  // Section 12: no hex literal in a component. --paper, via the token table.
  themeColor: tokenHex('paper'),
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="min-h-screen bg-paper text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-button focus:bg-ink focus:px-4 focus:py-2 focus:font-mono focus:text-mono-eyebrow focus:uppercase focus:text-paper"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
