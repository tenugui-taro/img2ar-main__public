"use client";

import { useEffect, useState } from "react";

import { useFileState } from "@/app/hooks/useFileState";
import { ViewMode } from "@/types";

import { ARView } from "../ARView";
import { LoadingView } from "../LoadingView";
import { MainView } from "../MainView";
import { NotSupportedView } from "../NotSupportedView";

export const AppMain = () => {
  // 画面表示の管理
  const [viewMode, setViewMode] = useState<ViewMode>("loading");

  const { fileState, handleFileChange, resetFileState } = useFileState();

  useEffect(() => {
    // ARがサポートされているか確認
    const checkArSupport = async () => {
      if (navigator.xr) {
        const isSupported =
          await navigator.xr.isSessionSupported("immersive-ar");
        setViewMode(isSupported ? "main" : "arNotSupported");
      } else {
        setViewMode("arNotSupported");
      }
    };
    checkArSupport();
  }, []);

  return (
    <>
      {viewMode === "loading" && <LoadingView />}
      {viewMode === "arNotSupported" && <NotSupportedView />}
      {viewMode === "main" && (
        <MainView
          fileUrl={fileState.url}
          handleFileChange={handleFileChange}
          handleARButtonClick={() => setViewMode("arSession")}
        />
      )}
      {viewMode === "arSession" && (
        <ARView
          fileState={fileState}
          handleARButtonClick={() => {
            resetFileState();
            setViewMode("main");
          }}
        />
      )}
    </>
  );
};
