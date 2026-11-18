# GitHub workflow — approved

Repository: `debro-finance/debro-web` (institutional website).

- `main`: production branch; human owner reviews and merges manually. No automated merges to `main`.
- `development`: integration branch.
- `feature/*`, `chore/*`: short-lived branches off `development`, PR into `development`.
- CI checks must pass before an automated merge is permitted.
- Do not give the automation permission to merge a PR if its base is `main`.
- No direct writes to `main` except initial owner-approved bootstrap when necessary.

## CI bootstrap
The initial workflow checks repository documentation and whitespace. Once the Next.js project is scaffolded, replace/extend it with dependency install, lint, typecheck, tests and build, using locked dependencies.

## Owner settings to verify
1. Set GitHub Actions workflow permissions appropriately (read-only by default; elevated permission only for narrowly scoped merge automation if enabled).
2. Enable repository auto-merge if the GitHub plan/settings permit it.
3. Add branch protection or rulesets where supported to prevent direct pushes to `main` and require checks on `development`.
4. Verify Vercel production branch is `main`; previews on other branches.
5. Keep automatic merging disabled until the base-branch guard and check requirements are verified.

**Important:** an automation should never use a broad `pull_request_target` workflow to execute untrusted PR code with write credentials. Automated merges of PRs targeting `development` will be enabled after checks and permissions are verified, not assumed from this document.
