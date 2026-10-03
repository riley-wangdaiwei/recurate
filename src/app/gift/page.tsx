import Link from "next/link";
import GiftPageClient from "@/components/gift/GiftPageClient";
import styles from "@/app/site.module.css";

export default function GiftPage() {
  return (
    <main className={styles.page}>
      <div className={styles.routeTop}>
        <span>RECURATE* / 05</span>
        <span>FROM YOUR CANVAS</span>
        <Link href="/">BACK TO CANVAS -&gt;</Link>
      </div>
      <GiftPageClient />
    </main>
  );
}
