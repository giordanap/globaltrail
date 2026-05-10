import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TravelPlanCard } from "@/modules/planner/components/travel-plan-card";
import {
  ideaTravelPlan,
  planningTravelPlan,
} from "@/shared/storybook/travel-fixtures";

const meta = {
  title: "Travel/TravelPlanCard",
  component: TravelPlanCard,
  parameters: {
    layout: "centered",
  },
  args: {
    plan: planningTravelPlan,
    onEdit: () => undefined,
    onRemove: () => undefined,
  },
  decorators: [
    (Story) => (
      <div className="w-[min(28rem,calc(100vw-2rem))]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TravelPlanCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Planning: Story = {};

export const IdeaWithoutDatesOrBudget: Story = {
  args: {
    plan: ideaTravelPlan,
  },
};

export const Booked: Story = {
  args: {
    plan: {
      ...planningTravelPlan,
      id: "plan-spain-booked",
      title: "Booked Spain city break",
      status: "booked",
      notes:
        "Flights are booked. Confirm local holidays, weather and a flexible daily route before finalizing reservations.",
      updatedAt: "2026-05-10T15:30:00.000Z",
    },
  },
};

export const Completed: Story = {
  args: {
    plan: {
      ...planningTravelPlan,
      id: "plan-spain-completed",
      title: "Completed Spain notes",
      status: "completed",
      notes:
        "Keep this plan as a reference for future comparisons and destination planning.",
      updatedAt: "2026-05-11T08:30:00.000Z",
    },
  },
};