import type { CountrySummary } from "@/modules/countries/types";
import { CountriesFiltersPanel } from "@/modules/countries/components/countries-filters-panel";
import { CountriesToolbar } from "@/modules/countries/components/countries-toolbar";
import { CountryCard } from "@/modules/countries/components/country-card";
import { Badge } from "@/shared/components/ui/badge";
import { Card } from "@/shared/components/ui/card";

type CountriesExplorerProps = {
  countries: CountrySummary[];
  totalCount: number;
};

export function CountriesExplorer({
  countries,
  totalCount,
}: CountriesExplorerProps) {
  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-[280px_1fr]">
      <CountriesFiltersPanel />

      <div>
        <CountriesToolbar
          totalCount={totalCount}
          visibleCount={countries.length}
        />

        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {countries.map((country) => (
            <CountryCard key={country.alpha3Code} country={country} />
          ))}
        </div>

        <Card className="mt-8 flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Badge variant="sage">Preview list</Badge>
            <p className="mt-3 text-sm leading-6 text-muted-strong">
              Pagination and URL-driven filtering will be added after this
              layout pass.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled
              className="rounded-full border border-border bg-surface px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-muted-strong disabled:opacity-60"
            >
              Previous
            </button>
            <button
              type="button"
              disabled
              className="rounded-full border border-border bg-surface px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-muted-strong disabled:opacity-60"
            >
              Next
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}