# Changelog

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
