import { SkeletonBlock } from "@/shared/components/feedback/skeleton-block";
import { Card } from "@/shared/components/ui/card";
import { Container } from "@/shared/components/ui/container";

function PageHeaderSkeleton() {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl">
        <SkeletonBlock className="h-5 w-40 rounded-full" />
        <SkeletonBlock className="mt-5 h-14 max-w-2xl rounded-2xl" />
        <SkeletonBlock className="mt-4 h-5 max-w-xl rounded-full" />
        <SkeletonBlock className="mt-3 h-5 max-w-lg rounded-full" />
      </div>

      <SkeletonBlock className="h-10 w-36 rounded-full" />
    </div>
  );
}

function StatCardsSkeleton() {
  return (
    <div className="mt-10 grid gap-5 md:grid-cols-3">
      {Array.from({ length: 3 }, (_, index) => (
        <Card key={index} className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="w-full">
              <SkeletonBlock className="h-4 w-24 rounded-full" />
              <SkeletonBlock className="mt-4 h-10 w-20 rounded-2xl" />
            </div>

            <SkeletonBlock className="size-11 rounded-2xl" />
          </div>

          <SkeletonBlock className="mt-5 h-4 w-full rounded-full" />
          <SkeletonBlock className="mt-3 h-4 w-4/5 rounded-full" />
        </Card>
      ))}
    </div>
  );
}

function DestinationPostcardSkeleton() {
  return (
    <Card className="overflow-hidden p-0">
      <SkeletonBlock className="h-52 rounded-none" />

      <div className="p-5">
        <div className="grid grid-cols-3 gap-3">
          <SkeletonBlock className="h-16 rounded-2xl" />
          <SkeletonBlock className="h-16 rounded-2xl" />
          <SkeletonBlock className="h-16 rounded-2xl" />
        </div>

        <SkeletonBlock className="mt-5 h-20 rounded-2xl" />

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <SkeletonBlock className="h-11 rounded-control" />
          <SkeletonBlock className="h-11 rounded-control" />
        </div>
      </div>
    </Card>
  );
}

function ActionBarSkeleton() {
  return (
    <Card className="mt-8 p-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <SkeletonBlock className="h-6 w-36 rounded-full" />
          <SkeletonBlock className="mt-5 h-8 max-w-xl rounded-2xl" />
          <SkeletonBlock className="mt-4 h-4 max-w-2xl rounded-full" />
          <SkeletonBlock className="mt-3 h-4 max-w-lg rounded-full" />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <SkeletonBlock className="h-12 w-36 rounded-control" />
          <SkeletonBlock className="h-12 w-36 rounded-control" />
        </div>
      </div>
    </Card>
  );
}

