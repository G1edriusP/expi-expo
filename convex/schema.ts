import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const User = {
  email: v.string(),
  clerkId: v.string(),
  imageUrl: v.optional(v.string()),
  firstName: v.optional(v.string()),
  lastName: v.optional(v.string()),
  username: v.union(v.string(), v.null()),
  bio: v.optional(v.string()),
  location: v.optional(v.string()),
  websiteUrl: v.optional(v.string()),
  followersCount: v.number(),
  pushToken: v.optional(v.string()),
};

export const Place = {
  name: v.string(),
  longitude: v.number(),
  latitude: v.number(),
  description: v.optional(v.string()),
  imageUrl: v.optional(v.string()),
  creatorId: v.string(),
};

export default defineSchema({
  users: defineTable(User),
  places: defineTable(Place),
});
