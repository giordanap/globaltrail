"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { storageKeys } from "@/core/storage/storage-keys";
import {
  createTravelPlan,
  updateTravelPlan,
  type CreateTravelPlanInput,
  type TravelPlan,
  type UpdateTravelPlanInput,
} from "@/modules/planner/types";

type PlannerState = {
  plans: TravelPlan[];
  createPlan: (input?: CreateTravelPlanInput) => TravelPlan;
  updatePlan: (planId: string, input: UpdateTravelPlanInput) => void;
  removePlan: (planId: string) => void;
  clearPlans: () => void;
  getPlanById: (planId: string) => TravelPlan | undefined;
  getPlansByDestination: (destinationCode: string) => TravelPlan[];
  hasPlansForDestination: (destinationCode: string) => boolean;
};

function normalizePlanId(planId: string) {
  return planId.trim();
}

function normalizeDestinationCode(destinationCode: string) {
  return destinationCode.trim().toUpperCase();
}

function sortPlansByUpdatedAt(plans: TravelPlan[]) {
  return [...plans].sort((left, right) => {
    const leftTime = new Date(left.updatedAt).getTime();
    const rightTime = new Date(right.updatedAt).getTime();

    return rightTime - leftTime;
  });
}

export const usePlannerStore = create<PlannerState>()(
  persist(
    (set, get) => ({
      plans: [],

      createPlan: (input = {}) => {
        const plan = createTravelPlan(input);

        set((state) => ({
          plans: sortPlansByUpdatedAt([plan, ...state.plans]),
        }));

        return plan;
      },

      updatePlan: (planId, input) => {
        const normalizedPlanId = normalizePlanId(planId);

        set((state) => ({
          plans: sortPlansByUpdatedAt(
            state.plans.map((plan) =>
              plan.id === normalizedPlanId
                ? updateTravelPlan(plan, input)
                : plan,
            ),
          ),
        }));
      },

      removePlan: (planId) => {
        const normalizedPlanId = normalizePlanId(planId);

        set((state) => ({
          plans: state.plans.filter((plan) => plan.id !== normalizedPlanId),
        }));
      },

      clearPlans: () => {
        set({
          plans: [],
        });
      },

      getPlanById: (planId) => {
        const normalizedPlanId = normalizePlanId(planId);

        return get().plans.find((plan) => plan.id === normalizedPlanId);
      },

      getPlansByDestination: (destinationCode) => {
        const normalizedDestinationCode =
          normalizeDestinationCode(destinationCode);

        if (!normalizedDestinationCode) {
          return [];
        }

        return sortPlansByUpdatedAt(
          get().plans.filter(
            (plan) => plan.destinationCode === normalizedDestinationCode,
          ),
        );
      },

      hasPlansForDestination: (destinationCode) => {
        const normalizedDestinationCode =
          normalizeDestinationCode(destinationCode);

        if (!normalizedDestinationCode) {
          return false;
        }

        return get().plans.some(
          (plan) => plan.destinationCode === normalizedDestinationCode,
        );
      },
    }),
    {
      name: storageKeys.planner,
      storage: createJSONStorage(() => window.localStorage),
      partialize: (state) => ({
        plans: state.plans,
      }),
    },
  ),
);