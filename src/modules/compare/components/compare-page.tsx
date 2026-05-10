"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { routes } from "@/core/router/routes";
import { useCompareSearchParams } from "@/modules/compare/hooks/use-compare-search-params";
import { useCompareStore } from "@/modules/compare/store";
import { getCompareSelectionCount } from "@/modules/compare/types";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { Container } from "@/shared/components/ui/container";
import { SectionHeader } from "@/shared/components/ui/section-header";

type CompareSlotCardProps = {
  side: "Left" | "Right";
  code: string | null;
};

function CompareSlotCard({ side, code }: CompareSlotCardProps) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="relative min-h-56 overflow-hidden bg-ink p-6 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(219,234,242,0.5),_transparent_18rem),linear-gradient(135deg,_rgba(11,18,32,0.98),_rgba(11,79,117,0.72))]" />

        <div className="relative flex min-h-44 flex-col justify-between">
          <Badge
            variant="neutral"
            className="w-fit border-white/20 bg-white/15 text-white backdrop-blur-md"
          >
            {side} destination
          </Badge>

          <div>
            <h2 className="text-5xl font-black tracking-[-0.08em]">
              {code ?? "Open"}
            </h2>

            <p className="mt-3 text-sm leading-7 text-white/75">
              {code
                ? "Ready to load country data in the full comparison view."
                : "Choose a destination from Explore or Country Detail."}
            </p>
          </div>
        </div>
      </div>

      <div className="p-5">
        {code ? (
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href={routes.countryDetail(code)}
              className="inline-flex min-h-11 items-center justify-center rounded-control bg-ink px-4 text-sm font-extrabold !text-white shadow-sm transition hover:bg-ink-soft"
            >
              View country
            </Link>

            <Link
              href={routes.plannerDestination(code)}
              className="inline-flex min-h-11 items-center justify-center rounded-control border border-border bg-surface px-4 text-sm font-extrabold text-foreground shadow-sm transition hover:border-border-strong hover:bg-surface-soft"
            >
              Add to planner
            </Link>
          </div>
        ) : (
          <Link
            href={routes.countries}
            className="inline-flex min-h-11 items-center justify-center rounded-control border border-border bg-surface px-4 text-sm font-extrabold text-foreground shadow-sm transition hover:border-border-strong hover:bg-surface-soft"
          >
            Choose destination
          </Link>
        )}
      </div>
    </Card>
  );
}

function getCompareStatusLabel(selectionCount: number) {
  if (selectionCount === 0) {
    return "No destinations selected";
  }

  if (selectionCount === 1) {
    return "Choose one more destination";
  }

  return "Ready to compare";
}

export function ComparePage() {
  const router = useRouter();
  const urlSelection = useCompareSearchParams();
  const setCompareSelection = useCompareStore(
    (state) => state.setCompareSelection,
  );
  const clearCompareSelection = useCompareStore(
    (state) => state.clearCompareSelection,
  );

  const selectionCount = getCompareSelectionCount(urlSelection);

  function handleSwap() {
    const nextSelection = {
      left: urlSelection.right,
      right: urlSelection.left,
    };

    setCompareSelection(nextSelection);
    router.push(routes.compareSelection(nextSelection));
  }

  function handleClear() {
    clearCompareSelection();
    router.push(routes.compare);
  }

  return (
    <main className="bg-background">
      <section className="relative overflow-hidden py-16 lg:py-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top_left,_rgba(219,234,242,0.7),_transparent_30rem),radial-gradient(circle_at_top_right,_rgba(239,227,207,0.48),_transparent_28rem)]" />

        <Container className="relative">
          <SectionHeader
            eyebrow="Compare destinations"
            title="Build a side-by-side travel view."
            description="Select two countries from Explore, Country Detail or Favorites, then return here to compare them with context."
            action={<Badge variant="ocean">{getCompareStatusLabel(selectionCount)}</Badge>}
          />

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <Card className="p-6">
              <p className="travel-label text-muted">Selected</p>
              <p className="mt-3 text-4xl font-black tracking-[-0.06em] text-foreground">
                {selectionCount}/2
              </p>
              <p className="mt-4 text-sm leading-6 text-muted-strong">
                Destinations currently present in the comparison URL.
              </p>
            </Card>

            <Card className="p-6">
              <p className="travel-label text-muted">Left</p>
              <p className="mt-3 text-4xl font-black tracking-[-0.06em] text-foreground">
                {urlSelection.left ?? "Open"}
              </p>
              <p className="mt-4 text-sm leading-6 text-muted-strong">
                First destination slot for the upcoming comparison view.
              </p>
            </Card>

            <Card className="p-6">
              <p className="travel-label text-muted">Right</p>
              <p className="mt-3 text-4xl font-black tracking-[-0.06em] text-foreground">
                {urlSelection.right ?? "Open"}
              </p>
              <p className="mt-4 text-sm leading-6 text-muted-strong">
                Second destination slot for the upcoming comparison view.
              </p>
            </Card>
          </div>

          <div className="mt-8 overflow-hidden rounded-card border border-border bg-surface shadow-panel">
            <div className="grid gap-6 p-5 lg:grid-cols-[1fr_auto] lg:items-center lg:p-6">
              <div>
                <Badge variant="sand">Selection board</Badge>

                <h2 className="mt-4 text-2xl font-black tracking-[-0.05em] text-foreground">
                  Prepare the comparison before loading the full country data.
                </h2>

                <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-strong">
                  This step keeps comparison selection simple and URL-driven.
                  The next commit will turn these country codes into a complete
                  side-by-side data view.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Link
                  href={routes.countries}
                  className="inline-flex min-h-12 items-center justify-center rounded-control border border-border bg-surface px-6 text-sm font-extrabold text-foreground shadow-sm transition hover:border-border-strong hover:bg-surface-soft"
                >
                  Add destination
                </Link>

                {selectionCount > 1 ? (
                  <Button variant="secondary" onClick={handleSwap}>
                    Swap sides
                  </Button>
                ) : null}

                {selectionCount > 0 ? (
                  <Button variant="secondary" onClick={handleClear}>
                    Clear
                  </Button>
                ) : null}
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
            <CompareSlotCard side="Left" code={urlSelection.left} />

            <div className="hidden items-center justify-center lg:flex">
              <div className="grid size-14 place-items-center rounded-full border border-border bg-surface text-2xl font-black text-muted-strong shadow-panel">
                ⇄
              </div>
            </div>

            <CompareSlotCard side="Right" code={urlSelection.right} />
          </div>

          {selectionCount < 2 ? (
            <Card variant="warm" className="mt-8 p-6">
              <Badge variant="sand">Next step</Badge>

              <h2 className="mt-5 text-2xl font-black tracking-[-0.05em] text-foreground">
                Choose {selectionCount === 0 ? "two destinations" : "one more destination"} to unlock the full comparison.
              </h2>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-strong">
                Use Explore cards, Country Detail actions or saved destinations
                to send countries into this comparison board.
              </p>
            </Card>
          ) : null}
        </Container>
      </section>
    </main>
  );
}