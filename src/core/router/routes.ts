export const routes = {
  home: "/",
  countries: "/countries",
  country: "/country",
  countryDetail: (code: string) => `/country?code=${code}`,
  compare: "/compare",
  compareCountries: (left: string, right: string) =>
    `/compare?left=${left}&right=${right}`,
  planner: "/planner",
  favorites: "/favorites",
  states: "/states",
} as const;