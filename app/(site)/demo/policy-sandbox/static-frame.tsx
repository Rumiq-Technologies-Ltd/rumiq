import { cn } from '@/lib/utils';
import { Eyebrow, IllustrativeBadge } from '@/components/rumiq';
import { policySandboxCopy as copy } from '@/content/demo/policy-sandbox';
import {
  CONSENT_STATES,
  DESTINATIONS,
  PAGE_TYPES,
  PRESETS,
  TOTAL_FIELDS,
  evaluate,
  type FieldState,
} from '@/lib/demo/policy-sandbox';

/**
 * The Policy Sandbox's first frame, rendered on the server.
 *
 * Section 13 — the hero must not wait for the demo to paint. This is a pure
 * component with no state, no effects and no event handlers: it renders preset
 * one exactly as the interactive version would, so the hero's right column is
 * complete in the first HTML response. The interactive component replaces it
 * after mount.
 */
const stateStyle: Record<FieldState, string> = {
  allowed: 'text-plane-public-ink',
  redacted: 'text-boundary-ink',
  blocked: 'text-boundary-ink',
  absent: 'text-muted',
};

const stateLabel: Record<FieldState, string> = {
  allowed: 'ALLOWED',
  redacted: 'REDACTED',
  blocked: 'BLOCKED',
  absent: 'NOT COLLECTED',
};

export function PolicySandboxStaticFrame({ compact = false }: { compact?: boolean }) {
  const preset = PRESETS[0]!;
  const evaluation = evaluate(preset);

  const groups = [
    { legend: copy.controls.pageType, options: PAGE_TYPES, selected: preset.pageType as string },
    { legend: copy.controls.destination, options: DESTINATIONS, selected: preset.destination as string },
    { legend: copy.controls.consent, options: CONSENT_STATES, selected: preset.consent as string },
  ];

  return (
    <div className="rounded-card border border-rule bg-paper-raised" aria-busy="true">
      <div className={cn('grid gap-6 border-b border-rule p-6', compact ? '' : 'lg:grid-cols-3')}>
        {groups.map((group) => (
          <div key={group.legend}>
            <p className="font-mono text-mono-eyebrow uppercase text-muted">{group.legend}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.options.map((option) => (
                <span
                  key={option.id}
                  className={cn(
                    'inline-flex items-center rounded-button border px-3 py-2 text-caption',
                    option.id === group.selected
                      ? 'border-navy bg-navy text-paper'
                      : 'border-rule bg-paper-raised text-muted',
                  )}
                >
                  {option.label}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-b border-rule bg-paper px-6 py-5 font-mono text-caption">
        <p>
          <span className="text-muted">decision=</span>
          <span className="font-medium text-plane-public-ink">{evaluation.decision}</span>
        </p>
        <p>
          <span className="text-muted">fields_sent=</span>
          <span className="tabular-nums">
            {evaluation.sent}/{TOTAL_FIELDS}
          </span>
        </p>
        <p>
          <span className="text-muted">reason=</span>
          {evaluation.reason}
        </p>
      </div>

      <div className="p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Eyebrow>{copy.payloadHeading}</Eyebrow>
          <IllustrativeBadge />
        </div>
        <table className="mt-6 w-full border-collapse text-left">
          <tbody>
            {evaluation.fields.map((field) => (
              <tr key={field.name} className="border-b border-rule align-top last:border-0">
                <td className="py-2 pr-4 font-mono text-caption">{field.name}</td>
                <td
                  className={cn(
                    'py-2 pr-4 font-mono text-mono-eyebrow uppercase',
                    stateStyle[field.state],
                  )}
                >
                  {stateLabel[field.state]}
                </td>
                <td className="py-2 font-mono text-caption">
                  {field.state === 'absent' ? (
                    <span className="text-muted">—</span>
                  ) : (
                    <span className="break-all">{field.value}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
