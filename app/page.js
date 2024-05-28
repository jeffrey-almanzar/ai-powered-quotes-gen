'use client';


import Image from "next/image";
import styles from "./page.module.css";
import aiCall from '../lib/openai';

export default function Home() {
  return (
    <main className={styles.main}>
     <button onClick={() => aiCall()}>Test</button>
    </main>
  );
}
