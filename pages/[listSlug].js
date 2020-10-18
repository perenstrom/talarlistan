import React from "react";
import Head from "next/head";

import styles from "../styles/Home.module.css";

export default function List(props) {
  const { list } = props;

  return (
    <div className={styles.container}>
      <Head>
        <title>Talarlistan | {list.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>{list.name}</h1>
    </div>
  );
}

export async function getServerSideProps(context) {
  const {
    params: { listSlug = "" },
  } = context;

  const res = await fetch(`${process.env.API_URL}/api/lists/${listSlug}`);
  const data = await res.json();

  return { props: { list: data.list } };
}
