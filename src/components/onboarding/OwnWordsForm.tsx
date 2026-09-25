"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createInitialTags } from "@/features/taste/engine";
import { createTasteProfile } from "@/features/taste/service";
import { TasteDuel } from "@/features/taste/types";
import { storage } from "@/lib/storage";
import styles from "@/app/site.module.css";

export default function OwnWordsForm({ selectedWord, duels }: { selectedWord: string; duels: TasteDuel[] }) {
  const router = useRouter();
  const [words, setWords] = useState(["", ""]);
  const [error, setError] = useState("");
  async function submit(event: FormEvent) { event.preventDefault(); if (words.some((word) => !word.trim())) { setError("ADD BOTH WORDS TO CONTINUE"); return; } await storage.saveTaste({ ...createTasteProfile(createInitialTags(selectedWord, words[0], words[1])), duels }); router.push("/"); }
  return <section className={styles.ownWords}><div className={styles.progressLine}><span>YOUR TURN</span><span>3 INITIAL TAGS</span></div><h1 className={styles.displayTitle}>ADD TWO<br /><em>OF YOUR<br />OWN.</em></h1><p className={styles.mono}>KEEP {selectedWord}. THEN ADD THE WORDS ONLY YOU WOULD CHOOSE.</p><form className={styles.wordForm} onSubmit={submit}><label><span>02 / YOUR WORD</span><input autoFocus value={words[0]} onChange={(event) => setWords([event.target.value, words[1]])} placeholder="TYPE A WORD" /></label><label><span>03 / YOUR WORD</span><input value={words[1]} onChange={(event) => setWords([words[0], event.target.value])} placeholder="TYPE A WORD" /></label>{error && <p className={styles.formError}>{error}</p>}<button className={styles.primaryButton} type="submit">CREATE MY WORLD <span>-&gt;</span></button></form></section>;
}