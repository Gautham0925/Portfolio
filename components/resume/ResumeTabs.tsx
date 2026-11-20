"use client";

import Image from "next/image";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import type { Certification, Education, Experience, Profile, SkillGroup } from "@/lib/content";

type ResumeTabsProps = {
  experience: readonly Experience[];
  education: readonly Education[];
  skills: readonly SkillGroup[];
  certifications: readonly Certification[];
  profile: Profile;
};

function Timeline({ items }: { items: { title: string; subtitle: string; period: string }[] }) {
  return (
    <ol className="relative flex flex-col gap-4 border-l border-border pl-6">
      {items.map((item) => (
        <li key={`${item.title}-${item.period}`} className="relative">
          <span aria-hidden="true" className="absolute -left-[29px] top-7 size-2.5 rounded-full bg-accent ring-4 ring-bg" />
          <Card className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
            <div className="flex flex-col gap-1">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-muted">{item.subtitle}</p>
            </div>
            <p className="shrink-0 font-mono text-xs text-subtle">{item.period}</p>
          </Card>
        </li>
      ))}
    </ol>
  );
}

export function ResumeTabs({ experience, education, skills, certifications, profile }: ResumeTabsProps) {
  return (
    <Tabs defaultValue="experience">
      <TabsList aria-label="Resume sections">
        <TabsTrigger value="experience">Experience</TabsTrigger>
        <TabsTrigger value="education">Education</TabsTrigger>
        <TabsTrigger value="skills">Skills</TabsTrigger>
        <TabsTrigger value="certifications">Certifications</TabsTrigger>
        <TabsTrigger value="about">About</TabsTrigger>
      </TabsList>

      <TabsContent value="experience">
        <h2 className="sr-only">Experience</h2>
        <Timeline items={experience.map((e) => ({ title: e.role, subtitle: e.organization, period: e.period }))} />
      </TabsContent>

      <TabsContent value="education">
        <h2 className="sr-only">Education</h2>
        <Timeline items={education.map((e) => ({ title: e.qualification, subtitle: e.institution, period: e.period }))} />
      </TabsContent>

      <TabsContent value="skills">
        <h2 className="sr-only">Skills</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {skills.map((group) => (
            <Card key={group.group} className="flex flex-col gap-4">
              <h3 className="eyebrow">{group.group}</h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item}>
                    <Badge size="md">{item}</Badge>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="certifications">
        <h2 className="sr-only">Certifications</h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert) => (
            <li key={`${cert.issuer}-${cert.name}`}>
              <Card className="flex h-full flex-col gap-4 p-4">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-surface-2">
                  <Image
                    src={cert.image}
                    alt={`${cert.name} certificate from ${cert.issuer}`}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 px-2 pb-2">
                  <h3 className="font-medium leading-snug">{cert.name}</h3>
                  <div className="mt-auto flex items-center justify-between">
                    <Badge tone="accent">{cert.issuer}</Badge>
                    <span className="font-mono text-xs text-subtle">{cert.year}</span>
                  </div>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </TabsContent>

      <TabsContent value="about">
        <h2 className="sr-only">About</h2>
        <Card className="max-w-2xl">
          <p className="text-lg">{profile.tagline}</p>
          <dl className="mt-6 grid gap-x-8 gap-y-4 border-t border-border pt-6 sm:grid-cols-[max-content_1fr]">
            <dt className="font-mono text-xs uppercase tracking-wider text-subtle">Name</dt>
            <dd>{profile.name}</dd>
            {profile.facts.map((fact) => (
              <div key={fact.label} className="contents">
                <dt className="font-mono text-xs uppercase tracking-wider text-subtle">{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
