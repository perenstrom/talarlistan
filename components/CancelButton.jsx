import React from "react";
import styles from "./CancelButton.module.css";

export const CancelButton = React.memo(function CancelButton(props) {
  const { handleCancel } = props;

  return (
    <div className={styles.wrapper}>
      <button onClick={handleCancel} className={styles.cancelButton}>
        Jag vill inte prata längre
      </button>
    </div>
  );
});
