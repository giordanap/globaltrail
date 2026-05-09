import type {
  Country,
  CountryCoordinates,
  CountryCurrency,
  CountryFlag,
  CountryLanguage,
  CountryMapLinks,
  CountryRegion,
  CountrySummary,
  CountrySortDirection,
  CountrySortField,
  RestCountryDto,
} from "@/modules/countries/types";

function toNullableString(value: string | undefined) {
  const normalizedValue = value?.trim();

  return normalizedValue ? normalizedValue : null;
}

function getFirstValue(values: string[] | undefined) {
  return values?.[0]?.trim() || null;
}

function mapRegion(region: string | undefined): CountryRegion {
  switch (region) {
    case "Africa":
    case "Americas":
    case "Asia":
    case "Europe":
    case "Oceania":
    case "Antarctic":
      return region;
    default:
      return "Unknown";
  }
}

function mapCoordinates(values: number[] | undefined): CountryCoordinates | null {
  const [lat, lng] = values ?? [];

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return null;
  }

  return {
    lat,
    lng,
  };
}

function mapCurrencies(
  currencies: RestCountryDto["currencies"],
): CountryCurrency[] {
  if (!currencies) {
    return [];
  }

  return Object.entries(currencies)
    .map(([code, currency]) => ({
      code,
      name: currency.name,
      symbol: currency.symbol ?? null,
    }))
    .sort((left, right) => left.code.localeCompare(right.code));
}

function mapLanguages(languages: RestCountryDto["languages"]): CountryLanguage[] {
  if (!languages) {
    return [];
  }

  return Object.entries(languages)
    .map(([code, name]) => ({
      code,
      name,
    }))
    .sort((left, right) => left.name.localeCompare(right.name));
}

function mapFlag(country: RestCountryDto): CountryFlag {
  const countryName = country.name.common;

  return {
    png: country.flags?.png ?? null,
    svg: country.flags?.svg ?? null,
    alt: country.flags?.alt ?? `${countryName} flag`,
  };
}

function mapMapLinks(maps: RestCountryDto["maps"]): CountryMapLinks {
  return {
    googleMaps: maps?.googleMaps ?? null,
    openStreetMaps: maps?.openStreetMaps ?? null,
  };
}

export function mapRestCountryToCountrySummary(
  country: RestCountryDto,
): CountrySummary {
  return {
    code: country.cca2,
    alpha2Code: country.cca2,
    alpha3Code: country.cca3,
    name: country.name.common,
    officialName: country.name.official,
    capital: getFirstValue(country.capital),
    region: mapRegion(country.region),
    subregion: toNullableString(country.subregion),
    population: country.population ?? 0,
    currencies: mapCurrencies(country.currencies),
    languages: mapLanguages(country.languages),
    flag: mapFlag(country),
    coordinates: mapCoordinates(country.latlng),
  };
}

export function mapRestCountryToCountry(country: RestCountryDto): Country {
  const summary = mapRestCountryToCountrySummary(country);

  return {
    ...summary,
    area: country.area ?? 0,
    continents: country.continents ?? [],
    timezones: country.timezones ?? [],
    borders: country.borders ?? [],
    maps: mapMapLinks(country.maps),
    independent: country.independent ?? null,
    unMember: country.unMember ?? false,
    landlocked: country.landlocked ?? false,
    startOfWeek: toNullableString(country.startOfWeek),
    capitalCoordinates: mapCoordinates(country.capitalInfo?.latlng),
    carSide: toNullableString(country.car?.side),
  };
}

export function mapRestCountriesToCountrySummaries(
  countries: RestCountryDto[],
): CountrySummary[] {
  return countries.map(mapRestCountryToCountrySummary);
}

export function mapRestCountriesToCountries(
  countries: RestCountryDto[],
): Country[] {
  return countries.map(mapRestCountryToCountry);
}

export function sortCountrySummaries(
  countries: CountrySummary[],
  sortBy: CountrySortField = "name",
  direction: CountrySortDirection = "asc",
) {
  const directionModifier = direction === "asc" ? 1 : -1;

  return [...countries].sort((left, right) => {
    if (sortBy === "population") {
      return (left.population - right.population) * directionModifier;
    }

    return left.name.localeCompare(right.name) * directionModifier;
  });
}