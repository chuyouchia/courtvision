import React,{ useEffect } from "react";
import Link from "next/link";
import styles from '../styles/Home.module.css'

const List = () => {
  //get the video thumbnails from the backend

  return (
    <>
      <h1
        className={styles.title}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: '30px',
        }}
      >
        Start by selecting one of the snapshots!
      </h1>
      
      <main className={styles.main}>
        <div className={styles.grid}>
          <div className={styles.card}>
            <Link href="/view?i=1">image 1</Link>
          </div>
          <div className={styles.card}>
            <Link href="/view?i=2">image 2</Link>
          </div>

          <div className={styles.card}>
            <Link href="/view?i=3">image 3</Link>
          </div>
          <span className={styles.card}>
            <Link href="/view?i=4">image 4</Link>
          </span>
        </div>
      </main>
    </>
  );
};
export default List;
