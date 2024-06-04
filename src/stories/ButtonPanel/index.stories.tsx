import { ButtonPanel } from ".";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: ButtonPanel,
} satisfies Meta<typeof ButtonPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <div>Children</div>,
  },
};
