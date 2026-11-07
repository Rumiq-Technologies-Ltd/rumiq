'use client';

import * as React from 'react';
import { Minus, Pause, Play, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

/*
 * TEMPORARY LANDING PAGE — "How we work" as expanding panels.
 *
 * One principle is open as a wide panel (heading, text and its visual); the
 * others stand beside it as narrow vertical strips, each with its number, its
 * name written top to bottom and a plus. Choosing a strip opens it and the
 * open panel folds into a strip in its place, so the row never changes size.
 *
 * Each principle has its own tone from the Rumiq palette: navy for the
 * overview, amber (the policy colour) for compliance, a navy tint for privacy
 * and a teal tint for measurement. The strip and its open panel share it.
 *
 * From xl up the panels rotate on their own, one every ROTATE_MS, and a thin
 * bar along the open panel's foot counts the time down. It stops when the
 * reader opens a panel themselves or presses pause, and starts again only on
 * play. It also waits, unseen, while off screen or in a hidden tab.
 *
 * Below xl it becomes a plain vertical accordion: name rows with a plus, the
 * open one showing its text and visual underneath. It does not rotate there,
 * since opening a different panel changes the page's height under the reader.
 *
 * The move (xl and up) never touches layout. Every panel is laid out once at
 * the open width, positioned with a transform and cut to its visible width
 * with a clip-path, so a change animates only transform, clip-path and
 * opacity: no reflow, no sub-pixel rounding between neighbours, no text
 * snapping, and an interrupted move simply retargets from where it is. The
 * 1px border is the gap between two clips (an outer one filled with the
 * border colour, an inner one 1px smaller holding the panel). Content and
 * strip labels are always mounted and cross-fade with CSS transitions keyed
 * on data-open, so nothing waits on a JS timer. Timing lives in globals.css
 * (pp-*).
 *
 * Under prefers-reduced-motion it does not rotate unless the reader presses
 * play, and the panels change without animating.
 */

type Principle = { label: string; body: string };

const ROTATE_MS = 5000;
/* Strip width and gap (xl and up); the open panel takes the rest of the row. */
const STRIP_PX = 72;
const GAP_PX = 8;

/* `visual` colors the outer border of the panel's illustration (its <figure>) in the card's own hue. */
type Tone = { strip: string; panel: string; edge: string; visual: string; dark?: boolean };

const tones: Tone[] = [
  { strip: 'bg-paper-dark', panel: 'bg-paper-dark', edge: 'bg-paper-dark', visual: '[&>figure]:border-2 [&>figure]:border-[#6f9be0]', dark: true },
  { strip: 'bg-boundary/[0.14]', panel: 'bg-boundary/[0.08]', edge: 'bg-rule', visual: '[&>figure]:border-boundary/50' },
  { strip: 'bg-navy/[0.09]', panel: 'bg-navy/[0.05]', edge: 'bg-rule', visual: '[&>figure]:border-navy/30' },
  { strip: 'bg-teal/[0.14]', panel: 'bg-teal/[0.07]', edge: 'bg-rule', visual: '[&>figure]:border-teal/50' },
];

const pad = (n: number) => String(n).padStart(2, '0');

function useMedia(query: string) {
  const [matches, setMatches] = React.useState(false);
  React.useEffect(() => {
    const list = window.matchMedia(query);
    const update = () => setMatches(list.matches);
    update();
    list.addEventListener('change', update);
    return () => list.removeEventListener('change', update);
  }, [query]);
  return matches;
}

export function PrinciplesPanels({ items, visuals }: { items: readonly Principle[]; visuals: readonly React.ReactNode[] }) {
  const count = items.length;
  const [index, setIndex] = React.useState(0);
  const [playing, setPlaying] = React.useState(true);
  const wide = useMedia('(min-width: 1280px)');
  const reduced = useMedia('(prefers-reduced-motion: reduce)');

  React.useEffect(() => {
    if (reduced) setPlaying(false);
  }, [reduced]);

  // Waits, unseen, while off screen or in a hidden tab.
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [onScreen, setOnScreen] = React.useState(true);
  const [pageVisible, setPageVisible] = React.useState(true);
  React.useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry?.isIntersecting ?? false), { threshold: 0.35 });
    observer.observe(node);
    const onVisibility = () => setPageVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  const running = wide && playing && onScreen && pageVisible && count > 1;

  // The time left on the open panel survives a wait, so it resumes rather than restarts.
  const remainingRef = React.useRef(ROTATE_MS);
  const lastIndexRef = React.useRef(index);
  React.useEffect(() => {
    if (lastIndexRef.current !== index) {
      lastIndexRef.current = index;
      remainingRef.current = ROTATE_MS;
    }
    if (!running) return;
    const start = performance.now();
    const timer = window.setTimeout(() => setIndex((current) => (current + 1) % count), remainingRef.current);
    return () => {
      window.clearTimeout(timer);
      remainingRef.current = Math.max(0, remainingRef.current - (performance.now() - start));
    };
  }, [index, running, count]);

  // The open width (xl and up): the row less the strips and gaps, in whole pixels.
  const rowRef = React.useRef<HTMLDivElement>(null);
  const [openWidth, setOpenWidth] = React.useState<number | null>(null);
  React.useEffect(() => {
    const row = rowRef.current;
    if (!row || !wide) return setOpenWidth(null);
    const measure = () => setOpenWidth(Math.max(0, Math.round(row.clientWidth - (count - 1) * (STRIP_PX + GAP_PX))));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(row);
    return () => observer.disconnect();
  }, [count, wide]);

  const sized = wide && openWidth !== null;

  // Transitions switch on only after the panels have been placed once, and
  // off again while the row is resized, so neither slides the panels about.
  const [animate, setAnimate] = React.useState(false);
  React.useEffect(() => {
    setAnimate(false);
    if (!sized) return;
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setAnimate(true));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [sized, openWidth]);

  // Each opening restarts that panel's countdown; a closing panel keeps its
  // bar where it stopped while it fades, rather than snapping back to empty.
  const runsRef = React.useRef<number[]>([]);
  const countedRef = React.useRef<number | null>(null);
  if (countedRef.current !== index) {
    countedRef.current = index;
    runsRef.current[index] = (runsRef.current[index] ?? 0) + 1;
  }

  return (
    <div ref={rootRef}>
      <div
        ref={rowRef}
        className={cn('pp-row relative flex flex-col gap-2 xl:h-[30rem] xl:flex-row', sized && 'pp-sized', animate && 'pp-animate')}
      >
        {items.map((item, i) => {
          const open = i === index;
          const tone = tones[i % tones.length]!;
          const panelId = `principle-panel-${i}`;
          const visible = open ? openWidth ?? 0 : STRIP_PX;
          const x = i * (STRIP_PX + GAP_PX) + (i > index ? (openWidth ?? 0) - STRIP_PX : 0);
          const cut = (openWidth ?? 0) - visible;

          return (
            <div
              key={item.label}
              data-open={open ? '' : undefined}
              className={cn(
                sized
                  ? cn('pp-panel absolute inset-y-0 left-0 rounded-panel', tone.edge)
                  : cn(
                      'relative overflow-hidden rounded-panel border border-rule',
                      open ? tone.panel : tone.strip,
                      tone.dark && 'border-paper-dark',
                      open ? 'xl:flex-[1_1_0%]' : 'xl:flex-[0_0_4.5rem]',
                    ),
              )}
              style={
                sized
                  ? {
                      width: openWidth!,
                      transform: `translate3d(${x}px, 0, 0)`,
                      clipPath: `inset(0 ${cut}px 0 0 round 16px)`,
                    }
                  : undefined
              }
            >
              {/* The panel itself, 1px inside the border colour (xl and up). Below xl it adds no box. */}
              <div
                className={sized ? 'pp-inner absolute inset-px overflow-hidden rounded-[15px] bg-paper' : 'contents'}
                style={sized ? { clipPath: `inset(0 ${cut}px 0 0 round 15px)` } : undefined}
              >
                {sized ? <div aria-hidden="true" className={cn('pp-tint absolute inset-0', open ? tone.panel : tone.strip)} /> : null}

                {/* The strip (wide screens) or the name row (smaller screens). */}
                <button
                  type="button"
                  onClick={() => {
                    setIndex(i);
                    // Choosing a panel means the reader has taken over: stop rotating until they press play.
                    setPlaying(false);
                  }}
                  aria-expanded={open}
                  aria-controls={panelId}
                  tabIndex={open && wide ? -1 : undefined}
                  className={cn(
                    'group flex w-full items-center gap-4 px-5 py-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-current',
                    'xl:absolute xl:inset-y-0 xl:left-0 xl:w-[4.5rem] xl:flex-col xl:items-center xl:justify-between xl:px-0 xl:py-6',
                    sized ? 'pp-strip' : open && 'xl:pointer-events-none xl:invisible',
                    tone.dark ? 'text-paper' : 'text-ink',
                  )}
                >
                  <span className={cn('font-mono text-mono-eyebrow', tone.dark ? 'text-paper/70' : 'text-muted')}>{pad(i + 1)}</span>
                  <span className="flex-1 text-body font-semibold xl:mb-auto xl:mt-4 xl:flex-none xl:whitespace-nowrap xl:[writing-mode:vertical-rl]">
                    {item.label}
                  </span>
                  {open && !wide ? (
                    <Minus aria-hidden="true" className="size-5 shrink-0" />
                  ) : (
                    <Plus aria-hidden="true" className="size-5 shrink-0 transition-transform duration-300 ease-out group-hover:rotate-90" />
                  )}
                </button>

                {/* The open panel. From xl every panel keeps its content mounted, faded out while closed. */}
                <div
                  id={panelId}
                  role="region"
                  aria-label={item.label}
                  aria-hidden={sized && !open ? true : undefined}
                  inert={sized && !open ? true : undefined}
                  // `hidden` alone loses to xl:flex, so closed accordion panels get no display class at all.
                  className={cn(
                    sized
                      ? 'pp-content relative flex h-full w-full items-center p-10'
                      : cn('px-5 pb-6 xl:h-full xl:items-center xl:p-10', open ? 'principle-accordion-in xl:flex' : 'hidden'),
                  )}
                >
                  <div className="grid w-full gap-8 xl:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] xl:items-center xl:gap-10">
                    <div>
                      <p className={cn('hidden font-mono text-mono-eyebrow uppercase xl:block', tone.dark ? 'text-paper/70' : 'text-muted')}>
                        {pad(i + 1)} / {pad(count)}
                      </p>
                      <h3 className={cn('text-h2 font-semibold xl:mt-4', tone.dark ? 'text-paper' : 'text-navy')}>{item.label}</h3>
                      <p className={cn('mt-4 text-body xl:mt-5 xl:text-body-l', tone.dark ? 'text-paper/80' : 'text-muted')}>{item.body}</p>
                    </div>
                    <div className={cn('[&>figure]:border-[1.5px]', tone.visual)}>{visuals[i]}</div>
                  </div>
                </div>

                {/* The countdown, along the open panel's foot. */}
                {sized ? (
                  <span aria-hidden="true" data-playing={playing ? '' : undefined} className="pp-timer-track absolute inset-x-0 bottom-0 h-1">
                    <span
                      key={runsRef.current[i] ?? 0}
                      className={cn('pp-timer absolute inset-0', tone.dark ? 'bg-teal' : 'bg-navy/60')}
                      style={{ animationDuration: `${ROTATE_MS}ms`, animationPlayState: open && running ? 'running' : 'paused' }}
                    />
                  </span>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pause and play, wide screens only: smaller screens do not rotate. */}
      <div className="mt-4 hidden justify-end xl:flex">
        <button
          type="button"
          onClick={() => setPlaying((value) => !value)}
          className="inline-flex items-center gap-2 rounded-button px-3 py-2 font-mono text-mono-eyebrow uppercase text-muted transition-colors duration-120 hover:text-ink"
        >
          {playing ? <Pause aria-hidden="true" className="size-4" /> : <Play aria-hidden="true" className="size-4" />}
          {playing ? 'Pause' : 'Play'}
        </button>
      </div>
    </div>
  );
}
