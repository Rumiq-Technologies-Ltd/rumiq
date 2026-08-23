/**
 * /about copy — Specification Section 8.14.
 *
 * Section 4.1 governs this page hardest: two pilots exist, neither is named
 * until written client approval is in hand, and no headcount, funding, award or
 * customer count is claimed. Everything below is either verifiable today or
 * stated as an intention.
 */

export const about = {
  hero: {
    eyebrow: 'ABOUT RUMIQ',
    headline: 'Built with two providers who could not answer the same question.',
    subhead:
      'One is a dental group. One moves patients in vehicles. Neither could connect the money they spend on being found to the care they actually delivered. Rumiq is the layer that closes that gap without handing patient data to ad platforms.',
    primary: { label: 'Book a working session', href: '/contact' },
    secondary: { label: 'How engagements run', href: '/approach' },
  },

  why: {
    eyebrow: 'WHY THIS EXISTS',
    headline: 'Healthcare marketing measurement stops exactly where healthcare revenue begins.',
    body: 'The advertising stack ends at the lead. The operational stack starts at the appointment. Between them sits the phone, the form, the reason nobody booked, and the patient who never arrived — which is where most of the money is won or lost. The two halves were never designed to meet, and the obvious ways of joining them involve sending data to places it should not go.',
    second:
      'So the choice on offer has been: measure properly and accept the exposure, or stay compliant and stay blind. Rumiq exists because that is a false choice. Classification, consent and a disclosure record are engineering problems, and they can be solved before the data moves rather than apologised for afterwards.',
  },

  pilots: {
    eyebrow: 'THE TWO PILOTS',
    headline: 'Two operations that share no systems, no vocabulary and no unit of value.',
    standfirst:
      'They were chosen to be as different as possible. If one governed layer can serve both, the architecture is right; if it needs a fork, we would rather find out now than after the tenth customer.',
    items: [
      {
        plane: 'protected' as const,
        name: 'A two-location dental group',
        where: 'Florida, United States',
        runsOn: 'A dental practice management system, with call handling split across two front desks.',
        problem:
          'Call volume held up while new patient volume stalled. Treatment plan acceptance was invisible to marketing, so the practice optimised for whichever leads were cheapest.',
        proves: [
          'The clinical funnel reconciles end to end: source, enquiry, booking, attendance, plan presented, plan accepted, treatment started.',
          'Cost per attended patient behaves differently from cost per lead, and moves budget in the opposite direction often enough to matter.',
          'The phone can be measured without recording anything a patient would object to being recorded.',
        ],
        status: 'Running. Not named publicly until written client approval is in hand.',
      },
      {
        plane: 'public' as const,
        name: 'A non-emergency medical transportation operator',
        where: 'United States',
        runsOn: 'Dispatch software, with demand arriving largely through facility relationships.',
        problem:
          'Completed trips and revenue were visible. Which relationships generated them, and where requests dropped out of the booking chain, were not.',
        proves: [
          'The measurement layer does not need to know what a patient is. The unit of value is a completed journey, and the vocabulary comes from the sector config rather than the code.',
          'Demand that arrives through relationships rather than clicks can still be attributed, and the unattributed share can be stated honestly instead of redistributed.',
          'The privacy gateway behaves identically over dispatch data and over clinical data, which is the whole argument for having one.',
        ],
        status: 'Running. Architecture work at an earlier stage than the dental pilot, and the site says so wherever transport data appears.',
      },
    ],
    note: 'Every decision made in either pilot becomes a reusable playbook, schema or platform requirement rather than a one-off configuration.',
  },

  how: {
    eyebrow: 'HOW WE WORK',
    headline: 'Built with providers rather than at them.',
    points: [
      'A small number of design partner slots, deliberately. A layer this opinionated is wrong in ways only real operations reveal, and ten of them at once would mean hearing none of it clearly.',
      'Read-only until there is a reason not to be. Rumiq earns write access one workflow at a time.',
      'Nothing ships to a customer that we cannot explain to their compliance officer in a sentence.',
      'Where the product is not ready, the site says so instead of showing a roadmap as though it were a feature.',
    ],
  },

  entity: {
    eyebrow: 'THE ENTITY',
    headline: 'Where Rumiq is, and where your data is.',
    facts: [
      { label: 'Legal entity', value: 'Rumiq Technologies Ltd' },
      { label: 'Registered in', value: 'DIFC, Dubai' },
      { label: 'US PHI hosting', value: 'US-region by default, with a BAA executed before any PHI is processed.' },
      { label: 'Gulf hosting', value: 'Designed around regional residency and cross-border transfer requirements.' },
      { label: 'Certifications', value: 'None claimed. No authority has certified or approved the platform.' },
    ],
    link: { label: 'Trust Center', href: '/trust' },
  },

  careers: {
    eyebrow: 'WORKING HERE',
    headline: 'No open roles listed, and no fake ones.',
    body: 'There is no careers pipeline to point you at yet. If you build data infrastructure, work on privacy engineering, or have run marketing inside a provider organisation and are tired of measuring the wrong thing, use the working session form and say so in the message. It reaches a person.',
    cta: { label: 'Get in touch', href: '/contact' },
  },
} as const;
