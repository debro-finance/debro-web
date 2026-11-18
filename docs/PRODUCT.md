# Product specification — DeBro Institutional Website
Status: APPROVED product direction (2026-11-18); refined investing-first positioning (2026-11-18). Source of truth for institutional scope.

## Identity and purpose
- Website: `debro.finance`. Product application: `app.debro.finance` in a **different repository**.
- DeBro is a modern investing platform that simplifies access to tokenized financial assets. It is self-custodial and uses Solana, but the public landing leads with investing, simplicity, financial markets and experience — not blockchain or Web3.
- Blockchain, Solana, wallets and self-custody are supporting details explained mainly in the FAQ for visitors who want them.
- Describe only verified capabilities; this is a **prelaunch** presentation, not an operating brokerage or live trading interface.
- Purpose: introduce DeBro as an investing product, establish trust through clear explanations, and collect opt-in launch-notification interest.
- Audience: global, English-first, spanning mainstream and experienced investors.
- Main message: a simpler way to invest in tokenized assets. Avoid claims of universal access, entitlement to underlying securities, guarantees, specific regulation or launched capabilities.
- Initial UI language: English; structure content for potential localization later.

## Information architecture — single-page landing
1. Header: official DeBro mark; anchored navigation; prominent **Join Waitlist** CTA.
2. Hero: investing-first value proposition, short supporting text and CTA; a minimal branded composition, not invented trading screens, portfolio data or price charts. Headline: “A simpler way to invest in tokenized assets.”
3. How It Works: concise steps (explore -> understand -> invest), explicitly label not-yet-available steps as coming soon. Do not imply investing is live.
4. Why DeBro: clarity, simplicity, transparency and depth for different experience levels; no return, fee or performance promises.
5. Security & Confidence: explain control, explicit confirmations and transparency in investor language, with an explicit risk box. Technical wallet and blockchain details belong in the FAQ.
6. FAQ: what DeBro is; tokenized assets; how it differs from a traditional platform; wallet and blockchain expectations; Solana; availability; launch timing; waitlist privacy.
7. Waitlist: one email field, explicit launch-notification consent, accessible result/error states.
8. Footer: official socials/contact **only when confirmed**, Privacy Policy / Terms and relevant risk disclosures.

## Conversion and lifecycle
- Primary CTA throughout: **Join Waitlist**; repeated in header, hero, FAQ and closing section, with one reusable registration implementation.
- All waitlist CTAs point to the waitlist **section**, never directly to the email input, so the heading and signup area are framed correctly below the sticky header.
- Signup: single opt-in (no confirmation email); confirmation appears on site; no newsletter or periodic product updates.
- Collected emails will be used **only once/for communications necessary to announce DeBro availability** under the disclosed consent purpose; no unrelated marketing. Do not silently extend this purpose.
- Replace CTA with **Launch App** only after owner approval and production readiness; keep app host separate.

## Initial copy direction (illustrative, not final legal-approved copy)
- Headline: "A simpler way to invest in tokenized assets."
- Subline: "DeBro is building a modern investing platform that makes tokenized financial assets easier to understand and explore."
- CTA: "Join the waitlist"
- Confirmation: "You're on the list. We'll email you when DeBro launches."
Avoid "stocks directly", "regulated broker", "available everywhere", "risk free", "bank-grade security" and guarantees unless specifically substantiated.

## Explicit non-goals
No trading, wallet connection, checkout, portfolio views, account creation, blog, community features, newsletters, crypto price data or financial advice in this repository.

## Release prerequisites
Owner-approved wording, actual official brand assets, privacy/terms/risk text appropriate for operating jurisdictions, lawful processing of subscriber emails, domain procurement and verified Vercel production configuration. Keep production/indexing and live signup closed until explicitly approved.
