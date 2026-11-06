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
- [x] T1 Foundations: design tokens, fonts, Layout with Lenis+GSAP bootstrap, i18n config and translations module, EN/ES index pages. Route: delegated writer (writer trigger: 2+ non-trivial files).
- [x] T2 Sections with motion: all sections listed in scope, bilingual, reduced-motion fallbacks. Route: delegated writer (same worker as T1).
- [x] T3 Verification: `pnpm build` green, browser check at desktop and mobile widths, reduced-motion check, design finish review. Route: parent + verifier agent.

## Checks
- `pnpm build` exits 0.
- Both `/` and `/es/` render all sections.
- No layout shift on hero; pinned route section scrolls horizontally and releases cleanly.
- `prefers-reduced-motion: reduce` disables pins/scrubs and shows content statically.

## Delivery
Strategy: single-pr. Work-unit commits on `main` (repo was empty; branch policy TBD by user). Forecast: ~900 authored changed lines (new project, mostly components).

## Progress
- 2026-11-06: scaffold committed (63866cc). Research done (WSL tokens, awwwards patterns, competitor gaps).
- 2026-11-06: T1+T2 delivered by one writer (dbc58a8). Browser check found that the gsap.matchMedia callback never ran on mobile because no condition matched; fixed with an always-matching `isMobile` condition, scuba placeholders swapped for surf photos (8544601).
- 2026-11-06: Design finish review returned 12 items; applied 8 (4073c0e): headline clamps, route h3 scale and padding, anchor offset -80 + scroll-padding-top, nav gradient, ink-500 numerals, focus-visible outside hover query, scrub: true, mt-14. Deliberately skipped: hero light line (WSL 700/300 pairing is intended), self-hosted fonts, tracking token, nav color transition.
- Verified: `pnpm build` green; `/` and `/es/` render all sections at 1440 and 375; pinned route only on desktop; no console errors. Not verified in a browser: `prefers-reduced-motion` (CSS path only); `hreflang` host needs `site` in astro.config.mjs.

## Next
- Real photos/video into the `data-asset-slot` images; real contact email in Contact.astro (`TODO(content)`).
- Set `site` in astro.config.mjs, push and deploy.

## Direction change (2026-11-06)
User rejected the WSL editorial direction (main) and a coastal-magazine comp. Approved direction: **radical road trip** (comp: public/comp-radical.html). Themes: radical, transport + surf, surf trip. Work continues on branch `design/radical-roadtrip`.
- [x] T4 Restyle all components to the radical road-trip direction (tokens, fonts, layouts, motion personality). Route: delegated writer.
- [x] T5 Verify in browser, remove the comp file, commit.

## Audit + mobile-first (2026-11-06)
Impeccable audit before fixes: detector 0 findings; browser pass found ES hero overflow at 375px, 81px nav with wrapping wordmark/CTA, 16px language and back-to-top targets, 12px mono labels, no responsive images, landscape photos cropped in portrait boxes. Score before: A11y 3 · Perf 2 · Responsive 2 · Theming 4 · Integrity 4 = 15/20.
- [x] T6 Mobile-first adaptation: fluid display scale, 64px nav with short CTA, 44px hit areas via `.link-underline`, 13px mono base, `srcset`/`sizes` with 640/1024/1600 WebP, `<picture>` art direction (portrait photos on phones), safe areas, font CSS preload. (3b2033a)
- [x] T7 Truck configurator: `TruckConfigurator.astro` with the real truck cutout (`truck-body.webp`) and AI-generated photoreal layers in `public/images/cfg/` (canopy roof, surfers, boards, cargo; z_image model, 4 × ~0.1 credit), GSAP entrance + mode timelines, pointer tilt on fine pointers, scroll tilt on touch, reduced-motion fallback. Copy lives inside the component (EN/ES) and numbers are marked `TODO(content)`.
- Not verified: `prefers-reduced-motion` in a real browser; real payload/bed figures; contact email/phone (0980520531 appears on the truck, unconfirmed).

## Stage 2: booking funnel + route collage (2026-11-06)
- [ ] T8 Booking funnel at `/book/` and `/es/book/`: near-fullscreen video in a surf-themed frame, giant CTA locked until the video ends (skip after 10 s, auto-unlock on video error), then a booking form that opens WhatsApp (wa.me) with every field prefilled. Placeholder video `public/video/funnel-placeholder.mp4` built from the real photos until the real one arrives. Assumptions: WhatsApp +593 98 052 0531 (from the truck lettering), skip at 10 s. Route: delegated writer (new page + component + CTA links).
- [ ] T9 Route collage: replace the fast sticky-image swap in "Six stops" with a scroll-driven collage where each stop's photo drops and sticks as its row passes, on desktop and mobile, smoothed. Route: delegated writer, parallel to T8 with disjoint files.
