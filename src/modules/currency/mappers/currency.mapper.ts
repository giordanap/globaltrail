import type {
  CurrencyConversion,
  CurrencyOption,
  FrankfurterConversionDto,
  FrankfurterCurrenciesDto,
} from "@/modules/currency/types";

export function mapFrankfurterCurrenciesToOptions(
  currencies: FrankfurterCurrenciesDto,
): CurrencyOption[] {
  return Object.entries(currencies)
    .map(([code, name]) => ({
      code,
      name,
    }))
    .sort((left, right) => left.code.localeCompare(right.code));
}

export function mapFrankfurterConversionToCurrencyConversion(
  conversion: FrankfurterConversionDto,
  to: string,
): CurrencyConversion {
  const normalizedTo = to.toUpperCase();
  const convertedAmount = conversion.rates[normalizedTo] ?? null;

  return {
    amount: conversion.amount,
    from: conversion.base,
    to: normalizedTo,
    convertedAmount,
    rate:
      convertedAmount !== null && conversion.amount > 0
        ? convertedAmount / conversion.amount
        : null,
    date: conversion.date ?? null,
  };
}