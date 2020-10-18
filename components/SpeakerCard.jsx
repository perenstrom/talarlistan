import React from "react";
import styles from "./SpeakerCard.module.css";

export const SpeakerCard = React.memo(function SpeakerCard(props) {
  const { speaker, you = false, index } = props;

  const extraStyles = you ? styles.active : "";
  return (
    <li key={speaker.id} className={`${styles.card} ${extraStyles}`}>
      <h2 className={styles.heading}>
        {index}. {speaker.name}
      </h2>
      <span className={styles.timeStamp}>{speaker.created_at}</span>
    </li>
  );
});
