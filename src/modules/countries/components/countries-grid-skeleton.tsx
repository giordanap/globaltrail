import { SkeletonBlock } from "@/shared/components/feedback/skeleton-block";
import { Card } from "@/shared/components/ui/card";

export function CountriesGridSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 12 }, (_, index) => (
        <Card key={index} className="overflow-hidden p-0">
          <SkeletonBlock className="h-44 rounded-none" />

          <div className="p-5">
            <SkeletonBlock className="h-6 w-2/3 rounded-full" />
            <SkeletonBlock className="mt-3 h-4 w-1/2 rounded-full" />

            <div className="mt-6 grid grid-cols-3 gap-3">
              <SkeletonBlock className="h-16 rounded-2xl" />
              <SkeletonBlock className="h-16 rounded-2xl" />
              <SkeletonBlock className="h-16 rounded-2xl" />
            </div>

            <SkeletonBlock className="mt-6 h-4 w-full rounded-full" />
            <SkeletonBlock className="mt-3 h-4 w-4/5 rounded-full" />
          </div>
        </Card>
      ))}
    </div>
  );
}