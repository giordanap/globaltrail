export type ApiProvider =
  | "restCountries"
  | "openMeteo"
  | "frankfurter"
  | "nagerDate";

export type ApiProviderConfig = {
  key: ApiProvider;
  displayName: string;
  baseUrl: string;
  timeoutMs: number;
};

export const apiProviders: Record<ApiProvider, ApiProviderConfig> = {
  restCountries: {
    key: "restCountries",
    displayName: "REST Countries",
    baseUrl: "https://restcountries.com/v3.1",
    timeoutMs: 8_000,
  },
  openMeteo: {
    key: "openMeteo",
    displayName: "Open-Meteo",
    baseUrl: "https://api.open-meteo.com/v1",
    timeoutMs: 8_000,
  },
  frankfurter: {
    key: "frankfurter",
    displayName: "Frankfurter",
    baseUrl: "https://api.frankfurter.app",
    timeoutMs: 8_000,
  },
  nagerDate: {
    key: "nagerDate",
    displayName: "Nager.Date",
    baseUrl: "https://date.nager.at/api/v3",
    timeoutMs: 8_000,
  },
};