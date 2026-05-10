# GlobalTrail Release Checklist

## Release

```txt
Version:
1.0.0

Release type:
Portfolio production release

Target:
GitHub Pages
```

## Pre-release validation

Run:

```bash
pnpm release:check
```

Equivalent commands:

```bash
pnpm lint
pnpm build
pnpm build-storybook
```

Optional bundle analysis:

```bash
pnpm analyze
```

## Manual route checks

Check locally with:

```bash
pnpm dev
```

Routes:

```txt
/
/countries
/countries?q=spain
/countries?region=Europe
/countries?sort=population&dir=desc
/country?code=ES
/country?code=JP
/compare?left=ES&right=JP
/favorites
/planner
/planner?destination=ES
/states
```

## Product flow checks

### Country explorer

```txt
- Search works
- Region filter works
- Sort works
- URL updates correctly
- Country cards render
- Favorite action works
- Compare action works
```

### Country detail

```txt
- Country profile loads
- Weather panel loads or shows partial failure state
- Currency panel loads or shows partial failure state
- Holidays panel loads or shows partial failure state
- Favorite toggle works
- Add to planner opens /planner?destination=CODE
- Compare opens compare flow
- Travel notes save, update and remove
```

### Favorites

```txt
- Empty state appears when no favorites exist
- Saved destinations appear after saving
- Favorite persists after refresh
- Remove favorite works
- Clear favorites works
```

### Planner

```txt
- Empty state appears when no plans exist
- Create plan works
- Edit plan works
- Remove plan works
- Clear plans works
- /planner?destination=ES prefills destination code
```

### Compare

```txt
- /compare opens with empty slots
- /compare?left=ES loads left country
- /compare?left=ES&right=JP loads both countries
- Swap sides works
- Clear works
- Remove side works
- Add to planner works
```

### States gallery

```txt
- Loading states render
- Empty states render
- Partial API states render
- Client preparation states render
```

## Responsive checks

Check mobile width:

```txt
- Header navigation does not overflow
- Countries filters are usable
- Country cards fit
- Compare metrics show Left/Right labels
- Footer remains readable
```

## Accessibility checks

```txt
- Skip link works
- Keyboard focus is visible
- Header active navigation has aria-current
- Forms have labels
- Date picker closes with Escape
- Partial API states expose alert/status semantics
```

## Performance checks

```txt
- Home images load correctly
- Hero image remains visually sharp
- Below-the-fold sections render correctly
- No unexpected layout overflow
- Bundle analyzer runs with pnpm analyze
```

## Storybook checks

Run:

```bash
pnpm storybook
```

Check:

```txt
UI/Button
UI/Badge
UI/Card
Feedback/States
Feedback/Skeletons
Travel/CountryCard
Travel/FavoriteDestinationCard
Travel/TravelPlanCard
Travel/CompareMetricRow
Travel/CompareCountryPanel
Travel/StatePreviewCard
```

## GitHub Pages checks

After merge to main:

```txt
- GitHub Actions deploy workflow runs
- Pages artifact uploads successfully
- Deployment completes
- Production URL opens
```

Production URL:

```txt
https://giordanap.github.io/globaltrail/
```

## Release tag

Suggested tag:

```bash
git tag v1.0.0
git push origin v1.0.0
```

Suggested GitHub release title:

```txt
GlobalTrail v1.0.0
```

Suggested release notes:

```txt
First complete portfolio release of GlobalTrail, a travel intelligence dashboard built with Next.js, TypeScript, TanStack Query, Zustand, Tailwind CSS and Storybook.
```