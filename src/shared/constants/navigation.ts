export const mainNavigationItems = [
  {
    label: "Home",
    href: "#top",
    isActive: true,
  },
  {
    label: "Explore",
    href: "#destinations",
    isActive: false,
  },
  {
    label: "Compare",
    href: "#compare",
    isActive: false,
  },
] as const;

export const upcomingNavigationItems = [
  {
    label: "Planner",
    description: "Travel plans",
  },
  {
    label: "Favorites",
    description: "Saved destinations",
  },
] as const;

export const footerNavigationGroups = [
  {
    title: "Explore",
    links: [
      {
        label: "Featured destinations",
        href: "#destinations",
      },
      {
        label: "Compare destinations",
        href: "#compare",
      },
      {
        label: "Back to top",
        href: "#top",
      },
    ],
  },
  {
    title: "Signals",
    links: [
      {
        label: "Country insights",
      },
      {
        label: "Weather",
      },
      {
        label: "Currency",
      },
      {
        label: "Holidays",
      },
    ],
  },
  {
    title: "Planning",
    links: [
      {
        label: "Travel planner",
      },
      {
        label: "Saved destinations",
      },
      {
        label: "Local notes",
      },
    ],
  },
] as const;