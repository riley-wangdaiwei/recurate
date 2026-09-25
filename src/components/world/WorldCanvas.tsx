"use client";

import { DragEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { seedTags } from "@/data/seed-tags";
import { moveTag } from "@/features/world/service";
import { TasteTag, TasteProfile } from "@/features/taste/types";
import { World, WorldFrame, WorldSticker } from "@/features/world/types";
import { storage } from "@/lib/storage";
import { createTasteProfile } from "@/features/taste/service";
import { createWorld } from "@/features/world/service";
import DraggableTag from "@/components/layout/DraggableTag";
import ResizableFrame from "@/components/world/ResizableFrame";
import DraggableSticker from "@/components/world/DraggableSticker";
import styles from "@/app/site.module.css";

const defaultWordmark = ["BLANK", "WORLD", "RECURATE"];

type Props = { frames?: WorldFrame[]; onMoveFrame: (id: string, x: number, y: number) => void; onResizeFrame: (id: string, width: number, height: number) => void; onDeleteFrame: (id: string) => void };

export default function WorldCanvas({ frames = [], onMoveFrame, onResizeFrame, onDeleteFrame }: Props) {
  const [tags, setTags] = useState<TasteTag[]>(seedTags);
  const [profile, setProfile] = useState<TasteProfile | null>(null);
  const [stickers, setStickers] = useState<WorldSticker[]>([]);
  const [world, setWorld] = useState<World | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  useEffect(() => { storage.getTaste().then((saved) => { if (saved) { const savedTags = saved.tags.map((tag, index) => ({ ...tag, isOriginal: tag.isOriginal ?? index < 3 })); const nextProfile = { ...saved, tags: savedTags }; setProfile(nextProfile); setTags(savedTags); } }); storage.getWorld().then((saved) => { const savedStickers = (saved?.stickers ?? []).map((sticker) => ({ ...sticker, width: Math.min(sticker.width, 42), height: Math.min(sticker.height, 42) })); setWorld(saved ? { ...saved, stickers: savedStickers } : null); setStickers(savedStickers); }); }, []);
  async function persistTags(nextTags: TasteTag[]) { setTags(nextTags); const nextProfile = { ...(profile ?? createTasteProfile()), tags: nextTags, updatedAt: new Date().toISOString() }; setProfile(nextProfile); await storage.saveTaste(nextProfile); }
  async function onMove(id: string, x: number, y: number) { await persistTags(moveTag(tags, id, x, y)); }
  async function onDelete(id: string) { await persistTags(tags.filter((tag) => tag.id !== id)); }
  async function persistStickers(nextStickers: WorldSticker[]) { setStickers(nextStickers); const nextWorld = { ...(world ?? createWorld()), stickers: nextStickers, updatedAt: new Date().toISOString() }; setWorld(nextWorld); await storage.saveWorld(nextWorld); }
  async function onMoveSticker(id: string, x: number, y: number) { await persistStickers(stickers.map((sticker) => sticker.id === id ? { ...sticker, x, y } : sticker)); }
  async function onDeleteSticker(id: string) { await persistStickers(stickers.filter((sticker) => sticker.id !== id)); }
  async function onDrop(event: DragEvent<HTMLDivElement>) { event.preventDefault(); const rect = canvasRef.current?.getBoundingClientRect(); if (!rect) return; const stickerData = event.dataTransfer.getData("text/recurate-sticker"); if (stickerData) { const sticker = JSON.parse(stickerData) as Pick<WorldSticker, "title" | "imageUrl">; await persistStickers([...stickers, { ...sticker, id: `sticker-${Date.now()}`, x: event.clientX - rect.left - 21, y: event.clientY - rect.top - 21, width: 42, height: 42 }]); return; } const label = event.dataTransfer.getData("text/recurate-tag"); if (!label || tags.some((tag) => tag.label === label)) return; const nextTag: TasteTag = { id: `${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`, label, source: "user", createdAt: new Date().toISOString(), x: event.clientX - rect.left - 50, y: event.clientY - rect.top - 20, groupIds: [], isOriginal: false }; await persistTags([...tags, nextTag]); }
  const canvasTags = tags.filter((tag) => !defaultWordmark.includes(tag.label));
  return <div ref={canvasRef} className={styles.worldCanvas} onDragOver={(event) => event.preventDefault()} onDrop={onDrop}><div className={styles.worldWordmark}><div className={styles.wordmarkLockup}><div className={styles.wordmarkWords}>{defaultWordmark.map((word, index) => <span className={styles.wordmarkWord} style={{ animationDelay: `${index * 140}ms` }} key={word}>{word}</span>)}</div><Link className={styles.wordmarkStart} href="/onboarding">START HERE <span aria-hidden="true">-&gt;</span></Link></div></div>{frames.map((frame) => <ResizableFrame key={frame.id} frame={frame} onMove={onMoveFrame} onResize={onResizeFrame} onDelete={onDeleteFrame} />)}{canvasTags.map((tag) => <DraggableTag key={tag.id} {...tag} onMove={onMove} onDelete={onDelete} />)}{stickers.map((sticker) => <DraggableSticker key={sticker.id} sticker={sticker} onMove={onMoveSticker} onDelete={onDeleteSticker} />)}<div className={styles.canvasHint}>DRAG / GROUP / KEEP<br />WHAT FEELS LIKE YOU</div></div>;
}