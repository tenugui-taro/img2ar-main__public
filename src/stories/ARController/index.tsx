"use client";

import { useState } from "react";
import { FaRotateLeft, FaRotateRight } from "react-icons/fa6";
import { ImEnlarge2, ImShrink2 } from "react-icons/im";
import { TbCircle, TbCircleOff } from "react-icons/tb";

import { ARButton } from "../ARButton";
import { ButtonPanel } from "../ButtonPanel";
import { ReactIconButton } from "../ReactIconButton";

import styles from "./style.module.css";

interface ARControllerProps {
  handleARButtonClick: () => void;
  handleShrink: () => void;
  handleEnlarge: () => void;
  handleRotateLeft: () => void;
  handleRotateRight: () => void;
  handleToggleReticleVisible: () => void;
}

export function ARController({
  handleARButtonClick,
  handleShrink,
  handleEnlarge,
  handleRotateLeft,
  handleRotateRight,
  handleToggleReticleVisible,
}: ARControllerProps) {
  const [reticleVisible, setReticleVisible] = useState(true);

  return (
    <div className={styles.arController}>
      <ButtonPanel>
        <ReactIconButton handleClick={handleShrink}>
          <ImShrink2 />
        </ReactIconButton>
        <ReactIconButton handleClick={handleEnlarge}>
          <ImEnlarge2 />
        </ReactIconButton>
        <ReactIconButton handleClick={handleRotateLeft}>
          <FaRotateLeft />
        </ReactIconButton>
        <ReactIconButton handleClick={handleRotateRight}>
          <FaRotateRight />
        </ReactIconButton>
        <ReactIconButton
          handleClick={() => {
            handleToggleReticleVisible();
            setReticleVisible((prev) => !prev);
          }}
        >
          {reticleVisible ? <TbCircleOff /> : <TbCircle />}
        </ReactIconButton>
      </ButtonPanel>

      <ARButton label="STOP AR" handleClick={handleARButtonClick} />
    </div>
  );
}
