import { StorageAdapter } from "./interface";

const TASTE_KEY = "recurate:taste:v1";
const WORLD_KEY = "recurate:world:v1";
function read<T>(key: string): T | null { if (typeof window === "undefined") return null; const raw = window.localStorage.getItem(key); if (!raw) return null; try { return JSON.parse(raw) as T; } catch { return null; } }

export const localAdapter: StorageAdapter = {
  async getTaste() { return read(TASTE_KEY); },
  async saveTaste(profile) { if (typeof window !== "undefined") window.localStorage.setItem(TASTE_KEY, JSON.stringify(profile)); },
  async getWorld() { return read(WORLD_KEY); },
  async saveWorld(world) { if (typeof window !== "undefined") window.localStorage.setItem(WORLD_KEY, JSON.stringify(world)); },
};