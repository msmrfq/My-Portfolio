// The complete content the site renders, assembled into one object. This is
// the single source of truth: every section reads from a live snapshot via
// usePortfolioData(), so a change to any field propagates everywhere in one
// React commit — no per-section state, no drift, no desync.

import type {
  Achievement,
  ArchiveFilter,
  Certificate,
  EducationItem,
  ExperienceItem,
  KeyStatement,
  Language,
  NavItem,
  Profile,
  Project,
  SectionIntros,
} from './types';
import type { IntersectionNode } from './intersection';

import { profile } from './profile';
import { experience } from './experience';
import { education } from './education';
import { projects } from './projects';
import { achievements } from './achievements';
import { languages } from './languages';
import { certificates, certCategories } from './certificates';
import { navItems } from './navigation';
import { intersectionNodes } from './intersection';
import { keyStatement, sectionIntros } from './content';

export interface PortfolioSnapshot {
  profile: Profile;
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: Project[];
  achievements: Achievement[];
  languages: Language[];
  certificates: Certificate[];
  certCategories: readonly ArchiveFilter[];
  navItems: NavItem[];
  intersectionNodes: IntersectionNode[];
  keyStatement: KeyStatement;
  sectionIntros: SectionIntros;
}

// Bundled seed = the current hand-authored content. Guarantees an instant,
// known-good first paint and a safe fallback if a future live fetch fails.
export const staticSnapshot: PortfolioSnapshot = {
  profile,
  experience,
  education,
  projects,
  achievements,
  languages,
  certificates,
  certCategories,
  navItems,
  intersectionNodes,
  keyStatement,
  sectionIntros,
};
