# GlobalTrail Deployment

## Deployment target

GlobalTrail is prepared for GitHub Pages.

```txt
Production URL:
https://giordanap.github.io/globaltrail/
```

The app is a static Next.js export.

```txt
output: export
static output folder: out
```

## Base path

Because the app is deployed under the repository path `/globaltrail`, production builds should use:

```txt
NEXT_PUBLIC_BASE_PATH=/globaltrail
```

This value is used by `next.config.ts` for:

```txt
basePath
assetPrefix
```

## GitHub Pages workflow

The release workflow lives at:

```txt
.github/workflows/pages.yml
```

It runs on:

```txt
push to main
manual workflow_dispatch
```

The workflow does the following:

```txt
1. Checkout repository
2. Setup pnpm
3. Setup Node.js
4. Install dependencies
5. Run release checks
6. Upload ./out as GitHub Pages artifact
7. Deploy artifact to GitHub Pages
```

## Required GitHub Pages settings

In the repository settings:

```txt
Settings -> Pages -> Build and deployment
```

Use:

```txt
Source:
GitHub Actions
```

## Local release build

Run:

```bash
pnpm release:check
```

This executes:

```txt
pnpm lint
pnpm build
pnpm build-storybook
```

## Local production-like build with base path

PowerShell:

```powershell
$env:NEXT_PUBLIC_BASE_PATH="/globaltrail"; pnpm build; Remove-Item Env:\NEXT_PUBLIC_BASE_PATH
```

Bash:

```bash
NEXT_PUBLIC_BASE_PATH=/globaltrail pnpm build
```

## Static export output

After `pnpm build`, Next.js writes the static export to:

```txt
out/
```

## Manual deployment checklist

Before relying on GitHub Pages, verify:

```txt
- pnpm lint passes
- pnpm build passes
- pnpm build-storybook passes
- out/ is generated
- images load with /globaltrail base path
- /globaltrail/ opens the Home page
- /globaltrail/countries opens Countries
- /globaltrail/country?code=ES opens Country Detail
- /globaltrail/compare?left=ES&right=JP opens Compare
- /globaltrail/favorites opens Favorites
- /globaltrail/planner opens Planner
- /globaltrail/states opens States Gallery
```

## Notes

The project avoids dynamic server routes, API routes and server-only runtime behavior so it can remain compatible with static hosting.