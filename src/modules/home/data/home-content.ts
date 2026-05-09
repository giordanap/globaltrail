import { withBasePath } from "@/core/router/base-path";

export const insightCards = [
  {
    icon: "◍",
    value: "250+ countries",
    description: "Explore cultural, demographic and regional country signals.",
  },
  {
    icon: "☁",
    value: "Weather outlook",
    description: "Read climate context before comparing your next destination.",
  },
  {
    icon: "▦",
    value: "Local calendars",
    description: "Plan around public holidays and seasonal travel moments.",
  },
] as const;

export const featuredDestinations = [
  {
    country: "Spain",
    region: "Europe",
    description: "Mediterranean cities, cultural calendars and warm seasonal routes.",
    signal: "Culture",
    image: withBasePath("/images/globaltrail/spain.webp"),
  },
  {
    country: "Japan",
    region: "Asia",
    description: "Urban precision, seasonal landscapes and rich local traditions.",
    signal: "Seasonal",
    image: withBasePath("/images/globaltrail/japan.webp"),
  },
  {
    country: "Peru",
    region: "South America",
    description: "Andean routes, coastal cities and diverse regional climates.",
    signal: "Adventure",
    image: withBasePath("/images/globaltrail/peru.webp"),
  },
  {
    country: "Iceland",
    region: "Europe",
    description: "Nordic landscapes, dramatic weather and nature-led itineraries.",
    signal: "Nature",
    image: withBasePath("/images/globaltrail/iceland.webp"),
  },
] as const;

export const howItWorksSteps = [
  {
    icon: "⌕",
    title: "Search & Discover",
    description:
      "Start with a destination and explore the essential country signals in a calm, readable view.",
  },
  {
    icon: "⇄",
    title: "Compare with context",
    description:
      "Evaluate destinations side by side using travel-relevant signals like climate, currency and local calendars.",
  },
  {
    icon: "▦",
    title: "Plan & Save",
    description:
      "Turn destination insights into saved ideas, private notes and lightweight travel plans.",
  },
] as const;

export const heroSignals = [
  "Country insights",
  "Weather outlook",
  "Currency context",
  "Local holidays",
] as const;