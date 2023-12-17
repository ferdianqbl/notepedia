import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().describe("Email").email("Invalid email"),
  password: z
    .string()
    .describe("Password")
    .min(1, "Password must be at least 1 characters"),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
