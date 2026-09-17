import type { ExperienceItem } from './types';

// Verbatim to the CV. No fabricated dates, titles, or claims.
export const experience: ExperienceItem[] = [
  {
    id: 'uiux-designer',
    role: 'Junior UI/UX Designer',
    org: 'Constract & OMS Lab',
    meta: 'Startup Design Collaboration',
    period: '2026',
    year: 2026,
    kind: 'work',
    description:
      'Worked closely with two startups — Constract and OMS Lab — on UI/UX design projects, contributing to user interface design and user experience optimization.',
    bullets: [
      'Collaborated with Constract (https://constract.in) on design solutions (still in progress)',
      'Collaborated with OMS Lab (https://www.omslab.in/ & https://oms.org.in) on designing and optimising their user interface and user experien',
    ],
  },
  {
    id: 'pixileaf',
    role: 'Co-Founder',
    org: 'Pixileaf',
    meta: 'B2C Seedling Chain',
    location: 'South 24 Parganas, West Bengal',
    period: 'January 2026',
    year: 2026,
    kind: 'founder',
    description:
      'A B2C seedling chain based in South 24 Parganas, West Bengal — currently in its early stage.',
  },
  {
    id: 'quadnos',
    role: 'AI Platform Developer',
    org: 'Quadnos',
    meta: 'B2B SaaS / AI Platform',
    period: 'January 2026 – March 2026',
    year: 2026,
    kind: 'learning',
    tag: 'Learning Project',
    description:
      "Designed and entirely built a robust B2B SaaS architecture using rapid 'Vibe Coding' methodologies.",
    link: { label: 'View platform', href: 'https://quadnos.ilmnos.com' },
  },
  {
    id: 'crawspdf',
    role: 'Core AI Developer',
    org: 'Craws PDF',
    meta: 'Open-source PDF indexing & crawling',
    period: 'February 2026 – April 2026',
    year: 2026,
    kind: 'learning',
    tag: 'Learning Project',
    description:
      'Contributed core logic to open-source automated PDF indexing and crawling technology.',
    link: { label: 'View GitHub', href: 'https://github.com/msmrfq/crawspdf' },
  },
  {
    id: 'ilms',
    role: 'Founder',
    org: 'Ilms Magazine',
    meta: 'Content · Marketing · Automation',
    period: 'December 2025 – February 2026',
    year: 2025,
    kind: 'founder',
    tag: 'Remote',
    description:
      'Founded and ran a remote content and marketing operation end to end.',
    bullets: [
      'Managed automated pipeline outreach trackers via scheduling spreadsheets.',
      'Produced copy and technical layout for professional email marketing newsletters.',
      'Authored SEO-optimized marketing scripts and high-conversion articles.',
      'Produced visual carousels and promotional posters.',
    ],
  },
  {
    id: 'systern',
    role: 'Developer',
    org: 'Systern',
    meta: 'Digital agency platform / Odoo',
    period: 'March 2025',
    year: 2025,
    kind: 'work',
    description:
      'Architected and deployed the official agency platform through Odoo, showcasing digital solutions.',
    link: { label: 'View platform', href: 'https://systern.ilmnos.com' },
  },
  {
    id: 'bazmart',
    role: 'Co-Founder',
    org: 'Bazmart Pvt. Ltd.',
    meta: 'Localized wholesaling of Allopathy Drugs',
    location: 'Murshidabad',
    period: 'January 2022',
    year: 2022,
    kind: 'founder',
    description: 'Localized wholesaling of Allopathy Drugs at Murshidabad.',
  },
  {
    id: 'retail',
    role: 'Sales Associate',
    org: 'Retail Operations',
    location: 'Moscow, Russia',
    period: 'Prior experience · 1 year',
    year: 0,
    kind: 'work',
    tag: 'On Site',
    description:
      'Maintained standard financial check-out systems, client-facing service operations, and logistics support.',
  },
];
