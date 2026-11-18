# Branding — official DeBro identity

Status: **official logo variants imported and verified in this repository** (2026-11-18).

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
The owner's byte-for-byte original uploaded SVGs have been imported into:
- `public/branding/debro-icon.svg`
- `public/branding/debro-logo.svg`
- `public/branding/debro-logo-vertical.svg`

All three SVGs were XML-parsed and checked for their approved viewBoxes, white fills, and absence of scripts or external references. Each committed asset was read back from GitHub and its text content matched the uploaded original. Keep originals unchanged; for a light background, derive navy variants non-destructively through code (fill only) when needed.

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

## Asset verification and remaining decisions
- [x] Transfer the three exact owner-provided SVG originals to `public/branding/`; verify their structure and content.
- [ ] Confirm UI typeface and weights from a verified source.
- [ ] Confirm any palette tokens beyond the approved navy; avoid pretending there is a complete finalized palette.

## Uploaded original checksums (SHA-256)
- `debro-icon.svg`: `2af9e893444443f24c15f6360b82d523889a5c660c6f7515abdca690e8aa16b1`
- `debro-logo.svg`: `c2d5ee80bb4f19c6bfab4916b42988eb4edb9cfef72da0662403436df810d131`
- `debro-logo-vertical.svg`: `6e9b30df1227e7e3b5b7fcd290317e3192704c7e945d07d4f7c4f5286de10545`
