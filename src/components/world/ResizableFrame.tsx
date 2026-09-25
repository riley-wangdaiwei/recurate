"use client";

import Draggable from "react-draggable";
import { PointerEvent, useRef, useState } from "react";
import { WorldFrame } from "@/features/world/types";
import styles from "@/app/site.module.css";

type Props = { frame: WorldFrame; onMove: (id: string, x: number, y: number) => void; onResize: (id: string, width: number, height: number) => void; onDelete: (id: string) => void };

export default function ResizableFrame({ frame, onMove, onResize, onDelete }: Props) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: frame.width, height: frame.height });

  function startResize(event: PointerEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    const startX = event.clientX;
    const startY = event.clientY;
    const startWidth = size.width;
    const startHeight = size.height;
    let currentWidth = startWidth;
    let currentHeight = startHeight;
    const move = (moveEvent: globalThis.PointerEvent) => { currentWidth = Math.max(150, startWidth + moveEvent.clientX - startX); currentHeight = Math.max(90, startHeight + moveEvent.clientY - startY); setSize({ width: currentWidth, height: currentHeight }); };
    const end = () => { onResize(frame.id, currentWidth, currentHeight); window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", end); };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", end, { once: true });
  }

  return <Draggable nodeRef={nodeRef} position={{ x: frame.x, y: frame.y }} onStop={(_, data) => onMove(frame.id, data.x, data.y)}><div ref={nodeRef} className={styles.worldFrame} style={{ width: size.width, height: size.height }}><span>{frame.title}</span><button className={styles.elementDelete} onPointerDown={(event) => event.stopPropagation()} onClick={() => onDelete(frame.id)} aria-label={`Delete ${frame.title}`}>x</button><button className={styles.resizeHandle} onPointerDown={startResize} aria-label={`Resize ${frame.title}`} /></div></Draggable>;
}