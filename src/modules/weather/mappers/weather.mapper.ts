import type {
  DailyWeatherForecast,
  OpenMeteoForecastDto,
  WeatherCondition,
  WeatherForecast,
} from "@/modules/weather/types";

function getWeatherCondition(code: number | null | undefined): WeatherCondition {
  if (code === null || code === undefined) {
    return {
      code: null,
      label: "Weather unavailable",
      icon: "◌",
    };
  }

  if (code === 0) {
    return {
      code,
      label: "Clear sky",
      icon: "☀",
    };
  }

  if ([1, 2, 3].includes(code)) {
    return {
      code,
      label: "Partly cloudy",
      icon: "◐",
    };
  }

  if ([45, 48].includes(code)) {
    return {
      code,
      label: "Fog",
      icon: "≋",
    };
  }

  if ([51, 53, 55, 56, 57].includes(code)) {
    return {
      code,
      label: "Drizzle",
      icon: "⌁",
    };
  }

  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
    return {
      code,
      label: "Rain",
      icon: "☂",
    };
  }

  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return {
      code,
      label: "Snow",
      icon: "❄",
    };
  }

  if ([95, 96, 99].includes(code)) {
    return {
      code,
      label: "Thunderstorm",
      icon: "ϟ",
    };
  }

  return {
    code,
    label: "Mixed conditions",
    icon: "◍",
  };
}

function getNumberValue(
  values: number[] | undefined,
  index: number,
): number | null {
  const value = values?.[index];

  if (typeof value !== "number" || !Number.isFinite(value)) {
    return null;
  }

  return value;
}

function mapDailyForecast(dto: OpenMeteoForecastDto): DailyWeatherForecast[] {
  const daily = dto.daily;

  if (!daily?.time?.length) {
    return [];
  }

  return daily.time.map((date, index) => ({
    date,
    minTemperature: getNumberValue(daily.temperature_2m_min, index),
    maxTemperature: getNumberValue(daily.temperature_2m_max, index),
    precipitationSum: getNumberValue(daily.precipitation_sum, index),
    condition: getWeatherCondition(daily.weather_code?.[index]),
  }));
}

export function mapOpenMeteoForecastToWeatherForecast(
  dto: OpenMeteoForecastDto,
): WeatherForecast {
  const current = dto.current;

  return {
    latitude: dto.latitude,
    longitude: dto.longitude,
    timezone: dto.timezone ?? null,
    timezoneAbbreviation: dto.timezone_abbreviation ?? null,
    current: current
      ? {
          time: current.time ?? null,
          temperature: current.temperature_2m ?? null,
          apparentTemperature: current.apparent_temperature ?? null,
          humidity: current.relative_humidity_2m ?? null,
          precipitation: current.precipitation ?? null,
          windSpeed: current.wind_speed_10m ?? null,
          condition: getWeatherCondition(current.weather_code),
        }
      : null,
    daily: mapDailyForecast(dto),
    units: {
      temperature: dto.current_units?.temperature_2m ?? "°C",
      apparentTemperature: dto.current_units?.apparent_temperature ?? "°C",
      humidity: dto.current_units?.relative_humidity_2m ?? "%",
      precipitation: dto.current_units?.precipitation ?? "mm",
      windSpeed: dto.current_units?.wind_speed_10m ?? "km/h",
    },
  };
}