# shelter-network-dashboard

A dependency-light static frontend for the Adopti Workflow page. It renders the `/workflow` experience, including the autonomous PEX flow, annotated architecture figures, run-history cards, and six claim-family grid.

## How to build the frontend

### 1. Use Node 20

The repo pins Node in `.nvmrc`.

```bash
nvm use
# or install/use Node 20 with your preferred version manager
```

### 2. Install package metadata

There are no runtime or build dependencies. Running `npm install` verifies the lockfile and prepares npm scripts.

```bash
npm install
```

### 3. Start the local frontend

```bash
npm run dev
```

Then open:

- `http://127.0.0.1:4173/`
- `http://127.0.0.1:4173/workflow/`

The dev server is intentionally a small Node static server, not a framework server. It serves the source files directly from `index.html`, `workflow/index.html`, `src/main.js`, `src/styles.css`, and `src/assets/`.

### 4. Build the deployable static site

```bash
npm run build
```

The build writes a static `dist/` folder containing:

```text
dist/
  index.html
  workflow/index.html
  src/main.js
  src/styles.css
  src/data/runHistory.js
  src/assets/
```

### 5. Preview the built frontend

```bash
npm run preview
```

Then open `http://127.0.0.1:4173/workflow/` to verify the built output, not the source tree.

### 6. Run checks before shipping

```bash
npm run lint
npm test
npm run build
```

`npm run lint` uses `node --check` against the frontend modules and build/serve scripts. `npm test` currently aliases the same syntax check because this is a static frontend with no test framework installed.

## Frontend file map

```text
index.html                 # Root entry point for the static app
workflow/index.html        # /workflow entry point
src/main.js                # Renders the Workflow UI and autonomous flow behavior
src/data/runHistory.js     # Five hardcoded sample run-history records
src/styles.css             # Layout, white-space UI, responsive rules, and card styling
src/assets/                # Architecture and transaction SVG reference figures
scripts/build.js           # Copies the static frontend into dist/
scripts/serve.js           # Local source/built static server used by dev and preview
```

## Deployment

This app builds to plain static files, so any static host can serve the `dist/` directory. For Vercel, use:

- Build command: `npm run build`
- Output directory: `dist`

See **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)** for the existing Vercel/GitHub Actions setup and required secrets.
