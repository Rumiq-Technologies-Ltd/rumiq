'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { consentCopy } from '@/content/site';
import {
  CONSENT_CHANGE_EVENT,
  CONSENT_OPEN_EVENT,
  allowAll,
  denyAll,
  readConsent,
  writeConsent,
  type ConsentRecord,
} from '@/lib/consent';
import { Button } from './button';
import { Eyebrow } from './eyebrow';

/**
 * Section 7.4 — bottom-anchored, not a modal, not full-screen.
 *
 * Three toggles with Necessary locked on. Accept all and Reject all are
 * rendered identically, at equal visual weight (Section 4.3). Manage
 * preferences expands in place. The choice is stored in a first-party cookie
 * and can be reopened from the footer.
 *
 * No tracking script fires until a choice is recorded, and this build ships
 * with no tracking script at all. lib/consent.ts is the only gate through which
 * one could ever load.
 */
export function ConsentBanner() {
  const [visible, setVisible] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [analytics, setAnalytics] = React.useState(false);
  const [marketing, setMarketing] = React.useState(false);

  const hydrate = React.useCallback((record: ConsentRecord | null) => {
    setAnalytics(record?.analytics ?? false);
    setMarketing(record?.marketing ?? false);
  }, []);

  React.useEffect(() => {
    const record = readConsent();
    hydrate(record);
    setVisible(record === null);

    const onOpen = () => {
      hydrate(readConsent());
      setExpanded(true);
      setVisible(true);
    };
    const onChange = () => hydrate(readConsent());

    window.addEventListener(CONSENT_OPEN_EVENT, onOpen);
    window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
    return () => {
      window.removeEventListener(CONSENT_OPEN_EVENT, onOpen);
      window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
    };
  }, [hydrate]);

  const close = () => {
    setVisible(false);
    setExpanded(false);
  };

  const acceptAll = () => {
    writeConsent(allowAll());
    close();
  };

  const rejectAll = () => {
    writeConsent(denyAll());
    close();
  };

  const saveChoices = () => {
    writeConsent({
      ...denyAll(),
      analytics,
      marketing,
    });
    close();
  };

  if (!visible) return null;

  const toggleState: Record<'necessary' | 'analytics' | 'marketing', boolean> = {
    necessary: true,
    analytics,
    marketing,
  };

  const setToggle = (id: 'analytics' | 'marketing', next: boolean) => {
    if (id === 'analytics') setAnalytics(next);
    if (id === 'marketing') setMarketing(next);
  };

  return (
    <div
      role="region"
      aria-label="Cookie choices"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-rule bg-paper-raised"
    >
      <div className="mx-auto max-w-content px-6 py-6 lg:pl-gutter">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-measure">
            <Eyebrow>{consentCopy.title}</Eyebrow>
            <p className="mt-3 text-caption text-muted">{consentCopy.body}</p>
            <p className="mt-3 text-caption text-muted">{consentCopy.note}</p>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-3">
            {/* Equal visual weight, per Section 4.3. Same variant, same size. */}
            <Button variant="secondary" onClick={acceptAll}>
              {consentCopy.acceptAll}
            </Button>
            <Button variant="secondary" onClick={rejectAll}>
              {consentCopy.rejectAll}
            </Button>
            <Button
              variant="ghost"
              aria-expanded={expanded}
              onClick={() => setExpanded((value) => !value)}
            >
              {consentCopy.manage}
            </Button>
          </div>
        </div>

        {expanded ? (
          <div className="mt-8 border-t border-rule pt-8">
            <ul className="grid gap-4 md:grid-cols-3">
              {consentCopy.categories.map((category) => {
                const checked = toggleState[category.id];
                return (
                  <li
                    key={category.id}
                    className="rounded-card border border-rule bg-paper p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <p className="font-mono text-mono-eyebrow uppercase">{category.name}</p>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={checked}
                        aria-label={category.name}
                        disabled={category.locked}
                        onClick={() =>
                          category.locked
                            ? undefined
                            : setToggle(category.id as 'analytics' | 'marketing', !checked)
                        }
                        className={cn(
                          'relative h-6 w-11 shrink-0 rounded-button border transition-colors duration-120',
                          checked ? 'border-ink bg-ink' : 'border-rule bg-paper-raised',
                          category.locked && 'cursor-not-allowed opacity-60',
                        )}
                      >
                        <span
                          aria-hidden
                          className={cn(
                            'absolute top-[3px] h-4 w-4 rounded-button transition-[left] duration-120',
                            checked ? 'left-[26px] bg-paper' : 'left-[3px] bg-muted',
                          )}
                        />
                      </button>
                    </div>
                    <p className="mt-3 text-caption text-muted">{category.description}</p>
                    {category.locked ? (
                      <p className="mt-3 font-mono text-mono-eyebrow uppercase text-muted">
                        Always on
                      </p>
                    ) : null}
                  </li>
                );
              })}
            </ul>
            <div className="mt-6">
              <Button variant="secondary" onClick={saveChoices}>
                {consentCopy.save}
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
