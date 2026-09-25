"use client";

import { useState } from "react";
import Image from "next/image";
import { GiftItem } from "@/features/commerce/types";
import styles from "@/app/site.module.css";
import giftStyles from "./GiftBasket.module.css";

export default function GiftBasket({ items }: { items: GiftItem[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  if (!items.length) return null;
  return <div className={styles.giftBasket}><div className={styles.sectionIntro}><span className={styles.mono}>CURATED FOR YOU / DEMO</span><h2>THE<br /><em>ARTIST PICKS.</em></h2></div>{items.map((item, index) => <section className={giftStyles.curatorLayout} key={item.id}><div className={giftStyles.questionWheel} aria-label={`${item.artistName} curation wheel`}><span className={`${giftStyles.question} ${giftStyles.questionOne}`}>?</span><span className={`${giftStyles.question} ${giftStyles.questionTwo}`}>?</span><span className={`${giftStyles.question} ${giftStyles.questionThree}`}>?</span><span className={`${giftStyles.question} ${giftStyles.questionFour}`}>?</span><span className={`${giftStyles.question} ${giftStyles.questionFive}`}>?</span><span className={`${giftStyles.question} ${giftStyles.questionSix}`}>?</span><span className={`${giftStyles.question} ${giftStyles.questionSeven}`}>?</span><span className={`${giftStyles.question} ${giftStyles.questionEight}`}>?</span><button className={`${giftStyles.croppedWork} ${selectedId === item.id ? giftStyles.selectedWork : ""}`} onClick={() => setSelectedId((current) => current === item.id ? null : item.id)} aria-pressed={selectedId === item.id}><Image src={item.imageUrl ?? "/patterns/crop-01.svg"} alt={item.title} width={420} height={420} /><span>{selectedId === item.id ? "ADDED" : "ADD TO BASKET"}</span></button></div><div className={giftStyles.curatorCopy}><span className={styles.mono}>0{index + 1} / {item.artistName.toUpperCase()} / TASTE CURATION</span><h3>{item.artistName === "Jack Natos" ? <>PLAY<br /><em>IT WRONG.</em></> : <>SHE READS<br />YOUR <em>TASTE.</em></>}</h3><p>{item.description}</p><div className={giftStyles.artistCredit}><strong>{item.artistName}</strong><span>{item.title} / {item.priceLabel}</span></div></div></section>)}<div className={styles.basketBar}>{selectedId ? "1 OBJECT IN YOUR BASKET" : "CHOOSE AN OBJECT TO KEEP"}<span>PERSONAL CARD INCLUDED -&gt;</span></div></div>;
}