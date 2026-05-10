import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "@/shared/components/ui/button";

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  args: {
    children: "Explore countries",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost"],
    },
    size: {
      control: "select",
      options: ["sm", "md"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Saved destinations",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Compare later",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    children: "Try again",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Preparing",
  },
};