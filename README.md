# GlobalTrail

GlobalTrail is a travel intelligence dashboard built as a frontend portfolio project. It helps users explore countries, review practical travel signals, compare destinations, save favorites and create local travel plans.

The application is built with Next.js App Router, TypeScript, Tailwind CSS, TanStack Query, Zustand and Storybook. It is designed as a static export and can be deployed through GitHub Pages.

```txt
Live URL:
https://giordanap.github.io/globaltrail/

Repository:
https://github.com/giordanap/globaltrail
```

## Product concept

GlobalTrail follows this product flow:

```txt
country discovery -> country insight -> weather -> currency -> holidays -> favorites -> planner -> comparison
```

The goal is to make travel research feel calm, visual and useful while demonstrating real frontend engineering skills.

## What this project demonstrates

```txt
- Modern frontend architecture with Next.js App Router
- TypeScript-first feature-based organization
- Multi-provider API composition
- External data normalization through DTOs and mappers
- TanStack Query data fetching and cache strategy
- URL-driven state for search, filters, details and comparison
- Zustand persisted state for favorites, planner and travel notes
- Client-side guards for local state hydration
- Resilient loading, empty and partial failure states
- Static export compatibility for GitHub Pages
- Storybook documentation for UI and travel components
- Responsive mobile-first UI
- Accessibility, performance and visual polish passes
```

## Core features

### Country explorer

The country explorer lets users search, filter and sort destinations.

```txt
Route:
/countries

Examples:
/countries?q=spain
/countries?region=Europe
/countries?sort=population&dir=desc
/countries?q=united&region=Europe&sort=population&dir=desc
```

Implemented capabilities:

```txt
- Country list loaded from REST Countries
- Search by country name
- Region filter
- Sort by name or population
- URL-persisted explorer state
- Recent searches stored locally
- Responsive cards and mobile-friendly filters
- Favorite and compare actions from each card
```

### Country detail

Country detail shows a full destination insight page.

```txt
Route:
/country?code=ES
```

Implemented capabilities:

```txt
- Country profile
- Flag, official name, capital, population, area and geography
- Weather panel from Open-Meteo
- Currency converter from Frankfurter
- Public holidays and long weekends from Nager.Date
- Favorite toggle
- Add to planner
- Compare destination
- Local travel notes
- Partial failure handling for secondary API panels
```

### Compare destinations

The comparison page loads two countries from URL params and displays a side-by-side view.

```txt
Route:
/compare

Examples:
/compare?left=ES
/compare?right=JP
/compare?left=ES&right=JP
```

Implemented capabilities:

```txt
- URL-driven left/right country selection
- Country panels for each side
- Weather snapshot per destination
- Side-by-side metric rows
- Swap sides
- Clear comparison
- Remove individual side
- Open country detail from comparison
- Add compared destination to planner
```

### Favorites

Favorites are stored locally on the user device.

```txt
Route:
/favorites
```

Implemented capabilities:

```txt
- Persisted favorites with Zustand
- Save/remove destinations from Explore and Country Detail
- Postcard-style saved destination cards
- Summary cards
- Empty state
- Clear all favorites
- Actions to view detail, compare or add to planner
```

### Planner

Planner stores lightweight local travel plans.

```txt
Route:
/planner

Examples:
/planner?destination=ES
/planner?plan=PLAN_ID
```

Implemented capabilities:

```txt
- Persisted local travel plans with Zustand
- Create plans
- Edit plans
- Remove plans
- Clear plans
- Destination prefill from URL
- Custom date picker
- Notes, budget, dates and planning status
- Links back to country detail and comparison
```

### Travel notes

Travel notes are saved per country.

```txt
Example:
/country?code=ES
```

Implemented capabilities:

```txt
- Save a private note for a country
- Update note
- Remove note
- Persist notes locally
- Independent notes per country code
- Client-side guard while local state prepares
```

### States gallery

The states gallery documents the product states used across the app.

```txt
Route:
/states
```

Implemented states:

```txt
- Loading skeletons
- Empty states
- No results states
- Partial API failure states
- Unavailable states
- Client-side preparation states
```

## External APIs

GlobalTrail composes data from multiple public APIs.

| Provider       | Purpose                                                             |
| -------------- | ------------------------------------------------------------------- |
| REST Countries | Country data, flags, population, currencies, languages, coordinates |
| Open-Meteo     | Current weather and forecast                                        |
| Frankfurter    | Currency list and currency conversion                               |
| Nager.Date     | Public holidays and long weekends                                   |

The app normalizes external API responses into internal models before rendering UI. This keeps components independent from provider-specific DTOs.

