import WorldWorkspace from "@/components/world/WorldWorkspace";
import styles from "./site.module.css";

export default function Home() {
  return <main className={`${styles.page} ${styles.canvasHome}`}><WorldWorkspace /></main>;
}
