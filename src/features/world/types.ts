export type WorldGroup = {
  id: string;
  title: string;
  description?: string;
  tagIds: string[];
  createdAt: string;
  memberIds: string[];
};

export type WorldNote = {
  id: string;
  title: string;
  content: string;
  tagIds: string[];
  createdAt: string;
};

export type World = {
  id: string;
  ownerId: string;
  title: string;
  groups: WorldGroup[];
  notes: WorldNote[];
  stickers: WorldSticker[];
  updatedAt: string;
};

export type WorldFrame = {
  id: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type WorldSticker = {
  id: string;
  title: string;
  imageUrl: string;
  x: number;
  y: number;
  width: number;
  height: number;
};