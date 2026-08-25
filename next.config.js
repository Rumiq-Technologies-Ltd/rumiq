// Dev-only. Next 16 rejects cross-origin requests for /_next assets with a 403
// unless the origin is allowed, and the preview proxy serves the app on a
// different host than the dev server binds to. Derived from the environment, so
// no URL is hardcoded.
const previewHost = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_BASE_URL || '').hostname || null;
  } catch {
    return null;
  }
})();

const nextConfig = {
  /*
   * 'standalone' is for the container this app is developed in, which runs the
   * server itself. Vercel builds its own output and traces its own functions;
   * asking for standalone as well sends the build looking for trace manifests
   * (.next/next-server.js.nft.json) that its pipeline never wrote, and it dies
   * with ENOENT. So: standalone everywhere except Vercel.
   */
  output: process.env.VERCEL ? undefined : 'standalone',

  /*
   * The only images on this site are the four brand lockups: small PNGs and one
   * WebP, all first-party. Serving them as-is skips the optimiser entirely, so
   * the runtime needs no native image dependency and the network trace is
   * exactly the files in /public/brand. No remotePatterns: nothing is ever
   * loaded from another origin.
   */
  images: { unoptimized: true },

  /*
   * lib/og.tsx reads the reverse lockup off disk to inline it into the social
   * card, because the wordmark must never be redrawn in type. Files under
   * /public are served statically but are not automatically bundled into a
   * serverless function, so the tracer is told to include them.
   */
  outputFileTracingIncludes: {
    '/**': ['./public/brand/**'],
  },
  // Section 8.13 \u2014 /insights article bodies are MDX modules imported through the
  // registry in content/insights/index.ts. MDX pages are not used, so
  // pageExtensions is left alone.
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  // Renamed from experimental.serverComponentsExternalPackages in Next 15
  serverExternalPackages: ['mongodb'],

  experimental: {
    // The preview proxy cannot upgrade the dev HMR websocket (502), and React's
    // dev debug channel rides on that socket. With it enabled the initial Flight
    // stream never resolves through the proxy, so the page renders but never
    // hydrates. Off means dev behaves like production for hydration.
    reactDebugChannel: false,
  },
  // Next 16 runs Turbopack by default. An empty config is enough here: the
  // previous webpack watchOptions tuning has no Turbopack equivalent and is not needed.
  turbopack: {},

  // Dev-only: the preview proxy serves the app on a different host than the
  // dev server binds to. Has no effect on production.
  allowedDevOrigins: [
    previewHost,
    '*.preview.emergentagent.com',
    '*.emergentcf.cloud',
    '*.emergentagent.net',
  ].filter(Boolean),

  onDemandEntries: {
    maxInactiveAge: 10000,
    pagesBufferLength: 2,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "ALLOWALL" },
          { key: "Content-Security-Policy", value: "frame-ancestors *;" },
          { key: "Access-Control-Allow-Origin", value: process.env.CORS_ORIGINS || "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, POST, PUT, DELETE, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "*" },
        ],
      },
    ];
  },
};

/*
 * Section 8.13 — MDX for /insights article bodies.
 *
 * The classic pragma is deliberate. With the automatic runtime the compiled MDX
 * imports react/jsx-runtime, and inside the RSC layer that resolves to React's
 * react-server variant while the module's own `react` does not, which fails at
 * render with "cannot read properties of undefined (reading
 * recentlyCreatedOwnerStacks)". Compiling to React.createElement removes the
 * second resolution entirely.
 */
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    jsxRuntime: 'classic',
    pragma: 'React.createElement',
    pragmaFrag: 'React.Fragment',
    pragmaImportSource: 'react',
  },
});

module.exports = withMDX(nextConfig);
