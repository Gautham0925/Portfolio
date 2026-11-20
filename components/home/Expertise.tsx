import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Reveal } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skills } from "@/lib/content";
import { TechField } from "./TechField";

export function Expertise() {
  return (
    <section aria-labelledby="expertise-title" className="mt-20 flex flex-col gap-10">
      <Reveal>
        <SectionHeading eyebrow="Expertise" title={<span id="expertise-title">Focus areas and toolbox</span>} />
      </Reveal>
      <RevealGroup className="grid gap-4 md:grid-cols-3">
        {skills.slice(0, 3).map((group) => (
          <RevealItem key={group.group} className="h-full">
            <Card interactive className="group relative flex h-full flex-col gap-4 overflow-hidden">
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
              <h3 className="text-sm font-medium">{group.group}</h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.slice(0, 6).map((item) => (
                  <li key={item}>
                    <Badge>{item}</Badge>
                  </li>
                ))}
              </ul>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>
      <Reveal>
        <TechField groups={skills} />
      </Reveal>
    </section>
  );
}
