import type { Achievement } from './types';

// §17 Academic Distinctions. No fabricated monetary values.
export const achievements: Achievement[] = [
  {
    id: 'rossotrudnichestvo',
    year: '2023',
    title: 'Fully Funded Government Scholarship',
    issuer:
      'Ministry of Science and Higher Education (Minobrnauki) · Rossotrudnichestvo',
    detail: 'Fully funded — six-year Medicine programme.',
    highlights: [
      'State-Sponsored Accommodation',
      'Travel Expenses',
      'Residency Permit',
    ],
    centerpiece: true,
    certRef: 'scholarship-rossotrudnichestvo',
  },
  {
    id: 'enic-kazakhstan',
    year: '2023',
    title: 'Bologna Process — Fully Funded Higher Scholarship',
    issuer: 'ENIC Kazakhstan',
    detail: 'Grantee in MD Medicine under the Bologna Process.',
  },
  {
    id: 'helsinki',
    year: '2025',
    title: 'MOOC — Basic Programming / Computer Science',
    issuer: 'University of Helsinki, Finland',
    detail: 'Open online coursework in programming and computer science.',
  },
];
