# Phase Reports: 3D and Motion Upgrade

Measured on a local production build with headless Chrome and software WebGL (SwiftShader). A real GPU will do better.

| Phase | Result |
|---|---|
| 1 Audit | The baseline repo had no Framer Motion, stair transition, slider or chatbot because earlier phases removed them. `ANIMATION_INVENTORY.md` maps originals to replacements. There was no existing Ask Gautham chatbot or knowledge base in the repository. |
| 2 Motion system | `lib/motion.ts`, `Reveal`, `Counter`, `Tilt`, `Magnetic`, `MotionProvider`, `StairTransition`, `app/template.tsx`. |
| 3 3D hero | React Three Fiber scene with shield, 52-node network that connects over 1.8 s, flowing particles, floaters, parallax, node hover highlight. SVG fallback. |
| 4 3D components | Tilt project cards, toolbox field, architecture diagram, project slider. |
| 5 Scroll and transitions | Section reveals, timelines, stair transition, page fade, shared-layout nav. |
| 6 Micro-interactions and chatbot | Magnetic buttons, press feedback, theme cross-fade, copy-email, chatbot restyle and rebuild on verified content, Zoho contact route. |
| 7 Optimisation | Lazy 3D chunk after idle, pause offscreen and in hidden tabs, dpr caps, low-fps fallback, reduced-motion paths. |
| 8 Regression | Lint, typecheck, production build, `npm audit` (0), browser checks below. |

## Measurements (desktop, production build)

| Metric | Value |
|---|---|
| CLS | 0 |
| LCP (localhost) | about 230 ms |
| JS gzip before 3D loads | about 260 KB |
| JS gzip with 3D chunk | about 500 KB (three.js about 240 KB, loaded after idle) |
| Frame rate (software WebGL) | 44 fps |

## Browser checks

| Check | Result |
|---|---|
| Desktop hero, hover, scroll sections | Pass |
| Stair transition and back/forward | Pass |
| Reduced motion (no canvas, navigation works) | Pass |
| WebGL blocked (fallback shown, no errors) | Pass |
| Mobile 390 px (no horizontal overflow, chat drawer) | Pass |
| Light theme | Pass |
| Chatbot open, suggestion, free text, Escape closes | Pass |
| Console errors | None |

## Remaining

- Contact form needs the Zoho Mail API values from `scripts/zoho-setup.mjs`. Without them the API returns a clear 503 message. The Zoho Mail API has no reply-to field, so the owner email carries a reply link to the visitor.
- No research section exists in the content files, so none was added.
- The architecture diagram shows components only. Data-flow arrows need relationship data in `content/projects.json`.
- Not yet checked on a physical phone or a real GPU.
