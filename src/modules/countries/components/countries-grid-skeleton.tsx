import { SkeletonBlock } from "@/shared/components/feedback/skeleton-block";
import { Card } from "@/shared/components/ui/card";

export function CountriesGridSkeleton() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 12 }, (_, index) => (
        <Card key={index} className="p-5">
          <div className="flex items-start gap-4">
            <SkeletonBlock className="size-12 rounded-2xl" />

            <div className="flex-1">
              <SkeletonBlock className="h-5 w-2/3 rounded-full" />
              <SkeletonBlock className="mt-3 h-4 w-1/2 rounded-full" />
            </div>
          </div>

          <SkeletonBlock className="mt-6 h-4 w-full rounded-full" />
          <SkeletonBlock className="mt-3 h-4 w-4/5 rounded-full" />

          <div className="mt-6 flex gap-3">
            <SkeletonBlock className="h-8 w-20 rounded-full" />
            <SkeletonBlock className="h-8 w-24 rounded-full" />
          </div>
        </Card>
      ))}
    </div>
  );
}