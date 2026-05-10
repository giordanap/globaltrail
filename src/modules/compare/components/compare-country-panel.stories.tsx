import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CompareCountryPanel } from "@/modules/compare/components/compare-country-panel";
import {
  japanCountry,
  spainCountry,
} from "@/shared/storybook/travel-fixtures";

const meta = {
  title: "Travel/CompareCountryPanel",
  component: CompareCountryPanel,
  parameters: {
    layout: "centered",
  },
  args: {
    side: "Left",
    code: "ES",
    country: spainCountry,
    isLoading: false,
    isError: false,
    weatherLabel: "21°C · Clear sky",
    onRetry: () => undefined,
    onRemove: () => undefined,
  },
  decorators: [
    (Story) => (
      <div className="w-[min(34rem,calc(100vw-2rem))]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CompareCountryPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SpainLoaded: Story = {};

export const JapanLoaded: Story = {
  args: {
    side: "Right",
    code: "JP",
    country: japanCountry,
    weatherLabel: "17°C · Cloudy",
  },
};

export const OpenSlot: Story = {
  args: {
    side: "Right",
    code: null,
    country: null,
    weatherLabel: "Unavailable",
  },
};

export const Loading: Story = {
  args: {
    side: "Left",
    code: "ES",
    country: null,
    isLoading: true,
    isError: false,
    weatherLabel: "Loading",
  },
};

export const Error: Story = {
  args: {
    side: "Left",
    code: "ES",
    country: null,
    isLoading: false,
    isError: true,
    weatherLabel: "Weather unavailable",
  },
};

export const WeatherUnavailable: Story = {
  args: {
    side: "Left",
    code: "ES",
    country: spainCountry,
    isLoading: false,
    isError: false,
    weatherLabel: "Weather unavailable",
  },
};