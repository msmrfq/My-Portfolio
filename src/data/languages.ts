import type { Language } from './types';

// Tier reflects visual weight only (§7, §19). Levels are verbatim from the CV —
// no percentages, no invented CEFR levels.
export const languages: Language[] = [
  { id: 'bengali', name: 'Bengali', level: 'Native', descriptor: 'Native', glyph: 'বাং', tier: 1 },
  { id: 'english', name: 'English', level: 'C2', descriptor: 'Full Professional Fluency', glyph: 'En', tier: 1 },
  { id: 'hindi', name: 'Hindi', level: 'C2', descriptor: 'Full Professional Fluency', glyph: 'हि', tier: 1 },
  { id: 'urdu', name: 'Urdu', level: 'C2', descriptor: 'Full Professional Fluency', glyph: 'اردو', tier: 1 },
  { id: 'russian', name: 'Russian', level: 'A2', descriptor: 'Elementary Working Proficiency', glyph: 'Ру', tier: 2 },
  { id: 'turkish', name: 'Turkish', level: 'A1', descriptor: 'Beginner Track', glyph: 'Tr', tier: 3 },
];
