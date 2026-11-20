import Link from "next/link";

import { navLinks, site } from "@/lib/site";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-border">
      <div className="container-page flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <p className="font-mono text-sm font-semibold">{site.name}</p>
          <p className="text-sm text-muted">Cybersecurity · Application Security · Networking</p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-fg">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <SocialLinks />
      </div>
      <div className="border-t border-border">
        <p className="container-page py-5 font-mono text-xs text-subtle">
          © {year} {site.name}
        </p>
      </div>
    </footer>
  );
}
