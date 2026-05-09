import Link from "next/link";
import type { CSSProperties } from "react";
import { routes } from "@/core/router/routes";
import type { CountrySummary } from "@/modules/countries/types";
import { Badge } from "@/shared/components/ui/badge";
import { Card } from "@/shared/components/ui/card";

type CountrySummaryCardProps = {
  country: CountrySummary;
};

const populationFormatter = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

function formatPopulation(population: number) {
  if (!population) {
    return "Population unavailable";
  }

  return `${populationFormatter.format(population)} people`;
}

function getCurrencyLabel(country: CountrySummary) {
  if (country.currencies.length === 0) {
    return "Currency unavailable";
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

export function CountrySummaryCard({ country }: CountrySummaryCardProps) {
  const flagStyle: CSSProperties | undefined = country.flag.svg
    ? {
        backgroundImage: `url("${country.flag.svg}")`,
      }
    : undefined;

  return (
    <Card className="group overflow-hidden p-5 transition hover:-translate-y-0.5 hover:shadow-card">
      <div className="flex items-start gap-4">
        <div
          className="size-12 shrink-0 rounded-2xl border border-border bg-surface-soft bg-cover bg-center shadow-sm"
          style={flagStyle}
          aria-hidden="true"
        >
          {!country.flag.svg ? (
            <span className="grid size-full place-items-center text-sm">◍</span>
          ) : null}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="truncate text-lg font-black tracking-[-0.03em] text-foreground">
              {country.name}
            </h2>

            <Badge variant="ocean" className="shrink-0">
              {country.alpha2Code}
            </Badge>
          </div>

          <p className="mt-1 text-sm font-semibold text-muted-strong">
            {country.capital ?? "Capital unavailable"}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 text-sm text-muted-strong">
        <div className="flex items-center justify-between gap-4 rounded-2xl bg-surface-soft px-4 py-3">
          <span>Region</span>
          <span className="font-bold text-foreground">{country.region}</span>
        </div>

        <div className="flex items-center justify-between gap-4 rounded-2xl bg-surface-soft px-4 py-3">
          <span>Population</span>
          <span className="font-bold text-foreground">
            {formatPopulation(country.population)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4 rounded-2xl bg-surface-soft px-4 py-3">
          <span>Currency</span>
          <span className="font-bold text-foreground">
            {getCurrencyLabel(country)}
          </span>
        </div>
      </div>

      <p className="mt-5 line-clamp-2 text-sm leading-6 text-muted-strong">
        {getLanguageLabel(country)}
      </p>

      <div className="mt-6 flex items-center justify-between gap-4">
        <Badge variant="sage">{country.subregion ?? "Global region"}</Badge>

        <Link
          href={routes.countryDetail(country.alpha2Code)}
          className="text-sm font-black text-foreground underline-offset-4 transition hover:underline"
        >
          View details →
        </Link>
      </div>
    </Card>
  );
}