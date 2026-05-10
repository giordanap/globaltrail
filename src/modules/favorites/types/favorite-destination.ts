import type {
  Country,
  CountryFlag,
  CountryRegion,
  CountrySummary,
} from "@/modules/countries/types";

export type FavoriteDestination = {
  code: string;
  alpha3Code: string;
  name: string;
  officialName: string;
  capital: string | null;
  region: CountryRegion;
  subregion: string | null;
  population: number;
  flag: CountryFlag;
  savedAt: string;
};

export function createFavoriteFromCountrySummary(
  country: CountrySummary,
): FavoriteDestination {
  return {
    code: country.alpha2Code,
    alpha3Code: country.alpha3Code,
    name: country.name,
    officialName: country.officialName,
    capital: country.capital,
    region: country.region,
    subregion: country.subregion,
    population: country.population,
    flag: country.flag,
    savedAt: new Date().toISOString(),
  };
}

export function createFavoriteFromCountry(
  country: Country,
): FavoriteDestination {
  return {
    code: country.alpha2Code,
    alpha3Code: country.alpha3Code,
    name: country.name,
    officialName: country.officialName,
    capital: country.capital,
    region: country.region,
    subregion: country.subregion,
    population: country.population,
    flag: country.flag,
    savedAt: new Date().toISOString(),
  };
}