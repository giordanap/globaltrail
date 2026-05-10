import type { Preview } from "@storybook/nextjs-vite";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    layout: "centered",
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "GlobalTrail",
      values: [
        {
          name: "GlobalTrail",
          value: "#f7f5ef",
        },
        {
          name: "Cloud",
          value: "#fbfaf7",
        },
        {
          name: "Deep Ocean",
          value: "#0b1220",
        },
      ],
    },
  },
};

export default preview;