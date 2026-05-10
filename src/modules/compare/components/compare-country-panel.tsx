"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { routes } from "@/core/router/routes";
import type { Country } from "@/modules/countries/types";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";

type CompareCountryPanelProps = {
  side: "Left" | "Right";
  code: string | null;
  country: Country | null | undefined;
  isLoading: boolean;
  isError: boolean;
  weatherLabel: string;
  onRetry: () => void;
  onRemove: () => void;
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

function getCurrencyLabel(country: Country) {
  if (country.currencies.length === 0) {
    return "Unavailable";
  }

  return country.currencies
    .slice(0, 2)
    .map((currency) => currency.code)
    .join(", ");
}

function getLanguageLabel(country: Country) {
  if (country.languages.length === 0) {
    return "Unavailable";
  }

  return country.languages
    .slice(0, 2)
    .map((language) => language.name)
    .join(", ");
}

function getFlagStyle(country: Country): CSSProperties | undefined {
  if (!country.flag.svg) {
    return undefined;
  }

  return {
    backgroundImage: `url("${country.flag.svg}")`,
  };
}

function PanelShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Card className="overflow-hidden p-0 transition duration-300 hover:-translate-y-1 hover:shadow-card">
      {children}
    </Card>
  );
}

export function CompareCountryPanel({
  side,
  code,
  country,
  isLoading,
  isError,
  weatherLabel,
  onRetry,
  onRemove,
}: CompareCountryPanelProps) {
  if (!code) {
    return (
      <PanelShell>
        <div className="relative min-h-72 overflow-hidden bg-ink p-6 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(219,234,242,0.5),_transparent_18rem),linear-gradient(135deg,_rgba(11,18,32,0.98),_rgba(11,79,117,0.72))]" />

          <div className="relative flex min-h-60 flex-col justify-between">
            <Badge
              variant="neutral"
              className="w-fit border-white/20 bg-white/15 text-white backdrop-blur-md"
            >
              {side} destination
            </Badge>

            <div>
              <h2 className="travel-heading text-[clamp(3rem,6vw,5rem)] leading-[0.9] text-white">
                Open
              </h2>

              <p className="mt-4 max-w-md text-sm leading-7 text-white/75">
                Choose a country from Explore, Favorites or Country Detail to
                fill this side.
              </p>
            </div>
          </div>
        </div>

        <div className="p-5">
          <Link
            href={routes.countries}
            className="inline-flex min-h-11 items-center justify-center rounded-control border border-border bg-surface px-4 text-sm font-extrabold text-foreground shadow-sm transition hover:border-border-strong hover:bg-surface-soft"
          >
            Choose destination
          </Link>
        </div>
      </PanelShell>
    );
  }

  if (isLoading) {
    return (
      <PanelShell>
        <div className="relative min-h-72 overflow-hidden bg-ink p-6 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(219,234,242,0.5),_transparent_18rem),linear-gradient(135deg,_rgba(11,18,32,0.98),_rgba(11,79,117,0.72))]" />

          <div className="relative flex min-h-60 flex-col justify-between">
            <Badge
              variant="neutral"
              className="w-fit border-white/20 bg-white/15 text-white backdrop-blur-md"
            >
              {side} destination
            </Badge>

            <div>
              <h2 className="text-5xl font-black tracking-[-0.08em]">
                {code}
              </h2>

              <p className="mt-4 text-sm leading-7 text-white/75">
                Loading destination signals...
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-3 p-5">
          <div className="h-16 rounded-2xl bg-surface-soft" />
          <div className="h-16 rounded-2xl bg-surface-soft" />
          <div className="h-16 rounded-2xl bg-surface-soft" />
        </div>
      </PanelShell>
    );
  }

  if (isError || !country) {
    return (
      <PanelShell>
        <div className="relative min-h-72 overflow-hidden bg-ink p-6 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(200,111,94,0.34),_transparent_18rem),linear-gradient(135deg,_rgba(11,18,32,0.98),_rgba(200,111,94,0.62))]" />

          <div className="relative flex min-h-60 flex-col justify-between">
            <Badge
              variant="neutral"
              className="w-fit border-white/20 bg-white/15 text-white backdrop-blur-md"
            >
              {side} destination
            </Badge>

            <div>
              <h2 className="text-5xl font-black tracking-[-0.08em]">
                {code}
              </h2>

              <p className="mt-4 text-sm leading-7 text-white/75">
                We could not load this destination for comparison.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 p-5 sm:flex-row">
          <Button onClick={onRetry}>Try again</Button>

          <Button variant="secondary" onClick={onRemove}>
            Remove
          </Button>
        </div>
      </PanelShell>
    );
  }

  return (
    <PanelShell>
      <div className="relative min-h-72 overflow-hidden bg-ink p-6 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(223,238,230,0.55),_transparent_18rem),radial-gradient(circle_at_bottom_right,_rgba(239,227,207,0.25),_transparent_16rem),linear-gradient(135deg,_rgba(11,18,32,0.98),_rgba(40,99,77,0.74))]" />

        <div
          className="absolute right-6 top-6 size-24 rounded-[1.35rem] border border-white/20 bg-white/15 bg-cover bg-center shadow-soft backdrop-blur-md"
          style={getFlagStyle(country)}
          aria-hidden="true"
        >
          {!country.flag.svg ? (
            <span className="grid size-full place-items-center text-2xl text-white">
              ◍
            </span>
          ) : null}
        </div>

        <button
          type="button"
          onClick={onRemove}
          className="absolute left-6 top-6 z-10 grid size-10 place-items-center rounded-full border border-white/20 bg-white/15 text-white shadow-soft backdrop-blur-md transition hover:bg-white/25"
          aria-label={`Remove ${country.name} from comparison`}
        >
          ×
        </button>

        <div className="relative flex min-h-60 flex-col justify-end">
          <div className="flex flex-wrap gap-3">
            <Badge
              variant="neutral"
              className="border-white/20 bg-white/15 text-white backdrop-blur-md"
            >
              {side}
            </Badge>

            <Badge
              variant="neutral"
              className="border-white/20 bg-white/15 text-white backdrop-blur-md"
            >
              {country.alpha2Code}
            </Badge>
          </div>

          <h2 className="travel-heading mt-6 max-w-lg text-[clamp(3rem,6vw,5rem)] leading-[0.9] text-white">
            {country.name}
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-7 text-white/75">
            {country.officialName}
          </p>
        </div>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-surface-soft p-3">
            <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-muted">
              Capital
            </p>
            <p className="mt-2 text-sm font-black text-foreground">
              {country.capital ?? "Unavailable"}
            </p>
          </div>

          <div className="rounded-2xl bg-surface-soft p-3">
            <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-muted">
              People
            </p>
            <p className="mt-2 text-sm font-black text-foreground">
              {formatPopulation(country.population)}
            </p>
          </div>

          <div className="rounded-2xl bg-surface-soft p-3">
            <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-muted">
              Money
            </p>
            <p className="mt-2 text-sm font-black text-foreground">
              {getCurrencyLabel(country)}
            </p>
          </div>

          <div className="rounded-2xl bg-surface-soft p-3">
            <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-muted">
              Weather
            </p>
            <p className="mt-2 text-sm font-black text-foreground">
              {weatherLabel}
            </p>
          </div>
        </div>

        <p className="mt-5 text-sm leading-7 text-muted-strong">
          {country.region}
          {country.subregion ? ` · ${country.subregion}` : ""} ·{" "}
          {getLanguageLabel(country)}
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link
            href={routes.countryDetail(country.alpha2Code)}
            className="inline-flex min-h-11 items-center justify-center rounded-control bg-ink px-4 text-sm font-extrabold !text-white shadow-sm transition hover:bg-ink-soft"
          >
            View country
          </Link>

          <Link
            href={routes.plannerDestination(country.alpha2Code)}
            className="inline-flex min-h-11 items-center justify-center rounded-control border border-border bg-surface px-4 text-sm font-extrabold text-foreground shadow-sm transition hover:border-border-strong hover:bg-surface-soft"
          >
            Add to planner
          </Link>
        </div>
      </div>
    </PanelShell>
  );
}