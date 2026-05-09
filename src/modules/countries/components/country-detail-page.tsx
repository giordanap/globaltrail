"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { CSSProperties } from "react";
import { routes } from "@/core/router/routes";
import { useCountryDetailQuery } from "@/modules/countries/hooks/use-countries-query";
import type { Country } from "@/modules/countries/types";
import { CountryDetailSkeleton } from "@/modules/countries/components/country-detail-skeleton";
import { EmptyState } from "@/shared/components/feedback/empty-state";
import { ErrorState } from "@/shared/components/feedback/error-state";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { Container } from "@/shared/components/ui/container";

const populationFormatter = new Intl.NumberFormat("en");
const compactPopulationFormatter = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});
const areaFormatter = new Intl.NumberFormat("en");

function formatPopulation(population: number) {
  if (!population) {
    return "Unavailable";
  }

  return populationFormatter.format(population);
}

function formatCompactPopulation(population: number) {
  if (!population) {
    return "N/A";
  }

  return compactPopulationFormatter.format(population);
}

function formatArea(area: number) {
  if (!area) {
    return "Unavailable";
  }

  return `${areaFormatter.format(area)} km²`;
}

function joinList(values: string[]) {
  return values.length > 0 ? values.join(", ") : "Unavailable";
}

function getCurrencies(country: Country) {
  if (country.currencies.length === 0) {
    return "Unavailable";
  }

  return country.currencies
    .map((currency) =>
      currency.symbol
        ? `${currency.code} · ${currency.name} (${currency.symbol})`
        : `${currency.code} · ${currency.name}`,
    )
    .join(", ");
}

function getLanguages(country: Country) {
  if (country.languages.length === 0) {
    return "Unavailable";
  }

  return country.languages.map((language) => language.name).join(", ");
}

function getFlagStyle(country: Country): CSSProperties | undefined {
  if (!country.flag.svg) {
    return undefined;
  }

  return {
    backgroundImage: `url("${country.flag.svg}")`,
  };
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string | number | null;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface px-4 py-3">
      <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-muted">
        {label}
      </p>
      <p className="mt-2 text-sm font-black text-foreground">
        {value ?? "Unavailable"}
      </p>
    </div>
  );
}

