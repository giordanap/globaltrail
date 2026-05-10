import type {
  LongWeekend,
  NagerLongWeekendDto,
  NagerPublicHolidayDto,
  PublicHoliday,
} from "@/modules/holidays/types";

export function mapNagerPublicHolidayToPublicHoliday(
  holiday: NagerPublicHolidayDto,
): PublicHoliday {
  return {
    date: holiday.date,
    localName: holiday.localName,
    name: holiday.name,
    countryCode: holiday.countryCode,
    isFixed: holiday.fixed,
    isGlobal: holiday.global,
    counties: holiday.counties ?? [],
    launchYear: holiday.launchYear ?? null,
    types: holiday.types ?? [],
  };
}

export function mapNagerPublicHolidaysToPublicHolidays(
  holidays: NagerPublicHolidayDto[],
): PublicHoliday[] {
  return holidays
    .map(mapNagerPublicHolidayToPublicHoliday)
    .sort((left, right) => left.date.localeCompare(right.date));
}

export function mapNagerLongWeekendToLongWeekend(
  weekend: NagerLongWeekendDto,
): LongWeekend {
  return {
    startDate: weekend.startDate,
    endDate: weekend.endDate,
    dayCount: weekend.dayCount,
    needsBridgeDay: weekend.needBridgeDay,
  };
}

export function mapNagerLongWeekendsToLongWeekends(
  weekends: NagerLongWeekendDto[],
): LongWeekend[] {
  return weekends
    .map(mapNagerLongWeekendToLongWeekend)
    .sort((left, right) => left.startDate.localeCompare(right.startDate));
}