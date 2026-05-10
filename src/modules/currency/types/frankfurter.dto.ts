export type FrankfurterCurrenciesDto = Record<string, string>;

export type FrankfurterConversionDto = {
  amount: number;
  base: string;
  date: string;
  rates: Record<string, number>;
};