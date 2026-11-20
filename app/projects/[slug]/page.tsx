import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { FiArrowLeft, FiArrowUpRight, FiGithub } from "react-icons/fi";

import { ArchitectureDiagram } from "@/components/projects/ArchitectureDiagram";
import { PageContainer } from "@/components/layout/PageContainer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatMonth, getProject, projects } from "@/lib/content";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="grid gap-4 border-t border-border py-10 md:grid-cols-[12rem_1fr] md:gap-10">
      <h2 id={id} className="eyebrow pt-1">
        {title}
      </h2>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const { caseStudy } = project;

  return (
    <PageContainer>
      <Link href="/projects" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg">
        <FiArrowLeft aria-hidden="true" />
        All projects
      </Link>

      <header className="mt-8 flex flex-col gap-5">
        <div className="flex flex-wrap items-center gap-3">
          <p className="eyebrow">{project.category}</p>
          <span className="font-mono text-xs text-subtle">Updated {formatMonth(project.updated)}</span>
        </div>
        <h1 className="text-4xl font-semibold md:text-5xl">{project.title}</h1>
        <p className="max-w-3xl text-lg leading-relaxed text-muted">{project.summary}</p>
        <div className="flex flex-wrap gap-3">
          {project.github && (
            <Button asChild>
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <FiGithub aria-hidden="true" />
                View source
                <span className="sr-only">(opens in new tab)</span>
              </a>
            </Button>
          )}
          {project.related?.map((link) => (
            <Button key={link.href} asChild variant="secondary">
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
                <FiArrowUpRight aria-hidden="true" />
                <span className="sr-only">(opens in new tab)</span>
              </a>
            </Button>
          ))}
        </div>
      </header>

      <ul className="mt-10 grid grid-cols-3 gap-3 sm:gap-4">
        {project.highlights.map((item) => (
          <li key={item.label}>
            <Card className="flex h-full flex-col gap-2 p-4 sm:p-6">
              <p className="font-mono text-xl font-semibold text-accent-text sm:text-3xl">{item.value}</p>
              <p className="text-xs leading-snug text-muted sm:text-sm">{item.label}</p>
            </Card>
          </li>
        ))}
      </ul>

      <div className="mt-12">
        <Section id="overview" title="Overview">
          <p className="leading-relaxed text-muted">{caseStudy.overview}</p>
        </Section>

        <Section id="problem" title="Problem">
          <p className="leading-relaxed text-muted">{caseStudy.problem}</p>
        </Section>

        <Section id="architecture" title="Architecture">
          <ArchitectureDiagram items={caseStudy.architecture} />
          <details className="group mt-6">
            <summary className="w-fit cursor-pointer text-sm font-medium text-muted hover:text-fg">View as table</summary>
          <div className="mt-4 overflow-x-auto rounded-[var(--radius-card)] border border-border">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">System components</caption>
              <thead className="bg-surface-2 font-mono text-xs uppercase tracking-wider text-subtle">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">Component</th>
                  <th scope="col" className="px-4 py-3 font-medium">Technology</th>
                  <th scope="col" className="px-4 py-3 font-medium">Responsibility</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {caseStudy.architecture.map((row) => (
                  <tr key={row.component} className="bg-surface">
                    <th scope="row" className="px-4 py-3 font-medium">{row.component}</th>
                    <td className="px-4 py-3 font-mono text-xs text-accent-text">{row.technology}</td>
                    <td className="px-4 py-3 text-muted">{row.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </details>
        </Section>

        <Section id="stack" title="Stack">
          <ul className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li key={tech}>
                <Badge size="md">{tech}</Badge>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="security" title="Security design">
          <ul className="flex flex-col gap-3">
            {caseStudy.security.map((item) => (
              <li key={item} className="flex gap-3 leading-relaxed text-muted">
                <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="testing" title="Testing">
          <p className="leading-relaxed text-muted">{caseStudy.testing}</p>
        </Section>

        <Section id="challenges" title="Challenges">
          <ul className="flex flex-col gap-3">
            {caseStudy.challenges.map((item) => (
              <li key={item} className="flex gap-3 leading-relaxed text-muted">
                <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-info" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </PageContainer>
  );
}
