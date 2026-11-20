export type NavLink = {
  label: string;
  href: string;
};

export const site = {
  name: "Gautham P Kini",
  shortName: "Gautham",
  description: "Portfolio of Gautham P Kini — cybersecurity, application security and networking projects.",
  resumePath: "/assets/resume/Gautham-P-Kini.pdf",
} as const;

export const navLinks: readonly NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Resume", href: "/resume" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export type SocialLink = {
  label: string;
  href: string;
  kind: "github" | "linkedin";
};

export const socialLinks: readonly SocialLink[] = [
  { label: "GitHub", href: "https://github.com/gautham0925", kind: "github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/gauthampkini/", kind: "linkedin" },
];
