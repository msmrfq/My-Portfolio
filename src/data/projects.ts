import type { Project } from './types';

// Four selected work objects (§14). Order = curated importance.
export const projects: Project[] = [
  {
    id: 'quadnos',
    name: 'Quadnos',
    category: 'AI Platform · B2B SaaS · Learning Project',
    description:
      "Designed and entirely built a robust B2B SaaS architecture using rapid 'Vibe Coding' methodologies.",
    motif: 'terminal',
    year: '2026',
    cta: { label: 'View platform', href: 'https://quadnos.ilmnos.com' },
  },
  {
    id: 'crawspdf',
    name: 'Craws PDF',
    category: 'AI · Open Source · Learning Project',
    description:
      'Contributed core logic to open-source automated PDF indexing and crawling technology.',
    motif: 'document',
    year: '2026',
    cta: { label: 'View GitHub', href: 'https://github.com/msmrfq/crawspdf' },
  },
  {
    id: 'systern',
    name: 'Systern',
    category: 'Digital Agency · Web Platform',
    description:
      'Architected and deployed the official agency platform through Odoo.',
    motif: 'blueprint',
    year: '2025',
    cta: { label: 'View platform', href: 'https://systern.ilmnos.com' },
  },
  {
    id: 'pixileaf',
    name: 'Pixileaf',
    category: 'B2C · Agriculture · Entrepreneurship',
    description:
      'A B2C seedling chain based in South 24 Parganas, West Bengal.',
    motif: 'botanical',
    year: '2026',
  },
];
