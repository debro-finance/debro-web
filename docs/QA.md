# QA record — institutional landing

Status: **implementation QA complete; production deployment QA remains owner-gated.**

Last comprehensive QA: 2026-11-18; the 2026-11-19 marketing copy refinement is recorded below.

## What was verified

- Automated checks: typecheck, lint, unit tests, production build and PostgreSQL integration tests.
- Indexing behaviour in both configurations: preview/prelaunch (non-indexable) and approved Production (indexable).
- Responsive layout at 1440 px desktop and 390 px mobile, including the mobile menu.
- Waitlist form states: disabled prelaunch, validation error, server error, success and duplicate-safe response.
- Lighthouse (lab) against a local production build.

## Automated checks

| Check | Command | Result |
| --- | --- | --- |
| Typecheck | `npm run typecheck` | Pass |
| Lint | `npm run lint` | Pass |
| Unit tests | `npm test` | 51 passed, 1 failed (8 files; existing navigation label assertion mismatch) |
| Production build | `DATABASE_URL= WAITLIST_ENABLED=false npm run build` | Pass |
| DB integration tests | `TEST_DATABASE_URL=… npm run test:db` | 5 passed (1 file) |

Integration tests ran against a local PostgreSQL 16 container (`debro-test-pg`, port 5433) using the tracked migration in `db/migrations/`. They cover persistence, normalization, consent storage, duplicate handling and the removal script. They are the same tests CI runs against a PostgreSQL service container.

## Indexing behaviour

Verified with `curl` against local builds.

| Configuration | `robots.txt` | `sitemap.xml` | Page header/meta |
| --- | --- | --- | --- |
| Default / preview (`SITE_INDEXABLE` unset) | `Disallow: /` | No URLs | `noindex, nofollow` meta and `X-Robots-Tag` |
| Approved Production (`SITE_INDEXABLE=true`, `VERCEL_ENV=production`) | `Allow: /`, sitemap link | One canonical URL | `index, follow`, no `X-Robots-Tag` |

The Production configuration must be set only after the owner approves public launch. Preview deployments can never become indexable because they are not `VERCEL_ENV=production`.

## Lighthouse

Command:

```bash
npx lighthouse http://localhost:3002/ \
  --quiet --chrome-flags='--headless=new --no-sandbox' \
  --only-categories=performance,accessibility,best-practices,seo \
  --output=json --output-path=.qa/lighthouse.json
```

Lab environment: local production build (`next start`), desktop preset, headless Chrome, single run. These are lab numbers, not field data.

| Configuration | Performance | Accessibility | Best Practices | SEO |
| --- | --- | --- | --- | --- |
| Prelaunch / non-indexable | 100 | 100 | 96 | 69 (expected: `noindex`) |
| Approved Production / indexable | 100 | 100 | 96 | 100 |

Core Web Vitals after the refinement (lab, both configurations): LCP 0.9 s, CLS 0, TBT 10 ms, FCP 0.9 s, Speed Index 0.9 s.

Notes:
- Best Practices is 96 in both runs only because `/_vercel/insights/script.js` 404s locally; Vercel serves that script in a real deployment. No console errors originate from site code.
- The non-indexable SEO score is intentionally below target because the build correctly blocks indexing. It is not a defect.
- The hero opacity animation was removed and the header logo changed from `priority` preload to a lightweight preload/fetch-priority hint to bring LCP from 2.6 s to 0.9 s.
- Mobile Lighthouse was not run separately; layout and interaction were checked at 390 px. Field CWV must be reviewed on the deployed domain.

## Refinement iteration

Owner review requested an investing-first repositioning, a stronger hero, corrected waitlist and mobile navigation, and a reliable favicon.

Verified in the browser (Orca embedded browser, 1440 px desktop and 390 px mobile):

- Hero headline is “A simpler way to invest in tokenized assets.”; supporting copy, steps, benefits, security and footer lead with investing, simplicity and clarity.
- Solana, blockchain, wallet and self-custody detail appears mainly in the FAQ; the primary page copy contains none of those terms by design.
- The previous navy rectangle was replaced with a light layered-folio composition: soft-blue and navy offset cards, the official monogram in a nested aperture, and an explicit “Illustrative” note. No fake charts, prices, returns or portfolio data.
- Metadata, OG/Twitter copy, structured data and the regenerated OG image use the investing-first headline. No `Solana` or `self-custodial` framing remains in share metadata.
- Waitlist CTAs (header, hero, FAQ, footer and mobile menu) all target `#waitlist`; desktop and mobile jumps land the heading and signup area below the sticky header without cropping.
- Mobile menu opens on a real coordinate tap at 390 px, closes on Escape with focus returning to the trigger, on outside pointer interaction, and on navigation-link follow. The panel is a solid-surface fixed dropdown outside the blurred header layer.
- `/favicon.ico` returns 200 as `image/x-icon` with 16, 32 and 48 px entries derived from `debro-icon-navy.svg`; `/icon.svg` and `/apple-icon.png` remain available without conflicting icon metadata.
- Lighthouse remained at Performance 100, Accessibility 100, Best Practices 96, SEO 100 for the indexable configuration.