export function CountryDetailPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code")?.trim().toUpperCase() ?? "";
  const countryQuery = useCountryDetailQuery(code, {
    enabled: Boolean(code),
  });

  if (!code) {
    return (
      <main className="bg-background">
        <section className="py-16 lg:py-20">
          <Container>
            <EmptyState
              icon="◍"
              title="Choose a destination first."
              description="Open a country from the Explore page to view country insights, travel signals and local context."
              action={
                <Link
                  href={routes.countries}
                  className="inline-flex min-h-12 items-center justify-center rounded-control bg-ink px-6 text-sm font-extrabold !text-white shadow-sm hover:bg-ink-soft"
                >
                  Explore countries
                </Link>
              }
            />
          </Container>
        </section>
      </main>
    );
  }

  if (countryQuery.isLoading) {
    return <CountryDetailSkeleton />;
  }

  if (countryQuery.isError) {
    return (
      <main className="bg-background">
        <section className="py-16 lg:py-20">
          <Container>
            <ErrorState
              title="We could not load this destination."
              description="The country insight view is temporarily unavailable. Try again to refresh this destination."
              action={
                <Button
                  onClick={() => void countryQuery.refetch()}
                  disabled={countryQuery.isRefetching}
                >
                  {countryQuery.isRefetching ? "Retrying..." : "Try again"}
                </Button>
              }
            />
          </Container>
        </section>
      </main>
    );
  }

  const country = countryQuery.data;

  if (!country) {
    return (
      <main className="bg-background">
        <section className="py-16 lg:py-20">
          <Container>
            <EmptyState
              icon="⌕"
              title="Destination not found."
              description="We could not find a country matching this code. Try opening another destination from Explore."
              action={
                <Link
                  href={routes.countries}
                  className="inline-flex min-h-12 items-center justify-center rounded-control bg-ink px-6 text-sm font-extrabold !text-white shadow-sm hover:bg-ink-soft"
                >
                  Back to Explore
                </Link>
              }
            />
          </Container>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-background">
      <section className="py-16 lg:py-20">
        <Container>
          <div className="mb-8">
            <Link
              href={routes.countries}
              className="text-sm font-black text-muted-strong underline-offset-4 transition hover:text-foreground hover:underline"
            >
              ← Back to Explore
            </Link>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <Card className="overflow-hidden p-0">
              <div className="relative min-h-[22rem] overflow-hidden bg-ink">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(219,234,242,0.55),_transparent_18rem),linear-gradient(135deg,_rgba(11,18,32,0.98),_rgba(11,79,117,0.72))]" />

                <div
                  className="absolute right-7 top-7 size-28 rounded-[1.5rem] border border-white/20 bg-white/15 bg-cover bg-center shadow-soft backdrop-blur-md"
                  style={getFlagStyle(country)}
                  aria-hidden="true"
                >
                  {!country.flag.svg ? (
                    <span className="grid size-full place-items-center text-3xl text-white">
                      ◍
                    </span>
                  ) : null}
                </div>

                <div className="relative flex min-h-[22rem] flex-col justify-end p-8 text-white">
                  <div className="flex flex-wrap gap-3">
                    <Badge
                      variant="neutral"
                      className="border-white/20 bg-white/15 text-white backdrop-blur-md"
                    >
                      {country.region}
                    </Badge>

                    <Badge
                      variant="neutral"
                      className="border-white/20 bg-white/15 text-white backdrop-blur-md"
                    >
                      {country.alpha2Code}
                    </Badge>
                  </div>

                  <h1 className="travel-heading mt-6 max-w-2xl text-[clamp(3rem,6vw,5.4rem)] leading-[0.92] text-white">
                    {country.name}
                  </h1>

                  <p className="mt-4 max-w-xl text-base leading-7 text-white/75">
                    {country.officialName}
                  </p>
                </div>
              </div>

              <div className="p-8">
                <div className="grid gap-4 sm:grid-cols-3">
                  <DetailRow label="Capital" value={country.capital} />
                  <DetailRow
                    label="Population"
                    value={formatCompactPopulation(country.population)}
                  />
                  <DetailRow label="Area" value={formatArea(country.area)} />
                </div>

                <p className="mt-8 max-w-3xl text-base leading-8 text-muted-strong">
                  {country.name} is located in {country.region}
                  {country.subregion ? `, within ${country.subregion}` : ""}.
                  This insight view brings together essential destination
                  context before adding weather, currency and holiday layers.
                </p>
              </div>
            </Card>

            <div className="grid gap-5">
              <Card className="p-6">
                <p className="travel-label text-muted">Destination signals</p>

                <div className="mt-6 grid gap-3">
                  <DetailRow label="Subregion" value={country.subregion} />
                  <DetailRow
                    label="Full population"
                    value={formatPopulation(country.population)}
                  />
                  <DetailRow
                    label="Independent"
                    value={
                      country.independent === null
                        ? "Unavailable"
                        : country.independent
                          ? "Yes"
                          : "No"
                    }
                  />
                  <DetailRow
                    label="United Nations"
                    value={country.unMember ? "Member" : "Not a member"}
                  />
                </div>
              </Card>

              <Card className="p-6">
                <p className="travel-label text-muted">Local context</p>

                <div className="mt-6 grid gap-3">
                  <DetailRow label="Currencies" value={getCurrencies(country)} />
                  <DetailRow label="Languages" value={getLanguages(country)} />
                  <DetailRow
                    label="Start of week"
                    value={country.startOfWeek}
                  />
                  <DetailRow
                    label="Driving side"
                    value={country.carSide}
                  />
                </div>
              </Card>

              <Card className="p-6">
                <p className="travel-label text-muted">Geography</p>

                <div className="mt-6 grid gap-3">
                  <DetailRow
                    label="Continents"
                    value={joinList(country.continents)}
                  />
                  <DetailRow
                    label="Timezones"
                    value={joinList(country.timezones.slice(0, 4))}
                  />
                  <DetailRow
                    label="Borders"
                    value={joinList(country.borders)}
                  />
                  <DetailRow
                    label="Landlocked"
                    value={country.landlocked ? "Yes" : "No"}
                  />
                </div>
              </Card>

              <div className="grid gap-3 sm:grid-cols-2">
                <Link
                  href={routes.compareCountries(country.alpha2Code, "JP")}
                  className="inline-flex min-h-12 items-center justify-center rounded-control border border-border bg-surface px-6 text-sm font-extrabold text-foreground shadow-sm transition hover:border-border-strong hover:bg-surface-soft"
                >
                  Compare destination
                </Link>

                <Link
                  href={routes.planner}
                  className="inline-flex min-h-12 items-center justify-center rounded-control bg-ink px-6 text-sm font-extrabold !text-white shadow-sm hover:bg-ink-soft"
                >
                  Add to planner
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}