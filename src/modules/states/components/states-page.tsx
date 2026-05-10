import Link from "next/link";
import { routes } from "@/core/router/routes";
import { StatePreviewCard } from "@/modules/states/components/state-preview-card";
import { ClientStatePanelFallback } from "@/shared/components/feedback/client-state-fallback";
import { EmptyState } from "@/shared/components/feedback/empty-state";
import { ErrorState } from "@/shared/components/feedback/error-state";
import { PartialApiState } from "@/shared/components/feedback/partial-api-state";
import { SkeletonBlock } from "@/shared/components/feedback/skeleton-block";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { Container } from "@/shared/components/ui/container";
import { SectionHeader } from "@/shared/components/ui/section-header";

function MiniDestinationSkeleton() {
  return (
    <Card className="overflow-hidden p-0">
      <SkeletonBlock className="h-36 rounded-none" />

      <div className="p-4">
        <SkeletonBlock className="h-5 w-2/3 rounded-full" />
        <SkeletonBlock className="mt-3 h-4 w-1/2 rounded-full" />

        <div className="mt-5 grid grid-cols-3 gap-2">
          <SkeletonBlock className="h-14 rounded-2xl" />
          <SkeletonBlock className="h-14 rounded-2xl" />
          <SkeletonBlock className="h-14 rounded-2xl" />
        </div>

        <SkeletonBlock className="mt-5 h-4 w-full rounded-full" />
        <SkeletonBlock className="mt-3 h-4 w-4/5 rounded-full" />
      </div>
    </Card>
  );
}

function MiniMetricSkeleton() {
  return (
    <div className="grid gap-3 rounded-2xl border border-border bg-surface p-4 md:grid-cols-[0.8fr_1fr_1fr]">
      <SkeletonBlock className="h-12 rounded-2xl" />
      <SkeletonBlock className="h-12 rounded-2xl" />
      <SkeletonBlock className="h-12 rounded-2xl" />
    </div>
  );
}

function CompactEmptyPreview() {
  return (
    <EmptyState
      icon="♡"
      title="No saved destinations yet."
      description="Explore countries and save the places you want to revisit, compare or plan around later."
      action={
        <Link
          href={routes.countries}
          className="inline-flex min-h-11 items-center justify-center rounded-control bg-ink px-5 text-sm font-extrabold !text-white shadow-sm transition hover:bg-ink-soft"
        >
          Explore countries
        </Link>
      }
    />
  );
}

function CompactErrorPreview() {
  return (
    <ErrorState
      title="We could not load this destination."
      description="This destination view is temporarily unavailable. Try again to refresh the travel context."
      action={<Button>Try again</Button>}
    />
  );
}

function CompactNoResultsPreview() {
  return (
    <EmptyState
      icon="⌕"
      title="No countries found."
      description="No destinations match the current search and region filters. Try another country name or reset the filters."
      action={<Button variant="secondary">Reset filters</Button>}
    />
  );
}

function CompactWeatherUnavailablePreview() {
  return (
    <PartialApiState
      eyebrow="Weather unavailable"
      title="We could not load the weather outlook."
      description="The destination profile remains available while this travel signal is temporarily unavailable."
      icon="☁"
      tone="error"
    />
  );
}

function CompactSoftUnavailablePreview() {
  return (
    <PartialApiState
      eyebrow="Calendar signal"
      title="No long weekends were found."
      description="The destination calendar loaded correctly, but no long weekend suggestions are available for this year."
      icon="○"
      tone="soft"
    />
  );
}

function ClientPreparationPreview() {
  return (
    <ClientStatePanelFallback
      eyebrow="Travel note"
      icon="✎"
      title="Preparing notes for this destination."
      description="Your destination notes will appear here once the panel is ready."
    />
  );
}

function CompareMetricsLoadingPreview() {
  return (
    <Card className="p-5">
      <div className="flex flex-col gap-3">
        <SkeletonBlock className="h-6 w-40 rounded-full" />
        <SkeletonBlock className="h-8 max-w-md rounded-2xl" />
        <SkeletonBlock className="h-4 max-w-xl rounded-full" />
      </div>

      <div className="mt-6 grid gap-3">
        <MiniMetricSkeleton />
        <MiniMetricSkeleton />
        <MiniMetricSkeleton />
      </div>
    </Card>
  );
}

