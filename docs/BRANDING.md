# Branding — official DeBro identity

Status: **official logo variants confirmed in Notion**; raw SVG files pending transfer into this repository.

## Authoritative source
The active Notion [Brand & Design](https://app.notion.com/p/4172e0ba375781fd806cc68d9d688598) page was updated on 2026-11-17 with three **owner-supplied official vector files**, superseding earlier defective variants. The historical *Brand Strategy Brief — working* is exploratory, not the final identity source.

## Approved SVG originals

| File | Official purpose | Original viewBox |
| --- | --- | --- |
| `debro-icon.svg` | Icon/monogram alone; favicon, compact identity and avatars | `0 0 1024 1024` |
| `debro-logo.svg` | Icon on left, DeBro wordmark on right; **primary website header/navigation** | `0 0 2521.63 470.32` |
| `debro-logo-vertical.svg` | Icon above the wordmark; vertically centered compositions | `0 0 772.49 752.19` |

These are the **only** approved logo geometries for the institutional website. Do not recreate, trace, simplify, extrapolate or synthesize them from reference screenshots.

### Color application
- Institutional navy: **`#141B3D`** (approved).
- The three original SVGs are transparent with **white** (`#FFFFFF` / `#FFF`) fills, suitable for dark surfaces.
- For light site surfaces, allow **navy** versions created by changing *only* applicable shape `fill` values or parametrizing `currentColor`.
- Preserve all paths, viewBoxes, fill rules, alignment and proportions. Do not introduce gradients, alter shapes or stretch assets.
- Verify contrast on both white and navy backgrounds.

### Integration locations
After obtaining the byte-for-byte original files, store them in:
- `public/branding/debro-icon.svg`
- `public/branding/debro-logo.svg`
- `public/branding/debro-logo-vertical.svg`

Do not create empty placeholders or fabricated SVG files. Once imported, inspect/validate XML, confirm viewBoxes, produce visual snapshots and optionally derive navy variants non-destructively in code; retain originals unchanged.

## Approved UI direction
- Professional, trustworthy, sober, modern financial product — **not** generic crypto/Web3 aesthetics.
- Light theme, generous whitespace, strong hierarchy, restrained navy emphasis.
- English, responsive and accessible. Subtle animation; respect reduced-motion preferences.
- Match the identity of DeBro's application while keeping this website's codebase separate.

## Typography
The supplied official SVG wordmark already contains the approved lettering geometry. **Do not replace the wordmark with typed text.**
The separate typeface for *interface copy* has not been confirmed from the current authoritative Notion branding page. Before coding the final layout, inspect a verified current product design system or request owner confirmation. Do not treat exploratory draft font suggestions as approved.

## Design references (inspiration only)
- https://robinhood.com/us/en/
- https://cocos.capital
- https://www.interactivebrokers.com/es/home.php
- https://bullmarket.com.ar
- https://www.invertironline.com/

Use these for hierarchy, simplicity and financial UX conventions. Never copy logos, proprietary images, code or page layouts.

## Outstanding for asset-complete handoff
- [ ] Transfer the three exact originals from Notion to `public/branding/`; verify their geometry and content.
- [ ] Confirm UI typeface and weights from a verified source.
- [ ] Confirm any palette tokens beyond the approved navy; avoid pretending there is a complete finalized palette.
