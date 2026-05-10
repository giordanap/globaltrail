"use client";

import { useMemo } from "react";
import {
  useLongWeekendsQuery,
  usePublicHolidaysQuery,
} from "@/modules/holidays/hooks/use-holidays-query";
import type {
  LongWeekend,
  PublicHoliday,
} from "@/modules/holidays/types";
import { SkeletonBlock } from "@/shared/components/feedback/skeleton-block";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";

type HolidaysPanelProps = {
  countryCode: string;
  countryName: string;
};

const visibleHolidaysLimit = 6;
const visibleWeekendsLimit = 3;

function getCurrentYear() {
  return new Date().getFullYear();
}

function formatDate(value: string) {
  const date = new Date(`${value}T00:00:00`);

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    weekday: "short",
  }).format(date);
}

function getUpcomingHolidays(holidays: PublicHoliday[]) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingHolidays = holidays.filter((holiday) => {
    const holidayDate = new Date(`${holiday.date}T00:00:00`);

    return holidayDate >= today;
  });

  return (upcomingHolidays.length > 0 ? upcomingHolidays : holidays).slice(
    0,
    visibleHolidaysLimit,
  );
}

function HolidaysPanelSkeleton() {
  return (
    <Card className="p-6">
      <SkeletonBlock className="h-5 w-36 rounded-full" />
      <SkeletonBlock className="mt-6 h-20 rounded-2xl" />
      <SkeletonBlock className="mt-4 h-16 rounded-2xl" />
      <SkeletonBlock className="mt-4 h-16 rounded-2xl" />
      <SkeletonBlock className="mt-6 h-24 rounded-2xl" />
    </Card>
  );
}

function HolidayItem({ holiday }: { holiday: PublicHoliday }) {
  const typeLabel = holiday.types[0] ?? "Public";

  return (
    <div className="rounded-2xl border border-border bg-surface px-4 py-3">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-black text-foreground">{holiday.name}</p>
          <p className="mt-1 text-xs font-semibold text-muted-strong">
            {holiday.localName}
          </p>
        </div>

        <Badge variant={holiday.isGlobal ? "ocean" : "sand"}>
          {typeLabel}
        </Badge>
      </div>

      <p className="mt-3 text-xs font-extrabold uppercase tracking-[0.16em] text-muted">
        {formatDate(holiday.date)}
      </p>
    </div>
  );
}

function LongWeekendItem({ weekend }: { weekend: LongWeekend }) {
  return (
    <div className="rounded-2xl bg-surface-soft px-4 py-3">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-black text-foreground">
            {weekend.dayCount} days
          </p>
          <p className="mt-1 text-xs font-semibold text-muted-strong">
            {formatDate(weekend.startDate)} to {formatDate(weekend.endDate)}
          </p>
        </div>

        <Badge variant={weekend.needsBridgeDay ? "terracotta" : "sage"}>
          {weekend.needsBridgeDay ? "Bridge day" : "Long weekend"}
        </Badge>
      </div>
    </div>
  );
}

export function HolidaysPanel({
  countryCode,
  countryName,
}: HolidaysPanelProps) {
  const year = getCurrentYear();

  const holidaysQuery = usePublicHolidaysQuery(year, countryCode, {
    enabled: Boolean(countryCode),
  });

  const longWeekendsQuery = useLongWeekendsQuery(year, countryCode, {
    enabled: Boolean(countryCode),
  });

  const visibleHolidays = useMemo(
    () => getUpcomingHolidays(holidaysQuery.data ?? []),
    [holidaysQuery.data],
  );

  const visibleLongWeekends = useMemo(
    () => (longWeekendsQuery.data ?? []).slice(0, visibleWeekendsLimit),
    [longWeekendsQuery.data],
  );

  if (holidaysQuery.isLoading) {
    return <HolidaysPanelSkeleton />;
  }

  if (holidaysQuery.isError) {
    return (
      <Card className="p-6">
        <Badge variant="terracotta">Holidays unavailable</Badge>
        <h2 className="mt-5 text-xl font-black tracking-[-0.03em] text-foreground">
          We could not load local holidays.
        </h2>
        <p className="mt-3 text-sm leading-7 text-muted-strong">
          The holiday calendar is temporarily unavailable. The rest of the
          destination insight remains available.
        </p>
        <Button
          className="mt-6"
          onClick={() => void holidaysQuery.refetch()}
          disabled={holidaysQuery.isRefetching}
        >
          {holidaysQuery.isRefetching ? "Retrying..." : "Try again"}
        </Button>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden p-0">
      <div className="bg-[radial-gradient(circle_at_top_right,_rgba(239,227,207,0.9),_transparent_16rem),linear-gradient(135deg,_rgba(255,255,255,1),_rgba(248,250,249,1))] p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="travel-label text-muted">Local holidays</p>
            <h2 className="mt-3 text-2xl font-black tracking-[-0.04em] text-foreground">
              {countryName} calendar
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-strong">
              Public holidays and long weekends for {year}.
            </p>
          </div>

          <Badge variant="sand">Nager.Date</Badge>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-surface px-4 py-3">
            <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-muted">
              Holidays
            </p>
            <p className="mt-2 text-2xl font-black tracking-[-0.05em] text-foreground">
              {holidaysQuery.data?.length ?? 0}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-surface px-4 py-3">
            <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-muted">
              Long weekends
            </p>
            <p className="mt-2 text-2xl font-black tracking-[-0.05em] text-foreground">
              {longWeekendsQuery.data?.length ?? 0}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-surface px-4 py-3">
            <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-muted">
              Country code
            </p>
            <p className="mt-2 text-2xl font-black tracking-[-0.05em] text-foreground">
              {countryCode}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-border p-6">
        <div className="flex items-center justify-between gap-4">
          <p className="travel-label text-muted">Upcoming holidays</p>
          <Badge variant="ocean">{visibleHolidays.length} shown</Badge>
        </div>

        {visibleHolidays.length > 0 ? (
          <div className="mt-5 grid gap-3">
            {visibleHolidays.map((holiday) => (
              <HolidayItem
                key={`${holiday.date}-${holiday.name}`}
                holiday={holiday}
              />
            ))}
          </div>
        ) : (
          <p className="mt-5 text-sm leading-7 text-muted-strong">
            No public holidays were found for this destination.
          </p>
        )}
      </div>

      <div className="border-t border-border p-6">
        <div className="flex items-center justify-between gap-4">
          <p className="travel-label text-muted">Long weekends</p>
          {longWeekendsQuery.isFetching ? (
            <Badge variant="neutral">Updating</Badge>
          ) : (
            <Badge variant="sage">{visibleLongWeekends.length} shown</Badge>
          )}
        </div>

        {longWeekendsQuery.isError ? (
          <p className="mt-5 text-sm leading-7 text-muted-strong">
            Long weekend data is unavailable for this destination right now.
          </p>
        ) : visibleLongWeekends.length > 0 ? (
          <div className="mt-5 grid gap-3">
            {visibleLongWeekends.map((weekend) => (
              <LongWeekendItem
                key={`${weekend.startDate}-${weekend.endDate}`}
                weekend={weekend}
              />
            ))}
          </div>
        ) : (
          <p className="mt-5 text-sm leading-7 text-muted-strong">
            No long weekends were found for this destination.
          </p>
        )}
      </div>
    </Card>
  );
}