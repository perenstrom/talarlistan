import React from "react";
import Head from "next/head";
import useSWR from "swr";

import { SpeakerList } from "../../components/SpeakerList";

export default function AdminList(props) {
  const { list } = props;

  const apiUrl = `/api/lists/admin/${list.admin_hash}/speakers`;
  const { data = {}, error } = useSWR(apiUrl, undefined, {
    refreshInterval: 1000,
    initialData: list.speakers,
  });

  const speakers = data;

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
          <SpeakerList speakers={speakers} admin={true} apiUrl={apiUrl} />
        </>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const {
    params: { adminId = "" },
  } = context;

  const res = await fetch(`${process.env.API_URL}/api/lists/admin/${adminId}`);
  const list = await res.json();

  return { props: { list } };
}
