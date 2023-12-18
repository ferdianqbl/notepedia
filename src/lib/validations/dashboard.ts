import { z } from "zod";

export const workspaceSchema = z.object({
  logo: z.any().nullable(),
  name: z.string().min(1, "Workspace name must be at least 1 character"),
});

export type WorkspaceSchemaType = z.infer<typeof workspaceSchema>;
