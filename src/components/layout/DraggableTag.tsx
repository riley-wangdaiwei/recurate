"use client";

import Draggable from "react-draggable";
import { useRef } from "react";
import { TagSource } from "@/features/taste/types";
import styles from "@/app/site.module.css";

type Props = { id: string; label: string; x: number; y: number; source?: TagSource; isOriginal?: boolean; onMove: (id: string, x: number, y: number) => void; onDelete: (id: string) => void };

export default function DraggableTag({ id, label, x, y, source, isOriginal = false, onMove, onDelete }: Props) {
  const nodeRef = useRef<HTMLDivElement>(null);
  return <Draggable nodeRef={nodeRef} position={{ x, y }} onStop={(_, data) => onMove(id, data.x, data.y)}><div ref={nodeRef} className={isOriginal || source === "test" ? styles.originalWord : styles.worldTag}><button className={styles.elementDelete} onPointerDown={(event) => event.stopPropagation()} onClick={() => onDelete(id)} aria-label={`Delete ${label}`}>x</button>{label}</div></Draggable>;
}