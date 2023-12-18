"use server";
import db from "./db";
import { SubscriptionType } from "./supabase.types";

export const getUserSubscriptionStatus = async (userId: string) => {
  try {
    const data = await db.query.subscriptions.findFirst({
      where: (subs, { eq }) => eq(subs.userId, userId),
    });

    if (!data)
      return {
        data: null,
        error: null,
      };

    return {
      data: data as SubscriptionType,
      error: null,
    };
  } catch (error) {
    console.log({ error });
    return {
      data: null,
      error: `Error getting subscription: ${error}`,
    };
  }
};
