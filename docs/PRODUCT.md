# Product specification — DeBro Institutional Website
Status: APPROVED product direction (2026-11-18); refined investing-first positioning (2026-11-18). Source of truth for institutional scope.

## Identity and purpose
- Website: `debro.finance`. Product application: `app.debro.finance` in a **different repository**.
- DeBro is a modern investing platform that simplifies access to tokenized financial assets. It uses Solana; access and transfer options vary by asset, wallet configuration, network and applicable restrictions. The public landing leads with investing, accessibility and simplicity — not blockchain or Web3.
- Blockchain, Solana, wallets and self-custody are supporting details explained mainly in the FAQ for visitors who want them.
- Describe only verified capabilities; this is a **prelaunch** presentation, not an operating brokerage or live trading interface.
- Purpose: introduce DeBro as an investing product, establish trust through clear explanations, and collect opt-in launch-notification interest.
- Audience: global, English-first, spanning mainstream and experienced investors.
- Main message: a simpler way to invest in tokenized assets. Avoid claims of universal access, entitlement to underlying securities, guarantees, specific regulation or launched capabilities.
- Initial UI language: English; structure content for potential localization later.

## Information architecture — single-page landing
1. Header: official DeBro mark; anchored navigation; prominent **Join Waitlist** CTA.
2. Hero: investing-first value proposition, short supporting text and CTA; a minimal branded composition, not invented trading screens, portfolio data or price charts. Headline: “A simpler way to invest in tokenized assets.”
3. How It Works: present the planned journey as discover → invest → stay in control; the hero says clearly that investing is not available yet.
4. Why DeBro: lead with the 1,400+ investment-universe headline and describe tokenized stocks, ETFs and other financial assets; explain that DeBro is building toward 1,400+ tokenized assets and that the available catalog will evolve once in the investment-universe FAQ. Highlight planned email/Google or compatible-wallet onboarding and eligible asset portability. Qualify global availability in the FAQ.
5. Security & Transparency: focus on the planned transparent, verifiable infrastructure and clearly presented portfolio activity. Keep the financial-risk disclosure in the footer and a concise market-fluctuation comparison in the FAQ. Do not imply guaranteed security, direct ownership of shares, completed audits, regulatory approval or unrestricted transfer.
6. FAQ: explain tokenized-stock exposure vs direct share ownership, the evolving target asset universe, competitive positioning, eligible transfers, geographic eligibility, planned email/Google and wallet access, blockchain and relevant risks.
7. Waitlist: one email field, explicit launch-notification consent, accessible result/error states.
8. Footer: official socials/contact **only when confirmed**, the Waitlist Privacy notice, Privacy Policy / Terms when approved, and relevant risk disclosures.

## Conversion and lifecycle
- Primary CTA throughout: **Join Waitlist**; repeated in header, hero, FAQ and closing section, with one reusable registration implementation.
- All waitlist CTAs point to the waitlist **section**, never directly to the email input, so the heading and signup area are framed correctly below the sticky header.
- Signup: single opt-in (no confirmation email); confirmation appears on site; no newsletter or periodic product updates.
- Collected emails will be used **only once/for communications necessary to announce DeBro availability** under the disclosed consent purpose; no unrelated marketing. Do not silently extend this purpose.
- The owner reports that the waitlist currently accepts registrations and persists them in the existing shared Neon database. The owner-provided notice copy is implemented at `/waitlist-privacy`; the responsible entity, a real monitored privacy contact, legal review, provider/analytics disclosures, and operational deletion/backup handling remain owner/counsel actions. See `docs/PRIVACY-DRAFT.md`. Do not change collection settings in this repository without owner direction.
- Replace CTA with **Launch App** only after owner approval and production readiness; keep app host separate.

## Initial copy direction (superseded by current landing copy)
- Headline: "A simpler way to invest in tokenized assets."
- Subline: "DeBro is building a modern investing platform that makes tokenized financial assets easier to understand and explore."
- CTA: "Join the waitlist"
- Confirmation: "You're on the list. We'll email you when DeBro launches. Follow us on social media so you don't miss any news or updates."
Avoid "stocks directly", "regulated broker", "available everywhere", "risk free", "bank-grade security" and guarantees unless specifically substantiated.

## Explicit non-goals
No trading, wallet connection, checkout, portfolio views, account creation, blog, community features, newsletters, crypto price data or financial advice in this repository.

## Release prerequisites
Owner-approved wording, actual official brand assets, privacy/terms/risk text reviewed for operating jurisdictions, confirmed responsible entity and privacy contact, functioning request handling, documented post-announcement deletion including backups, lawful processing of subscriber emails, domain procurement and verified Vercel production configuration. The owner should promptly decide whether to pause current public waitlist collection until the privacy requirements and request handling are finalized. Keep Production indexing and investing functionality owner-gated.
