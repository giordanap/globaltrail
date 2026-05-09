"use client";

import { useMemo } from "react";
import { useCountriesQuery } from "@/modules/countries/hooks/use-countries-query";
import { CountriesExplorer } from "@/modules/countries/components/countries-explorer";
import { CountriesGridSkeleton } from "@/modules/countries/components/countries-grid-skeleton";
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
            <CountriesExplorer
              countries={visibleCountries}
              totalCount={countriesQuery.data.length}
            />
          ) : null}
        </Container>
      </section>
    </main>
  );
}