"use client";

import { useMemo, useState } from "react";
import type { CountryCurrency } from "@/modules/countries/types";
import {
  useCurrenciesQuery,
  useCurrencyConversionQuery,
} from "@/modules/currency/hooks/use-currency-query";
import { SkeletonBlock } from "@/shared/components/feedback/skeleton-block";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Select } from "@/shared/components/ui/select";

type CurrencyConverterPanelProps = {
  currencies: CountryCurrency[];
};

const defaultTargetCurrency = "USD";

const amountFormatter = new Intl.NumberFormat("en", {
  maximumFractionDigits: 2,
});

const rateFormatter = new Intl.NumberFormat("en", {
  maximumFractionDigits: 4,
});

function getPrimaryCurrency(currencies: CountryCurrency[]) {
  return currencies[0] ?? null;
}

function parseAmount(value: string) {
  const parsedValue = Number(value.replace(",", "."));

  return Number.isFinite(parsedValue) && parsedValue > 0 ? parsedValue : 1;
}

function formatAmount(value: number | null) {
  if (value === null) {
    return "Unavailable";
  }

  return amountFormatter.format(value);
}

function CurrencyConverterSkeleton() {
  return (
    <Card className="p-6">
      <SkeletonBlock className="h-5 w-40 rounded-full" />
      <SkeletonBlock className="mt-6 h-20 rounded-2xl" />
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <SkeletonBlock className="h-12 rounded-2xl" />
        <SkeletonBlock className="h-12 rounded-2xl" />
      </div>
    </Card>
  );
}

export function CurrencyConverterPanel({
  currencies,
}: CurrencyConverterPanelProps) {
  const primaryCurrency = getPrimaryCurrency(currencies);
  const [amountInput, setAmountInput] = useState("100");
  const [targetCurrency, setTargetCurrency] = useState(defaultTargetCurrency);

  const amount = parseAmount(amountInput);
  const sourceCurrencyCode = primaryCurrency?.code ?? "";

  const currenciesQuery = useCurrenciesQuery({
    enabled: Boolean(primaryCurrency),
  });

  const conversionQuery = useCurrencyConversionQuery(
    amount,
    sourceCurrencyCode,
    targetCurrency,
    {
      enabled: Boolean(primaryCurrency),
    },
  );

  const currencyOptions = useMemo(() => {
    if (!currenciesQuery.data?.length) {
      return [
        { code: "USD", name: "US Dollar" },
        { code: "EUR", name: "Euro" },
        { code: "GBP", name: "Pound Sterling" },
        { code: "JPY", name: "Japanese Yen" },
      ];
    }

    return currenciesQuery.data;
  }, [currenciesQuery.data]);

  if (!primaryCurrency) {
    return (
      <Card className="p-6">
        <Badge variant="sand">Currency unavailable</Badge>
        <h2 className="mt-5 text-xl font-black tracking-[-0.03em] text-foreground">
          No local currency found.
        </h2>
        <p className="mt-3 text-sm leading-7 text-muted-strong">
          This destination does not include currency data, so conversion cannot
          be calculated yet.
        </p>
      </Card>
    );
  }

  if (currenciesQuery.isLoading && conversionQuery.isLoading) {
    return <CurrencyConverterSkeleton />;
  }

  const conversion = conversionQuery.data;

  return (
    <Card className="overflow-hidden p-0">
      <div className="bg-[radial-gradient(circle_at_top_right,_rgba(223,238,230,0.9),_transparent_16rem),linear-gradient(135deg,_rgba(255,255,255,1),_rgba(251,246,238,1))] p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="travel-label text-muted">Currency converter</p>
            <h2 className="mt-3 text-2xl font-black tracking-[-0.04em] text-foreground">
              {primaryCurrency.code} to {targetCurrency}
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-strong">
              Convert from the destination&apos;s primary local currency.
            </p>
          </div>

          <Badge variant="sage">Frankfurter</Badge>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_180px]">
          <Input
            label={`Amount in ${primaryCurrency.code}`}
            name="currency-amount"
            inputMode="decimal"
            value={amountInput}
            onChange={(event) => setAmountInput(event.target.value)}
            helperText={primaryCurrency.name}
          />

          <Select
            label="Convert to"
            name="target-currency"
            value={targetCurrency}
            onChange={(event) => setTargetCurrency(event.target.value)}
            helperText="Target currency"
          >
            {currencyOptions.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.code}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="border-t border-border p-6">
        {conversionQuery.isError ? (
          <div>
            <Badge variant="terracotta">Conversion unavailable</Badge>
            <h3 className="mt-5 text-xl font-black tracking-[-0.03em] text-foreground">
              We could not convert this amount.
            </h3>
            <p className="mt-3 text-sm leading-7 text-muted-strong">
              Currency conversion is temporarily unavailable. The rest of the
              destination insight remains available.
            </p>
            <Button
              className="mt-6"
              onClick={() => void conversionQuery.refetch()}
              disabled={conversionQuery.isRefetching}
            >
              {conversionQuery.isRefetching ? "Retrying..." : "Try again"}
            </Button>
          </div>
        ) : (
          <div>
            <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-muted">
              Converted amount
            </p>

            <p className="mt-3 text-4xl font-black tracking-[-0.07em] text-foreground">
              {conversionQuery.isLoading
                ? "Loading..."
                : `${formatAmount(conversion?.convertedAmount ?? null)} ${
                    conversion?.to ?? targetCurrency
                  }`}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-surface px-4 py-3">
                <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-muted">
                  Rate
                </p>
                <p className="mt-2 text-sm font-black text-foreground">
                  {conversion?.rate
                    ? `1 ${conversion.from} = ${rateFormatter.format(
                        conversion.rate,
                      )} ${conversion.to}`
                    : "Unavailable"}
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-surface px-4 py-3">
                <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-muted">
                  Date
                </p>
                <p className="mt-2 text-sm font-black text-foreground">
                  {conversion?.date ?? "Latest available"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}