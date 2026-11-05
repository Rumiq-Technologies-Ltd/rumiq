'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

/*
 * TEMPORARY LANDING PAGE — "How we work" as a carousel of principles.
 *
 * A straight rail across the top shows where the reader is: three stations on
 * one line, filled up to the current one. The rail is never still: light flows
 * along it at a calm pace all the time, and surges when the principle changes,
 * then eases back. The flow is driven by one requestAnimationFrame loop so the
 * speed can change smoothly mid-motion (a CSS duration change would jump).
 * Under prefers-reduced-motion the loop never starts and the rail is static.
 *
 * Every slide is rendered into the same grid cell, so the carousel is always
 * as tall as its tallest principle and changing slides never moves the page.
 * Inactive slides are invisible and inert, so they are neither seen, read
 * aloud nor tabbed into. Arrow keys, the arrow buttons, the dots and the
 * stations all move between principles. Nothing advances on its own.
 */

type Principle = { label: string; body: string };

/* Flow speed, in px per second. */
const BASE_SPEED = 28;
const SURGE_SPEED = 420;
/* How quickly a surge settles back to the base speed (per second). */
const SURGE_DECAY = 2.6;

function useRailFlow(index: number) {
  const fillRef = React.useRef<HTMLSpanElement>(null);
  const trackRef = React.useRef<HTMLSpanElement>(null);
  const speedRef = React.useRef(BASE_SPEED);
  const firstRef = React.useRef(true);

  // A change of principle surges the flow. Skip the first render.
  React.useEffect(() => {
    if (firstRef.current) {
      firstRef.current = false;
      return;
    }
    speedRef.current = SURGE_SPEED;
  }, [index]);

  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    let last = performance.now();
    let offset = 0;
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      // Ease the speed back towards the base rate.
      speedRef.current = BASE_SPEED + (speedRef.current - BASE_SPEED) * Math.exp(-SURGE_DECAY * dt);
      offset += speedRef.current * dt;
      const position = `${offset.toFixed(2)}px 0`;
      if (fillRef.current) fillRef.current.style.backgroundPosition = position;
      if (trackRef.current) trackRef.current.style.backgroundPosition = position;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return { fillRef, trackRef };
}

export function PrinciplesCarousel({
  items,
  visuals,
}: {
  items: readonly Principle[];
  visuals: readonly React.ReactNode[];
}) {
  const [index, setIndex] = React.useState(0);
  const count = items.length;
  const progress = count > 1 ? index / (count - 1) : 1;
  const { fillRef, trackRef } = useRailFlow(index);

  const go = (next: number) => setIndex(Math.max(0, Math.min(count - 1, next)));

  const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      go(index + 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      go(index - 1);
    }
  };

  // Stations sit at the centre of equal columns; the rail runs first to last.
  const stationX = items.map((_, i) => ((i + 0.5) * 100) / count);
  const railStart = stationX[0] ?? 0;
  const railSpan = (stationX[count - 1] ?? 100) - railStart;

  return (
    <div role="region" aria-roledescription="carousel" aria-label="Our principles" tabIndex={0} onKeyDown={onKeyDown} className="outline-none">
      {/* The rail. */}
      <div className="relative h-16">
        <span
          ref={trackRef}
          aria-hidden="true"
          className="principle-rail-track absolute top-1/2 h-0.5 -translate-y-1/2 rounded-full"
          style={{ left: `${railStart}%`, width: `${railSpan}%` }}
        />
        <span
          aria-hidden="true"
          className="absolute top-1/2 h-1 -translate-y-1/2 overflow-hidden rounded-full transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ left: `${railStart}%`, width: `${railSpan * progress}%` }}
        >
          <span ref={fillRef} className="principle-rail-fill absolute inset-0" />
        </span>

        {items.map((item, i) => {
          const active = i === index;
          const reached = i <= index;
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => go(i)}
              aria-current={active ? 'step' : undefined}
              aria-label={`Principle ${i + 1} of ${count}: ${item.label}`}
              style={{ left: `${stationX[i]}%` }}
              className={cn(
                'absolute top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border font-mono text-mono-eyebrow transition-[color,background-color,border-color,box-shadow] duration-300',
                active
                  ? 'border-navy bg-navy text-paper shadow-[0_0_0_6px_hsl(var(--paper-dark-hsl)/0.1)]'
                  : reached
                    ? 'border-navy bg-paper text-navy'
                    : 'border-rule bg-paper text-muted hover:border-navy/40',
              )}
            >
              {String(i + 1).padStart(2, '0')}
            </button>
          );
        })}
      </div>

      {/* Every principle in one grid cell: the tallest sets the height for all. */}
      <div className="mt-10 grid [grid-template-areas:'slide']">
        {items.map((item, i) => {
          const active = i === index;
          return (
            <div
              // Re-keyed when it becomes active, so its entrance replays.
              key={active ? `active-${i}` : `idle-${i}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={active ? undefined : true}
              inert={!active}
              className={cn(
                'grid grid-rows-[auto_1fr] gap-10 [grid-area:slide] lg:grid-cols-2 lg:grid-rows-1 lg:gap-16',
                active ? 'principle-enter' : 'invisible',
              )}
            >
              {/* On phones the principle reads first, straight under the rail; the visual follows. */}
              <div className="flex [&>figure]:flex [&>figure]:w-full [&>figure]:flex-col [&>figure]:justify-center lg:order-1">
                {visuals[i]}
              </div>
              <div className="-order-1 self-center lg:order-2">
                <p className="font-mono text-mono-eyebrow uppercase text-muted">
                  Principle {String(i + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
                </p>
                <h3 className="mt-4 text-h2 font-semibold">{item.label}</h3>
                <p className="mt-5 max-w-measure text-body-l text-muted">{item.body}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls. */}
      <div className="mt-10 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={() => go(index - 1)}
          disabled={index === 0}
          aria-label="Previous principle"
          className="inline-flex size-11 items-center justify-center rounded-full border border-rule text-ink transition-colors duration-120 hover:border-navy disabled:pointer-events-none disabled:opacity-40"
        >
          <ChevronLeft aria-hidden="true" className="size-5" />
        </button>

        <div className="flex items-center gap-2">
          {items.map((item, i) => (
            <button
              key={item.label}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to principle ${i + 1}`}
              aria-current={i === index ? 'true' : undefined}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                i === index ? 'w-6 bg-navy' : 'w-2 bg-rule hover:bg-navy/40',
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(index + 1)}
          disabled={index === count - 1}
          aria-label="Next principle"
          className="inline-flex size-11 items-center justify-center rounded-full border border-rule text-ink transition-colors duration-120 hover:border-navy disabled:pointer-events-none disabled:opacity-40"
        >
          <ChevronRight aria-hidden="true" className="size-5" />
        </button>
      </div>
    </div>
  );
}
