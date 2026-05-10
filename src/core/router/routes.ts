export type CompareRouteSelection = {
  left?: string | null;
  right?: string | null;
};

function encodeQueryValue(value: string) {
  return encodeURIComponent(value.trim());
}

function encodeRouteParam(value: string) {
  return encodeQueryValue(value.trim().toUpperCase());
}

function buildQueryString(params: Array<[string, string | null | undefined]>) {
  const queryString = params
    .filter(([, value]) => Boolean(value))
    .map(([key, value]) => `${encodeQueryValue(key)}=${encodeQueryValue(value ?? "")}`)
    .join("&");

  return queryString;
}

export const routes = {
  home: "/",
  countries: "/countries",
  country: "/country",
  countryDetail: (code: string) => `/country?code=${encodeRouteParam(code)}`,
  compare: "/compare",
  compareSelection: ({ left, right }: CompareRouteSelection) => {
    const queryString = buildQueryString([
      ["left", left ? left.trim().toUpperCase() : null],
      ["right", right ? right.trim().toUpperCase() : null],
    ]);

    return queryString ? `/compare?${queryString}` : "/compare";
  },
  compareDestination: (left: string) =>
    `/compare?left=${encodeRouteParam(left)}`,
  compareCountries: (left: string, right: string) =>
    `/compare?left=${encodeRouteParam(left)}&right=${encodeRouteParam(right)}`,
  planner: "/planner",
  plannerDestination: (code: string) =>
    `/planner?destination=${encodeRouteParam(code)}`,
  plannerPlan: (planId: string) => `/planner?plan=${encodeQueryValue(planId)}`,
  plannerDestinationPlan: (code: string, planId: string) =>
    `/planner?destination=${encodeRouteParam(code)}&plan=${encodeQueryValue(
      planId,
    )}`,
  favorites: "/favorites",
  states: "/states",
} as const;