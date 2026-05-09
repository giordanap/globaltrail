import { routes } from "@/core/router/routes";

export const mainNavigationItems = [
  {
    label: "Home",
    href: routes.home,
  },
  {
    label: "Explore",
    href: routes.countries,
  },
  {
    label: "Compare",
    href: routes.compare,
  },
  {
    label: "Planner",
    href: routes.planner,
  },
  {
    label: "Favorites",
    href: routes.favorites,
  },
] as const;

export const footerNavigationGroups = [
  {
    title: "Explore",
    links: [
      {
        label: "Countries",
        href: routes.countries,
      },
      {
        label: "Country insights",
        href: routes.country,
      },
      {
        label: "Compare destinations",
        href: routes.compare,
      },
    ],
  },
  {
    title: "Planning",
    links: [
      {
        label: "Travel planner",
        href: routes.planner,
      },
      {
        label: "Saved destinations",
        href: routes.favorites,
      },
      {
        label: "Experience states",
        href: routes.states,
      },
    ],
  },
  {
    title: "Signals",
    links: [
      {
        label: "Weather",
        href: routes.country,
      },
      {
        label: "Currency",
        href: routes.country,
      },
      {
        label: "Holidays",
        href: routes.country,
      },
    ],
  },
] as const;