# Changelog

## [Unreleased] — Phase 3: Content

### Removed
- All previous projects (Caesar Cipher, Password Strength Checker, Image Encryption, Keylogger, Packet Sniffer) and their screenshots, at owner's request.

### Added
- Projects page empty state; home featured-projects section hides when no projects exist.

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
