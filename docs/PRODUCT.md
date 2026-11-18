# Product specification — DeBro Institutional Website
Status: APPROVED product direction (2026-11-18). Source of truth for institutional scope.

## Identity and purpose
- Website: `debro.finance`. Product application: `app.debro.finance` in a **different repository**.
- DeBro is a decentralized, self-custodial investing experience built around tokenized financial assets on Solana. Describe only verified capabilities; this is a **prelaunch** presentation, not an operating brokerage or live trading interface.
- Purpose: introduce DeBro to newcomers and crypto-native visitors, establish trust through clear explanations, collect opt-in launch-notification interest.
- Audience: global, English-first, spanning traditional investing and Web3.
- Main message: investing in tokenized financial assets from a simple experience; avoid claims of universal access, entitlement to underlying securities, guarantees, specific regulation or launched capabilities.
- Initial UI language: English; structure content for potential localization later.

## Information architecture — single-page landing
1. Header: official DeBro mark; anchored navigation; prominent **Join Waitlist** CTA.
2. Hero: clear value proposition + short supporting text + CTA; a truthful branded visual of DeBro, not invented trading screens.
3. How It Works: concise steps (discover -> connect wallet -> explore tokenized assets), explicitly label not-yet-available steps as coming soon. Do not imply trading is live.
4. Why DeBro: simplicity, accessible discovery, self-custody-oriented experience; describe benefits without promising returns or zero fees.
5. Security & Self-Custody: explain wallet control in plain language while acknowledging smart-contract, blockchain, third-party and market risks. Avoid unverified audits and blanket security claims.
6. FAQ: what DeBro is; tokenized assets and important distinctions; availability; launch timing (if unknown: not announced); wallet expectations; waitlist privacy.
7. Waitlist: one email field, explicit launch-notification consent, accessible result/error states.
8. Footer: official socials/contact **only when confirmed**, Privacy Policy / Terms and relevant risk disclosures.

## Conversion and lifecycle
- Primary CTA throughout: **Join Waitlist**; repeated in header, hero, and closing CTA, with one reusable registration implementation.
- Signup: single opt-in (no confirmation email); confirmation appears on site; no newsletter or periodic product updates.
- Collected emails will be used **only once/for communications necessary to announce DeBro availability** under the disclosed consent purpose; no unrelated marketing. Do not silently extend this purpose.
- Replace CTA with **Launch App** only after owner approval and production readiness; keep app host separate.

## Initial copy direction (illustrative, not final legal-approved copy)
- Headline: "Explore a simpler way to invest in tokenized assets."
- Subline: "DeBro is building a self-custodial experience to discover tokenized financial assets on Solana. Join the waitlist to hear when it launches."
- CTA: "Join Waitlist"
- Confirmation: "You're on the list. We'll email you when DeBro launches."
Avoid "stocks directly", "regulated broker", "available everywhere", "risk free", "bank-grade security" and guarantees unless specifically substantiated.

## Explicit non-goals
No trading, wallet connection, checkout, portfolio views, account creation, blog, community features, newsletters, crypto price data or financial advice in this repository.

## Release prerequisites
Owner-approved wording, actual official brand assets, privacy/terms/risk text appropriate for operating jurisdictions, lawful processing of subscriber emails, domain procurement and verified Vercel production configuration. Keep production/indexing and live signup closed until explicitly approved.
