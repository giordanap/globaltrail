export type CountryRegion =
  | "Africa"
  | "Americas"
  | "Asia"
  | "Europe"
  | "Oceania"
  | "Antarctic"
  | "Unknown";

export type CountryCoordinates = {
  lat: number;
  lng: number;
};

export type CountryCurrency = {
  code: string;
  name: string;
  symbol: string | null;
};

export type CountryLanguage = {
  code: string;
  name: string;
};

export type CountryFlag = {
  png: string | null;
  svg: string | null;
  alt: string;
};

export type CountryMapLinks = {
  googleMaps: string | null;
  openStreetMaps: string | null;
};

export type CountrySummary = {
  code: string;
  alpha2Code: string;
  alpha3Code: string;
  name: string;
  officialName: string;
  capital: string | null;
  region: CountryRegion;
  subregion: string | null;
  population: number;
  currencies: CountryCurrency[];
  languages: CountryLanguage[];
  flag: CountryFlag;
  coordinates: CountryCoordinates | null;
};

export type Country = CountrySummary & {
  area: number;
  continents: string[];
  timezones: string[];
  borders: string[];
  maps: CountryMapLinks;
  independent: boolean | null;
  unMember: boolean;
  landlocked: boolean;
  startOfWeek: string | null;
  capitalCoordinates: CountryCoordinates | null;
  carSide: string | null;
};

export type CountrySortField = "name" | "population";

export type CountrySortDirection = "asc" | "desc";

export type CountryFilters = {
  query: string;
  region: CountryRegion | "All";
  currencyCode: string | null;
  languageCode: string | null;
};

export type CountrySearchParams = {
  query?: string;
  region?: CountryRegion;
  sortBy?: CountrySortField;
  sortDirection?: CountrySortDirection;
};