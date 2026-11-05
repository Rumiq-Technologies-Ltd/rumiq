import Link from 'next/link';
import { Logo } from '@/components/rumiq';
import { legalDisclaimer } from '@/content/site';
import { landing } from '@/content/landing';

/*
 * TEMPORARY LANDING PAGE — footer. Kept compact: the logo, the "full website"
 * line and the legal links share one row; the copyright and the Section 4.2
 * disclaimer sit beneath a hairline. The Section 4.2 disclaimer appears on every
 * page, so it appears here too.
 */
export function LandingFooter() {
  return (
    <footer className="border-t border-rule bg-paper">
      <div className="mx-auto max-w-content px-6 py-8 lg:pl-gutter">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <Logo variant="primary" width={132} />
            <p className="text-caption text-ink">{landing.footer.fullSiteNote}</p>
          </div>

          <nav aria-label="Legal" className="flex gap-6">
            {landing.footer.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-caption text-muted underline decoration-rule underline-offset-4 hover:text-ink hover:decoration-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-6 border-t border-rule pt-5">
          <p className="max-w-measure text-mono-eyebrow text-muted">{legalDisclaimer}</p>
          <p className="mt-2 text-mono-eyebrow text-muted">{landing.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
