import { ARController } from ".";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: ARController,
} satisfies Meta<typeof ARController>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    handleARButtonClick: () => {},
    handleShrink: () => {},
    handleEnlarge: () => {},
    handleRotateLeft: () => {},
    handleRotateRight: () => {},
    handleToggleReticleVisible: () => {},
  },
  render: ({
    handleARButtonClick,
    handleShrink,
    handleEnlarge,
    handleRotateLeft,
    handleRotateRight,
    handleToggleReticleVisible,
  }) => (
    <div
      style={{
        position: "relative",
        height: "100vh",
      }}
    >
      <ARController
        handleARButtonClick={handleARButtonClick}
        handleShrink={handleShrink}
        handleEnlarge={handleEnlarge}
        handleRotateLeft={handleRotateLeft}
        handleRotateRight={handleRotateRight}
        handleToggleReticleVisible={handleToggleReticleVisible}
      />
    </div>
  ),
};
