import styles from "@/app/site.module.css";
export default function TagGroup({ title }: { title: string }) {
	function startDrag(event: React.DragEvent<HTMLButtonElement>, label: string) { event.dataTransfer.setData("text/recurate-tag", label); event.dataTransfer.effectAllowed = "copy"; }
	return <button className={styles.compactGroupTag} draggable onDragStart={(event) => startDrag(event, title)}>+ {title}</button>;
}