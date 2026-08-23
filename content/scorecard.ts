/** Growth Leak Scorecard — Section 10. A self-assessment. It never scans,
 *  crawls or analyses the visitor's website, and must never say it does. */

export type Option = { label: string; score: 0 | 1 | 2 | 3 };
export type Question = {
  id: string;
  area: string;
  question: string;
  options: [Option, Option, Option, Option];
  /** Used on the results screen when this area scores low. */
  observation: string;
  cost: string;
  fix: string;
};

const o = (a: string, b: string, c: string, d: string): [Option, Option, Option, Option] => [
  { label: a, score: 0 },
  { label: b, score: 1 },
  { label: c, score: 2 },
  { label: d, score: 3 },
];

export const questions: Question[] = [
  { id: 'calls', area: 'Missed calls', question: 'Do you know how many enquiry calls went unanswered last month?', options: o('No idea', 'A rough sense from the phone bill', 'Answered and missed counted', 'Counted by hour and line, with call-backs tracked'), observation: 'Unanswered enquiry calls are not being counted.', cost: 'The largest and cheapest leak to fix, invisible in every report you have.', fix: 'Get answered, missed and abandoned counts by hour for one month before changing anything else.' },
  { id: 'reason', area: 'Reason not booked', question: 'When an enquiry does not become an appointment, is the reason recorded?', options: o('Never', 'Sometimes, in free text', 'A consistent list, applied unevenly', 'A fixed taxonomy, applied to every enquiry'), observation: 'The reason enquiries fail is not recorded consistently.', cost: 'Every fix is a guess, because price, timing, coverage and service each need a different one.', fix: 'Adopt a short fixed reason list at the point of contact and review it weekly with the front desk.' },
  { id: 'attendance', area: 'Attendance', question: 'Can you link marketing spend to patients who actually attended?', options: o('No, we report on leads', 'Bookings only', 'Attendance, manually reconciled', 'Attendance by service and location, automatically'), observation: 'Spend is measured against leads or bookings, not attendance.', cost: 'Cheap leads look like good leads, so budget moves the wrong way.', fix: 'Join the scheduling record to source for one service line, and recalculate cost per attended patient.' },
  { id: 'capacity', area: 'Capacity', question: 'Do you allocate demand against the capacity that exists to serve it?', options: o('No', 'Informally, from memory', 'Reviewed periodically', 'Capacity sits next to demand in the same view'), observation: 'Demand is created without reference to capacity.', cost: 'Money spent generating work you cannot comfortably take.', fix: 'Put utilisation by location and service next to spend before the next budget decision.' },
  { id: 'attribution', area: 'Unattributed demand', question: 'What share of enquiries cannot be traced to any source?', options: o('Unknown', 'Probably a lot', 'Roughly known', 'Measured and shown on the report'), observation: 'The unattributable share of demand is unknown.', cost: 'Every reallocation decision is being made on partial evidence.', fix: 'Measure the unmapped share first, and show it as its own line rather than redistributing it.' },
  { id: 'consent', area: 'Consent', question: 'Is consent recorded per channel and honoured across all of them?', options: o('Not recorded', 'Captured in one channel only', 'Recorded, not always honoured', 'Recorded per channel and enforced on every send'), observation: 'Consent is not consistently recorded or enforced.', cost: 'Contact continues after a person has asked it to stop.', fix: 'Hold consent per contact and per channel, and make withdrawal propagate rather than be filed.' },
  { id: 'pages', area: 'Page classification', question: 'Are sensitive pages and forms classified before analytics events fire?', options: o('No classification exists', 'Some tags removed manually', 'Sensitive pages identified', 'Classified at publication, default deny on sensitive classes'), observation: 'Sensitive pages are not classified before events are emitted.', cost: 'Disclosures nobody intended, on the pages that matter most.', fix: 'Classify every page at publication and deny non-essential destinations on sensitive classes.' },
  { id: 'ledger', area: 'Disclosure record', question: 'Could you show what data left for advertising platforms last month?', options: o('No', 'Partially, from platform settings', 'From tag configuration', 'A ledger of every disclosure and the policy behind it'), observation: 'There is no auditable record of what has been sent.', cost: 'Risk that cannot be quantified, so it cannot be reduced.', fix: 'Start logging disclosure decisions with the policy version, even before changing what is sent.' },
  { id: 'discovery', area: 'Discovery', question: 'Are your services, hours and locations accurate everywhere patients look?', options: o('Probably not', 'Main profile only', 'Reviewed occasionally', 'Consistent across search, maps, directories and assistants'), observation: 'Entity data is inconsistent across discovery surfaces.', cost: 'Demand that never reaches you, and answers assistants get wrong.', fix: 'Correct services, hours and locations on every profile, then keep one canonical source.' },
  { id: 'voice', area: 'Patient voice', question: 'Does patient feedback reach the person who can act on it?', options: o('No', 'Reviews read, rarely actioned', 'Routed informally', 'Routed to an owner with resolution tracked'), observation: 'Feedback is collected but not routed to an owner.', cost: 'The same operational problem repeats and shows up in reviews.', fix: 'Route each theme to a named owner and track resolution, starting with the most frequent.' },
];

