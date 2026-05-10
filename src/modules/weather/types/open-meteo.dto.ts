export type OpenMeteoCurrentUnitsDto = {
  time?: string;
  interval?: string;
  temperature_2m?: string;
  apparent_temperature?: string;
  relative_humidity_2m?: string;
  precipitation?: string;
  rain?: string;
  weather_code?: string;
  wind_speed_10m?: string;
};

export type OpenMeteoCurrentDto = {
  time: string;
  interval?: number;
  temperature_2m?: number;
  apparent_temperature?: number;
  relative_humidity_2m?: number;
  precipitation?: number;
  rain?: number;
  weather_code?: number;
  wind_speed_10m?: number;
};

export type OpenMeteoDailyUnitsDto = {
  time?: string;
  weather_code?: string;
  temperature_2m_max?: string;
  temperature_2m_min?: string;
  precipitation_sum?: string;
};

export type OpenMeteoDailyDto = {
  time: string[];
  weather_code?: number[];
  temperature_2m_max?: number[];
  temperature_2m_min?: number[];
  precipitation_sum?: number[];
};

export type OpenMeteoForecastDto = {
  latitude: number;
  longitude: number;
  generationtime_ms?: number;
  utc_offset_seconds?: number;
  timezone?: string;
  timezone_abbreviation?: string;
  elevation?: number;
  current_units?: OpenMeteoCurrentUnitsDto;
  current?: OpenMeteoCurrentDto;
  daily_units?: OpenMeteoDailyUnitsDto;
  daily?: OpenMeteoDailyDto;
};