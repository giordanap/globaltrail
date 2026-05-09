import { restCountriesClient } from "@/core/api/rest-countries/rest-countries.client";
import { ProviderApiError } from "@/core/errors/provider-api-error";
import {
  mapRestCountriesToCountrySummaries,
  mapRestCountryToCountry,
  sortCountrySummaries,
} from "@/modules/countries/mappers";
import type {
  Country,
  CountrySummary,
  RestCountryDto,
} from "@/modules/countries/types";

const countrySummaryFields = [
  "name",
  "cca2",
  "cca3",
  "capital",
  "region",
  "subregion",
  "population",
  "currencies",
  "languages",
  "flags",
].join(",");

function normalizeCountrySummaries(countries: RestCountryDto[]) {
  return sortCountrySummaries(mapRestCountriesToCountrySummaries(countries));
}

export async function getCountries(): Promise<CountrySummary[]> {
  const countries = await restCountriesClient.get<RestCountryDto[]>("/all", {
    query: {
      fields: countrySummaryFields,
    },
  });

  return normalizeCountrySummaries(countries);
}

export async function searchCountriesByName(
  query: string,
): Promise<CountrySummary[]> {
  const normalizedQuery = query.trim();

  if (!normalizedQuery) {
    return [];
  }

  try {
    const countries = await restCountriesClient.get<RestCountryDto[]>(
      `/name/${encodeURIComponent(normalizedQuery)}`,
      {
        query: {
          fields: countrySummaryFields,
        },
      },
    );

    return normalizeCountrySummaries(countries);
  } catch (error) {
    if (error instanceof ProviderApiError && error.status === 404) {
      return [];
    }

    throw error;
  }
}

export async function getCountryByCode(code: string): Promise<Country | null> {
  const normalizedCode = code.trim().toUpperCase();

  if (!normalizedCode) {
    return null;
  }

  try {
    const countries = await restCountriesClient.get<RestCountryDto[]>(
      `/alpha/${encodeURIComponent(normalizedCode)}`,
    );

    const [country] = countries;

    return country ? mapRestCountryToCountry(country) : null;
  } catch (error) {
    if (error instanceof ProviderApiError && error.status === 404) {
      return null;
    }

    throw error;
  }
}