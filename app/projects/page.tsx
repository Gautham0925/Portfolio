import type { Metadata } from "next";

import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Tilt } from "@/components/motion/Tilt";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { otherProjects, projects } from "@/lib/content";

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
        <RevealGroup>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <li key={project.slug}>
                <RevealItem className="h-full">
                  <Tilt className="h-full">
                    <ProjectCard project={project} headingLevel="h2" />
                  </Tilt>
                </RevealItem>
              </li>
            ))}
          </ul>
        </RevealGroup>
      </div>
      {otherProjects.length > 0 && (
        <section aria-labelledby="more-projects" className="mt-20">
          <SectionHeading eyebrow="Also built" title={<span id="more-projects">More projects</span>} />
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {otherProjects.map((project) => (
              <li key={project.title}>
                <Card className="flex h-full flex-col gap-4">
                  <h3 className="font-semibold leading-snug">{project.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{project.description}</p>
                  <ul className="mt-auto flex flex-wrap gap-2" aria-label="Technology stack">
                    {project.stack.map((tech) => (
                      <li key={tech}>
                        <Badge>{tech}</Badge>
                      </li>
                    ))}
                  </ul>
                </Card>
              </li>
            ))}
          </ul>
        </section>
      )}
    </PageContainer>
  );
}
