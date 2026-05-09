import { SkeletonBlock } from "@/shared/components/feedback/skeleton-block";
import { Card } from "@/shared/components/ui/card";
import { Container } from "@/shared/components/ui/container";

export function CountryDetailSkeleton() {
  return (
    <main className="bg-background">
      <section className="py-16 lg:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <Card className="overflow-hidden p-0">
              <SkeletonBlock className="h-72 rounded-none" />
              <div className="p-8">
                <SkeletonBlock className="h-8 w-2/3 rounded-full" />
                <SkeletonBlock className="mt-4 h-5 w-1/2 rounded-full" />
                <SkeletonBlock className="mt-8 h-4 w-full rounded-full" />
                <SkeletonBlock className="mt-3 h-4 w-5/6 rounded-full" />
              </div>
            </Card>

            <div className="grid gap-5">
              <Card className="p-6">
                <SkeletonBlock className="h-6 w-32 rounded-full" />
                <SkeletonBlock className="mt-6 h-16 rounded-2xl" />
                <SkeletonBlock className="mt-3 h-16 rounded-2xl" />
                <SkeletonBlock className="mt-3 h-16 rounded-2xl" />
              </Card>

              <Card className="p-6">
                <SkeletonBlock className="h-6 w-40 rounded-full" />
                <SkeletonBlock className="mt-6 h-24 rounded-2xl" />
              </Card>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}