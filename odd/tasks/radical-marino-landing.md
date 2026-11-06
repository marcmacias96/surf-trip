# Radical Marino – Surf Trips Ecuador landing

## Objective
Bilingual (EN default at `/`, ES at `/es/`) animation-driven landing page in Astro 7 for Radical Marino, a surf-trip operator based in Manta, Ecuador. Motion is the product: GSAP ScrollTrigger + Lenis, transform/opacity only, reduced-motion safe.

## Problem / why
The competitor (ecuadorsurftravel.com) is static, sells a single base (Ayampe), shows no route and has placeholder images. Radical Marino sells a route (Manta → Santa Marianita → San Mateo → Puerto Cayo → Ayampe → Montañita/Olón) and a partner/alliance model. The page must sell the route and the partnership invitation to an international audience.

## Scope
- Single page, two locales, static output.
- Sections: Nav (lang switch), Hero, Manifesto, Route (pinned horizontal scroll, the signature piece), Experiences & modalities, Target market, Alliances, Pilot timeline, Growth, Contact CTA, Footer.
- Copy comes from the project proposal (ES source) translated to natural EN; no invented prices or claims.

## Constraints
- Astro 7, Tailwind v4 CSS-first (`@theme` in `src/styles/global.css`, no tailwind.config.js), no React.
- Design system derived from WSL: Geogrotesque-like headings (Google Fonts approximation), uppercase bold headings, 1440px container, 2–4px radii, restrained accent use. Palette: sand `#F7F4EE`, navy `#0B1F2E`, ocean blue `#005AA0`, sun yellow `#FFD040`.
- Imagery: placeholders (Unsplash) with slots ready for real assets.
- Artifacts (code, comments, identifiers) in English. Site copy EN/ES.

## Tasks
- [ ] T1 Foundations: design tokens, fonts, Layout with Lenis+GSAP bootstrap, i18n config and translations module, EN/ES index pages. Route: delegated writer (writer trigger: 2+ non-trivial files).
- [ ] T2 Sections with motion: all sections listed in scope, bilingual, reduced-motion fallbacks. Route: delegated writer (same worker as T1).
- [ ] T3 Verification: `pnpm build` green, browser check at desktop and mobile widths, reduced-motion check, design finish review. Route: parent + verifier agent.

## Checks
- `pnpm build` exits 0.
- Both `/` and `/es/` render all sections.
- No layout shift on hero; pinned route section scrolls horizontally and releases cleanly.
- `prefers-reduced-motion: reduce` disables pins/scrubs and shows content statically.

## Delivery
Strategy: single-pr. Work-unit commits on `main` (repo was empty; branch policy TBD by user). Forecast: ~900 authored changed lines (new project, mostly components).

## Progress
- 2026-11-06: scaffold committed (63866cc). Research done (WSL tokens, awwwards patterns, competitor gaps).
