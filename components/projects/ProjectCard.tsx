import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiGithub } from "react-icons/fi";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ProjectPreview } from "./ProjectPreview";
import { formatMonth, type Project } from "@/lib/content";

type ProjectCardProps = {
  project: Project;
  headingLevel?: "h2" | "h3";
};

export function ProjectCard({ project, headingLevel: Heading = "h3" }: ProjectCardProps) {
  const href = `/projects/${project.slug}`;
  return (
    <Card interactive className="group relative flex h-full flex-col overflow-hidden p-0">
      {project.image ? (
        <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-surface-2">
          <Image
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-top"
          />
        </div>
      ) : (
        <div className="bg-grid relative flex h-28 items-end justify-between gap-4 border-b border-border bg-surface-2 px-6 pb-5">
          <p className="min-w-0 truncate font-mono text-xs text-subtle">/{project.slug}</p>
          {project.highlights[0] && (
            <p className="shrink-0 text-right">
              <span className="block font-mono text-2xl font-semibold text-accent-text">{project.highlights[0].value}</span>
              <span className="block text-xs text-muted">{project.highlights[0].label}</span>
            </p>
          )}
        </div>
      )}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="eyebrow">{project.category}</p>
          <span className="font-mono text-xs text-subtle">{formatMonth(project.updated)}</span>
        </div>
        <Heading className="text-lg font-semibold">
          <Link href={href} className="after:absolute after:inset-0 focus-visible:outline-none">
            {project.title}
          </Link>
        </Heading>
        <p className="text-sm leading-relaxed text-muted">{project.summary}</p>
        <ProjectPreview overview={project.caseStudy.overview} problem={project.caseStudy.problem} />
        <ul className="mt-auto flex flex-wrap gap-2" aria-label="Technology stack">
          {project.stack.slice(0, 5).map((tech) => (
            <li key={tech}>
              <Badge>{tech}</Badge>
            </li>
          ))}
          {project.stack.length > 5 && (
            <li>
              <Badge>+{project.stack.length - 5}</Badge>
            </li>
          )}
        </ul>
        <div className="flex items-center justify-between gap-4 border-t border-border pt-4 text-sm">
          <span className="inline-flex items-center gap-1.5 font-medium text-fg group-hover:text-accent-text">
            Case study
            <FiArrowRight aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
          </span>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex items-center gap-1.5 text-muted hover:text-fg"
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
