"use client";

import styles from "./style.module.css";

interface ReactIconButtonProps {
  children: React.ReactNode;
  handleClick: () => void;
}

export function ReactIconButton({
  children,
  handleClick,
}: ReactIconButtonProps) {
  return (
    <button
      className={styles.ReactIconButton}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleClick();
      }}
    >
      {children}
    </button>
  );
}
