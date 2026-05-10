import { Badge } from "@/shared/components/ui/badge";
import { Card } from "@/shared/components/ui/card";
import { createFavoriteFromCountrySummary } from "@/modules/favorites/types";
import { FavoriteToggleButton } from "@/modules/favorites/components/favorite-toggle-button";
import { routes } from "@/core/router/routes";
import Link from "next/link";
import type { CountrySummary } from "@/modules/countries/types";
import type { CSSProperties } from "react";

type CountryCardProps = {
  country: CountrySummary;
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

function getCurrencyLabel(country: CountrySummary) {
  if (country.currencies.length === 0) {
    return "No currency";
  }

  return country.currencies
    .slice(0, 2)
    .map((currency) => currency.code)
    .join(", ");
}

function getLanguageLabel(country: CountrySummary) {
  if (country.languages.length === 0) {
    return "Languages unavailable";
  }

  return country.languages
    .slice(0, 2)
    .map((language) => language.name)
    .join(", ");
}

function getFlagStyle(country: CountrySummary): CSSProperties | undefined {
  if (!country.flag.svg) {
    return undefined;
  }

  return {
    backgroundImage: `url("${country.flag.svg}")`,
  };
}

export function CountryCard({ country }: CountryCardProps) {
  const favoriteDestination = createFavoriteFromCountrySummary(country);

  return (
    <Card className="group overflow-hidden p-0 transition hover:-translate-y-1 hover:shadow-card">
      <div className="relative min-h-44 overflow-hidden bg-ink">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(219,234,242,0.55),_transparent_16rem),linear-gradient(135deg,_rgba(11,18,32,0.98),_rgba(11,79,117,0.72))]" />

        <FavoriteToggleButton
          destination={favoriteDestination}
          variant="compact"
          className="absolute left-5 top-5 z-10 border-white/20 bg-white/15 text-white shadow-soft backdrop-blur-md hover:bg-white/25 hover:text-white"
        />

        <div
          className="absolute right-5 top-5 size-20 rounded-[1.25rem] border border-white/20 bg-white/15 bg-cover bg-center shadow-soft backdrop-blur-md"
          style={getFlagStyle(country)}
          aria-hidden="true"
        >
          {!country.flag.svg ? (
            <span className="grid size-full place-items-center text-xl text-white">
              ◍
            </span>
          ) : null}
        </div>

        <div className="relative flex min-h-44 flex-col justify-end p-5 text-white">
          <Badge
            variant="neutral"
            className="mb-4 border-white/20 bg-white/15 text-white backdrop-blur-md"
          >
            {country.region}
          </Badge>

          <h2 className="max-w-[13rem] text-2xl font-black tracking-[-0.05em]">
            {country.name}
          </h2>

          <p className="mt-2 text-sm font-semibold text-white/75">
            {country.capital ?? "Capital unavailable"}
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
              {country.alpha2Code}
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
        </div>

        <p className="mt-5 min-h-12 text-sm leading-6 text-muted-strong">
          {getLanguageLabel(country)}
        </p>

        <div className="mt-6 flex items-center justify-between gap-4">
          <button
            type="button"
            disabled
            className="rounded-full border border-border bg-surface px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-muted-strong disabled:opacity-60"
          >
            Compare
          </button>

          <Link
            href={routes.countryDetail(country.alpha2Code)}
            className="text-sm font-black text-foreground underline-offset-4 transition hover:underline"
          >
            View Details →
          </Link>
        </div>
      </div>
    </Card>
  );
}