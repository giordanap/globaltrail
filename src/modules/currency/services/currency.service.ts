import { frankfurterClient } from "@/core/api/frankfurter/frankfurter.client";
import {
  mapFrankfurterConversionToCurrencyConversion,
  mapFrankfurterCurrenciesToOptions,
} from "@/modules/currency/mappers";
import type {
  CurrencyConversion,
  CurrencyOption,
  FrankfurterConversionDto,
  FrankfurterCurrenciesDto,
} from "@/modules/currency/types";

export async function getCurrencies(): Promise<CurrencyOption[]> {
  const currencies =
    await frankfurterClient.get<FrankfurterCurrenciesDto>("/currencies");

  return mapFrankfurterCurrenciesToOptions(currencies);
}

export async function convertCurrency({
  amount,
  from,
  to,
}: {
  amount: number;
  from: string;
  to: string;
}): Promise<CurrencyConversion> {
  const normalizedFrom = from.trim().toUpperCase();
  const normalizedTo = to.trim().toUpperCase();
  const normalizedAmount = Number.isFinite(amount) && amount > 0 ? amount : 1;

  if (!normalizedFrom || !normalizedTo || normalizedFrom === normalizedTo) {
    return {
      amount: normalizedAmount,
      from: normalizedFrom,
      to: normalizedTo,
      convertedAmount:
        normalizedFrom && normalizedTo && normalizedFrom === normalizedTo
          ? normalizedAmount
          : null,
      rate:
        normalizedFrom && normalizedTo && normalizedFrom === normalizedTo
          ? 1
          : null,
      date: null,
    };
  }

  const conversion = await frankfurterClient.get<FrankfurterConversionDto>(
    "/latest",
    {
      query: {
        amount: normalizedAmount,
        from: normalizedFrom,
        to: normalizedTo,
      },
    },
  );

  return mapFrankfurterConversionToCurrencyConversion(
    conversion,
    normalizedTo,
  );
}