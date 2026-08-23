import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';

/**
 * MDX element mapping for /insights (Section 8.13).
 *
 * The article body is authored in MDX and styled here, once, with Section 5
 * tokens. No typography plugin, so nothing can introduce a colour or a radius
 * outside the design system.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children, ...props }) => (
      <h2 {...props} className="mt-16 max-w-measure text-h2 font-semibold">
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 {...props} className="mt-12 max-w-measure text-h3 font-semibold">
        {children}
      </h3>
    ),
    p: ({ children, ...props }) => (
      <p {...props} className="mt-6 max-w-measure text-body-l">
        {children}
      </p>
    ),
    ul: ({ children, ...props }) => (
      <ul {...props} className="mt-6 max-w-measure space-y-3">
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol {...props} className="mt-6 max-w-measure list-decimal space-y-3 pl-6">
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li {...props} className="border-b border-rule pb-3 text-body">
        {children}
      </li>
    ),
    strong: ({ children, ...props }) => (
      <strong {...props} className="font-semibold">
        {children}
      </strong>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote {...props} className="mt-10 max-w-measure border-l-2 border-boundary pl-6 text-h3 font-display font-semibold">
        {children}
      </blockquote>
    ),
    hr: (props) => <hr {...props} className="my-14 border-rule" />,
    a: ({ href, children, ...props }) => {
      const target = String(href ?? '');
      const className =
        'underline decoration-rule underline-offset-4 hover:decoration-ink';
      return target.startsWith('/') ? (
        <Link href={target} className={className} {...props}>
          {children}
        </Link>
      ) : (
        <a href={target} className={className} {...props}>
          {children}
        </a>
      );
    },
    ...components,
  };
}
