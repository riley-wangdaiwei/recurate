import { ArtistBlog as ArtistBlogType } from "@/features/artists/types";
import styles from "@/app/site.module.css";
export default function ArtistBlog({ blog }: { blog: ArtistBlogType }) { return <article className={styles.blogEntry}><span className={styles.mono}>{blog.relatedTags.join(" / ")}</span><h2>{blog.title}</h2><p>{blog.content}</p><time>{blog.createdAt.slice(0, 10)}</time></article>; }