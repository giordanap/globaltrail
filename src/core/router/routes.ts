function encodeRouteParam(value: string) {
  return encodeURIComponent(value.trim().toUpperCase());
}

export const routes = {
  home: "/",
  countries: "/countries",
  country: "/country",
  countryDetail: (code: string) => `/country?code=${encodeRouteParam(code)}`,
  compare: "/compare",
  compareDestination: (left: string) =>
    `/compare?left=${encodeRouteParam(left)}`,
  compareCountries: (left: string, right: string) =>
    `/compare?left=${encodeRouteParam(left)}&right=${encodeRouteParam(right)}`,
  planner: "/planner",
  plannerDestination: (code: string) =>
    `/planner?destination=${encodeRouteParam(code)}`,
  favorites: "/favorites",
  states: "/states",
} as const;