# Phase 0 — Repository Audit & Baseline

Audit date: 2026-11-20 · Baseline commit: `4edf139`

## Baseline stack

| Item | Version |
|---|---|
| Next.js | 15.1.6 (App Router) |
| React | 19.0.0 |
| Language | JavaScript (JSX) |
| Styling | Tailwind CSS 3.4 + shadcn/ui (JS) |
| Animation | framer-motion 12, swiper 11, react-countup |

## Routes

| Route | File | Notes |
|---|---|---|
| `/` | `app/page.jsx` | Hero, photo, CV download, socials, stats |
| `/resume` | `app/resume/page.jsx` | Tabs: experience, education, skills, certifications, about |
| `/projects` | `app/projects/page.jsx` | Swiper slider of 5 Prodigy internship tools |
| `/contact` | `app/contact/page.jsx` | Form posting to Google Apps Script |

## Security findings

| Severity | Finding | Location |
|---|---|---|
| Critical | Next.js 15.1.6 vulnerable to React2Shell (CVE-2025-55182), unauthenticated RCE via RSC | `package.json` |
| Critical | swiper ≤12.1.1 prototype pollution (GHSA-hmx5-qpq5-p643) | `package.json` |
| High | 12 total npm advisories (2 critical, 8 high, 2 moderate) | lockfile |
| Medium | Google Apps Script endpoint hardcoded client-side; no rate limit / captcha / server validation | `app/contact/page.jsx` |
| Medium | No security headers (CSP, HSTS, X-Frame-Options, etc.) | `next.config.mjs` |
| Low | `X-Powered-By: Next.js` header exposed | `next.config.mjs` |
| Low | Phone number and full address published in two places | contact, resume |
| Low | Google Fonts fetched at build/runtime (third-party dependency, wider CSP) | `app/layout.jsx` |
| Info | Live "Keylogger" demo link may be flagged by scanners/recruiters | `app/projects/page.jsx` |

## Bugs found

| File | Bug |
|---|---|
| `components/Stats.jsx` | `"max - w - [100px]"` broken Tailwind class; `xl-pt-0` typo |
| `app/page.jsx` | `duraton-500` typo |
| `components/PageTransition.jsx` | `intitial` prop typo |
| `components/ui/Stairs.jsx` | `intial` variant key typo |
| `app/resume/page.jsx` | Icon paths prefixed with `/public` (404) |
| `app/projects/page.jsx` | `<a>` wrapping `<button>` (invalid interactive nesting); `textStroke` invalid style |
| `app/contact/page.jsx` | DOM manipulation via `getElementById`; unused `Select` imports |
| `components/Social.jsx` | External links without `target`/`rel`, no accessible names |
| `components/Photo.jsx` | Empty `alt` on profile photo |
| Config | Duplicate `postcss.config.js/.mjs` and `.eslintrc.json` + `eslint.config.mjs` (lint crashed) |
| Config | `.idea/` committed; README is default template |

## Accessibility & performance notes

- Content hidden for 2.0–2.4 s behind entry animations on every page (hurts LCP).
- Icon-only buttons/links lacked accessible names.
- Form inputs used placeholders only, no labels.
- Certificates rendered with `<img>` (no optimisation).

## Content accuracy (needs owner confirmation)

- Hero says "final-year B.E. student"; about says "Fresher".
- Experience list does not include the 6-month VAPT internship at Ultraviolet Cyber India Pvt. Ltd. or current employment.
- Projects list only Prodigy internship tools; newer projects (VulnCRM, VulnMarket, VulnAI, Burp extensions) absent.
- LinkedIn URL differs between site (`gautham-p-k-62aa68291`) and other profiles (`gauthampkini`).

## Baseline checks

| Check | Result |
|---|---|
| `next build` | Pass (with Google Fonts reachable) |
| `next lint` | Crash — conflicting ESLint configs |
| `npm audit` | 12 vulnerabilities (2 critical) |
| Tests | None |

## Migration plan

| Phase | Scope |
|---|---|
| 1 | Next 16 + React 19.3, TypeScript strict, ESLint flat config, self-hosted font, bug fixes, 0 audit findings. No visual change. |
| 2 | Design tokens, Tailwind upgrade, new layout/nav, theme toggle, remove heavy transitions |
| 3 | `content/*.json` + typed schema, new routes and project case studies |
| 4 | Ask Gautham knowledge-base chatbot + unit tests |
| 5 | Headers/CSP, server-side contact route, a11y, SEO, performance |
| 6 | Playwright, CI, free-tier deployment |
