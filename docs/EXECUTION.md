# Execution roadmap — institutional web

Status: **implementation complete on `development`; production release owner-gated.**

## Completed
- **Foundation:** Next.js App Router, strict TypeScript, Tailwind CSS 4, self-hosted font, design tokens, official brand assets, navy variants, OG/apple assets, metadata routes, security headers.
- **CI:** documentation validation, lint, typecheck, unit tests, production build and PostgreSQL integration tests. Auto-merge into `development` waits for all jobs.
- **Landing:** header, investing-first hero, How It Works, Why DeBro, Security & Confidence, FAQ, waitlist section and footer. Blockchain, wallet and self-custody detail lives mainly in the FAQ.
- **Waitlist:** tracked migration, Neon adapter, server-only handler, consent, normalization, duplicates, honeypot, rate limiting, safe errors, removal script and test suite.
- **SEO/analytics:** metadata, canonical, OG/Twitter image, favicons, JSON-LD, robots, sitemap, preview noindex and Vercel Analytics.
- **QA:** responsive screenshots, interactive state checks and Lighthouse runs recorded in `docs/QA.md`.

## Owner-controlled launch gates
- [ ] Domain purchase/DNS/TLS and canonical production URL.
- [ ] Confirm legal operator/contact, privacy notice, terms, risk disclosure, retention and subscriber-rights route; see `docs/PRIVACY-DRAFT.md`.
- [ ] The owner reports waitlist collection is currently active. Decide whether to pause further collection until the privacy requirements and handling process are approved; this task did not change collection settings.
- [ ] Final copy/claims approval and final interface typeface confirmation.
- [ ] Vercel plan eligibility for public commercial use.
- [ ] Neon production configuration and preview database isolation verified.
- [ ] Keep indexing owner-gated; do not change the existing waitlist setting without the owner's decision on the privacy requirements.
- [ ] Owner review and merge of `development` into `main`.
- [ ] Public launch announcement and email-sending provider (separate future scope).

## Definition of done
Code passes CI and QA, claims are verified, UX and branding match the official assets, the waitlist is private-by-design and works end-to-end, SEO acceptance checks pass, and the owner explicitly approves production release. That final production approval has **not** been granted.
