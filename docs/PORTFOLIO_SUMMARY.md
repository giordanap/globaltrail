# GlobalTrail Portfolio Summary

## One-liner

GlobalTrail is a frontend travel intelligence dashboard that composes multiple public APIs into a polished product experience for exploring, comparing, saving and planning destinations.

## Short pitch

GlobalTrail is a static Next.js application built for portfolio use, but structured like a real product. It integrates country, weather, currency and holiday data, normalizes external provider responses, manages remote state with TanStack Query and persists user-owned state with Zustand.

The project demonstrates API composition, URL-driven state, local persistence, loading and error resilience, responsive UI, accessibility, performance and Storybook documentation.

## Main features

```txt
- Country explorer with search, filters and sorting
- Country detail page with multi-provider travel signals
- Weather panel
- Currency converter
- Public holidays and long weekends
- Favorites with local persistence
- Travel planner with local persistence
- Country travel notes
- Destination comparison
- Experience states gallery
- Storybook component documentation
```

## Technical highlights

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

## Engineering decisions worth mentioning

```txt
- Query params instead of dynamic segments for static export compatibility
- Provider-specific API clients
- DTO to internal model mapping
- Feature-based folder structure
- Centralized query client configuration
- Domain-specific stale times
- Local-first persisted state for favorites, planner and notes
- Client-only guards for persisted browser state
- Partial API failure states for non-critical providers
- Route-level loading skeletons
- Accessibility pass
- Performance pass
- Storybook coverage for UI and travel components
```

## Interview explanation

A concise explanation:

```txt
GlobalTrail is a frontend-only travel intelligence dashboard. I built it to show how I structure a real product experience even without a backend. It consumes several public APIs, normalizes their data, uses TanStack Query for remote state, Zustand for local persisted features like favorites and planner, and keeps important UI state in the URL so routes are shareable and refresh-safe.

I also added resilient UI states, so if weather or currency fails, the country page still works. Later commits focused on responsive mobile behavior, accessibility, performance and Storybook documentation.
```

## What it proves

```txt
- I can design frontend architecture beyond simple pages.
- I can compose multiple external APIs safely.
- I can normalize provider data before rendering.
- I can manage both server/API state and local persisted state.
- I can build resilient user experiences with loading, empty and error states.
- I can ship responsive and accessible UI.
- I can document components with Storybook.
- I can keep a project deployable as a static app.
```

## Useful demo path

```txt
1. Open /
2. Go to /countries
3. Search Spain
4. Open /country?code=ES
5. Save Spain as favorite
6. Add Spain to planner
7. Add a country note
8. Open /compare?left=ES&right=JP
9. Open /favorites
10. Open /planner
11. Open /states
12. Open Storybook
```

## URLs

```txt
Repository:
https://github.com/giordanap/globaltrail

Expected deploy:
https://giordanap.github.io/globaltrail/
```
