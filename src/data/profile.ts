import type { Profile } from './types';

export const profile: Profile = {
  name: 'Masum Rafique',
  first: 'Masum',
  last: 'Rafique',
  positioning: ['Medicine', 'Technology', 'Design', 'Enterprise'],
  tagline: 'Building at the intersection of medicine, technology and enterprise.',
  location: 'Moscow, Russian Federation',
  citizenship: 'India',
  status: 'Temporary Residency (RVPO) & Work Permit — Russian Federation',
  email: 'masumrafique@hotmail.com',
  phoneDisplay: '+91 90642 28673',
  phoneHref: '+919064228673',
  // Hero credential strip (§11) — visible without navigating away.
  credentials: [
    {
      k: 'General Medicine',
      v: 'Sechenov University · Moscow · Expected 2030',
    },
    {
      k: 'Government Scholarship',
      v: 'Rossotrudnichestvo · Minobrnauki · 2023',
    },
    {
      k: 'Multidisciplinary Builder',
      v: 'Medicine · AI · SaaS · Business',
    },
  ],
  about: [
    'Masum Rafique is a medical student at I.M. Sechenov First Moscow State Medical University in Moscow, with interests and hands-on experience spanning technology, AI, digital products and entrepreneurship.',
    'His work sits across several disciplines — from medicine and academic development to software platforms, AI projects and early-stage businesses. This portfolio is a record of that trajectory.',
  ],
  // Known, verified public links only (§21, §35). No invented socials.
  links: {
    systern: 'https://systern.ilmnos.com',
    quadnos: 'https://quadnos.ilmnos.com',
    crawspdf: 'https://github.com/msmrfq/crawspdf',
  },
};
