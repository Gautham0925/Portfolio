import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { education, profile, skills } from "@/lib/content";

export function Highlights() {
  const current = education[0];
  return (
    <section aria-label="Highlights" className="grid gap-4 lg:grid-cols-4">
      <ul className="grid grid-cols-3 gap-4 lg:col-span-3">
        {profile.stats.map((stat) => (
          <li key={stat.label}>
            <Card className="flex h-full flex-col justify-between gap-3 p-4 sm:p-6">
              <p className="font-mono text-3xl font-semibold text-accent-text sm:text-5xl">{stat.value}</p>
              <p className="text-xs leading-snug text-muted sm:text-sm">{stat.label}</p>
            </Card>
          </li>
        ))}
      </ul>
      {current && (
        <Card className="flex flex-col justify-between gap-4">
          <p className="eyebrow">Education</p>
          <div className="flex flex-col gap-1">
            <p className="font-medium leading-snug">{current.qualification}</p>
            <p className="text-sm text-muted">{current.institution}</p>
          </div>
          <p className="font-mono text-xs text-subtle">{current.period}</p>
        </Card>
      )}
      <Card className="flex flex-col gap-4 lg:col-span-4">
        <p className="eyebrow">Focus areas</p>
        <div className="grid gap-5 md:grid-cols-3">
          {skills.slice(0, 3).map((group) => (
            <div key={group.group} className="flex flex-col gap-3">
              <p className="text-sm font-medium">{group.group}</p>
              <ul className="flex flex-wrap gap-2">
                {group.items.slice(0, 6).map((item) => (
                  <li key={item}>
                    <Badge>{item}</Badge>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}
