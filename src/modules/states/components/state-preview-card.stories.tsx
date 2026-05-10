import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { StatePreviewCard } from "@/modules/states/components/state-preview-card";
import { PartialApiState } from "@/shared/components/feedback/partial-api-state";
import { SkeletonBlock } from "@/shared/components/feedback/skeleton-block";
import { Card } from "@/shared/components/ui/card";

const meta = {
  title: "Travel/StatePreviewCard",
  component: StatePreviewCard,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-[min(34rem,calc(100vw-2rem))]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof StatePreviewCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LoadingPreview: Story = {
  args: {
    eyebrow: "Loading",
    title: "Destination cards loading",
    description:
      "Used while country lists or destination shelves prepare the postcard grid.",
    children: (
      <Card className="overflow-hidden p-0">
        <SkeletonBlock className="h-36 rounded-none" />
        <div className="p-4">
          <SkeletonBlock className="h-5 w-2/3 rounded-full" />
          <SkeletonBlock className="mt-3 h-4 w-1/2 rounded-full" />
          <div className="mt-5 grid grid-cols-3 gap-2">
            <SkeletonBlock className="h-14 rounded-2xl" />
            <SkeletonBlock className="h-14 rounded-2xl" />
            <SkeletonBlock className="h-14 rounded-2xl" />
          </div>
        </div>
      </Card>
    ),
  },
};

export const PartialSignalPreview: Story = {
  args: {
    eyebrow: "Partial signal",
    title: "Weather unavailable",
    description:
      "Used when a supporting travel signal fails but the destination remains useful.",
    children: (
      <PartialApiState
        eyebrow="Weather unavailable"
        title="We could not load the weather outlook."
        description="The destination profile remains available while this travel signal is temporarily unavailable."
        icon="☁"
        tone="error"
      />
    ),
  },
};