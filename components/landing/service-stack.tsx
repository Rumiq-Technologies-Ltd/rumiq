'use client';

import * as React from 'react';
import { ChevronDown, PenLine, Search, TrendingUp, Video, type LucideIcon } from 'lucide-react';
import { SectionHeader } from '@/components/rumiq';
import { cn } from '@/lib/utils';
import { serviceTones } from '@/components/landing/service-tones';
import { MobileServices } from '@/components/landing/service-mobile';

/* One icon per service group. Decorative, so hidden from assistive tech. Lives
   here, not in the page, because component functions cannot cross the server/
   client boundary as props. */
const groupIcons: Record<string, LucideIcon> = {
  'Search & discovery': Search,
  'Social & video': Video,
  'Content & brand': PenLine,
  'Access & growth': TrendingUp,
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
 * Phones (<= 767px) get a separate tap-and-swipe layout (service-mobile.tsx),
 * chosen by CSS so there is no flash on load; this pinned version is hidden there.
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

type Layout = { trackHeight: number; pinTop: number; step: number; cardsHeight: number; vh: number };

const HEADER_HEIGHT = 72;
/* Scroll per step, as a share of the viewport height. */
const STEP_SHARE = 0.5472;
/* The closing step ("all shut") is shorter than the others. */
const CLOSE_STEPS = 0.6;

function ServiceStackDesktop({
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

  const trackRef = React.useRef<HTMLDivElement>(null);
  const headRef = React.useRef<HTMLDivElement>(null);
  const cardsRef = React.useRef<HTMLDivElement>(null);
  const bodyRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const barRefs = React.useRef<(HTMLSpanElement | null)[]>([]);
  const layoutRef = React.useRef<Layout | null>(null);
  const measureRef = React.useRef<() => void>(() => {});

  const [layout, setLayout] = React.useState<Layout | null>(null);
  // Open group, -1 = none.
  const [open, setOpen] = React.useState(-1);

  const pinned = layout !== null;

  // Measure: does the panel, with its tallest open card, fit under the header?
  React.useLayoutEffect(() => {
    const measure = () => {
      const head = headRef.current;
      const cards = cardsRef.current;
      if (!head || !cards) return;
      // Hidden (phones show the other layout): nothing to measure or pin.
      if (!head.offsetParent) {
        layoutRef.current = null;
        setLayout(null);
        return;
      }
      const vh = window.innerHeight;

      const bodies = bodyRefs.current.filter(Boolean) as HTMLDivElement[];
      // Natural content heights. Service items lay out the same in every mode, so
      // this holds whether the cards are currently open, shut or static.
      const lists = bodies.map((b) => b.querySelector<HTMLElement>('[role=list]'));
      const tallestBody = Math.max(...lists.map((l) => l?.offsetHeight ?? 0));
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
      const steps = count + CLOSE_STEPS;
      const step = Math.round(vh * STEP_SHARE);
      const next: Layout = {
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
  }, [count]);

  // Scroll drives the step. Runs straight from the scroll event: one rect read
  // and four transforms, and React skips the render when nothing changed.
  React.useEffect(() => {
    if (!layout) {
      setOpen(-1);
      return;
    }
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
      const group = index >= 0 && index < count ? index : -1;
      setOpen((prev) => (prev === group ? prev : group));
      // Progress through the open group, for its bar.
      const within = group >= 0 ? (travelled - group * current.step) / current.step : 0;
      barRefs.current.forEach((bar, i) => {
        if (bar) bar.style.transform = `scaleX(${i === group ? Math.min(1, Math.max(0, within)) : 0})`;
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [layout, count]);

  // A label click scrolls to the start of that group.
  const goTo = (i: number) => {
    const track = trackRef.current;
    const current = layoutRef.current;
    if (!track || !current) return;
    const trackTop = track.getBoundingClientRect().top + window.scrollY;
    const target = trackTop - current.pinTop + current.step * (i + 0.15);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: target, behavior: reduce ? 'auto' : 'smooth' });
  };

  const total = String(count).padStart(2, '0');

  return (
    <div ref={trackRef} style={pinned ? { height: layout!.trackHeight } : undefined}>
      <div className={cn(pinned && 'sticky')} style={pinned ? { top: layout!.pinTop } : undefined}>
        <div ref={headRef}>
          <SectionHeader eyebrow={eyebrow} headline={headline} standfirst={intro} headlineClassName="text-navy" eyebrowClassName="text-[1.125rem] font-medium text-teal" />
        </div>

        <div
          ref={cardsRef}
          className="mt-8 grid content-start gap-2 sm:gap-3 lg:mt-10"
          style={pinned ? { height: layout!.cardsHeight } : undefined}
        >
          {groups.map((group, i) => {
            const Icon = groupIcons[group.title];
            const tone = serviceTones[i % serviceTones.length]!;
            const isOpen = !pinned || open === i;
            const lit = pinned && isOpen;
            const LabelTag = pinned ? 'button' : 'div';
            return (
              <article
                key={group.title}
                aria-labelledby={`service-group-${i}`}
                className={cn(
                  'overflow-hidden rounded-panel border transition-[border-color,box-shadow] duration-500',
                  // Always the body tone: the label bar paints its own, and a shut card shows only the bar. Switching this
                  // with isOpen would flash the bar color behind the body while it collapses.
                  tone.panel,
                  tone.dark ? 'border-paper-dark' : lit ? 'border-navy/30' : 'border-rule',
                  lit && 'shadow-[0_18px_40px_-28px_hsl(var(--paper-dark-hsl)/0.6)]',
                )}
              >
                <h3 id={`service-group-${i}`} className="m-0">
                  <LabelTag
                    {...(pinned ? { type: 'button' as const, onClick: () => goTo(i), 'aria-expanded': isOpen } : {})}
                    className={cn(
                      'relative flex h-12 w-full items-center gap-3 px-4 text-left transition-colors duration-500 sm:h-14 sm:px-7',
                      tone.strip,
                      tone.dark ? 'text-paper' : 'text-navy',
                      pinned && !isOpen && !tone.dark && 'hover:brightness-95',
                    )}
                  >
                    {Icon ? (
                      <span
                        className={cn(
                          'inline-flex size-8 shrink-0 items-center justify-center rounded-full transition-colors duration-500',
                          tone.dark ? 'bg-paper text-navy' : 'bg-navy text-paper',
                        )}
                      >
                        <Icon aria-hidden="true" className="size-4" strokeWidth={1.75} />
                      </span>
                    ) : null}
                    <span className="truncate font-mono text-mono-eyebrow uppercase">{group.title}</span>
                    <span aria-hidden="true" className={cn('ml-auto shrink-0 font-mono text-mono-eyebrow', tone.dark ? 'text-paper/70' : 'text-muted')}>
                      {String(i + 1).padStart(2, '0')} / {total}
                    </span>
                    {pinned ? (
                      <>
                        <ChevronDown
                          aria-hidden="true"
                          className={cn('size-4 shrink-0 transition-transform duration-500', isOpen && 'rotate-180')}
                        />
                        {/* A faint track under the open card's bar, so the progress reads as "this far of that". */}
                        <span
                          aria-hidden="true"
                          className={cn(
                            'absolute inset-x-0 bottom-0 h-1 transition-opacity duration-500',
                            tone.dark ? 'bg-paper/20' : 'bg-navy/10',
                            isOpen ? 'opacity-100' : 'opacity-0',
                          )}
                        />
                        <span
                          ref={(el) => {
                            barRefs.current[i] = el;
                          }}
                          aria-hidden="true"
                          className={cn('absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0', tone.dark ? 'bg-teal' : 'bg-navy/80')}
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
                    <div role="list" className="grid border-t border-rule md:grid-cols-3">
                      {group.services.map((service, index) => (
                        <div
                          role="listitem"
                          key={service.label}
                          className={cn(
                            'relative px-4 py-3 sm:px-7 sm:py-3 md:py-3',
                            // A short navy line between the services, set in from the top and bottom
                            // instead of running the full height of the card.
                            index > 0 && "before:absolute before:bottom-5 before:left-0 before:top-5 before:w-px before:bg-navy/25 before:content-['']",
                          )}
                        >
                          <h4 className="text-body-l font-semibold text-navy sm:text-h3">{service.label}</h4>
                          <p className="mt-1.5 text-caption text-muted sm:mt-2">{service.body}</p>
                        </div>
                      ))}
                    </div>
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

/* Both layouts are in the DOM; CSS shows one. Phones get the tap-and-swipe version. */
export function ServiceStack(props: {
  eyebrow: string;
  headline: string;
  intro: string;
  groups: readonly Group[];
}) {
  return (
    <>
      <div className="hidden md:block">
        <ServiceStackDesktop {...props} />
      </div>
      <div className="md:hidden">
        <SectionHeader eyebrow={props.eyebrow} headline={props.headline} standfirst={props.intro} headlineClassName="text-navy" eyebrowClassName="text-[1.125rem] font-medium text-teal" />
        <MobileServices groups={props.groups} />
      </div>
    </>
  );
}
