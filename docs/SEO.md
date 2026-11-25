# SEO & discovery specification

Status: **implemented; production indexing remains owner-gated.**

## Indexing and canonical host
- Canonical production origin: `https://debro.finance` (domain not yet purchased/configured; configured through `NEXT_PUBLIC_SITE_URL`).
- Indexing requires **both** `SITE_INDEXABLE=true` and `VERCEL_ENV=production`. Everything else is `noindex, nofollow` in metadata and in the `X-Robots-Tag` response header.
- While not approved, `robots.txt` disallows all crawling and `sitemap.xml` contains no URLs. Approved Production publishes `Allow: /`, the sitemap URL and the canonical page.
- Canonical URLs use the configured origin with one trailing-slash policy. Preview aliases and www can never be indexed because previews are non-production.
- Trailing-slash drift and duplicate indexable routes are avoided by a single canonical page and `alternates.canonical`.

## Page metadata and social sharing
Implemented:
- Investing-first title and the matching hero description: “Discover tokenized stocks, ETFs, and investment opportunities from around the world. DeBro brings investing, portfolio management, and greater freedom over your assets together in one intuitive platform.”
- Canonical URL, Open Graph and Twitter/X summary-large-image cards.
- Generated 1200×630 branded OG image using the official logo geometry, investing-first headline and global-opportunities tagline.
- Favicon from the official navy icon and a 180×180 apple icon.
- `lang="en"`, responsive viewport, theme color and semantic heading hierarchy.
- JSON-LD `Organization` and `WebSite` with only name, URL, logo, language and description. No address, social profiles, ratings or offers.
- The owner-provided Waitlist Privacy notice is implemented at `/waitlist-privacy` and linked from the waitlist form and footer. Its page metadata has a dedicated title, description and canonical path. The confirmed contact `privacy@debro.finance` is preserved; see `AGENTS.md`. This does not imply formal legal approval; responsible-entity, provider/analytics disclosures, legal review and deletion/backup operations remain owner requirements. See `docs/PRIVACY-DRAFT.md`.

## Technical quality
- All landing content is server-rendered and crawlable; interactive islands are the mobile menu and form only.
- One self-hosted variable font file preloaded by `next/font`, SVG logos and CSS-only hero composition.
- No external image, font or analytics dependencies beyond the owner-connected Vercel integration.
- Automated checks in `tests/unit/seo.test.ts` cover metadata copy, canonical origin, robots/sitemap behavior, structured data and indexing gates. `tests/unit/content.test.ts` guards the investing-first hierarchy and keeps wallet/Solana detail in the FAQ.
- Live checks (dev/preview vs approved Production) are recorded in `docs/QA.md`.

## Vercel Analytics
- The existing `@vercel/analytics/next` integration remains mounted in `src/app/layout.tsx`.
- The current Vercel team is on Hobby. Do not enable paid features, upgrade plans, introduce another analytics provider, or depend on custom events.
- Future custom conversion events, if approved later, should be implemented without changing the public waitlist response contract. The conversion source should be the server-confirmed new registration outcome (inserted record), not client-side form submission alone. Any event payload must remain aggregate-safe and must not include email, raw IP, referrer URL, or personal information.
- Preserve the generic public waitlist response and anti-enumeration protections. Do not add client-observable signals that distinguish new vs duplicate registrations.

## Measured results
See `docs/QA.md` for the exact Lighthouse run, environment, scores and Core Web Vitals lab values. Targets remain aspirations, not ranking guarantees:

- Lighthouse SEO ≥ 95
- Lighthouse Accessibility ≥ 95
- LCP ≤ 2.5 s
- INP ≤ 200 ms
- CLS ≤ 0.1

Non-indexable prelaunch production deployments may intentionally fail the “page can be indexed” SEO audit. The indexable Production configuration is also measured separately.

## Release checklist
- [x] Metadata, OG image, favicons and structured data implemented.
- [x] Canonical URL logic implemented.
- [x] Preview and pre-approval indexing disabled in metadata and headers.
- [x] Robots and sitemap behavior implemented and tested.
- [ ] Owner-approved public copy and claims.
- [ ] Production domain connected and redirects tested.
- [ ] `SITE_INDEXABLE=true` enabled only after approval.
- [ ] Search Console verification if/when configured.
- [ ] Mobile Core Web Vitals reviewed on the deployed production domain.
