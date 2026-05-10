"use client";

import Link from "next/link";
import { routes } from "@/core/router/routes";
import { FavoriteDestinationCard } from "@/modules/favorites/components/favorite-destination-card";
import { useFavoritesStore } from "@/modules/favorites/store";
import { EmptyState } from "@/shared/components/feedback/empty-state";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { Container } from "@/shared/components/ui/container";
import { SectionHeader } from "@/shared/components/ui/section-header";

export function FavoritesPage() {
  const favorites = useFavoritesStore((state) => state.favorites);
  const clearFavorites = useFavoritesStore((state) => state.clearFavorites);

  return (
    <main className="bg-background">
      <section className="py-16 lg:py-20">
        <Container>
          <SectionHeader
            eyebrow="Saved destinations"
            title="Keep your best destination ideas close."
            description="Saved destinations are stored privately on this device so you can return to country insights later."
            action={
              <Badge variant={favorites.length > 0 ? "sage" : "sand"}>
                {favorites.length} saved
              </Badge>
            }
          />

          {favorites.length === 0 ? (
            <div className="mt-10">
              <EmptyState
                icon="♡"
                title="No saved destinations yet."
                description="Explore countries and save the destinations you want to revisit, compare or plan around later."
                action={
                  <Link
                    href={routes.countries}
                    className="inline-flex min-h-12 items-center justify-center rounded-control bg-ink px-6 text-sm font-extrabold !text-white shadow-sm hover:bg-ink-soft"
                  >
                    Explore countries
                  </Link>
                }
              />
            </div>
          ) : (
            <>
              <div className="mt-10 grid gap-5 md:grid-cols-3">
                <Card className="p-5">
                  <p className="travel-label text-muted">Saved</p>
                  <p className="mt-3 text-3xl font-black tracking-[-0.05em] text-foreground">
                    {favorites.length}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-strong">
                    Destinations stored on this device.
                  </p>
                </Card>

                <Card className="p-5">
                  <p className="travel-label text-muted">Storage</p>
                  <p className="mt-3 text-3xl font-black tracking-[-0.05em] text-foreground">
                    Local
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-strong">
                    Favorites persist with browser storage.
                  </p>
                </Card>

                <Card className="p-5">
                  <p className="travel-label text-muted">Next</p>
                  <p className="mt-3 text-3xl font-black tracking-[-0.05em] text-foreground">
                    Planner
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-strong">
                    Saved destinations will feed travel plans later.
                  </p>
                </Card>
              </div>

              <div className="mt-8 flex flex-col gap-4 rounded-card border border-border bg-surface p-5 shadow-panel sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <Badge variant="ocean">Destination shortlist</Badge>
                  <p className="mt-3 text-sm leading-6 text-muted-strong">
                    Review saved countries or remove destinations from your
                    local shortlist.
                  </p>
                </div>

                <Button variant="secondary" onClick={clearFavorites}>
                  Clear favorites
                </Button>
              </div>

              <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {favorites.map((favorite) => (
                  <FavoriteDestinationCard
                    key={favorite.code}
                    destination={favorite}
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