import type { Metadata } from 'next';
import { CTABand, Hero, PointsSection, TrustTable } from '@/components/rumiq';
import { trust } from '@/content/trust';

/* Section 8.10 — eight sections. Primary reader: compliance, IT, DPO.
 * Density over flourish; tables where the content is tabular. */

export const metadata: Metadata = {
  title: 'Trust Center',
  description:
    'Architecture, data handling, access control, consent, the assurance roadmap, subprocessors, incident response, and what Rumiq does not claim.',
};

export default function TrustPage() {
  return (
    <main id="main">
      <Hero
        eyebrow={trust.hero.eyebrow}
        headline={trust.hero.headline}
        subhead={trust.hero.subhead}
        primary={trust.hero.primary}
        secondary={trust.hero.secondary}
        assurances={trust.hero.assurances}
      />

      <TrustTable
        eyebrow={trust.architecture.eyebrow}
        headline={trust.architecture.headline}
        body={trust.architecture.body}
        rows={trust.architecture.rows}
        columns={['Plane', 'What lives there', 'Rule']}
      />

      <TrustTable
        eyebrow={trust.dataHandling.eyebrow}
        headline={trust.dataHandling.headline}
        rows={trust.dataHandling.rows}
        plane="protected"
      />

      <TrustTable
        eyebrow={trust.access.eyebrow}
        headline={trust.access.headline}
        rows={trust.access.rows}
        plane="protected"
      />

      <TrustTable
        eyebrow={trust.consent.eyebrow}
        headline={trust.consent.headline}
        body={trust.consent.body}
        rows={trust.consent.rows}
      />

      {/* Assurance roadmap — labelled a roadmap, with no dates (Section 4.2). */}
      <TrustTable
        eyebrow={trust.assurance.eyebrow}
        headline={trust.assurance.headline}
        note={trust.assurance.note}
        rows={trust.assurance.rows}
        columns={['Item', 'State', 'What that means']}
      />

      {/* Subprocessors — scaffold with a visible TODO. Deliberately empty. */}
      <TrustTable
        eyebrow={trust.subprocessors.eyebrow}
        headline={trust.subprocessors.headline}
        note={trust.subprocessors.todo}
      >
        {/* TODO: complete before launch. Requires legal review. */}
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-b border-rule">
                {trust.subprocessors.columns.map((column) => (
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
            <tbody>
              <tr>
                <td
                  colSpan={trust.subprocessors.columns.length}
                  className="border border-dashed border-rule px-6 py-10 text-center font-mono text-mono-eyebrow uppercase text-muted"
                >
                  Pending legal review — no entries published
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </TrustTable>

      <TrustTable
        eyebrow={trust.incident.eyebrow}
        headline={trust.incident.headline}
        rows={trust.incident.rows}
        plane="protected"
      />

      <PointsSection
        eyebrow={trust.notClaimed.eyebrow}
        headline={trust.notClaimed.headline}
        points={trust.notClaimed.points}
        inverted
      />

      <CTABand />
    </main>
  );
}
