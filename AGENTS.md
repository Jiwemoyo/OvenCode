# AGENTS.md

## Project

OvenCode is a single-page marketing landing site with a playful software-studio identity: React 18 + Vite 5 (`@vitejs/plugin-react-swc`), plain JavaScript/JSX, hand-written CSS, a Three.js background scene, and GSAP ScrollTrigger motion. No backend, router, tests, or TypeScript.

## Commands

- `npm run dev` — Vite dev server (default `http://localhost:5173`)
- `npm run build` — production build to `dist/`
- `npm run lint` — ESLint 9 flat config (`eslint.config.js`), lints only `**/*.{js,jsx}`, ignores `dist`
- `npm run preview` — serve built `dist/`

There is no test or typecheck script; do not invent one. Verify changes with `npm run lint` and `npm run build`. Use npm (`package-lock.json`). Expect the Three.js/GSAP bundle (~810 kB) to trigger Vite's chunk-size warning; it is not a build failure.

## Structure

- `src/main.jsx` mounts `<App>` and imports the global `src/assets/styles/main.css`.
- `src/App.jsx` composes sections in order: Header, Hero, About, Services, Contact, Footer. Add new sections here. It also mounts `<Scene3D>`, `<CursorGlow>`, and the `useSiteAnimations` hook.
- `src/components/*.jsx` — one component per section; each imports its own CSS from `src/assets/styles/`.
- `src/components/Scene3D.jsx` — fixed, full-viewport Three.js background portaled to `document.body`; scroll progress drives camera/rotation.
- `src/components/CursorGlow.jsx` — pointer-follow glow portaled to `document.body`; disabled for coarse pointers.
- `src/hooks/useSiteAnimations.js` — GSAP + ScrollTrigger setup for the hero intro, `[data-reveal]`, `[data-reveal-group]`, `[data-parallax]`, service-card tilt, and `[data-magnetic]`.
- `src/pages/Home.jsx` is empty and unused; there is no routing.
- `public/` assets are referenced root-relative (e.g. `/ovenLogo.png`). The old remote iconscout images were removed; keep new visuals local or CSS/Three-based.

## Conventions and gotchas

- Components are named exports (`export const Name`), not default exports. JSX uses the automatic runtime, so do not add `import React`.
- CSS is split per component; global tokens and the animated border live in `main.css`. Reuse `--color-*` / `--font-*` variables instead of hardcoding values.
- `.code-accent` (VT323 font, orange) is the recurring terminal-label style.
- `#root` is intentionally transparent; its gradient frame is a masked `::before`, so the Three.js canvas shows through. Do not add an opaque background to `#root` or `.app-content` without moving/replacing the scene.
- The 3D canvas and cursor glow are portaled to `body` and use `z-index` 0/1; sections rely on `z-index: 2`. Keep that stacking model.
- Add `data-reveal`, `data-reveal-group`, `data-parallax`, or `data-magnetic` to opt elements into GSAP behavior. `prefers-reduced-motion` skips the GSAP hook; keep content visible without it.
- Header nav anchors depend on section ids: `#about`, `#services`, `#contact`. Services' outer element is `#services-section`; `#services` is the inner grid — keep these ids stable.
- `Contact.jsx` uses a demo-only form: `onSubmit` prevents navigation and shows a local success state. No backend is wired.
- `Header.jsx` now has a working mobile menu (`isMenuOpen` + `.menu-toggle`) and a scroll state; keep both when editing.
- `package.json` has a stray self-dependency `"ovencode": "file:"`; be cautious when modifying dependencies or reinstalling.
- Font Awesome and Google Fonts load from CDNs in `index.html`; some icons depend on them.
