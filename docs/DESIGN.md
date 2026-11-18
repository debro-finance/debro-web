# UX/UI specification

Status: **implemented on `development`; owner visual review pending.**

## Experience
Single-page, English-first, responsive institutional landing aimed at prelaunch waitlist conversion. **Light** theme with approved navy `#141B3D`, subtle accessible motion, minimalist fintech feel and consistency with DeBro's application identity.

## Implemented sections
1. Sticky header: official navy horizontal logo, desktop anchor navigation, accessible mobile disclosure menu, prominent Join the waitlist CTA.
2. Hero: headline, supporting copy, dual CTA and an original navy composition built from CSS/SVG grid, rings, official icon and truthful labels. Explicitly labelled illustrative and prelaunch.
3. How It Works: three numbered steps, all marked “At launch” with a section-level note that none are available today.
4. Why DeBro: four benefits in a restrained two-column card grid.
5. Security & Self-Custody: navy split section with three principles and an explicit risk box.
6. FAQ: two-column layout with native `details`/`summary` accordion and eight factual answers.
7. Waitlist: navy invitation panel plus one shared form with consent, validation, loading, generic success, duplicate-safe and error states.
8. Footer: white logo on navy, anchor navigation, prelaunch status, legal-placeholder notice and risk disclosure. No invented contact or social links.

## Interaction and accessibility
- Repeated CTAs target the single canonical form; there is one registration implementation and one database.
- Form: explicit consent unchecked by default, client-side checks, server validation, `aria-invalid`, described-by errors, `role="alert"`, `role="status"`, focus management and `noValidate` for consistent styled feedback.
- Mobile menu: `aria-expanded`/`aria-controls`, Escape to close, focus moved to the first link and restored to the trigger.
- Visible focus rings, semantic headings, skip link, touch-friendly controls, no horizontal overflow, native FAQ disclosure.
- Motion: hero-only entrance animation and hover transitions; all animation and smooth scrolling are disabled under `prefers-reduced-motion: reduce`.
- Contrast: interface neutrals and white-on-navy text meet WCAG 2.2 AA for their sizes; low-opacity utility text was raised where needed.

## Visual system
- Design tokens live in `src/app/globals.css` as Tailwind CSS 4 `@theme` variables.
- Approved brand token: `--color-navy` (`#141B3D`).
- Interface-only tokens: ink, muted, line, surface, accent, success and danger. These are implementation colors, not new brand decisions.
- Repetition is controlled: one card style, one button system, consistent 2xl/large radii and section rhythm.
- Provisional typeface: Inter Variable, self-hosted. See `docs/BRANDING.md`.

## Acceptance
- [x] Real rendered QA at mobile, tablet and desktop widths.
- [x] All anchors and FAQ disclosures work.
- [x] Waitlist states implemented and exercised.
- [x] Official logos integrated with preserved geometry.
- [ ] Owner visual approval and final typeface confirmation.
- [ ] Privacy, Terms and risk links published once approved.
