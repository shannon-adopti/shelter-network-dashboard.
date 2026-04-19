# Deployment & CI/CD

This repository uses **GitHub Actions** for CI and **Vercel** for hosting. The pipeline covers:

- **CI** on every push and pull request — lint, typecheck, test, build.
- **Preview deploy** on every branch push and pull request → unique Vercel preview URL.
- **Production deploy** on merge/push to `main` → Vercel production environment.

The GitHub Actions workflows own deployments (we explicitly disable Vercel's own Git integration in `vercel.json`) so that CI must pass before anything ships.

---

## One-time setup

### 1. Create a Vercel project

1. Install the CLI locally: `npm i -g vercel`.
2. From the repo root, run `vercel link` and select (or create) the Vercel project this repo should deploy to. This writes `.vercel/project.json` with `projectId` and `orgId`. **Do not commit `.vercel/`** — it's already in `.gitignore`.
3. Note the values of `projectId` and `orgId` from `.vercel/project.json`.
4. Create a Vercel access token at <https://vercel.com/account/tokens> with scope for your team/personal account. Use the token type "Full Account" (or the narrowest scope that allows deployments).

### 2. Add GitHub repository secrets

Go to **Settings → Secrets and variables → Actions → New repository secret** and add:

| Secret name | Value | Used by |
|---|---|---|
| `VERCEL_TOKEN` | Vercel access token from step 1.4 | preview + production workflows |
| `VERCEL_ORG_ID` | `orgId` from `.vercel/project.json` | preview + production workflows |
| `VERCEL_PROJECT_ID` | `projectId` from `.vercel/project.json` | preview + production workflows |

Until these are set, the preview workflow will no-op with a warning and the production workflow will fail fast with a clear error.

### 3. (Optional) Protect `main`

Under **Settings → Branches → Branch protection rules**, require the `CI / Lint, Typecheck, Test, Build` check to pass before merging. This ensures broken code can't reach production.

### 4. (Optional) GitHub Environment for production

Under **Settings → Environments → New environment → `production`**, optionally add required reviewers or a wait timer. The production workflow already declares `environment: production`, so these protections will apply automatically.

---

## Environment variables

There are two layers of environment variables:

### Build-time / runtime vars (managed in Vercel)

Configure per-environment variables in the Vercel dashboard: **Project → Settings → Environment Variables**. For each variable, pick which environments it applies to — **Production**, **Preview**, **Development**, or any combination.

`vercel pull` (run by the workflows) fetches the correct set for the environment being built, so you do not need to duplicate these in GitHub.

Conventions:

- `NEXT_PUBLIC_*`, `VITE_*`, `PUBLIC_*` — exposed to the browser. Safe values only.
- Anything else — server-only. Secrets go here.
- Use **distinct** values for Production vs Preview where it matters (e.g., point preview at a staging API).

### CI-only vars (managed in GitHub)

If a GitHub Actions step (not Vercel build) needs a secret — e.g., uploading coverage, Sentry source maps, a separate Slack notifier — add it as a GitHub repository secret and reference it as `${{ secrets.NAME }}` in `.github/workflows/*.yml`.

---

## Workflow details

### `ci.yml`

Runs on every push and PR. Auto-detects the package manager (pnpm / yarn / npm) from the lockfile and runs:

1. `lint` script (if defined)
2. `typecheck` script, or `tsc --noEmit` if `tsconfig.json` exists
3. `test` script (if defined)
4. `build` script (if defined)

Missing scripts are skipped with a log line — this keeps the workflow useful for prototypes that haven't added all scripts yet. Once you commit real scripts, CI will enforce them.

### `deploy-preview.yml`

Runs on every non-`main` branch push and every PR (from a branch in this repo). Uses `vercel pull` → `vercel build` → `vercel deploy` with the `preview` environment, then stickies a comment on the PR with the preview URL. PRs from forks skip the deploy to avoid leaking `VERCEL_TOKEN`.

### `deploy-production.yml`

Runs on push to `main` (including merge commits) and on manual dispatch. Uses `vercel pull --environment=production` → `vercel build --prod` → `vercel deploy --prebuilt --prod`. Writes the deployed URL to the run summary and associates the deployment with the GitHub `production` environment.

---

## Webhooks — do I still need them?

**Usually no.** Because GitHub Actions drives the deploys via the Vercel CLI, Vercel does not need to watch the GitHub repo, and we set `github.enabled: false` in `vercel.json` to prevent double-deploys.

You may still want webhooks for one-way notifications (for example, posting deploy status to Slack or firing a cache-purge in another system). Add those as:

- A Vercel **Deploy Hook** (Project → Settings → Git → Deploy Hooks) if an external system needs to *trigger* a Vercel deploy without a git push.
- A Vercel **Outgoing Webhook** / Integration if Vercel should notify an external system on deploy events.

If you later want Vercel's native preview comments back, flip `github.enabled` to `true` in `vercel.json` and remove the preview workflow — but know that you lose the "CI must pass before deploy" guarantee.

---

## Local development

```bash
# install deps (pick the one matching your lockfile)
pnpm install     # or: yarn, npm ci

# run in dev mode (example scripts — adjust to the framework in use)
pnpm dev

# mirror CI locally
pnpm lint && pnpm typecheck && pnpm test && pnpm build

# pull the preview environment and run a production-like build
vercel pull --environment=preview
vercel build
```

---

## Troubleshooting

- **Preview job logs "Vercel secrets not configured"** — add the three secrets above. Until then, CI still runs; deploys do not.
- **Production job fails with "Vercel secrets missing"** — same fix.
- **`vercel pull` prompts for a link** — the `.vercel/project.json` isn't resolving. Ensure `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` secrets are set; the CLI reads them from env.
- **Wrong framework detected** — add a `framework` field to `vercel.json` (e.g., `"framework": "vite"`, `"nextjs"`, `"astro"`, `"sveltekit"`) or override `buildCommand` / `outputDirectory`.
- **Preview doesn't run on a fork PR** — expected; forks cannot access secrets. Deploy runs once the PR is merged or rebased onto an internal branch.
