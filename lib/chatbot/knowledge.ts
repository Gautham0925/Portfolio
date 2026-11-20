import chatbot from "@/content/chatbot.json";
import { achievements, certifications, education, experience, otherProjects, profile, projects, skills } from "@/lib/content";
import { site, socialLinks } from "@/lib/site";

export type ChatLink = { label: string; href: string; external?: boolean };
export type Entry = { id: string; keywords: string[]; answer: string; link?: ChatLink; weight: number };

const words = (text: string) => text.toLowerCase().match(/[a-z0-9]+/g) ?? [];
const intent = (key: keyof typeof chatbot.intents) => [...chatbot.intents[key]];

const current = experience[0];
const fact = (label: string) => profile.facts.find((item) => item.label === label)?.value;

function buildEntries(): Entry[] {
  const entries: Entry[] = [
    {
      id: "about",
      keywords: intent("about"),
      answer: `${profile.name}: ${profile.headline}.\n${profile.summary}`,
      link: { label: "Read the resume", href: "/resume" },
      weight: 1,
    },
    {
      id: "role",
      keywords: intent("role"),
      answer: current
        ? `${current.role} at ${current.organization} (${current.period}).\n${(current.highlights ?? []).map((h) => `• ${h}`).join("\n")}`
        : "Current role details are not listed on this site.",
      link: { label: "See experience", href: "/resume" },
      weight: 1,
    },
    {
      id: "experience",
      keywords: intent("experience"),
      answer: experience.map((item) => `• ${item.role}, ${item.organization} (${item.period})`).join("\n"),
      link: { label: "See experience", href: "/resume" },
      weight: 1,
    },
    {
      id: "education",
      keywords: intent("education"),
      answer: education.map((item) => `• ${item.qualification}, ${item.institution} (${item.period})${item.grade ? `, ${item.grade}` : ""}`).join("\n"),
      link: { label: "See education", href: "/resume" },
      weight: 1,
    },
    {
      id: "skills",
      keywords: [...intent("skills"), ...skills.flatMap((group) => words(`${group.group} ${group.items.join(" ")}`))],
      answer: skills.map((group) => `• ${group.group}: ${group.items.join(", ")}`).join("\n"),
      link: { label: "See skills", href: "/resume" },
      weight: 1,
    },
    {
      id: "certifications",
      keywords: [...intent("certifications"), ...certifications.flatMap((cert) => words(`${cert.issuer} ${cert.name}`))],
      answer: certifications.map((cert) => `• ${cert.name}, ${cert.issuer} (${cert.year})`).join("\n"),
      link: { label: "See certifications", href: "/resume" },
      weight: 1,
    },
    {
      id: "projects",
      keywords: intent("projects"),
      answer: [
        ...projects.map((project) => `• ${project.title}: ${project.summary}`),
        ...otherProjects.map((project) => `• ${project.title}: ${project.description}`),
      ].join("\n"),
      link: { label: "Browse projects", href: "/projects" },
      weight: 1,
    },
    {
      id: "achievements",
      keywords: [...intent("achievements"), ...achievements.flatMap((item) => words(item.title))],
      answer: achievements.map((item) => `• ${item.title}: ${item.context}`).join("\n"),
      link: { label: "See achievements", href: "/resume" },
      weight: 1,
    },
    {
      id: "contact",
      keywords: intent("contact"),
      answer: `You can email ${profile.contact.email} or use the contact form on this site.`,
      link: { label: "Open contact form", href: "/contact" },
      weight: 1,
    },
    {
      id: "resume",
      keywords: intent("resume"),
      answer: "The CV is available as a PDF download.",
      link: { label: "Download CV", href: site.resumePath, external: true },
      weight: 1,
    },
    {
      id: "social",
      keywords: intent("social"),
      answer: socialLinks.map((link) => `• ${link.label}: ${link.href}`).join("\n"),
      link: socialLinks[0] ? { label: socialLinks[0].label, href: socialLinks[0].href, external: true } : undefined,
      weight: 1,
    },
    {
      id: "location",
      keywords: intent("location"),
      answer: `Based in ${profile.contact.location}.`,
      weight: 1,
    },
    {
      id: "languages",
      keywords: intent("languages"),
      answer: fact("Languages") ? `Languages: ${fact("Languages")}.` : "Languages are not listed on this site.",
      weight: 1,
    },
  ];

  projects.forEach((project) => {
    entries.push({
      id: `project-${project.slug}`,
      keywords: [...words(project.title), ...project.slug.split("-"), ...project.stack.flatMap(words)],
      answer: `${project.title} (${project.category}).\n${project.summary}\nStack: ${project.stack.join(", ")}.\n${project.highlights.map((h) => `• ${h.value} ${h.label}`).join("\n")}`,
      link: { label: "Read the case study", href: `/projects/${project.slug}` },
      weight: 3,
    });
  });

  otherProjects.forEach((project) => {
    entries.push({
      id: `other-${project.title}`,
      keywords: [...words(project.title), ...project.stack.flatMap(words)],
      answer: `${project.title}.\n${project.description}\nStack: ${project.stack.join(", ")}.`,
      link: { label: "Browse projects", href: "/projects" },
      weight: 3,
    });
  });

  return entries;
}

export const entries = buildEntries();
export const greeting = chatbot.greeting;
export const fallback = chatbot.fallback;
export const thanks = chatbot.thanks;
export const suggested = chatbot.suggested;
