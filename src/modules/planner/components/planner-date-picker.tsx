"use client";

import { useMemo, useState } from "react";
import { cn } from "@/shared/utils/cn";

type PlannerDatePickerProps = {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  helperText?: string;
};

type CalendarDay = {
  date: Date;
  value: string;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
};

const monthFormatter = new Intl.DateTimeFormat("en", {
  month: "long",
  year: "numeric",
});

const displayFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const weekdayLabels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function padDatePart(value: number) {
  return String(value).padStart(2, "0");
}

function toDateValue(date: Date) {
  return `${date.getFullYear()}-${padDatePart(date.getMonth() + 1)}-${padDatePart(
    date.getDate(),
  )}`;
}

function parseDateValue(value: string) {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);

  if (!match) {
    return null;
  }

  const [, yearValue, monthValue, dayValue] = match;
  const year = Number(yearValue);
  const month = Number(monthValue) - 1;
  const day = Number(dayValue);

  const date = new Date(year, month, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}

function getMonthStart(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function isSameDate(left: Date, right: Date) {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

function getCalendarDays(displayDate: Date, selectedValue: string) {
  const selectedDate = parseDateValue(selectedValue);
  const today = new Date();
  const monthStart = getMonthStart(displayDate);
  const startDay = monthStart.getDay();
  const calendarStart = new Date(
    monthStart.getFullYear(),
    monthStart.getMonth(),
    1 - startDay,
  );

  return Array.from({ length: 42 }, (_, index): CalendarDay => {
    const date = new Date(
      calendarStart.getFullYear(),
      calendarStart.getMonth(),
      calendarStart.getDate() + index,
    );

    return {
      date,
      value: toDateValue(date),
      isCurrentMonth: date.getMonth() === displayDate.getMonth(),
      isToday: isSameDate(date, today),
      isSelected: selectedDate ? isSameDate(date, selectedDate) : false,
    };
  });
}

function getDisplayValue(value: string) {
  const date = parseDateValue(value);

  if (!date) {
    return "Select date";
  }

  return displayFormatter.format(date);
}

export function PlannerDatePicker({
  label,
  name,
  value,
  onChange,
  helperText,
}: PlannerDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [displayDate, setDisplayDate] = useState(() =>
    getMonthStart(parseDateValue(value) ?? new Date()),
  );

  const days = useMemo(
    () => getCalendarDays(displayDate, value),
    [displayDate, value],
  );

  function handleSelect(nextValue: string) {
    const nextDate = parseDateValue(nextValue);

    if (nextDate) {
      setDisplayDate(getMonthStart(nextDate));
    }

    onChange(nextValue);
    setIsOpen(false);
  }

  function handleToday() {
    handleSelect(toDateValue(new Date()));
  }

  function handleClear() {
    onChange("");
    setIsOpen(false);
  }

  return (
    <div className="relative">
      <input type="hidden" name={name} value={value} />

      <span className="mb-2 block text-sm font-extrabold text-foreground">
        {label}
      </span>

      <button
        type="button"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        className="flex min-h-12 w-full items-center justify-between gap-3 rounded-control border border-border bg-surface px-4 text-left text-sm font-semibold text-foreground shadow-sm transition hover:border-border-strong focus:border-deep-ocean focus:outline-none focus:ring-4 focus:ring-deep-ocean/10"
        aria-expanded={isOpen}
      >
        <span className={cn(!value && "text-muted")}>
          {getDisplayValue(value)}
        </span>

        <span
          aria-hidden="true"
          className="grid size-8 place-items-center rounded-xl bg-surface-soft text-muted-strong"
        >
          ◷
        </span>
      </button>

      {helperText ? (
        <span className="mt-2 block text-xs leading-5 text-muted-strong">
          {helperText}
        </span>
      ) : null}

      {isOpen ? (
        <div className="absolute left-0 top-[calc(100%+0.75rem)] z-30 w-[min(22rem,calc(100vw-2rem))] rounded-card border border-border bg-surface p-4 shadow-card">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setDisplayDate((currentDate) => addMonths(currentDate, -1))}
              className="grid size-10 place-items-center rounded-full border border-border bg-surface text-foreground transition hover:border-border-strong hover:bg-surface-soft"
              aria-label="Previous month"
            >
              ←
            </button>

            <p className="text-sm font-black tracking-[-0.02em] text-foreground">
              {monthFormatter.format(displayDate)}
            </p>

            <button
              type="button"
              onClick={() => setDisplayDate((currentDate) => addMonths(currentDate, 1))}
              className="grid size-10 place-items-center rounded-full border border-border bg-surface text-foreground transition hover:border-border-strong hover:bg-surface-soft"
              aria-label="Next month"
            >
              →
            </button>
          </div>

          <div className="mt-4 grid grid-cols-7 gap-1">
            {weekdayLabels.map((weekday) => (
              <div
                key={weekday}
                className="grid size-9 place-items-center text-[0.65rem] font-black uppercase tracking-[0.14em] text-muted"
              >
                {weekday}
              </div>
            ))}

            {days.map((day) => (
              <button
                key={day.value}
                type="button"
                onClick={() => handleSelect(day.value)}
                className={cn(
                  "grid size-9 place-items-center rounded-xl text-xs font-extrabold transition",
                  day.isCurrentMonth
                    ? "text-foreground hover:bg-surface-soft"
                    : "text-muted/60 hover:bg-surface-soft",
                  day.isToday &&
                    "border border-deep-ocean/20 bg-mist-blue text-deep-ocean",
                  day.isSelected &&
                    "bg-ink !text-white shadow-sm hover:bg-ink-soft",
                )}
                aria-pressed={day.isSelected}
              >
                {day.date.getDate()}
              </button>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
            <button
              type="button"
              onClick={handleClear}
              className="text-xs font-black uppercase tracking-[0.16em] text-muted-strong transition hover:text-foreground"
            >
              Clear
            </button>

            <button
              type="button"
              onClick={handleToday}
              className="text-xs font-black uppercase tracking-[0.16em] text-deep-ocean transition hover:text-deep-ocean-strong"
            >
              Today
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}