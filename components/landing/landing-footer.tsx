import Link from 'next/link';
import { Logo } from '@/components/rumiq';
import { landing } from '@/content/landing';

/*
 * TEMPORARY LANDING PAGE — footer. The navy band that closes the page, matching
 * the careers band above it. Top row: the logo and the one-line statement on
 * the left, the legal links on the right. Bottom line, under a hairline: the
 * copyright. Same content width as the sections.
 */
export function LandingFooter() {
  return (
    <footer className="bg-paper-dark text-paper">
      <div className="mx-auto max-w-content px-6 py-8 lg:pl-gutter">
        <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-5">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <Logo variant="reverse" width={120} />
            <p className="text-caption text-paper/80">Digital marketing, tech &amp; AI for US healthcare.</p>
          </div>

          <nav aria-label="Legal" className="flex gap-6">
            {landing.footer.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-caption text-paper underline decoration-paper/40 underline-offset-4 hover:decoration-paper"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-6 border-t border-paper/15 pt-4">
          <p className="text-mono-eyebrow text-paper/60">{landing.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
