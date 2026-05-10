"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { routes } from "@/core/router/routes";
import { PlannerForm } from "@/modules/planner/components/planner-form";
import { TravelPlanCard } from "@/modules/planner/components/travel-plan-card";
import { usePlannerStore } from "@/modules/planner/store";
import type { CreateTravelPlanInput, TravelPlan } from "@/modules/planner/types";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { Container } from "@/shared/components/ui/container";
import { SectionHeader } from "@/shared/components/ui/section-header";

function normalizeDestinationCode(value: string | null) {
  return value?.trim().toUpperCase() ?? "";
}

function getPluralLabel(count: number, singular: string, plural: string) {
  return count === 1 ? singular : plural;
}

function getUniqueDestinationCount(plans: TravelPlan[]) {
  return new Set(
    plans
      .map((plan) => plan.destinationCode)
      .filter((destinationCode): destinationCode is string =>
        Boolean(destinationCode),
      ),
  ).size;
}

function getTotalBudget(plans: TravelPlan[]) {
  return plans.reduce((total, plan) => {
    if (typeof plan.budget.amount !== "number") {
      return total;
    }

    return total + plan.budget.amount;
  }, 0);
}

function getFilteredPlans(plans: TravelPlan[], destinationCode: string) {
  if (!destinationCode) {
    return plans;
  }

  return plans.filter((plan) => plan.destinationCode === destinationCode);
}

function getInitialPlan(plans: TravelPlan[], planId: string | null) {
  if (!planId) {
    return null;
  }

  return plans.find((plan) => plan.id === planId) ?? null;
}

