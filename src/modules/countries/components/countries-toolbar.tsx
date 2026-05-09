import { Input } from "@/shared/components/ui/input";
import { Select } from "@/shared/components/ui/select";

type CountriesToolbarProps = {
  totalCount: number;
  visibleCount: number;
};

export function CountriesToolbar({
  totalCount,
  visibleCount,
}: CountriesToolbarProps) {
  return (
    <div className="rounded-card border border-border bg-surface p-5 shadow-panel">
      <div className="grid gap-4 lg:grid-cols-[1fr_220px] lg:items-end">
        <Input
          label="Search destinations"
          name="country-search-preview"
          placeholder="Try Spain, Japan or Peru"
          helperText="Search will update URL state in the next commit."
          disabled
        />

        <Select
          label="Sort by"
          name="country-sort-preview"
          defaultValue="name"
          helperText="Sorting will become interactive soon."
          disabled
        >
          <option value="name">Name</option>
          <option value="population">Population</option>
        </Select>
      </div>

      <div className="mt-5 flex flex-col gap-3 border-t border-border pt-5 text-sm text-muted-strong sm:flex-row sm:items-center sm:justify-between">
        <p>
          Showing{" "}
          <span className="font-black text-foreground">{visibleCount}</span> of{" "}
          <span className="font-black text-foreground">{totalCount}</span>{" "}
          destinations.
        </p>

        <p className="font-semibold text-muted-strong">
          Live country data, visual filters preview
        </p>
      </div>
    </div>
  );
}