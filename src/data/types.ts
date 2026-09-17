// Shared content types. Content lives in /data so future CV updates never
// require touching component code.

export type CertCategory =
  | 'ACADEMIC'
  | 'SCHOLARSHIPS'
  | 'COMPETITIONS'
  | 'ARTS'
  | 'RECOGNITION';

export interface NavItem {
  id: string;
  label: string;
}

export type ExperienceKind = 'founder' | 'work' | 'learning';

export interface ExperienceItem {
  id: string;
  role: string;
  org: string;
  meta?: string; // short descriptor line, e.g. "B2C Seedling Chain"
  location?: string;
  period: string; // human display period
  year: number; // primary year for the timeline (0 = "earlier / prior")
  kind: ExperienceKind;
  tag?: string; // e.g. "Learning Project", "Remote", "On Site"
  description: string;
  bullets?: string[];
  link?: { label: string; href: string };
}

export interface EducationItem {
  id: string;
  institution: string;
  school: string;
  degree: string;
  degreeNative?: string;
  periodFrom: number;
  periodTo: number;
  periodLabel: string; // e.g. "2024 → 2030"
  location: string;
  qualification: string;
  primary?: boolean;
}

export type ProjectMotif = 'terminal' | 'document' | 'blueprint' | 'botanical';

export interface Project {
  id: string;
  name: string;
  category: string; // e.g. "AI PLATFORM · B2B SaaS · LEARNING PROJECT"
  description: string;
  motif: ProjectMotif;
  year: string;
  cta?: { label: string; href: string };
}

export interface Achievement {
  id: string;
  year: string;
  title: string;
  issuer: string;
  detail: string;
  highlights?: string[];
  centerpiece?: boolean;
  certRef?: string; // certificate id to open in the archive lightbox
}

export type LanguageTier = 1 | 2 | 3; // visual weight only — NOT a percentage

export interface Language {
  id: string;
  name: string;
  level: string; // 'Native' | 'C2' | 'A2' | 'A1'
  descriptor: string;
  glyph: string; // sample glyph/word rendered in the orbit
  tier: LanguageTier;
}

export interface Certificate {
  id: string;
  title: string;
  issuer?: string;
  year?: string;
  categories: CertCategory[];
  thumb: string; // '' when no recoverable image
  images: string[]; // full images for the lightbox; [] => metadata-only card
  note?: string;
}

/** The archive filter vocabulary: every CertCategory plus a leading "ALL". */
export type ArchiveFilter = 'ALL' | CertCategory;

// ---- Profile (singleton) ----
export interface Credential {
  k: string;
  v: string;
}

export interface ProfileLinks {
  systern: string;
  quadnos: string;
  crawspdf: string;
}

export interface Profile {
  name: string;
  first: string;
  last: string;
  positioning: string[];
  tagline: string;
  location: string;
  citizenship: string;
  status: string;
  email: string;
  phoneDisplay: string;
  phoneHref: string;
  credentials: Credential[];
  about: string[];
  links: ProfileLinks;
}

// ---- Editorial content (singletons) ----
export interface KeyStatement {
  headline: string;
  lines: string[];
}

export interface SectionIntro {
  eyebrow: string;
  title: string;
  body?: string;
}

/** Section intro copy, keyed by the section slug it heads. */
export interface SectionIntros {
  intersection: SectionIntro;
  work: SectionIntro;
  experience: SectionIntro;
  distinctions: SectionIntro;
  languages: SectionIntro;
  archive: SectionIntro;
}
