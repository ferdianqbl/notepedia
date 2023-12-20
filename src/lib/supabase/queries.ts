"use server";
import { validate } from "uuid";
import db from "./db";
import {
  FileType,
  SubscriptionType,
  WorkspaceType,
  FolderType,
  UserType,
} from "./supabase.types";
import { files, folders, users, workspaces } from "../../../migrations/schema";
import { and, eq, exists, ilike, notExists } from "drizzle-orm";
import { collaborators } from "./schema";
import { UUID } from "crypto";

// Workspaces
export const createWorkspace = async (workspace: WorkspaceType) => {
  try {
    const response = await db.insert(workspaces).values(workspace);
    return { data: null, error: null };
  } catch (error) {
    console.log("Error creating workspace (function createWorkspace): ", error);
    return { data: null, error: "Error" };
  }
};

export const getPrivateWorkspaces = async (userId: string) => {
  const isValid = validate(userId);
  if (!isValid) return { data: [], error: "Error id is not valid" };

  try {
    const res: WorkspaceType[] | [] = await db
      .select()
      .from(workspaces)
      .orderBy(workspaces.createdAt)
      .where(
        and(
          notExists(
            db
              .select()
              .from(collaborators)
              .where(eq(collaborators.workspaceId, workspaces.id))
          ),
          eq(workspaces.workspaceOwner, userId)
        )
      );
    return { data: res, error: null };
  } catch (error) {
    console.log(
      "Error getting workspaces (function getPrivateWorkspaces): ",
      error
    );
    return { data: [], error: "Error" };
  }
};

export const getCollaboratingWorkspaces = async (userId: string) => {
  const isValid = validate(userId);
  if (!isValid) return { data: [], error: "Error id is not valid" };

  try {
    const res: WorkspaceType[] | [] = await db
      .select({
        id: workspaces.id,
        createdAt: workspaces.createdAt,
        updatedAt: workspaces.updatedAt,
        workspaceOwner: workspaces.workspaceOwner,
        title: workspaces.title,
        iconId: workspaces.iconId,
        data: workspaces.data,
        inTrash: workspaces.inTrash,
        logo: workspaces.logo,
        bannerUrl: workspaces.bannerUrl,
      })
      .from(users)
      .orderBy(workspaces.createdAt)
      .innerJoin(collaborators, eq(users.id, collaborators.userId))
      .innerJoin(workspaces, eq(collaborators.workspaceId, workspaces.id))
      .where(eq(users.id, userId));

    return { data: res, error: null };
  } catch (error) {
    console.log(
      "Error getting workspaces (function getPrivateWorkspaces): ",
      error
    );
    return { data: [], error: "Error" };
  }
};

export const getSharedWorkspaces = async (userId: string) => {
  const isValid = validate(userId);
  if (!isValid) return { data: [], error: "Error id is not valid" };

  try {
    const sharedWorkspaces: WorkspaceType[] | [] = await db
      .selectDistinct({
        id: workspaces.id,
        createdAt: workspaces.createdAt,
        updatedAt: workspaces.updatedAt,
        workspaceOwner: workspaces.workspaceOwner,
        title: workspaces.title,
        iconId: workspaces.iconId,
        data: workspaces.data,
        inTrash: workspaces.inTrash,
        logo: workspaces.logo,
        bannerUrl: workspaces.bannerUrl,
      })
      .from(workspaces)
      .orderBy(workspaces.createdAt)
      .innerJoin(collaborators, eq(workspaces.id, collaborators.workspaceId))
      .where(eq(workspaces.workspaceOwner, userId));
    return { data: sharedWorkspaces, error: null };
  } catch (error) {
    console.log(
      "Error getting workspaces (function getPrivateWorkspaces): ",
      error
    );
    return { data: [], error: "Error" };
  }
};

export const addCollaborators = async (
  users: UserType[],
  workspaceId: string
) => {
  try {
    const res = users.forEach(async (user) => {
      const userExists = await db.query.collaborators.findFirst({
        where: (collaborator, { eq }) =>
          and(
            eq(collaborator.userId, user.id),
            eq(collaborator.workspaceId, workspaceId)
          ),
      });

      if (!userExists)
        await db.insert(collaborators).values({
          userId: user.id,
          workspaceId: workspaceId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
    });

    return { data: res, error: null };
  } catch (error) {
    console.log("Error adding collaborators (function addCollaborators): ");
    return { data: null, error: "Error" };
  }
};

// Subscriptions
export const getUserSubscriptionStatus = async (userId: string) => {
  const isValid = validate(userId);
  if (!isValid) return { data: null, error: "Error id is not valid" };
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
    console.log(
      "Error getting user subscription status (function getUserSubscriptionStatus): ",
      error
    );
    return {
      data: null,
      error: `Error getting subscription: ${error}`,
    };
  }
};

// Folders
export const getFolders = async (workspaceId: string) => {
  const isValid = validate(workspaceId);
  if (!isValid) return { data: null, error: "Error id is not valid" };

  try {
    const res: FolderType[] | [] = await db
      .select()
      .from(folders)
      .orderBy(folders.createdAt)
      .where(eq(folders.workspaceId, workspaceId));

    return { data: res, error: null };
  } catch (error) {
    console.log("Error getting folders (function getFolders): ", error);
    return { data: null, error: "Error" };
  }
};

// Files
export const getFiles = async (folderId: string) => {
  const isValid = validate(folderId);
  if (!isValid) return { data: null, error: "Error id is not valid" };

  try {
    const results = (await db
      .select()
      .from(files)
      .orderBy(files.createdAt)
      .where(eq(files.folderId, folderId))) as FileType[] | [];

    return { data: results, error: null };
  } catch (error) {
    console.log("Error getting files (function getFiles): ", error);
    return { data: null, error: "Error" };
  }
};

// Users
export const getUsersFromSearch = async (email: string) => {
  if (!email) return [];
  const res = await db
    .select()
    .from(users)
    .where(ilike(users.email, `%${email}%`));

  return res;
};
