# DeBro Institutional Website — Agent Rules

This repository is the **institutional website** for DeBro, not the trading application. The application lives in a separate repository and is out of scope.

## Source of truth
Use current specifications in `docs/` when present. Do not infer product behavior from the app repository, fabricate branding assets, or invent regulated-product claims.

## Git workflow
- Develop on `feature/*` or `chore/*` branches created from `development`.
- Target `development` for normal PRs. Internal, non-draft PRs automatically squash-merge after the required CI jobs pass.
- Never push directly to `main` or merge a PR targeting `main` automatically.
- Only the human owner reviews and merges `development` to `main`.
- Do not change auto-merge conditions without owner approval.
- Never commit secrets, database connection strings, subscriber emails, or production data.
- Do not purchase a domain or publish the site without owner approval.

## Quality
Keep implementation small, accessible, responsive, secure and SEO-first. When a Next.js application exists, add lint, typecheck, tests, and production build to CI, and ensure auto-merge depends on all those checks. Prefer supported stable dependencies and avoid unnecessary paid services.

## Service context
Vercel GitHub integration, Neon and Vercel Analytics have been connected by the owner. Reuse existing integrations; do not create duplicate providers or databases. Waitlist emails are collected only for a launch announcement after explicit consent.
