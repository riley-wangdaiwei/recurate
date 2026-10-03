import { TasteProfile } from "@/features/taste/types";
import { World } from "@/features/world/types";
import { StorageAdapter } from "./interface";

/**
 * FUTURE SEAM — not wired in yet.
 *
 * When Recurate outgrows localStorage (real users, real data), implement
 * these four methods against Supabase (Postgres + Auth) and swap this in
 * at lib/storage/index.ts:
 *
 *   import { supabaseAdapter } from "./supabase-adapter";
 *   export const storage = supabaseAdapter;
 *
 * UI, features/, and components/ do not change — they only know the
 * StorageAdapter interface.
 */
const notReady = (): never => {
  throw new Error("supabase-adapter: not configured yet (see lib/storage/index.ts)");
};

export const supabaseAdapter: StorageAdapter = {
  async getTaste(): Promise<TasteProfile | null> {
    return notReady();
  },
  async saveTaste(): Promise<void> {
    return notReady();
  },
  async getWorld(): Promise<World | null> {
    return notReady();
  },
  async saveWorld(): Promise<void> {
    return notReady();
  },
};
