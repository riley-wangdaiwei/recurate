"use client";

import Draggable from "react-draggable";
import Image from "next/image";
import { useRef } from "react";
import { WorldSticker } from "@/features/world/types";
import styles from "@/app/site.module.css";

export default function DraggableSticker({ sticker, onMove, onDelete }: { sticker: WorldSticker; onMove: (id: string, x: number, y: number) => void; onDelete: (id: string) => void }) {
  const nodeRef = useRef<HTMLDivElement>(null);
  return <Draggable nodeRef={nodeRef} position={{ x: sticker.x, y: sticker.y }} onStop={(_, data) => onMove(sticker.id, data.x, data.y)}><div ref={nodeRef} className={styles.worldSticker} style={{ width: sticker.width, height: sticker.height }}><Image src={sticker.imageUrl} alt={sticker.title} width={42} height={42} /><button className={styles.elementDelete} onPointerDown={(event) => event.stopPropagation()} onClick={() => onDelete(sticker.id)} aria-label={`Delete ${sticker.title}`}>x</button></div></Draggable>;
}