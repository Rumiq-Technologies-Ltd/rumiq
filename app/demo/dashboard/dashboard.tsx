'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { DataFreshness, Eyebrow, IllustrativeBadge, SectorToggle } from '@/components/rumiq';
import { getSector, sectorOptions } from '@/lib/sectors';

/**
 * Growth Intelligence dashboard — Specification Section 9.2.
 *
 * Every panel is computed from the rows that survive the filters, so the
 * filters genuinely filter rather than re-labelling a fixed chart. All labels
 * come from the sector config, so a third sector needs no change here.
 *
 * Keyboard: the sector toggle is a radio group with arrow-key support, and the
 * three filters are native selects. State changes are announced.
 */

const ALL = 'all';

export function GrowthDashboard() {
  const [sectorId, setSectorId] = React.useState(sectorOptions[0]!.id);
  const sector = getSector(sectorId);
  const { dashboard: data, vocabulary: v } = sector;

  const [range, setRange] = React.useState(data.dateRanges[0]!.id);
  const [location, setLocation] = React.useState<string>(ALL);
  const [service, setService] = React.useState<string>(ALL);

  // Switching sector resets filters, since the dimensions are different.
  const switchSector = (id: string) => {
    setSectorId(id);
    const next = getSector(id);
    setRange(next.dashboard.dateRanges[0]!.id);
    setLocation(ALL);
    setService(ALL);
  };

  const multiplier =
    data.dateRanges.find((r) => r.id === range)?.multiplier ?? 1;

  const rows = data.rows.filter(
    (row) =>
      (location === ALL || row.location === location) &&
      (service === ALL || row.service === service),
  );

  const scale = (n: number) => Math.round(n * multiplier);
  const stageTotal = (index: number) => scale(rows.reduce((sum, r) => sum + r.stages[index]!, 0));
  const stages = data.funnelStages.map((stage, index) => ({
    ...stage,
    count: stageTotal(index),
  }));
  const firstStage = stages[0]?.count ?? 0;

  const sourceRows = Array.from(new Set(rows.map((r) => r.source))).map((source) => {
    const group = rows.filter((r) => r.source === source);
    const enquiries = scale(group.reduce((s, r) => s + r.stages[0]!, 0));
    const outcomes = scale(group.reduce((s, r) => s + r.stages[3]!, 0));
    const spend = scale(group.reduce((s, r) => s + r.spend, 0));
    const value = scale(group.reduce((s, r) => s + r.value, 0));
    // Divide by the stage the cost label actually names (see costStageIndex).
    const costBase = scale(group.reduce((s, r) => s + r.stages[v.costStageIndex]!, 0));
    return {
      source,
      unmapped: group.some((r) => r.unmapped),
      enquiries,
      outcomes,
      spend,
      value,
      cost: spend > 0 && costBase > 0 ? Math.round(spend / costBase) : null,
    };
  });

  const totalEnquiries = sourceRows.reduce((s, r) => s + r.enquiries, 0);
  const unmappedShare = totalEnquiries
    ? Math.round(
        (sourceRows.filter((r) => r.unmapped).reduce((s, r) => s + r.enquiries, 0) /
          totalEnquiries) *
          100,
      )
    : 0;

  const capacity = data.capacity.filter(
    (cell) =>
      (location === ALL || cell.location === location) &&
      (service === ALL || cell.service === service),
  );
  const capacityLocations = Array.from(new Set(capacity.map((c) => c.location)));
  const capacityServices = Array.from(new Set(capacity.map((c) => c.service)));

  const actions = data.actions.filter(
    (action) =>
      (location === ALL || action.location === location) &&
      (service === ALL || action.service === service),
  );

  const filterSummary =
    `${sector.label}. ${data.dateRanges.find((r) => r.id === range)?.label}. ` +
    `${location === ALL ? `All ${v.siteNoun.toLowerCase()}s` : location}. ` +
    `${service === ALL ? `All ${v.serviceNoun.toLowerCase()}s` : service}. ` +
    `${firstStage} enquiries, ${stages[3]?.count ?? 0} ${v.outcome.toLowerCase()}.`;

  const selectClass =
    'mt-3 w-full rounded-input border border-rule bg-paper-raised px-3 py-2 text-caption';

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="rounded-card border border-rule bg-paper-raised p-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectorToggle
            sectors={sectorOptions}
            value={sectorId}
            onChange={switchSector}
            label="Provider type"
          />
          <div className="flex flex-wrap items-center gap-4">
            <IllustrativeBadge />
            <DataFreshness source={data.connectors[0]!.name} updated={data.connectors[0]!.updated} />
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <label className="block">
            <span className="font-mono text-mono-eyebrow uppercase text-muted">Period</span>
            <select value={range} onChange={(e) => setRange(e.target.value)} className={selectClass}>
              {data.dateRanges.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="font-mono text-mono-eyebrow uppercase text-muted">{v.siteNoun}</span>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={selectClass}
            >
              <option value={ALL}>All {v.siteNoun.toLowerCase()}s</option>
              {data.locations.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="font-mono text-mono-eyebrow uppercase text-muted">{v.serviceNoun}</span>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className={selectClass}
            >
              <option value={ALL}>All {v.serviceNoun.toLowerCase()}s</option>
              {data.services.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
        </div>

        <p aria-live="polite" className="mt-6 font-mono text-mono-eyebrow uppercase text-muted">
          {filterSummary}
        </p>
      </div>

      {/* Panel 1 — funnel */}
      <section className="rounded-card border border-rule bg-paper-raised p-6">
        <Eyebrow>Funnel</Eyebrow>
        <ol className="mt-6 space-y-3">
          {stages.map((stage, index) => {
            const previous = index === 0 ? null : stages[index - 1]!.count;
            const share = firstStage ? Math.round((stage.count / firstStage) * 100) : 0;
            const step = previous ? Math.round((stage.count / previous) * 100) : 100;
            return (
              <li key={stage.label} className="border-b border-rule pb-3 last:border-0">
                <div className="flex items-baseline justify-between gap-6">
                  <span className="text-body">{stage.label}</span>
                  <span className="font-mono text-body tabular-nums">
                    {stage.count.toLocaleString()}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-4">
                  <span aria-hidden className="h-[3px] flex-1 bg-rule">
                    <span
                      className={cn(
                        'block h-full',
                        stage.plane === 'protected' ? 'bg-plane-protected' : 'bg-plane-public',
                      )}
                      style={{ width: `${share}%` }}
                    />
                  </span>
                  <span className="w-28 shrink-0 text-right font-mono text-mono-eyebrow uppercase text-muted">
                    {index === 0 ? `${share}% of total` : `${step}% of previous`}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Panel 2 — source performance */}
      <section className="rounded-card border border-rule bg-paper-raised p-6">
        <Eyebrow>Source performance</Eyebrow>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr className="border-b border-rule">
                {['Source', 'Spend', 'Enquiries', v.outcome, v.costPerOutcome, 'Value'].map((h) => (
                  <th
                    key={h}
                    scope="col"
                    className="py-3 pr-6 font-mono text-mono-eyebrow font-medium uppercase text-muted"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sourceRows.map((row) => (
                <tr
                  key={row.source}
                  className={cn('border-b border-rule', row.unmapped && 'bg-boundary/5')}
                >
                  <th scope="row" className="py-3 pr-6 text-caption font-medium">
                    <span className={row.unmapped ? 'text-boundary-ink' : undefined}>{row.source}</span>
                    {row.unmapped ? (
                      <span className="mt-1 block font-mono text-mono-eyebrow uppercase text-boundary-ink">
                        Data quality warning · {unmappedShare}% of enquiries
                      </span>
                    ) : null}
                  </th>
                  <td className="py-3 pr-6 font-mono text-caption tabular-nums">
                    {row.spend ? `${data.valuePrefix}${row.spend.toLocaleString()}` : '—'}
                  </td>
                  <td className="py-3 pr-6 font-mono text-caption tabular-nums">{row.enquiries}</td>
                  <td className="py-3 pr-6 font-mono text-caption tabular-nums">{row.outcomes}</td>
                  <td className="py-3 pr-6 font-mono text-caption tabular-nums">
                    {row.cost ? `${data.valuePrefix}${row.cost}` : '—'}
                  </td>
                  <td className="py-3 pr-6 font-mono text-caption tabular-nums">
                    {data.valuePrefix}
                    {row.value.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-measure text-caption text-muted">
          The unmapped row is not a rendering placeholder. It is the number most dashboards hide,
          and every reallocation decision is being made without it.
        </p>
      </section>

      {/* Panel 3 — capacity matrix */}
      <section className="rounded-card border border-rule bg-paper-raised p-6">
        <Eyebrow>{v.capacityNoun}</Eyebrow>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-rule">
                <th scope="col" className="py-3 pr-6 font-mono text-mono-eyebrow font-medium uppercase text-muted">
                  {v.siteNoun}
                </th>
                {capacityServices.map((s) => (
                  <th
                    key={s}
                    scope="col"
                    className="py-3 pr-6 font-mono text-mono-eyebrow font-medium uppercase text-muted"
                  >
                    {s}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {capacityLocations.map((loc) => (
                <tr key={loc} className="border-b border-rule">
                  <th scope="row" className="py-3 pr-6 text-caption font-medium">
                    {loc}
                  </th>
                  {capacityServices.map((svc) => {
                    const cell = capacity.find((c) => c.location === loc && c.service === svc);
                    if (!cell) return <td key={svc} className="py-3 pr-6 text-caption text-muted">—</td>;
                    const over = cell.utilisation > 100;
                    const under = cell.utilisation < 60;
                    return (
                      <td key={svc} className="py-2 pr-6">
                        <span
                          className={cn(
                            'inline-flex min-w-[72px] items-center justify-between gap-2 rounded-sm border px-2 py-1 font-mono text-caption tabular-nums',
                            over && 'border-boundary-ink bg-boundary/10 text-boundary-ink',
                            under && 'border-plane-public/40 bg-plane-public/5 text-plane-public-ink',
                            !over && !under && 'border-rule text-ink',
                          )}
                        >
                          {cell.utilisation}%
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-mono text-mono-eyebrow uppercase text-muted">
          <span className="text-boundary-ink">Over 100% — over-committed</span>
          <span className="text-plane-public-ink">Under 60% — under-used</span>
        </p>
      </section>

      {/* Panel 4 — next best action */}
      <section className="rounded-card border border-rule bg-paper-raised p-6">
        <Eyebrow>Next best action</Eyebrow>
        {actions.length ? (
          <ul className="mt-6 grid gap-4 lg:grid-cols-3">
            {actions.map((action) => (
              <li key={action.id} className="rounded-card border border-rule p-5">
                <p className="font-mono text-mono-eyebrow uppercase text-muted">
                  {action.location} · {action.service}
                </p>
                <h3 className="mt-3 text-h3 font-semibold">{action.title}</h3>
                <p className="mt-3 text-caption text-muted">{action.rationale}</p>
                <p className="mt-4 font-mono text-mono-eyebrow uppercase text-plane-public-ink">
                  {action.effect}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-6 text-caption text-muted">
            No action for this combination of filters. Widen the selection.
          </p>
        )}
      </section>

      {/* Panel 5 — data quality strip */}
      <section className="rounded-card border border-rule bg-paper-raised p-6">
        <Eyebrow>Data quality</Eyebrow>
        <ul className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {data.connectors.map((connector) => (
            <li key={connector.name} className="border-t border-rule pt-4">
              <DataFreshness
                source={connector.name}
                updated={connector.updated}
                state={connector.state}
              />
              <p className="mt-2 text-caption text-muted">{connector.note}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-measure text-caption text-boundary-ink">
          {unmappedShare}% of enquiries in this view have no attributable source. Figures below the
          funnel are complete; attribution above it is not.
        </p>
      </section>
    </div>
  );
}
