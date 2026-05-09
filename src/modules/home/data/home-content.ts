import { withBasePath } from "@/core/router/base-path";

export const insightCards = [
  {
    icon: "◍",
    value: "250+ countries",
    description: "Deep cultural and demographic data",
  },
  {
    icon: "☁",
    value: "Weather forecast",
    description: "Real-time Open-Meteo updates",
  },
  {
    icon: "▦",
    value: "Local holidays",
    description: "Sync with local cultural calendars",
  },
] as const;

export const featuredDestinations = [
  {
    country: "Spain",
    region: "Europe",
    image: withBasePath("/images/globaltrail/spain.webp"),
  },
  {
    country: "Japan",
    region: "Asia",
    image: withBasePath("/images/globaltrail/japan.webp"),
  },
  {
    country: "Peru",
    region: "South America",
    image: withBasePath("/images/globaltrail/peru.webp"),
  },
  {
    country: "Iceland",
    region: "Europe",
    image: withBasePath("/images/globaltrail/iceland.webp"),
  },
] as const;

export const howItWorksSteps = [
  {
    icon: "⌕",
    title: "Search & Discover",
    description:
      "Enter any country or city name to retrieve comprehensive localized data instantly.",
  },
  {
    icon: "⇄",
    title: "Side-by-side Compare",
    description:
      "Juxtapose two destinations to evaluate costs, climates and upcoming public events.",
  },
  {
    icon: "▦",
    title: "Plan & Save",
    description:
      "Save your findings to local storage for a completely private, persistent trip planner.",
  },
] as const;