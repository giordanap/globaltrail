import { openMeteoClient } from "@/core/api/open-meteo/open-meteo.client";
import { mapOpenMeteoForecastToWeatherForecast } from "@/modules/weather/mappers";
import type {
  OpenMeteoForecastDto,
  WeatherForecast,
} from "@/modules/weather/types";

export async function getWeatherForecast(
  lat: number,
  lng: number,
): Promise<WeatherForecast> {
  const forecast = await openMeteoClient.get<OpenMeteoForecastDto>("/forecast", {
    query: {
      latitude: lat,
      longitude: lng,
      current:
        "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,weather_code,wind_speed_10m",
      daily:
        "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum",
      timezone: "auto",
      forecast_days: 5,
    },
  });

  return mapOpenMeteoForecastToWeatherForecast(forecast);
}