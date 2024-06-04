import { ARButton } from ".";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: ARButton,
} satisfies Meta<typeof ARButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "START AR",
    disabled: false,
    handleClick: () => {},
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};
