/**
 * Call intelligence dataset — Specification Section 9.3.
 *
 * Twelve synthetic calls. Transcript snippets are generic and contain no
 * clinical content, no symptoms, no diagnosis and no treatment discussion
 * (Section 4.2). Nothing here came from a real call.
 */

/** The eight-item reason taxonomy. The classifier picks one; a human may
 *  override it, and the override is what the record then shows. */
export const REASON_TAXONOMY = [
  { id: 'booked', label: 'Booked' },
  { id: 'no_suitable_time', label: 'No suitable time offered' },
  { id: 'price_unresolved', label: 'Price or payment question unresolved' },
  { id: 'coverage_unconfirmed', label: 'Coverage not confirmed' },
  { id: 'service_not_offered', label: 'Wanted a service not offered' },
  { id: 'existing_admin', label: 'Existing patient, admin only' },
  { id: 'not_answered', label: 'Call not answered' },
  { id: 'ended_early', label: 'Caller ended before booking' },
] as const;

export type ReasonId = (typeof REASON_TAXONOMY)[number]['id'];

export type CallOutcome = 'booked' | 'not_booked' | 'missed';

export type Classification = {
  field: string;
  value: string;
  /** 0 to 1. Below 0.70 is flagged for human review. */
  confidence: number;
};

export type CallRecord = {
  id: string;
  timestamp: string;
  line: string;
  callerType: 'New' | 'Existing';
  durationSeconds: number;
  outcome: CallOutcome;
  reason: ReasonId;
  classifications: Classification[];
  transcript: string[];
};

export const REVIEW_THRESHOLD = 0.7;

