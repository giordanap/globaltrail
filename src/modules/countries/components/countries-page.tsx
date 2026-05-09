"use client";

import { useMemo } from "react";
import { useCountriesQuery } from "@/modules/countries/hooks/use-countries-query";
import { CountriesGridSkeleton } from "@/modules/countries/components/countries-grid-skeleton";
import { CountrySummaryCard } from "@/modules/countries/components/country-summary-card";
import { ErrorState } from "@/shared/components/feedback/error-state";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { Container } from "@/shared/components/ui/container";
import { SectionHeader } from "@/shared/components/ui/section-header";

const visibleCountriesLimit = 48;

export function CountriesPage() {
  const countriesQuery = useCountriesQuery();

  const visibleCountries = useMemo(
    () => countriesQuery.data?.slice(0, visibleCountriesLimit) ?? [],
    [countriesQuery.data],
  );

  return (
    <main className="bg-background">
      <section className="py-16 lg:py-20">
        <Container>
          <SectionHeader
            eyebrow="Country discovery"
            title="Explore countries with calm, useful travel context."
            description="Browse real destination data with country facts, flags, capitals, regions, population, currencies and languages."
            action={<Badge variant="ocean">Live country data</Badge>}
          />

          {countriesQuery.isLoading ? (
            <div className="mt-10">
              <CountriesGridSkeleton />
            </div>
          ) : null}

          {countriesQuery.isError ? (
            <div className="mt-10">
              <ErrorState
                title="We could not load countries."
                description="The destination list is temporarily unavailable. Try again to refresh the country data."
                action={
                  <Button
                    onClick={() => void countriesQuery.refetch()}
                    disabled={countriesQuery.isRefetching}
                  >
                    {countriesQuery.isRefetching ? "Retrying..." : "Try again"}
                  </Button>
                }
              />
            </div>
          ) : null}

          {countriesQuery.isSuccess ? (
            <>
              <div className="mt-10 grid gap-5 md:grid-cols-3">
                <Card className="p-5">
                  <p className="travel-label text-muted">Countries</p>
                  <p className="mt-3 text-3xl font-black tracking-[-0.05em] text-foreground">
                    {countriesQuery.data.length}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-strong">
                    Destinations available for exploration.
                  </p>
                </Card>

                <Card className="p-5">
                  <p className="travel-label text-muted">Preview</p>
                  <p className="mt-3 text-3xl font-black tracking-[-0.05em] text-foreground">
                    {visibleCountries.length}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-strong">
                    Countries shown in this first data view.
                  </p>
                </Card>

                <Card className="p-5">
                  <p className="travel-label text-muted">Next</p>
                  <p className="mt-3 text-3xl font-black tracking-[-0.05em] text-foreground">
                    Search
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-strong">
                    Filters and URL state will be added in the next Explore pass.
                  </p>
                </Card>
              </div>

              <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {visibleCountries.map((country) => (
                  <CountrySummaryCard key={country.alpha3Code} country={country} />
                ))}
              </div>
            </>
          ) : null}
        </Container>
      </section>
    </main>
  );
}