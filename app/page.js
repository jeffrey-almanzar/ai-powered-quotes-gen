'use client';

import Image from "next/image";
import styles from "./page.module.css";
import aiCall from '../lib/openai';
import seed from "../lib/firebase/seed";

export default function Home() {
  return (
    <main className={styles.main}>
     <button onClick={() => seed()}>Test</button>
    </main>
  );
}
