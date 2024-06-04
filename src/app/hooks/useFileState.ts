import { useState } from "react";

import { FileState } from "@/types";

export const useFileState = () => {
  // ファイル情報の管理
  const [fileState, setFileState] = useState<FileState>({
    url: "",
    extension: "",
    aspect: 1,
  });

  /** ファイル選択時のハンドラー */
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const extension = file.name.split(".").pop();
      if (!extension) {
        return;
      }

      // ファイルの width, height を取得
      const img = new Image();
      img.src = url;
      await new Promise((resolve) => {
        img.onload = resolve;
      });
      const width = img.width;
      const height = img.height;
      const aspect = width / height;

      setFileState({ url, extension, aspect });
    }
  };

  const resetFileState = () => {
    setFileState({ url: "", extension: "", aspect: 1 });
  };

  return { fileState, handleFileChange, resetFileState };
};
