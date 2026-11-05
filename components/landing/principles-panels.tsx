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
 * Opening and closing (xl and up): each panel animates its own width in
 * pixels, with one easing for both, so the row's total never changes. The
 * opening panel's content is laid out at its final width from the first frame
 * and clipped by the panel, so the growing edge uncovers it (no text reflow),
 * while it fades and slides in a few pixels. The closing panel keeps its
 * content, fading it out, until the move ends; then its strip label fades in.
 * Timing lives in globals.css (principle-panel*, principle-strip-in).
 *
 * Under prefers-reduced-motion it does not rotate unless the reader presses
 * play, and the panels change without animating.
 */

type Principle = { label: string; body: string };

const ROTATE_MS = 5000;
/* The open/close move, and the strip and gap it is measured with (xl and up). */
const MOVE_MS = 700;
const STRIP_PX = 72;
const GAP_PX = 8;

type Tone = { strip: string; panel: string; dark?: boolean };

const tones: Tone[] = [
  { strip: 'bg-paper-dark', panel: 'bg-paper-dark', dark: true },
  { strip: 'bg-boundary/[0.14]', panel: 'bg-boundary/[0.08]' },
  { strip: 'bg-navy/[0.09]', panel: 'bg-navy/[0.05]' },
  { strip: 'bg-teal/[0.14]', panel: 'bg-teal/[0.07]' },
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

  // Geometry for the width animation (xl and up). Every panel animates its own
  // width in pixels: the open one to OPEN, the rest to STRIP. The open panel's
  // content is laid out at OPEN from the start and the panel clips it, so as
  // the panel grows it reveals finished text instead of reflowing it.
  const rowRef = React.useRef<HTMLDivElement>(null);
  const [openWidth, setOpenWidth] = React.useState<number | null>(null);
  React.useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const measure = () => setOpenWidth(Math.max(0, row.clientWidth - (count - 1) * (STRIP_PX + GAP_PX)));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(row);
    return () => observer.disconnect();
    // Re-measured when the layout switches between the accordion and the row.
  }, [count, wide]);

  // The panel that is closing keeps its content for the length of the move,
  // fading it out, and only then turns back into a strip.
  const [leaving, setLeaving] = React.useState<number | null>(null);
  const shownRef = React.useRef(index);
  React.useEffect(() => {
    if (shownRef.current === index) return;
    const previous = shownRef.current;
    shownRef.current = index;
    if (!wide || reduced) return;
    setLeaving(previous);
    const timer = window.setTimeout(() => setLeaving(null), MOVE_MS);
    return () => window.clearTimeout(timer);
  }, [index, wide, reduced]);

  const sized = wide && openWidth !== null;

  return (
    <div ref={rootRef}>
      <div
        ref={rowRef}
        className="flex flex-col gap-2 xl:h-[30rem] xl:flex-row"
        style={sized ? ({ '--open-w': `${openWidth}px` } as React.CSSProperties) : undefined}
      >
        {items.map((item, i) => {
          const open = i === index;
          const isLeaving = i === leaving;
          const tone = tones[i % tones.length]!;
          const panelId = `principle-panel-${i}`;
          return (
            <div
              key={item.label}
              className={cn(
                'principle-panel relative overflow-hidden rounded-panel border border-rule',
                open ? tone.panel : tone.strip,
                tone.dark && 'border-paper-dark',
                sized ? 'xl:flex-none' : open ? 'xl:flex-[1_1_0%]' : 'xl:flex-[0_0_4.5rem]',
              )}
              style={sized ? { width: open ? openWidth! : STRIP_PX } : undefined}
            >
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
                  'flex w-full items-center gap-4 px-5 py-4 text-left',
                  'xl:absolute xl:inset-y-0 xl:left-0 xl:w-[4.5rem] xl:flex-col xl:items-center xl:justify-between xl:px-0 xl:py-6',
                  open || isLeaving ? 'xl:pointer-events-none xl:invisible' : 'principle-strip-in',
                  tone.dark ? 'text-paper' : 'text-ink',
                )}
              >
                <span className={cn('font-mono text-mono-eyebrow', tone.dark ? 'text-paper/70' : 'text-muted')}>{pad(i + 1)}</span>
                <span className="flex-1 text-body font-semibold xl:mb-auto xl:mt-4 xl:flex-none xl:whitespace-nowrap xl:[writing-mode:vertical-rl]">{item.label}</span>
                {open ? (
                  <Minus aria-hidden="true" className="size-5 shrink-0 xl:hidden" />
                ) : (
                  <Plus aria-hidden="true" className="size-5 shrink-0" />
                )}
              </button>

              {/* The open panel. While closing it stays, fading, for the length of the move. */}
              <div
                id={panelId}
                role="region"
                aria-label={item.label}
                aria-hidden={isLeaving ? true : undefined}
                // `hidden` alone loses to xl:flex, so closed panels get no display class at all.
                className={cn(
                  'px-5 pb-6 xl:h-full xl:items-center xl:p-10',
                  sized && 'xl:w-[var(--open-w)] xl:shrink-0',
                  open ? 'principle-panel-in xl:flex' : isLeaving ? 'principle-panel-out hidden xl:flex' : 'hidden',
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
                  <div>{visuals[i]}</div>
                </div>
              </div>

              {/* The countdown, along the open panel's foot. */}
              {open && wide && playing ? (
                <span aria-hidden="true" className="absolute inset-x-0 bottom-0 hidden h-1 xl:block">
                  <span
                    key={index}
                    className={cn('principle-timer absolute inset-y-0 left-0', tone.dark ? 'bg-teal' : 'bg-navy/60')}
                    style={{ animationDuration: `${ROTATE_MS}ms`, animationPlayState: running ? 'running' : 'paused' }}
                  />
                </span>
              ) : null}
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
