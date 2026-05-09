import { routes } from "@/core/router/routes";
import { RoutePlaceholderPage } from "@/shared/components/layout/route-placeholder-page";

export function CountriesPage() {
  return (
    <RoutePlaceholderPage
      badge="Explore"
      eyebrow="Country discovery"
      title="Explore countries with calm, useful travel context."
      description="Browse destinations through country facts, regional signals and travel-ready details before opening a deeper destination view."
      panelTitle="Destination explorer"
      panelDescription="This space will become the main discovery area for country cards, search, filters and sorting."
      icon="⌕"
      highlights={[
        "Search by destination name",
        "Filter by region and travel signal",
        "Open country insights",
        "Save destinations for later planning",
      ]}
      primaryAction={{
        label: "Back to home",
        href: routes.home,
      }}
      secondaryAction={{
        label: "Compare destinations",
        href: routes.compare,
        variant: "secondary",
      }}
    />
  );
}