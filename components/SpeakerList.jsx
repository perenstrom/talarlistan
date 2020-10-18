import React from "react";

import styles from "./SpeakerList.module.css";
import { SpeakerCard } from "./SpeakerCard";

export const SpeakerList = React.memo(function SpeakerList(props) {
  const { speakers, activeSpeakerId, admin = false, apiUrl } = props;

  if (speakers.length === 0) {
    return <div>Talarlistan är tom</div>;
  } else {
    return (
      <ul className={styles.list}>
        {speakers.map((speaker, index) => (
          <SpeakerCard
            key={speaker.id}
            speaker={speaker}
            index={index + 1}
            you={speaker.id === activeSpeakerId}
            admin={admin}
            apiUrl={apiUrl}
          />
        ))}
      </ul>
    );
  }
});
