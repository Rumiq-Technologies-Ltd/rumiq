'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Section 9.2 — the toggle is a map over the sector registry, never a
 * hard-coded pair. Adding a sector means adding a config object; this component
 * must not change.
 *
 * Implemented as a radio group so it is operable with the arrow keys and
 * announces the change (Section 13).
 */
export type SectorOption = { id: string; label: string };

export function SectorToggle({
  sectors,
  value,
  onChange,
  label = 'Choose a provider type',
  className,
}: {
  sectors: SectorOption[];
  value: string;
  onChange: (id: string) => void;
  label?: string;
  className?: string;
}) {
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const move = (from: number, delta: number) => {
    if (!sectors.length) return;
    const next = (from + delta + sectors.length) % sectors.length;
    const target = sectors[next];
    if (!target) return;
    onChange(target.id);
    refs.current[next]?.focus();
  };

  return (
    <div className={cn('inline-flex flex-col gap-2', className)}>
      <span className="font-mono text-mono-eyebrow uppercase text-muted" id="sector-toggle-label">
        {label}
      </span>
      <div
        role="radiogroup"
        aria-labelledby="sector-toggle-label"
        className="inline-flex flex-wrap rounded-button border border-rule bg-paper-raised p-1"
      >
        {sectors.map((sector, index) => {
          const active = sector.id === value;
          return (
            <button
              key={sector.id}
              ref={(node) => {
                refs.current[index] = node;
              }}
              type="button"
              role="radio"
              aria-checked={active}
              tabIndex={active ? 0 : -1}
              onClick={() => onChange(sector.id)}
              onKeyDown={(event) => {
                if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
                  event.preventDefault();
                  move(index, 1);
                }
                if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                  event.preventDefault();
                  move(index, -1);
                }
              }}
              className={cn(
                'rounded-button px-4 py-2 font-sans text-caption font-medium transition-colors duration-120',
                active ? 'bg-ink text-paper' : 'text-muted hover:text-ink',
              )}
            >
              {sector.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
