import { Suspense } from "react";
import { ComparePage } from "@/modules/compare/components/compare-page";
import { ComparePageSkeleton } from "@/shared/components/feedback/route-loading-skeletons";

export default function Page() {
  return (
    <Suspense fallback={<ComparePageSkeleton />}>
      <ComparePage />
    </Suspense>
  );
}