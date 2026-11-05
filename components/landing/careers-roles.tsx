'use client';

import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { Button, Eyebrow } from '@/components/rumiq';
import { cn } from '@/lib/utils';

/*
 * TEMPORARY LANDING PAGE — the open roles, one at a time.
 *
 * Two roles are shown as tabs above one panel. The tabs carry the role names,
 * so a reader sees both options before choosing, and only the chosen role's
 * detail takes space. The panel keeps the layout that was approved: summary and
 * facts on the left, the two lists on the right, and apply beneath. Arrow keys,
 * Home and End move between the tabs.
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
 * A list that folds away below the large breakpoint and is closed by default.
 * On wide screens it is always open, so nothing is hidden where there is room.
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

  // Below the large breakpoint the title is a toggle. At and above it the list is
  // always shown, so the toggle is not rendered there at all: no control that
  // does nothing, and no false "collapsed" state announced to assistive tech.
  React.useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)');
    const update = () => setWide(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  const heading = (
    <span className="flex w-full items-center justify-between gap-4 border-b border-paper/15 pb-3 font-medium text-paper lg:border-0 lg:pb-0">
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
          className="block w-full text-left lg:hidden"
        >
          {heading}
        </button>
      )}
      <ul id={listId} className={cn('mt-4 space-y-3 text-body text-paper/80', open ? 'block' : 'hidden', 'lg:block')}>
        {items.map((item) => (
          <li key={item} className="border-b border-paper/15 pb-3">
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
}: {
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
    <div className="mt-12">
      <div role="tablist" aria-label="Open roles" className="flex flex-col gap-1.5 rounded-panel border border-paper/15 bg-paper/[0.04] p-1.5 sm:inline-flex sm:flex-row sm:gap-2">
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
                'rounded-button px-4 py-2.5 text-left text-body font-medium transition-colors duration-120 sm:text-center',
                active ? 'bg-paper text-navy' : 'text-paper/80 hover:bg-paper/10 hover:text-paper',
              )}
            >
              {item.tabLabel}
            </button>
          );
        })}
      </div>

      <article
        key={role.id}
        id={`panel-${role.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${role.id}`}
        className="principle-enter mt-6 grid gap-10 rounded-panel border border-paper/15 bg-paper/[0.04] p-6 sm:p-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-x-16"
      >
        <div className="lg:col-start-1 lg:row-start-1">
          <Eyebrow tone="inverted">Now hiring</Eyebrow>
          <h3 className="mt-4 text-h2 font-semibold text-paper">{role.title}</h3>
          <p className="mt-5 text-body-l text-paper/80">{role.summary}</p>

          <dl className="mt-8 grid gap-4 border-t border-paper/15 pt-6 sm:grid-cols-2">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="font-mono text-mono-eyebrow uppercase text-paper/60">{fact.label}</dt>
                <dd className="mt-1 text-body text-paper">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <FoldableList id={`${role.id}-work`} title="You’ll work on:" items={role.youllWorkOn} />
          <FoldableList id={`${role.id}-bring`} title="You’ll bring:" items={role.youllBring} />
        </div>

        <div className="lg:col-start-1 lg:row-start-2 lg:self-end">
          <p className="text-body text-paper">
            Email your CV and portfolio to{' '}
            <a href={`mailto:${email}`} className="break-all underline decoration-paper/40 underline-offset-4 hover:decoration-paper sm:break-normal">
              {email}
            </a>
            , with “{role.applySubject}” in the subject line.
          </p>
          <p className="mt-4 text-caption text-paper/70">{applicationsNote}</p>
          <div className="mt-8">
            <Button asChild inverted size="lg">
              <a href={applyHref}>Apply by email</a>
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
}
