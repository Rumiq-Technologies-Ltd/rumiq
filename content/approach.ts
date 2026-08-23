/**
 * /approach copy — Specification Section 8.11.
 *
 * Primary reader: the buyer who has decided the problem is real and now wants
 * to know what working with Rumiq actually involves, in what order, and what it
 * asks of their team.
 *
 * The phase table renders directly on the page rather than behind an accordion
 * or a download: a buyer comparing vendors should be able to read the whole
 * engagement shape in one scroll, and a compliance reader should be able to see
 * where the boundary work sits without asking anyone.
 */

export const approach = {
  hero: {
    eyebrow: 'HOW ENGAGEMENTS RUN',
    headline: 'Instrument first. Change spend second.',
    subhead:
      'Nothing here starts with a rebuild. It starts by making the numbers you already own visible, in the order that makes the next decision safe. Every phase below has an exit you can refuse to pass.',
    primary: { label: 'Book a working session', href: '/contact' },
    secondary: { label: 'Get the scorecard', href: '/scorecard' },
    assurances: [
      'No PHI processed before a BAA is executed',
      'Your systems remain the source of record',
      'Every phase has a stop point',
    ],
  },

  principles: {
    eyebrow: 'THE OPERATING PRINCIPLES',
    headline: 'Four rules that decide the order of work.',
    items: [
      {
        title: 'Measure before you move money',
        body: 'A reallocation made on partial data is a guess with a spreadsheet attached. The first phase produces a baseline you can argue with, not a recommendation.',
      },
      {
        title: 'The boundary is designed before data flows',
        body: 'Page classification, consent handling and destination policy are settled while the volume of data crossing anything is zero. Retrofitting a boundary is how disclosures happen.',
      },
      {
        title: 'One decision at a time',
        body: 'Each phase ends with a single decision made differently than it would have been. If a phase cannot name that decision, it has not finished.',
      },
      {
        title: 'Your systems stay yours',
        body: 'Rumiq reads from your systems and writes back only where you ask it to. The practice management system, the dispatch software and the CRM remain the source of record throughout.',
      },
    ],
  },

  phases: {
    eyebrow: 'THE PHASES',
    headline: 'Six phases. The first two produce answers without touching a system of record.',
    standfirst:
      'Durations are typical for a single-site or two-location operation. Multi-site and health-system work runs longer, mostly in phase two, because there are more systems and more people who have to agree.',
    caption: 'Engagement phases, what each one produces, and what it needs from you',
    columns: ['Phase', 'Typical duration', 'What happens', 'What you get', 'What we need from you'],
    rows: [
      {
        id: '00',
        name: 'Working session',
        duration: '90 minutes',
        happens:
          'We work through how patients currently reach you, which numbers you can already produce, and which of them you do not trust. No slides.',
        output:
          'A written summary of the three measurement gaps costing you the most, and whether Rumiq is the wrong tool for them.',
        needs: 'The person who owns the growth number, and whoever answers the phone.',
        plane: 'public' as const,
      },
      {
        id: '01',
        name: 'Diagnostic',
        duration: '2 to 3 weeks',
        happens:
          'Read-only review of what is currently measurable: channels, call handling, forms, scheduling behaviour and discovery surfaces. Nothing is connected and no PHI is processed.',
        output:
          'A baseline with the unattributable share stated as its own figure, a ranked leak list, and the instrumentation plan that follows from it.',
        needs: 'Reporting access to advertising and analytics accounts, and an hour with the front desk.',
        plane: 'public' as const,
      },
      {
        id: '02',
        name: 'Boundary and governance design',
        duration: '2 to 4 weeks',
        happens:
          'Page and form classification, consent model per channel, destination policy and the disclosure record are designed and signed off. A BAA is executed before any PHI is in scope.',
        output:
          'A written policy set, the classification applied at publication, and a Policy Sandbox configured to your own page types.',
        needs: 'Compliance, privacy or legal in the room, and whoever publishes web pages.',
        plane: 'boundary' as const,
      },
      {
        id: '03',
        name: 'Instrumentation',
        duration: '3 to 6 weeks',
        happens:
          'Connectors are configured, call handling is instrumented, the knowledge graph is populated with your services, locations and hours, and data quality is watched rather than assumed.',
        output:
          'A governed data layer with freshness and failure states visible, and stale data labelled as stale instead of silently averaged.',
        needs: 'A named technical contact, and credentials issued by your team under your control.',
        plane: 'boundary' as const,
      },
      {
        id: '04',
        name: 'First governed view',
        duration: '2 weeks',
        happens:
          'The funnel is reconciled end to end, from first search to delivered care, and the figures are checked against what your operational system says.',
        output:
          'Cost per attended patient, or per completed journey, by service and location. Plus the reasons enquiries did not convert, in a fixed taxonomy.',
        needs: 'Someone from operations to confirm the numbers match reality.',
        plane: 'protected' as const,
      },
      {
        id: '05',
        name: 'Reallocation and cadence',
        duration: 'Ongoing, reviewed monthly',
        happens:
          'Spend and effort move against capacity. Each cycle states what it expected to happen, and the next one opens by checking whether it did.',
        output:
          'A monthly decision record: what moved, what it was predicted to do, and what it actually did.',
        needs: 'One recurring hour a month, and the authority to move budget.',
        plane: 'protected' as const,
      },
    ],
  },

  notDoing: {
    eyebrow: 'WHAT THIS IS NOT',
    headline: 'The parts other people sell that we will not.',
    points: [
      'We do not replace your practice management system, your dispatch software or your CRM. If a proposal starts with a migration, it is not this one.',
      'We do not send patient identifiers to advertising platforms in order to improve a conversion signal, on any platform, under any name for the practice.',
      'We do not claim certification we do not hold. Rumiq is built for HIPAA obligations and designed around Gulf residency and transfer requirements; no authority has certified or approved it.',
      'We do not scan or crawl your website as part of the scorecard, and nothing on this site inspects your systems.',
      'We do not report a number without the freshness of the data behind it. A confident figure from a broken connector is worse than a gap.',
    ],
  },

  exit: {
    eyebrow: 'THE STOP POINTS',
    headline: 'Every phase ends with a decision you can decline.',
    body: 'Engagements stop cleanly. The diagnostic baseline, the policy set and the classification work are yours whether or not the next phase happens, and they are written to be legible to someone who has never spoken to us.',
    note: 'Nothing on this page is legal or regulatory advice. Obligations vary by jurisdiction and should be validated with counsel.',
  },
} as const;
