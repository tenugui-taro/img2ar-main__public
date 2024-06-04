"use client";

import styles from "./style.module.css";

interface ARButtonProps {
  label: string;
  disabled?: boolean;
  handleClick: () => void;
}

export function ARButton({ label, disabled, handleClick }: ARButtonProps) {
  return (
    <button
      className={styles.arButton}
      disabled={disabled}
      onClick={handleClick}
    >
      {label}
    </button>
  );
}
