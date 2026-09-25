import Link from "next/link";
import { Artist } from "@/features/artists/types";
import styles from "@/app/site.module.css";
export default function ArtistCard({ artist }: { artist: Artist }) { return <Link className={styles.artistCard} href={`/artists/${artist.slug}`}><div className={styles.artistPortrait}>{artist.name.slice(0, 1)}</div><div><span className={styles.mono}>{artist.role}</span><h2>{artist.name}</h2><p>{artist.bio}</p><span className={styles.artistTags}>{artist.tags.join(" / ")}</span></div><b>-&gt;</b></Link>; }