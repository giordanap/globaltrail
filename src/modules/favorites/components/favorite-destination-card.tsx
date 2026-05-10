"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { routes } from "@/core/router/routes";
import type { FavoriteDestination } from "@/modules/favorites/types";
import { useFavoritesStore } from "@/modules/favorites/store";
import { Badge } from "@/shared/components/ui/badge";
import { Card } from "@/shared/components/ui/card";

type FavoriteDestinationCardProps = {
  destination: FavoriteDestination;
};

const populationFormatter = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

function formatPopulation(population: number) {
  if (!population) {
    return "Unavailable";
  }

  return populationFormatter.format(population);
}

function getFlagStyle(destination: FavoriteDestination): CSSProperties | undefined {
  if (!destination.flag.svg) {
    return undefined;
  }

  return {
    backgroundImage: `url("${destination.flag.svg}")`,
  };
}

function formatSavedAt(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Recently saved";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(date);
}

export function FavoriteDestinationCard({
  destination,
}: FavoriteDestinationCardProps) {
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);

  return (
    <Card className="group overflow-hidden p-0 transition hover:-translate-y-1 hover:shadow-card">
      <div className="relative min-h-44 overflow-hidden bg-ink">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(223,238,230,0.6),_transparent_16rem),linear-gradient(135deg,_rgba(11,18,32,0.98),_rgba(40,99,77,0.72))]" />

        <button
          type="button"
          onClick={() => removeFavorite(destination.code)}
          className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-full border border-white/20 bg-white/15 text-white shadow-soft backdrop-blur-md transition hover:bg-white/25"
          aria-label={`Remove ${destination.name} from favorites`}
        >
          ♥
        </button>

        <div
          className="absolute left-5 top-5 size-20 rounded-[1.25rem] border border-white/20 bg-white/15 bg-cover bg-center shadow-soft backdrop-blur-md"
          style={getFlagStyle(destination)}
          aria-hidden="true"
        >
          {!destination.flag.svg ? (
            <span className="grid size-full place-items-center text-xl text-white">
              ◍
            </span>
          ) : null}
        </div>

        <div className="relative flex min-h-44 flex-col justify-end p-5 text-white">
          <Badge
            variant="neutral"
            className="mb-4 w-fit border-white/20 bg-white/15 text-white backdrop-blur-md"
          >
            {destination.region}
          </Badge>

          <h2 className="max-w-[13rem] text-2xl font-black tracking-[-0.05em]">
            {destination.name}
          </h2>

          <p className="mt-2 text-sm font-semibold text-white/75">
            {destination.capital ?? "Capital unavailable"}
          </p>
        </div>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-2xl bg-surface-soft p-3">
            <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-muted">
              Code
            </p>
            <p className="mt-2 text-sm font-black text-foreground">
              {destination.code}
            </p>
          </div>

          <div className="rounded-2xl bg-surface-soft p-3">
            <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-muted">
              People
            </p>
            <p className="mt-2 text-sm font-black text-foreground">
              {formatPopulation(destination.population)}
            </p>
          </div>

          <div className="rounded-2xl bg-surface-soft p-3">
            <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-muted">
              Saved
            </p>
            <p className="mt-2 text-sm font-black text-foreground">
              {formatSavedAt(destination.savedAt)}
            </p>
          </div>
        </div>

        <p className="mt-5 min-h-12 text-sm leading-6 text-muted-strong">
          {destination.officialName}
        </p>

        <div className="mt-6 flex items-center justify-between gap-4">
          <Link
            href={routes.compareCountries(destination.code, "JP")}
            className="text-sm font-black text-muted-strong underline-offset-4 transition hover:text-foreground hover:underline"
          >
            Compare
          </Link>

          <Link
            href={routes.countryDetail(destination.code)}
            className="text-sm font-black text-foreground underline-offset-4 transition hover:underline"
          >
            View Details →
          </Link>
        </div>
      </div>
    </Card>
  );
}