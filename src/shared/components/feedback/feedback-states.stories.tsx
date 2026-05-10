import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ClientStatePanelFallback } from "@/shared/components/feedback/client-state-fallback";
import { EmptyState } from "@/shared/components/feedback/empty-state";
import { ErrorState } from "@/shared/components/feedback/error-state";
import { PartialApiState } from "@/shared/components/feedback/partial-api-state";
import { Button } from "@/shared/components/ui/button";

const meta = {
  title: "Feedback/States",
  parameters: {
    layout: "centered",
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const EmptySavedDestinations: Story = {
  render: () => (
    <div className="w-[min(32rem,calc(100vw-2rem))]">
      <EmptyState
        icon="♡"
        title="No saved destinations yet."
        description="Explore countries and save the places you want to revisit, compare or plan around later."
        action={<Button>Explore countries</Button>}
      />
    </div>
  ),
};

export const DestinationUnavailable: Story = {
  render: () => (
    <div className="w-[min(32rem,calc(100vw-2rem))]">
      <ErrorState
        title="We could not load this destination."
        description="This destination view is temporarily unavailable. Try again to refresh the travel context."
        action={<Button>Try again</Button>}
      />
    </div>
  ),
};

export const WeatherUnavailable: Story = {
  render: () => (
    <div className="w-[min(32rem,calc(100vw-2rem))]">
      <PartialApiState
        eyebrow="Weather unavailable"
        title="We could not load the weather outlook."
        description="The destination profile remains available while this travel signal is temporarily unavailable."
        icon="☁"
        tone="error"
      />
    </div>
  ),
};

export const ClientPreparation: Story = {
  render: () => (
    <div className="w-[min(32rem,calc(100vw-2rem))]">
      <ClientStatePanelFallback
        eyebrow="Travel note"
        icon="✎"
        title="Preparing notes for this destination."
        description="Your destination notes will appear here once the panel is ready."
      />
    </div>
  ),
};