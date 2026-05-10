"use client";

import Link from "next/link";
import { routes } from "@/core/router/routes";
import type { TravelPlan, TravelPlanStatus } from "@/modules/planner/types";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";

type TravelPlanCardProps = {
  plan: TravelPlan;
  onEdit: (plan: TravelPlan) => void;
  onRemove: (planId: string) => void;
};

const updatedAtFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
});

const budgetFormatter = new Intl.NumberFormat("en", {
  maximumFractionDigits: 0,
});

const statusLabels: Record<TravelPlanStatus, string> = {
  idea: "Idea",
  planning: "Planning",
  booked: "Booked",
  completed: "Completed",
};

function getStatusBadgeVariant(
  status: TravelPlanStatus,
): "neutral" | "ocean" | "sage" | "sand" | "terracotta" {
  if (status === "planning") {
    return "ocean";
  }

  if (status === "booked") {
    return "sage";
  }

  if (status === "completed") {
    return "sand";
  }

  return "neutral";
}

function formatDateRange(plan: TravelPlan) {
  const { startDate, endDate } = plan.dateRange;

  if (!startDate && !endDate) {
    return "Dates flexible";
  }

  if (startDate && endDate) {
    return `${startDate} → ${endDate}`;
  }

  if (startDate) {
    return `Starts ${startDate}`;
  }

  return `Ends ${endDate}`;
}

function formatBudget(plan: TravelPlan) {
  const { amount, currencyCode } = plan.budget;

  if (typeof amount !== "number") {
    return "Budget open";
  }

  return `${budgetFormatter.format(amount)} ${currencyCode ?? ""}`.trim();
}

function formatUpdatedAt(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Updated recently";
  }

  return `Updated ${updatedAtFormatter.format(date)}`;
}

function getDestinationLabel(plan: TravelPlan) {
  if (plan.destinationName && plan.destinationCode) {
    return `${plan.destinationName} · ${plan.destinationCode}`;
  }

  if (plan.destinationName) {
    return plan.destinationName;
  }

  if (plan.destinationCode) {
    return plan.destinationCode;
  }

  return "Destination open";
}

export function TravelPlanCard({
  plan,
  onEdit,
  onRemove,
}: TravelPlanCardProps) {
  return (
    <Card className="overflow-hidden p-0 transition duration-300 hover:-translate-y-1 hover:shadow-card">
      <div className="border-b border-border bg-surface-warm p-5">
        <div className="flex items-start justify-between gap-4">
          <Badge variant={getStatusBadgeVariant(plan.status)}>
            {statusLabels[plan.status]}
          </Badge>

          <button
            type="button"
            onClick={() => onRemove(plan.id)}
            className="grid size-10 place-items-center rounded-full border border-border bg-white/70 text-muted-strong shadow-sm transition hover:border-terracotta/30 hover:bg-terracotta/10 hover:text-terracotta"
            aria-label={`Remove ${plan.title}`}
          >
            ×
          </button>
        </div>

        <h2 className="mt-5 text-2xl font-black tracking-[-0.05em] text-foreground">
          {plan.title}
        </h2>

        <p className="mt-2 text-sm font-semibold text-muted-strong">
          {getDestinationLabel(plan)}
        </p>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-surface-soft p-3">
            <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-muted">
              Dates
            </p>
            <p className="mt-2 text-sm font-black text-foreground">
              {formatDateRange(plan)}
            </p>
          </div>

          <div className="rounded-2xl bg-surface-soft p-3">
            <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-muted">
              Budget
            </p>
            <p className="mt-2 text-sm font-black text-foreground">
              {formatBudget(plan)}
            </p>
          </div>
        </div>

        <p className="mt-5 min-h-16 text-sm leading-7 text-muted-strong">
          {plan.notes || "No notes yet. Add travel reminders, local ideas or timing details when the plan becomes clearer."}
        </p>

        <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-muted">
          {formatUpdatedAt(plan.updatedAt)}
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Button variant="secondary" onClick={() => onEdit(plan)}>
            Edit plan
          </Button>

          {plan.destinationCode ? (
            <Link
              href={routes.countryDetail(plan.destinationCode)}
              className="inline-flex min-h-12 items-center justify-center rounded-control bg-ink px-6 text-sm font-extrabold !text-white shadow-sm transition hover:bg-ink-soft"
            >
              View country
            </Link>
          ) : (
            <Link
              href={routes.countries}
              className="inline-flex min-h-12 items-center justify-center rounded-control bg-ink px-6 text-sm font-extrabold !text-white shadow-sm transition hover:bg-ink-soft"
            >
              Choose country
            </Link>
          )}
        </div>

        {plan.destinationCode ? (
          <Link
            href={routes.compareDestination(plan.destinationCode)}
            className="mt-4 inline-flex text-sm font-black text-muted-strong underline-offset-4 transition hover:text-foreground hover:underline"
          >
            Compare destination →
          </Link>
        ) : null}
      </div>
    </Card>
  );
}