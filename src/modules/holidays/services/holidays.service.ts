import { nagerDateClient } from "@/core/api/nager-date/nager-date.client";
import { ProviderApiError } from "@/core/errors/provider-api-error";
import {
  mapNagerLongWeekendsToLongWeekends,
  mapNagerPublicHolidaysToPublicHolidays,
} from "@/modules/holidays/mappers";
import type {
  LongWeekend,
  NagerLongWeekendDto,
  NagerPublicHolidayDto,
  PublicHoliday,
} from "@/modules/holidays/types";

function normalizeCountryCode(countryCode: string) {
  return countryCode.trim().toUpperCase();
}

export async function getPublicHolidays({
  year,
  countryCode,
}: {
  year: number;
  countryCode: string;
}): Promise<PublicHoliday[]> {
  const normalizedCountryCode = normalizeCountryCode(countryCode);

  if (!normalizedCountryCode) {
    return [];
  }

  try {
    const holidays = await nagerDateClient.get<NagerPublicHolidayDto[]>(
      `/PublicHolidays/${year}/${encodeURIComponent(normalizedCountryCode)}`,
    );

    return mapNagerPublicHolidaysToPublicHolidays(holidays);
  } catch (error) {
    if (error instanceof ProviderApiError && error.status === 404) {
      return [];
    }

    throw error;
  }
}

export async function getLongWeekends({
  year,
  countryCode,
}: {
  year: number;
  countryCode: string;
}): Promise<LongWeekend[]> {
  const normalizedCountryCode = normalizeCountryCode(countryCode);

  if (!normalizedCountryCode) {
    return [];
  }

  try {
    const weekends = await nagerDateClient.get<NagerLongWeekendDto[]>(
      `/LongWeekend/${year}/${encodeURIComponent(normalizedCountryCode)}`,
    );

    return mapNagerLongWeekendsToLongWeekends(weekends);
  } catch (error) {
    if (error instanceof ProviderApiError && error.status === 404) {
      return [];
    }

    throw error;
  }
}