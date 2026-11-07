import { Building2, Users, type LucideIcon } from 'lucide-react';
import { Logo } from '@/components/rumiq';
import { cn } from '@/lib/utils';

/*
 * TEMPORARY LANDING PAGE — the business model as a three-node flow.
 *
 * A healthcare business sits on the left, Rumiq in the middle, and patients and
 * families on the right. One dot relays through the flow: it enters each node
 * and the same dot carries on out of it to the next (see "journey flows" in
 * globals.css for the timing). Left to right on wide screens, top to bottom on
 * phones. Under reduced motion the dots are hidden and the connectors stay.
 */

type Node = { label: string; icon?: LucideIcon; mark?: boolean };

/* Seconds for the dot to cross one connector. Every connector is the same width. */
const SEGMENT_SECONDS = 1.4;

/* Timing for connector `index` of `segments`: one shared cycle, one slot each.
   Keyframes exist for 2 to 4 connectors (globals.css). */
function relayStyle(index: number, segments: number): React.CSSProperties {
  const n = Math.min(4, Math.max(2, segments));
  return {
    '--relay-name-x': `relay-x-${n}`,
    '--relay-name-y': `relay-y-${n}`,
    '--relay-cycle': `${(n + 0.5) * SEGMENT_SECONDS}s`,
    '--relay-delay': `${index * SEGMENT_SECONDS}s`,
  } as React.CSSProperties;
}

export function ClientFlow({
  label,
  nodes,
  row = false,
}: {
  label: string;
  nodes: readonly Node[];
  /** Keep the flow left to right on phones too, at a smaller size. */
  row?: boolean;
}) {
  const segments = nodes.length - 1;
  return (
    <figure aria-label={label} className={cn('rounded-card border border-rule bg-paper md:p-10', row ? 'p-4 sm:p-8' : 'p-8')}>
      <ol className={cn('flex', row ? 'flex-row items-start' : 'flex-col sm:flex-row sm:items-start')}>
        {nodes.map((node, index) => {
          const isLast = index === nodes.length - 1;
          const Icon = node.icon;
          return (
            <li
              key={node.label}
              className={cn(
                'relative flex flex-col items-center gap-3 text-center',
                row ? 'flex-1' : 'sm:flex-1',
                !isLast && !row && 'pb-10 sm:pb-0',
              )}
            >
              {!isLast ? (
                <>
                  <span
                    aria-hidden="true"
                    className={cn('absolute left-1/2 h-px w-full bg-navy/20', row ? 'top-5 sm:top-7' : 'top-7 hidden sm:block')}
                  >
                    <span
                      className="journey-relay-x motion-reduce:hidden absolute -top-[0.15625rem] size-1.5 rounded-full bg-navy"
                      style={relayStyle(index, segments)}
                    />
                  </span>
                  <span aria-hidden="true" className={cn('absolute bottom-0 left-1/2 h-10 w-px bg-navy/20 sm:hidden', row && 'hidden')}>
                    <span
                      className="journey-relay-y motion-reduce:hidden absolute -left-[0.1875rem] size-1.5 rounded-full bg-navy"
                      style={relayStyle(index, segments)}
                    />
                  </span>
                </>
              ) : null}

              <span
                className={cn(
                  'relative z-10 flex items-center justify-center rounded-full border border-navy/30 bg-paper',
                  row ? 'size-10 sm:size-14' : 'size-14',
                )}
              >
                {node.mark ? (
                  <Logo variant="mark" width={28} />
                ) : Icon ? (
                  <Icon aria-hidden="true" className={cn('text-navy', row ? 'size-5 sm:size-6' : 'size-6')} strokeWidth={1.5} />
                ) : null}
              </span>
              <span className={cn('font-medium text-ink', row ? 'text-caption leading-tight sm:text-body' : 'text-body')}>
                {node.label}
              </span>
            </li>
          );
        })}
      </ol>
    </figure>
  );
}

/** The three nodes for the "Who we work with" flow. */
export const clientFlowNodes: Node[] = [
  { label: 'Healthcare business', icon: Building2 },
  { label: 'Rumiq', mark: true },
  { label: 'Patients and families', icon: Users },
];
