import { Card } from "@/components/ui/Card";
import { Counter } from "@/components/motion/Counter";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { education, profile } from "@/lib/content";

export function Highlights() {
  const current = education[0];
  return (
    <section aria-label="Highlights">
      <RevealGroup className="grid gap-4 lg:grid-cols-4">
        <ul className="grid grid-cols-3 gap-4 lg:col-span-3">
          {profile.stats.map((stat) => (
            <li key={stat.label}>
              <RevealItem className="h-full">
                <Card className="flex h-full flex-col justify-between gap-3 p-4 sm:p-6">
                  <p className="font-mono text-3xl font-semibold text-accent-text sm:text-5xl">
                    <Counter value={stat.value} />
                  </p>
                  <p className="text-xs leading-snug text-muted sm:text-sm">{stat.label}</p>
                </Card>
              </RevealItem>
            </li>
          ))}
        </ul>
        {current && (
          <RevealItem className="h-full">
            <Card className="flex h-full flex-col justify-between gap-4">
              <p className="eyebrow">Education</p>
              <div className="flex flex-col gap-1">
                <p className="font-medium leading-snug">{current.qualification}</p>
                <p className="text-sm text-muted">{current.institution}</p>
              </div>
              <p className="font-mono text-xs text-subtle">{current.period}</p>
            </Card>
          </RevealItem>
        )}
      </RevealGroup>
    </section>
  );
}
