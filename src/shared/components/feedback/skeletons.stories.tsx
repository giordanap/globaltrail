import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  ComparePageSkeleton,
  CountriesPageSkeleton,
  FavoritesPageSkeleton,
  PlannerPageSkeleton,
} from "@/shared/components/feedback/route-loading-skeletons";
import { SkeletonBlock } from "@/shared/components/feedback/skeleton-block";
import { Card } from "@/shared/components/ui/card";

const meta = {
  title: "Feedback/Skeletons",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const BasicBlocks: Story = {
  parameters: {
    layout: "centered",
  },
  render: () => (
    <Card className="w-[min(30rem,calc(100vw-2rem))] p-6">
      <SkeletonBlock className="h-6 w-40 rounded-full" />
      <SkeletonBlock className="mt-5 h-12 rounded-2xl" />
      <SkeletonBlock className="mt-4 h-4 w-full rounded-full" />
      <SkeletonBlock className="mt-3 h-4 w-4/5 rounded-full" />
      <div className="mt-6 grid grid-cols-3 gap-3">
        <SkeletonBlock className="h-16 rounded-2xl" />
        <SkeletonBlock className="h-16 rounded-2xl" />
        <SkeletonBlock className="h-16 rounded-2xl" />
      </div>
    </Card>
  ),
};

export const CountriesRoute: Story = {
  render: () => <CountriesPageSkeleton />,
};

export const FavoritesRoute: Story = {
  render: () => <FavoritesPageSkeleton />,
};

export const PlannerRoute: Story = {
  render: () => <PlannerPageSkeleton />,
};

export const CompareRoute: Story = {
  render: () => <ComparePageSkeleton />,
};