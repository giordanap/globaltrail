"use client";

import Link from "next/link";
import { useMemo } from "react";
import { routes } from "@/core/router/routes";
import { FavoriteDestinationCard } from "@/modules/favorites/components/favorite-destination-card";
import { useFavoritesStore } from "@/modules/favorites/store";
import type { FavoriteDestination } from "@/modules/favorites/types";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { Container } from "@/shared/components/ui/container";
import { SectionHeader } from "@/shared/components/ui/section-header";

const savedAtFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
});

function sortFavoritesBySavedAt(favorites: FavoriteDestination[]) {
  return [...favorites].sort((left, right) => {
    const leftTime = new Date(left.savedAt).getTime();
    const rightTime = new Date(right.savedAt).getTime();

    return rightTime - leftTime;
  });
}

function getPluralLabel(count: number, singular: string, plural: string) {
  return count === 1 ? singular : plural;
}

function getUniqueRegionsCount(favorites: FavoriteDestination[]) {
  return new Set(favorites.map((favorite) => favorite.region)).size;
}

function getLatestSavedLabel(favorites: FavoriteDestination[]) {
  const latest = sortFavoritesBySavedAt(favorites)[0];

  if (!latest) {
    return "None yet";
  }

  const date = new Date(latest.savedAt);

  if (Number.isNaN(date.getTime())) {
    return latest.name;
  }

  return `${latest.name} · ${savedAtFormatter.format(date)}`;
}

function getPrimaryRegionLabel(favorites: FavoriteDestination[]) {
  if (favorites.length === 0) {
    return "No region";
  }

  const regionCounts = favorites.reduce<Record<string, number>>(
    (accumulator, favorite) => {
      accumulator[favorite.region] = (accumulator[favorite.region] ?? 0) + 1;
      return accumulator;
    },
    {},
  );

  const topRegion = Object.entries(regionCounts).sort(
    ([, leftCount], [, rightCount]) => rightCount - leftCount,
  )[0];

  if (!topRegion) {
    return "Mixed";
  }

  const [region, count] = topRegion;

  return `${region} · ${count}`;
}

