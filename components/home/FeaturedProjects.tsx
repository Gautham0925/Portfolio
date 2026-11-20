import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/lib/content";
import { ProjectSlider } from "./ProjectSlider";

export function FeaturedProjects() {
  if (projects.length === 0) return null;
  return (
    <section aria-labelledby="featured-title" className="flex flex-col gap-8">
      <Reveal className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading eyebrow="Selected work" title={<span id="featured-title">Projects</span>} />
        <Link href="/projects" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-fg">
          <span className="link-underline">All projects</span>
          <FiArrowRight aria-hidden="true" />
        </Link>
      </Reveal>
      <Reveal>
        <ProjectSlider projects={projects} />
      </Reveal>
    </section>
  );
}
