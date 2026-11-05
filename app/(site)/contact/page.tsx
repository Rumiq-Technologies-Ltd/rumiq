import Link from 'next/link';
import { Card, FaqSection, JsonLd, RumiqForm, SectionHeader } from '@/components/rumiq';
import { contact } from '@/content/contact';
import { workingSessionForm } from '@/content/forms';
import { faqFor } from '@/content/faq';
import { breadcrumbJsonLd, faqJsonLd, pageMetadata, webPageJsonLd } from '@/lib/seo';

/*
 * /contact — Specification Section 8.15.
 *
 * It is a working session, not a demo, and the words "book a demo" appear
 * nowhere. Section 7.3: the shared CTA band is deliberately absent from this
 * page — the page is the call to action.
 */

const seo = {
  title: 'Book a working session',
  description:
    'Ninety minutes on your numbers, no slides. You leave with the three measurement gaps costing you the most, in writing.',
  path: '/contact',
};

export const metadata = pageMetadata(seo);

export default function ContactPage() {
  const faqs = faqFor('contact');

  return (
    <main id="main">
      <JsonLd
        data={[
          webPageJsonLd({ title: seo.title, description: seo.description, path: seo.path }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: seo.path },
          ]),
          faqJsonLd(faqs),
        ]}
      />

      <section data-plane="public" className="border-b border-rule">
        <div className="mx-auto max-w-content px-6 py-section-mobile lg:py-section lg:pl-gutter">
          <SectionHeader
            as="h1"
            size="display-l"
            eyebrow={contact.hero.eyebrow}
            headline={contact.hero.headline}
            standfirst={contact.hero.subhead}
          />
        </div>
      </section>

      {/* The form sits high on the page, with the agenda beside it rather than
          above it: a reader who already knows what they want should not have to
          scroll past four sections of reassurance to act. */}
      <section data-plane="boundary" className="border-b border-rule">
        <div className="mx-auto grid max-w-content gap-16 px-6 py-section-mobile lg:grid-cols-2 lg:py-section lg:pl-gutter">
          <div>
            <SectionHeader
              eyebrow={workingSessionForm.eyebrow}
              headline={workingSessionForm.headline}
              standfirst={workingSessionForm.standfirst}
            />
            <RumiqForm
              className="mt-10"
              formId="working-session"
              fields={workingSessionForm.fields}
              submitLabel={workingSessionForm.submit}
              success={workingSessionForm.success}
              note={workingSessionForm.privacyNote}
            />
          </div>

          <div>
            <SectionHeader eyebrow={contact.agenda.eyebrow} headline={contact.agenda.headline} size="h3" />
            <ol className="mt-8 border-t border-rule">
              {contact.agenda.steps.map((step, index) => (
                <li key={step.label} className="border-b border-rule py-5">
                  <span className="font-mono text-caption tabular-nums text-muted">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-2 text-h3 font-semibold">{step.label}</h3>
                  <p className="mt-2 max-w-measure text-caption text-muted">{step.body}</p>
                </li>
              ))}
            </ol>

            <h3 className="mt-12 text-h3 font-semibold">{contact.who.headline}</h3>
            <ul className="mt-5 space-y-3">
              {contact.who.points.map((point) => (
                <li key={point} className="border-b border-rule pb-3 text-caption text-muted">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* What you get, and what we will not do. Two columns, equal weight. */}
      <section data-plane="protected" className="bg-paper-dark">
        <div className="mx-auto max-w-content px-6 py-section-mobile lg:py-section lg:pl-gutter">
          <SectionHeader eyebrow={contact.expect.eyebrow} headline={contact.expect.headline} inverted />
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            <ul className="space-y-4">
              {contact.expect.gets.map((item) => (
                <li key={item} className="border-b border-paper/15 pb-4 text-body text-paper">
                  {item}
                </li>
              ))}
            </ul>
            <ul className="space-y-4">
              {contact.expect.nots.map((item) => (
                <li key={item} className="border-b border-paper/15 pb-4 text-body text-paper/70">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section data-plane="boundary" className="border-b border-rule">
        <div className="mx-auto max-w-content px-6 py-section-mobile lg:py-section lg:pl-gutter">
          <SectionHeader eyebrow={contact.other.eyebrow} headline={contact.other.headline} />
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {contact.other.items.map((item) => (
              <Card as="li" key={item.title} className="p-6">
                <h3 className="text-h3 font-semibold">{item.title}</h3>
                <p className="mt-3 text-caption text-muted">{item.body}</p>
                <p className="mt-6">
                  <Link
                    href={item.link.href}
                    className="text-caption font-medium underline decoration-rule underline-offset-4 hover:decoration-ink"
                  >
                    {item.link.label}
                  </Link>
                </p>
              </Card>
            ))}
          </ul>
        </div>
      </section>

      <FaqSection page="contact" />
    </main>
  );
}
