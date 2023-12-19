"use server";
import { validate } from "uuid";
import db from "./db";
import { FileType, SubscriptionType, WorkspaceType } from "./supabase.types";
import { files, workspaces } from "../../../migrations/schema";
import { eq } from "drizzle-orm";

export const createWorkspace = async (workspace: WorkspaceType) => {
  try {
    const response = await db.insert(workspaces).values(workspace);
    return { data: null, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: "Error" };
  }
};

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

export const getFiles = async (folderId: string) => {
  const isValid = validate(folderId);
  if (!isValid) return { data: null, error: "Error" };
  try {
    const results = (await db
      .select()
      .from(files)
      .orderBy(files.createdAt)
      .where(eq(files.folderId, folderId))) as FileType[] | [];
    return { data: results, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: "Error" };
  }
};
