import { Suspense } from "react";
import { PlannerPage } from "@/modules/planner/components/planner-page";
import { ClientOnly } from "@/shared/components/client/client-only";
import { PlannerPageSkeleton } from "@/shared/components/feedback/route-loading-skeletons";

export default function Page() {
  return (
    <Suspense fallback={<PlannerPageSkeleton />}>
      <ClientOnly fallback={<PlannerPageSkeleton />}>
        <PlannerPage />
      </ClientOnly>
    </Suspense>
  );
}