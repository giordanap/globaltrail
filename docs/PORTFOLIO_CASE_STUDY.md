# GlobalTrail Portfolio Case Study

## Overview

GlobalTrail is a travel intelligence dashboard built as a frontend portfolio project. It combines country data, weather, currency conversion, holidays, favorites, notes, destination comparison and local travel planning into a calm travel product experience.

The project is frontend-only, but it was designed with production-style frontend decisions:

```txt
- external API integration
- normalized domain models
- state persistence
- URL-driven navigation state
- resilient error handling
- responsive UI
- accessibility and performance passes
- component documentation with Storybook
```

## Product problem

Travel research is usually fragmented. A person may need to open several sources to answer basic questions:

```txt
- What country am I looking at?
- What is the capital?
- What currency is used?
- What is the weather like?
- Are there holidays or long weekends?
- Which destinations am I considering?
- How do two countries compare?
- What notes do I want to keep for later?
```

GlobalTrail turns those scattered signals into a single flow:

```txt
discover -> inspect -> save -> compare -> plan
```

## Product goals

```txt
- Make country exploration feel calm and visual.
- Compose multiple external providers into one product experience.
- Keep user decisions local and lightweight.
- Demonstrate frontend engineering beyond static UI.
- Use a real architecture that could grow into a larger product.
```

## User flows

### 1. Explore countries

Users can open `/countries`, search by country name, filter by region and sort by name or population.

The state is stored in the URL, which means the page can be refreshed or shared without losing search context.

Example:

```txt
/countries?q=spain
/countries?region=Europe
/countries?q=united&region=Europe&sort=population&dir=desc
```

### 2. Inspect a destination

Users can open a country detail page:

```txt
/country?code=ES
```

The page shows the country profile and supporting travel signals:

```txt
- weather
- currency conversion
- public holidays
- long weekends
- notes
- planner action
- comparison action
```

### 3. Save destinations

Users can save countries from Explore or Country Detail. Favorites are stored locally and appear in `/favorites`.

The favorites page includes:

```txt
- saved destination cards
- summary cards
- empty state
- clear favorites
- detail, compare and planner actions
```

### 4. Compare countries

Users can compare two destinations with URL params:

```txt
/compare?left=ES&right=JP
```

The comparison page loads both countries and displays:

```txt
- country panels
- weather snapshots
- capital
- region
- population
- currency
- languages
- area
- timezones
- travel context
```

### 5. Build travel plans

Users can create local travel plans in `/planner`.

Plans include:

```txt
- title
- destination code
- destination name
- status
- date range
- budget
- notes
```

The planner can be prefilled from another flow:

```txt
/planner?destination=ES
```

### 6. Save country notes

Users can save a private travel note per country inside Country Detail.

This makes the product feel more personal without requiring authentication or backend storage.

## Technical decisions

### Query params instead of dynamic route segments

Because the app is designed for static export and GitHub Pages, data-driven screens use query params.

```txt
/country?code=ES
/compare?left=ES&right=JP
/planner?destination=ES
```

This avoids depending on server runtime behavior.

### Normalized models

External APIs are not consumed directly in UI components.

Instead, API DTOs are mapped into internal models such as:

```txt
CountrySummary
Country
WeatherForecast
CurrencyConversion
PublicHoliday
LongWeekend
FavoriteDestination
TravelPlan
CountryTravelNote
```

This keeps UI code stable even if provider response shapes change.

### TanStack Query for remote state

TanStack Query manages provider data:

```txt
- countries
- country detail
- weather
- currency
- holidays
```

Benefits:

```txt
- caching
- retry control
- stale time configuration
- refetch states
- partial failure handling
```

### Zustand for local product state

Zustand manages local user-owned state:

```txt
- favorites
- planner
- notes
- compare selection
```

Persisted keys:

```txt
globaltrail-favorites-v1
globaltrail-plans-v1
globaltrail-notes-v1
```

### Partial failure strategy

The destination page should not break if one supporting provider fails.

Example:

```txt
REST Countries fails -> country detail cannot render.
Open-Meteo fails -> show country detail and a weather unavailable panel.
Frankfurter fails -> show country detail and a conversion unavailable panel.
Nager.Date long weekends fail -> show holidays and mark long weekends unavailable.
```

This creates a more resilient product experience.

## UI design direction

GlobalTrail follows a calm travel intelligence style:

```txt
- spacious layouts
- premium cards
- soft colors
- large editorial headings
- destination postcard visuals
- clear status states
- non-alarming error language
```

Visual tone:

```txt
Calm Travel Intelligence / Atlas Dashboard / light premium UI
```

## Accessibility work

The project includes an accessibility pass:

```txt
- skip link
- active navigation with aria-current
- labelled inputs and selects
- aria-describedby for helper text
- improved custom date picker semantics
- alert/status roles for partial API states
- focus-visible styles
- reduced motion support
```

## Performance work

The project includes a performance pass:

```txt
- bundle analyzer script
- tuned image sizes and quality
- content-visibility utilities
- below-the-fold rendering optimizations
- longer cache windows for secondary signals
- static export compatibility
```

## Storybook coverage

Storybook documents UI primitives and travel components.

Covered areas:

```txt
- Button
- Badge
- Card
- Empty/Error/Partial states
- Loading skeletons
- CountryCard
- FavoriteDestinationCard
- TravelPlanCard
- CompareMetricRow
- CompareCountryPanel
- StatePreviewCard
```

## Why this is valuable as a portfolio project

GlobalTrail demonstrates more than styling. It shows the ability to build a complete frontend product with real engineering decisions:

```txt
- API composition
- error boundaries at feature level
- state management
- local persistence
- route state
- reusable UI system
- responsive product screens
- accessibility improvements
- performance awareness
- documentation and Storybook
```

## Possible future improvements

```txt
- Add tests for mappers and route helpers
- Add Playwright smoke tests for main flows
- Add keyboard navigation improvements for the custom date picker
- Add country autocomplete in planner
- Add richer compare scoring
- Add export/import of local planner data
- Add screenshots to README
- Add CI checks for Storybook build
```
