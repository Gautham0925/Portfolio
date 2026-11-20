import Link from "next/link";
import { FiGithub } from "react-icons/fi";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { socialLinks } from "@/lib/site";

export function ProjectsEmpty() {
  const github = socialLinks.find((link) => link.kind === "github");
  return (
    <Card className="flex flex-col items-start gap-5 p-8 md:p-10">
      <p className="eyebrow">In progress</p>
      <h2 className="text-xl font-semibold">Project case studies are being written</h2>
      <p className="max-w-xl text-muted">
        Detailed write-ups covering architecture, security implementation and lessons learned will be published here.
      </p>
      <div className="flex flex-wrap gap-3">
        {github && (
          <Button asChild variant="secondary">
            <a href={github.href} target="_blank" rel="noopener noreferrer">
              <FiGithub aria-hidden="true" />
              Browse GitHub
              <span className="sr-only">(opens in new tab)</span>
            </a>
          </Button>
        )}
        <Button asChild variant="ghost">
          <Link href="/contact">Ask about my work</Link>
        </Button>
      </div>
    </Card>
  );
}
