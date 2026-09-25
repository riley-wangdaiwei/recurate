import { duelPairs } from "@/data/duel-pairs";
import { TasteTag } from "./types";

export function getDuel(index: number) { return duelPairs[index] ?? null; }

export function createInitialTags(selectedWord: string, ownWord1: string, ownWord2: string): TasteTag[] {
  const now = new Date().toISOString();
  return [selectedWord, ownWord1, ownWord2].map((word, index) => ({ id: `${word.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${index}`, label: word.trim().toUpperCase(), source: index === 0 ? "onboarding" as const : "user" as const, createdAt: now, x: 120 + index * 220, y: 150 + (index % 2) * 110, groupIds: [], isOriginal: true }));
}