## Previous content and product-positioning refinement QA (2026-11-18)

This record is retained as historical QA; the 2026-11-19 marketing copy refinement below supersedes its content notes.

| Check | Command | Result |
| --- | --- | --- |
| Lint | `npm run lint` | Pass |
| Typecheck | `npm run typecheck` | Pass |
| Unit tests | `npm test` | 48 passed (7 files) |
| Production build | `DATABASE_URL= WAITLIST_ENABLED=false npm run build` | Pass |
| Brand assets | `npm run assets:generate` | Pass |

Browser review:

- Responsive widths: 390, 768 and 1440 px; document width matched viewport at each size with no horizontal overflow or overlapping content.
- How It Works retained the connected three-step layout; Why DeBro retained its asymmetric navy feature and supporting points; Security retained its navy background, compact numbered principles and separate risk disclosure.
- All nine FAQ items rendered, and the accessible single-open-item accordion behavior was exercised.
- Waitlist controls and CTA destinations were checked. No signup was submitted and no database or deployment setting was accessed.
- `prefers-reduced-motion` continues to disable animation and smooth scrolling.
- Local preview used `DATABASE_URL=` and `WAITLIST_ENABLED=false`; production build and server smoke test passed with signup disabled. The browser reported the expected local Vercel Analytics script 404.
- The page explicitly identifies that the privacy notice is not published and lists the responsible-entity, contact, retention, removal and applicable-disclosure details still requiring confirmation. An internal, unapproved draft is in `docs/PRIVACY-DRAFT.md`.

## Final marketing copy refinement QA (2026-11-19)

Verified against the requested wording:

- The hero description and social metadata use the investing-first copy; the prelaunch note and CTA are unchanged.
- How It Works keeps its existing three steps and copy. Why DeBro retains its global-access statement and asterisk; the primary benefit has no adjacent disclaimer.
- The secondary benefits describe planned email/Google or compatible-wallet onboarding and eligible asset portability without technical caveats.
- Security & Transparency retains its navy layout and three principles, with no promotional risk block; the footer disclosure remains.
- The investment-universe/catalog qualification appears once in its FAQ answer. The FAQ adds the traditional-broker comparison and keeps risk concise.
- The waitlist heading and supporting copy are updated; the existing form and one-time consent remain, with the no-newsletter policy stated once in the waitlist section.
- Focused rendering tests verify the security purpose, footer disclosure, waitlist copy and single consent mention.

| Check | Command | Result |
| --- | --- | --- |
| Lint | `npm run lint` | Pass |
| Typecheck | `npm run typecheck` | Pass |
| Unit tests | `npm test` | 51 passed, 1 failed; `navigation.test.tsx` expects “DeBro — back to top” while `SiteHeader` exposes “Scroll to top” |
| Production build | `DATABASE_URL= WAITLIST_ENABLED=false npm run build` | Pass |

No database, waitlist backend, environment settings, deployment or visual design were changed.

## Preview deployment

The Vercel preview for PR #6 built and reported **Ready**. It is behind Vercel Authentication, so unauthenticated requests return `302` with `X-Robots-Tag: noindex`; page HTML, `robots.txt` and `sitemap.xml` are not publicly reachable. This is the expected safe state for a non-public prelaunch preview. Full page QA still requires an authenticated deployment URL or `vercel curl`.

Historical Preview incident: the Neon `preview/development` branch had `current_schema() = public` and a search path including `public`, but both qualified and unqualified table lookups were `NULL`. Applying the tracked migration to that historical Preview branch restored signup there. This does not establish that the current `main` and `development` Vercel runtimes use the same Neon branch; verify their effective environment-variable bindings before treating the shared-database requirement as satisfied.

## Visual and interaction QA

- Desktop 1440 px: header, hero composition, section rhythm, FAQ open/close, waitlist section and footer.
- Mobile 390 px: stacked hero, hamburger menu open/close, focus handling, anchor navigation, form layout and tap targets.
- Keyboard: skip link, menu focus trap/return, FAQ native disclosure, form labels, error summary focus and success focus move.
- Waitlist states: disabled prelaunch message, invalid email, missing consent, honeypot, success confirmation, duplicate-safe success, rate-limit and generic failure messages.
- No horizontal overflow at tested widths; no console errors from application code.
- Screenshots were used for review only and are not committed.

## Limitations

- A prior Neon HTTP signup round trip was verified against the historical isolated Preview branch, not the shared branch required by the current architecture decision.
- Current `main`/`development` Vercel database bindings and API-to-shared-Neon persistence are unverified; account access to Vercel and Neon is required. The local `.env` database is not evidence of deployed runtime configuration.
- The Vercel preview is authentication-protected, so its pages were not fetched unauthenticated. Deployment status and the noindex response were verified.
- No production domain, TLS, redirect or Search Console verification has been performed; these are owner gates.
- Lighthouse is a single local lab run. Repeat on the deployed production URL before launch and record field CWV after traffic exists.
- Copy, claims, legal pages, final typeface and the privacy/retention policy still require owner approval.
