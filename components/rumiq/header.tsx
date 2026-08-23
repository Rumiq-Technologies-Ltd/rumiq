'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { site } from '@/content/site';
import {
  headerCtas,
  platformMenu,
  platformOverview,
  primaryNav,
  solutionsMenu,
} from '@/content/navigation';
import { planeBg, planeText, type Plane } from '@/lib/planes';
import { Button } from './button';
import { Eyebrow } from './eyebrow';

/**
 * Section 7.1 — sticky, 72px, paper at 92% with backdrop blur and a bottom
 * hairline, compressing to 56px past 400px of scroll. Wordmark left, nav
 * centre-left, two CTAs right.
 *
 * Platform and Solutions open mega-menus. The Platform menu is a small version
 * of the three-plane diagram: hovering or focusing a plane highlights its
 * modules and dims the others.
 *
 * Both menus open on hover and on click, close on Escape, on outside click and
 * on route change, and are fully keyboard operable (Section 13).
 */
type MenuId = 'platform' | 'solutions';

export function Header() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = React.useState<MenuId | null>(null);
  const [activePlane, setActivePlane] = React.useState<Plane | null>(null);
  const [compact, setCompact] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navRef = React.useRef<HTMLDivElement>(null);
  const mobileRef = React.useRef<HTMLDivElement>(null);
  const closeTimer = React.useRef<number | null>(null);

  // Close everything on route change (Section 7.1).
  React.useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  React.useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpenMenu(null);
      setMobileOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Body scroll lock plus a focus trap for the mobile overlay.
  React.useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const container = mobileRef.current;
    const focusables = () =>
      Array.from(
        container?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [],
      ).filter((el) => el.offsetParent !== null);

    focusables()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0]!;
      const last = items[items.length - 1]!;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    container?.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      container?.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileOpen]);

  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 120);
  };
  const cancelClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b border-rule bg-paper/92 backdrop-blur-md transition-[height] duration-300',
        compact ? 'h-14' : 'h-18',
      )}
      onMouseLeave={scheduleClose}
    >
      <div className="mx-auto flex h-full max-w-bleed items-center gap-6 px-6 lg:pl-gutter">
        <Link
          href="/"
          className="font-display text-h3 font-bold tracking-[-0.03em] lowercase"
          aria-label={`${site.name} home`}
        >
          {site.wordmark}
        </Link>

        {/* Desktop navigation */}
        <div ref={navRef} className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) =>
            item.menu ? (
              <div key={item.label} onMouseEnter={() => { cancelClose(); setOpenMenu(item.menu!); }}>
                <button
                  type="button"
                  aria-expanded={openMenu === item.menu}
                  aria-controls={`megamenu-${item.menu}`}
                  onClick={() => setOpenMenu(openMenu === item.menu ? null : item.menu!)}
                  className={cn(
                    'rounded-button px-3 py-2 text-body font-medium transition-colors duration-120',
                    openMenu === item.menu ? 'text-ink' : 'text-muted hover:text-ink',
                  )}
                >
                  {item.label}
                </button>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                onMouseEnter={scheduleClose}
                className="rounded-button px-3 py-2 text-body font-medium text-muted transition-colors duration-120 hover:text-ink"
              >
                {item.label}
              </Link>
            ),
          )}
        </div>

        <div className="ml-auto hidden items-center gap-3 lg:flex">
          <Button asChild variant="secondary" size="sm">
            <Link href={headerCtas.secondary.href}>{headerCtas.secondary.label}</Link>
          </Button>
          <Button asChild size="sm">
            <Link href={headerCtas.primary.href}>{headerCtas.primary.label}</Link>
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-expanded={mobileOpen}
          className="ml-auto inline-flex items-center gap-2 rounded-button px-2 py-2 lg:hidden"
        >
          <Menu strokeWidth={1.5} className="h-5 w-5" aria-hidden />
          <span className="font-mono text-mono-eyebrow uppercase">Menu</span>
        </button>
      </div>

      {/* Platform mega-menu — a small version of the three-plane diagram */}
      {openMenu === 'platform' ? (
        <div
          id="megamenu-platform"
          onMouseEnter={cancelClose}
          className="absolute inset-x-0 top-full border-b border-rule bg-paper-raised"
        >
          <div className="mx-auto max-w-bleed px-6 py-10 lg:pl-gutter">
            <div className="grid gap-10 lg:grid-cols-3">
              {platformMenu.map((group) => {
                const dimmed = activePlane !== null && activePlane !== group.plane;
                return (
                  <div
                    key={group.plane}
                    onMouseEnter={() => setActivePlane(group.plane)}
                    onMouseLeave={() => setActivePlane(null)}
                    className={cn(
                      'transition-opacity duration-120 motion-reduce:transition-none',
                      dimmed ? 'opacity-40' : 'opacity-100',
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <span aria-hidden className={cn('h-4 w-px', planeBg[group.plane])} />
                      <Eyebrow tone="muted">{group.title}</Eyebrow>
                    </div>
                    <ul className="mt-5 space-y-3">
                      {group.modules.map((module) => (
                        <li key={module.name}>
                          <Link
                            href={module.href ?? platformOverview.href}
                            onFocus={() => setActivePlane(group.plane)}
                            className={cn(
                              'text-body transition-colors duration-120 hover:underline',
                              planeText[group.plane],
                            )}
                          >
                            {module.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
            <div className="mt-10 border-t border-rule pt-6">
              <Link href={platformOverview.href} className="text-body font-medium hover:underline">
                {platformOverview.label}
              </Link>
              <p className="mt-1 text-caption text-muted">{platformOverview.description}</p>
            </div>
          </div>
        </div>
      ) : null}

      {/* Solutions mega-menu */}
      {openMenu === 'solutions' ? (
        <div
          id="megamenu-solutions"
          onMouseEnter={cancelClose}
          className="absolute inset-x-0 top-full border-b border-rule bg-paper-raised"
        >
          <div className="mx-auto max-w-bleed px-6 py-10 lg:pl-gutter">
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {solutionsMenu.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="group block">
                    <span className="text-body font-medium group-hover:underline">{item.label}</span>
                    <span className="mt-1 block max-w-measure text-caption text-muted">
                      {item.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}

      {/* Mobile overlay — full screen, plane-grouped, focus trapped */}
      {mobileOpen ? (
        <div
          ref={mobileRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 overflow-y-auto bg-paper lg:hidden"
        >
          <div className="flex h-18 items-center justify-between border-b border-rule px-6">
            <span className="font-display text-h3 font-bold lowercase">{site.wordmark}</span>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center gap-2 rounded-button px-2 py-2"
            >
              <X strokeWidth={1.5} className="h-5 w-5" aria-hidden />
              <span className="font-mono text-mono-eyebrow uppercase">Close</span>
            </button>
          </div>

          <nav className="px-6 py-8">
            <ul className="space-y-4">
              {primaryNav
                .filter((item) => !item.menu)
                .map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-h3 font-semibold">
                      {item.label}
                    </Link>
                  </li>
                ))}
            </ul>

            <div className="mt-10 space-y-8">
              {platformMenu.map((group) => (
                <div key={group.plane}>
                  <div className="flex items-center gap-2">
                    <span aria-hidden className={cn('h-4 w-px', planeBg[group.plane])} />
                    <Eyebrow>{group.title}</Eyebrow>
                  </div>
                  <ul className="mt-4 space-y-3">
                    {group.modules.map((module) => (
                      <li key={module.name}>
                        <Link
                          href={module.href ?? platformOverview.href}
                          className={cn('text-body', planeText[group.plane])}
                        >
                          {module.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div>
                <Eyebrow>Solutions</Eyebrow>
                <ul className="mt-4 space-y-3">
                  {solutionsMenu.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="text-body">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-3">
              <Button asChild variant="secondary">
                <Link href={headerCtas.secondary.href}>{headerCtas.secondary.label}</Link>
              </Button>
              <Button asChild>
                <Link href={headerCtas.primary.href}>{headerCtas.primary.label}</Link>
              </Button>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
