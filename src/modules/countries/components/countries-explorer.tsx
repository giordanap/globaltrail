import type {
  CountryRegion,
  CountrySortDirection,
  CountrySortField,
  CountrySummary,
} from "@/modules/countries/types";
import { CountriesFiltersPanel } from "@/modules/countries/components/countries-filters-panel";
import { CountriesToolbar } from "@/modules/countries/components/countries-toolbar";
import { CountryCard } from "@/modules/countries/components/country-card";
import { Badge } from "@/shared/components/ui/badge";
import { Card } from "@/shared/components/ui/card";

type CountryRegionFilter = CountryRegion | "All";

type CountriesExplorerProps = {
  countries: CountrySummary[];
  totalCount: number;
  query: string;
  region: CountryRegionFilter;
  sortBy: CountrySortField;
  sortDirection: CountrySortDirection;
  isSearching: boolean;
  recentSearches: string[];
  onQueryChange: (query: string) => void;
  onClearQuery: () => void;
  onSelectRecentSearch: (query: string) => void;
  onClearRecentSearches: () => void;
  onRegionChange: (region: CountryRegionFilter) => void;
  onSortChange: (
    sortBy: CountrySortField,
    sortDirection: CountrySortDirection,
  ) => void;
  onClearFilters: () => void;
};

export function CountriesExplorer({
  countries,
  totalCount,
  query,
  region,
  sortBy,
  sortDirection,
  isSearching,
  recentSearches,
  onQueryChange,
  onClearQuery,
  onSelectRecentSearch,
  onClearRecentSearches,
  onRegionChange,
  onSortChange,
  onClearFilters,
}: CountriesExplorerProps) {
  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-[280px_1fr]">
      <CountriesFiltersPanel
        selectedRegion={region}
        onRegionChange={onRegionChange}
        onClearFilters={onClearFilters}
      />

      <div>
        <CountriesToolbar
          key={query}
          totalCount={totalCount}
          visibleCount={countries.length}
          query={query}
          isSearching={isSearching}
          sortBy={sortBy}
          sortDirection={sortDirection}
          recentSearches={recentSearches}
          onQueryChange={onQueryChange}
          onClearQuery={onClearQuery}
          onSelectRecentSearch={onSelectRecentSearch}
          onClearRecentSearches={onClearRecentSearches}
          onSortChange={onSortChange}
        />

        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {countries.map((country) => (
            <CountryCard key={country.alpha3Code} country={country} />
          ))}
        </div>

        <Card className="mt-8 flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Badge variant={isSearching || region !== "All" ? "ocean" : "sage"}>
              {isSearching || region !== "All"
                ? "Filtered results"
                : "Preview list"}
            </Badge>
            <p className="mt-3 text-sm leading-6 text-muted-strong">
              Search, region and sorting are now reflected in the URL so the
              explorer state can be shared or refreshed.
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