"use client";

import { useState } from "react";
import { WorldFrame } from "@/features/world/types";
import { seedDrops } from "@/data/seed-drops";
import { seedStickers } from "@/data/seed-stickers";
import CreateGroup from "./CreateGroup";
import TagGroup from "./TagGroup";
import StickerTray from "./StickerTray";
import UnlockPanel from "./UnlockPanel";
import WorldCanvas from "./WorldCanvas";
import styles from "@/app/site.module.css";

export default function WorldWorkspace() {
  const [groups, setGroups] = useState([{ title: "MY CHILDHOOD", tags: ["MEMORY"] }, { title: "MY FUTURE ROOM", tags: ["HOME", "TEXTURE"] }]);
  const [frames, setFrames] = useState<WorldFrame[]>([]);
  function addFrame(title = "NEW GROUP") { setFrames((current) => [...current, { id: `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`, title, x: 90 + (current.length % 2) * 250, y: 210 + (current.length % 3) * 70, width: 250, height: 150 }]); }
  function createGroup(title: string) { setGroups((current) => [...current, { title, tags: [] }]); addFrame(title); }
  function updateFrame(id: string, patch: Partial<WorldFrame>) { setFrames((current) => current.map((frame) => frame.id === id ? { ...frame, ...patch } : frame)); }
  return <><div className={styles.worldLayout}><WorldCanvas frames={frames} onMoveFrame={(id, x, y) => updateFrame(id, { x, y })} onResizeFrame={(id, width, height) => updateFrame(id, { width, height })} onDeleteFrame={(id) => setFrames((current) => current.filter((frame) => frame.id !== id))} /><aside className={styles.worldIndex}><div className={styles.indexHeading}><CreateGroup onCreate={createGroup} /></div><div className={styles.groupList}>{groups.map((group) => <TagGroup key={group.title} title={group.title} />)}</div><StickerTray items={[...seedDrops, ...seedStickers]} /></aside></div><div className={styles.worldUpgrades}><UnlockPanel /></div></>;
}