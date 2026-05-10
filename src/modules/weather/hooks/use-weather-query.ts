"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/core/query/query-keys";
import { queryStaleTimes } from "@/core/query/query-stale-times";
import { getWeatherForecast } from "@/modules/weather/services/weather.service";

type UseWeatherForecastQueryOptions = {
  enabled?: boolean;
};

export function useWeatherForecastQuery(
  lat: number | null | undefined,
  lng: number | null | undefined,
  options: UseWeatherForecastQueryOptions = {},
) {
  const hasCoordinates = Number.isFinite(lat) && Number.isFinite(lng);
  const latitude = lat ?? 0;
  const longitude = lng ?? 0;

  return useQuery({
    queryKey: queryKeys.weather.forecast(latitude, longitude),
    queryFn: () => getWeatherForecast(latitude, longitude),
    staleTime: queryStaleTimes.weatherForecast,
    enabled: hasCoordinates && (options.enabled ?? true),
  });
}