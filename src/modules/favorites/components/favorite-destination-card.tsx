"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { routes } from "@/core/router/routes";
import { useFavoritesStore } from "@/modules/favorites/store";
import type { FavoriteDestination } from "@/modules/favorites/types";
import { Badge } from "@/shared/components/ui/badge";
import { Card } from "@/shared/components/ui/card";

type FavoriteDestinationCardProps = {
  destination: FavoriteDestination;
  rank: number;
};

const populationFormatter = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

const savedAtFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
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

  return savedAtFormatter.format(date);
}

function getCapitalLabel(destination: FavoriteDestination) {
  return destination.capital ?? "Capital unavailable";
}

function getSubregionLabel(destination: FavoriteDestination) {
  return destination.subregion ?? "Regional details pending";
}

export function FavoriteDestinationCard({
  destination,
  rank,
}: FavoriteDestinationCardProps) {
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);

  return (
    <Card className="group overflow-hidden p-0 transition duration-300 hover:-translate-y-1 hover:shadow-card">
      <div className="relative min-h-52 overflow-hidden bg-ink">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(223,238,230,0.62),_transparent_17rem),radial-gradient(circle_at_bottom_right,_rgba(239,227,207,0.28),_transparent_15rem),linear-gradient(135deg,_rgba(11,18,32,0.98),_rgba(40,99,77,0.76))]" />

        <div className="absolute left-5 top-5 z-10 flex items-center gap-3">
          <div
            className="size-16 rounded-[1.15rem] border border-white/20 bg-white/15 bg-cover bg-center shadow-soft backdrop-blur-md"
            style={getFlagStyle(destination)}
            aria-hidden="true"
          >
            {!destination.flag.svg ? (
              <span className="grid size-full place-items-center text-lg text-white">
                ◍
              </span>
            ) : null}
          </div>

          <Badge
            variant="neutral"
            className="border-white/20 bg-white/15 text-white backdrop-blur-md"
          >
            Saved #{rank}
          </Badge>
        </div>

        <button
          type="button"
          onClick={() => removeFavorite(destination.code)}
          className="absolute right-5 top-5 z-10 grid size-11 place-items-center rounded-full border border-white/20 bg-white/15 text-white shadow-soft backdrop-blur-md transition hover:bg-white/25"
          aria-label={`Remove ${destination.name} from saved destinations`}
        >
          ♥
        </button>

        <div className="relative flex min-h-52 flex-col justify-end p-5 text-white">
          <Badge
            variant="neutral"
            className="mb-4 w-fit border-white/20 bg-white/15 text-white backdrop-blur-md"
          >
            {destination.region}
          </Badge>

          <h2 className="max-w-[15rem] text-3xl font-black tracking-[-0.06em]">
            {destination.name}
          </h2>

          <p className="mt-2 text-sm font-semibold text-white/75">
            {getCapitalLabel(destination)}
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

        <div className="mt-5 rounded-2xl border border-border bg-surface p-4">
          <p className="text-sm font-black tracking-[-0.02em] text-foreground">
            {destination.officialName}
          </p>
          <p className="mt-2 text-sm leading-6 text-muted-strong">
            {getSubregionLabel(destination)}
          </p>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <Link
            href={routes.countryDetail(destination.code)}
            className="inline-flex min-h-11 items-center justify-center rounded-control bg-ink px-4 text-sm font-extrabold !text-white shadow-sm transition hover:bg-ink-soft"
          >
            View Details
          </Link>

          <Link
            href={routes.plannerDestination(destination.code)}
            className="inline-flex min-h-11 items-center justify-center rounded-control border border-border bg-surface px-4 text-sm font-extrabold text-foreground shadow-sm transition hover:border-border-strong hover:bg-surface-soft"
          >
            Add to Planner
          </Link>
        </div>

        <Link
          href={routes.compareDestination(destination.code)}
          className="mt-4 inline-flex text-sm font-black text-muted-strong underline-offset-4 transition hover:text-foreground hover:underline"
        >
          Compare destination →
        </Link>
      </div>
    </Card>
  );
}