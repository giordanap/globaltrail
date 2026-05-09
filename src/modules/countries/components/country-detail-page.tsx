import { routes } from "@/core/router/routes";
import { RoutePlaceholderPage } from "@/shared/components/layout/route-placeholder-page";

export function CountryDetailPage() {
  return (
    <RoutePlaceholderPage
      badge="Country insights"
      eyebrow="Destination detail"
      title="A focused view for one destination."
      description="Country insights will bring together location facts, weather context, local currency and public holidays in one readable travel view."
      panelTitle="Insight layers"
      panelDescription="Each destination will show a clear summary first, then deeper travel signals as the experience grows."
      icon="◍"
      highlights={[
        "Country facts and capital",
        "Weather overview",
        "Currency context",
        "Local holidays and notes",
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