'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { PolicySandboxStaticFrame } from '@/app/demo/policy-sandbox/static-frame';

/**
 * Section 13 — keeps the demo off the hero's critical path.
 *
 * The server renders PolicySandboxStaticFrame only. The interactive sandbox is
 * a client-only dynamic import that mounts after hydration, so its JavaScript
 * never blocks the hero's largest contentful paint. The static frame renders
 * the same first preset, so the swap is invisible.
 */
const InteractiveSandbox = dynamic(
  () => import('@/app/demo/policy-sandbox/sandbox').then((mod) => mod.PolicySandbox),
  { ssr: false, loading: () => <PolicySandboxStaticFrame /> },
);

export function PolicySandboxEmbed({ compact = true }: { compact?: boolean }) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <PolicySandboxStaticFrame compact={compact} />;
  return <InteractiveSandbox compact={compact} />;
}
