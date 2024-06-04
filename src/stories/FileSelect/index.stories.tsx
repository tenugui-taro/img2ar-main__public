import { FileSelect } from ".";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: FileSelect,
} satisfies Meta<typeof FileSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fileUrl: null,
    handleFileChange: () => {},
  },
};
