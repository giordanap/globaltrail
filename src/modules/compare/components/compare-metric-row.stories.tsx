import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CompareMetricRow } from "@/modules/compare/components/compare-metric-row";

const meta = {
  title: "Travel/CompareMetricRow",
  component: CompareMetricRow,
  parameters: {
    layout: "centered",
  },
  args: {
    label: "Population",
    leftValue: "47,351,567",
    rightValue: "125,836,021",
  },
  decorators: [
    (Story) => (
      <div className="w-[min(56rem,calc(100vw-2rem))]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CompareMetricRow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Population: Story = {};

export const Currency: Story = {
  args: {
    label: "Currency",
    leftValue: "EUR · €",
    rightValue: "JPY · ¥",
  },
};

export const Weather: Story = {
  args: {
    label: "Weather",
    helperText: "Current weather snapshot when coordinates are available.",
    leftValue: "21°C · Clear sky",
    rightValue: "17°C · Cloudy",
  },
};

export const MobileLongValues: Story = {
  args: {
    label: "Travel context",
    helperText: "Small screens show Left and Right labels above each value.",
    leftValue: "Coastal access possible · Drives right · Week starts monday",
    rightValue: "Coastal access possible · Drives left · Week starts monday",
  },
};