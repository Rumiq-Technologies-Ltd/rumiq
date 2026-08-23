import Link from 'next/link';

/**
 * Placeholder index. The homepage specified in Section 8.1 is not built yet —
 * Prompt 1 covers the design system and the styleguide only.
 */
export default function Page() {
  return (
    <main id="main" className="mx-auto flex min-h-screen max-w-content flex-col justify-center px-6 py-section-mobile lg:pl-gutter">
      <p className="font-mono text-mono-eyebrow uppercase text-plane-public">RUMIQ · BUILD IN PROGRESS</p>
      <h1 className="mt-6 max-w-measure font-display text-display-l font-semibold">
        Design system installed. Pages not built yet.
      </h1>
      <p className="mt-6 max-w-measure text-body-l text-muted">
        Section 5 tokens, the three self-hosted faces, the layout rules and the feature flags are in
        place. The component inventory and every page remain unbuilt, pending the next prompt.
      </p>
      <div className="mt-10">
        <Link
          href="/styleguide"
          className="inline-flex items-center rounded-button bg-ink px-5 py-3 font-sans text-body font-medium text-paper transition-colors duration-120 hover:bg-paper-dark"
        >
          Open the styleguide
        </Link>
      </div>
    </main>
  );
}
