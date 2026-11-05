import { CTABand, FaqSection, Hero, JsonLd, PlaneDiagram, SectionHeader } from '@/components/rumiq';
import { platform } from '@/content/platform';
import { faqFor } from '@/content/faq';
import { breadcrumbJsonLd, faqJsonLd, pageMetadata, webPageJsonLd } from '@/lib/seo';
import { cn } from '@/lib/utils';
import { ModuleGrid } from './module-grid';

/*
 * /platform — Specification Section 8.2.
 * Ten modules in three stacked plane sections, then the canonical data model.
 */

const seo = {
  title: 'Platform',
  description:
    'Ten modules across two planes and the boundary between them, over one canonical data model with a privacy class on every entity.',
  path: '/platform',
};

export const metadata = pageMetadata(seo);

/** Privacy-class colour coding for the data model table. Teal public, ink
 *  operational, amber policy, blue protected — consistent with Section 5.2. */
const classStyle: Record<string, string> = {
  public: 'text-plane-public-ink border-plane-public',
  operational: 'text-ink border-ink',
  policy: 'text-boundary-ink border-boundary-ink',
  protected: 'text-plane-protected border-plane-protected',
};

export default function PlatformPage() {
  const byPlane = (plane: string) => platform.modules.filter((module) => module.plane === plane);
  const faqs = faqFor('platform');

  return (
    <main id="main">
      <JsonLd
        data={[
          webPageJsonLd({ title: seo.title, description: seo.description, path: seo.path }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Platform', path: seo.path },
          ]),
          faqJsonLd(faqs),
        ]}
      />

      <Hero
        eyebrow={platform.hero.eyebrow}
        headline={platform.hero.headline}
        subhead={platform.hero.subhead}
        primary={platform.hero.primary}
        secondary={platform.hero.secondary}
        assurances={platform.hero.assurances}
      />

      {/* The three-plane diagram, full width and interactive */}
      <section data-plane="boundary" className="border-b border-rule">
        <div className="mx-auto max-w-bleed px-6 py-section-mobile lg:py-section lg:pl-gutter">
          <SectionHeader
            eyebrow={platform.diagram.eyebrow}
            headline={platform.diagram.headline}
            standfirst={platform.diagram.standfirst}
          />
          <div className="mt-12">
            <PlaneDiagram />
          </div>
        </div>
      </section>

      {/* Three stacked plane sections, each with its module grid */}
      {platform.planeSections.map((section) => (
        <section key={section.plane} data-plane={section.plane} className="border-b border-rule">
          <div className="mx-auto max-w-content px-6 py-section-mobile lg:py-section lg:pl-gutter">
            <SectionHeader
              eyebrow={section.eyebrow}
              headline={section.title}
              standfirst={section.standfirst}
            />
            <div className="mt-12">
              <ModuleGrid modules={byPlane(section.plane)} />
            </div>
          </div>
        </section>
      ))}

      {/* The canonical data model */}
      <section data-plane="protected" className="border-b border-rule">
        <div className="mx-auto max-w-bleed px-6 py-section-mobile lg:py-section lg:pl-gutter">
          <SectionHeader
            eyebrow={platform.dataModel.eyebrow}
            headline={platform.dataModel.headline}
            standfirst={platform.dataModel.standfirst}
          />

          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            {platform.dataModel.classes.map((klass) => (
              <li key={klass.id} className="flex items-baseline gap-3">
                <span
                  className={cn(
                    'inline-flex items-center rounded-button border px-2 py-[2px] font-mono text-mono-eyebrow uppercase',
                    classStyle[klass.id],
                  )}
                >
                  {klass.label}
                </span>
                <span className="max-w-[38ch] text-caption text-muted">{klass.note}</span>
              </li>
            ))}
          </ul>

          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[880px] border-collapse text-left">
              <thead>
                <tr className="border-b border-rule">
                  {[
                    platform.dataModel.columns.entity,
                    platform.dataModel.columns.fields,
                    platform.dataModel.columns.klass,
                    platform.dataModel.columns.plane,
                    platform.dataModel.columns.note,
                  ].map((heading) => (
                    <th
                      key={heading}
                      scope="col"
                      className="py-3 pr-6 font-mono text-mono-eyebrow font-medium uppercase text-muted"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {platform.dataModel.rows.map((row) => (
                  <tr key={row.entity} className="border-b border-rule align-top">
                    <th scope="row" className="py-4 pr-6 text-body font-medium">
                      {row.entity}
                    </th>
                    <td className="py-4 pr-6 font-mono text-caption text-muted">{row.fields}</td>
                    <td className="py-4 pr-6">
                      <span
                        className={cn(
                          'inline-flex items-center rounded-button border px-2 py-[2px] font-mono text-mono-eyebrow uppercase',
                          classStyle[row.klass],
                        )}
                      >
                        {row.klass}
                      </span>
                    </td>
                    <td className="py-4 pr-6 font-mono text-mono-eyebrow uppercase text-muted">
                      {row.plane}
                    </td>
                    <td className="py-4 max-w-[42ch] text-caption text-muted">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-8 max-w-measure text-caption text-muted">{platform.dataModel.note}</p>
        </div>
      </section>

      <FaqSection page="platform" />

      <CTABand />
    </main>
  );
}
