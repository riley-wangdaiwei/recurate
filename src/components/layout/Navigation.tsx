"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/app/site.module.css";

const links = [{ href: "/explore", label: "EXPLORE" }, { href: "/invite", label: "INVITE" }, { href: "/gift", label: "GIFT" }, { href: "/artists", label: "ARTISTS" }];

export default function Navigation() {
  const pathname = usePathname();
  return <header className={styles.nav}><Link className={styles.logo} href="/">REC*</Link><nav className={styles.navLinks} aria-label="Main navigation">{links.map((link) => <Link key={link.href} className={pathname.startsWith(link.href) ? styles.activeNav : ""} href={link.href}>{link.label}</Link>)}</nav></header>;
}