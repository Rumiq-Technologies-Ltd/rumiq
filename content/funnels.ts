import type { FunnelStage } from '@/components/rumiq';

/**
 * Section 8.1 / 8.8 — funnel stage arrays.
 *
 * <FunnelTrack> assumes nothing about length, so each sector supplies its own
 * array. These two ship now; a sector added later supplies its own from its
 * config (Section 9.2). Copy lives here, not in the component.
 *
 * Vocabulary rule (Section 8.8): the transport stages use the operator's own
 * language and stay at the operational level. No named systems, no brokers, no
 * claims about integration.
 */

/** The clinical provider journey. Seventeen stages, genuinely sequential. */
export const clinicalFunnel: FunnelStage[] = [
  { id: 'market', name: 'Market and capacity strategy', measures: 'Where demand is worth creating, given the rooms and teams you actually have.', plane: 'public' },
  { id: 'demand-creation', name: 'Demand creation', measures: 'Spend, reach and impressions by channel, service and location.', plane: 'public' },
  { id: 'demand-discovery', name: 'Demand discovery', measures: 'Search, map, directory and AI-assistant visibility for the services you sell.', plane: 'public' },
  { id: 'trust', name: 'Trust and consideration', measures: 'What a prospective patient reads before they act, and what it costs you when it is missing.', plane: 'public' },
  { id: 'patient-access', name: 'Patient access', measures: 'Calls, forms, chat and text arriving, and how many are answered live.', plane: 'boundary' },
  { id: 'qualification', name: 'Qualification and routing', measures: 'New against existing, reason for contact, and where the enquiry was sent.', plane: 'boundary' },
  { id: 'scheduling', name: 'Scheduling', measures: 'Appointments booked, and the offers declined because nothing suitable was free.', plane: 'boundary' },
  { id: 'pre-visit', name: 'Pre-visit conversion', measures: 'Forms completed, authorisations cleared and reminders acknowledged.', plane: 'protected' },
  { id: 'attendance', name: 'Attendance', measures: 'Who actually arrived. The first number most marketing reporting never sees.', plane: 'protected' },
  { id: 'treatment-consideration', name: 'Treatment consideration', measures: 'Plans presented, by service and by provider.', plane: 'protected' },
  { id: 'financial', name: 'Financial conversion', measures: 'Plans accepted, and what stopped the rest.', plane: 'protected' },
  { id: 'treatment-start', name: 'Treatment start', measures: 'Care actually delivered. The point at which revenue exists.', plane: 'protected' },
  { id: 'experience', name: 'Experience and service recovery', measures: 'What patients said, and whether anyone acted on it.', plane: 'protected' },
  { id: 'retention', name: 'Retention and recall', measures: 'Return visits due, booked and missed.', plane: 'protected' },
  { id: 'advocacy', name: 'Advocacy', measures: 'Referrals and reviews, attributed back to the experience that produced them.', plane: 'protected' },
  { id: 'reactivation', name: 'Reactivation', measures: 'Lapsed patients contacted, and the ones who came back.', plane: 'protected' },
  { id: 'learning', name: 'Learning and reallocation', measures: 'What the last cycle proved, and where the next unit of spend goes.', plane: 'boundary' },
];

/**
 * The transport journey. Deliberately generic: the pilot architecture work has
 * not started, so this stays at the level of the operational problem
 * (Sections 0.3, 4.5, 8.8). Refine when the pilot detail arrives.
 */
export const transportFunnel: FunnelStage[] = [
  { id: 'enquiry', name: 'Enquiry', measures: 'Where the enquiry came from, including the facility relationships that go unrecorded.', plane: 'public' },
  { id: 'trip-request', name: 'Trip request', measures: 'Requests raised against enquiries received.', plane: 'boundary' },
  { id: 'approved', name: 'Approved', measures: 'Requests cleared to proceed, and the ones that stall.', plane: 'boundary' },
  { id: 'scheduled', name: 'Scheduled', measures: 'Journeys placed on the schedule, by service area and journey type.', plane: 'protected' },
  { id: 'assigned', name: 'Assigned', measures: 'Journeys with a vehicle and a driver against those still unassigned.', plane: 'protected' },
  { id: 'completed', name: 'Completed', measures: 'Journeys delivered. The outcome the operator is actually paid for.', plane: 'protected' },
  { id: 'repeat', name: 'Repeat volume', measures: 'Which relationships send work again, and which quietly stopped.', plane: 'protected' },
];
