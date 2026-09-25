"use client";

import { FormEvent, useState } from "react";
import styles from "@/app/site.module.css";

export default function InvitePanel() {
  const [email, setEmail] = useState(""); const [sent, setSent] = useState(false);
  function submit(event: FormEvent) { event.preventDefault(); if (email.trim()) setSent(true); }
  return <div className={styles.invitePanel}><div><span className={styles.mono}>OUR ROOM / INVITE</span><h2>WHO ELSE<br /><em>SEES THIS?</em></h2><p>Invite a friend to add a word, a memory, or a new direction to this World.</p></div>{sent ? <div className={styles.successMessage}>INVITE READY.<br />THE ROOM IS WAITING.</div> : <form onSubmit={submit}><input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="FRIEND@EMAIL.COM" aria-label="Friend email" /><button className={styles.primaryButton} type="submit">INVITE FRIEND <span>-&gt;</span></button></form>}</div>;
}