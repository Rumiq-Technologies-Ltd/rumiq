'use client';

import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { Button, Eyebrow } from '@/components/rumiq';
import { cn } from '@/lib/utils';

/*
 * TEMPORARY LANDING PAGE — the open roles, one at a time, kept short.
 *
 * The facts every role shares (type, location, contract, hours, accommodation)
 * sit once, as a strip above the tabs, instead of inside each role. The chosen
 * role's panel has the title and summary with how to apply beside them (below
 * them on smaller screens), then the two lists side by side across the full
 * panel, so most points fit on one line. The tabs sit beside the section
 * heading from lg up. Arrow keys, Home and End move
 * between the tabs. Below the medium breakpoint the lists fold closed.
 */

type Role = {
  id: string;
  tabLabel: string;
  title: string;
  summary: string;
  youllWorkOn: readonly string[];
  youllBring: readonly string[];
  applySubject: string;
};

type Fact = { label: string; value: string };

/*
 * A list that folds away below the medium breakpoint and is closed by default.
 * From md up it is always open, so nothing is hidden where there is room.
 */
function FoldableList({
  id,
  title,
  items,
}: {
  id: string;
  title: string;
  items: readonly string[];
}) {
  const [open, setOpen] = React.useState(false);
  const [wide, setWide] = React.useState(false);
  const listId = `${id}-list`;

  // Below the medium breakpoint the title is a toggle. At and above it the list is
  // always shown, so the toggle is not rendered there at all: no control that
  // does nothing, and no false "collapsed" state announced to assistive tech.
  React.useEffect(() => {
    const query = window.matchMedia('(min-width: 768px)');
    const update = () => setWide(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  const heading = (
    <span className="flex w-full items-center justify-between gap-4 py-3 font-medium text-paper md:py-0">
      {title}
      {!wide ? (
        <ChevronDown aria-hidden="true" className={cn('size-5 shrink-0 transition-transform duration-200', open && 'rotate-180')} />
      ) : null}
    </span>
  );

  return (
    <div>
      {wide ? (
        <p className="pb-0">{heading}</p>
      ) : (
        <button
          type="button"
          aria-expanded={open}
          aria-controls={listId}
          onClick={() => setOpen((value) => !value)}
          className="block w-full text-left md:hidden"
        >
          {heading}
        </button>
      )}
      <ul id={listId} className={cn('space-y-2 pb-4 text-caption text-paper/80 md:mt-3 md:pb-0', open ? 'block' : 'hidden', 'md:block')}>
        {items.map((item) => (
          <li key={item} className="relative pl-4">
            <span aria-hidden="true" className="absolute left-0 top-[0.6em] size-1.5 rounded-full bg-teal" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CareersRoles({
  roles,
  facts,
  email,
  applicationsNote,
  header,
}: {
  /** The section heading. From lg up the role tabs sit beside it. */
  header: React.ReactNode;
  roles: readonly Role[];
  facts: readonly Fact[];
  email: string;
  applicationsNote: string;
}) {
  const [selected, setSelected] = React.useState(0);
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const role = roles[selected]!;

  const select = (index: number) => {
    setSelected(index);
    tabRefs.current[index]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const last = roles.length - 1;
    if (event.key === 'ArrowRight') select(selected === last ? 0 : selected + 1);
    else if (event.key === 'ArrowLeft') select(selected === 0 ? last : selected - 1);
    else if (event.key === 'Home') select(0);
    else if (event.key === 'End') select(last);
    else return;
    event.preventDefault();
  };

  const applyHref = `mailto:${email}?subject=${encodeURIComponent(role.applySubject)}`;

  return (
    <>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
        <div className="lg:max-w-[46rem]">{header}</div>
        <div role="tablist" aria-label="Open roles" className="flex shrink-0 flex-col gap-1.5 rounded-panel border border-paper/15 bg-paper/[0.04] p-1.5 sm:inline-flex sm:flex-row sm:self-start sm:gap-2 lg:self-auto">
          {roles.map((item, index) => {
            const active = index === selected;
            return (
              <button
                key={item.id}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                id={`tab-${item.id}`}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls={`panel-${item.id}`}
                tabIndex={active ? 0 : -1}
                onClick={() => setSelected(index)}
                onKeyDown={onKeyDown}
                className={cn(
                  'whitespace-nowrap rounded-button px-4 py-2.5 text-left text-body font-medium transition-colors duration-120 sm:text-center',
                  active ? 'bg-paper text-navy' : 'text-paper/80 hover:bg-paper/10 hover:text-paper',
                )}
              >
                {item.tabLabel}
              </button>
            );
          })}
        </div>
      </div>

      {/* What every role shares, said once. */}
      <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-paper/15 py-5 lg:mt-10 lg:grid-cols-5 lg:gap-x-8">
        {facts.map((fact, index) => (
          <div key={fact.label} className={cn(index === facts.length - 1 && 'col-span-2 lg:col-span-1')}>
            <dt className="font-mono text-mono-eyebrow uppercase text-paper/60">{fact.label}</dt>
            <dd className="mt-1 text-caption text-paper">{fact.value}</dd>
          </div>
        ))}
      </dl>

      <article
        key={role.id}
        id={`panel-${role.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${role.id}`}
        className="mt-6 rounded-panel border border-paper/15 bg-paper/[0.04] p-5 sm:p-8"
      >
        {/* Role on the left; from lg up, how to apply on the right. */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-12">
          <div>
            <Eyebrow tone="inverted">Now hiring</Eyebrow>
            <h3 className="mt-3 text-h3 font-semibold text-paper">{role.title}</h3>
            <p className="mt-3 max-w-measure text-body text-paper/80">{role.summary}</p>
          </div>
          <div className="order-last lg:order-none">
            <p className="text-caption text-paper">
              Email your CV and portfolio to{' '}
              <a href={`mailto:${email}`} className="break-all underline decoration-paper/40 underline-offset-4 hover:decoration-paper sm:break-normal">
                {email}
              </a>
              , with “{role.applySubject}” in the subject line.
            </p>
            <p className="mt-2 text-caption text-paper/70">{applicationsNote}</p>
            <Button asChild inverted size="lg" className="mt-4">
              <a href={applyHref}>Apply by email</a>
            </Button>
          </div>

          <div className="grid border-t border-paper/15 md:grid-cols-2 md:gap-x-10 md:pt-6 lg:col-span-2 lg:gap-x-14">
            <div className="border-b border-paper/15 md:border-0">
              <FoldableList id={`${role.id}-work`} title="You’ll work on:" items={role.youllWorkOn} />
            </div>
            <div className="border-b border-paper/15 md:border-0">
              <FoldableList id={`${role.id}-bring`} title="You’ll bring:" items={role.youllBring} />
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
