"use client";

import { useState } from "react";
import Link from "next/link";
import WordDuel from "@/components/onboarding/WordDuel";
import { createTasteProfile } from "@/features/taste/service";
import { TasteDuel } from "@/features/taste/types";
import { storage } from "@/lib/storage";
import styles from "@/app/site.module.css";

const fakeGames = [{ number: "02", title: "ROOM / OBJECT", text: "Build a room from the objects you cannot stop noticing." }, { number: "03", title: "MEMORY / MATERIAL", text: "Match a memory to the texture it left behind." }];

export default function GamesPage() {
  const [completedWord, setCompletedWord] = useState("");
  async function finishGame(word: string, duels: TasteDuel[]) {
    const profile = await storage.getTaste() ?? createTasteProfile();
    const alreadyAdded = profile.tags.some((tag) => tag.label === word);
    const nextProfile = { ...profile, tags: alreadyAdded ? profile.tags : [...profile.tags, { id: `test-${word.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`, label: word, source: "test" as const, createdAt: new Date().toISOString(), x: 160 + (profile.tags.length % 4) * 180, y: 170 + (profile.tags.length % 3) * 100, groupIds: [], isOriginal: false }], duels: [...profile.duels, ...duels], updatedAt: new Date().toISOString() };
    await storage.saveTaste(nextProfile);
    setCompletedWord(word);
  }
  return <main className={styles.page}><div className={styles.routeTop}><Link href="/explore">EXPLORE MORE</Link><span>MORE GAMES &amp; TESTS</span><Link href="/">BACK TO WORLD -&gt;</Link></div><section className={styles.gamesHero}><span className={styles.mono}>NEW WORDS / EVERY WEEK</span><h1 className={styles.pageTitle}>MORE<br /><em>GAMES.</em></h1><p>Every week we add new words and new ways to find a connection. Finish a game and its final winning word joins your home Canvas.</p></section><section className={styles.primaryGame}><div className={styles.gameLabel}><span>01 / FIND YOUR WORDS</span><span>TREE DUEL / WEEKLY WORD DROP</span></div><WordDuel onComplete={finishGame} />{completedWord && <p className={styles.gameComplete}>YOUR FINAL WORD: <strong>{completedWord}</strong> / ADDED TO YOUR WORLD</p>}</section><section className={styles.fakeGames}><div className={styles.mono}>COMING NEXT / DEMO GAMES</div>{fakeGames.map((game) => <article className={styles.fakeGame} key={game.number}><span>{game.number}</span><div><h2>{game.title}</h2><p>{game.text}</p></div><button>COMING SOON <span>-&gt;</span></button></article>)}</section></main>;
}