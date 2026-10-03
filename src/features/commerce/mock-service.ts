import { seedArtists } from "@/data/seed-artists";
import { seedDrops } from "@/data/seed-drops";
import { TasteProfile } from "@/features/taste/types";
import { CommerceService } from "./interface";
import { GiftItem } from "./types";

/**
 * Demo implementation of CommerceService.
 *
 * BUG FIX 2026-10-02: /gift used to render seedDrops directly, so every
 * visitor saw the same two items regardless of taste. Curation now scores
 * each catalog item by tag overlap between the artist and the user's taste
 * profile. Replace with a real implementation when commerce goes live —
 * the interface stays the same.
 */
const artistTags: Record<string, string[]> = Object.fromEntries(
  seedArtists.map((artist) => [artist.name, artist.tags]),
);

function scoreItem(item: GiftItem, tasteLabels: Set<string>): number {
  const tags = artistTags[item.artistName] ?? [];
  return tags.filter((tag) => tasteLabels.has(tag)).length;
}

export const mockCommerce: CommerceService = {
  async getCatalog(): Promise<GiftItem[]> {
    return seedDrops;
  },

  async curateFor(profile: TasteProfile | null): Promise<GiftItem[]> {
    const catalog = await this.getCatalog();
    if (!profile || profile.tags.length === 0) return catalog;
    const tasteLabels = new Set(profile.tags.map((tag) => tag.label));
    return [...catalog]
      .map((item) => ({ item, score: scoreItem(item, tasteLabels) }))
      .sort((a, b) => b.score - a.score)
      .map(({ item }) => item);
  },
};
