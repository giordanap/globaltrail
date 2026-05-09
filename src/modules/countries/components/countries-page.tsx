"use client";

import { useEffect, useMemo } from "react";
import {
  useCountriesQuery,
  useCountrySearchQuery,
} from "@/modules/countries/hooks/use-countries-query";
import { useCountrySearchParams } from "@/modules/countries/hooks/use-country-search-params";
import { useRecentCountrySearches } from "@/modules/countries/hooks/use-recent-country-searches";
import { sortCountrySummaries } from "@/modules/countries/mappers";
import { CountriesExplorer } from "@/modules/countries/components/countries-explorer";
import { CountriesGridSkeleton } from "@/modules/countries/components/countries-grid-skeleton";
import { EmptyState } from "@/shared/components/feedback/empty-state";
import { ErrorState } from "@/shared/components/feedback/error-state";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { Container } from "@/shared/components/ui/container";
import { SectionHeader } from "@/shared/components/ui/section-header";

const visibleCountriesLimit = 48;

export function CountriesPage() {
  const {
    query,
    region,
    sortBy,
    sortDirection,
    setQuery,
    clearQuery,
    setRegion,
    setSort,
    clearFilters,
  } = useCountrySearchParams();

  const normalizedQuery = query.trim();
  const isSearching = normalizedQuery.length > 0;

  const { recentSearches, addRecentSearch, clearRecentSearches } =
    useRecentCountrySearches();

  const countriesQuery = useCountriesQuery({
    enabled: !isSearching,
  });

  const countrySearchQuery = useCountrySearchQuery(normalizedQuery, {
    enabled: isSearching,
  });

  const activeQuery = isSearching ? countrySearchQuery : countriesQuery;

  const filteredCountries = useMemo(() => {
    const countries = activeQuery.data ?? [];
    const regionFilteredCountries =
      region === "All"
        ? countries
        : countries.filter((country) => country.region === region);

    return sortCountrySummaries(regionFilteredCountries, sortBy, sortDirection);
  }, [activeQuery.data, region, sortBy, sortDirection]);

  const visibleCountries = useMemo(
    () => filteredCountries.slice(0, visibleCountriesLimit),
    [filteredCountries],
  );

  useEffect(() => {
    if (
      countrySearchQuery.isSuccess &&
      normalizedQuery.length > 1 &&
      countrySearchQuery.data.length > 0
    ) {
      addRecentSearch(normalizedQuery);
    }
  }, [
    addRecentSearch,
    countrySearchQuery.data,
    countrySearchQuery.isSuccess,
    normalizedQuery,
  ]);

  return (
    <main className="bg-background">
      <section className="py-16 lg:py-20">
        <Container>
          <SectionHeader
            eyebrow="Country discovery"
            title="Explore countries with calm, useful travel context."
            description="Browse real destination data with country facts, flags, capitals, regions, population, currencies and languages."
            action={
              <Badge variant={isSearching || region !== "All" ? "sage" : "ocean"}>
                {isSearching || region !== "All"
                  ? "Filters active"
                  : "Live country data"}
              </Badge>
            }
          />

          {activeQuery.isLoading ? (
            <div className="mt-10 grid gap-8 lg:grid-cols-[280px_1fr]">
              <Card className="hidden p-6 lg:block">
                <div className="h-7 w-28 rounded-full bg-surface-muted" />
                <div className="mt-8 space-y-3">
                  <div className="h-12 rounded-2xl bg-surface-muted" />
                  <div className="h-12 rounded-2xl bg-surface-muted" />
                  <div className="h-12 rounded-2xl bg-surface-muted" />
                </div>
              </Card>

              <div>
                <Card className="mb-6 p-5">
                  <div className="h-12 rounded-2xl bg-surface-muted" />
                </Card>
                <CountriesGridSkeleton />
              </div>
            </div>
          ) : null}

          {activeQuery.isError ? (
            <div className="mt-10">
              <ErrorState
                title={
                  isSearching
                    ? "We could not search countries."
                    : "We could not load countries."
                }
                description={
                  isSearching
                    ? "The destination search is temporarily unavailable. Try again to refresh the results."
                    : "The destination list is temporarily unavailable. Try again to refresh the country data."
                }
                action={
                  <Button
                    onClick={() => void activeQuery.refetch()}
                    disabled={activeQuery.isRefetching}
                  >
                    {activeQuery.isRefetching ? "Retrying..." : "Try again"}
                  </Button>
                }
              />
            </div>
          ) : null}

          {activeQuery.isSuccess && visibleCountries.length === 0 ? (
            <div className="mt-10">
              <EmptyState
                icon="⌕"
                title="No countries found."
                description="No destinations match the current search and region filters. Try another country name or reset the filters."
                action={
                  <Button onClick={clearFilters} variant="secondary">
                    Reset filters
                  </Button>
                }
              />
            </div>
          ) : null}

          {activeQuery.isSuccess && visibleCountries.length > 0 ? (
            <CountriesExplorer
              countries={visibleCountries}
              totalCount={filteredCountries.length}
              query={query}
              region={region}
              sortBy={sortBy}
              sortDirection={sortDirection}
              isSearching={isSearching}
              recentSearches={recentSearches}
              onQueryChange={setQuery}
              onClearQuery={clearQuery}
              onSelectRecentSearch={setQuery}
              onClearRecentSearches={clearRecentSearches}
              onRegionChange={setRegion}
              onSortChange={setSort}
              onClearFilters={clearFilters}
            />
          ) : null}
        </Container>
      </section>
    </main>
  );
}