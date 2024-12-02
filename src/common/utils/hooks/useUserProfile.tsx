import { useUser } from "@clerk/clerk-expo";
import { api } from "convex/_generated/api";
import { useQuery } from "convex/react";

export const useUserProfile = () => {
  const { user } = useUser();

  const userProfile = useQuery(api.users.getLoggedInUser, { clerkId: user?.id });

  return userProfile;
};
