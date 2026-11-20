import type { Metadata } from "next";

import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description: "Security engineering projects and case studies by Gautham P Kini.",
};

export default function ProjectsPage() {
  return (
    <PageContainer>
      <SectionHeading
        as="h1"
        eyebrow="Work"
        title="Projects"
        description="Security training platforms and CTF infrastructure — each with a case study covering architecture, security design and lessons learned."
      />
      <div className="mt-12">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} headingLevel="h2" />
            </li>
          ))}
        </ul>
      </div>
    </PageContainer>
  );
}
