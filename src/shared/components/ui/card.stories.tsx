import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";

const meta = {
  title: "UI/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "soft", "warm"],
    },
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DestinationInsight: Story = {
  args: {
    variant: "default",
    className: "w-[22rem] p-6",
    children: (
      <div>
        <Badge variant="ocean">Country insight</Badge>

        <h2 className="mt-5 text-2xl font-black tracking-[-0.05em] text-foreground">
          Spain travel context
        </h2>

        <p className="mt-3 text-sm leading-7 text-muted-strong">
          Review country signals, weather, currency and local planning context
          in one calm destination card.
        </p>

        <div className="mt-6">
          <Button size="sm">View country</Button>
        </div>
      </div>
    ),
  },
};

export const WarmPlannerCard: Story = {
  args: {
    variant: "warm",
    className: "w-[22rem] p-6",
    children: (
      <div>
        <Badge variant="sand">Planning flow</Badge>

        <h2 className="mt-5 text-2xl font-black tracking-[-0.05em] text-foreground">
          Keep plans simple.
        </h2>

        <p className="mt-3 text-sm leading-7 text-muted-strong">
          Capture notes, timing and lightweight budget ideas before the trip
          becomes real.
        </p>
      </div>
    ),
  },
};