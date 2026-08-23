/**
 * Legal page scaffolds — /privacy, /cookies, /terms.
 *
 * These routes exist so the footer stops returning 404s and so the structure is
 * agreed before counsel is engaged. Section 4.2: nothing here is legal advice,
 * and no statement of legal effect may be published from this codebase.
 *
 * The banner is deliberately impossible to miss. A half-written privacy notice
 * that looks finished is worse than an empty route, because a reader will rely
 * on it.
 *
 * What each page DOES state is limited to facts about this build that are true
 * today and verifiable in the code: which cookies exist, what runs, what does
 * not. Everything with legal effect is listed as an outstanding section.
 */

export const legalBanner = {
  label: 'AWAITING LEGAL REVIEW',
  body: 'This page is a structural scaffold, not a legal document. It has not been drafted or reviewed by counsel, it creates no obligations and no rights, and it must not be relied on. The outstanding sections are listed below so the gaps are visible rather than implied.',
} as const;

export type LegalPage = {
  slug: 'privacy' | 'cookies' | 'terms';
  title: string;
  metaTitle: string;
  description: string;
  eyebrow: string;
  headline: string;
  standfirst: string;
  /** True today, verifiable in this repository. Safe to publish. */
  factual: { heading: string; points: readonly string[] };
  /** Sections counsel has to write. Named so the gap is legible. */
  outstanding: { heading: string; points: readonly string[] };
};

export const legalPages: Record<LegalPage['slug'], LegalPage> = {
  privacy: {
    slug: 'privacy',
    title: 'Privacy notice',
    metaTitle: 'Privacy notice',
    description:
      'The Rumiq privacy notice. Currently a structural scaffold awaiting legal review, alongside a factual account of what this website does and does not collect.',
    eyebrow: 'PRIVACY',
    headline: 'Privacy notice',
    standfirst:
      'The notice that will govern personal data handled by Rumiq Technologies Ltd, both on this website and in the platform. It is not written yet. What is stated below about this website is factual and checkable in the source.',
    factual: {
      heading: 'True of this website today',
      points: [
        'No analytics, advertising, tag management or session recording script runs on this site, whatever you choose in the cookie banner. There is nothing to turn on yet.',
        'No third-party domain is contacted to render any page. Fonts are self-hosted, and no image, script, iframe or font is loaded from anyone else.',
        'Your cookie choice is stored in a first-party cookie on this domain and is never sent anywhere.',
        'The three forms on this site post to this site’s own server. Submissions are forwarded to a single configured destination and are not shared with an advertising or analytics platform.',
        'The Growth Leak Scorecard is a self-assessment. It does not scan, crawl, inspect or analyse your website or any of your systems. Your answers are the only input.',
        'An email address given to the scorecard or a form is sent in the request body, never in a URL, so it cannot appear in a query string, a referrer header or a proxy log.',
        'The demos are driven by synthetic data held in this repository. No patient record, real call or customer system is involved.',
      ],
    },
    outstanding: {
      heading: 'Sections counsel still has to write',
      points: [
        'Controller and processor roles, per region, and the identity of the entity responsible for each.',
        'Lawful bases for each processing purpose, and the position taken on legitimate interests.',
        'Retention periods for enquiry, scorecard and subscription data.',
        'Subprocessors, hosting locations and the mechanism relied on for any cross-border transfer.',
        'Data subject rights and the process for exercising them, including the request route and response times.',
        'The HIPAA position for US customers, including the scope of Business Associate Agreements.',
        'UAE Federal Decree-Law No. 45 of 2021 and DIFC Data Protection Law No. 5 of 2020 disclosures.',
        'Breach notification commitments and contact details for the data protection function.',
      ],
    },
  },

  cookies: {
    slug: 'cookies',
    title: 'Cookie notice',
    metaTitle: 'Cookie notice',
    description:
      'What this site stores in your browser, and what it does not. Currently a structural scaffold awaiting legal review.',
    eyebrow: 'COOKIES',
    headline: 'Cookie notice',
    standfirst:
      'The full notice is awaiting legal review. The inventory below is not: it is the complete list of what this build stores in your browser, and it is short because nothing non-essential is loaded.',
    factual: {
      heading: 'The complete inventory, today',
      points: [
        'One first-party cookie recording your consent choice, so the banner does not ask again on every page. It contains your choice and nothing else, and it is readable only by this domain.',
        'No analytics cookie. No advertising cookie. No cross-site identifier. No pixel, no tag manager, no consent-management vendor.',
        'Analytics and marketing categories are off by default and stay off until you switch them on. While they are off, nothing is loaded rather than loaded-and-ignored.',
        'Turning them on today changes nothing observable, because this build ships no analytics or marketing script at all. The controls exist so that consent is in place before anything is ever added.',
        'You can change or withdraw your choice at any time using Cookie preferences in the footer. Withdrawing is one action, in the same place as granting.',
      ],
    },
    outstanding: {
      heading: 'Sections counsel still has to write',
      points: [
        'The formal cookie table, with named cookies, purposes, durations and controllers, once any non-essential technology is introduced.',
        'Jurisdiction-specific consent language for the United States and the Gulf.',
        'The position on consent records: what is retained as evidence of a choice, and for how long.',
        'How consent interacts with the platform’s own Consent and Preference Service for customers’ patients, which is a separate question from this website.',
      ],
    },
  },

  terms: {
    slug: 'terms',
    title: 'Terms of use',
    metaTitle: 'Terms of use',
    description:
      'Terms of use for the Rumiq website. Currently a structural scaffold awaiting legal review.',
    eyebrow: 'TERMS',
    headline: 'Terms of use',
    standfirst:
      'Terms governing use of this website. Not drafted, not reviewed, and not in force. Platform terms are a separate document and are agreed contractually, not by browsing.',
    factual: {
      heading: 'Stated plainly in the meantime',
      points: [
        'This site is marketing material and product documentation. Nothing on it is an offer, a warranty, or a commitment to deliver any particular capability on any particular date.',
        'Nothing on this site is legal, regulatory or clinical advice. Regulatory obligations vary by jurisdiction and should be validated with counsel.',
        'Every figure in every demo is synthetic and labelled as illustrative on screen. No demo figure describes the performance of any real customer.',
        'No certification, accreditation or approval by any authority is claimed anywhere on this site. Where a framework is named, it is named as an obligation the platform is designed against.',
        'Module availability described on this site reflects design intent during a pre-launch phase. Availability status is not published while it would be wrong by launch.',
      ],
    },
    outstanding: {
      heading: 'Sections counsel still has to write',
      points: [
        'Governing law and jurisdiction, and the interaction with DIFC registration.',
        'Acceptable use, and the limits on automated access to this site.',
        'Intellectual property, trade marks and permitted quotation.',
        'Limitation of liability and disclaimers appropriate to each region.',
        'The relationship between these website terms and the platform agreement, including which document prevails.',
      ],
    },
  },
};
