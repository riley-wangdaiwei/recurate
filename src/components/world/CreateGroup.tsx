"use client";

import { FormEvent, useState } from "react";
import styles from "@/app/site.module.css";

export default function CreateGroup({ onCreate }: { onCreate: (title: string) => void }) {
  const [value, setValue] = useState("");
  function submit(event: FormEvent) { event.preventDefault(); if (value.trim()) { onCreate(value.trim().toUpperCase()); setValue(""); } }
  return <form className={styles.createGroup} onSubmit={submit}><input value={value} onChange={(event) => setValue(event.target.value)} placeholder="NEW GROUP NAME" aria-label="New group name" /><button type="submit">+ GROUP</button></form>;
}