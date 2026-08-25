import type { Metadata, Viewport } from 'next';
import './globals.css';
import { fontVariables } from '@/lib/fonts';
import { BoundaryRule, ConsentBanner, Footer, Header, JsonLd, ScrollReveal } from '@/components/rumiq';
import { BASE_URL, organisationJsonLd, robotsDirective, websiteJsonLd } from '@/lib/seo';
import { tokenHex } from '@/lib/design-tokens';

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
  // Section 13 — the site stays out of the index until launch. Reinforced by
  // app/robots.ts and by the X-Robots-Tag header set in proxy.ts.
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
        <BoundaryRule />
        <Header />
        {children}
        <Footer />
        <ConsentBanner />
        <ScrollReveal />
        {/* Section 13 — organisation and site nodes, once, site-wide. */}
        <JsonLd data={[organisationJsonLd(), websiteJsonLd()]} />
      </body>
    </html>
  );
}
