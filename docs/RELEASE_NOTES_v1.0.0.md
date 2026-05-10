# GlobalTrail v1.0.0 Release Notes

## Summary

GlobalTrail v1.0.0 is the first complete portfolio release of the travel intelligence dashboard.

It demonstrates a frontend product experience built with:

```txt
Next.js App Router
TypeScript
Tailwind CSS
TanStack Query
Zustand
Storybook
Static export
GitHub Pages
```

## Highlights

```txt
- Explore countries
- Review country detail pages
- Check weather outlooks
- Convert local currency
- Review public holidays and long weekends
- Save favorite destinations
- Create local travel plans
- Save country travel notes
- Compare two destinations
- Review experience states
- Explore Storybook component documentation
```

## Main routes

```txt
/
/countries
/country?code=ES
/compare?left=ES&right=JP
/favorites
/planner
/planner?destination=ES
/states
```

## Portfolio value

GlobalTrail shows production-style frontend decisions in a static portfolio project:

```txt
- API composition
- Data normalization
- Remote state management
- Local persisted state
- URL-driven state
- Error resilience
- Responsive layouts
- Accessibility improvements
- Performance awareness
- Storybook documentation
```

## Validation

The release should pass:

```bash
pnpm lint
pnpm build
pnpm build-storybook
```

## Deployment

Expected deployment URL:

```txt
https://giordanap.github.io/globaltrail/
```

GitHub Pages should be configured with:

```txt
Source:
GitHub Actions
```