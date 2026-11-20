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
  contact: { email: string; phone: string; location: string };
  facts: { label: string; value: string }[];
  stats: { value: number; label: string }[];
};

export type Experience = { organization: string; role: string; period: string };
export type Education = { institution: string; qualification: string; period: string };
export type SkillGroup = { group: string; items: string[] };
export type Certification = { issuer: string; name: string; year: string; image: string };
export type Project = {
  slug: string;
  category: string;
  title: string;
  description: string;
  stack: string[];
  image: string;
  live?: string;
  github?: string;
};

export const profile: Profile = profileData;
export const experience: readonly Experience[] = experienceData;
export const education: readonly Education[] = educationData;
export const skills: readonly SkillGroup[] = skillsData;
export const certifications: readonly Certification[] = certificationsData;
export const projects: readonly Project[] = projectsData;
