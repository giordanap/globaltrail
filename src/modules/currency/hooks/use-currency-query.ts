"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/core/query/query-keys";
import { queryStaleTimes } from "@/core/query/query-stale-times";
import {
  convertCurrency,
  getCurrencies,
} from "@/modules/currency/services/currency.service";

type UseCurrencyQueryOptions = {
  enabled?: boolean;
};

export function useCurrenciesQuery(options: UseCurrencyQueryOptions = {}) {
  return useQuery({
    queryKey: queryKeys.currency.currencies(),
    queryFn: getCurrencies,
    staleTime: queryStaleTimes.currencyConversion,
    enabled: options.enabled ?? true,
  });
}

export function useCurrencyConversionQuery(
  amount: number,
  from: string,
  to: string,
  options: UseCurrencyQueryOptions = {},
) {
  const normalizedFrom = from.trim().toUpperCase();
  const normalizedTo = to.trim().toUpperCase();
  const normalizedAmount = Number.isFinite(amount) && amount > 0 ? amount : 1;
  const hasCurrencies = Boolean(normalizedFrom) && Boolean(normalizedTo);

  return useQuery({
    queryKey: queryKeys.currency.conversion(
      normalizedAmount,
      normalizedFrom,
      normalizedTo,
    ),
    queryFn: () =>
      convertCurrency({
        amount: normalizedAmount,
        from: normalizedFrom,
        to: normalizedTo,
      }),
    staleTime: queryStaleTimes.currencyConversion,
    enabled: hasCurrencies && (options.enabled ?? true),
  });
}