import { Suspense } from "react";
import { PlannerPage } from "@/modules/planner/components/planner-page";
import { ClientOnly } from "@/shared/components/client/client-only";
import { ClientStateFallback } from "@/shared/components/feedback/client-state-fallback";

function PlannerPageFallback() {
  return (
    <ClientStateFallback
      eyebrow="Travel planner"
      icon="▦"
      title="Preparing your travel board."
      description="Your plans, destination ideas and saved trip context will appear here once the page is ready."
    />
  );
}

export default function Page() {
  return (
    <Suspense fallback={<PlannerPageFallback />}>
      <ClientOnly fallback={<PlannerPageFallback />}>
        <PlannerPage />
      </ClientOnly>
    </Suspense>
  );
}