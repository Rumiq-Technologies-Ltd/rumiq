import { notFound } from 'next/navigation';
import { BoundaryRule, ConsentBanner, Footer, Header, JsonLd, ScrollReveal } from '@/components/rumiq';
import { DevModeSwitch } from '@/components/landing/dev-mode-switch';
import { organisationJsonLd, websiteJsonLd } from '@/lib/seo';
import { DEV_PREVIEW } from '@/lib/site-mode';

/*
 * The full site's chrome. Routes in this group exist only in `npm run dev`:
 * outside development (npm run start, and therefore Vercel) every request for
 * them is refused by proxy.ts, and this guard refuses the render as well.
 * See lib/site-mode.ts.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  if (!DEV_PREVIEW) notFound();

  return (
    <>
      <BoundaryRule />
      <Header />
      {children}
      <Footer />
      <ConsentBanner />
      <ScrollReveal />
      <DevModeSwitch to="/" label="Back to landing page" />
      {/* Section 13 — organisation and site nodes, once, site-wide. */}
      <JsonLd data={[organisationJsonLd(), websiteJsonLd()]} />
    </>
  );
}
