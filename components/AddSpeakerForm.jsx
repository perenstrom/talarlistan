import React from "react";
import styles from "./AddSpeakerForm.module.css";

export const AddSpeakerForm = React.memo(function AddSpeakerForm(props) {
  const { onSubmit, name, setName } = props;

  return (
    <form onSubmit={onSubmit} className={styles.submitForm}>
      <label htmlFor="name" className={styles.label}>
        Ditt namn:
      </label>
      <input
        type="text"
        name="name"
        id="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        className={styles.nameInput}
      />
      <button type="submit" className={styles.submitButton}>
        Jag vill prata
      </button>
    </form>
  );
});
