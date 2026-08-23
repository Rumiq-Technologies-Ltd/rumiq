'use client';

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Section 8.1 — the accordion is a component only. Every entry it renders comes
 * from Document 05 verbatim, placed by the Document 05 placement map. No FAQ
 * copy is authored anywhere in the codebase, and no entry may exist that is not
 * in Document 05 (Section 15).
 *
 * Built directly on the Radix primitive so the keyboard behaviour and the
 * aria-expanded wiring are correct, and so it takes the Section 5 tokens rather
 * than the shadcn defaults.
 */
export type FaqEntry = {
  /** The Document 05 entry id, so placement stays auditable. */
  id: string;
  question: string;
  answer: React.ReactNode;
};

export function FAQAccordion({
  entries,
  className,
}: {
  entries: FaqEntry[];
  className?: string;
}) {
  if (!entries?.length) return null;

  return (
    <AccordionPrimitive.Root
      type="single"
      collapsible
      className={cn('border-t border-rule', className)}
    >
      {entries.map((entry) => (
        <AccordionPrimitive.Item
          key={entry.id}
          value={entry.id}
          className="border-b border-rule"
        >
          <AccordionPrimitive.Header>
            <AccordionPrimitive.Trigger className="group flex w-full items-start justify-between gap-6 py-6 text-left transition-colors duration-120 hover:text-muted">
              <span className="max-w-measure text-h3 font-display font-semibold">
                {entry.question}
              </span>
              <Plus
                strokeWidth={1.5}
                aria-hidden
                className="mt-1 h-5 w-5 shrink-0 transition-transform duration-120 group-data-[state=open]:rotate-45 motion-reduce:transition-none"
              />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          {/* forceMount, so every answer is in the initial HTML rather than
              appearing only after a click. A reader with JavaScript off, and any
              crawler that does not interact, still gets the answer. Closed items
              are display:none, so assistive technology and tab order treat them
              as closed. The close animation is given up for that: you cannot
              animate to display:none. */}
          <AccordionPrimitive.Content
            forceMount
            className="overflow-hidden data-[state=closed]:hidden data-[state=open]:animate-accordion-down"
          >
            {/* The Document 05 id is the accordion item's value, so placement
                stays auditable in the DOM without being shown to a reader. */}
            <div className="pb-8">
              <div className="max-w-measure text-body text-muted">{entry.answer}</div>
            </div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}
