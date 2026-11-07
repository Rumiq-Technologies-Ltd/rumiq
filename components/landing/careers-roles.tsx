import * as React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

/*
 * TEMPORARY LANDING PAGE — the open roles, as slim rows that open their own page.
 *
 * The landing page only shows the basics: the facts every role shares, once,
 * as a slim strip (five columns from lg up, a swipeable row below), then one
 * row per role with its title and a one-line summary. Each whole row is a link
 * to /careers/[slug], where the full role lives. Keeps the section about three
 * rows tall however many details a role has.
 */

type Role = { id: string; title: string; summary: string };
type Fact = { label: string; value: string };

export function CareersRoles({
  roles,
  facts,
  header,
}: {
  /** The section heading. */
  header: React.ReactNode;
  roles: readonly Role[];
  facts: readonly Fact[];
}) {
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

      <ul className="mt-5 grid gap-3">
        {roles.map((role) => (
          <li key={role.id}>
            <Link
              href={`/careers/${role.id}`}
              className="group flex items-center gap-4 rounded-panel border border-paper/15 bg-paper/[0.04] p-4 transition-colors duration-300 hover:bg-paper/[0.09] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper sm:gap-6 sm:px-6"
            >
              <span className="min-w-0 flex-1">
                <span className="block text-body-l font-semibold text-paper sm:text-h3">{role.title}</span>
                <span className="mt-1 block text-caption text-paper/75">{role.summary}</span>
              </span>
              <span className="hidden shrink-0 text-body font-medium text-paper sm:inline">View role</span>
              <span
                aria-hidden="true"
                className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-paper/30 text-paper transition-colors group-hover:bg-paper group-hover:text-navy"
              >
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
