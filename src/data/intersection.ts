// §12 — "The Intersection" credential constellation. Only capabilities
// actually supported by the CV / project material are listed.

export interface IntersectionNode {
  id: string;
  title: string;
  items: string[];
  // Layout position as a percentage of the stage (desktop). Kept in data so the
  // arrangement is tunable without touching component logic.
  x: number;
  y: number;
}

export const intersectionNodes: IntersectionNode[] = [
  {
    id: 'medicine',
    title: 'Medicine',
    items: ['General Medicine', 'Sechenov University', 'Moscow'],
    x: 50,
    y: 16,
  },
  {
    id: 'technology',
    title: 'Technology',
    items: ['AI', 'SaaS', 'Automation', 'Web Development'],
    x: 84,
    y: 42,
  },
  {
    id: 'design',
    title: 'Design',
    items: ['UI/UX', 'Constract', 'OMS Lab'],
    x: 70,
    y: 82,
  },
  {
    id: 'entrepreneurship',
    title: 'Entrepreneurship',
    items: ['Pixileaf', 'Bazmart', 'Ilms Magazine'],
    x: 30,
    y: 82,
  },
  {
    id: 'academia',
    title: 'Academia',
    items: ['Scholarships', 'University of Helsinki', 'Academic achievements'],
    x: 16,
    y: 58,
  },
  {
    id: 'languages',
    title: 'Languages',
    items: ['Bengali', 'English', 'Hindi', 'Urdu', 'Russian', 'Turkish'],
    x: 16,
    y: 42,
  },
];
