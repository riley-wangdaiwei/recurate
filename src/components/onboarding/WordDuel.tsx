"use client";

import { useState } from "react";
import { duelPairs } from "@/data/duel-pairs";
import { TasteDuel } from "@/features/taste/types";
import styles from "@/app/site.module.css";

export default function WordDuel({ onComplete }: { onComplete: (word: string, duels: TasteDuel[]) => void }) {
  const [index, setIndex] = useState(0);
  const [selectedWord, setSelectedWord] = useState("");
  const [duels, setDuels] = useState<TasteDuel[]>([]);
  const basePair = duelPairs[index];
  const pair = index === 0 ? basePair : { ...basePair, left: selectedWord };
  function choose(word: string) {
    const nextDuels = [...duels, { id: `duel-${index + 1}`, left: pair.left, right: pair.right, winner: word, createdAt: new Date().toISOString() }];
    if (index === duelPairs.length - 1) { onComplete(word, nextDuels); return; }
    setDuels(nextDuels); setSelectedWord(word); setIndex((current) => current + 1);
  }
  return <section className={styles.onboardingStage}><div className={styles.progressLine}><span>CHOOSE 1 / {duelPairs.length}</span><span>{String(index + 1).padStart(2, "0")} / 10</span></div><h1 className={styles.displayTitle}>FIND<br />YOUR<br /><em>WORDS.</em></h1><p className={styles.mono}>{index === 0 ? "START WITH A DIRECTION." : "KEEP YOUR WORD OR FOLLOW THE NEW ONE."}</p><div className={styles.duelGrid}><button className={`${styles.duelCard} ${styles.duelCardGreen}`} onClick={() => choose(pair.left)}>{pair.left}</button><button className={`${styles.duelCard} ${styles.duelCardRed}`} onClick={() => choose(pair.right)}>{pair.right}</button></div><div className={styles.selectionTrail}>{duels.map((duel) => <span key={duel.id}>{duel.winner}</span>)}{selectedWord && <span className={styles.currentTrail}>{selectedWord}</span>}</div><p className={styles.mono}>NO WRONG ANSWERS. JUST DIRECTIONS.</p></section>;
}