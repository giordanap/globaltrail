import { routes } from "@/core/router/routes";
import { RoutePlaceholderPage } from "@/shared/components/layout/route-placeholder-page";

export function FavoritesPage() {
  return (
    <RoutePlaceholderPage
      badge="Favorites"
      eyebrow="Saved destinations"
      title="Keep your best destination ideas close."
      description="Saved destinations will collect the countries you want to revisit, compare or turn into travel plans later."
      panelTitle="Destination shortlist"
      panelDescription="Favorites will feel like a curated travel shelf, with postcard-style cards and quick actions."
      icon="♡"
      highlights={[
        "Save destination cards",
        "Remove destinations easily",
        "Send destinations to planner",
        "Return to country insights",
      ]}
      primaryAction={{
        label: "Explore countries",
        href: routes.countries,
      }}
      secondaryAction={{
        label: "Open planner",
        href: routes.planner,
        variant: "secondary",
      }}
    />
  );
}