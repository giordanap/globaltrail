export type PublicHoliday = {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  isFixed: boolean;
  isGlobal: boolean;
  counties: string[];
  launchYear: number | null;
  types: string[];
};

export type LongWeekend = {
  startDate: string;
  endDate: string;
  dayCount: number;
  needsBridgeDay: boolean;
};

export type HolidayCalendar = {
  year: number;
  countryCode: string;
  holidays: PublicHoliday[];
  longWeekends: LongWeekend[];
};