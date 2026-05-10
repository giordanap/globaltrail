"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { PlannerDatePicker } from "@/modules/planner/components/planner-date-picker";
import type {
  CreateTravelPlanInput,
  TravelPlan,
  TravelPlanStatus,
} from "@/modules/planner/types";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Select } from "@/shared/components/ui/select";

type PlannerFormProps = {
  initialPlan?: TravelPlan | null;
  defaultDestinationCode?: string | null;
  onSubmit: (input: CreateTravelPlanInput) => void;
  onCancel?: () => void;
};

const statusOptions: Array<{
  value: TravelPlanStatus;
  label: string;
}> = [
  {
    value: "idea",
    label: "Idea",
  },
  {
    value: "planning",
    label: "Planning",
  },
  {
    value: "booked",
    label: "Booked",
  },
  {
    value: "completed",
    label: "Completed",
  },
];

function getInitialTitle(plan?: TravelPlan | null) {
  return plan?.title ?? "";
}

function getInitialDestinationCode(
  plan?: TravelPlan | null,
  defaultDestinationCode?: string | null,
) {
  return plan?.destinationCode ?? defaultDestinationCode ?? "";
}

function getInitialDestinationName(plan?: TravelPlan | null) {
  return plan?.destinationName ?? "";
}

function getInitialStatus(plan?: TravelPlan | null): TravelPlanStatus {
  return plan?.status ?? "idea";
}

function getInitialStartDate(plan?: TravelPlan | null) {
  return plan?.dateRange.startDate ?? "";
}

function getInitialEndDate(plan?: TravelPlan | null) {
  return plan?.dateRange.endDate ?? "";
}

function getInitialBudgetAmount(plan?: TravelPlan | null) {
  if (typeof plan?.budget.amount !== "number") {
    return "";
  }

  return String(plan.budget.amount);
}

function getInitialBudgetCurrencyCode(plan?: TravelPlan | null) {
  return plan?.budget.currencyCode ?? "";
}

function getInitialNotes(plan?: TravelPlan | null) {
  return plan?.notes ?? "";
}

function parseBudgetAmount(value: string) {
  const normalizedValue = value.trim();

  if (!normalizedValue) {
    return null;
  }

  const parsedValue = Number(normalizedValue);

  if (!Number.isFinite(parsedValue) || parsedValue < 0) {
    return null;
  }

  return parsedValue;
}

export function PlannerForm({
  initialPlan,
  defaultDestinationCode,
  onSubmit,
  onCancel,
}: PlannerFormProps) {
  const [title, setTitle] = useState(() => getInitialTitle(initialPlan));
  const [destinationCode, setDestinationCode] = useState(() =>
    getInitialDestinationCode(initialPlan, defaultDestinationCode),
  );
  const [destinationName, setDestinationName] = useState(() =>
    getInitialDestinationName(initialPlan),
  );
  const [status, setStatus] = useState<TravelPlanStatus>(() =>
    getInitialStatus(initialPlan),
  );
  const [startDate, setStartDate] = useState(() =>
    getInitialStartDate(initialPlan),
  );
  const [endDate, setEndDate] = useState(() => getInitialEndDate(initialPlan));
  const [budgetAmount, setBudgetAmount] = useState(() =>
    getInitialBudgetAmount(initialPlan),
  );
  const [budgetCurrencyCode, setBudgetCurrencyCode] = useState(() =>
    getInitialBudgetCurrencyCode(initialPlan),
  );
  const [notes, setNotes] = useState(() => getInitialNotes(initialPlan));

  const isEditing = Boolean(initialPlan);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onSubmit({
      title,
      destinationCode,
      destinationName,
      notes,
      status,
      startDate,
      endDate,
      budgetAmount: parseBudgetAmount(budgetAmount),
      budgetCurrencyCode,
    });

    if (!isEditing) {
      setTitle("");
      setDestinationCode(defaultDestinationCode ?? "");
      setDestinationName("");
      setStatus("idea");
      setStartDate("");
      setEndDate("");
      setBudgetAmount("");
      setBudgetCurrencyCode("");
      setNotes("");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-card border border-border bg-surface p-5 shadow-panel lg:p-6"
    >
      <div className="flex flex-col gap-2">
        <p className="travel-label text-muted">
          {isEditing ? "Edit plan" : "New travel plan"}
        </p>

        <h2 className="text-2xl font-black tracking-[-0.05em] text-foreground">
          {isEditing ? "Update this trip idea." : "Capture a destination idea."}
        </h2>

        <p className="text-sm leading-7 text-muted-strong">
          Keep the plan lightweight: destination, dates, budget and the notes
          you want to remember.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Input
          label="Plan title"
          name="title"
          placeholder="Spring trip to Lisbon"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <Input
          label="Destination code"
          name="destinationCode"
          placeholder="ES"
          value={destinationCode}
          onChange={(event) => setDestinationCode(event.target.value)}
          helperText="Use a country code like ES, JP or PE."
        />

        <Input
          label="Destination name"
          name="destinationName"
          placeholder="Spain"
          value={destinationName}
          onChange={(event) => setDestinationName(event.target.value)}
        />

        <Select
          label="Status"
          name="status"
          value={status}
          onChange={(event) => setStatus(event.target.value as TravelPlanStatus)}
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>

        <PlannerDatePicker
          label="Start date"
          name="startDate"
          value={startDate}
          onChange={setStartDate}
        />

        <PlannerDatePicker
          label="End date"
          name="endDate"
          value={endDate}
          onChange={setEndDate}
        />

        <Input
          label="Budget"
          name="budgetAmount"
          type="number"
          min="0"
          step="1"
          placeholder="1200"
          value={budgetAmount}
          onChange={(event) => setBudgetAmount(event.target.value)}
        />

        <Input
          label="Budget currency"
          name="budgetCurrencyCode"
          placeholder="EUR"
          value={budgetCurrencyCode}
          onChange={(event) => setBudgetCurrencyCode(event.target.value)}
        />
      </div>

      <label className="mt-4 block">
        <span className="mb-2 block text-sm font-extrabold text-foreground">
          Notes
        </span>

        <textarea
          name="notes"
          placeholder="Places, timing, local reminders or travel ideas..."
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          className="min-h-32 w-full rounded-control border border-border bg-surface px-4 py-3 text-sm leading-7 text-foreground shadow-sm transition placeholder:text-muted focus:border-deep-ocean focus:outline-none focus:ring-4 focus:ring-deep-ocean/10"
        />
      </label>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit">
          {isEditing ? "Save changes" : "Create plan"}
        </Button>

        {onCancel ? (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        ) : null}
      </div>
    </form>
  );
}