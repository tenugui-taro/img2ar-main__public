"use client";

import { useRef } from "react";

import styles from "./style.module.css";

interface FileSelectProps {
  fileUrl: string | null;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FileSelect({ fileUrl, handleFileChange }: FileSelectProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <div
        className={styles.FileSelect__container}
        onClick={handleContainerClick}
      >
        {fileUrl ? (
          <div className={styles.FileSelect__previewContainer}>
            <img
              src={fileUrl}
              alt="Selected Preview"
              className={styles.FileSelect__preview}
            />
          </div>
        ) : (
          <p className={styles.FileSelect__description}>ファイルを選択</p>
        )}
        <label className={styles.FileSelect__input}>
          Select Image
          <input
            type="file"
            accept="image/png, image/gif"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </label>
      </div>
      <div className={styles.FileSelect__note}>
        <p>ファイルはローカルで処理されます。</p>
        <p>サーバーに送信されることはありません。</p>
      </div>
    </>
  );
}
