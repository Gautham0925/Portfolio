import Image from "next/image";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { Project } from "@/lib/content";

type ProjectCardProps = {
  project: Project;
  headingLevel?: "h2" | "h3";
};

export function ProjectCard({ project, headingLevel: Heading = "h3" }: ProjectCardProps) {
  return (
    <Card interactive className="group flex h-full flex-col overflow-hidden p-0">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-surface-2">
        <Image
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <p className="eyebrow">{project.category}</p>
        <Heading className="text-lg font-semibold">{project.title}</Heading>
        <p className="text-sm leading-relaxed text-muted">{project.description}</p>
        <ul className="mt-auto flex flex-wrap gap-2" aria-label="Technology stack">
          {project.stack.map((tech) => (
            <li key={tech}>
              <Badge>{tech}</Badge>
            </li>
          ))}
        </ul>
        <div className="flex gap-4 border-t border-border pt-4 text-sm">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-fg hover:text-accent-text"
            >
              Live demo
              <FiArrowUpRight aria-hidden="true" />
              <span className="sr-only">for {project.title} (opens in new tab)</span>
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-muted hover:text-fg"
            >
              <FiGithub aria-hidden="true" />
              Source
              <span className="sr-only">code for {project.title} (opens in new tab)</span>
            </a>
          )}
        </div>
      </div>
    </Card>
  );
}
