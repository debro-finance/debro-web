# Branding — official DeBro identity

Status: **official SVG assets present in this repository; provisional UI typeface selected.**

## Authoritative source
The active Notion Brand & Design page was updated on 2026-11-17 with three owner-supplied official vector files, superseding earlier variants. Those exact files are committed here.

## Approved SVG originals

| File | Purpose | ViewBox |
| --- | --- | --- |
| `public/branding/debro-icon.svg` | Icon/monogram; favicon, compact identity | `0 0 1024 1024` |
| `public/branding/debro-logo.svg` | Icon + DeBro wordmark; **primary header identity** | `0 0 2521.63 470.32` |
| `public/branding/debro-logo-vertical.svg` | Icon above wordmark; vertical compositions | `0 0 772.49 752.19` |

These are the only approved logo geometries. They must not be recreated, traced, simplified or synthesized from screenshots.

### Color application and derived variants
- Institutional navy: **`#141B3D`** (approved).
- The originals are transparent with white fills for dark surfaces. They remain unchanged.
- Navy variants are derived by changing **only** the fill value, preserving every path and viewBox:
  - `debro-icon-navy.svg`
  - `debro-logo-navy.svg`
  - `debro-logo-vertical-navy.svg`
- The site header uses the navy horizontal logo, the prelaunch favicon and apple icon use the navy icon, and the footer uses the original white horizontal logo on navy.
- `src/app/icon.svg` is the navy icon. `src/app/apple-icon.png` is generated from the official icon on approved navy.
- `src/app/favicon.ico` is a multi-size ICO (16, 32 and 48 px PNG entries) rendered from `debro-icon-navy.svg`, so browsers that request `/favicon.ico` directly still receive the official DB monogram. `npm run assets:generate` regenerates it; no icon geometry is redrawn.
- Favicons are declared through Next.js file conventions rather than manual `icons` metadata, which avoids duplicate or conflicting `<link rel="icon">` tags. `/favicon.ico`, `/icon.svg` and `/apple-icon.png` all resolve from the served page.
- `public/branding/og-image.png` (1200×630) embeds the official horizontal logo geometry inside a branded composition. Regenerate with `npm run assets:generate`; the script never redraws the logo.

## UI typography
**Inter Variable** is the provisional interface font. It is self-hosted (`src/app/fonts/InterVariable-latin.woff2`, OFL licensed) and loaded through `next/font/local`, so there is no external font request at runtime.

Rationale: broad legibility, a neutral institutional tone, variable weights for hierarchy, a single 47 KB Latin font file, and easy replacement because components use the `--font-inter` token and Tailwind's `font-sans` only. Confirmation of the final product typeface remains an owner/brand decision; replacing it requires swapping one local font file and token.

The SVG wordmark already contains the approved lettering and is never reproduced with type.

## Visual direction
Professional, trustworthy, sober, modern fintech — not generic crypto/Web3 aesthetics. Light theme, generous whitespace, restrained navy emphasis, subtle motion with `prefers-reduced-motion` support.

## Remaining brand inputs
- [ ] Owner confirmation of the final interface typeface (provisional Inter remains valid until then).
- [ ] Any additional official palette tokens beyond `#141B3D`.
- [ ] Production-domain assets and social/contact identities once verified.
