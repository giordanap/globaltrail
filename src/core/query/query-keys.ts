import type {
  CountryRegion,
  CountrySearchParams,
} from "@/modules/countries/types";

export const queryKeys = {
  all: ["globaltrail"] as const,

  countries: {
    all: () => [...queryKeys.all, "countries"] as const,

    lists: () => [...queryKeys.countries.all(), "list"] as const,

    list: (params?: CountrySearchParams) =>
      [...queryKeys.countries.lists(), params ?? {}] as const,

    search: (query: string) =>
      [...queryKeys.countries.all(), "search", query] as const,

    byRegion: (region: CountryRegion) =>
      [...queryKeys.countries.all(), "region", region] as const,

    details: () => [...queryKeys.countries.all(), "detail"] as const,

    detail: (code: string) =>
      [...queryKeys.countries.details(), code.toUpperCase()] as const,
  },

  weather: {
    all: () => [...queryKeys.all, "weather"] as const,

    forecast: (lat: number, lng: number) =>
      [
        ...queryKeys.weather.all(),
        "forecast",
        Number(lat.toFixed(4)),
        Number(lng.toFixed(4)),
      ] as const,
  },

  currency: {
    all: () => [...queryKeys.all, "currency"] as const,

    currencies: () => [...queryKeys.currency.all(), "currencies"] as const,

    conversion: (amount: number, from: string, to: string) =>
      [
        ...queryKeys.currency.all(),
        "conversion",
        amount,
        from.toUpperCase(),
        to.toUpperCase(),
      ] as const,
  },

  holidays: {
    all: () => [...queryKeys.all, "holidays"] as const,

    publicHolidays: (year: number, countryCode: string) =>
      [
        ...queryKeys.holidays.all(),
        "public",
        year,
        countryCode.toUpperCase(),
      ] as const,

    longWeekends: (year: number, countryCode: string) =>
      [
        ...queryKeys.holidays.all(),
        "long-weekends",
        year,
        countryCode.toUpperCase(),
      ] as const,
  },
} as const;