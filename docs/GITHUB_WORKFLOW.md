# GitHub workflow — approved

Repository: `debro-finance/debro-web` (institutional website).

- `main`: production branch. The human owner reviews and merges manually. It must never be auto-merged.
- `development`: integration branch. Internal, non-draft PRs with passing CI are automatically squash-merged.
- `feature/*`, `chore/*`: short-lived branches off `development`, PR into `development`.
- CI runs on PRs to both branches and on pushes to both branches.

## Automatic development merges
The `merge-development` job in `.github/workflows/ci.yml` runs only after `foundation` succeeds and only for a non-draft PR from **this same repository** targeting `development`. It verifies the PR head commit did not change before merging. It never runs for a PR targeting `main`.

The job uses the GitHub Actions `GITHUB_TOKEN`, not a personal token. For it to work, GitHub Actions must permit the workflow to request `contents: write` and `pull-requests: write`. Organization/repository policy and branch rules may still prevent a merge; treat a rejected merge as a failed automation, never bypass protections.

**Security tradeoff:** This repository accepts internal-branch automation for fast iteration. Contributors who can push branches may also propose workflow changes. Restrict write access to trusted contributors; never execute untrusted fork code with write credentials. PRs from forks are excluded from auto-merge.

## CI evolution
The initial workflow validates foundation documents because no Next.js application has been scaffolded. As soon as application code is added, add lint, strict typecheck, relevant tests, and production build; make the merge job depend on **all required jobs**, not only `foundation`. Do not claim the app is validated by the initial check.

## Release and Vercel
- Only the human owner merges `development` to `main`.
- Verify Vercel production branch is `main`; use preview deployments for other branches.
- Keep secrets and subscriber data out of git; use managed environment variables.
- Domain purchase and production launch require owner approval.
