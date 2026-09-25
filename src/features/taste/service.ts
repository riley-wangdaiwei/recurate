import { TasteDuel, TasteProfile } from "./types";

export function createTasteProfile(tags: TasteProfile["tags"] = []): TasteProfile {
  const now = new Date().toISOString();
  return { id: "local-profile", tags, duels: [], createdAt: now, updatedAt: now };
}

export function addDuel(profile: TasteProfile, duel: Omit<TasteDuel, "id" | "createdAt">): TasteProfile {
  return { ...profile, duels: [...profile.duels, { ...duel, id: `${duel.left}-${duel.right}-${Date.now()}`, createdAt: new Date().toISOString() }], updatedAt: new Date().toISOString() };
}