export function FavoritesPage() {
  const favorites = useFavoritesStore((state) => state.favorites);
  const clearFavorites = useFavoritesStore((state) => state.clearFavorites);

  const sortedFavorites = useMemo(
    () => sortFavoritesBySavedAt(favorites),
    [favorites],
  );

  const savedCountLabel = `${favorites.length} ${getPluralLabel(
    favorites.length,
    "saved",
    "saved",
  )}`;

  return (
    <main className="bg-background">
      <section className="relative overflow-hidden py-16 lg:py-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top_left,_rgba(219,234,242,0.72),_transparent_32rem),radial-gradient(circle_at_top_right,_rgba(239,227,207,0.48),_transparent_26rem)]" />

        <Container className="relative">
          <SectionHeader
            eyebrow="Saved destinations"
            title="Your private travel shortlist."
            description="Keep promising destinations close, compare them when the timing is right and move them into a travel plan when you are ready."
            action={
              <Badge variant={favorites.length > 0 ? "sage" : "sand"}>
                {savedCountLabel}
              </Badge>
            }
          />

          {favorites.length === 0 ? (
            <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <Card className="overflow-hidden p-0">
                <div className="relative min-h-[28rem] overflow-hidden bg-ink p-8 text-white">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(223,238,230,0.48),_transparent_20rem),radial-gradient(circle_at_bottom_right,_rgba(217,154,61,0.24),_transparent_18rem),linear-gradient(135deg,_rgba(11,18,32,0.98),_rgba(11,79,117,0.72))]" />

                  <div className="relative flex min-h-[22rem] flex-col justify-between">
                    <Badge
                      variant="neutral"
                      className="w-fit border-white/20 bg-white/15 text-white backdrop-blur-md"
                    >
                      Destination shelf
                    </Badge>

                    <div>
                      <div className="grid size-16 place-items-center rounded-2xl border border-white/20 bg-white/15 text-3xl shadow-soft backdrop-blur-md">
                        ♡
                      </div>

                      <h2 className="travel-heading mt-6 max-w-2xl text-[clamp(2.6rem,6vw,5rem)] leading-[0.92] text-white">
                        Start with one country worth revisiting.
                      </h2>

                      <p className="mt-5 max-w-xl text-base leading-8 text-white/76">
                        Explore countries, open a destination profile and save
                        the places you want to compare, revisit or plan around.
                      </p>

                      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Link
                          href={routes.countries}
                          className="inline-flex min-h-12 items-center justify-center rounded-control bg-white px-6 text-sm font-extrabold text-ink shadow-sm transition hover:bg-white/90"
                        >
                          Explore countries
                        </Link>

                        <Link
                          href={routes.states}
                          className="inline-flex min-h-12 items-center justify-center rounded-control border border-white/20 bg-white/10 px-6 text-sm font-extrabold text-white shadow-sm backdrop-blur-md transition hover:bg-white/15"
                        >
                          View interface states
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="grid gap-5">
                <Card className="p-6">
                  <Badge variant="ocean">How it helps</Badge>
                  <h3 className="mt-5 text-2xl font-black tracking-[-0.05em] text-foreground">
                    Build a calm shortlist before planning.
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-strong">
                    Favorites give you a quiet place to keep destination ideas
                    without committing to dates, budgets or itineraries yet.
                  </p>
                </Card>

                <Card variant="warm" className="p-6">
                  <p className="travel-label text-muted">Next actions</p>
                  <div className="mt-5 grid gap-3">
                    <div className="rounded-2xl bg-white/70 p-4">
                      <p className="text-sm font-black text-foreground">
                        Save from Explore
                      </p>
                      <p className="mt-1 text-sm leading-6 text-muted-strong">
                        Use the heart action on any destination card.
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white/70 p-4">
                      <p className="text-sm font-black text-foreground">
                        Save from Country Detail
                      </p>
                      <p className="mt-1 text-sm leading-6 text-muted-strong">
                        Keep deeper country insights available for later.
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white/70 p-4">
                      <p className="text-sm font-black text-foreground">
                        Compare or plan next
                      </p>
                      <p className="mt-1 text-sm leading-6 text-muted-strong">
                        Send a saved destination toward comparison or planning.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          ) : (
            <>
              <div className="mt-10 grid gap-5 md:grid-cols-3">
                <Card className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="travel-label text-muted">Saved</p>
                      <p className="mt-3 text-4xl font-black tracking-[-0.06em] text-foreground">
                        {favorites.length}
                      </p>
                    </div>

                    <div className="grid size-11 place-items-center rounded-2xl bg-sage text-lg text-sage-strong">
                      ♡
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-muted-strong">
                    {getPluralLabel(
                      favorites.length,
                      "Destination kept close for deeper review.",
                      "Destinations kept close for deeper review.",
                    )}
                  </p>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="travel-label text-muted">Regions</p>
                      <p className="mt-3 text-4xl font-black tracking-[-0.06em] text-foreground">
                        {getUniqueRegionsCount(favorites)}
                      </p>
                    </div>

                    <div className="grid size-11 place-items-center rounded-2xl bg-mist-blue text-lg text-deep-ocean">
                      ◍
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-muted-strong">
                    Primary cluster: {getPrimaryRegionLabel(favorites)}
                  </p>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="travel-label text-muted">Latest</p>
                      <p className="mt-3 text-xl font-black tracking-[-0.04em] text-foreground">
                        {getLatestSavedLabel(favorites)}
                      </p>
                    </div>

                    <div className="grid size-11 place-items-center rounded-2xl bg-sand text-lg text-foreground">
                      ✦
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-muted-strong">
                    Sorted by the most recently saved destination.
                  </p>
                </Card>
              </div>

              <div className="mt-8 overflow-hidden rounded-card border border-border bg-surface shadow-panel">
                <div className="grid gap-6 p-5 lg:grid-cols-[1fr_auto] lg:items-center lg:p-6">
                  <div>
                    <Badge variant="ocean">Destination shortlist</Badge>
                    <h2 className="mt-4 text-2xl font-black tracking-[-0.05em] text-foreground">
                      Review, compare or move a saved country into planning.
                    </h2>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-strong">
                      This shelf is designed for quick decisions: open the full
                      country profile, start a comparison or prepare the
                      destination for the planner.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                    <Link
                      href={routes.countries}
                      className="inline-flex min-h-12 items-center justify-center rounded-control border border-border bg-surface px-6 text-sm font-extrabold text-foreground shadow-sm transition hover:border-border-strong hover:bg-surface-soft"
                    >
                      Add more
                    </Link>

                    <Button variant="secondary" onClick={clearFavorites}>
                      Clear favorites
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {sortedFavorites.map((favorite, index) => (
                  <FavoriteDestinationCard
                    key={favorite.code}
                    destination={favorite}
                    rank={index + 1}
                  />
                ))}
              </div>
            </>
          )}
        </Container>
      </section>
    </main>
  );
}