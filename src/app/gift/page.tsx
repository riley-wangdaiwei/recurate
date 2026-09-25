import Link from "next/link";
import GiftBasket from "@/components/gift/GiftBasket";
import { seedDrops } from "@/data/seed-drops";
import styles from "@/app/site.module.css";
export default function GiftPage() { return <main className={styles.page}><div className={styles.routeTop}><span>RECURATE* / 05</span><span>FROM YOUR CANVAS</span><Link href="/">BACK TO CANVAS -&gt;</Link></div><GiftBasket items={seedDrops} /></main>; }