/**
 * Section 13 — structured data. Server component, emits a single script tag.
 *
 * The payload is built by lib/seo.ts, never inline in a page, so a claim can
 * never appear in the structured data that does not appear on the page.
 */
export function JsonLd({ data }: { data: unknown | (unknown | null)[] }) {
  const nodes = (Array.isArray(data) ? data : [data]).filter(Boolean);
  if (!nodes.length) return null;

  return (
    <>
      {nodes.map((node, index) => (
        <script
          key={index}
          type="application/ld+json"
          // Serialised server-side from typed builders; no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(node).replace(/</g, '\\u003c') }}
        />
      ))}
    </>
  );
}
