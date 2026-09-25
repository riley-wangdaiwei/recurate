import { TasteTag } from "@/features/taste/types";
import { World } from "./types";

export function createWorld(): World { return { id: "local-world", ownerId: "local-user", title: "MY WORLD", groups: [], notes: [], stickers: [], updatedAt: new Date().toISOString() }; }
export function moveTag(tags: TasteTag[], id: string, x: number, y: number) { return tags.map((tag) => tag.id === id ? { ...tag, x, y } : tag); }