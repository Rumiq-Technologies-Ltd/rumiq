'use client';

import * as React from 'react';
import { PLANES, planeBg, planeLabel, type Plane } from '@/lib/planes';
import { cn } from '@/lib/utils';

/**
 * Section 5.1 — the signature element, and the only bold move on the site.
 *
 * A persistent 1px vertical rule in the reserved left gutter, full page height.
 * Its colour shifts to signal which plane the current section describes, and a
 * small monospace label travels with it. On mobile it collapses to a 3px
 * left-edge indicator with no label.
 *
 * Sections declare their plane with a data-plane attribute, so the rule needs
 * no registration API and no context provider:
 *
 *   <section data-plane="protected"> ... </section>
 *
 * Colour transitions over 600ms (Section 5.5) and resolves instantly under
 * prefers-reduced-motion. The element is decorative — every section that
 * matters also carries a <PlaneTag> — so it is hidden from assistive tech.
 */
export function BoundaryRule() {
  const [plane, setPlane] = React.useState<Plane>('public');
  const [labelTop, setLabelTop] = React.useState(240);

  React.useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-plane]'));
      if (!sections.length) return;

      // The read line sits at 40% of the viewport: the section a visitor is
      // actually reading, not the one that happens to touch the top edge.
      const readLine = window.innerHeight * 0.4;

      let active =
        sections.find((el) => {
          const rect = el.getBoundingClientRect();
          return rect.top <= readLine && rect.bottom > readLine;
        }) ?? null;

      if (!active) {
        active = sections.find((el) => el.getBoundingClientRect().bottom > 0) ?? sections[0] ?? null;
      }
      if (!active) return;

      const next = active.dataset.plane;
      if (next === 'public' || next === 'boundary' || next === 'protected') {
        setPlane(next);
      }

      const rect = active.getBoundingClientRect();
      const centre = (Math.max(rect.top, 0) + Math.min(rect.bottom, window.innerHeight)) / 2;
      const clamped = Math.min(Math.max(centre, 160), window.innerHeight - 160);
      setLabelTop(Number.isFinite(clamped) ? clamped : 240);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-y-0 left-0 z-40 lg:left-8">
      {/* 3px edge indicator on mobile, 1px rule in the gutter from lg up */}
      <div
        className={cn(
          'h-full w-[3px] transition-colors duration-600 ease-instrument motion-reduce:transition-none lg:w-px',
          planeBg[plane],
        )}
      />
      <span
        style={{ top: labelTop }}
        className={cn(
          'absolute left-3 hidden -translate-y-1/2 whitespace-nowrap font-mono text-mono-eyebrow uppercase transition-[color,top] duration-600 ease-instrument motion-reduce:transition-none lg:block',
          '[writing-mode:vertical-rl]',
          plane === 'public' && 'text-plane-public',
          plane === 'boundary' && 'text-boundary',
          plane === 'protected' && 'text-plane-protected',
        )}
      >
        {planeLabel[plane]}
      </span>
    </div>
  );
}

/** Exported for the styleguide, which documents the three states side by side. */
export const boundaryStates = PLANES;
