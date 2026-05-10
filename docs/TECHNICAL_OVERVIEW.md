# GlobalTrail Technical Overview

## Purpose

This document explains the technical structure of GlobalTrail for portfolio review, interviews and future maintenance.

GlobalTrail is a static frontend application built with:

```txt
Next.js App Router
React
TypeScript
Tailwind CSS
TanStack Query
Zustand
Storybook
```

## Runtime model

GlobalTrail is designed for static export.

```txt
output: export
GitHub Pages compatible
No backend runtime
No API routes
No server-only data requirements
```

The app calls public APIs directly from the browser through provider-specific clients.

## Route model

Because the app targets static hosting, dynamic data screens use query params.

```txt
/                         Home
/countries                Country explorer
/country?code=ES          Country detail
/compare?left=ES&right=JP Destination comparison
/favorites                Saved destinations
/planner                  Travel planner
/planner?destination=ES   Planner prefilled by destination
/states                   Experience states gallery
```

## Source structure

```txt
src/
	app/
	core/
	modules/
	shared/
```

## `app/`

Contains route entry points.

Responsibilities:

```txt
- route composition
- Suspense boundaries
- client-only route guards when needed
- static export friendly route pages
```

Examples:

```txt
src/app/countries/page.tsx
src/app/country/page.tsx
src/app/compare/page.tsx
src/app/planner/page.tsx
src/app/favorites/page.tsx
src/app/states/page.tsx
```

## `core/`

Infrastructure layer.

```txt
core/api/
core/errors/
core/http/
core/query/
core/router/
core/storage/
```

Responsibilities:

```txt
- provider definitions
- HTTP client
- API clients
- route helpers
- query client config
- query keys
- storage keys
- provider error normalization
```

## `modules/`

Feature layer.

```txt
modules/compare/
modules/countries/
modules/currency/
modules/favorites/
modules/holidays/
modules/home/
modules/notes/
modules/planner/
modules/states/
modules/weather/
```

Each module owns its own:

```txt
- components
- hooks
- mappers
- services
- store
- types
```

Only the pieces needed by the feature are present.

## `shared/`

Reusable layer.

```txt
shared/components/
shared/constants/
shared/hooks/
shared/storybook/
shared/utils/
```

Contains:

```txt
- UI primitives
- layout components
- feedback states
- route skeletons
- Storybook fixtures
- utility functions
```

## API provider strategy

Each provider has an isolated client.

```txt
REST Countries
Open-Meteo
Frankfurter
Nager.Date
```

Provider clients should not leak raw DTOs into UI components.

Flow:

```txt
provider response -> DTO -> mapper -> internal model -> UI
```

## Country data flow

```txt
REST Countries API
	down
rest-countries.client.ts
	down
RestCountryDto
	down
country.mapper.ts
	down
CountrySummary / Country
	down
Countries UI / Country Detail / Compare
```

## Weather data flow

```txt
Open-Meteo API
	down
open-meteo.client.ts
	down
weather mapper
	down
WeatherForecast
	down
WeatherPanel / Compare weather snapshot
```

## Currency data flow

```txt
Frankfurter API
	down
frankfurter.client.ts
	down
currency mapper
	down
CurrencyConversion / CurrencyOption
	down
CurrencyConverterPanel
```

## Holidays data flow

```txt
Nager.Date API
	down
nager-date.client.ts
	down
holidays mapper
	down
PublicHoliday / LongWeekend
	down
HolidaysPanel
```

## Query configuration

TanStack Query is configured centrally.

Important behavior:

```txt
- no refetch on window focus
- refetch on reconnect
- retry only when useful
- no retry for parse errors
- no retry for most 4xx provider errors
- domain-specific stale times
```

## Local state

Zustand is used for local interactive product features.

### Favorites

```txt
Store:
src/modules/favorites/store/favorites.store.ts

Storage key:
globaltrail-favorites-v1
```

Purpose:

```txt
- save destination
- remove destination
- toggle destination
- clear favorites
- check saved status
```

### Planner

```txt
Store:
src/modules/planner/store/planner.store.ts

Storage key:
globaltrail-plans-v1
```

Purpose:

```txt
- create travel plan
- update travel plan
- remove travel plan
- clear plans
- get plan by id
- get plans by destination
```

### Notes

```txt
Store:
src/modules/notes/store/travel-notes.store.ts

Storage key:
globaltrail-notes-v1
```

Purpose:

```txt
- save note by country
- update note
- remove note
- get note by country
```

### Compare

```txt
Store:
src/modules/compare/store/compare.store.ts
```

Purpose:

```txt
- manage left/right compare selection
- sync with URL selection
- swap sides
- clear selection
```

## Client-only guards

Some pages depend on local persisted browser state.

Examples:

```txt
/favorites
/planner
Travel Notes panel inside /country
```

Those sections use a `ClientOnly` guard to avoid hydration mismatch and flicker between server-rendered empty state and client-hydrated persisted state.

## Partial API failures

The app treats provider failures according to criticality.

Critical:

```txt
Country detail country data
```

Non-critical:

```txt
Weather
Currency conversion
Long weekends
Public holidays in some contexts
```

Non-critical failures show product-oriented fallback states and keep the rest of the page usable.

## Static export considerations

Avoid:

```txt
/country/ES
```

Prefer:

```txt
/country?code=ES
```

Avoid:

```txt
server actions
API routes
runtime-only data loading
```

Prefer:

```txt
client-side provider calls
static pages
query params
local storage
```

## Styling system

GlobalTrail uses Tailwind CSS with CSS variables and utility classes.

Important global concepts:

```txt
travel-heading
travel-label
travel-card
travel-panel
micro-card
micro-button
micro-icon-button
travel-shimmer
content-auto
```

Design language:

```txt
Cloud White
Warm Ivory
Mist Blue
Deep Ocean
Sage Green
Sand Beige
Sunset Amber
Soft Terracotta
Slate Gray
Forest Green
```

## Accessibility notes

Implemented accessibility improvements:

```txt
- skip link
- aria-current in navigation
- labelled form controls
- aria-describedby for helper text
- custom date picker ARIA attributes
- alert/status roles
- focus-visible states
- reduced motion handling
```

## Performance notes

Implemented performance improvements:

```txt
- bundle analyzer script
- tuned image sizes
- tuned image quality
- content-visibility utilities
- query stale time tuning
- static export
```

## Validation commands

```bash
pnpm lint
pnpm build
pnpm build-storybook
```

Optional:

```bash
pnpm analyze
```

## Main manual QA routes

```txt
/
/countries
/countries?q=spain
/countries?region=Europe
/country?code=ES
/compare?left=ES&right=JP
/favorites
/planner
/planner?destination=ES
/states
```

## Deployment notes

The app is intended for GitHub Pages.

Expected public URL:

```txt
https://giordanap.github.io/globaltrail/
```

When deployed under a subpath, configure:

```txt
NEXT_PUBLIC_BASE_PATH=/globaltrail
```

The app uses route helpers and `withBasePath` for public assets that need the GitHub Pages base path.
