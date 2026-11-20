# Animation Inventory

Baseline: commit `4edf139` (original site) compared with the `feat/3d-motion-upgrade` branch.

## Original animations (baseline `4edf139`)

| Original | Source | Status now |
|---|---|---|
| Staircase page transition (6 white steps, 0.4 s, 0.1 s stagger) | `components/StairTransition.jsx`, `ui/Stairs.jsx` | Restored and upgraded: `components/motion/StairTransition.tsx`. Covers on link click, reveals after the route changes. Theme surface colour, 0.32 s steps, 0.05 s stagger. |
| Page fade overlay with 1 s delay | `PageTransition.jsx` | Replaced by `app/template.tsx` fade and slide (0.35 s, no delay). |
| Photo fade-in (2 s and 2.4 s delays) | `Photo.jsx` | Replaced by CSS entrance sequence with sub-0.5 s delays. |
| Rotating dashed ring around photo | `Photo.jsx` | Restored as `components/home/PhotoRing.tsx`. |
| CountUp statistics (5 s, 2 s delay) | `Stats.jsx` | Restored as `components/motion/Counter.tsx`. Starts when in view, 1.6 s. |
| Swiper project slider with slide number and arrows | `app/projects/page.jsx`, `WorkSliderBtns` | Restored without Swiper as `components/home/ProjectSlider.tsx`. Animated slide, drag, arrows, dots, keyboard. |
| Hover effects on buttons, social icons | various | Kept and extended (press feedback, magnetic movement). |
| Framer Motion | all of the above | Reinstated (`framer-motion`). |

## New animations

| Area | Component | Notes |
|---|---|---|
| 3D hero | `components/three/HeroScene.tsx` | Shield, network, particles, floaters, parallax. Lazy loaded. |
| Hero entrance | `components/home/Hero.tsx` | CSS sequence: grid, scene, eyebrow, name, summary, actions. |
| Cursor spotlight | `components/home/HeroSpotlight.tsx` | Fine pointers only. |
| Scroll reveals | `components/motion/Reveal.tsx` | Fade and rise, staggered groups. |
| Experience timeline | `components/home/ExperienceTimeline.tsx` | Progress line follows scroll. |
| Resume timeline | `components/resume/ResumeTabs.tsx` | Items slide in. |
| Project cards | `components/motion/Tilt.tsx` | 3D tilt, shadow and glare layers, hover lift. |
| Project quick look | `components/projects/ProjectPreview.tsx` | Expandable overview. |
| Architecture diagram | `components/projects/ArchitectureDiagram.tsx` | Selectable components, animated detail panel. |
| Toolbox | `components/home/TechField.tsx` | Floating chips, area filter, pointer tilt. |
| Navigation | `components/layout/NavLinks.tsx` | Shared-layout active pill, animated underline. |
| Magnetic buttons | `components/motion/Magnetic.tsx` | 10 px maximum. |
| Theme switch | `ThemeToggle.tsx`, `globals.css` | 0.3 s colour cross-fade. |
| Chatbot | `components/chat/*` | Launcher with depth, panel animation, message entrance, typing indicator. |
| Contact form | `ContactForm.tsx` | Sending spinner. |

## Central configuration

`lib/motion.ts` holds durations, easing, stagger, reveal, hover, tilt, magnetic, spring, stair and 3D scene settings per device tier. Every animated component reads from it.

## Accessibility behaviour

| Setting | Result |
|---|---|
| `prefers-reduced-motion` | `MotionConfig reducedMotion="user"`, no stairs, no WebGL (static SVG), no tilt, magnetic or spotlight, no chat typing delay, CSS durations clamped. |
| No WebGL or slow device (below 18 fps for 3 s) | Static SVG illustration. |
| Touch or coarse pointer | No tilt, magnetic or spotlight. |
| Mobile | 22 nodes, no particles, no floaters, lower pixel ratio. |
