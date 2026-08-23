import { cn } from '@/lib/utils';
import { Eyebrow } from './eyebrow';

/**
 * Dense two- or three-column reference table for /trust and the region pages
 * (Sections 8.9, 8.10). Tables, not cards, where the content is tabular.
 */
export function TrustTable({
  eyebrow,
  headline,
  body,
  note,
  rows,
  columns,
  plane = 'boundary',
  children,
}: {
  eyebrow: string;
  headline: string;
  body?: string;
  note?: string;
  rows?: readonly (readonly string[])[];
  columns?: readonly string[];
  plane?: 'public' | 'boundary' | 'protected';
  children?: React.ReactNode;
}) {
  return (
    <section data-plane={plane} className="border-b border-rule">
      <div className="mx-auto max-w-content px-6 py-16 lg:pl-gutter">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-4 max-w-measure text-h2 font-semibold">{headline}</h2>
        {body ? <p className="mt-5 max-w-measure text-body text-muted">{body}</p> : null}
        {note ? (
          <p className="mt-5 max-w-measure border-l-2 border-boundary pl-5 text-caption text-ink">
            {note}
          </p>
        ) : null}

        {rows?.length ? (
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              {columns?.length ? (
                <thead>
                  <tr className="border-b border-rule">
                    {columns.map((column) => (
                      <th
                        key={column}
                        scope="col"
                        className="py-3 pr-6 font-mono text-mono-eyebrow font-medium uppercase text-muted"
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
              ) : null}
              <tbody>
                {rows.map((row) => (
                  <tr key={row.join('|')} className="border-b border-rule align-top">
                    {row.map((cell, index) => (
                      <td
                        key={index}
                        className={cn(
                          'py-4 pr-6',
                          index === 0
                            ? 'w-[240px] font-mono text-caption font-medium text-ink'
                            : 'text-caption text-muted',
                        )}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
        {children}
      </div>
    </section>
  );
}
