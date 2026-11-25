# Execution roadmap — institutional web

Status: **implementation complete on `development`; production release owner-gated.**

## Completed
- **Foundation:** Next.js App Router, strict TypeScript, Tailwind CSS 4, self-hosted font, design tokens, official brand assets, navy variants, OG/apple assets, metadata routes, security headers.
- **CI:** documentation validation, lint, typecheck, unit tests, production build and PostgreSQL integration tests. Auto-merge into `development` waits for all jobs.
- **Landing:** header, investing-first hero, How It Works, Why DeBro, Security & Transparency, FAQ, waitlist section and footer. Blockchain, wallet and self-custody detail lives mainly in the FAQ.
- **Waitlist:** tracked migration, Neon adapter, server-only handler, consent, normalization, duplicates, honeypot, rate limiting, safe errors, removal script and test suite.
- **Waitlist privacy:** owner-provided notice at `/waitlist-privacy`, linked from the form and footer. Its text is implemented but does not constitute formal legal approval.
- **SEO/analytics:** metadata, canonical, OG/Twitter image, favicons, JSON-LD, robots, sitemap, preview noindex and Vercel Analytics.
- **QA:** responsive screenshots, interactive state checks and Lighthouse runs recorded in `docs/QA.md`.

## Owner-controlled launch gates
- [ ] Domain purchase/DNS/TLS and canonical production URL.
- [ ] Confirm the responsible legal entity and a monitored privacy-contact/request route; see `docs/PRIVACY-DRAFT.md`.
- [ ] Complete legal review of the notice and confirm the Neon, Vercel, Vercel Analytics and other provider data flows.
- [ ] Implement and test the single launch-announcement operation and post-announcement deletion of all waitlist records; confirm provider backup/log retention and deletion handling. No automatic expiry or bulk deletion currently exists.
- [ ] The owner reports waitlist collection is currently active. Decide whether to pause further collection until the privacy requirements and handling process are approved; this task did not change collection settings.
- [ ] Before enabling attribution: approve privacy implications, update privacy notice, approve UTM allowlists, back up production DB, run additive migration manually, verify, then set `WAITLIST_ATTRIBUTION_ENABLED=true`.
- [ ] Final copy/claims approval and final interface typeface confirmation.
- [ ] Vercel plan eligibility for public commercial use.
- [ ] Neon production configuration and preview database isolation verified.
- [ ] Keep indexing owner-gated; do not change the existing waitlist setting without the owner's decision on the privacy requirements.
- [ ] Owner review and merge of `development` into `main`.
- [ ] Public launch announcement and email-sending provider (separate future scope).

## Definition of done
Code passes CI and QA, claims are verified, UX and branding match the official assets, the waitlist is private-by-design and works end-to-end, SEO acceptance checks pass, and the owner explicitly approves production release. That final production approval has **not** been granted.