## Tech stack

```txt
Next.js App Router
React
TypeScript
Tailwind CSS
TanStack Query
Zustand
Storybook
GitHub Pages
Static export
```

## Architecture

The project uses a feature-based architecture.

```txt
src/
	app/
		layout.tsx
		page.tsx
		countries/page.tsx
		country/page.tsx
		compare/page.tsx
		planner/page.tsx
		favorites/page.tsx
		states/page.tsx

	core/
		api/
		errors/
		http/
		query/
		router/
		storage/

	modules/
		compare/
		countries/
		currency/
		favorites/
		holidays/
		home/
		notes/
		planner/
		states/
		weather/

	shared/
		components/
		constants/
		hooks/
		storybook/
		utils/
```

### Folder responsibilities

| Folder     | Responsibility                                                                    |
| ---------- | --------------------------------------------------------------------------------- |
| `app/`     | Next.js routes and route-level wrappers                                           |
| `core/`    | Infrastructure, API clients, HTTP client, query config, routes, storage keys      |
| `modules/` | Product features and business-specific UI                                         |
| `shared/`  | Reusable UI primitives, layout, feedback states, utilities and Storybook fixtures |

## Data and state strategy

### Server/API state

TanStack Query is used for remote provider data.

```txt
- Countries list
- Country detail
- Weather forecast
- Currency conversion
- Public holidays
- Long weekends
```

Query behavior includes:

```txt
- stale times per domain
- retry rules for provider errors
- no refetch on window focus
- refetch on reconnect
- partial failure handling per secondary panel
```

### Local persisted state

Zustand is used for local-first product features.

```txt
globaltrail-favorites-v1
globaltrail-plans-v1
globaltrail-notes-v1
```

Local persisted features:

```txt
- Favorites
- Planner
- Country travel notes
```

## Static export and GitHub Pages

GlobalTrail is designed for static export.

Important choices:

```txt
- No server-only routes
- No API routes
- No dynamic route segments for country detail
- Query params are used for data-driven screens
```

Examples:

```txt
/country?code=ES
/compare?left=ES&right=JP
/planner?destination=ES
```

## Scripts

Install dependencies:

```bash
pnpm install
```

Run local development:

```bash
pnpm dev
```

Run lint:

```bash
pnpm lint
```

Build static app:

```bash
pnpm build
```

Run Storybook:

```bash
pnpm storybook
```

Build Storybook:

```bash
pnpm build-storybook
```

Run full release validation:

```bash
pnpm release:check
```

Analyze bundle:

```bash
pnpm analyze
```

## Release

Current release:

```txt
GlobalTrail v1.0.0
```

Release validation:

```bash
pnpm release:check
```

Deployment documentation:

```txt
docs/DEPLOYMENT.md
docs/RELEASE_CHECKLIST.md
docs/RELEASE_NOTES_v1.0.0.md
```

GitHub Pages deployment is handled by:

```txt
.github/workflows/pages.yml
```

## Validation checklist

Before opening a PR:

```bash
pnpm lint
pnpm build
pnpm build-storybook
```

Recommended route checks:

```txt
/
/countries
/countries?q=spain
/country?code=ES
/compare?left=ES&right=JP
/favorites
/planner
/planner?destination=ES
/states
```

## Storybook

Storybook documents the visual system and travel components.

Current story coverage includes:

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

## Quality passes completed

```txt
- Design tokens
- Shared UI primitives
- App shell
- Country explorer
- Country detail
- Weather integration
- Currency integration
- Holidays integration
- Favorites persistence
- Planner persistence
- Travel planner page
- Compare store and URL selection
- Compare destinations page
- Country travel notes
- Client-side guards
- Partial API failure states
- Loading skeletons
- States gallery
- Responsive mobile pass
- Storybook foundation
- Storybook travel stories
- Visual polish and microinteractions
- Accessibility pass
- Performance pass
```

## Portfolio summary

GlobalTrail is intended to show that a frontend-only portfolio project can still demonstrate production-style frontend decisions:

```txt
- clear architecture
- normalized API data
- resilient UI states
- persistent local product features
- URL-driven state
- mobile responsiveness
- accessibility considerations
- performance awareness
- component documentation
```

For a more detailed portfolio explanation, see:

```txt
docs/PORTFOLIO_CASE_STUDY.md
docs/TECHNICAL_OVERVIEW.md
```

For release operations and deployment details, see:

```txt
docs/DEPLOYMENT.md
docs/RELEASE_CHECKLIST.md
docs/RELEASE_NOTES_v1.0.0.md
```