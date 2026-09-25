import Link from "next/link";
import styles from "@/app/site.module.css";

const tagPacks = [
  { title: "ROOM / OBJECT", count: "12 TAGS", text: "A deeper set of words for the spaces, objects, and materials around you.", price: "$4.00" },
  { title: "MEMORY / MATERIAL", count: "18 TAGS", text: "Textures, rituals, and small signals for the things that stay.", price: "$5.00" },
];

export default function OrganizePage() {
  return <main className={styles.page}><div className={styles.routeTop}><Link href="/">RECURATE* / HOME</Link><span>ORGANIZE MORE</span><Link href="/">BACK TO WORLD -&gt;</Link></div><section className={styles.offerHero}><span className={styles.mono}>DEEPEN YOUR TAGS</span><h1 className={styles.pageTitle}>ORGANIZE<br /><em>MORE.</em></h1><p>Buy a focused expansion for the World you already started. Add new language, then drag it straight onto your canvas.</p></section><section className={styles.offerGrid}>{tagPacks.map((pack) => <article className={styles.offerCard} key={pack.title}><span className={styles.mono}>{pack.count}</span><h2>{pack.title}</h2><p>{pack.text}</p><strong className={styles.offerPrice}>{pack.price}</strong><button className={styles.offerButton}>ADD PACK <span>-&gt;</span></button></article>)}</section><section className={styles.stickerOffer}><div><span className={styles.mono}>ARTIST-DESIGNED / LIMITED</span><h2>STICKER<br /><em>PACKAGE.</em></h2></div><div><p>Collect a set of pattern stickers from an independent artist. Place them in your World as visual tags, room markers, or a little private language.</p><button className={styles.offerButton}>VIEW ARTIST PACKS <span>-&gt;</span></button></div></section></main>;
}