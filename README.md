# GlobalTrail

GlobalTrail is a frontend-only travel intelligence dashboard for exploring countries, weather, currencies, holidays, saved destinations and local travel plans.

The project is built as a static Next.js application and deployed through GitHub Pages.

## Project goals

GlobalTrail is designed to demonstrate:

- Clean frontend architecture
- Public API integration
- Multi-provider data composition
- URL-driven navigation state
- Local-first planning features
- Persistent browser state
- Resilient loading, empty and error states
- Responsive travel dashboard UI

## Planned API stack

The application will progressively integrate:

- REST Countries for country data
- Open-Meteo for weather and forecast data
- Frankfurter for currency conversion
- Nager.Date for public holidays

## Planned frontend stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- TanStack Query
- Zustand
- localStorage persistence
- Storybook
- GitHub Pages static deployment

## Local development

Install dependencies:

```bash
pnpm install