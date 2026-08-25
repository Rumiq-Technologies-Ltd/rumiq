'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';

/**
 * Scroll-entry motion, done once for the whole site.
 *
 * The brand's shape language is flow and asymmetric movement, so sections
 * arrive rather than blink. This is deliberately not a motion library: one
 * IntersectionObserver and a CSS transition weigh almost nothing and cannot
 * block first paint.
 *
 * Two rules make it safe:
 *
 *  1. Only elements BELOW the fold are hidden. Anything already on screen when
 *     the effect runs is left exactly as painted, so there is no flash of
 *     content vanishing and returning, and the hero never animates out from
 *     under the reader.
 *  2. Nothing is hidden by CSS alone. The pending state is set by this script,
 *     so with JavaScript off, or without IntersectionObserver, every section is
 *     simply visible. A reveal animation must never be able to hide content.
 *
 * prefers-reduced-motion: reduce short-circuits the whole thing, so nothing is
 * ever hidden from a reader who asked for stillness.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  React.useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // The inner container of every section, which is where the padding and the
    // content live. The section itself carries the background and must not move.
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>('main section > div, main article > div > div'),
    );
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.reveal = 'in';
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.04 },
    );

    const fold = window.innerHeight * 0.9;
    for (const element of targets) {
      if (element.getBoundingClientRect().top <= fold) continue;
      element.dataset.reveal = 'pending';
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
