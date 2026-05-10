"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { routes } from "@/core/router/routes";
import { CompareCountryPanel } from "@/modules/compare/components/compare-country-panel";
import { CompareMetricRow } from "@/modules/compare/components/compare-metric-row";
import { useCompareSearchParams } from "@/modules/compare/hooks/use-compare-search-params";
import { useCompareStore } from "@/modules/compare/store";
import { getCompareSelectionCount } from "@/modules/compare/types";
import { useCountryDetailQuery } from "@/modules/countries/hooks/use-countries-query";
import type { Country } from "@/modules/countries/types";
import { useWeatherForecastQuery } from "@/modules/weather/hooks/use-weather-query";
import type { WeatherForecast } from "@/modules/weather/types";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { Container } from "@/shared/components/ui/container";
import { SectionHeader } from "@/shared/components/ui/section-header";

function getCompareStatusLabel(selectionCount: number) {
  if (selectionCount === 0) {
    return "No destinations selected";
  }

  if (selectionCount === 1) {
    return "Choose one more destination";
  }

  return "Ready to compare";
}

function formatPopulation(country: Country | null | undefined) {
  if (!country?.population) {
    return "Unavailable";
  }

  return country.population.toLocaleString("en");
}

function getCapital(country: Country | null | undefined) {
  return country?.capital ?? "Unavailable";
}

function getRegion(country: Country | null | undefined) {
  if (!country) {
    return "Unavailable";
  }

  return country.subregion
    ? `${country.region} · ${country.subregion}`
    : country.region;
}

function getCurrency(country: Country | null | undefined) {
  if (!country || country.currencies.length === 0) {
    return "Unavailable";
  }

  return country.currencies
    .map((currency) =>
      currency.symbol
        ? `${currency.code} · ${currency.symbol}`
        : currency.code,
    )
    .join(", ");
}

function getLanguages(country: Country | null | undefined) {
  if (!country || country.languages.length === 0) {
    return "Unavailable";
  }

  return country.languages
    .slice(0, 3)
    .map((language) => language.name)
    .join(", ");
}

function getArea(country: Country | null | undefined) {
  if (!country?.area) {
    return "Unavailable";
  }

  return `${country.area.toLocaleString("en")} km²`;
}

function getTimezones(country: Country | null | undefined) {
  if (!country || country.timezones.length === 0) {
    return "Unavailable";
  }

  return country.timezones.slice(0, 3).join(", ");
}

function getTravelContext(country: Country | null | undefined) {
  if (!country) {
    return "Unavailable";
  }

  const signals = [
    country.landlocked ? "Landlocked" : "Coastal access possible",
    country.carSide ? `Drives ${country.carSide}` : null,
    country.startOfWeek ? `Week starts ${country.startOfWeek}` : null,
  ].filter(Boolean);

  return signals.length > 0 ? signals.join(" · ") : "Unavailable";
}

function getWeatherLabel(
  forecast: WeatherForecast | null | undefined,
  isLoading: boolean,
  isError: boolean,
) {
  if (isLoading) {
    return "Loading";
  }

  if (isError) {
    return "Weather unavailable";
  }

  const currentWeather = forecast?.current;

  if (!currentWeather) {
    return "Unavailable";
  }

  const temperature =
    typeof currentWeather.temperature === "number"
      ? `${Math.round(currentWeather.temperature)}${forecast.units.temperature}`
      : "Temp unavailable";

  return `${temperature} · ${currentWeather.condition.label}`;
}

