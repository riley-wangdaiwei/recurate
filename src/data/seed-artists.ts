import { Artist, ArtistBlog } from "@/features/artists/types";

export const seedArtists: Artist[] = [
  { id: "mina-park", slug: "mina-park", name: "Mina Park", role: "TEXTILE ARTIST / DEMO", bio: "Mina works with inherited patterns, soft architecture, and the objects that stay with us.", tags: ["MEMORY", "TEXTURE", "RITUAL"], workIds: ["thread-study"], blogIds: ["what-stays"] },
  { id: "elio-santos", slug: "elio-santos", name: "Elio Santos", role: "OBJECT MAKER / DEMO", bio: "Elio makes small kinetic objects for rooms that are still becoming themselves.", tags: ["PLAY", "HOME", "FUTURE"], workIds: ["orbit-stool"], blogIds: ["rooms-in-motion"] },
  { id: "jack-natos", slug: "jack-natos", name: "Jack Natos", role: "OBJECT ARTIST / DEMO", bio: "Jack Natos makes ordinary objects misbehave. His Banana Shoes project turns a familiar image into a wearable, funny little disruption.", tags: ["PLAY", "OBJECT", "UNKNOWN"], workIds: ["jack-banana-shoes"], blogIds: ["banana-shoes"] },
];

export const seedBlogs: ArtistBlog[] = [
  { id: "what-stays", artistId: "mina-park", title: "WHAT STAYS IN THE FOLD", content: "A note on the marks that survive washing, moving, and being handed down.", relatedTags: ["MEMORY", "TEXTURE"], createdAt: "2026-02-10T00:00:00.000Z" },
  { id: "rooms-in-motion", artistId: "elio-santos", title: "ROOMS IN MOTION", content: "Why a useful object should leave a little space for play.", relatedTags: ["HOME", "PLAY"], createdAt: "2026-03-04T00:00:00.000Z" },
  { id: "banana-shoes", artistId: "jack-natos", title: "THE OBJECT THAT REFUSED TO BE SERIOUS", content: "Banana Shoes began with a simple question: what if a familiar object could interrupt the room before it entered it? Jack's project keeps the joke visible, then lets the material do the rest.", relatedTags: ["PLAY", "OBJECT", "UNKNOWN"], createdAt: "2026-04-12T00:00:00.000Z" },
];