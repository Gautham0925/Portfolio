# Changelog

## [Unreleased] — 3D and motion upgrade

### Added
- 3D hero (React Three Fiber): shield, connected network, particles, parallax, with SVG fallback.
- Motion system in `lib/motion.ts`; restored stair transition, page fade, counters and project slider on Framer Motion.
- Tilt project cards, expandable quick look, interactive architecture diagram, toolbox field, experience timeline, closing contact section.
- Magnetic buttons, shared-layout nav indicator, theme cross-fade, copy-email.
- Ask Gautham chatbot built on the site's verified content (`content/chatbot.json`); no external AI.
- Contact API route (`/api/contact`) sending through Zoho SMTP with auto-reply, honeypot, rate limits and origin check.
- `ANIMATION_INVENTORY.md`, `docs/PHASE_REPORTS.md`, `.env.example`.

### Changed
- Contact email shown on the site is `gautham@secworks.dpdns.org`.
- Security headers added (nosniff, frame deny, referrer policy, permissions policy).

### Removed
- Google Apps Script endpoint from the contact form (script kept under `integrations/` for reference).

## [Unreleased] — Content refresh from 2026 CV

### Changed
- Replaced CV PDF with the 2026 version.
- Headline, summary, experience (Security Consultant, Ultraviolet Cyber, Jan 2026 – Present), education (with dates and grades), skills and languages updated from the CV.
- Home "Focus areas" shows Web & API, Identity & Auth, and AI & LLM security.

### Added
- Achievements tab (NCSRC hackathon, conferences, PortSwigger, HTB/THM, AI security community).
- "More projects" section: OWASP LLM Top 10 labs, blockchain authentication, Wazuh IDS.
- Contact auto-reply: `integrations/contact-form/Code.gs` (Google Apps Script) sends visitors a confirmation email and notifies the owner, with honeypot, per-sender cooldown, daily cap and formula-injection protection.
- Contact form honeypot field; success message mentions the confirmation email; server-side errors surfaced.

## [Unreleased] — Phase 3: Content

### Removed
- All previous projects (Caesar Cipher, Password Strength Checker, Image Encryption, Keylogger, Packet Sniffer) and their screenshots, at owner's request.

### Changed
- Profile headline and summary updated to cybersecurity professional / VAPT; removed "Fresher" and "final-year student".
- Added Ultraviolet Cyber India Pvt. Ltd. VAPT internship to experience.
- Home stats now reflect project work (platforms, test cases, labs).

### Security
- Removed public phone number and full postal address; location shown as region only.
- Contact form phone field is optional.

### Added
- Project case studies for VulnCRM, VulnMart and the VulnMart CTF Platform, written only from each repository's own README and docs.
- `/projects/[slug]` statically generated case-study pages: overview, problem, architecture, stack, security design, testing, challenges.
- Project cards without screenshots use a typographic header with the project's key figure.

## [Unreleased] — Phase 2: Design system & responsive UI

### Added
- Design tokens (dark default + light) as CSS variables mapped through Tailwind 4 `@theme`; documented in `DESIGN_SYSTEM.md`.
- Self-hosted Inter (UI) alongside JetBrains Mono (metadata).
- Theme toggle with pre-paint script (no flash) and `localStorage` persistence.
- Components: `Card`, `Badge`, `SectionHeading`, `Navbar`, `NavLinks`, `MobileNav`, `Footer`, `PageContainer`, `SocialLinks`, `ThemeToggle`, `ProjectCard`, `ResumeTabs`, `ContactForm`.
- Content moved to typed JSON in `content/` (no wording changes) with loaders in `lib/content.ts`.
- Custom 404 page, skip-to-content link, visible focus rings, `prefers-reduced-motion` support.

### Changed
- Tailwind CSS 3 → 4 (`@tailwindcss/postcss`, CSS-first config); `tailwindcss-animate` → `tw-animate-css`.
- Home rebuilt as a bento grid; projects as a card grid; resume as tabbed timeline and certificate grid; contact form with visible labels.
- Pages are server components; only the theme toggle, nav, tabs and contact form ship client JS.

### Removed
- Stair and page transitions and 2–2.4 s content delays.
- `framer-motion`, `swiper`, `react-countup`, `@radix-ui/react-scroll-area`, `@radix-ui/react-tooltip`, `autoprefixer`.

## [Unreleased] — Phase 1: Framework modernization & TypeScript

### Security
- Upgraded Next.js 15.1.6 → 16.4.6 and React 19.0 → 19.3.1 (fixes React2Shell, CVE-2025-55182).
- Upgraded swiper 11 → 14 (fixes prototype pollution, GHSA-hmx5-qpq5-p643).
- `npm audit`: 12 vulnerabilities (2 critical) → 0.
- Disabled `X-Powered-By` header.
- Self-hosted JetBrains Mono (no Google Fonts requests).
- External links use `rel="noopener noreferrer"`.

### Changed
- Migrated all source to TypeScript (`strict`, `noUncheckedIndexedAccess`).
- UI primitives rewritten as typed React 19 function components (no `forwardRef`).
- ESLint flat config with `eslint-config-next` 16; `next lint` replaced by `eslint .`.
- Tailwind config moved to `tailwind.config.ts`; single `postcss.config.mjs`.
- Navigation links shared between desktop and mobile nav.
- Contact form uses React state instead of direct DOM manipulation; input length limits added.

### Fixed
- Broken Tailwind classes in stats (`max - w - [100px]`, `xl-pt-0`) and home (`duraton-500`).
- Animation typos (`intitial`, `intial`) in page and stair transitions.
- Resume icon paths prefixed with `/public`.
- Invalid `<a><button>` nesting on project links.
- Missing accessible names on icon links/buttons, form inputs and mobile menu; profile photo alt text.
- Tab-separated certificate name.

### Removed
- Unused dependencies: `@radix-ui/react-select`, `lucide-react`, `@eslint/eslintrc`.
- Duplicate configs (`.eslintrc.json`, `postcss.config.js`, `jsconfig.json`) and committed `.idea/`.
