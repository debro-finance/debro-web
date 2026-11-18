# DeBro — Institutional Website

The official institutional website for **DeBro**, an upcoming self-custodial experience for exploring tokenized financial assets on Solana.

This repository powers the planned **debro.finance** prelaunch landing page. The product application will live separately at **app.debro.finance**; no trading or wallet integration belongs in this repository.

## Purpose
Present DeBro clearly to traditional investors and crypto-native visitors, explain the approach and relevant risks, and collect opt-in email registrations **solely for a launch-availability notification**.

The planned site is English-first, light/minimalist, mobile-friendly and designed around the approved DeBro brand. The primary action is **Join Waitlist**.

## Status
**Specification and repository foundation in progress. The website is not implemented or launched.**

## Source of truth
- [Product & scope](docs/PRODUCT.md)
- [Branding](docs/BRANDING.md)
- [UX/UI](docs/DESIGN.md)
- [Architecture & deployment](docs/ARCHITECTURE.md)
- [Waitlist & privacy baseline](docs/WAITLIST.md)
- [SEO, indexing & performance](docs/SEO.md)
- [Execution roadmap](docs/EXECUTION.md)
- [GitHub workflow](docs/GITHUB_WORKFLOW.md)
- [Agent instructions](AGENTS.md)

## Infrastructure
Next.js App Router + TypeScript + Tailwind CSS (planned), Vercel (connected by owner), Neon PostgreSQL (already integrated in Vercel), Vercel Analytics (enabled by owner). No implementation has been started here.

## Development policy
Development PRs target `development` and may auto-merge after CI passes. Only the owner merges changes into protected `main`. Production-domain connection and public launch are owner-approved steps.

## Important
Do not use this site or documentation as a claim that DeBro is live, that any specific securities or jurisdictions are supported, or that investments are without risk. Do not invent logos, font information, legal identity, or contact links.
