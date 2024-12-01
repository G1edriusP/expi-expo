import { internal } from "convex/_generated/api";
import { httpAction } from "./_generated/server";
import { HttpRouter } from "convex/server";

const httpRouter = new HttpRouter();

export const handleCreateUser = httpAction(async (ctx, request) => {
  const { data, type } = await request.json();

  switch (type) {
    case "user.created":
      await ctx.runMutation(internal.users.createUser, {
        email: data.email_addresses[0].email_address,
        clerkId: data.id,
        imageUrl: data.image_url,
        firstName: data.first_name,
        lastName: data.last_name,
        username: data.username,
        followersCount: 0,
      });
      break;
  }

  return new Response(null, { status: 200 });
});

httpRouter.route({
  path: "/users",
  method: "POST",
  handler: handleCreateUser,
});

// https://adventurous-bass-803.convex.site
export default httpRouter;
