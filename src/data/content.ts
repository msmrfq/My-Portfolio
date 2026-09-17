// Editorial copy for the site. §13's key statement is portfolio positioning —
// NOT a factual quotation from the CV — so it is never presented as an
// attributed quote.

import type { KeyStatement, SectionIntros } from './types';

export const keyStatement: KeyStatement = {
  headline: 'A multidisciplinary trajectory.',
  lines: [
    'Medicine taught me to understand complex systems.',
    'Technology taught me to build them.',
    'Entrepreneurship taught me to make them useful.',
  ],
};

export const sectionIntros: SectionIntros = {
  intersection: {
    eyebrow: 'The Intersection',
    title: 'One identity, several disciplines.',
    body: 'Science, medicine, technology and enterprise are not separate interests here — they are parts of a single trajectory.',
  },
  work: {
    eyebrow: 'Selected Work',
    title: 'Things built, shipped and learned from.',
  },
  experience: {
    eyebrow: 'Experience',
    title: 'A timeline of building.',
  },
  distinctions: {
    eyebrow: 'Academic Distinctions',
    title: 'Recognitions that funded the work.',
  },
  languages: {
    eyebrow: 'Languages',
    title: 'Six languages across three scripts.',
  },
  archive: {
    eyebrow: 'The Archive',
    title: 'Selected records, recognitions and certificates.',
  },
};