export const scorecardCopy = {
  eyebrow: 'GROWTH LEAK SCORECARD',
  headline: 'Ten questions about how patients currently reach you.',
  subhead:
    'This is a self-assessment, not a scan. Nothing here inspects, crawls or analyses your website or your systems. Your answers are the only input.',
  start: 'Start the assessment',
  gate: {
    eyebrow: 'YOUR RESULTS',
    headline: 'Where should we send the one-page version?',
    body: 'We will send the scorecard and the ranked fixes to this address, once. Your answers are sent with it so the results can be produced.',
    wont: 'We will not add you to a marketing list, share the address with any third party, or send anything you did not ask for. No advertising or analytics platform receives it.',
    consent: 'Send me my scorecard at this address. I understand I can ask for it to be deleted at any time.',
    submit: 'Show my results',
    skip: 'Show results without emailing them',
  },
  results: {
    eyebrow: 'RESULT',
    outOf: 'out of 30',
    weakest: 'The five weakest areas, worst first',
    observation: 'Observation',
    cost: 'Likely cost',
    fix: 'First fix',
    cta: 'Book a working session',
    note: 'Scores are your own answers, weighted equally. Nothing here was measured by us.',
    restart: 'Start again',
    ofTen: 'Question',
    progressLabel: 'Assessment progress',
    back: 'Back',
    next: 'Next question',
    finish: 'See where you are leaking',
    chooseFirst: 'Choose one of the four answers to continue.',
    resumed: 'Your previous answers were restored on this device.',
  },
} as const;

/**
 * Section 10 \u2014 four bands over a nought-to-thirty range. Deliberately blunt.
 * A band is a description of the answers given, never a diagnosis of the
 * operation: nothing here was measured by us.
 */
export const bands = [
  {
    id: 'severe',
    max: 9,
    label: 'Mostly unmeasured',
    body: 'Almost none of the journey is instrumented, which means almost every growth decision is currently a guess. The upside of that is that the first three fixes are cheap and the improvement is obvious.',
  },
  {
    id: 'partial',
    max: 17,
    label: 'Measured at the edges',
    body: 'You can see spend and you can see outcomes, but not the middle where they connect. This is the most common position, and the most expensive, because it produces confident reports built on the parts that happen to be visible.',
  },
  {
    id: 'solid',
    max: 24,
    label: 'Instrumented, unevenly',
    body: 'Most of the journey is visible and the gaps are specific rather than structural. Closing two or three named areas would put you in a position to reallocate spend with real confidence.',
  },
  {
    id: 'strong',
    max: 30,
    label: 'Well instrumented',
    body: 'This is a stronger baseline than most provider organisations have. The remaining value is less in measurement and more in acting on it faster \u2014 and in the governance record, which is usually the last thing to be built.',
  },
] as const;

/** The email gate, as form fields. Section 11 renders these; the copy is here. */
export const scorecardGateFields = [
  {
    name: 'email',
    label: 'Email',
    type: 'email' as const,
    autoComplete: 'email',
    placeholder: 'name@practice.com',
    hint: 'Sent in the request body, never in the address bar, so it cannot end up in a URL or a referrer.',
  },
  {
    name: 'consent',
    label: scorecardCopy.gate.consent,
    type: 'checkbox' as const,
  },
];
