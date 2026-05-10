"use client";

import type { CountryCoordinates } from "@/modules/countries/types";
import { useWeatherForecastQuery } from "@/modules/weather/hooks/use-weather-query";
import type { WeatherForecast } from "@/modules/weather/types";
import { SkeletonBlock } from "@/shared/components/feedback/skeleton-block";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";

type WeatherPanelProps = {
  coordinates: CountryCoordinates | null;
};

function formatTemperature(value: number | null, unit: string) {
  if (value === null) {
    return "N/A";
  }

  return `${Math.round(value)}${unit}`;
}

function formatNumber(value: number | null, unit: string) {
  if (value === null) {
    return "N/A";
  }

  return `${value}${unit}`;
}

function formatDate(value: string) {
  const date = new Date(`${value}T00:00:00`);

  return new Intl.DateTimeFormat("en", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(date);
}

function WeatherPanelSkeleton() {
  return (
    <Card className="p-6">
      <SkeletonBlock className="h-5 w-36 rounded-full" />
      <SkeletonBlock className="mt-6 h-20 rounded-2xl" />
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <SkeletonBlock className="h-16 rounded-2xl" />
        <SkeletonBlock className="h-16 rounded-2xl" />
      </div>
      <SkeletonBlock className="mt-6 h-24 rounded-2xl" />
    </Card>
  );
}

function WeatherMetric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface px-4 py-3">
      <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-muted">
        {label}
      </p>
      <p className="mt-2 text-sm font-black text-foreground">{value}</p>
    </div>
  );
}

function WeatherContent({ forecast }: { forecast: WeatherForecast }) {
  const current = forecast.current;

  if (!current) {
    return (
      <Card className="p-6">
        <Badge variant="sand">Weather unavailable</Badge>
        <p className="mt-4 text-sm leading-7 text-muted-strong">
          Current weather data is not available for this destination.
        </p>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden p-0">
      <div className="bg-[radial-gradient(circle_at_top_right,_rgba(219,234,242,0.8),_transparent_16rem),linear-gradient(135deg,_rgba(255,255,255,1),_rgba(248,250,249,1))] p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="travel-label text-muted">Weather outlook</p>
            <h2 className="mt-3 text-2xl font-black tracking-[-0.04em] text-foreground">
              {current.condition.label}
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-strong">
              {forecast.timezone ?? "Local timezone"}
              {forecast.timezoneAbbreviation
                ? ` · ${forecast.timezoneAbbreviation}`
                : ""}
            </p>
          </div>

          <div className="text-right">
            <p className="text-5xl font-black tracking-[-0.08em] text-foreground">
              {formatTemperature(current.temperature, forecast.units.temperature)}
            </p>
            <p className="mt-2 text-3xl">{current.condition.icon}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <WeatherMetric
            label="Feels like"
            value={formatTemperature(
              current.apparentTemperature,
              forecast.units.apparentTemperature,
            )}
          />
          <WeatherMetric
            label="Humidity"
            value={formatNumber(current.humidity, forecast.units.humidity)}
          />
          <WeatherMetric
            label="Wind"
            value={formatNumber(current.windSpeed, forecast.units.windSpeed)}
          />
        </div>
      </div>

      <div className="border-t border-border p-6">
        <div className="flex items-center justify-between gap-4">
          <p className="travel-label text-muted">5-day forecast</p>
          <Badge variant="ocean">Open-Meteo</Badge>
        </div>

        <div className="mt-5 grid gap-3">
          {forecast.daily.map((day) => (
            <div
              key={day.date}
              className="grid grid-cols-[1fr_auto_auto] items-center gap-4 rounded-2xl bg-surface-soft px-4 py-3 text-sm"
            >
              <div>
                <p className="font-black text-foreground">
                  {formatDate(day.date)}
                </p>
                <p className="mt-1 text-xs font-semibold text-muted-strong">
                  {day.condition.label}
                </p>
              </div>

              <span className="text-lg">{day.condition.icon}</span>

              <p className="font-black text-foreground">
                {formatTemperature(
                  day.maxTemperature,
                  forecast.units.temperature,
                )}{" "}
                /{" "}
                <span className="text-muted-strong">
                  {formatTemperature(
                    day.minTemperature,
                    forecast.units.temperature,
                  )}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export function WeatherPanel({ coordinates }: WeatherPanelProps) {
  const weatherQuery = useWeatherForecastQuery(
    coordinates?.lat,
    coordinates?.lng,
    {
      enabled: Boolean(coordinates),
    },
  );

  if (!coordinates) {
    return (
      <Card className="p-6">
        <Badge variant="sand">Weather unavailable</Badge>
        <h2 className="mt-5 text-xl font-black tracking-[-0.03em] text-foreground">
          Coordinates are missing.
        </h2>
        <p className="mt-3 text-sm leading-7 text-muted-strong">
          This destination does not include coordinates, so the weather outlook
          cannot be loaded yet.
        </p>
      </Card>
    );
  }

  if (weatherQuery.isLoading) {
    return <WeatherPanelSkeleton />;
  }

  if (weatherQuery.isError) {
    return (
      <Card className="p-6">
        <Badge variant="terracotta">Weather unavailable</Badge>
        <h2 className="mt-5 text-xl font-black tracking-[-0.03em] text-foreground">
          We could not load the weather outlook.
        </h2>
        <p className="mt-3 text-sm leading-7 text-muted-strong">
          The weather signal is temporarily unavailable. The rest of the
          destination insight remains available.
        </p>
        <Button
          className="mt-6"
          onClick={() => void weatherQuery.refetch()}
          disabled={weatherQuery.isRefetching}
        >
          {weatherQuery.isRefetching ? "Retrying..." : "Try again"}
        </Button>
      </Card>
    );
  }

  if (!weatherQuery.data) {
    return null;
  }

  return <WeatherContent forecast={weatherQuery.data} />;
}