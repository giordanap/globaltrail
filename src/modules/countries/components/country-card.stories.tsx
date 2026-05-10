import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CountryCard } from "@/modules/countries/components/country-card";
import {
  japanCountrySummary,
  peruCountrySummary,
  spainCountrySummary,
} from "@/shared/storybook/travel-fixtures";

const meta = {
  title: "Travel/CountryCard",
  component: CountryCard,
  parameters: {
    layout: "centered",
  },
  args: {
    country: spainCountrySummary,
  },
  decorators: [
    (Story) => (
      <div className="w-[min(24rem,calc(100vw-2rem))]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CountryCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Spain: Story = {};

export const Japan: Story = {
  args: {
    country: japanCountrySummary,
  },
};

export const Peru: Story = {
  args: {
    country: peruCountrySummary,
  },
};

export const MissingOptionalSignals: Story = {
  args: {
    country: {
      ...spainCountrySummary,
      capital: null,
      subregion: null,
      currencies: [],
      languages: [],
      flag: {
        png: null,
        svg: null,
        alt: "Flag unavailable",
      },
    },
  },
};