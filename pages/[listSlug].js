import React, { useState } from "react";
import Head from "next/head";
import useSWR, { mutate } from "swr";

import { SPEAKER_STATUS } from "../consts/speakerStatus";

import { SpeakerList } from "../components/SpeakerList";
import { AddSpeakerForm } from "../components/AddSpeakerForm";
import { CancelButton } from "../components/CancelButton";

export default function List(props) {
  const { list } = props;

  const [name, setName] = useState("");
  const [activeSpeaker, setActiveSpeaker] = useState(false);
  const [activeSpeakerId, setActiveSpeakerId] = useState(null);
  const [activeSpeakerName, setActiveSpeakerName] = useState("");

  const checkSpeakerRemoved = (speakers) => {
    const speakerExists = speakers.find(
      (speaker) => speaker.id === activeSpeakerId
    );
    if (!speakerExists) {
      resetState();
    }
  };

  const apiUrl = `/api/lists/${list.slug}/speakers`;
  const { data = {}, error } = useSWR(apiUrl, undefined, {
    refreshInterval: 5000,
    initialData: list.speakers,
    onSuccess: checkSpeakerRemoved,
  });
  const speakers = data;

  const resetState = () => {
    setActiveSpeakerName("");
    setActiveSpeakerId(null);
    setActiveSpeaker(false);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const url = "/api/speakers";
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        name: name,
        listId: list.id,
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
      .then((data) => {
        setActiveSpeakerName(name);
        setActiveSpeakerId(data.id);
        setActiveSpeaker(true);
        mutate(apiUrl);
      });
  };

  const handleCancel = (event) => {
    event.preventDefault();

    const url = `/api/speakers/${activeSpeakerId}`;
    const options = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        name: activeSpeakerName,
        status: SPEAKER_STATUS.removedBySpeaker,
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
        resetState();
        mutate(apiUrl);
      });
  };

  return (
    <div>
      <Head>
        <title>Talarlistan | {list.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="listHeading">{list.name}</h1>
      {error ? (
        <div>Något gick fel, uppdatera sidan!</div>
      ) : (
        <>
          <SpeakerList speakers={speakers} activeSpeakerId={activeSpeakerId} />
          {!activeSpeaker ? (
            <AddSpeakerForm onSubmit={onSubmit} name={name} setName={setName} />
          ) : (
            <CancelButton handleCancel={handleCancel} />
          )}
        </>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const {
    params: { listSlug = "" },
  } = context;

  const res = await fetch(`${process.env.API_URL}/api/lists/${listSlug}`);
  const list = await res.json();

  return { props: { list } };
}
