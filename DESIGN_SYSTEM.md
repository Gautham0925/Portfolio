# Design System

Technical editorial: graphite surfaces, white type, a single restrained lime accent, mono for metadata. Dark-first with a light theme.

## Principles

| Do | Avoid |
|---|---|
| Bento cards with consistent radius and borders | Neon glows, matrix rain, fake terminals |
| One accent, used for actions and labels | Gradients on text or backgrounds |
| Mono type for metadata (eyebrows, dates, tags) | Skill percentage bars |
| Subtle entry motion (`animate-rise`, 0.5 s) | Full-screen page transitions, delayed content |

## Tokens

Defined as CSS variables in `app/globals.css` and exposed to Tailwind 4 through `@theme inline`. Switch themes by setting `data-theme` on `<html>`.

| Token | Tailwind | Dark | Light | Use |
|---|---|---|---|---|
| `--bg` | `bg-bg` | `#0b0d10` | `#f6f7f9` | Page background |
| `--surface` | `bg-surface` | `#12151a` | `#ffffff` | Cards |
| `--surface-2` | `bg-surface-2` | `#181c22` | `#eef0f3` | Raised / active states |
| `--border` | `border-border` | `#242932` | `#dfe3e8` | Card borders |
| `--border-strong` | `border-border-strong` | `#343a45` | `#c7cdd5` | Hover borders, secondary buttons |
| `--fg` | `text-fg` | `#f4f6f8` | `#0b0d10` | Primary text |
| `--muted` | `text-muted` | `#a1aab8` | `#4a5361` | Body copy |
| `--subtle` | `text-subtle` | `#808a99` | `#5c6470` | Metadata |
| `--accent` | `bg-accent` | `#c5f82a` | `#b4e81a` | Primary buttons, markers |
| `--accent-text` | `text-accent-text` | `#c5f82a` | `#3f6212` | Accent-coloured text |
| `--accent-soft` | `bg-accent-soft` | lime 10% | lime 14% | Accent badges, icon tiles |
| `--info` | `text-info` | `#22d3ee` | `#0e7490` | Secondary accent (cyan) |

### Contrast (WCAG 2.2)

All text tokens pass AA (≥ 4.5:1) on `bg`, `surface` and `surface-2` in both themes. Lowest: `subtle` on `surface-2` (dark) at 4.9:1. `accent-fg` on `accent`: 15.6:1 (dark), 13.4:1 (light).

## Typography

| Role | Font | Class |
|---|---|---|
| UI and body | Inter (variable, self-hosted) | `font-sans` |
| Metadata, code, labels | JetBrains Mono (variable, self-hosted) | `font-mono` |
| Eyebrow label | Mono, 12px, 0.14em tracking, uppercase, accent | `eyebrow` |

Scale: page title `text-4xl md:text-5xl`, hero `text-4xl sm:text-5xl lg:text-6xl`, section `text-2xl md:text-3xl`, body `text-base`/`text-lg`.

## Layout

| Utility | Purpose |
|---|---|
| `container-page` | Max width 72rem, 1.25rem / 2rem side padding |
| `bg-grid` | Faint 48px grid, used masked inside hero |
| `--radius-card` | 1.25rem for cards |
| `--radius-control` | 0.75rem for buttons, inputs, tabs |

Breakpoints: Tailwind defaults (`sm` 640, `md` 768, `lg` 1024). Navigation collapses to a sheet below `md`.

## Components

| Component | Path | Variants |
|---|---|---|
| `Button` | `components/ui/Button.tsx` | `primary` · `secondary` · `ghost`; `sm` · `md` · `lg` · `icon`; `asChild` |
| `Card` | `components/ui/Card.tsx` | `interactive` hover border |
| `Badge` | `components/ui/Badge.tsx` | `neutral` · `accent` · `info`; `sm` · `md` |
| `SectionHeading` | `components/ui/SectionHeading.tsx` | `eyebrow`, `title`, `description`, `as="h1" \| "h2"` |
| `Input` / `Textarea` | `components/ui/` | Shared `fieldBase`, `aria-invalid` styling |
| `Tabs` | `components/ui/Tabs.tsx` | Radix, scrollable on mobile |
| `Sheet` | `components/ui/Sheet.tsx` | Radix dialog, right side |
| `Navbar` / `Footer` / `PageContainer` | `components/layout/` | Sticky blurred header with skip link |
| `ThemeToggle` | `components/layout/ThemeToggle.tsx` | Persists to `localStorage` |

## Theme mechanics

1. `ThemeScript` (inline, in `<head>`) reads `localStorage.theme` before paint and sets `data-theme`, so there is no flash. Default: `dark`.
2. `useTheme()` subscribes to the attribute with `useSyncExternalStore`.
3. The inline script is a fixed string; Phase 5 adds its SHA-256 hash to the CSP.

## Accessibility

- Visible `:focus-visible` ring (2px accent, 3px offset) on every interactive element.
- Skip-to-content link, `aria-current="page"` on active nav links.
- Icon-only controls have `aria-label`; decorative icons are `aria-hidden`.
- Form fields use visible `<label>` elements.
- `prefers-reduced-motion` disables animations and transitions.
