export type NagerPublicHolidayDto = {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties?: string[] | null;
  launchYear?: number | null;
  types?: string[];
};

export type NagerLongWeekendDto = {
  startDate: string;
  endDate: string;
  dayCount: number;
  needBridgeDay: boolean;
};