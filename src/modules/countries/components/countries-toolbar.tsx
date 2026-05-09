"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Select } from "@/shared/components/ui/select";

type CountriesToolbarProps = {
  totalCount: number;
  visibleCount: number;
  query: string;
  isSearching: boolean;
  recentSearches: string[];
  onQueryChange: (query: string) => void;
  onClearQuery: () => void;
  onSelectRecentSearch: (query: string) => void;
  onClearRecentSearches: () => void;
};

const urlUpdateDelayMs = 500;

export function CountriesToolbar({
  totalCount,
  visibleCount,
  query,
  isSearching,
  recentSearches,
  onQueryChange,
  onClearQuery,
  onSelectRecentSearch,
  onClearRecentSearches,
}: CountriesToolbarProps) {
  const [draftQuery, setDraftQuery] = useState(query);
  const updateTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (updateTimeoutRef.current !== null) {
        window.clearTimeout(updateTimeoutRef.current);
      }
    };
  }, []);

  function clearPendingUrlUpdate() {
    if (updateTimeoutRef.current !== null) {
      window.clearTimeout(updateTimeoutRef.current);
      updateTimeoutRef.current = null;
    }
  }

  function scheduleUrlUpdate(nextQuery: string) {
    clearPendingUrlUpdate();

    updateTimeoutRef.current = window.setTimeout(() => {
      onQueryChange(nextQuery);
      updateTimeoutRef.current = null;
    }, urlUpdateDelayMs);
  }

  function handleQueryChange(nextQuery: string) {
    setDraftQuery(nextQuery);
    scheduleUrlUpdate(nextQuery);
  }

  function handleClearQuery() {
    clearPendingUrlUpdate();
    setDraftQuery("");
    onClearQuery();
  }

  function handleSelectRecentSearch(nextQuery: string) {
    clearPendingUrlUpdate();
    setDraftQuery(nextQuery);
    onSelectRecentSearch(nextQuery);
  }

  return (
    <div className="rounded-card border border-border bg-surface p-5 shadow-panel">
      <div className="grid gap-4 lg:grid-cols-[1fr_220px] lg:items-end">
        <Input
          label="Search destinations"
          name="country-search"
          placeholder="Try Spain, Japan or Peru"
          helperText="Search updates the URL, for example /countries?q=spain."
          value={draftQuery}
          onChange={(event) => handleQueryChange(event.target.value)}
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

        {isSearching ? (
          <Button size="sm" variant="secondary" onClick={handleClearQuery}>
            Clear search
          </Button>
        ) : (
          <p className="font-semibold text-muted-strong">
            Live country data, search ready
          </p>
        )}
      </div>

      {recentSearches.length > 0 ? (
        <div className="mt-5 border-t border-border pt-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="travel-label text-muted">Recent searches</p>

            <button
              type="button"
              onClick={onClearRecentSearches}
              className="w-fit text-xs font-black uppercase tracking-[0.16em] text-muted-strong underline-offset-4 hover:text-foreground hover:underline"
            >
              Clear recent
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {recentSearches.map((search) => (
              <button
                key={search}
                type="button"
                onClick={() => handleSelectRecentSearch(search)}
                className="rounded-full border border-border bg-surface-soft px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-muted-strong transition hover:border-border-strong hover:text-foreground"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}