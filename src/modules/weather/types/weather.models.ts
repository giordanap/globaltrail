export type WeatherCondition = {
  code: number | null;
  label: string;
  icon: string;
};

export type CurrentWeather = {
  time: string | null;
  temperature: number | null;
  apparentTemperature: number | null;
  humidity: number | null;
  precipitation: number | null;
  windSpeed: number | null;
  condition: WeatherCondition;
};

export type DailyWeatherForecast = {
  date: string;
  minTemperature: number | null;
  maxTemperature: number | null;
  precipitationSum: number | null;
  condition: WeatherCondition;
};

export type WeatherForecast = {
  latitude: number;
  longitude: number;
  timezone: string | null;
  timezoneAbbreviation: string | null;
  current: CurrentWeather | null;
  daily: DailyWeatherForecast[];
  units: {
    temperature: string;
    apparentTemperature: string;
    humidity: string;
    precipitation: string;
    windSpeed: string;
  };
};