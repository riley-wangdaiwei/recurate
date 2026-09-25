import Link from "next/link";
import { notFound } from "next/navigation";
import { seedArtists, seedBlogs } from "@/data/seed-artists";
import ArtistBlog from "@/components/artists/ArtistBlog";
import styles from "@/app/site.module.css";

export function generateStaticParams() { return seedArtists.map((artist) => ({ slug: artist.slug })); }
export default async function ArtistPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const artist = seedArtists.find((item) => item.slug === slug); if (!artist) notFound(); const blogs = seedBlogs.filter((blog) => blog.artistId === artist.id);
  return <main className={styles.page}><div className={styles.routeTop}><Link href="/artists">ARTISTS / STORIES</Link><span>DEMO PROFILE</span><Link href="/">GO TO CANVAS -&gt;</Link></div><section className={styles.artistProfile}><div className={styles.profilePortrait}>{artist.name.slice(0, 1)}</div><div><span className={styles.mono}>{artist.role}</span><h1 className={styles.pageTitle}>{artist.name}</h1><p className={styles.profileBio}>{artist.bio}</p><p className={styles.artistTags}>{artist.tags.join(" / ")}</p></div></section><section className={styles.blogSection}><div className={styles.sectionRule}><span>01 / NOTES FROM THE STUDIO</span><span>BLOG / STORIES</span></div>{blogs.map((blog) => <ArtistBlog key={blog.id} blog={blog} />)}</section></main>;
}