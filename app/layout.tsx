import type { Metadata, Viewport } from 'next';
import './globals.css';
import { fontVariables } from '@/lib/fonts';
import { NOINDEX } from '@/lib/flags';
import { BoundaryRule, ConsentBanner, Footer, Header } from '@/components/rumiq';

export const metadata: Metadata = {
  title: {
    default: 'Rumiq — healthcare growth operating system',
    template: '%s · Rumiq',
  },
  description:
    'Rumiq connects marketing, patient access and operational data into one governed view of growth, without handing patient data to ad platforms.',
  // Section 13 — the site stays out of the index until launch.
  robots: NOINDEX ? { index: false, follow: false, nocache: true } : { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#F2F4F3',
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
      </body>
    </html>
  );
}
