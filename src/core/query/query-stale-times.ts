export const queryStaleTimes = {
  countriesList: 1000 * 60 * 60 * 24,
  countryDetail: 1000 * 60 * 60 * 24,
  weatherForecast: 1000 * 60 * 20,
  currencyConversion: 1000 * 60 * 60 * 6,
  publicHolidays: 1000 * 60 * 60 * 24 * 7,
} as const;

export const queryGcTimes = {
  short: 1000 * 60 * 30,
  medium: 1000 * 60 * 60 * 6,
  long: 1000 * 60 * 60 * 24,
} as const;