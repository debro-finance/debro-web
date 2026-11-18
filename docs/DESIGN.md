# UX/UI specification
Status: APPROVED direction (2026-11-18); full visual execution left to DeepSeek within these limits.

## Experience
Single-page, English-first, responsive institutional landing aimed at prelaunch waitlist conversion. **Light** theme with navy #141B3D, subtle accessible motion, minimalist fintech feel and brand consistency with DeBro app.

## Sections
Header with logo and anchor links; hero with value proposition and CTA; How it Works; Why DeBro; Security & Self-Custody; FAQ; final waitlist module; footer with verified contact/social and legal links.

## Interaction
- Repeated Join Waitlist buttons navigate/focus the same canonical signup form; do not create parallel databases or inconsistent experiences.
- Email form: explicit consent checkbox (unchecked by default), client and server validation, loading, success, duplicate (privacy-safe), generic error and rate-limit feedback.
- Form must not expose emails in analytics, URL query strings, logs, screenshots or front-end storage.
- Responsive navigation, visible focus states, accessible labels and error descriptions; functional keyboard-only operation.
- Motion: subtle hover/scroll feedback with `prefers-reduced-motion` support; no expensive scroll-jacking.
- Accurate illustration: no manufactured trading balances or fake live price views.
- States before launch must not imply trading is currently possible.

## Accessibility and performance
Target WCAG 2.2 AA where applicable. Mobile-first, fluid layouts, semantic headings, alt text, color contrast, appropriately sized touch targets. Prefer static rendering/server components; minimize client-side JavaScript, layout shifts and third-party assets.

## Content design
Clear language understandable to non-crypto visitors. Explain 'tokenized' and 'self-custody' without overselling or suggesting the user directly owns underlying shares. Use verified risks and precise claims; user-facing copy is not legal approval.

## Acceptance
Visual QA at mobile/tablet/desktop; all anchors and FAQ interactions work; signup states accessible; correct logos and font once supplied; no broken/footer placeholder links published; no unnecessary animation dependencies.
