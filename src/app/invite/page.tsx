import Link from "next/link";
import InvitePanel from "@/components/invite/InvitePanel";
import styles from "@/app/site.module.css";
export default function InvitePage() { return <main className={styles.page}><div className={styles.routeTop}><span>RECURATE* / 04</span><span>FROM YOUR CANVAS</span><Link href="/">BACK TO CANVAS -&gt;</Link></div><InvitePanel /><section className={styles.inviteSteps}><span>01 / SHARE A WORLD</span><span>02 / ADD A WORD</span><span>03 / MAKE A ROOM</span></section></main>; }