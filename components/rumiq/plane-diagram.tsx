'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { home } from '@/content/home';
import { planeBg, planeBorder, planeText } from '@/lib/planes';
import { Eyebrow } from './eyebrow';

/**
 * Section 8.1 — the three-plane diagram. The most important visual after the
 * hero.
 *
 * Interactive from lg up: pointing at or focusing a module dims the others and
 * draws its data path across the planes. Below lg, and whenever
 * prefers-reduced-motion is set, it is static: the path appears at full extent
 * with no draw, and nothing dims on touch.
 */
export function PlaneDiagram() {
  const [active, setActive] = React.useState<string | null>(null);
  const [pathTop, setPathTop] = React.useState<number | null>(null);
  const [reduced, setReduced] = React.useState(false);
  const frameRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(query.matches);
    const onChange = () => setReduced(query.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  const activate = (id: string, element: HTMLElement | null) => {
    setActive(id);
    const frame = frameRef.current;
    if (!frame || !element) return;
    const frameBox = frame.getBoundingClientRect();
    const box = element.getBoundingClientRect();
    // Runs along the bottom edge of the active module, in the 8px gap between
    // rows. Every column shares the same row rhythm, so the path lands in the
    // gaps of the other planes instead of striking through their labels.
    setPathTop(box.bottom - frameBox.top + 4);
  };

  const clear = () => {
    setActive(null);
    setPathTop(null);
  };

  return (
    <div>
      <div
        ref={frameRef}
        className="relative grid gap-px border-l border-t border-rule lg:grid-cols-3"
        onMouseLeave={clear}
      >
        {/* The data path. One hairline crossing all three planes at the height of
            the active module. Draws over 300ms, instant when reduced motion is set. */}
        {pathTop !== null ? (
          <span
            aria-hidden
            style={{ top: pathTop }}
            className={cn(
              'pointer-events-none absolute left-0 z-0 hidden h-px w-full origin-left bg-boundary lg:block',
              reduced ? 'scale-x-100' : 'animate-[reveal-in_300ms_linear_both] scale-x-100',
            )}
          />
        ) : null}

        {home.planes.columns.map((column) => (
          <div
            key={column.plane}
            className={cn(
              'border-b border-r border-rule bg-paper-raised p-6 transition-opacity duration-120 motion-reduce:transition-none',
              active && !(column.modules as readonly string[]).includes(active)
                ? 'lg:opacity-40'
                : 'opacity-100',
            )}
          >
            <div className="flex items-center gap-2">
              <span aria-hidden className={cn('h-4 w-px', planeBg[column.plane])} />
              <Eyebrow>{column.title}</Eyebrow>
            </div>
            <ul className="mt-5 space-y-2">
              {column.modules.map((module) => {
                const isActive = active === module;
                return (
                  <li key={module}>
                    <button
                      type="button"
                      onMouseEnter={(event) => activate(module, event.currentTarget)}
                      onFocus={(event) => activate(module, event.currentTarget)}
                      onBlur={clear}
                      aria-pressed={isActive}
                      className={cn(
                        'relative z-10 w-full rounded-sm border px-3 py-2 text-left text-caption transition-colors duration-120 motion-reduce:transition-none',
                        // the path must not cross the active label and read as a strikethrough
                        isActive && 'bg-paper-raised',
                        isActive
                          ? cn('bg-paper', planeBorder[column.plane], planeText[column.plane])
                          // opaque so the path reads as a wire passing behind the
                          // modules rather than a strikethrough across their labels
                          : 'border-transparent bg-paper-raised text-ink hover:bg-paper',
                      )}
                    >
                      {module}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-5 hidden font-mono text-mono-eyebrow uppercase text-muted lg:block">
        {home.planes.hint}
      </p>
    </div>
  );
}
