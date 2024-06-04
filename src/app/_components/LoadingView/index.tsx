import styles from "./style.module.css";

export const LoadingView = () => {
  return (
    <div className={styles.loadingView}>
      <h1>Now Loading...</h1>
      <div className={styles.loadingView__spinner} />
    </div>
  );
};
