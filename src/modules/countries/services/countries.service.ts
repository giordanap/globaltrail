import { restCountriesClient } from "@/core/api/rest-countries/rest-countries.client";
import {
  mapRestCountriesToCountrySummaries,
  sortCountrySummaries,
} from "@/modules/countries/mappers";
import type {
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

export async function getCountries(): Promise<CountrySummary[]> {
  const countries = await restCountriesClient.get<RestCountryDto[]>("/all", {
    query: {
      fields: countrySummaryFields,
    },
  });

  return sortCountrySummaries(mapRestCountriesToCountrySummaries(countries));
}