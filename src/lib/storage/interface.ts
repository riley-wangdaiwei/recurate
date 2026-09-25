import { TasteProfile } from "@/features/taste/types";
import { World } from "@/features/world/types";

export interface StorageAdapter { getTaste(): Promise<TasteProfile | null>; saveTaste(profile: TasteProfile): Promise<void>; getWorld(): Promise<World | null>; saveWorld(world: World): Promise<void>; }