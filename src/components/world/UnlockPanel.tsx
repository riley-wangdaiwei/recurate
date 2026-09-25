import Link from "next/link";
import styles from "@/app/site.module.css";

const panels = [{ title: "EXPLORE MORE", text: "Unlock more taste tests", href: "/explore" }, { title: "ORGANIZE MORE", text: "More tags + artist stickers", href: "/organize" }, { title: "UNLOCK ALL", text: "Monthly tags + artist picks", href: "/unlock-all" }];
export default function UnlockPanel() { return <section className={styles.unlockPanel}>{panels.map((panel) => <Link href={panel.href} key={panel.title}><span><strong>{panel.title}</strong><small>{panel.text}</small></span><b aria-hidden="true">-&gt;</b></Link>)}</section>; }