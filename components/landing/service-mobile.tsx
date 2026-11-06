"use client";

import * as React from "react";
import {
  PenLine,
  Search,
  TrendingUp,
  Video,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { serviceTones } from "@/components/landing/service-tones";

/*
 * TEMPORARY LANDING PAGE — "What we do" on phones (<= 767px). No scroll-jacking:
 * the page scrolls normally and the visitor drives every change. Four group tabs
 * on top; the open group's services sit below as swipeable cards with dots.
 * Fixed height, so switching groups never shifts the page.
 */

type Service = { label: string; body: string };
type Group = { title: string; services: readonly Service[] };

const icons: Record<string, LucideIcon> = {
  "Search & discovery": Search,
  "Social & video": Video,
  "Content & brand": PenLine,
  "Access & growth": TrendingUp,
};

const num = (n: number) => String(n).padStart(2, "0");

export function MobileServices({ groups }: { groups: readonly Group[] }) {
  const [g, setG] = React.useState(0);
  const [s, setS] = React.useState(0);
  const rails = React.useRef<(HTMLDivElement | null)[]>([]);

  const pick = (i: number) => {
    setG(i);
    setS(0);
    rails.current[i]?.scrollTo({ left: 0 });
  };
  const onScroll = () => {
    const el = rails.current[g];
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    if (!card) return;
    const idx = Math.round(el.scrollLeft / (card.offsetWidth + 12));
    setS((p) => (p === idx ? p : idx));
  };
  const group = groups[g];

  return (
    <div className="mt-8">
      <div
        role="tablist"
        aria-label="Service groups"
        className="grid grid-cols-4 gap-1.5"
      >
        {groups.map((x, i) => {
          const Icon = icons[x.title];
          const on = i === g;
          const tone = serviceTones[i % serviceTones.length]!;
          return (
            <button
              key={x.title}
              role="tab"
              type="button"
              aria-selected={on}
              onClick={() => pick(i)}
              className={cn(
                "flex min-h-[4.25rem] flex-col items-center justify-center gap-1.5 rounded-panel border px-1 text-center transition-colors",
                on
                  ? cn(
                      tone.strip,
                      tone.dark
                        ? "border-paper-dark text-paper"
                        : "border-navy text-navy",
                    )
                  : "border-rule bg-paper-raised text-navy",
              )}
            >
              {Icon ? (
                <Icon
                  aria-hidden="true"
                  className="size-5"
                  strokeWidth={1.75}
                />
              ) : null}
              <span className="font-mono text-[0.625rem] uppercase leading-tight tracking-wide">
                {x.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Every group's rail shares one grid cell, so the area is always as tall as
          the tallest card of any group and switching tabs never shifts the page.
          Inactive rails are invisible, which also hides them from assistive tech. */}
      <div className="mt-3 grid">
        {groups.map((x, gi) => {
          const tone = serviceTones[gi % serviceTones.length]!;
          return (
            <div
              key={x.title}
              ref={(el) => {
                rails.current[gi] = el;
              }}
              onScroll={gi === g ? onScroll : undefined}
              role="tabpanel"
              aria-label={x.title}
              className={cn(
                "-mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-1 [grid-area:1/1] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
                gi !== g && "invisible",
              )}
            >
              {x.services.map((svc, i) => (
                <div
                  key={svc.label}
                  className={cn(
                    "w-[84%] shrink-0 snap-center rounded-panel border p-5",
                    tone.panel,
                    tone.dark ? "border-paper-dark" : "border-rule",
                  )}
                >
                  <p
                    className={cn(
                      "font-mono text-mono-eyebrow uppercase",
                      tone.dark ? "text-paper/70" : "text-muted",
                    )}
                  >
                    {num(i + 1)} / {num(x.services.length)}
                  </p>
                  <h4
                    className={cn(
                      "mt-2 text-body-l font-semibold",
                      tone.dark ? "text-paper" : "text-navy",
                    )}
                  >
                    {svc.label}
                  </h4>
                  <p
                    className={cn(
                      "mt-1.5 text-caption",
                      tone.dark ? "text-paper/80" : "text-muted",
                    )}
                  >
                    {svc.body}
                  </p>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      <div aria-hidden="true" className="mt-3 flex justify-center gap-1.5">
        {group.services.map((svc, i) => (
          <span
            key={svc.label}
            className={cn(
              "h-1.5 rounded-full transition-all",
              s === i ? "w-5 bg-navy" : "w-1.5 bg-rule",
            )}
          />
        ))}
      </div>
    </div>
  );
}
