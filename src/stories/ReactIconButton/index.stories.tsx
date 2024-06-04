import { FaBeer } from "react-icons/fa";

import { ReactIconButton } from ".";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: ReactIconButton,
} satisfies Meta<typeof ReactIconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <FaBeer />,
    handleClick: () => {},
  },
};
