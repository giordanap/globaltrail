import { SkeletonBlock } from "@/shared/components/feedback/skeleton-block";
import { Card } from "@/shared/components/ui/card";
import { Container } from "@/shared/components/ui/container";

function DetailPanelSkeleton() {
  return (
    <Card className="p-6">
      <SkeletonBlock className="h-5 w-36 rounded-full" />
      <SkeletonBlock className="mt-6 h-16 rounded-2xl" />
      <SkeletonBlock className="mt-3 h-16 rounded-2xl" />
      <SkeletonBlock className="mt-3 h-16 rounded-2xl" />
      <SkeletonBlock className="mt-3 h-16 rounded-2xl" />
    </Card>
  );
}

function ApiPanelSkeleton() {
  return (
    <Card className="overflow-hidden p-0">
      <div className="p-6">
        <SkeletonBlock className="h-5 w-40 rounded-full" />
        <SkeletonBlock className="mt-5 h-8 w-2/3 rounded-2xl" />
        <SkeletonBlock className="mt-3 h-4 w-4/5 rounded-full" />

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <SkeletonBlock className="h-16 rounded-2xl" />
          <SkeletonBlock className="h-16 rounded-2xl" />
          <SkeletonBlock className="h-16 rounded-2xl" />
        </div>
      </div>

      <div className="border-t border-border p-6">
        <SkeletonBlock className="h-5 w-36 rounded-full" />
        <SkeletonBlock className="mt-5 h-16 rounded-2xl" />
        <SkeletonBlock className="mt-3 h-16 rounded-2xl" />
      </div>
    </Card>
  );
}

export function CountryDetailSkeleton() {
  return (
    <main className="bg-background">
      <section className="py-16 lg:py-20">
        <Container>
          <SkeletonBlock className="mb-8 h-5 w-32 rounded-full" />

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <Card className="overflow-hidden p-0">
              <div className="relative min-h-[22rem] overflow-hidden bg-ink">
                <SkeletonBlock className="h-[22rem] rounded-none" />

                <div className="absolute right-7 top-7">
                  <SkeletonBlock className="size-28 rounded-[1.5rem]" />
                </div>

                <div className="absolute bottom-8 left-8 right-8">
                  <div className="flex flex-wrap gap-3">
                    <SkeletonBlock className="h-9 w-24 rounded-full" />
                    <SkeletonBlock className="h-9 w-16 rounded-full" />
                    <SkeletonBlock className="h-12 w-36 rounded-full" />
                  </div>

                  <SkeletonBlock className="mt-6 h-20 max-w-xl rounded-3xl" />
                  <SkeletonBlock className="mt-4 h-5 max-w-lg rounded-full" />
                </div>
              </div>

              <div className="p-8">
                <div className="grid gap-4 sm:grid-cols-3">
                  <SkeletonBlock className="h-20 rounded-2xl" />
                  <SkeletonBlock className="h-20 rounded-2xl" />
                  <SkeletonBlock className="h-20 rounded-2xl" />
                </div>

                <SkeletonBlock className="mt-8 h-5 w-full rounded-full" />
                <SkeletonBlock className="mt-3 h-5 w-5/6 rounded-full" />
                <SkeletonBlock className="mt-3 h-5 w-3/4 rounded-full" />
              </div>
            </Card>

            <div className="grid gap-5">
              <DetailPanelSkeleton />
              <DetailPanelSkeleton />
              <ApiPanelSkeleton />
              <ApiPanelSkeleton />
              <ApiPanelSkeleton />
              <DetailPanelSkeleton />

              <div className="grid gap-3 sm:grid-cols-2">
                <SkeletonBlock className="h-12 rounded-control" />
                <SkeletonBlock className="h-12 rounded-control" />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}