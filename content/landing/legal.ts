/**
 * TEMPORARY LANDING PAGE — Privacy and Terms.
 *
 * Deliberately generic. These are notices, not the final documents: the full
 * Privacy notice and Terms of use will replace them when they are finalised.
 * Every statement here is true of the website as it is built today: it sets no
 * cookies, loads no analytics or advertising scripts, and receives information
 * only when someone emails the company. No placeholders, no legal effect claimed.
 */

export const landingLegal = {
  privacy: {
    metaTitle: 'Privacy',
    description: 'How Rumiq Technologies (SMC-Private) Limited handles information from rumiq.ai.',
    eyebrow: 'Privacy',
    headline: 'Privacy notice',
    intro:
      'This is a short summary of how we handle information on this website. The full privacy notice will replace it when it is published.',
    sections: [
      {
        heading: 'Who we are',
        paragraphs: [
          'This website is operated by Rumiq Technologies (SMC-Private) Limited, registered in DIFC, Dubai.',
        ],
      },
      {
        heading: 'What this website does',
        paragraphs: [
          'This website does not set cookies. It does not load analytics or advertising scripts.',
          'We do not pass visitor information to advertising platforms.',
        ],
      },
      {
        heading: 'What we receive',
        paragraphs: [
          'If you email us, we receive your email address and whatever you include in the message.',
          'If you apply for a role, we receive the documents and any examples you send with your application.',
        ],
      },
      {
        heading: 'How we use it',
        paragraphs: [
          'We use what you send only to reply to you, to discuss working with us, and to run our hiring process. We keep it only for as long as those purposes require.',
        ],
      },
      {
        heading: 'Your choices',
        paragraphs: [
          'You can ask what information we hold about you, or ask us to correct or delete it, by emailing mohammed.khan@rumiq.ai.',
        ],
      },
      {
        heading: 'Changes',
        paragraphs: ['We may update this summary from time to time.'],
      },
    ],
  },

  terms: {
    metaTitle: 'Terms',
    description: 'The basic terms for using rumiq.ai.',
    eyebrow: 'Terms',
    headline: 'Terms of use',
    intro:
      'These are the basic terms for using this website. The full terms will replace them when they are published.',
    sections: [
      {
        heading: 'Using this website',
        paragraphs: [
          'This website describes Rumiq and our work. You may read it and contact us through it.',
        ],
      },
      {
        heading: 'Not advice',
        paragraphs: [
          'Nothing on this website is legal, regulatory or clinical advice. Regulatory obligations vary by jurisdiction and should be validated with counsel.',
        ],
      },
      {
        heading: 'Accuracy',
        paragraphs: [
          'We make reasonable efforts to keep the information on this website accurate and up to date, but we do not guarantee that it is complete or current.',
        ],
      },
      {
        heading: 'Our content',
        paragraphs: [
          'The text, design and brand on this website belong to Rumiq Technologies (SMC-Private) Limited. Please do not copy them for commercial use without our written permission.',
        ],
      },
      {
        heading: 'Liability',
        paragraphs: [
          'This website is provided as it is. To the extent permitted by law, Rumiq Technologies (SMC-Private) Limited is not liable for any loss arising from its use.',
        ],
      },
      {
        heading: 'Contact',
        paragraphs: ['Questions about these terms can be sent to mohammed.khan@rumiq.ai.'],
      },
    ],
  },
} as const;
