'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/rumiq';
import { landing } from '@/content/landing';

/*
 * TEMPORARY LANDING PAGE — header. Section 7.1 styling (sticky, 72px, paper at
 * 92% with blur, bottom hairline), with anchor links only: the full site's
 * navigation points at pages that are not served in production.
 *
 * Below the large breakpoint the anchors move into a disclosure button. It
 * closes on Escape, on choosing a link, and returns focus to the button.
 */
export function LandingHeader() {
  const [open, setOpen] = React.useState(false);
  const toggleRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 h-18 border-b border-rule bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-bleed items-center gap-6 px-6 lg:pl-gutter">
        <Link href="/" className="shrink-0 rounded-input transition-opacity duration-150 hover:opacity-80" aria-label="Rumiq home">
          {/* 124px on phones (above the 120px lockup minimum) so the logo, CTA and menu breathe. */}
          <Logo variant="primary" width={148} priority className="h-auto w-[124px] sm:w-[148px]" />
        </Link>

        <nav aria-label="On this page" className="hidden items-center gap-1 lg:flex">
          {landing.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-button px-3 py-2 text-body font-medium text-muted transition-colors duration-120 hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls="landing-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
            className="inline-flex size-9 items-center justify-center rounded-button text-ink transition-colors duration-120 hover:bg-paper-raised lg:hidden"
          >
            {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
          </button>
        </div>
      </div>

      <nav
        id="landing-menu"
        aria-label="On this page"
        hidden={!open}
        className="border-t border-rule bg-paper lg:hidden"
      >
        <ul className="mx-auto max-w-bleed px-6 py-2">
          {landing.nav.map((item) => (
            <li key={item.href} className="border-b border-rule last:border-b-0">
              <a href={item.href} onClick={close} className="block py-4 text-body font-medium text-ink">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
