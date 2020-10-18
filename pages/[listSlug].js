import React, { useState } from "react";
import Head from "next/head";
import useSWR, { mutate } from "swr";

import styles from "../styles/Home.module.css";

export default function List(props) {
  const { list } = props;

  const apiUrl = `/api/lists/${list.slug}/speakers`;
  console.log(apiUrl);
  const { data = {}, error } = useSWR(apiUrl, undefined, {
    refreshInterval: 5000,
    initialData: list.speakers,
  });

  console.log(data);
  const speakers = data;

  const [name, setName] = useState("");
  const [activeSpeaker, setActiveSpeaker] = useState(false);
  const [activeSpeakerId, setActiveSpeakerId] = useState(null);

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
        setName("");
        setActiveSpeakerId(data.id);
        setActiveSpeaker(true);
        mutate(apiUrl);
      });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Talarlistan | {list.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>{list.name}</h1>
      {error ? (
        <div>Något gick fel, uppdatera sidan!</div>
      ) : (
        <>
          {speakers.length > 0 && (
            <ul>
              {speakers.map((speaker) => (
                <li key={speaker.id}>
                  {speaker.name} ({speaker.created_at})
                </li>
              ))}
            </ul>
          )}
          {!activeSpeaker ? (
            <form onSubmit={onSubmit}>
              <label>
                Ditt namn
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </label>
              <button type="submit">Jag vill prata</button>
            </form>
          ) : (
            <button>Jag vill inte prata längre</button>
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