export function CountriesPageSkeleton() {
  return (
    <main className="bg-background">
      <section className="py-16 lg:py-20">
        <Container>
          <PageHeaderSkeleton />

          <div className="mt-10 grid gap-8 lg:grid-cols-[280px_1fr]">
            <Card className="hidden p-6 lg:block">
              <SkeletonBlock className="h-6 w-32 rounded-full" />

              <div className="mt-8 grid gap-4">
                <SkeletonBlock className="h-12 rounded-control" />
                <SkeletonBlock className="h-12 rounded-control" />
                <SkeletonBlock className="h-12 rounded-control" />
                <SkeletonBlock className="h-12 rounded-control" />
              </div>
            </Card>

            <div>
              <Card className="mb-6 p-5">
                <div className="grid gap-4 md:grid-cols-[1fr_180px]">
                  <SkeletonBlock className="h-12 rounded-control" />
                  <SkeletonBlock className="h-12 rounded-control" />
                </div>
              </Card>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 9 }, (_, index) => (
                  <DestinationPostcardSkeleton key={index} />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

export function FavoritesPageSkeleton() {
  return (
    <main className="bg-background">
      <section className="relative overflow-hidden py-16 lg:py-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top_left,_rgba(219,234,242,0.72),_transparent_32rem),radial-gradient(circle_at_top_right,_rgba(239,227,207,0.48),_transparent_26rem)]" />

        <Container className="relative">
          <PageHeaderSkeleton />
          <StatCardsSkeleton />
          <ActionBarSkeleton />

          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => (
              <DestinationPostcardSkeleton key={index} />
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}

export function PlannerPageSkeleton() {
  return (
    <main className="bg-background">
      <section className="relative overflow-hidden py-16 lg:py-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top_left,_rgba(223,238,230,0.62),_transparent_30rem),radial-gradient(circle_at_top_right,_rgba(239,227,207,0.5),_transparent_28rem)]" />

        <Container className="relative">
          <PageHeaderSkeleton />
          <StatCardsSkeleton />

          <div className="mt-8 grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-6">
              <Card className="p-6">
                <SkeletonBlock className="h-5 w-36 rounded-full" />
                <SkeletonBlock className="mt-5 h-8 max-w-sm rounded-2xl" />
                <SkeletonBlock className="mt-4 h-4 max-w-md rounded-full" />

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {Array.from({ length: 8 }, (_, index) => (
                    <SkeletonBlock
                      key={index}
                      className="h-16 rounded-control"
                    />
                  ))}
                </div>

                <SkeletonBlock className="mt-4 h-32 rounded-control" />

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <SkeletonBlock className="h-12 w-32 rounded-control" />
                  <SkeletonBlock className="h-12 w-28 rounded-control" />
                </div>
              </Card>

              <Card className="p-6">
                <SkeletonBlock className="h-6 w-32 rounded-full" />
                <SkeletonBlock className="mt-5 h-8 max-w-sm rounded-2xl" />
                <div className="mt-5 grid gap-3">
                  <SkeletonBlock className="h-20 rounded-2xl" />
                  <SkeletonBlock className="h-20 rounded-2xl" />
                  <SkeletonBlock className="h-20 rounded-2xl" />
                </div>
              </Card>
            </div>

            <div>
              <ActionBarSkeleton />

              <div className="mt-6 grid gap-5 lg:grid-cols-2">
                {Array.from({ length: 4 }, (_, index) => (
                  <Card key={index} className="overflow-hidden p-0">
                    <div className="bg-surface-warm p-5">
                      <SkeletonBlock className="h-6 w-24 rounded-full" />
                      <SkeletonBlock className="mt-5 h-8 w-3/4 rounded-2xl" />
                      <SkeletonBlock className="mt-3 h-4 w-1/2 rounded-full" />
                    </div>

                    <div className="p-5">
                      <div className="grid grid-cols-2 gap-3">
                        <SkeletonBlock className="h-16 rounded-2xl" />
                        <SkeletonBlock className="h-16 rounded-2xl" />
                      </div>

                      <SkeletonBlock className="mt-5 h-20 rounded-2xl" />

                      <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        <SkeletonBlock className="h-12 rounded-control" />
                        <SkeletonBlock className="h-12 rounded-control" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

export function ComparePageSkeleton() {
  return (
    <main className="bg-background">
      <section className="relative overflow-hidden py-16 lg:py-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top_left,_rgba(219,234,242,0.7),_transparent_30rem),radial-gradient(circle_at_top_right,_rgba(239,227,207,0.48),_transparent_28rem)]" />

        <Container className="relative">
          <PageHeaderSkeleton />
          <StatCardsSkeleton />
          <ActionBarSkeleton />

          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
            <DestinationPostcardSkeleton />

            <div className="hidden items-center justify-center lg:flex">
              <SkeletonBlock className="size-14 rounded-full" />
            </div>

            <DestinationPostcardSkeleton />
          </div>

          <Card className="mt-8 p-6">
            <SkeletonBlock className="h-6 w-40 rounded-full" />
            <SkeletonBlock className="mt-5 h-8 max-w-md rounded-2xl" />
            <SkeletonBlock className="mt-4 h-4 max-w-2xl rounded-full" />

            <div className="mt-6 grid gap-3">
              {Array.from({ length: 7 }, (_, index) => (
                <div
                  key={index}
                  className="grid gap-3 rounded-2xl border border-border bg-surface p-4 md:grid-cols-[0.8fr_1fr_1fr]"
                >
                  <SkeletonBlock className="h-12 rounded-2xl" />
                  <SkeletonBlock className="h-12 rounded-2xl" />
                  <SkeletonBlock className="h-12 rounded-2xl" />
                </div>
              ))}
            </div>
          </Card>
        </Container>
      </section>
    </main>
  );
}