function getMetricValue(
  country: Country | null | undefined,
  isLoading: boolean,
  isError: boolean,
  getValue: (country: Country | null | undefined) => string,
) {
  if (isLoading) {
    return "Loading";
  }

  if (isError) {
    return "Unavailable";
  }

  return getValue(country);
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

  const leftCode = urlSelection.left;
  const rightCode = urlSelection.right;
  const selectionCount = getCompareSelectionCount(urlSelection);

  const leftCountryQuery = useCountryDetailQuery(leftCode ?? "", {
    enabled: Boolean(leftCode),
  });
  const rightCountryQuery = useCountryDetailQuery(rightCode ?? "", {
    enabled: Boolean(rightCode),
  });

  const leftCountry = leftCountryQuery.data;
  const rightCountry = rightCountryQuery.data;

  const leftWeatherQuery = useWeatherForecastQuery(
    leftCountry?.coordinates?.lat,
    leftCountry?.coordinates?.lng,
    {
      enabled: Boolean(leftCountry?.coordinates),
    },
  );
  const rightWeatherQuery = useWeatherForecastQuery(
    rightCountry?.coordinates?.lat,
    rightCountry?.coordinates?.lng,
    {
      enabled: Boolean(rightCountry?.coordinates),
    },
  );

  const leftWeatherLabel = getWeatherLabel(
    leftWeatherQuery.data,
    leftWeatherQuery.isLoading,
    leftWeatherQuery.isError,
  );
  const rightWeatherLabel = getWeatherLabel(
    rightWeatherQuery.data,
    rightWeatherQuery.isLoading,
    rightWeatherQuery.isError,
  );

  function handleSwap() {
    const nextSelection = {
      left: rightCode,
      right: leftCode,
    };

    setCompareSelection(nextSelection);
    router.push(routes.compareSelection(nextSelection));
  }

  function handleClear() {
    clearCompareSelection();
    router.push(routes.compare);
  }

  function handleRemove(side: "left" | "right") {
    const nextSelection =
      side === "left"
        ? {
            left: null,
            right: rightCode,
          }
        : {
            left: leftCode,
            right: null,
          };

    setCompareSelection(nextSelection);
    router.push(routes.compareSelection(nextSelection));
  }

  return (
    <main className="bg-background">
      <section className="relative overflow-hidden py-16 lg:py-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top_left,_rgba(219,234,242,0.7),_transparent_30rem),radial-gradient(circle_at_top_right,_rgba(239,227,207,0.48),_transparent_28rem)]" />

        <Container className="relative">
          <SectionHeader
            eyebrow="Compare destinations"
            title="Compare countries with practical travel context."
            description="Review two destinations side by side across country profile, population, currency, language, geography and live weather signals."
            action={
              <Badge variant={selectionCount > 1 ? "sage" : "ocean"}>
                {getCompareStatusLabel(selectionCount)}
              </Badge>
            }
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
                {leftCountry?.name ?? leftCode ?? "Open"}
              </p>
              <p className="mt-4 text-sm leading-6 text-muted-strong">
                First destination slot for the comparison view.
              </p>
            </Card>

            <Card className="p-6">
              <p className="travel-label text-muted">Right</p>
              <p className="mt-3 text-4xl font-black tracking-[-0.06em] text-foreground">
                {rightCountry?.name ?? rightCode ?? "Open"}
              </p>
              <p className="mt-4 text-sm leading-6 text-muted-strong">
                Second destination slot for the comparison view.
              </p>
            </Card>
          </div>

          <div className="mt-8 overflow-hidden rounded-card border border-border bg-surface shadow-panel">
            <div className="grid gap-6 p-5 lg:grid-cols-[1fr_auto] lg:items-center lg:p-6">
              <div>
                <Badge variant="sand">Comparison board</Badge>

                <h2 className="mt-4 text-2xl font-black tracking-[-0.05em] text-foreground">
                  Evaluate the practical tradeoffs between two countries.
                </h2>

                <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-strong">
                  The comparison keeps the view readable while still showing the
                  signals that matter before moving a destination into planning.
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
            <CompareCountryPanel
              side="Left"
              code={leftCode}
              country={leftCountry}
              isLoading={leftCountryQuery.isLoading}
              isError={leftCountryQuery.isError}
              weatherLabel={leftWeatherLabel}
              onRetry={() => void leftCountryQuery.refetch()}
              onRemove={() => handleRemove("left")}
            />

            <div className="hidden items-center justify-center lg:flex">
              <div className="grid size-14 place-items-center rounded-full border border-border bg-surface text-2xl font-black text-muted-strong shadow-panel">
                ⇄
              </div>
            </div>

            <CompareCountryPanel
              side="Right"
              code={rightCode}
              country={rightCountry}
              isLoading={rightCountryQuery.isLoading}
              isError={rightCountryQuery.isError}
              weatherLabel={rightWeatherLabel}
              onRetry={() => void rightCountryQuery.refetch()}
              onRemove={() => handleRemove("right")}
            />
          </div>

          {selectionCount > 0 ? (
            <Card className="mt-8 p-5 lg:p-6">
              <div className="flex flex-col gap-3">
                <Badge variant="ocean">Side-by-side metrics</Badge>

                <h2 className="text-2xl font-black tracking-[-0.05em] text-foreground">
                  Country signals at a glance.
                </h2>

                <p className="max-w-3xl text-sm leading-7 text-muted-strong">
                  Compare high-level country context without turning the page
                  into a dense dashboard.
                </p>
              </div>

              <div className="mt-6 grid gap-3">
                <CompareMetricRow
                  label="Capital"
                  leftValue={getMetricValue(
                    leftCountry,
                    leftCountryQuery.isLoading,
                    leftCountryQuery.isError,
                    getCapital,
                  )}
                  rightValue={getMetricValue(
                    rightCountry,
                    rightCountryQuery.isLoading,
                    rightCountryQuery.isError,
                    getCapital,
                  )}
                />

                <CompareMetricRow
                  label="Region"
                  leftValue={getMetricValue(
                    leftCountry,
                    leftCountryQuery.isLoading,
                    leftCountryQuery.isError,
                    getRegion,
                  )}
                  rightValue={getMetricValue(
                    rightCountry,
                    rightCountryQuery.isLoading,
                    rightCountryQuery.isError,
                    getRegion,
                  )}
                />

                <CompareMetricRow
                  label="Population"
                  leftValue={getMetricValue(
                    leftCountry,
                    leftCountryQuery.isLoading,
                    leftCountryQuery.isError,
                    formatPopulation,
                  )}
                  rightValue={getMetricValue(
                    rightCountry,
                    rightCountryQuery.isLoading,
                    rightCountryQuery.isError,
                    formatPopulation,
                  )}
                />

                <CompareMetricRow
                  label="Currency"
                  leftValue={getMetricValue(
                    leftCountry,
                    leftCountryQuery.isLoading,
                    leftCountryQuery.isError,
                    getCurrency,
                  )}
                  rightValue={getMetricValue(
                    rightCountry,
                    rightCountryQuery.isLoading,
                    rightCountryQuery.isError,
                    getCurrency,
                  )}
                />

                <CompareMetricRow
                  label="Languages"
                  leftValue={getMetricValue(
                    leftCountry,
                    leftCountryQuery.isLoading,
                    leftCountryQuery.isError,
                    getLanguages,
                  )}
                  rightValue={getMetricValue(
                    rightCountry,
                    rightCountryQuery.isLoading,
                    rightCountryQuery.isError,
                    getLanguages,
                  )}
                />

                <CompareMetricRow
                  label="Weather"
                  helperText="Current Open-Meteo snapshot when coordinates are available."
                  leftValue={leftWeatherLabel}
                  rightValue={rightWeatherLabel}
                />

                <CompareMetricRow
                  label="Area"
                  leftValue={getMetricValue(
                    leftCountry,
                    leftCountryQuery.isLoading,
                    leftCountryQuery.isError,
                    getArea,
                  )}
                  rightValue={getMetricValue(
                    rightCountry,
                    rightCountryQuery.isLoading,
                    rightCountryQuery.isError,
                    getArea,
                  )}
                />

                <CompareMetricRow
                  label="Timezones"
                  leftValue={getMetricValue(
                    leftCountry,
                    leftCountryQuery.isLoading,
                    leftCountryQuery.isError,
                    getTimezones,
                  )}
                  rightValue={getMetricValue(
                    rightCountry,
                    rightCountryQuery.isLoading,
                    rightCountryQuery.isError,
                    getTimezones,
                  )}
                />

                <CompareMetricRow
                  label="Travel context"
                  leftValue={getMetricValue(
                    leftCountry,
                    leftCountryQuery.isLoading,
                    leftCountryQuery.isError,
                    getTravelContext,
                  )}
                  rightValue={getMetricValue(
                    rightCountry,
                    rightCountryQuery.isLoading,
                    rightCountryQuery.isError,
                    getTravelContext,
                  )}
                />
              </div>
            </Card>
          ) : null}

          {selectionCount < 2 ? (
            <Card variant="warm" className="mt-8 p-6">
              <Badge variant="sand">Next step</Badge>

              <h2 className="mt-5 text-2xl font-black tracking-[-0.05em] text-foreground">
                Choose{" "}
                {selectionCount === 0
                  ? "two destinations"
                  : "one more destination"}{" "}
                to complete the comparison.
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