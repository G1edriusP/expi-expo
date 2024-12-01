import { query } from "convex/_generated/server";

export const getAllPlaces = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("places").collect();
  },
});
