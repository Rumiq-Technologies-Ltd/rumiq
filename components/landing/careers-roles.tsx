'use client';

import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/rumiq';
import { cn } from '@/lib/utils';

/*
 * TEMPORARY LANDING PAGE — the open roles, as slim rows that open one at a time.
 *
 * Built to take little height. Each role is a single row: title, one-line
 * summary and an Apply button, always in view. Opening a row (one at a time)
 * reveals the two lists and how to apply, side by side, so the section stays
 * about three rows tall until a visitor asks for more. The facts every role
 * shares (type, location, contract, hours, accommodation) sit once as a slim
 * strip above the rows: five columns from lg up, a swipeable row below. Nothing
 * is dropped: shut rows stay in the page and open with their button.
 *
 * Standard accordion semantics: each title is a button with aria-expanded, the
 * panel is a labelled region, and a shut panel is inert so its links and text
 * leave the tab order until it opens.
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

function BulletList({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div>
      <p className="font-medium text-paper">{title}</p>
      <ul className="mt-3 space-y-2 text-caption text-paper/80">
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
  /** The section heading. */
  header: React.ReactNode;
  roles: readonly Role[];
  facts: readonly Fact[];
  email: string;
  applicationsNote: string;
}) {
  // One role open at a time; -1 = all shut.
  const [open, setOpen] = React.useState(-1);

  return (
    <>
      <div className="lg:max-w-[52rem]">{header}</div>

      {/* What every role shares, said once. */}
      <dl className="mt-6 flex snap-x gap-x-6 overflow-x-auto border-y border-paper/15 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mt-8 lg:grid lg:grid-cols-5 lg:gap-x-8 lg:overflow-visible">
        {facts.map((fact) => (
          <div key={fact.label} className="w-44 shrink-0 snap-start sm:w-52 lg:w-auto">
            <dt className="font-mono text-mono-eyebrow uppercase text-paper/60">{fact.label}</dt>
            <dd className="mt-1 text-caption text-paper">{fact.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 grid gap-3">
        {roles.map((role, index) => {
          const isOpen = open === index;
          const applyHref = `mailto:${email}?subject=${encodeURIComponent(role.applySubject)}`;
          return (
            <article
              key={role.id}
              className={cn(
                'overflow-hidden rounded-panel border border-paper/15 transition-colors duration-300',
                isOpen ? 'bg-paper/[0.08]' : 'bg-paper/[0.04]',
              )}
            >
              <div className="flex items-center gap-6 p-4 sm:px-6 sm:py-4">
                <h3 className="m-0 min-w-0 flex-1">
                  <button
                    type="button"
                    id={`role-${role.id}`}
                    aria-expanded={isOpen}
                    aria-controls={`panel-${role.id}`}
                    onClick={() => setOpen(isOpen ? -1 : index)}
                    className="group grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper"
                  >
                    <span className="col-start-1 row-start-1 text-body-l font-semibold text-paper sm:text-h3">{role.title}</span>
                    <span className="col-span-2 row-start-2 text-caption font-normal text-paper/75 sm:col-span-1">{role.summary}</span>
                    <span
                      aria-hidden="true"
                      className="col-start-2 row-start-1 inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-paper/30 text-paper transition-colors group-hover:bg-paper/10 sm:row-span-2"
                    >
                      <ChevronDown className={cn('size-4 transition-transform duration-300', isOpen && 'rotate-180')} />
                    </span>
                  </button>
                </h3>
                {/* On phones the button lives inside the opened role, to keep the shut rows slim. */}
                <Button asChild inverted size="md" className="hidden shrink-0 sm:inline-flex">
                  <a href={applyHref}>Apply by email</a>
                </Button>
              </div>

              {/* Collapsed with grid rows so the height animates; inert while shut. */}
              <div
                id={`panel-${role.id}`}
                role="region"
                aria-labelledby={`role-${role.id}`}
                inert={isOpen ? undefined : true}
                className={cn(
                  'grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
                  isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                )}
              >
                <div className="min-h-0 overflow-hidden">
                  <div className="border-t border-paper/15 px-4 pb-5 pt-5 sm:px-6">
                    <div className="grid gap-6 md:grid-cols-2 md:gap-x-10">
                      <BulletList title="You’ll work on:" items={role.youllWorkOn} />
                      <BulletList title="You’ll bring:" items={role.youllBring} />
                    </div>
                    <div className="mt-5 border-t border-paper/15 pt-4">
                      <p className="text-caption text-paper">
                        Email your CV and portfolio to{' '}
                        <a href={`mailto:${email}`} className="break-all underline decoration-paper/40 underline-offset-4 hover:decoration-paper sm:break-normal">
                          {email}
                        </a>
                        , with “{role.applySubject}” in the subject line.
                      </p>
                      <p className="mt-1 text-caption text-paper/70">{applicationsNote}</p>
                      <Button asChild inverted size="md" className="mt-4 sm:hidden">
                        <a href={applyHref}>Apply by email</a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
