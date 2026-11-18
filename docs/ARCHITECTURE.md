# Technical architecture
Status: APPROVED architecture direction; implementation not yet started.

## Topology
- Repo: `debro-finance/debro-web`, institutional website only.
- Public canonical domain when purchased/approved: `https://debro.finance`; `www` redirects to apex. `app.debro.finance` belongs to a separate application/repository.
- Next.js App Router, strict TypeScript, Tailwind CSS, Vercel deployment.
- Vercel project is already connected to GitHub by the owner; Neon is already integrated with that Vercel project; Vercel Analytics is already enabled in dashboard. **Do not provision duplicates**.
- Production branch: `main` after verified Vercel configuration. `development`/feature PRs produce preview deployments.

## Deployment and config
- Use stable compatible dependency versions and lockfile.
- Default to static/server-rendered landing sections. Use a server-only Route Handler or Server Action for waitlist insertions.
- Neon Postgres through its official stable driver/connection integration; read environment variables only server-side, using already-integrated project configuration.
- No credentials in Git or client bundles. Do not send database errors, SQL details or PII to browser/analytics.
- Install `@vercel/analytics`; render `<Analytics />` from `@vercel/analytics/next` in the root layout.
- Distinguish staging/preview database behavior: avoid live subscriber write access from previews. Use separate scoped environments/configurations before enabling forms there.
- Check current deployment plan conditions before public commercial launch. The owner's preference is Vercel Free/Hobby, but plan eligibility/terms must be confirmed for the intended use.

## Security and privacy baseline
- Server-side validation, prepared/parameterized queries, unique normalized email key.
- Restrict waitlist submissions with rate limiting/anti-automation appropriate to low traffic; avoid collecting excess PII, persistent visitor IPs and extra identities.
- HttpOnly/secure cookies only if needed; secure response headers, TLS, no secrets in PR preview logs.
- Minimize vendor integrations; no wallet, privileged finance flow, trading API, or admin dashboard.

## Engineering workflow
- All work via PRs into `development`; CI validates; internal non-draft PRs may auto-merge after passing all required checks; `main` is owner merged only.
- Bootstrap CI currently validates docs; extend it immediately at application scaffold with lint, strict typecheck, relevant tests, and production build, with merge dependency updated to wait for all quality jobs.
- Only implement after reading PRODUCT, DESIGN, BRANDING, WAITLIST and SEO docs.

## Deferred until go-live
Actual domain/DNS/TLS configuration, legal review and privacy disclosures, production-indexability, launch announcement, email notification provider (not part of signup MVP).
