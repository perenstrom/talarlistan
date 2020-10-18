import React from "react";
import styles from "./SpeakerCard.module.css";
import { mutate } from "swr";

import { SPEAKER_STATUS } from "../consts/speakerStatus";

export const SpeakerCard = React.memo(function SpeakerCard(props) {
  const { speaker, you = false, index, admin = false, apiUrl } = props;

  const extraStyles = you ? styles.active : "";

  const updateSpeaker = (status) => {
    const url = `/api/speakers/${speaker.id}`;
    const options = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        name: speaker.name,
        status: status,
      }),
    };

    fetch(url, options)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          console.error(response.status);
        }
      })
      .then(() => {
        mutate(apiUrl);
      });
  };

  const markComplete = (event) => {
    event.preventDefault();
    updateSpeaker(SPEAKER_STATUS.hasSpoken);
  };

  const removeSpeaker = (event) => {
    event.preventDefault();
    updateSpeaker(SPEAKER_STATUS.removedByAdmin);
  };

  return (
    <li className={`${styles.card} ${extraStyles}`}>
      <h2 className={styles.heading}>
        {index}. {speaker.name}
      </h2>
      <span className={styles.timeStamp}>{speaker.created_at}</span>
      {admin && (
        <>
          {index === 1 && (
            <button
              className={styles.markCompleteButton}
              onClick={markComplete}
            >
              Personen har pratat
            </button>
          )}
          <button className={styles.removeButton} onClick={removeSpeaker}>
            Ta bort ur talarlistan
          </button>
        </>
      )}
    </li>
  );
});
