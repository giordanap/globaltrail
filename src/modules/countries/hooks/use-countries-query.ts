"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/core/query/query-keys";
import { queryStaleTimes } from "@/core/query/query-stale-times";
import {
  getCountries,
  getCountryByCode,
  searchCountriesByName,
} from "@/modules/countries/services/countries.service";

type UseCountriesQueryOptions = {
  enabled?: boolean;
};

export function useCountriesQuery(options: UseCountriesQueryOptions = {}) {
  return useQuery({
    queryKey: queryKeys.countries.list(),
    queryFn: getCountries,
    staleTime: queryStaleTimes.countriesList,
    enabled: options.enabled ?? true,
  });
}

export function useCountrySearchQuery(
  query: string,
  options: UseCountriesQueryOptions = {},
) {
  const normalizedQuery = query.trim();

  return useQuery({
    queryKey: queryKeys.countries.search(normalizedQuery),
    queryFn: () => searchCountriesByName(normalizedQuery),
    staleTime: queryStaleTimes.countriesList,
    enabled: Boolean(normalizedQuery) && (options.enabled ?? true),
  });
}

export function useCountryDetailQuery(
  code: string,
  options: UseCountriesQueryOptions = {},
) {
  const normalizedCode = code.trim().toUpperCase();

  return useQuery({
    queryKey: queryKeys.countries.detail(normalizedCode),
    queryFn: () => getCountryByCode(normalizedCode),
    staleTime: queryStaleTimes.countryDetail,
    enabled: Boolean(normalizedCode) && (options.enabled ?? true),
  });
}