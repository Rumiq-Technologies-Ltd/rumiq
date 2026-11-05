'use client';

import * as React from 'react';
import { ChevronDown, PenLine, Search, TrendingUp, Video, type LucideIcon } from 'lucide-react';
import { SectionHeader } from '@/components/rumiq';
import { cn } from '@/lib/utils';

/* One icon per service group. Decorative, so hidden from assistive tech. Lives
   here, not in the page, because component functions cannot cross the server/
   client boundary as props. */
const groupIcons: Record<string, LucideIcon> = {
  'Search and discovery': Search,
  'Social and video': Video,
  'Content and brand': PenLine,
  'Patients and growth': TrendingUp,
};

/*
 * TEMPORARY LANDING PAGE — "What we do": the section header and a scroll-driven
 * accordion, pinned together as one screen.
 *
 * The header (eyebrow, headline, intro) and the four group cards pin as a
 * single panel, centred below the site header, so the text stays in view for
 * as long as the cards are being worked through. Scrolling then drives it:
 *
 *   pin → group 1 opens → group 2 → group 3 → group 4 → all shut → release
 *
 * On phones a whole group cannot sit on screen under the header, so each step
 * is one service instead: the open group shows its services one at a time,
 * with dots, before handing over to the next group. Same idea, smaller steps.
 *
 * A thin bar on the open card's label shows progress through its group, and
 * clicking a label scrolls to that group.
 *
 * How the pin works: the panel is sticky inside a taller "track"; how far the
 * track has scrolled past the pin line picks the step. While pinned, the cards
 * area reserves the height of its tallest open state, so the panel never
 * changes height: the pin releases the moment the last step ends, with no dead
 * scroll. Native scroll throughout; nothing hijacks the wheel.
 *
 * Fallback, by design: before the script has measured, without script, or on a
 * screen too short to hold the pinned panel, the header sits above a plain list
 * with every card open. Shut cards are collapsed visually, not hidden from
 * assistive tech, so screen readers get every service in every mode.
 */

type Service = { label: string; body: string };
type Group = { title: string; services: readonly Service[] };

type Mode = 'static' | 'groups' | 'services';
type Layout = { mode: Exclude<Mode, 'static'>; trackHeight: number; pinTop: number; step: number; cardsHeight: number; vh: number };

const HEADER_HEIGHT = 72;
const PHONE_MAX = 767;
/* Scroll per step, as a share of the viewport height. */
const STEP_SHARE = { groups: 0.38, services: 0.2 } as const;
/* The closing step ("all shut") is shorter than the others. */
const CLOSE_STEPS = 0.6;
/* Room for the service dots under a phone card. */
const DOTS_HEIGHT = 28;

