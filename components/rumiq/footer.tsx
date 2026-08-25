import Link from 'next/link';
import { footerColumns } from '@/content/navigation';
import { legalDisclaimer, site } from '@/content/site';
import { Eyebrow } from './eyebrow';
import { CookiePreferencesButton } from './cookie-preferences-button';
import { Logo } from './logo';

/**
 * Section 7.2 — four columns plus a base bar carrying the entity, the
 * Section 4.2 disclaimer and copyright.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-rule bg-paper">
      <div className="mx-auto max-w-content px-6 py-16 lg:pl-gutter">
        {/* The lockup closes the page. Primary version, because the footer is
            paper. 132px clears the 120px minimum. */}
        <Logo variant="primary" width={132} className="mb-12" />

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <Eyebrow>{column.title}</Eyebrow>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="text-caption text-muted transition-colors duration-120 hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                {column.title === 'Trust & regions' ? (
                  <li>
                    <CookiePreferencesButton className="text-left text-caption text-muted transition-colors duration-120 hover:text-ink" />
                  </li>
                ) : null}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-rule pt-8">
          <p className="font-mono text-mono-eyebrow uppercase text-muted">
            {site.legalEntity} · {site.registeredIn}
          </p>
          <p className="mt-4 max-w-measure text-caption text-muted">{legalDisclaimer}</p>
          <p className="mt-4 text-caption text-muted">
            © {year} {site.legalEntity}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
