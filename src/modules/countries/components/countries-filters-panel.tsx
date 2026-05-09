import type { CountryRegion } from "@/modules/countries/types";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { cn } from "@/shared/utils/cn";

type CountryRegionFilter = CountryRegion | "All";

type CountriesFiltersPanelProps = {
  selectedRegion: CountryRegionFilter;
  onRegionChange: (region: CountryRegionFilter) => void;
  onClearFilters: () => void;
};

const regions: CountryRegionFilter[] = [
  "All",
  "Africa",
  "Americas",
  "Asia",
  "Europe",
  "Oceania",
];

const travelSignals = [
  "Weather ready",
  "Currency context",
  "Local holidays",
  "Saved plans",
] as const;

export function CountriesFiltersPanel({
  selectedRegion,
  onRegionChange,
  onClearFilters,
}: CountriesFiltersPanelProps) {
  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <Card className="p-6">
        <div>
          <p className="travel-label text-muted">Filters</p>
          <h2 className="mt-3 text-2xl font-black tracking-[-0.04em] text-foreground">
            Refine your atlas
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted-strong">
            Filter destinations by region and combine it with search and
            sorting.
          </p>
        </div>

        <div className="mt-8">
          <h3 className="text-sm font-black text-foreground">Region</h3>

          <div className="mt-4 grid gap-3">
            {regions.map((region) => {
              const isSelected = selectedRegion === region;

              return (
                <button
                  key={region}
                  type="button"
                  onClick={() => onRegionChange(region)}
                  className={cn(
                    "flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-semibold transition",
                    isSelected
                      ? "border-deep-ocean/25 bg-mist-blue text-deep-ocean-strong"
                      : "border-border bg-surface text-muted-strong hover:border-border-strong hover:text-foreground",
                  )}
                >
                  <span>{region}</span>
                  <span
                    className={cn(
                      "grid size-5 place-items-center rounded-full border text-[0.65rem]",
                      isSelected
                        ? "border-deep-ocean/30 bg-surface text-deep-ocean-strong"
                        : "border-border text-muted",
                    )}
                  >
                    {isSelected ? "✓" : ""}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-sm font-black text-foreground">Travel signals</h3>

          <div className="mt-4 flex flex-wrap gap-2">
            {travelSignals.map((signal, index) => (
              <Badge
                key={signal}
                variant={index === 0 ? "ocean" : index === 1 ? "sage" : "sand"}
              >
                {signal}
              </Badge>
            ))}
          </div>
        </div>

        <Button
          type="button"
          variant="secondary"
          className="mt-8 w-full"
          onClick={onClearFilters}
        >
          Reset filters
        </Button>
      </Card>
    </aside>
  );
}