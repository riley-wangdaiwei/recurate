"use client";

import { GiftItem } from "@/features/commerce/types";
import Image from "next/image";
import styles from "@/app/site.module.css";

export default function StickerTray({ items }: { items: GiftItem[] }) {
  function startDrag(event: React.DragEvent<HTMLButtonElement>, item: GiftItem) { if (!item.imageUrl) return; event.dataTransfer.setData("text/recurate-sticker", JSON.stringify({ title: item.title, imageUrl: item.imageUrl })); event.dataTransfer.effectAllowed = "copy"; }
  return <div className={styles.stickerTray}><span className={styles.mono}>IMAGE STICKERS</span>{items.filter((item) => item.imageUrl).map((item) => <button className={styles.stickerSource} draggable onDragStart={(event) => startDrag(event, item)} key={item.id}><Image src={item.imageUrl ?? "/patterns/crop-01.svg"} alt="" width={34} height={34} /><span>{item.artistName}</span></button>)}</div>;
}