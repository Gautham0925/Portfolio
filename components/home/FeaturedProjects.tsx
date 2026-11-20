import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects } from "@/lib/content";

export function FeaturedProjects() {
  if (projects.length === 0) return null;
  return (
    <section aria-labelledby="featured-title" className="flex flex-col gap-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading eyebrow="Selected work" title={<span id="featured-title">Projects</span>} />
        <Link href="/projects" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-fg">
          All projects
          <FiArrowRight aria-hidden="true" />
        </Link>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.slice(0, 3).map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </section>
  );
}
