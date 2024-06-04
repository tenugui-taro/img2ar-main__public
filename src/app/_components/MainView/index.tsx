import { ARButton } from "@/stories/ARButton";
import { FileSelect } from "@/stories/FileSelect";
import { Header } from "@/stories/Header";

import styles from "./style.module.css";

interface MainViewProps {
  fileUrl: string;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleARButtonClick: () => void;
}

export const MainView = ({
  fileUrl,
  handleFileChange,
  handleARButtonClick,
}: MainViewProps) => {
  return (
    <div className={styles.mainView__container}>
      <div className={styles.mainView__headerContainer}>
        <Header />
      </div>
      <div className={styles.mainView__fileSelectContainer}>
        <FileSelect fileUrl={fileUrl} handleFileChange={handleFileChange} />
      </div>
      <div className={styles.mainView__arButtonContainer}>
        <ARButton
          label={"START AR"}
          disabled={fileUrl === ""}
          handleClick={handleARButtonClick}
        />
      </div>
    </div>
  );
};
