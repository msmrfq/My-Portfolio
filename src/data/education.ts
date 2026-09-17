import type { EducationItem } from './types';

export const education: EducationItem[] = [
  {
    id: 'sechenov-md',
    institution: 'I.M. Sechenov First Moscow State Medical University',
    school: 'N.V. Sklifosovsky Institute of Clinical Medicine',
    degree: 'MD / General Medicine',
    degreeNative: 'Лечебное дело',
    periodFrom: 2024,
    periodTo: 2030,
    periodLabel: '2024 → 2030',
    location: 'Moscow · Russian Federation',
    qualification: 'Higher Education',
    primary: true,
  },
  {
    id: 'sechenov-lang',
    institution: 'I.M. Sechenov First Moscow State Medical University',
    school: 'Institute of Linguistics and Intercultural Communication',
    degree: 'Russian Language and Literature',
    periodFrom: 2024,
    periodTo: 2024,
    periodLabel: '2024',
    location: 'Moscow · Russian Federation',
    qualification: 'Secondary Vocational Certification',
  },
];
