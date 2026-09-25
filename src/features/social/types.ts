export type Invite = {
  id: string;
  worldId: string;
  groupId?: string;
  invitedBy: string;
  invitedEmail: string;
  role: "friend" | "artist";
  status: "pending" | "accepted";
  createdAt: string;
};

export type Drop = {
  id: string;
  targetGroupId: string;
  createdBy: string;
  type: "tag" | "work" | "gift-idea" | "comment";
  content: string;
  createdAt: string;
};