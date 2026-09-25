export type Artist = {
  id: string;
  slug: string;
  name: string;
  role: string;
  bio: string;
  portrait?: string;
  tags: string[];
  workIds: string[];
  blogIds: string[];
};

export type ArtistBlog = {
  id: string;
  artistId: string;
  title: string;
  content: string;
  coverImage?: string;
  relatedTags: string[];
  createdAt: string;
};