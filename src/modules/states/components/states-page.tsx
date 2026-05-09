import { routes } from "@/core/router/routes";
import { RoutePlaceholderPage } from "@/shared/components/layout/route-placeholder-page";

export function StatesPage() {
  return (
    <RoutePlaceholderPage
      badge="Experience states"
      eyebrow="Travel interface quality"
      title="Designed states for calm travel decisions."
      description="This area will collect empty, loading, unavailable and no-results moments so GlobalTrail stays useful even when data is incomplete."
      panelTitle="Resilient travel experience"
      panelDescription="Travel data can be incomplete, delayed or unavailable. These states keep the interface clear and helpful."
      icon="◇"
      highlights={[
        "No saved destinations",
        "No search results",
        "Weather unavailable",
        "Loading destination cards",
      ]}
      primaryAction={{
        label: "Explore countries",
        href: routes.countries,
      }}
      secondaryAction={{
        label: "Back to home",
        href: routes.home,
        variant: "secondary",
      }}
    />
  );
}