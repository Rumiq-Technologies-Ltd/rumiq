'use client';

import * as React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { Card, Eyebrow, ModuleCard, PlaneTag } from '@/components/rumiq';
import { platform, type PlatformModule } from '@/content/platform';
import { cn } from '@/lib/utils';

/**
 * Section 8.2 — the module grid for one plane.
 *
 * A module with a deep page is a link. A module without one opens a detail
 * drawer, so nothing on this page is a dead end. The drawer is the Radix Dialog
 * primitive, which brings the focus trap, the Escape handling and the return of
 * focus to the trigger with it.
 *
 * No status chips: SHOW_MODULE_STATUS is false, and <ModuleCard> is not passed
 * a status here at all.
 */
export function ModuleGrid({ modules }: { modules: readonly PlatformModule[] }) {
  const [openId, setOpenId] = React.useState<string | null>(null);
  // The trigger is a card, not a Dialog.Trigger, so focus return is ours to do.
  const lastTrigger = React.useRef<HTMLButtonElement | null>(null);
  const active = modules.find((module) => module.id === openId) ?? null;

  return (
    <>
      <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {modules.map((module) =>
          module.href ? (
            <li key={module.id}>
              <ModuleCard
                plane={module.plane}
                name={module.name}
                description={module.description}
                href={module.href}
              />
            </li>
          ) : (
            <li key={module.id}>
              <Card interactive className="h-full p-0">
                <button
                  type="button"
                  onClick={(event) => {
                    lastTrigger.current = event.currentTarget;
                    setOpenId(module.id);
                  }}
                  aria-haspopup="dialog"
                  className="h-full w-full rounded-card p-5 text-left"
                >
                  <PlaneTag plane={module.plane} />
                  <h3 className="mt-5 text-h3 font-semibold">{module.name}</h3>
                  <p className="mt-3 text-caption text-muted">{module.description}</p>
                  <p className="mt-6 font-mono text-mono-eyebrow uppercase text-muted">
                    Open detail
                  </p>
                </button>
              </Card>
            </li>
          ),
        )}
      </ul>

      <Dialog.Root
        open={openId !== null}
        onOpenChange={(next) => {
          if (next) return;
          setOpenId(null);
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-navy/50" />
          <Dialog.Content
            // Radix has no trigger to restore focus to here, since the trigger
            // is a card rather than a Dialog.Trigger. Section 13: focus must go
            // back where it came from.
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              lastTrigger.current?.focus();
            }}
            className={cn(
              'fixed right-0 top-0 z-50 flex h-full w-full max-w-[480px] flex-col overflow-y-auto',
              'border-l border-rule bg-paper-raised',
            )}
          >
            {active ? (
              <>
                <div className="flex items-start justify-between gap-6 border-b border-rule p-6">
                  <div>
                    <PlaneTag plane={active.plane} />
                    <Dialog.Title className="mt-4 font-display text-h3 font-semibold">
                      {active.name}
                    </Dialog.Title>
                  </div>
                  <Dialog.Close className="inline-flex shrink-0 items-center gap-2 rounded-button px-2 py-2 font-mono text-mono-eyebrow uppercase text-muted hover:text-ink">
                    <X strokeWidth={1.5} aria-hidden className="h-4 w-4" />
                    {platform.drawer.close}
                  </Dialog.Close>
                </div>

                <div className="space-y-8 p-6">
                  <Dialog.Description className="text-body text-muted">
                    {active.description}
                  </Dialog.Description>

                  <div>
                    <Eyebrow>{platform.drawer.problemLabel}</Eyebrow>
                    <p className="mt-3 text-caption text-muted">{active.detail.problem}</p>
                  </div>

                  <div>
                    <Eyebrow>{platform.drawer.doesLabel}</Eyebrow>
                    <ul className="mt-3 space-y-2">
                      {active.detail.does.map((item) => (
                        <li key={item} className="border-b border-rule pb-2 text-caption">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <Eyebrow>{platform.drawer.boundaryLabel}</Eyebrow>
                    <p className="mt-3 text-caption text-muted">{active.detail.boundary}</p>
                  </div>

                  <p className="font-mono text-mono-eyebrow uppercase text-muted">
                    {platform.drawer.noPage}
                  </p>
                </div>
              </>
            ) : null}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
