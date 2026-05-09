import { Badge } from "@/shared/components/ui/badge";
import { Card } from "@/shared/components/ui/card";

const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"] as const;

const travelSignals = [
  "Weather ready",
  "Currency context",
  "Local holidays",
  "Saved plans",
] as const;

export function CountriesFiltersPanel() {
  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <Card className="p-6">
        <div>
          <p className="travel-label text-muted">Filters</p>
          <h2 className="mt-3 text-2xl font-black tracking-[-0.04em] text-foreground">
            Refine your atlas
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted-strong">
            Search and advanced filters will become interactive in the next
            Explore pass.
          </p>
        </div>

        <div className="mt-8">
          <h3 className="text-sm font-black text-foreground">Region</h3>

          <div className="mt-4 grid gap-3">
            {regions.map((region) => (
              <label
                key={region}
                className="flex items-center justify-between rounded-2xl border border-border bg-surface px-4 py-3 text-sm font-semibold text-muted-strong"
              >
                <span>{region}</span>
                <input
                  type="checkbox"
                  disabled
                  className="size-4 accent-deep-ocean"
                  aria-label={`Filter by ${region}`}
                />
              </label>
            ))}
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
      </Card>
    </aside>
  );
}