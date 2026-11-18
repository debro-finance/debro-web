# DeBro — Institutional Website

The official prelaunch website for **DeBro**, a modern investing platform that simplifies access to tokenized financial assets.

This repository contains the single-page institutional landing site planned for **debro.finance**. The product application is a separate repository and host (`app.debro.finance`); no trading, wallet connection or account features belong here.

## Status

**Implemented on `development`, in owner review. Prelaunch and not publicly launched.**

- The site is a static-rendered Next.js App Router landing page with the approved DeBro identity.
- The waitlist backend is implemented and tested against PostgreSQL, but public collection remains disabled by default until the legal/privacy and release gates in `docs/` are approved.
- `main` is production and is merged only by the human owner. Preview deployments are always non-indexable.

## What is implemented

- Responsive header with official horizontal logo, anchor navigation, mobile menu and repeated **Join the waitlist** CTA.
- Investing-first hero with an original CSS/SVG folio composition (no fabricated trading interface or portfolio data).
- How It Works, Why DeBro, Security & Confidence, FAQ and Waitlist sections. Blockchain, wallet and self-custody details live mainly in the FAQ.
- Accessible FAQ using native `details`/`summary`.
- Waitlist form with explicit consent, loading, success, duplicate-safe, validation and error states, plus a honeypot.
- Server-side waitlist route with Zod validation, lowercase normalization, parameterized SQL, unique-email handling, in-memory rate limiting and safe error responses.
- Neon-compatible server-only database adapter, tracked SQL migrations and an operator removal script.
- Metadata, canonical URL, Open Graph/Twitter cards, generated 1200×630 OG image, favicons, JSON-LD, `robots.txt` and `sitemap.xml`.
- Vercel Web Analytics via `@vercel/analytics/next`, with no custom PII events.
- Strict TypeScript, ESLint, Vitest unit tests, PostgreSQL integration tests and CI quality gates before auto-merge.

## Stack

- Next.js 16 (App Router) + React 19 + strict TypeScript
- Tailwind CSS 4
- Neon PostgreSQL through `@neondatabase/serverless` (server-only)
- Vercel deployment and Vercel Web Analytics
- Vitest, `pg` (migrations/integration tests only) and Sharp (brand asset generation)

The interface font is **Inter Variable**, self-hosted from `src/app/fonts/` (`next/font/local`). It is a provisional UI choice, not a change to the approved wordmark. See `docs/BRANDING.md`.

## Local development

Requirements: Node.js 22.9+ (CI uses Node 24) and npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

### Environment variables

| Variable | Purpose | Default |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata, sitemap and JSON-LD | `https://debro.finance` |
| `SITE_INDEXABLE` | Set to `true` **only** on approved Vercel Production to allow indexing | unset (noindex) |
| `WAITLIST_ENABLED` | Set to `true` to allow waitlist writes | unset (disabled; local dev enables when `DATABASE_URL` exists) |
| `DATABASE_URL` | Neon/PostgreSQL connection string (server-only) | unset |
| `RATE_LIMIT_SALT` | Optional salt for in-memory hashed rate-limit keys | fallback constant |

Preview and Development deployments stay non-indexable even when `SITE_INDEXABLE=true`, because indexing also requires `VERCEL_ENV=production`.

### Waitlist database

```bash
# Apply tracked migrations to the database in DATABASE_URL
DATABASE_URL="postgresql://…" npm run db:migrate

# Remove a subscriber record (default: mark unsubscribed)
npm run waitlist:remove -- --email person@example.com

# Permanently delete a subscriber record
npm run waitlist:remove -- --email person@example.com --delete
```

Migrations live in `db/migrations/` and are tracked in `schema_migrations`. Use a Neon branch or local PostgreSQL for development; do not point local tests at production subscriber data.

To try the form locally against PostgreSQL, start a local database, set `DATABASE_URL` plus `WAITLIST_ENABLED=true` in `.env.local`, and run the migration. The production runtime uses the Neon serverless driver, so a local Neon-compatible endpoint is required for a full HTTP round trip; the SQL contract is covered by the integration suite.

## Checks

```bash
npm run lint
npm run typecheck
npm test          # unit and route tests
npm run build
npm run test:db   # requires TEST_DATABASE_URL and applied migrations
```

`npm run test:db` is also run in CI against a PostgreSQL 16 service container.

## Project structure

```text
src/app/              App Router pages, metadata routes, API route, global styles
src/components/       Brand, layout, section and UI components
src/content/          Approved landing copy and FAQ content
src/lib/              Site config, SEO builders, validation and rate limiting
src/server/           Server-only database adapter and waitlist service
db/migrations/        Tracked SQL migrations
scripts/              Migration, removal and brand asset generation scripts
tests/unit/           Validation, route, SEO and content tests
tests/integration/    Real PostgreSQL persistence tests
public/branding/      Original official SVGs, derived navy variants, OG image
docs/                 Product, design, architecture, waitlist, SEO and QA docs
```

## Deployment

- Vercel is connected to this repository by the owner; Neon and Vercel Analytics are already integrated. Do not create duplicate projects, databases or analytics providers.
- PRs target `development` and auto-merge after all CI jobs pass. The owner alone merges `development` into `main`.
- Preview deployments are non-indexable and must not write to production subscriber data.
- Production collection and indexing require explicit environment flags and owner approval.

## Release gates (owner-controlled)

- Domain purchase/DNS/TLS and production canonical verification.
- Approved legal operator identity, contact route, Privacy Policy, Terms, risk disclosures, retention and cross-border processing.
- Final approval of public copy and waitlist activation.
- Vercel plan eligibility for the intended public commercial use.
- Enabling `WAITLIST_ENABLED=true` and `SITE_INDEXABLE=true` in Vercel Production.
- Final human review and merge into `main`.

## Source of truth

- [Product & scope](docs/PRODUCT.md)
- [Branding](docs/BRANDING.md)
- [UX/UI](docs/DESIGN.md)
- [Architecture & deployment](docs/ARCHITECTURE.md)
- [Waitlist & privacy](docs/WAITLIST.md)
- [SEO, indexing & performance](docs/SEO.md)
- [Execution roadmap](docs/EXECUTION.md)
- [GitHub workflow](docs/GITHUB_WORKFLOW.md)
- [QA and verification](docs/QA.md)
- [Agent instructions](AGENTS.md)

## Important

Do not use this site or documentation as a claim that DeBro is live, that any specific securities or jurisdictions are supported, or that investments are without risk. Do not invent logos, legal identity, contact details or social accounts.
