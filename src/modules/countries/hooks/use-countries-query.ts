"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/core/query/query-keys";
import { queryStaleTimes } from "@/core/query/query-stale-times";
import { getCountries } from "@/modules/countries/services/countries.service";

export function useCountriesQuery() {
  return useQuery({
    queryKey: queryKeys.countries.list(),
    queryFn: getCountries,
    staleTime: queryStaleTimes.countriesList,
  });
}