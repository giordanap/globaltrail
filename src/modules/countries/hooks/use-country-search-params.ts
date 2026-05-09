"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import type {
  CountryRegion,
  CountrySortDirection,
  CountrySortField,
} from "@/modules/countries/types";

type CountryRegionFilter = CountryRegion | "All";

const validRegions: CountryRegion[] = [
  "Africa",
  "Americas",
  "Asia",
  "Europe",
  "Oceania",
  "Antarctic",
  "Unknown",
];

const validSortFields: CountrySortField[] = ["name", "population"];
const validSortDirections: CountrySortDirection[] = ["asc", "desc"];

function parseRegion(value: string | null): CountryRegionFilter {
  if (!value) {
    return "All";
  }

  return validRegions.includes(value as CountryRegion)
    ? (value as CountryRegion)
    : "All";
}

function parseSortField(value: string | null): CountrySortField {
  return validSortFields.includes(value as CountrySortField)
    ? (value as CountrySortField)
    : "name";
}

function parseSortDirection(value: string | null): CountrySortDirection {
  return validSortDirections.includes(value as CountrySortDirection)
    ? (value as CountrySortDirection)
    : "asc";
}

export function useCountrySearchParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("q")?.trim() ?? "";
  const region = parseRegion(searchParams.get("region"));
  const sortBy = parseSortField(searchParams.get("sort"));
  const sortDirection = parseSortDirection(searchParams.get("dir"));

  const replaceParams = useCallback(
    (nextValues: {
      query?: string;
      region?: CountryRegionFilter;
      sortBy?: CountrySortField;
      sortDirection?: CountrySortDirection;
    }) => {
      const params = new URLSearchParams(searchParams.toString());

      if ("query" in nextValues) {
        const normalizedQuery = nextValues.query?.trim() ?? "";

        if (normalizedQuery) {
          params.set("q", normalizedQuery);
        } else {
          params.delete("q");
        }
      }

      if ("region" in nextValues) {
        if (nextValues.region && nextValues.region !== "All") {
          params.set("region", nextValues.region);
        } else {
          params.delete("region");
        }
      }

      if ("sortBy" in nextValues) {
        if (nextValues.sortBy && nextValues.sortBy !== "name") {
          params.set("sort", nextValues.sortBy);
        } else {
          params.delete("sort");
        }
      }

      if ("sortDirection" in nextValues) {
        if (nextValues.sortDirection && nextValues.sortDirection !== "asc") {
          params.set("dir", nextValues.sortDirection);
        } else {
          params.delete("dir");
        }
      }

      const nextSearch = params.toString();
      const nextUrl = nextSearch ? `${pathname}?${nextSearch}` : pathname;

      router.replace(nextUrl, {
        scroll: false,
      });
    },
    [pathname, router, searchParams],
  );

  const setQuery = useCallback(
    (nextQuery: string) => {
      replaceParams({
        query: nextQuery,
      });
    },
    [replaceParams],
  );

  const clearQuery = useCallback(() => {
    replaceParams({
      query: "",
    });
  }, [replaceParams]);

  const setRegion = useCallback(
    (nextRegion: CountryRegionFilter) => {
      replaceParams({
        region: nextRegion,
      });
    },
    [replaceParams],
  );

  const setSort = useCallback(
    (
      nextSortBy: CountrySortField,
      nextSortDirection: CountrySortDirection,
    ) => {
      replaceParams({
        sortBy: nextSortBy,
        sortDirection: nextSortDirection,
      });
    },
    [replaceParams],
  );

  const clearFilters = useCallback(() => {
    replaceParams({
      query: "",
      region: "All",
      sortBy: "name",
      sortDirection: "asc",
    });
  }, [replaceParams]);

  return {
    query,
    region,
    sortBy,
    sortDirection,
    setQuery,
    clearQuery,
    setRegion,
    setSort,
    clearFilters,
  };
}