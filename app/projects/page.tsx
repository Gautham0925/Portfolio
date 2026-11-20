import type { Metadata } from "next";

import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description: "Security and networking tools built by Gautham P Kini.",
};

export default function ProjectsPage() {
  return (
    <PageContainer>
      <SectionHeading
        as="h1"
        eyebrow="Work"
        title="Projects"
        description="Security, cryptography and networking tools — source code and live demos."
      />
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} headingLevel="h2" />
          </li>
        ))}
      </ul>
    </PageContainer>
  );
}
