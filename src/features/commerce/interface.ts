import { GiftItem } from "./types";
import { TasteProfile } from "@/features/taste/types";

/**
 * THE SEAM for buying/selling. UI code talks to this interface only —
 * never to Stripe, never to a database.
 *
 * Today the implementation is mock-service.ts (seed data + tag-overlap
 * curation). When payments go live, write a Stripe-backed implementation
 * of this same interface and swap it in. Pages and components do not change.
 */
export interface CommerceService {
  /** Full gift catalog: artist works available for curation. */
  getCatalog(): Promise<GiftItem[]>;

  /**
   * Curate gift picks for a taste profile.
   * A null profile (brand-new visitor) returns the catalog in default order.
   */
  curateFor(profile: TasteProfile | null): Promise<GiftItem[]>;
}