export function ServiceStack({
  eyebrow,
  headline,
  intro,
  groups,
}: {
  eyebrow: string;
  headline: string;
  intro: string;
  groups: readonly Group[];
}) {
  const count = groups.length;
  const perGroup = Math.max(...groups.map((g) => g.services.length));

  const trackRef = React.useRef<HTMLDivElement>(null);
  const headRef = React.useRef<HTMLDivElement>(null);
  const cardsRef = React.useRef<HTMLDivElement>(null);
  const bodyRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const barRefs = React.useRef<(HTMLSpanElement | null)[]>([]);
  const layoutRef = React.useRef<Layout | null>(null);
  const measureRef = React.useRef<() => void>(() => {});

  const [layout, setLayout] = React.useState<Layout | null>(null);
  // Open group (-1 = none) and, on phones, the service showing inside it.
  const [open, setOpen] = React.useState({ group: -1, service: 0 });

  const mode: Mode = layout?.mode ?? 'static';
  const pinned = mode !== 'static';

  // Measure: does the panel, with its tallest open card, fit under the header?
  React.useLayoutEffect(() => {
    const measure = () => {
      const head = headRef.current;
      const cards = cardsRef.current;
      if (!head || !cards) return;
      const vh = window.innerHeight;
      const nextMode = window.innerWidth <= PHONE_MAX ? 'services' : 'groups';

      const bodies = bodyRefs.current.filter(Boolean) as HTMLDivElement[];
      // Natural content heights. Service items lay out the same in every mode, so
      // this holds whether the cards are currently open, shut or static.
      const lists = bodies.map((b) => b.querySelector<HTMLElement>('[role=list]'));
      const tallestBody =
        nextMode === 'groups'
          ? Math.max(...lists.map((l) => l?.offsetHeight ?? 0))
          : Math.max(...lists.flatMap((l) => Array.from(l?.children ?? []).map((li) => (li as HTMLElement).offsetHeight))) +
            DOTS_HEIGHT +
            1; // the list's top border
      // Shut height = the cards without their bodies, built from the label bars and borders, which never change: a body caught
      // mid-animation reports a height its card is clipping, so it can't be trusted.
      const articles = Array.from(cards.children) as HTMLElement[];
      const rowGap = parseFloat(getComputedStyle(cards).rowGap) || 0;
      const shutCards =
        articles.reduce((sum, a) => {
          const style = getComputedStyle(a);
          const borders = (parseFloat(style.borderTopWidth) || 0) + (parseFloat(style.borderBottomWidth) || 0);
          return sum + (a.querySelector('h3')?.getBoundingClientRect().height ?? 0) + borders;
        }, 0) + rowGap * (articles.length - 1);
      const gap = parseFloat(getComputedStyle(cards).marginTop) || 0;
      const cardsHeight = Math.ceil(shutCards + tallestBody);
      const panel = head.getBoundingClientRect().height + gap + cardsHeight;
      const room = vh - HEADER_HEIGHT - 24;

      if (panel > room) {
        layoutRef.current = null;
        setLayout(null);
        return;
      }
      const steps = (nextMode === 'groups' ? count : count * perGroup) + CLOSE_STEPS;
      const step = Math.round(vh * STEP_SHARE[nextMode]);
      const next: Layout = {
        mode: nextMode,
        step,
        cardsHeight,
        vh,
        pinTop: Math.round(HEADER_HEIGHT + Math.max(12, (vh - HEADER_HEIGHT - panel) / 2)),
        trackHeight: Math.round(panel + step * steps),
      };
      const prev = layoutRef.current;
      if (prev && JSON.stringify(prev) === JSON.stringify(next)) return;
      layoutRef.current = next;
      setLayout(next);
    };

    measureRef.current = measure;
    measure();
    // Re-measure when the viewport changes, and when content reflows (web
    // fonts landing). Lists keep their natural height while collapsed, so
    // opening and shutting cards never triggers this.
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure);
    if (headRef.current) observer?.observe(headRef.current);
    for (const card of Array.from(cardsRef.current?.children ?? [])) observer?.observe(card);
    for (const body of bodyRefs.current) {
      const list = body?.querySelector('[role=list]');
      if (list) observer?.observe(list);
    }
    // Late styles and fonts change every height; measure again once they land.
    window.addEventListener('resize', measure);
    window.addEventListener('load', measure);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', measure);
      window.removeEventListener('load', measure);
    };
  }, [count, perGroup]);

  // Scroll drives the step. Runs straight from the scroll event: one rect read
  // and four transforms, and React skips the render when nothing changed.
  React.useEffect(() => {
    if (!layout) {
      setOpen({ group: -1, service: 0 });
      return;
    }
    const per = layout.mode === 'groups' ? 1 : perGroup;
    const update = () => {
      const track = trackRef.current;
      const current = layoutRef.current;
      if (!track || !current) return;
      // A big change in viewport height that no resize event reported (some
      // browsers, device emulation): re-measure. Small changes, such as a phone's
      // address bar showing and hiding, are ignored so the pin does not jump.
      if (Math.abs(window.innerHeight - current.vh) > 120) measureRef.current();
      const travelled = current.pinTop - track.getBoundingClientRect().top;
      const index = travelled < 0 ? -1 : Math.floor(travelled / current.step);
      const group = index >= 0 && index < count * per ? Math.floor(index / per) : -1;
      const service = group >= 0 ? index % per : 0;
      setOpen((prev) => (prev.group === group && prev.service === service ? prev : { group, service }));
      // Progress through the open group, for its bar.
      const within = group >= 0 ? (travelled - group * per * current.step) / (per * current.step) : 0;
      barRefs.current.forEach((bar, i) => {
        if (bar) bar.style.transform = `scaleX(${i === group ? Math.min(1, Math.max(0, within)) : 0})`;
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [layout, count, perGroup]);

  // A label click scrolls to the start of that group.
  const goTo = (i: number) => {
    const track = trackRef.current;
    const current = layoutRef.current;
    if (!track || !current) return;
    const per = current.mode === 'groups' ? 1 : perGroup;
    const trackTop = track.getBoundingClientRect().top + window.scrollY;
    const target = trackTop - current.pinTop + current.step * (i * per + 0.15);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: target, behavior: reduce ? 'auto' : 'smooth' });
  };

  const total = String(count).padStart(2, '0');

  return (
    <div ref={trackRef} style={pinned ? { height: layout!.trackHeight } : undefined}>
      <div className={cn(pinned && 'sticky')} style={pinned ? { top: layout!.pinTop } : undefined}>
        <div ref={headRef}>
          <SectionHeader eyebrow={eyebrow} headline={headline} standfirst={intro} />
        </div>

        <div
          ref={cardsRef}
          className="mt-8 grid content-start gap-2 sm:gap-3 lg:mt-10"
          style={pinned ? { height: layout!.cardsHeight } : undefined}
        >
          {groups.map((group, i) => {
            const Icon = groupIcons[group.title];
            const isOpen = !pinned || open.group === i;
            const lit = pinned && isOpen;
            const LabelTag = pinned ? 'button' : 'div';
            const oneAtATime = mode === 'services';
            return (
              <article
                key={group.title}
                aria-labelledby={`service-group-${i}`}
                className={cn(
                  'overflow-hidden rounded-panel border bg-paper transition-[border-color,box-shadow] duration-500',
                  lit ? 'border-navy/30 shadow-[0_18px_40px_-28px_hsl(var(--paper-dark-hsl)/0.6)]' : 'border-rule',
                )}
              >
                <h3 id={`service-group-${i}`} className="m-0">
                  <LabelTag
                    {...(pinned ? { type: 'button' as const, onClick: () => goTo(i), 'aria-expanded': isOpen } : {})}
                    className={cn(
                      'relative flex h-12 w-full items-center gap-3 px-4 text-left transition-colors duration-500 sm:h-14 sm:px-7',
                      lit ? 'bg-navy text-paper' : 'bg-paper-raised text-navy',
                      pinned && !isOpen && 'hover:bg-rule/60',
                    )}
                  >
                    {Icon ? (
                      <span
                        className={cn(
                          'inline-flex size-8 shrink-0 items-center justify-center rounded-full transition-colors duration-500',
                          lit ? 'bg-paper text-navy' : 'bg-navy text-paper',
                        )}
                      >
                        <Icon aria-hidden="true" className="size-4" strokeWidth={1.75} />
                      </span>
                    ) : null}
                    <span className="truncate font-mono text-mono-eyebrow uppercase">{group.title}</span>
                    <span aria-hidden="true" className={cn('ml-auto shrink-0 font-mono text-mono-eyebrow', lit ? 'text-paper/70' : 'text-muted')}>
                      {String(i + 1).padStart(2, '0')} / {total}
                    </span>
                    {pinned ? (
                      <>
                        <ChevronDown
                          aria-hidden="true"
                          className={cn('size-4 shrink-0 transition-transform duration-500', isOpen && 'rotate-180')}
                        />
                        <span
                          ref={(el) => {
                            barRefs.current[i] = el;
                          }}
                          aria-hidden="true"
                          className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-teal"
                        />
                      </>
                    ) : null}
                  </LabelTag>
                </h3>

                {/* Collapsed with grid rows, so the height animates and the copy stays in the DOM. */}
                <div
                  ref={(el) => {
                    bodyRefs.current[i] = el;
                  }}
                  className={cn(
                    'grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                  )}
                >
                  <div className="min-h-0 overflow-hidden">
                    {/* A div list, not <ul>: the site's scroll-reveal forces every ul item to
                        full opacity, which would show all three phone services at once. */}
                    <div
                      role="list"
                      className={cn(
                        'border-t border-rule',
                        oneAtATime
                          ? // Phones: every service in one cell, one visible at a time.
                            'grid [grid-template-areas:"service"]'
                          : 'grid divide-y divide-rule md:grid-cols-3 md:divide-x md:divide-y-0',
                      )}
                    >
                      {group.services.map((service, s) => {
                        const showing = !oneAtATime || open.service === s;
                        return (
                          <div
                            role="listitem"
                            key={service.label}
                            className={cn(
                              'px-4 py-4 sm:px-7 sm:py-5 md:py-6',
                              oneAtATime && '[grid-area:service] transition-[opacity,transform] duration-500',
                              oneAtATime && (showing ? 'opacity-100' : 'pointer-events-none translate-y-1 opacity-0'),
                            )}
                          >
                            <h4 className="text-body-l font-semibold sm:text-h3">{service.label}</h4>
                            <p className="mt-1.5 text-caption text-muted sm:mt-2">{service.body}</p>
                          </div>
                        );
                      })}
                    </div>
                    {oneAtATime ? (
                      <div aria-hidden="true" className="flex h-7 items-start justify-center gap-1.5">
                        {group.services.map((service, s) => (
                          <span
                            key={service.label}
                            className={cn(
                              'h-1.5 rounded-full transition-all duration-300',
                              open.service === s ? 'w-5 bg-navy' : 'w-1.5 bg-rule',
                            )}
                          />
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
