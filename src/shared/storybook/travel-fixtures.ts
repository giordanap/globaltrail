import type { Country, CountrySummary } from "@/modules/countries/types";
import type { FavoriteDestination } from "@/modules/favorites/types";
import type { TravelPlan } from "@/modules/planner/types";

export const spainCountrySummary: CountrySummary = {
  code: "ES",
  alpha2Code: "ES",
  alpha3Code: "ESP",
  name: "Spain",
  officialName: "Kingdom of Spain",
  capital: "Madrid",
  region: "Europe",
  subregion: "Southern Europe",
  population: 47351567,
  currencies: [
    {
      code: "EUR",
      name: "Euro",
      symbol: "€",
    },
  ],
  languages: [
    {
      code: "spa",
      name: "Spanish",
    },
    {
      code: "cat",
      name: "Catalan",
    },
  ],
  flag: {
    png: "https://flagcdn.com/w320/es.png",
    svg: "https://flagcdn.com/es.svg",
    alt: "The flag of Spain is composed of three horizontal bands of red, yellow and red.",
  },
  coordinates: {
    lat: 40,
    lng: -4,
  },
};

export const japanCountrySummary: CountrySummary = {
  code: "JP",
  alpha2Code: "JP",
  alpha3Code: "JPN",
  name: "Japan",
  officialName: "Japan",
  capital: "Tokyo",
  region: "Asia",
  subregion: "Eastern Asia",
  population: 125836021,
  currencies: [
    {
      code: "JPY",
      name: "Japanese yen",
      symbol: "¥",
    },
  ],
  languages: [
    {
      code: "jpn",
      name: "Japanese",
    },
  ],
  flag: {
    png: "https://flagcdn.com/w320/jp.png",
    svg: "https://flagcdn.com/jp.svg",
    alt: "The flag of Japan features a crimson-red circle at the center of a white field.",
  },
  coordinates: {
    lat: 36,
    lng: 138,
  },
};

export const peruCountrySummary: CountrySummary = {
  code: "PE",
  alpha2Code: "PE",
  alpha3Code: "PER",
  name: "Peru",
  officialName: "Republic of Peru",
  capital: "Lima",
  region: "Americas",
  subregion: "South America",
  population: 32971846,
  currencies: [
    {
      code: "PEN",
      name: "Peruvian sol",
      symbol: "S/",
    },
  ],
  languages: [
    {
      code: "spa",
      name: "Spanish",
    },
    {
      code: "que",
      name: "Quechua",
    },
  ],
  flag: {
    png: "https://flagcdn.com/w320/pe.png",
    svg: "https://flagcdn.com/pe.svg",
    alt: "The flag of Peru is composed of three vertical bands of red, white and red.",
  },
  coordinates: {
    lat: -10,
    lng: -76,
  },
};

export const spainCountry: Country = {
  ...spainCountrySummary,
  area: 505992,
  continents: ["Europe"],
  timezones: ["UTC", "UTC+01:00"],
  borders: ["AND", "FRA", "GIB", "PRT", "MAR"],
  maps: {
    googleMaps: "https://goo.gl/maps/138JaXW8EZzRVitY9",
    openStreetMaps: "https://www.openstreetmap.org/relation/1311341",
  },
  independent: true,
  unMember: true,
  landlocked: false,
  startOfWeek: "monday",
  capitalCoordinates: {
    lat: 40.4,
    lng: -3.68,
  },
  carSide: "right",
};

export const japanCountry: Country = {
  ...japanCountrySummary,
  area: 377930,
  continents: ["Asia"],
  timezones: ["UTC+09:00"],
  borders: [],
  maps: {
    googleMaps: "https://goo.gl/maps/NGTLSCSrA8bMrvnX9",
    openStreetMaps: "https://www.openstreetmap.org/relation/382313",
  },
  independent: true,
  unMember: true,
  landlocked: false,
  startOfWeek: "monday",
  capitalCoordinates: {
    lat: 35.68,
    lng: 139.75,
  },
  carSide: "left",
};

export const spainFavoriteDestination: FavoriteDestination = {
  code: "ES",
  alpha3Code: "ESP",
  name: "Spain",
  officialName: "Kingdom of Spain",
  capital: "Madrid",
  region: "Europe",
  subregion: "Southern Europe",
  population: 47351567,
  flag: spainCountrySummary.flag,
  savedAt: "2026-05-10T09:30:00.000Z",
};

export const japanFavoriteDestination: FavoriteDestination = {
  code: "JP",
  alpha3Code: "JPN",
  name: "Japan",
  officialName: "Japan",
  capital: "Tokyo",
  region: "Asia",
  subregion: "Eastern Asia",
  population: 125836021,
  flag: japanCountrySummary.flag,
  savedAt: "2026-05-08T13:15:00.000Z",
};

export const planningTravelPlan: TravelPlan = {
  id: "plan-spain-spring",
  title: "Spring route through Spain",
  destinationCode: "ES",
  destinationName: "Spain",
  notes:
    "Compare Madrid and Valencia for a flexible spring trip. Review train routes, local holidays and weather before setting dates.",
  status: "planning",
  dateRange: {
    startDate: "2026-04-12",
    endDate: "2026-04-21",
  },
  budget: {
    amount: 1800,
    currencyCode: "EUR",
  },
  createdAt: "2026-05-01T10:00:00.000Z",
  updatedAt: "2026-05-10T11:00:00.000Z",
};

export const ideaTravelPlan: TravelPlan = {
  id: "plan-japan-autumn",
  title: "Autumn Japan idea",
  destinationCode: "JP",
  destinationName: "Japan",
  notes:
    "Keep this as a long-term idea. Check regional weather, public holidays and budget before choosing a route.",
  status: "idea",
  dateRange: {
    startDate: null,
    endDate: null,
  },
  budget: {
    amount: null,
    currencyCode: null,
  },
  createdAt: "2026-05-02T10:00:00.000Z",
  updatedAt: "2026-05-09T14:00:00.000Z",
};