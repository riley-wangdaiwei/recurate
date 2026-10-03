import { TasteTag } from "@/features/taste/types";
import { World, WorldFrame, WorldGroup } from "./types";

export function createWorld(): World {
  return {
    id: "local-world",
    ownerId: "local-user",
    title: "MY WORLD",
    groups: [],
    notes: [],
    stickers: [],
    frames: [],
    updatedAt: new Date().toISOString(),
  };
}

export function moveTag(tags: TasteTag[], id: string, x: number, y: number) {
  return tags.map((tag) => (tag.id === id ? { ...tag, x, y } : tag));
}

function slugId(title: string) {
  return `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`;
}

function touch(world: World): World {
  return { ...world, updatedAt: new Date().toISOString() };
}

/** Add a tag group to the world. Pure: returns a new world, does not persist. */
export function addGroup(world: World, title: string): World {
  const group: WorldGroup = {
    id: slugId(title),
    title,
    tagIds: [],
    createdAt: new Date().toISOString(),
    memberIds: [],
  };
  return touch({ ...world, groups: [...world.groups, group] });
}

/** Add a resizable canvas frame for a group. Pure: returns a new world, does not persist. */
export function addFrame(world: World, title = "NEW GROUP"): World {
  const count = world.frames.length;
  const frame: WorldFrame = {
    id: slugId(title),
    title,
    x: 90 + (count % 2) * 250,
    y: 210 + (count % 3) * 70,
    width: 250,
    height: 150,
  };
  return touch({ ...world, frames: [...world.frames, frame] });
}

/** Move / resize a canvas frame. Pure: returns a new world, does not persist. */
export function updateFrame(world: World, id: string, patch: Partial<WorldFrame>): World {
  return touch({
    ...world,
    frames: world.frames.map((frame) => (frame.id === id ? { ...frame, ...patch } : frame)),
  });
}

/** Remove a canvas frame. Pure: returns a new world, does not persist. */
export function deleteFrame(world: World, id: string): World {
  return touch({ ...world, frames: world.frames.filter((frame) => frame.id !== id) });
}

/**
 * Read-modify-write helper for the single stored world.
 * Two components (WorldWorkspace for groups/frames, WorldCanvas for stickers)
 * share one storage key; each merges only its own fields so neither
 * clobbers the other's data.
 */
export function mergeWorld(base: World | null, patch: Partial<World>): World {
  return { ...(base ?? createWorld()), ...patch, updatedAt: new Date().toISOString() };
}
