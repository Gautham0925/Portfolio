import { FaGithub, FaLinkedinIn } from "react-icons/fa";

import { cn } from "@/lib/utils";
import { socialLinks, type SocialLink } from "@/lib/site";

const icons: Record<SocialLink["kind"], typeof FaGithub> = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
};

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {socialLinks.map((link) => {
        const Icon = icons[link.kind];
        return (
          <li key={link.href}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${link.label} (opens in new tab)`}
              className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-border-strong hover:text-fg"
            >
              <Icon aria-hidden="true" className="size-4" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
