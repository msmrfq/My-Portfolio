import type { Certificate } from './types';

// Image paths are produced by scripts/process-assets.mjs from the archived Wix
// exports. Categories drive the archive filter (§18).
export const certificates: Certificate[] = [
  {
    id: 'scholarship-rossotrudnichestvo',
    title: 'Russian Government Scholarship',
    issuer: 'Minobrnauki · Rossotrudnichestvo',
    year: '2023',
    categories: ['SCHOLARSHIPS', 'ACADEMIC'],
    thumb: '/assets/certificates/scholarship-rossotrudnichestvo-thumb.webp',
    images: ['/assets/certificates/scholarship-rossotrudnichestvo.webp'],
  },
  {
    id: 'talent-science',
    title: 'Talent Search Examination on Science',
    categories: ['COMPETITIONS', 'ACADEMIC'],
    thumb: '/assets/certificates/talent-science-thumb.webp',
    images: ['/assets/certificates/talent-science.webp'],
  },
  {
    id: 'talent-pathfinder',
    title: 'All India National Pathfinder Talent Search',
    categories: ['COMPETITIONS', 'ACADEMIC'],
    thumb: '/assets/certificates/talent-pathfinder-thumb.webp',
    images: ['/assets/certificates/talent-pathfinder.webp'],
  },
  {
    id: 'talent-adamas',
    title: 'All India Adamas Talent Search',
    categories: ['COMPETITIONS', 'ACADEMIC'],
    thumb: '/assets/certificates/talent-adamas-thumb.webp',
    images: ['/assets/certificates/talent-adamas.webp'],
  },
  {
    id: 'talent-geography',
    title: 'Talent Test Examination in Geography',
    categories: ['COMPETITIONS', 'ACADEMIC'],
    thumb: '/assets/certificates/talent-geography-thumb.webp',
    images: ['/assets/certificates/talent-geography.webp'],
  },
  {
    id: 'fine-arts',
    title: 'Certificates in Fine Arts',
    categories: ['ARTS'],
    thumb: '/assets/certificates/fine-arts-1-thumb.webp',
    images: [
      '/assets/certificates/fine-arts-1.webp',
      '/assets/certificates/fine-arts-2.webp',
      '/assets/certificates/fine-arts-3.webp',
      '/assets/certificates/fine-arts-4.webp',
      '/assets/certificates/fine-arts-5.webp',
      '/assets/certificates/fine-arts-6.webp',
    ],
  },
  {
    id: 'police-appreciation',
    title: 'Appreciation Certificate from Police',
    categories: ['RECOGNITION'],
    thumb: '/assets/certificates/police-appreciation-thumb.webp',
    images: ['/assets/certificates/police-appreciation.webp'],
  },
];

export const certCategories = [
  'ALL',
  'ACADEMIC',
  'SCHOLARSHIPS',
  'COMPETITIONS',
  'ARTS',
  'RECOGNITION',
] as const;