export function StatesPage() {
  return (
    <main className="bg-background">
      <section className="relative overflow-hidden py-16 lg:py-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top_left,_rgba(219,234,242,0.72),_transparent_32rem),radial-gradient(circle_at_top_right,_rgba(239,227,207,0.48),_transparent_26rem)]" />

        <Container className="relative">
          <SectionHeader
            eyebrow="Experience states"
            title="A gallery for calm travel moments."
            description="GlobalTrail keeps travel decisions clear across loading, empty, unavailable and preparation moments."
            action={<Badge variant="ocean">Interface quality</Badge>}
          />

          <div className="mt-10 overflow-hidden rounded-card border border-border bg-surface shadow-panel">
            <div className="grid gap-6 p-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <Badge variant="sand">State system</Badge>

                <h2 className="mt-4 text-2xl font-black tracking-[-0.05em] text-foreground">
                  Resilient states for a product-like travel experience.
                </h2>

                <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-strong">
                  This gallery collects the moments where the interface needs to
                  stay useful even when a list is empty, a destination is still
                  loading or a supporting travel signal is unavailable.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Link
                  href={routes.countries}
                  className="inline-flex min-h-12 items-center justify-center rounded-control bg-ink px-6 text-sm font-extrabold !text-white shadow-sm transition hover:bg-ink-soft"
                >
                  Explore countries
                </Link>

                <Link
                  href={routes.home}
                  className="inline-flex min-h-12 items-center justify-center rounded-control border border-border bg-surface px-6 text-sm font-extrabold text-foreground shadow-sm transition hover:border-border-strong hover:bg-surface-soft"
                >
                  Back to home
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <Card className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="travel-label text-muted">Families</p>
                  <p className="mt-3 text-4xl font-black tracking-[-0.06em] text-foreground">
                    4
                  </p>
                </div>

                <div className="grid size-11 place-items-center rounded-2xl bg-sage text-lg text-sage-strong">
                  ◇
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-muted-strong">
                Loading, empty, unavailable and preparation states.
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="travel-label text-muted">Tone</p>
                  <p className="mt-3 text-4xl font-black tracking-[-0.06em] text-foreground">
                    Calm
                  </p>
                </div>

                <div className="grid size-11 place-items-center rounded-2xl bg-mist-blue text-lg text-deep-ocean">
                  ≈
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-muted-strong">
                Clear, helpful and non-alarming language.
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="travel-label text-muted">Coverage</p>
                  <p className="mt-3 text-4xl font-black tracking-[-0.06em] text-foreground">
                    Core
                  </p>
                </div>

                <div className="grid size-11 place-items-center rounded-2xl bg-sand text-lg text-foreground">
                  ✦
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-muted-strong">
                Country discovery, detail, planner, notes and comparison flows.
              </p>
            </Card>
          </div>

          <div className="mt-10 grid gap-6 xl:grid-cols-2">
            <StatePreviewCard
              eyebrow="Loading"
              title="Destination cards loading"
              description="Used while country lists or destination shelves prepare the postcard grid."
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <MiniDestinationSkeleton />
                <MiniDestinationSkeleton />
              </div>
            </StatePreviewCard>

            <StatePreviewCard
              eyebrow="Loading"
              title="Comparison metrics loading"
              description="Used when a side-by-side view is preparing structured country signals."
            >
              <CompareMetricsLoadingPreview />
            </StatePreviewCard>

            <StatePreviewCard
              eyebrow="Empty"
              title="No saved destinations"
              description="Used when a personal shortlist has not started yet."
            >
              <CompactEmptyPreview />
            </StatePreviewCard>

            <StatePreviewCard
              eyebrow="Empty"
              title="No search results"
              description="Used when country discovery has filters but no matching destinations."
            >
              <CompactNoResultsPreview />
            </StatePreviewCard>

            <StatePreviewCard
              eyebrow="Unavailable"
              title="Destination unavailable"
              description="Used when a primary destination view needs a retry path."
            >
              <CompactErrorPreview />
            </StatePreviewCard>

            <StatePreviewCard
              eyebrow="Partial signal"
              title="Weather unavailable"
              description="Used when a supporting travel signal fails but the destination remains useful."
            >
              <CompactWeatherUnavailablePreview />
            </StatePreviewCard>

            <StatePreviewCard
              eyebrow="Soft unavailable"
              title="No long weekend suggestions"
              description="Used when data loads successfully but a specific travel signal has no results."
            >
              <CompactSoftUnavailablePreview />
            </StatePreviewCard>

            <StatePreviewCard
              eyebrow="Preparation"
              title="Client-side context preparing"
              description="Used for personal notes, saved destinations and other local travel context."
            >
              <ClientPreparationPreview />
            </StatePreviewCard>
          </div>
        </Container>
      </section>
    </main>
  );
}