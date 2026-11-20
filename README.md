# Gautham P Kini — Cybersecurity Portfolio

Personal portfolio of Gautham P Kini, built with Next.js (App Router) and TypeScript.

> Modernization in progress — see [CHANGELOG.md](CHANGELOG.md), [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) and [docs/AUDIT.md](docs/AUDIT.md).

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19, Tailwind CSS 4, Radix UI primitives |
| Language | TypeScript (strict) |
| Motion and 3D | Framer Motion, React Three Fiber, three.js |
| Mail | Resend HTTPS API (Zoho receives) |

## Getting started

Requires Node.js 20.9 or newer.

```bash
npm ci
npm run dev
```

Open http://localhost:3000.

## Environment

Copy `.env.example` to `.env.local` and set `RESEND_API_KEY`. Set the same variables on the host. Outbound SMTP is blocked on Render free instances, so mail is sent over HTTPS. Never commit real values.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run audit` | Production dependency audit |

## Project structure

```
app/            Routes and self-hosted fonts
components/     layout/, home/, motion/, three/, chat/, projects/, resume/, contact/, ui/
content/        Portfolio content as JSON
hooks/          Client hooks (theme)
lib/            Content loaders, site config, utilities
public/assets/  Images, certificates, resume PDF
docs/           Audit and project documentation
```

## Fonts

Inter and JetBrains Mono are bundled locally under the SIL Open Font License 1.1 (`app/fonts/*-OFL.txt`).
