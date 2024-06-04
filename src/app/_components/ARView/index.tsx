import { useEffect, useRef } from "react";
import { TbView360Arrow } from "react-icons/tb";

import { ARController } from "@/stories/ARController";
import { FileState } from "@/types";
import { createThreeManager } from "@/utils";

import styles from "./style.module.css";

interface ARViewProps {
  fileState: FileState;
  handleARButtonClick: () => void;
}

export const ARView = ({
  fileState: { url, extension, aspect },
  handleARButtonClick,
}: ARViewProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const threeManager = createThreeManager(url, extension, aspect, () => {
    if (overlayRef.current) {
      overlayRef.current.style.display = "none";
    }
  });

  useEffect(() => {
    if (threeManager == null) return;
    threeManager.startARSession();
    return () => {
      threeManager.endARSession();
    };
  }, [threeManager]);

  return (
    <div>
      <div ref={overlayRef} className={styles.overlay}>
        <h2>マーカー表示までお待ちください</h2>
        <div className={styles.overlay__icon}>
          <TbView360Arrow />
        </div>
        <p>周囲を見渡すと、平面が検出されやすいです🚀</p>
      </div>
      {threeManager && (
        <ARController
          handleARButtonClick={handleARButtonClick}
          handleShrink={threeManager.shrinkMesh}
          handleEnlarge={threeManager.enlargeMesh}
          handleRotateLeft={threeManager.rotateLeft}
          handleRotateRight={threeManager.rotateRight}
          handleToggleReticleVisible={threeManager.toggleReticleVisible}
        />
      )}
    </div>
  );
};
