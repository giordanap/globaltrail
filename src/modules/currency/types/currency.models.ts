export type CurrencyOption = {
  code: string;
  name: string;
};

export type CurrencyConversion = {
  amount: number;
  from: string;
  to: string;
  convertedAmount: number | null;
  rate: number | null;
  date: string | null;
};