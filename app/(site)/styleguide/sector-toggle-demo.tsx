'use client';

import * as React from 'react';
import { SectorToggle, type SectorOption } from '@/components/rumiq';

/**
 * Styleguide demo for <SectorToggle>. The real registry arrives with the
 * Section 9.2 dashboard; this passes an arbitrary array to prove the component
 * maps over whatever it is given, including a third sector.
 */
const demoSectors: SectorOption[] = [
  { id: 'dental', label: 'Dental group' },
  { id: 'transport', label: 'Transport operator' },
  { id: 'placeholder', label: 'Third sector (registry test)' },
];

export function SectorToggleDemo() {
  const [value, setValue] = React.useState<string>('dental');

  return (
    <div>
      <SectorToggle sectors={demoSectors} value={value} onChange={setValue} />
      <p className="mt-4 font-mono text-caption text-muted" aria-live="polite">
        selected={value}
      </p>
    </div>
  );
}
