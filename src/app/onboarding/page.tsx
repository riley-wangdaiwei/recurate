"use client";

import { useState } from "react";
import Link from "next/link";
import WordDuel from "@/components/onboarding/WordDuel";
import OwnWordsForm from "@/components/onboarding/OwnWordsForm";
import styles from "@/app/site.module.css";
import { TasteDuel } from "@/features/taste/types";

export default function OnboardingPage() {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [duels, setDuels] = useState<TasteDuel[]>([]);
  return <main className={styles.page}><div className={styles.routeTop}><Link href="/">REC*</Link><span>ONBOARDING / YOUR FIRST WORLD</span><span>01</span></div>{selectedWord ? <OwnWordsForm selectedWord={selectedWord} duels={duels} /> : <WordDuel onComplete={(word, history) => { setSelectedWord(word); setDuels(history); }} />}</main>;
}