export function PlannerPage() {
  const searchParams = useSearchParams();

  const plans = usePlannerStore((state) => state.plans);
  const createPlan = usePlannerStore((state) => state.createPlan);
  const updatePlan = usePlannerStore((state) => state.updatePlan);
  const removePlan = usePlannerStore((state) => state.removePlan);
  const clearPlans = usePlannerStore((state) => state.clearPlans);

  const destinationCode = normalizeDestinationCode(
    searchParams.get("destination"),
  );
  const planId = searchParams.get("plan");

  const [editingPlan, setEditingPlan] = useState<TravelPlan | null>(null);
  const [dismissedPlanId, setDismissedPlanId] = useState<string | null>(null);

  const initialPlanFromUrl = useMemo(() => {
    if (planId && planId === dismissedPlanId) {
      return null;
    }

    return getInitialPlan(plans, planId);
  }, [dismissedPlanId, planId, plans]);

  const activeEditingPlan = editingPlan ?? initialPlanFromUrl;

  const formKey = activeEditingPlan
    ? `edit-${activeEditingPlan.id}`
    : `create-${destinationCode || "open"}`;

  const filteredPlans = useMemo(
    () => getFilteredPlans(plans, destinationCode),
    [destinationCode, plans],
  );

  const totalBudget = getTotalBudget(plans);
  const uniqueDestinations = getUniqueDestinationCount(plans);

  function handleSubmit(input: CreateTravelPlanInput) {
    if (activeEditingPlan) {
      updatePlan(activeEditingPlan.id, input);
      setEditingPlan(null);
      setDismissedPlanId(activeEditingPlan.id);
      return;
    }

    createPlan({
      ...input,
      destinationCode: input.destinationCode || destinationCode || null,
    });
  }

  function handleCancelEdit() {
    if (activeEditingPlan) {
      setDismissedPlanId(activeEditingPlan.id);
    }

    setEditingPlan(null);
  }

  return (
    <main className="bg-background">
      <section className="relative overflow-hidden py-16 lg:py-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top_left,_rgba(223,238,230,0.62),_transparent_30rem),radial-gradient(circle_at_top_right,_rgba(239,227,207,0.5),_transparent_28rem)]" />

        <Container className="relative">
          <SectionHeader
            eyebrow="Travel planner"
            title="Turn destination ideas into lightweight travel plans."
            description="Create simple local plans with destination notes, flexible dates, budgets and a clear planning status."
            action={
              <Badge variant={plans.length > 0 ? "sage" : "sand"}>
                {plans.length} {getPluralLabel(plans.length, "plan", "plans")}
              </Badge>
            }
          />

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <Card className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="travel-label text-muted">Plans</p>
                  <p className="mt-3 text-4xl font-black tracking-[-0.06em] text-foreground">
                    {plans.length}
                  </p>
                </div>

                <div className="grid size-11 place-items-center rounded-2xl bg-sage text-lg text-sage-strong">
                  ▦
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-muted-strong">
                {getPluralLabel(
                  plans.length,
                  "Travel idea saved for later review.",
                  "Travel ideas saved for later review.",
                )}
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="travel-label text-muted">Destinations</p>
                  <p className="mt-3 text-4xl font-black tracking-[-0.06em] text-foreground">
                    {uniqueDestinations}
                  </p>
                </div>

                <div className="grid size-11 place-items-center rounded-2xl bg-mist-blue text-lg text-deep-ocean">
                  ◍
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-muted-strong">
                Countries connected to your current travel plans.
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="travel-label text-muted">Budget noted</p>
                  <p className="mt-3 text-4xl font-black tracking-[-0.06em] text-foreground">
                    {totalBudget > 0 ? totalBudget.toLocaleString("en") : "Open"}
                  </p>
                </div>

                <div className="grid size-11 place-items-center rounded-2xl bg-sand text-lg text-foreground">
                  ✦
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-muted-strong">
                A lightweight total from plans with budget estimates.
              </p>
            </Card>
          </div>

          <div className="mt-8 grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-6">
              <PlannerForm
                key={formKey}
                initialPlan={activeEditingPlan}
                defaultDestinationCode={destinationCode}
                onSubmit={handleSubmit}
                onCancel={activeEditingPlan ? handleCancelEdit : undefined}
              />

              <Card variant="warm" className="p-6">
                <Badge variant="sand">Planning flow</Badge>

                <h2 className="mt-5 text-2xl font-black tracking-[-0.05em] text-foreground">
                  Keep plans simple until the trip becomes real.
                </h2>

                <div className="mt-5 grid gap-3">
                  <div className="rounded-2xl bg-white/70 p-4">
                    <p className="text-sm font-black text-foreground">
                      Start as an idea
                    </p>
                    <p className="mt-1 text-sm leading-6 text-muted-strong">
                      Save destination notes before choosing dates.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/70 p-4">
                    <p className="text-sm font-black text-foreground">
                      Add timing and budget
                    </p>
                    <p className="mt-1 text-sm leading-6 text-muted-strong">
                      Keep the plan flexible while you compare countries.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/70 p-4">
                    <p className="text-sm font-black text-foreground">
                      Return from saved destinations
                    </p>
                    <p className="mt-1 text-sm leading-6 text-muted-strong">
                      Favorite cards can send a country directly into this
                      planner.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <div>
              <div className="overflow-hidden rounded-card border border-border bg-surface shadow-panel">
                <div className="grid gap-6 p-5 lg:grid-cols-[1fr_auto] lg:items-center lg:p-6">
                  <div>
                    <Badge variant="ocean">
                      {destinationCode
                        ? `Destination ${destinationCode}`
                        : "Personal travel board"}
                    </Badge>

                    <h2 className="mt-4 text-2xl font-black tracking-[-0.05em] text-foreground">
                      {destinationCode
                        ? "Plans linked to this destination."
                        : "All local travel plans."}
                    </h2>

                    <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-strong">
                      Review saved plans, update their status or jump back into
                      country insights when you need more context.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                    <Link
                      href={routes.favorites}
                      className="inline-flex min-h-12 items-center justify-center rounded-control border border-border bg-surface px-6 text-sm font-extrabold text-foreground shadow-sm transition hover:border-border-strong hover:bg-surface-soft"
                    >
                      Saved destinations
                    </Link>

                    {plans.length > 0 ? (
                      <Button variant="secondary" onClick={clearPlans}>
                        Clear plans
                      </Button>
                    ) : null}
                  </div>
                </div>
              </div>

              {filteredPlans.length === 0 ? (
                <Card className="mt-6 overflow-hidden p-0">
                  <div className="relative min-h-[24rem] overflow-hidden bg-ink p-8 text-white">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(223,238,230,0.5),_transparent_20rem),radial-gradient(circle_at_bottom_right,_rgba(217,154,61,0.22),_transparent_18rem),linear-gradient(135deg,_rgba(11,18,32,0.98),_rgba(11,79,117,0.72))]" />

                    <div className="relative flex min-h-[18rem] flex-col justify-end">
                      <div className="grid size-16 place-items-center rounded-2xl border border-white/20 bg-white/15 text-3xl shadow-soft backdrop-blur-md">
                        ▦
                      </div>

                      <h2 className="travel-heading mt-6 max-w-2xl text-[clamp(2.5rem,5vw,4.8rem)] leading-[0.92] text-white">
                        No plans on the board yet.
                      </h2>

                      <p className="mt-5 max-w-xl text-base leading-8 text-white/76">
                        Create a plan from the form or explore countries and
                        send a destination into the planner.
                      </p>

                      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Link
                          href={routes.countries}
                          className="inline-flex min-h-12 items-center justify-center rounded-control bg-white px-6 text-sm font-extrabold text-ink shadow-sm transition hover:bg-white/90"
                        >
                          Explore countries
                        </Link>

                        <Link
                          href={routes.favorites}
                          className="inline-flex min-h-12 items-center justify-center rounded-control border border-white/20 bg-white/10 px-6 text-sm font-extrabold text-white shadow-sm backdrop-blur-md transition hover:bg-white/15"
                        >
                          Open favorites
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              ) : (
                <div className="mt-6 grid gap-5 lg:grid-cols-2">
                  {filteredPlans.map((plan) => (
                    <TravelPlanCard
                      key={plan.id}
                      plan={plan}
                      onEdit={setEditingPlan}
                      onRemove={removePlan}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}