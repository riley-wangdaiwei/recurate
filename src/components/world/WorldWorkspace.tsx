"use client";

import { useEffect, useState } from "react";
import { World } from "@/features/world/types";
import { seedDrops } from "@/data/seed-drops";
import { seedStickers } from "@/data/seed-stickers";
import {
  addFrame,
  addGroup,
  createWorld,
  deleteFrame,
  mergeWorld,
  updateFrame,
} from "@/features/world/service";
import { storage } from "@/lib/storage";
import CreateGroup from "./CreateGroup";
import TagGroup from "./TagGroup";
import StickerTray from "./StickerTray";
import UnlockPanel from "./UnlockPanel";
import WorldCanvas from "./WorldCanvas";
import styles from "@/app/site.module.css";

/**
 * BUG FIX 2026-10-02: groups and frames used to live in local useState and
 * were lost on every refresh. They are now part of the stored World and
 * persisted through the storage seam (lib/storage), same as tags/stickers.
 */
function seedDemoWorld(): World {
  let world = createWorld();
  world = addGroup(world, "MY CHILDHOOD");
  world = addGroup(world, "MY FUTURE ROOM");
  return world;
}

export default function WorldWorkspace() {
  const [world, setWorld] = useState<World | null>(null);

  useEffect(() => {
    storage.getWorld().then((saved) => {
      if (saved) {
        // Migrate saves written before groups/frames were persisted.
        setWorld({ ...createWorld(), ...saved, groups: saved.groups ?? [], frames: saved.frames ?? [] });
      } else {
        const demo = seedDemoWorld();
        setWorld(demo);
        storage.saveWorld(demo);
      }
    });
  }, []);

  /** Persist groups/frames without clobbering stickers written by WorldCanvas. */
  async function persist(next: World) {
    setWorld(next);
    const saved = await storage.getWorld();
    await storage.saveWorld(mergeWorld(saved, { groups: next.groups, frames: next.frames }));
  }

  async function createGroupAndFrame(title: string) {
    if (!world) return;
    await persist(addFrame(addGroup(world, title), title));
  }

  const groups = world?.groups ?? [];
  const frames = world?.frames ?? [];

  return (
    <>
      <div className={styles.worldLayout}>
        <WorldCanvas
          frames={frames}
          onMoveFrame={(id, x, y) => {
            if (world) persist(updateFrame(world, id, { x, y }));
          }}
          onResizeFrame={(id, width, height) => {
            if (world) persist(updateFrame(world, id, { width, height }));
          }}
          onDeleteFrame={(id) => {
            if (world) persist(deleteFrame(world, id));
          }}
        />
        <aside className={styles.worldIndex}>
          <div className={styles.indexHeading}>
            <CreateGroup onCreate={createGroupAndFrame} />
          </div>
          <div className={styles.groupList}>
            {groups.map((group) => (
              <TagGroup key={group.id} title={group.title} />
            ))}
          </div>
          <StickerTray items={[...seedDrops, ...seedStickers]} />
        </aside>
      </div>
      <div className={styles.worldUpgrades}>
        <UnlockPanel />
      </div>
    </>
  );
}
