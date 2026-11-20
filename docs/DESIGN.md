# UX/UI specification

Status: **implemented on `development`; owner visual review pending.**

## Experience
Single-page, English-first, responsive institutional landing aimed at prelaunch waitlist conversion. **Light** theme with approved navy `#141B3D`, subtle accessible motion, minimalist fintech feel and consistency with DeBro's application identity. The page leads with investing, simplicity and clarity; blockchain, wallet and self-custody detail is concentrated in the FAQ.

## Implemented sections
1. Sticky header: official navy horizontal logo, desktop anchor navigation, accessible mobile disclosure menu, prominent Join the waitlist CTA. The mobile panel is a fixed, solid-surface dropdown outside the blurred layer, with outside-click and Escape dismissal.
2. Hero: “A simpler way to invest in tokenized assets.” with concise investing-first copy, a “See how it works” CTA, and an original light orbit composition: the official monogram anchors eight illustrative company logos, evenly alternated between two concentric, slowly rotating rings. The hero has no registration form; waitlist signup remains in the dedicated final section and the header CTA. No fake charts, prices or portfolio data; explicitly labelled illustrative and prelaunch.
3. How It Works: three immersive, alternating 50/50 product stories—Discover, Invest and Stay in control—with oversized editorial numbers. The conceptual discovery interface supports asset search, sector filtering and selection; the investment preview supports changing an example amount; the portfolio composition draws in when it enters the viewport. Company marks use the supplied logo assets, and the mockups are labelled illustrative/demo-only. No live prices, portfolio data or trading capability.
4. Why DeBro: the asymmetric editorial composition with the target-universe highlight and two supporting benefits for simplicity and supported asset portability.
5. Security & Transparency: the navy composition with three principles focused on verifiability, clear portfolio presentation and unobtrusive technology; the risk disclosure remains in the footer and concise FAQ.
6. FAQ: two-column layout with native `details`/`summary` accordion and ten answers about tokenized-stock exposure, the evolving target asset universe, competitive positioning, supported transfers, eligibility, planned access, risks and the waitlist.
7. Waitlist: navy invitation panel plus one shared form with consent, validation, loading, generic success, duplicate-safe and error states. It discloses the single-email purpose, no-newsletter policy and outstanding privacy-notice details. Every waitlist CTA targets the `#waitlist` section, which carries the sticky-header scroll offset.
8. Footer: white logo on navy, anchor navigation, prelaunch status, waitlist/privacy status and risk disclosure. No invented contact or social links.

## Interaction and accessibility
- Repeated CTAs target the single canonical waitlist section; there is one registration form, one registration implementation and one database.
- Anchor targets account for the sticky header (`scroll-padding-top` plus per-section `scroll-margin-top`), so the destination heading and signup area are not cropped.
- Form: explicit consent unchecked by default, client-side checks, server validation, `aria-invalid`, described-by errors, `role="alert"`, `role="status"`, focus management and `noValidate` for consistent styled feedback.
- Mobile menu: `aria-expanded`/`aria-controls`, conditional panel rendering with explicit layering, Escape/outside-click/link navigation to close, focus moved to the first link and restored to the trigger.
- Visible focus rings, semantic headings, skip link, touch-friendly controls, no horizontal overflow, native FAQ disclosure.
- Motion: restrained hero entrance and orbit motion, product control hover states, and a one-time in-view portfolio-chart reveal; animations and smooth scrolling are reduced under `prefers-reduced-motion: reduce`.
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
- [ ] Privacy notice and any needed Terms/risk links published after owner and counsel approval; waitlist collection status is an owner decision while this is pending.
