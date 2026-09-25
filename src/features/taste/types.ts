export type TagSource = "onboarding" | "user" | "test" | "friend" | "artist";

export type TasteTag = {
  id: string;
  label: string;
  source: TagSource;
  createdAt: string;
  x: number;
  y: number;
  groupIds: string[];
  isOriginal?: boolean;
};

export type TasteDuel = {
  id: string;
  left: string;
  right: string;
  winner: string;
  createdAt: string;
};

export type TasteProfile = {
  id: string;
  tags: TasteTag[];
  duels: TasteDuel[];
  createdAt: string;
  updatedAt: string;
};