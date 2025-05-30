import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/db";

export async function requireAuth() {
  const user = await currentUser();
  
  if (!user) {
    redirect("/sign-in");
  }
  
  return user;
}

export async function getUserWithSubscription() {
  const user = await requireAuth();
  
  // Get user data from DynamoDB
  // This is a simplified example - in production you'd want to handle errors properly
  const { success, data } = await getUserById(user.id);
  
  if (!success || !data) {
    // If user doesn't exist in our DB yet, we might want to create them
    // This could happen if they've authenticated but haven't been synced to our DB
    return {
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      subscription: null,
    };
  }
  
  return {
    ...data,
    email: user.emailAddresses[0]?.emailAddress,
    name: `${user.firstName} ${user.lastName}`,
    imageUrl: user.imageUrl,
  };
}