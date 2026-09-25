export type GiftItem = {
  id: string;
  title: string;
  artistName: string;
  description: string;
  priceLabel: string;
  accent: "green" | "red" | "blue";
  imageUrl?: string;
};

export type GiftBasket = {
  id: string;
  worldId: string;
  items: GiftItem[];
  note?: string;
};