import Link from 'next/link';
import { Linkedin } from 'lucide-react';
import { Logo } from '@/components/rumiq';
import { landing } from '@/content/landing';

/*
 * TEMPORARY LANDING PAGE — footer. The navy band that closes the page, matching
 * the careers band above it. Top row: the logo and the one-line statement on
 * the left; on the right, the LinkedIn link and the legal links. Bottom line,
 * under a hairline: the copyright. Same content width as the sections.
 */
const linkedInUrl = 'https://www.linkedin.com/company/rumiq-technologies/posts/';

export function LandingFooter() {
  return (
    <footer className="bg-paper-dark text-paper">
      <div className="mx-auto max-w-content px-6 py-8 lg:pl-gutter">
        {/* From 900px up: three equal columns (logo | tagline | links) so the tagline sits dead centre.
            From lg up the container has 64px of padding on the left and 24px on the right, so the row is
            pulled out 40px to the left (-ml-10) to make it symmetric, and the logo is pushed back
            in by the same 40px so it keeps its place on the page's left edge. */}
        <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-5 lg:-ml-10 min-[900px]:grid min-[900px]:grid-cols-[1fr_auto_1fr]">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 min-[900px]:contents">
            {/* The logo file's wordmark baseline sits about 3px below the baseline of centred text,
                so the logo is lifted 3px to put both on one baseline. */}
            <Logo variant="reverse" width={120} className="-translate-y-[3px] lg:ml-10" />
            <p className="text-body text-paper min-[900px]:text-center">Digital marketing, tech &amp; AI for US healthcare.</p>
          </div>

          <div className="flex items-center gap-6 min-[900px]:justify-self-end">
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
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Rumiq Technologies on LinkedIn (opens in a new tab)"
              className="inline-flex size-9 items-center justify-center rounded-sm bg-paper text-navy hover:bg-paper/90"
            >
              <Linkedin aria-hidden="true" className="size-4" strokeWidth={1.75} />
            </a>
          </div>
        </div>

        <div className="mt-6 border-t border-paper/15 pt-4">
          <p className="font-mono text-mono-eyebrow text-paper/60">{landing.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
