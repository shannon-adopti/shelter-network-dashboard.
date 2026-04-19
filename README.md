# shelter-network-dashboard

A prototype web app, configured for continuous delivery to [Vercel](https://vercel.com) via GitHub Actions.

## Status

- CI runs on every push and pull request.
- Every branch / PR gets its own live **preview URL**.
- Every merge to `main` deploys to **production** automatically.

## Quick start

```bash
# Install deps (pick based on the lockfile that lands in the repo)
pnpm install        # or: yarn, npm ci

# Run dev server (whatever the framework defines)
pnpm dev

# Mirror the CI checks locally
pnpm lint && pnpm typecheck && pnpm test && pnpm build
```

Node version is pinned to the one in `.nvmrc` (currently Node 20).

## Deployment

See **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)** for:

- One-time Vercel project linking
- GitHub secrets you must add (`VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`)
- Environment variable strategy for Preview vs Production
- Workflow reference and troubleshooting

## Project layout

```
.github/workflows/
  ci.yml                  # Lint, typecheck, test, build on every push/PR
  deploy-preview.yml      # Vercel preview deploy + PR comment
  deploy-production.yml   # Vercel production deploy on main
docs/
  DEPLOYMENT.md           # Full setup and operations guide
vercel.json               # Vercel config; disables auto-deploys from Git
```
