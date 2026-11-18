# Execution roadmap — institutional web
Status: SPECIFICATION READY, implementation NOT AUTHORIZED until owner handoff.

## Already established
- Organization/repo: `debro-finance/debro-web`.
- `development` exists; CI and development-only auto-merge have been validated by owner.
- `main` is protected and is merged by owner manually.
- GitHub-Vercel, Neon-Vercel integration and Vercel Analytics were configured by owner.
- Scope and visual direction approved in PRODUCT, DESIGN, BRANDING, ARCHITECTURE, WAITLIST, SEO.

## Implementation phases for DeepSeek (later; this document is not an execution command)
1. Foundation: scaffold stable Next.js App Router / TypeScript / Tailwind, root layout, accessible tokens and lint/test/typecheck/build CI. Ensure merge waits for ALL quality jobs.
2. Brand+UX: ingest the owner's final three SVGs and typeface; produce responsive component system and section layouts. Do not invent or approximate missing assets.
3. Landing: implement content sections and accurate English copy; avoid unverified financial claims.
4. Waitlist: Neon migration and safe server-only handler, consent, spam controls, accessibility and tests.
5. SEO+analytics: metadata, canonical, robots, sitemap, JSON-LD, social cards, Vercel Analytics integration, performance checks, noindex previews.
6. QA: desktop/tablet/mobile testing, regression checks, production readiness checklist, manual owner review on `main` PR.

## Owner-controlled launch gates
- Domain acquisition/DNS/TLS and production URL.
- Legal operator/contact, privacy/terms, risk disclosure, retention and subscriber-rights process.
- Approved branding assets and exact official font.
- Vercel plan eligibility for public institutional/commercial use.
- Confirm public production branch `main`, preview env isolation and final indexing state.
- No production rollout or automatic merge to `main` without owner approval.

## Definition of done
Code passes CI and QA, claims are verified, UX and branding match source assets, waitlist is private-by-design and works end-to-end, SEO acceptance checks pass, and owner explicitly approves production release.
