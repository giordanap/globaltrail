import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "@/shared/components/ui/badge";

const meta = {
  title: "UI/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  args: {
    children: "Travel signal",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["neutral", "ocean", "sage", "sand", "terracotta"],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Neutral: Story = {
  args: {
    variant: "neutral",
    children: "Destination",
  },
};

export const Ocean: Story = {
  args: {
    variant: "ocean",
    children: "Live country data",
  },
};

export const Sage: Story = {
  args: {
    variant: "sage",
    children: "Saved",
  },
};

export const Sand: Story = {
  args: {
    variant: "sand",
    children: "Planner",
  },
};

export const Terracotta: Story = {
  args: {
    variant: "terracotta",
    children: "Unavailable",
  },
};