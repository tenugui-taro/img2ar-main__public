"use client";

import styles from "./style.module.css";

interface ButtonPanelProps {
  children: React.ReactNode;
}

export function ButtonPanel({ children }: ButtonPanelProps) {
  return <div className={styles.buttonPanel}>{children}</div>;
}
