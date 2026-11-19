# UX/UI specification

Status: **implemented on `development`; owner visual review pending.**

## Experience
Single-page, English-first, responsive institutional landing aimed at prelaunch waitlist conversion. **Light** theme with approved navy `#141B3D`, subtle accessible motion, minimalist fintech feel and consistency with DeBro's application identity. The page leads with investing, simplicity and clarity; blockchain, wallet and self-custody detail is concentrated in the FAQ.

## Implemented sections
1. Sticky header: official navy horizontal logo, desktop anchor navigation, accessible mobile disclosure menu, prominent Join the waitlist CTA. The mobile panel is a fixed, solid-surface dropdown outside the blurred layer, with outside-click and Escape dismissal.
2. Hero: “A simpler way to invest in tokenized assets.” with concise investing-first copy, dual CTA and an original light orbit composition: the official monogram anchors eight illustrative company logos, evenly alternated between two concentric, slowly rotating rings. No fake charts, prices or portfolio data; explicitly labelled illustrative and prelaunch.
3. How It Works: a progressive three-step journey (explore → understand → invest), horizontally connected on desktop and vertically sequenced on mobile.
4. Why DeBro: an asymmetric editorial composition with a prominent navy unified-experience feature and two unnumbered supporting benefits for clarity and user control/portability.
5. Security & Transparency: navy section with a concise trust statement, three compact unnumbered principles and a separate, understated risk disclosure.
6. FAQ: two-column layout with native `details`/`summary` accordion and ten factual answers, including asset rights, planned access methods, risks, Solana and availability.
7. Waitlist: navy invitation panel plus one shared form with consent, validation, loading, generic success, duplicate-safe and error states. Every waitlist CTA targets the `#waitlist` section, which carries the sticky-header scroll offset.
8. Footer: white logo on navy, anchor navigation, prelaunch status, legal-placeholder notice and risk disclosure. No invented contact or social links.

## Interaction and accessibility
- Repeated CTAs target the single canonical waitlist section; there is one registration implementation and one database.
- Anchor targets account for the sticky header (`scroll-padding-top` plus per-section `scroll-margin-top`), so the destination heading and signup area are not cropped.
- Form: explicit consent unchecked by default, client-side checks, server validation, `aria-invalid`, described-by errors, `role="alert"`, `role="status"`, focus management and `noValidate` for consistent styled feedback.
- Mobile menu: `aria-expanded`/`aria-controls`, conditional panel rendering with explicit layering, Escape/outside-click/link navigation to close, focus moved to the first link and restored to the trigger.
- Visible focus rings, semantic headings, skip link, touch-friendly controls, no horizontal overflow, native FAQ disclosure.
- Motion: hero-only entrance animation and hover transitions; all animation and smooth scrolling are disabled under `prefers-reduced-motion: reduce`.
- Contrast: interface neutrals and white-on-navy text meet WCAG 2.2 AA for their sizes; low-opacity utility text was raised where needed.

## Visual system
- Design tokens live in `src/app/globals.css` as Tailwind CSS 4 `@theme` variables.
- Approved brand token: `--color-navy` (`#141B3D`).
- Interface-only tokens: ink, muted, line, surface, accent, success and danger. These are implementation colors, not new brand decisions.
- Repetition is controlled through distinct section compositions, one focused waitlist panel, consistent buttons and restrained borders.
- Provisional typeface: Inter Variable, self-hosted. See `docs/BRANDING.md`.

## Acceptance
- [x] Real rendered QA at mobile, tablet and desktop widths.
- [x] All anchors and FAQ disclosures work.
- [x] Waitlist states implemented and exercised.
- [x] Official logos integrated with preserved geometry.
- [ ] Owner visual approval and final typeface confirmation.
- [ ] Privacy, Terms and risk links published once approved.
