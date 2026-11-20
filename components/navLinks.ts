export type NavLink = {
  name: string;
  path: string;
};

export const navLinks: readonly NavLink[] = [
  { name: "home", path: "/" },
  { name: "resume", path: "/resume" },
  { name: "projects", path: "/projects" },
  { name: "contact", path: "/contact" },
];
