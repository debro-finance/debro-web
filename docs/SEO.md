# SEO & discovery specification
Status: high-priority APPROVED acceptance criteria.

## Indexing and canonical host
- On approved production launch, canonical origin: `https://debro.finance`; redirect `www.debro.finance` to apex.
- `main` production can be indexed only when its domain, content, legal material and launch approval are complete.
- Block indexing of preview/development deployments with `noindex` or equivalent response headers; avoid treating robots.txt alone as a security measure or guaranteed deindexing.
- Generate valid `robots.txt` and `sitemap.xml` containing only indexable public canonical URLs; use Next.js metadata route conventions.
- Avoid indexable duplicates (Vercel preview aliases, www, tracking variants, trailing slash drift).

## Page metadata and social sharing
- Descriptive English page title and meta description aligned to real product and prelaunch state.
- Open Graph and Twitter/X card metadata using a brand-approved OG image, dimensions and canonical absolute URLs; no fabricated trading or product claims.
- Correct viewport, favicons from official SVG, language `en`, consistent heading hierarchy and anchor labels.
- Structured JSON-LD only for supported verified entities/content (e.g., Organization and WebSite where attributes can be substantiated). No invented legal address, social handles, reviews, ratings or financial offers.
- Link Privacy Policy, Terms and risk information once approved, with reasonable semantic markup.

## Technical quality
- Crawlable server-rendered semantic content; meaningful anchors; sensible page titles; descriptive links and accessible images.
- Mobile-first performance: optimize font delivery, image size and layout stability; avoid blocking scripts and unnecessary client hydration.
- Targets (field measurements where available): LCP <= 2.5 s, INP <= 200 ms, CLS <= 0.1; Lighthouse lab target >= 95 for SEO and accessibility under documented test conditions. Targets are aspirations, not guaranteed rankings.
- Run sitemap/robots/canonical/Open Graph/JSON-LD validations in tests or CI and evaluate production behavior manually before launch.
- Search Console and analytics can be activated/verified by owner after domain connection.

## Content positioning
Potential research topics: tokenized assets, tokenized stocks, self-custodial investing, Solana. Research actual search intent and publish precise, educational wording; no keyword stuffing, unrealistic return claims, misleading 'ownership of underlying shares' or universal availability.

## Release checklist
[ ] Owner-approved copy and claims
[ ] Production canonical configured and redirects tested
[ ] Metadata/OG image/favicons all verified
[ ] Sitemap/robots indexed URL rules checked
[ ] Structured data verified
[ ] Mobile Core Web Vitals reviewed
[ ] Production indexability enabled only after approval
[ ] Search Console ownership verified if/when configured