export const calls: CallRecord[] = [
  {
    id: 'c-1041', timestamp: '2026-08-21T09:12:04Z', line: 'Riverside main', callerType: 'New',
    durationSeconds: 214, outcome: 'booked', reason: 'booked',
    classifications: [
      { field: 'reason_for_call', value: 'New appointment request', confidence: 0.96 },
      { field: 'service_interest', value: 'Implants', confidence: 0.91 },
      { field: 'outcome', value: 'Booked', confidence: 0.98 },
    ],
    transcript: ['Caller asked about availability for a consultation.', 'Reception offered two times next week.', 'Caller accepted the later slot and confirmed contact details.'],
  },
  {
    id: 'c-1042', timestamp: '2026-08-21T10:03:51Z', line: 'Riverside main', callerType: 'New',
    durationSeconds: 168, outcome: 'not_booked', reason: 'price_unresolved',
    classifications: [
      { field: 'reason_for_call', value: 'Pricing enquiry', confidence: 0.88 },
      { field: 'service_interest', value: 'Implants', confidence: 0.74 },
      { field: 'reason_not_booked', value: 'Price or payment question unresolved', confidence: 0.81 },
    ],
    transcript: ['Caller asked what the total cost would be.', 'Reception explained a consultation is needed before quoting.', 'Caller said they would think about it and ended the call.'],
  },
  {
    id: 'c-1043', timestamp: '2026-08-21T11:41:19Z', line: 'Lakeview main', callerType: 'Existing',
    durationSeconds: 96, outcome: 'not_booked', reason: 'existing_admin',
    classifications: [
      { field: 'reason_for_call', value: 'Account and paperwork', confidence: 0.93 },
      { field: 'reason_not_booked', value: 'Existing patient, admin only', confidence: 0.9 },
    ],
    transcript: ['Caller asked for a copy of a receipt.', 'Reception confirmed it would be emailed.'],
  },
  {
    id: 'c-1044', timestamp: '2026-08-21T13:22:07Z', line: 'Riverside overflow', callerType: 'New',
    durationSeconds: 0, outcome: 'missed', reason: 'not_answered',
    classifications: [{ field: 'outcome', value: 'Not answered', confidence: 0.99 }],
    transcript: ['No answer. Voicemail not left.'],
  },
  {
    id: 'c-1045', timestamp: '2026-08-21T14:08:33Z', line: 'Lakeview main', callerType: 'New',
    durationSeconds: 242, outcome: 'not_booked', reason: 'no_suitable_time',
    classifications: [
      { field: 'reason_for_call', value: 'New appointment request', confidence: 0.94 },
      { field: 'service_interest', value: 'Orthodontics', confidence: 0.86 },
      { field: 'reason_not_booked', value: 'No suitable time offered', confidence: 0.79 },
    ],
    transcript: ['Caller asked for an evening appointment.', 'Reception offered daytime slots only.', 'Caller asked to be contacted if an evening slot opens.'],
  },
  {
    id: 'c-1046', timestamp: '2026-08-21T15:19:45Z', line: 'Riverside main', callerType: 'New',
    durationSeconds: 131, outcome: 'not_booked', reason: 'coverage_unconfirmed',
    classifications: [
      { field: 'reason_for_call', value: 'Coverage question', confidence: 0.68 },
      { field: 'service_interest', value: 'Hygiene', confidence: 0.61 },
      { field: 'reason_not_booked', value: 'Coverage not confirmed', confidence: 0.64 },
    ],
    transcript: ['Caller asked whether their plan would be accepted.', 'Reception took the plan name and said they would check.', 'Call ended without an appointment.'],
  },
  {
    id: 'c-1047', timestamp: '2026-08-22T09:02:12Z', line: 'Lakeview main', callerType: 'Existing',
    durationSeconds: 187, outcome: 'booked', reason: 'booked',
    classifications: [
      { field: 'reason_for_call', value: 'Recall appointment', confidence: 0.95 },
      { field: 'outcome', value: 'Booked', confidence: 0.97 },
    ],
    transcript: ['Caller returned a recall message.', 'Reception booked the next available routine visit.'],
  },
  {
    id: 'c-1048', timestamp: '2026-08-22T10:35:58Z', line: 'Riverside main', callerType: 'New',
    durationSeconds: 74, outcome: 'not_booked', reason: 'service_not_offered',
    classifications: [
      { field: 'reason_for_call', value: 'Service enquiry', confidence: 0.9 },
      { field: 'reason_not_booked', value: 'Wanted a service not offered', confidence: 0.85 },
    ],
    transcript: ['Caller asked about a service the practice does not provide.', 'Reception referred them elsewhere.'],
  },
  {
    id: 'c-1049', timestamp: '2026-08-22T11:58:26Z', line: 'Riverside overflow', callerType: 'New',
    durationSeconds: 0, outcome: 'missed', reason: 'not_answered',
    classifications: [{ field: 'outcome', value: 'Not answered', confidence: 0.99 }],
    transcript: ['No answer during the lunch period. Caller did not try again.'],
  },
  {
    id: 'c-1050', timestamp: '2026-08-22T13:44:03Z', line: 'Lakeview main', callerType: 'New',
    durationSeconds: 156, outcome: 'not_booked', reason: 'ended_early',
    classifications: [
      { field: 'reason_for_call', value: 'General enquiry', confidence: 0.57 },
      { field: 'service_interest', value: 'Unclear', confidence: 0.42 },
      { field: 'reason_not_booked', value: 'Caller ended before booking', confidence: 0.55 },
    ],
    transcript: ['Audio quality was poor for part of the call.', 'Caller asked a question that was not fully captured.', 'Call ended before any appointment was discussed.'],
  },
  {
    id: 'c-1051', timestamp: '2026-08-22T15:07:41Z', line: 'Riverside main', callerType: 'New',
    durationSeconds: 263, outcome: 'booked', reason: 'booked',
    classifications: [
      { field: 'reason_for_call', value: 'New appointment request', confidence: 0.97 },
      { field: 'service_interest', value: 'Emergency', confidence: 0.88 },
      { field: 'outcome', value: 'Booked', confidence: 0.96 },
    ],
    transcript: ['Caller asked for the earliest available appointment.', 'Reception offered a same-day slot.', 'Caller accepted.'],
  },
  {
    id: 'c-1052', timestamp: '2026-08-22T16:21:14Z', line: 'Lakeview main', callerType: 'Existing',
    durationSeconds: 112, outcome: 'not_booked', reason: 'existing_admin',
    classifications: [
      { field: 'reason_for_call', value: 'Rescheduling', confidence: 0.84 },
      { field: 'reason_not_booked', value: 'Existing patient, admin only', confidence: 0.72 },
    ],
    transcript: ['Caller asked to move an existing appointment.', 'Reception confirmed the change.'],
  },
];

export const reasonLabel = (id: ReasonId) =>
  REASON_TAXONOMY.find((reason) => reason.id === id)?.label ?? id;

export const needsReview = (call: CallRecord) =>
  call.classifications.some((c) => c.confidence < REVIEW_THRESHOLD);
