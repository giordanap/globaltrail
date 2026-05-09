import { routes } from "@/core/router/routes";
import { RoutePlaceholderPage } from "@/shared/components/layout/route-placeholder-page";

export function ComparePage() {
  return (
    <RoutePlaceholderPage
      badge="Compare"
      eyebrow="Side-by-side travel view"
      title="Compare destinations with context, not noise."
      description="Compare two countries across practical travel signals like region, capital, population, climate, currency and holiday timing."
      panelTitle="Destination comparison"
      panelDescription="The comparison view will help evaluate tradeoffs between two possible trips without turning the experience into a dense dashboard."
      icon="⇄"
      highlights={[
        "Left and right destination panels",
        "Shared travel metrics",
        "Weather and currency snapshots",
        "Clear visual differences",
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