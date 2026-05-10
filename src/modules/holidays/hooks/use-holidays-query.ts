"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/core/query/query-keys";
import { queryStaleTimes } from "@/core/query/query-stale-times";
import {
  getLongWeekends,
  getPublicHolidays,
} from "@/modules/holidays/services/holidays.service";

type UseHolidaysQueryOptions = {
  enabled?: boolean;
};

export function usePublicHolidaysQuery(
  year: number,
  countryCode: string,
  options: UseHolidaysQueryOptions = {},
) {
  const normalizedCountryCode = countryCode.trim().toUpperCase();

  return useQuery({
    queryKey: queryKeys.holidays.publicHolidays(year, normalizedCountryCode),
    queryFn: () =>
      getPublicHolidays({
        year,
        countryCode: normalizedCountryCode,
      }),
    staleTime: queryStaleTimes.publicHolidays,
    enabled: Boolean(normalizedCountryCode) && (options.enabled ?? true),
  });
}

export function useLongWeekendsQuery(
  year: number,
  countryCode: string,
  options: UseHolidaysQueryOptions = {},
) {
  const normalizedCountryCode = countryCode.trim().toUpperCase();

  return useQuery({
    queryKey: queryKeys.holidays.longWeekends(year, normalizedCountryCode),
    queryFn: () =>
      getLongWeekends({
        year,
        countryCode: normalizedCountryCode,
      }),
    staleTime: queryStaleTimes.publicHolidays,
    enabled: Boolean(normalizedCountryCode) && (options.enabled ?? true),
  });
}