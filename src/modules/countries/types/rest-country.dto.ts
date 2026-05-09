export type RestCountryNameDto = {
  common: string;
  official: string;
  nativeName?: Record<
    string,
    {
      official: string;
      common: string;
    }
  >;
};

export type RestCountryCurrencyDto = {
  name: string;
  symbol?: string;
};

export type RestCountryFlagsDto = {
  png?: string;
  svg?: string;
  alt?: string;
};

export type RestCountryMapsDto = {
  googleMaps?: string;
  openStreetMaps?: string;
};

export type RestCountryCarDto = {
  signs?: string[];
  side?: string;
};

export type RestCountryCapitalInfoDto = {
  latlng?: number[];
};

export type RestCountryCoatOfArmsDto = {
  png?: string;
  svg?: string;
};

export type RestCountryDemonymDto = {
  f?: string;
  m?: string;
};

export type RestCountryDto = {
  name: RestCountryNameDto;
  tld?: string[];
  cca2: string;
  ccn3?: string;
  cca3: string;
  cioc?: string;
  independent?: boolean;
  status?: string;
  unMember?: boolean;
  currencies?: Record<string, RestCountryCurrencyDto>;
  capital?: string[];
  altSpellings?: string[];
  region?: string;
  subregion?: string;
  languages?: Record<string, string>;
  translations?: Record<
    string,
    {
      official: string;
      common: string;
    }
  >;
  latlng?: number[];
  landlocked?: boolean;
  borders?: string[];
  area?: number;
  demonyms?: Record<string, RestCountryDemonymDto>;
  flag?: string;
  maps?: RestCountryMapsDto;
  population?: number;
  gini?: Record<string, number>;
  fifa?: string;
  car?: RestCountryCarDto;
  timezones?: string[];
  continents?: string[];
  flags?: RestCountryFlagsDto;
  coatOfArms?: RestCountryCoatOfArmsDto;
  startOfWeek?: string;
  capitalInfo?: RestCountryCapitalInfoDto;
};