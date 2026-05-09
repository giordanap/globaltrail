import { routes } from "@/core/router/routes";
import { RoutePlaceholderPage } from "@/shared/components/layout/route-placeholder-page";

export function PlannerPage() {
  return (
    <RoutePlaceholderPage
      badge="Planner"
      eyebrow="Travel planning"
      title="Turn destination ideas into lightweight travel plans."
      description="Create local travel plans with destination notes, dates, budgets and travel signals that help you keep trip ideas organized."
      panelTitle="Personal travel board"
      panelDescription="Planner will focus on saved ideas, simple trip structure and calm organization for upcoming journeys."
      icon="▦"
      highlights={[
        "Create travel plans",
        "Add destination notes",
        "Track budget and dates",
        "Keep planning private and simple",
      ]}
      primaryAction={{
        label: "Explore countries",
        href: routes.countries,
      }}
      secondaryAction={{
        label: "Saved destinations",
        href: routes.favorites,
        variant: "secondary",
      }}
    />
  );
}