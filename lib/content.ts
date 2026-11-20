import profileData from "@/content/profile.json";
import experienceData from "@/content/experience.json";
import educationData from "@/content/education.json";
import skillsData from "@/content/skills.json";
import certificationsData from "@/content/certifications.json";
import projectsData from "@/content/projects.json";

export type Profile = {
  name: string;
  headline: string;
  summary: string;
  tagline: string;
  photo: string;
  contact: { email: string; location: string };
  facts: { label: string; value: string }[];
  stats: { value: number; label: string }[];
};

export type Experience = { organization: string; role: string; period: string };
export type Education = { institution: string; qualification: string; period: string };
export type SkillGroup = { group: string; items: string[] };
export type Certification = { issuer: string; name: string; year: string; image: string };
export type ArchitectureItem = { component: string; technology: string; role: string };

export type CaseStudy = {
  overview: string;
  problem: string;
  architecture: ArchitectureItem[];
  security: string[];
  testing: string;
  challenges: string[];
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  updated: string;
  stack: string[];
  github?: string;
  live?: string;
  image?: string;
  related?: { label: string; href: string }[];
  highlights: { value: string; label: string }[];
  caseStudy: CaseStudy;
};

export const profile: Profile = profileData;
export const experience: readonly Experience[] = experienceData;
export const education: readonly Education[] = educationData;
export const skills: readonly SkillGroup[] = skillsData;
export const certifications: readonly Certification[] = certificationsData;
export const projects: readonly Project[] = projectsData;

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function formatMonth(value: string): string {
  const [year, month] = value.split("-").map(Number);
  if (!year || !month) return value;
  return new Date(Date.UTC(year, month - 1, 1)).toLocaleDateString("en-GB", { month: "short", year: "numeric", timeZone: "UTC" });
}
