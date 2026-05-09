"use client";

import { useEffect, useMemo } from "react";
import {
  useCountriesQuery,
  useCountrySearchQuery,
} from "@/modules/countries/hooks/use-countries-query";
import { useCountrySearchParams } from "@/modules/countries/hooks/use-country-search-params";
import { useRecentCountrySearches } from "@/modules/countries/hooks/use-recent-country-searches";
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
  const { query, setQuery, clearQuery } = useCountrySearchParams();
  const normalizedQuery = query.trim();
  const isSearching = normalizedQuery.length > 0;

  const {
    recentSearches,
    addRecentSearch,
    clearRecentSearches,
  } = useRecentCountrySearches();

  const countriesQuery = useCountriesQuery({
    enabled: !isSearching,
  });

  const countrySearchQuery = useCountrySearchQuery(normalizedQuery, {
    enabled: isSearching,
  });

  const activeQuery = isSearching ? countrySearchQuery : countriesQuery;

  const visibleCountries = useMemo(
    () => activeQuery.data?.slice(0, visibleCountriesLimit) ?? [],
    [activeQuery.data],
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
              <Badge variant={isSearching ? "sage" : "ocean"}>
                {isSearching ? "Search active" : "Live country data"}
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
                description={`We could not find a destination matching “${normalizedQuery}”. Try another country name or clear your search.`}
                action={
                  <Button onClick={clearQuery} variant="secondary">
                    Clear search
                  </Button>
                }
              />
            </div>
          ) : null}

          {activeQuery.isSuccess && visibleCountries.length > 0 ? (
            <CountriesExplorer
              countries={visibleCountries}
              totalCount={activeQuery.data.length}
              query={query}
              isSearching={isSearching}
              recentSearches={recentSearches}
              onQueryChange={setQuery}
              onClearQuery={clearQuery}
              onSelectRecentSearch={setQuery}
              onClearRecentSearches={clearRecentSearches}
            />
          ) : null}
        </Container>
      </section>
    </main>
  );
}