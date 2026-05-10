import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FavoriteDestinationCard } from "@/modules/favorites/components/favorite-destination-card";
import {
  japanFavoriteDestination,
  spainFavoriteDestination,
} from "@/shared/storybook/travel-fixtures";

const meta = {
  title: "Travel/FavoriteDestinationCard",
  component: FavoriteDestinationCard,
  parameters: {
    layout: "centered",
  },
  args: {
    destination: spainFavoriteDestination,
    rank: 1,
  },
  decorators: [
    (Story) => (
      <div className="w-[min(24rem,calc(100vw-2rem))]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FavoriteDestinationCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SavedSpain: Story = {};

export const SavedJapan: Story = {
  args: {
    destination: japanFavoriteDestination,
    rank: 2,
  },
};

export const WithoutFlag: Story = {
  args: {
    destination: {
      ...spainFavoriteDestination,
      flag: {
        png: null,
        svg: null,
        alt: "Flag unavailable",
      },
    },
    rank: 3,
  },
};